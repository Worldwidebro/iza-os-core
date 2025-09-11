#!/usr/bin/env python3
"""
IZA OS LLM Manager
Unified interface for managing multiple AI models with rate limiting, caching, and monitoring
"""

import asyncio
import json
import logging
import time
import yaml
from typing import Dict, List, Optional, Any
from pathlib import Path
from dataclasses import dataclass
from datetime import datetime, timedelta
import hashlib
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class LLMRequest:
    """Represents an LLM request"""
    model: str
    prompt: str
    max_tokens: int = 4096
    temperature: float = 0.7
    timestamp: datetime = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()

@dataclass
class LLMResponse:
    """Represents an LLM response"""
    content: str
    model: str
    tokens_used: int
    response_time: float
    timestamp: datetime
    cached: bool = False

class RateLimiter:
    """Rate limiter for LLM requests"""
    
    def __init__(self, requests_per_minute: int, burst_capacity: int):
        self.requests_per_minute = requests_per_minute
        self.burst_capacity = burst_capacity
        self.requests = []
        self.burst_tokens = burst_capacity
        
    async def acquire(self) -> bool:
        """Acquire a token for making a request"""
        now = time.time()
        
        # Remove old requests
        self.requests = [req_time for req_time in self.requests 
                        if now - req_time < 60]
        
        # Check if we can make a request
        if len(self.requests) < self.requests_per_minute:
            self.requests.append(now)
            return True
        
        # Check burst capacity
        if self.burst_tokens > 0:
            self.burst_tokens -= 1
            self.requests.append(now)
            return True
            
        return False
    
    def reset_burst(self):
        """Reset burst capacity"""
        self.burst_tokens = self.burst_capacity

class LLMCache:
    """LRU cache for LLM responses"""
    
    def __init__(self, max_size_mb: int, ttl_minutes: int):
        self.max_size_bytes = max_size_mb * 1024 * 1024
        self.ttl_seconds = ttl_minutes * 60
        self.cache = {}
        self.access_times = {}
        self.current_size = 0
        
    def _get_cache_key(self, request: LLMRequest) -> str:
        """Generate cache key for request"""
        key_data = f"{request.model}:{request.prompt}:{request.max_tokens}:{request.temperature}"
        return hashlib.md5(key_data.encode()).hexdigest()
    
    def get(self, request: LLMRequest) -> Optional[LLMResponse]:
        """Get cached response if available"""
        cache_key = self._get_cache_key(request)
        
        if cache_key not in self.cache:
            return None
            
        cached_data = self.cache[cache_key]
        
        # Check TTL
        if time.time() - cached_data['timestamp'] > self.ttl_seconds:
            del self.cache[cache_key]
            del self.access_times[cache_key]
            self.current_size -= len(cached_data['response'].content)
            return None
        
        # Update access time
        self.access_times[cache_key] = time.time()
        
        # Mark as cached
        response = cached_data['response']
        response.cached = True
        return response
    
    def put(self, request: LLMRequest, response: LLMResponse):
        """Cache a response"""
        cache_key = self._get_cache_key(request)
        response_size = len(response.content)
        
        # Evict if necessary
        while (self.current_size + response_size > self.max_size_bytes and 
               self.cache):
            # Remove least recently used
            lru_key = min(self.access_times.keys(), 
                         key=lambda k: self.access_times[k])
            old_response = self.cache[lru_key]['response']
            self.current_size -= len(old_response.content)
            del self.cache[lru_key]
            del self.access_times[lru_key]
        
        # Add to cache
        self.cache[cache_key] = {
            'response': response,
            'timestamp': time.time()
        }
        self.access_times[cache_key] = time.time()
        self.current_size += response_size

class LLMManager:
    """Unified LLM manager for IZA OS"""
    
    def __init__(self, config_dir: str = "30-models/hosted"):
        self.config_dir = Path(config_dir)
        self.configs = {}
        self.rate_limiters = {}
        self.caches = {}
        self.metrics = {
            'total_requests': 0,
            'cached_responses': 0,
            'rate_limited': 0,
            'errors': 0
        }
        
    async def initialize(self):
        """Initialize the LLM manager"""
        logger.info("🚀 Initializing IZA OS LLM Manager...")
        
        # Load configurations
        await self._load_configurations()
        
        # Initialize rate limiters and caches
        await self._initialize_components()
        
        logger.info("✅ LLM Manager initialized successfully")
        
    async def _load_configurations(self):
        """Load all LLM configurations"""
        config_files = [
            "anthropic/claude-config.yaml",
            "openai/openai-config.yaml", 
            "huggingface/huggingface-config.yaml"
        ]
        
        for config_file in config_files:
            config_path = self.config_dir / config_file
            if config_path.exists():
                with open(config_path) as f:
                    config = yaml.safe_load(f)
                    provider = config_file.split('/')[0]
                    self.configs[provider] = config
                    logger.info(f"📋 Loaded {provider} configuration")
            else:
                logger.warning(f"⚠️ Configuration not found: {config_path}")
                
    async def _initialize_components(self):
        """Initialize rate limiters and caches"""
        for provider, config in self.configs.items():
            # Initialize rate limiter
            rate_config = config.get('rate_limiting', {})
            self.rate_limiters[provider] = RateLimiter(
                rate_config.get('requests_per_minute', 50),
                rate_config.get('burst_capacity', 10)
            )
            
            # Initialize cache
            cache_config = config.get('caching', {})
            if cache_config.get('enabled', True):
                self.caches[provider] = LLMCache(
                    cache_config.get('max_size_mb', 1000),
                    cache_config.get('ttl_minutes', 60)
                )
                
    async def generate(self, request: LLMRequest, provider: str = None) -> LLMResponse:
        """Generate response using specified or best available provider"""
        start_time = time.time()
        
        # Check cache first
        if provider and provider in self.caches:
            cached_response = self.caches[provider].get(request)
            if cached_response:
                self.metrics['cached_responses'] += 1
                logger.info(f"💾 Cache hit for {provider}")
                return cached_response
        
        # Select provider
        if not provider:
            provider = self._select_best_provider(request)
            
        # Check rate limiting
        if not await self.rate_limiters[provider].acquire():
            self.metrics['rate_limited'] += 1
            logger.warning(f"⏳ Rate limited for {provider}")
            raise Exception(f"Rate limit exceeded for {provider}")
        
        # Generate response
        try:
            response_content = await self._call_provider(request, provider)
            response_time = time.time() - start_time
            
            response = LLMResponse(
                content=response_content,
                model=request.model,
                tokens_used=len(response_content.split()),  # Approximate
                response_time=response_time,
                timestamp=datetime.now()
            )
            
            # Cache response
            if provider in self.caches:
                self.caches[provider].put(request, response)
                
            self.metrics['total_requests'] += 1
            logger.info(f"✅ Generated response using {provider} in {response_time:.2f}s")
            
            return response
            
        except Exception as e:
            self.metrics['errors'] += 1
            logger.error(f"❌ Error generating response with {provider}: {e}")
            raise
            
    def _select_best_provider(self, request: LLMRequest) -> str:
        """Select the best provider for the request"""
        # Simple selection logic - can be enhanced
        if "claude" in request.model.lower():
            return "anthropic"
        elif "gpt" in request.model.lower():
            return "openai"
        else:
            return "huggingface"
            
    async def _call_provider(self, request: LLMRequest, provider: str) -> str:
        """Call the actual LLM provider"""
        # This is a placeholder - implement actual API calls
        await asyncio.sleep(0.1)  # Simulate API call
        
        return f"Response from {provider} for: {request.prompt[:50]}..."
        
    def get_metrics(self) -> Dict[str, Any]:
        """Get current metrics"""
        return {
            **self.metrics,
            'cache_sizes': {
                provider: cache.current_size / (1024 * 1024)  # MB
                for provider, cache in self.caches.items()
            },
            'rate_limiter_status': {
                provider: {
                    'requests_in_window': len(limiter.requests),
                    'burst_tokens': limiter.burst_tokens
                }
                for provider, limiter in self.rate_limiters.items()
            }
        }

async def main():
    """Main function for testing"""
    manager = LLMManager()
    
    try:
        await manager.initialize()
        
        # Test request
        request = LLMRequest(
            model="claude-3-sonnet-20240229",
            prompt="Hello, IZA OS! How are you today?",
            max_tokens=100
        )
        
        response = await manager.generate(request, "anthropic")
        print(f"Response: {response.content}")
        print(f"Cached: {response.cached}")
        print(f"Response time: {response.response_time:.2f}s")
        
        # Get metrics
        metrics = manager.get_metrics()
        print(f"Metrics: {json.dumps(metrics, indent=2)}")
        
    except Exception as e:
        logger.error(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

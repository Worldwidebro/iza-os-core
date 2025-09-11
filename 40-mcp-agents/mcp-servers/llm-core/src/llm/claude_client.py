#!/usr/bin/env python3
"""
IZA OS LLM Core MCP Server
FastMCP server for LLM operations
"""

import asyncio
import json
import yaml
import os
from pathlib import Path
from typing import Dict, Any, Optional
import httpx
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LLMCoreServer:
    """LLM Core MCP Server using FastMCP"""
    
    def __init__(self):
        self.config = {}
        self.clients = {}
        
    async def initialize(self):
        """Initialize the LLM core server"""
        logger.info("🚀 Initializing IZA OS LLM Core Server...")
        
        # Load configuration
        config_path = Path("config/model_config.yaml")
        if config_path.exists():
            with open(config_path) as f:
                self.config = yaml.safe_load(f)
                logger.info("📋 Loaded LLM configuration")
        
        # Initialize HTTP clients
        await self._initialize_clients()
        
        logger.info("✅ LLM Core Server initialized")
        
    async def _initialize_clients(self):
        """Initialize HTTP clients for different providers"""
        models_config = self.config.get('models', {})
        
        # Initialize Anthropic client
        if 'claude' in models_config:
            claude_config = models_config['claude']
            api_key = os.getenv('ANTHROPIC_API_KEY')
            if api_key:
                self.clients['anthropic'] = httpx.AsyncClient(
                    base_url="https://api.anthropic.com",
                    headers={
                        "x-api-key": api_key,
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json"
                    },
                    timeout=claude_config.get('timeout', 30)
                )
                logger.info("✅ Anthropic client initialized")
        
        # Initialize OpenAI client
        if 'openai' in models_config:
            openai_config = models_config['openai']
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.clients['openai'] = httpx.AsyncClient(
                    base_url="https://api.openai.com/v1",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "content-type": "application/json"
                    },
                    timeout=openai_config.get('timeout', 30)
                )
                logger.info("✅ OpenAI client initialized")
        
        # Initialize Hugging Face client
        if 'huggingface' in models_config:
            hf_config = models_config['huggingface']
            api_key = os.getenv('HUGGINGFACE_API_KEY')
            if api_key:
                self.clients['huggingface'] = httpx.AsyncClient(
                    base_url="https://api-inference.huggingface.co",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "content-type": "application/json"
                    },
                    timeout=hf_config.get('timeout', 60)
                )
                logger.info("✅ Hugging Face client initialized")
    
    async def generate_text(self, provider: str, model: str, prompt: str, 
                          max_tokens: int = 4096, temperature: float = 0.7) -> Dict[str, Any]:
        """Generate text using specified provider"""
        try:
            if provider == 'anthropic':
                return await self._call_anthropic(model, prompt, max_tokens, temperature)
            elif provider == 'openai':
                return await self._call_openai(model, prompt, max_tokens, temperature)
            elif provider == 'huggingface':
                return await self._call_huggingface(model, prompt, max_tokens, temperature)
            else:
                raise ValueError(f"Unknown provider: {provider}")
                
        except Exception as e:
            logger.error(f"Error generating text with {provider}: {e}")
            return {
                "error": str(e),
                "provider": provider,
                "model": model
            }
    
    async def _call_anthropic(self, model: str, prompt: str, max_tokens: int, temperature: float) -> Dict[str, Any]:
        """Call Anthropic Claude API"""
        if 'anthropic' not in self.clients:
            raise ValueError("Anthropic client not initialized")
        
        payload = {
            "model": model,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        response = await self.clients['anthropic'].post("/v1/messages", json=payload)
        response.raise_for_status()
        
        data = response.json()
        return {
            "content": data["content"][0]["text"],
            "provider": "anthropic",
            "model": model,
            "usage": data.get("usage", {}),
            "response_time": response.elapsed.total_seconds()
        }
    
    async def _call_openai(self, model: str, prompt: str, max_tokens: int, temperature: float) -> Dict[str, Any]:
        """Call OpenAI API"""
        if 'openai' not in self.clients:
            raise ValueError("OpenAI client not initialized")
        
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        response = await self.clients['openai'].post("/chat/completions", json=payload)
        response.raise_for_status()
        
        data = response.json()
        return {
            "content": data["choices"][0]["message"]["content"],
            "provider": "openai",
            "model": model,
            "usage": data.get("usage", {}),
            "response_time": response.elapsed.total_seconds()
        }
    
    async def _call_huggingface(self, model: str, prompt: str, max_tokens: int, temperature: float) -> Dict[str, Any]:
        """Call Hugging Face API"""
        if 'huggingface' not in self.clients:
            raise ValueError("Hugging Face client not initialized")
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": max_tokens,
                "temperature": temperature,
                "return_full_text": False
            }
        }
        
        response = await self.clients['huggingface'].post(f"/models/{model}", json=payload)
        response.raise_for_status()
        
        data = response.json()
        return {
            "content": data[0]["generated_text"],
            "provider": "huggingface",
            "model": model,
            "usage": {"total_tokens": len(prompt.split()) + len(data[0]["generated_text"].split())},
            "response_time": response.elapsed.total_seconds()
        }
    
    async def get_available_models(self) -> Dict[str, list]:
        """Get available models for each provider"""
        models_config = self.config.get('models', {})
        
        available_models = {}
        for provider, config in models_config.items():
            if provider == 'claude':
                available_models['anthropic'] = [
                    "claude-3-sonnet-20240229",
                    "claude-3-haiku-20240307",
                    "claude-3-opus-20240229"
                ]
            elif provider == 'openai':
                available_models['openai'] = [
                    "gpt-4-turbo-preview",
                    "gpt-4",
                    "gpt-3.5-turbo"
                ]
            elif provider == 'huggingface':
                available_models['huggingface'] = [
                    "mistralai/Mistral-7B-Instruct-v0.2",
                    "microsoft/DialoGPT-medium",
                    "facebook/blenderbot-400M-distill"
                ]
        
        return available_models
    
    async def get_server_status(self) -> Dict[str, Any]:
        """Get server status and health"""
        status = {
            "status": "running",
            "providers": list(self.clients.keys()),
            "config_loaded": bool(self.config),
            "clients_initialized": len(self.clients)
        }
        
        # Test each client
        for provider, client in self.clients.items():
            try:
                # Simple health check
                if provider == 'anthropic':
                    status[f"{provider}_healthy"] = True
                elif provider == 'openai':
                    status[f"{provider}_healthy"] = True
                elif provider == 'huggingface':
                    status[f"{provider}_healthy"] = True
            except Exception as e:
                status[f"{provider}_healthy"] = False
                status[f"{provider}_error"] = str(e)
        
        return status

# FastMCP app instance
app = None

async def create_app():
    """Create FastMCP app instance"""
    global app
    
    # Initialize server
    server = LLMCoreServer()
    await server.initialize()
    
    # Create FastMCP app (placeholder - would use actual FastMCP)
    app = {
        "server": server,
        "status": "initialized"
    }
    
    return app

if __name__ == "__main__":
    # For testing
    async def main():
        server = LLMCoreServer()
        await server.initialize()
        
        # Test status
        status = await server.get_server_status()
        print(f"Server Status: {json.dumps(status, indent=2)}")
        
        # Test available models
        models = await server.get_available_models()
        print(f"Available Models: {json.dumps(models, indent=2)}")
    
    asyncio.run(main())

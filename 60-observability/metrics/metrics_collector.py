#!/usr/bin/env python3
"""
IZA OS Metrics Collector
Collects and exposes metrics for Prometheus monitoring
"""

import asyncio
import json
import time
from typing import Dict, Any
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import logging

logger = logging.getLogger(__name__)

class IZAOSMetrics:
    """Metrics collector for IZA OS"""
    
    def __init__(self, port: int = 9090):
        self.port = port
        
        # LLM Metrics
        self.llm_requests_total = Counter(
            'iza_os_llm_requests_total',
            'Total LLM requests',
            ['provider', 'model', 'status']
        )
        
        self.llm_request_duration = Histogram(
            'iza_os_llm_request_duration_seconds',
            'LLM request duration',
            ['provider', 'model']
        )
        
        self.llm_tokens_used = Counter(
            'iza_os_llm_tokens_total',
            'Total tokens used',
            ['provider', 'model']
        )
        
        # Agent Metrics
        self.agent_tasks_total = Counter(
            'iza_os_agent_tasks_total',
            'Total agent tasks',
            ['agent_name', 'task_type', 'status']
        )
        
        self.agent_task_duration = Histogram(
            'iza_os_agent_task_duration_seconds',
            'Agent task duration',
            ['agent_name', 'task_type']
        )
        
        # MCP Server Metrics
        self.mcp_connections = Gauge(
            'iza_os_mcp_connections',
            'Active MCP connections',
            ['server_name']
        )
        
        self.mcp_requests_total = Counter(
            'iza_os_mcp_requests_total',
            'Total MCP requests',
            ['server_name', 'method']
        )
        
        # System Metrics
        self.system_uptime = Gauge(
            'iza_os_system_uptime_seconds',
            'System uptime in seconds'
        )
        
        self.active_agents = Gauge(
            'iza_os_active_agents',
            'Number of active agents'
        )
        
        self.cache_hit_ratio = Gauge(
            'iza_os_cache_hit_ratio',
            'Cache hit ratio',
            ['cache_name']
        )
        
        self.start_time = time.time()
        
    def start_server(self):
        """Start Prometheus metrics server"""
        start_http_server(self.port)
        logger.info(f"📊 Metrics server started on port {self.port}")
        
    def record_llm_request(self, provider: str, model: str, 
                          duration: float, tokens: int, status: str = "success"):
        """Record LLM request metrics"""
        self.llm_requests_total.labels(
            provider=provider, 
            model=model, 
            status=status
        ).inc()
        
        self.llm_request_duration.labels(
            provider=provider, 
            model=model
        ).observe(duration)
        
        self.llm_tokens_used.labels(
            provider=provider, 
            model=model
        ).inc(tokens)
        
    def record_agent_task(self, agent_name: str, task_type: str, 
                          duration: float, status: str = "success"):
        """Record agent task metrics"""
        self.agent_tasks_total.labels(
            agent_name=agent_name,
            task_type=task_type,
            status=status
        ).inc()
        
        self.agent_task_duration.labels(
            agent_name=agent_name,
            task_type=task_type
        ).observe(duration)
        
    def update_mcp_connection(self, server_name: str, connected: bool):
        """Update MCP connection status"""
        self.mcp_connections.labels(server_name=server_name).set(
            1 if connected else 0
        )
        
    def record_mcp_request(self, server_name: str, method: str):
        """Record MCP request"""
        self.mcp_requests_total.labels(
            server_name=server_name,
            method=method
        ).inc()
        
    def update_system_metrics(self, active_agents: int, cache_metrics: Dict[str, float]):
        """Update system-wide metrics"""
        self.system_uptime.set(time.time() - self.start_time)
        self.active_agents.set(active_agents)
        
        for cache_name, hit_ratio in cache_metrics.items():
            self.cache_hit_ratio.labels(cache_name=cache_name).set(hit_ratio)

class MetricsCollector:
    """Collects metrics from various IZA OS components"""
    
    def __init__(self, metrics: IZAOSMetrics):
        self.metrics = metrics
        self.running = False
        
    async def start(self):
        """Start metrics collection"""
        self.running = True
        logger.info("📊 Starting metrics collection...")
        
        while self.running:
            try:
                await self._collect_metrics()
                await asyncio.sleep(30)  # Collect every 30 seconds
            except Exception as e:
                logger.error(f"Error collecting metrics: {e}")
                await asyncio.sleep(60)  # Wait longer on error
                
    def stop(self):
        """Stop metrics collection"""
        self.running = False
        logger.info("📊 Stopped metrics collection")
        
    async def _collect_metrics(self):
        """Collect metrics from system components"""
        # This would integrate with actual IZA OS components
        # For now, we'll simulate some metrics
        
        # Simulate active agents
        active_agents = 5  # Would come from orchestrator
        
        # Simulate cache metrics
        cache_metrics = {
            'llm_cache': 0.85,  # 85% hit ratio
            'knowledge_cache': 0.92,
            'agent_cache': 0.78
        }
        
        self.metrics.update_system_metrics(active_agents, cache_metrics)

async def main():
    """Main function for testing metrics"""
    metrics = IZAOSMetrics(port=9090)
    collector = MetricsCollector(metrics)
    
    # Start metrics server
    metrics.start_server()
    
    # Start collection
    await collector.start()

if __name__ == "__main__":
    asyncio.run(main())

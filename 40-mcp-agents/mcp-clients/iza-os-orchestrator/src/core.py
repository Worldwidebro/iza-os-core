#!/usr/bin/env python3
"""
IZA OS Orchestrator - The Core Brain
Coordinates all MCP agents and tools in the IZA OS ecosystem
"""

import asyncio
import json
import logging
from typing import Dict, List, Optional
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IZAOSOrchestrator:
    """The core orchestrator that manages all IZA OS components"""
    
    def __init__(self):
        self.agents = {}
        self.mcp_servers = {}
        self.tools = {}
        self.knowledge_base = None
        self.status = "initializing"
        
    async def initialize(self):
        """Initialize the orchestrator and all components"""
        logger.info("🚀 Initializing IZA OS Orchestrator...")
        
        # Load configuration
        await self.load_config()
        
        # Initialize MCP servers
        await self.initialize_mcp_servers()
        
        # Initialize agents
        await self.initialize_agents()
        
        # Initialize knowledge base
        await self.initialize_knowledge_base()
        
        self.status = "running"
        logger.info("✅ IZA OS Orchestrator initialized successfully")
        
    async def load_config(self):
        """Load orchestrator configuration"""
        config_path = Path("config/orchestrator.json")
        if config_path.exists():
            with open(config_path) as f:
                config = json.load(f)
                logger.info(f"📋 Loaded configuration: {config}")
        else:
            logger.info("📋 Using default configuration")
            
    async def initialize_mcp_servers(self):
        """Initialize MCP servers"""
        logger.info("🔌 Initializing MCP servers...")
        
        # Initialize core MCP servers
        self.mcp_servers = {
            "filesystem": {"status": "ready", "port": 8001},
            "git": {"status": "ready", "port": 8002},
            "database": {"status": "ready", "port": 8003},
            "api": {"status": "ready", "port": 8004}
        }
        
        logger.info(f"✅ Initialized {len(self.mcp_servers)} MCP servers")
        
    async def initialize_agents(self):
        """Initialize AI agents"""
        logger.info("🤖 Initializing AI agents...")
        
        # Initialize core agents
        self.agents = {
            "product_manager": {
                "status": "ready",
                "capabilities": ["requirements", "planning", "coordination"]
            },
            "tech_lead": {
                "status": "ready", 
                "capabilities": ["architecture", "code_review", "technical_decisions"]
            },
            "finance_agent": {
                "status": "ready",
                "capabilities": ["budgeting", "cost_analysis", "revenue_tracking"]
            },
            "marketing_agent": {
                "status": "ready",
                "capabilities": ["campaigns", "content", "analytics"]
            },
            "operations_agent": {
                "status": "ready",
                "capabilities": ["deployment", "monitoring", "maintenance"]
            }
        }
        
        logger.info(f"✅ Initialized {len(self.agents)} AI agents")
        
    async def initialize_knowledge_base(self):
        """Initialize knowledge base"""
        logger.info("🧠 Initializing knowledge base...")
        
        self.knowledge_base = {
            "status": "ready",
            "vector_db": "qdrant",
            "graph_db": "neo4j",
            "embeddings": "openai"
        }
        
        logger.info("✅ Knowledge base initialized")
        
    async def execute_task(self, task: str, agent: str = None) -> Dict:
        """Execute a task using the appropriate agent"""
        logger.info(f"📋 Executing task: {task}")
        
        if agent and agent in self.agents:
            logger.info(f"🤖 Using agent: {agent}")
            return await self._execute_with_agent(task, agent)
        else:
            # Auto-select best agent
            best_agent = self._select_best_agent(task)
            logger.info(f"🎯 Auto-selected agent: {best_agent}")
            return await self._execute_with_agent(task, best_agent)
            
    def _select_best_agent(self, task: str) -> str:
        """Select the best agent for a given task"""
        task_lower = task.lower()
        
        if any(word in task_lower for word in ["product", "requirement", "plan"]):
            return "product_manager"
        elif any(word in task_lower for word in ["tech", "code", "architecture", "develop"]):
            return "tech_lead"
        elif any(word in task_lower for word in ["finance", "budget", "cost", "revenue"]):
            return "finance_agent"
        elif any(word in task_lower for word in ["marketing", "campaign", "content", "social"]):
            return "marketing_agent"
        elif any(word in task_lower for word in ["deploy", "monitor", "maintain", "ops"]):
            return "operations_agent"
        else:
            return "product_manager"  # Default fallback
            
    async def _execute_with_agent(self, task: str, agent: str) -> Dict:
        """Execute task with specific agent"""
        # Simulate task execution
        await asyncio.sleep(0.1)  # Simulate processing time
        
        return {
            "task": task,
            "agent": agent,
            "status": "completed",
            "result": f"Task '{task}' completed by {agent}",
            "timestamp": asyncio.get_event_loop().time()
        }
        
    def get_status(self) -> Dict:
        """Get orchestrator status"""
        return {
            "status": self.status,
            "agents": len(self.agents),
            "mcp_servers": len(self.mcp_servers),
            "knowledge_base": self.knowledge_base["status"] if self.knowledge_base else "not_initialized"
        }

async def main():
    """Main function"""
    orchestrator = IZAOSOrchestrator()
    
    try:
        await orchestrator.initialize()
        
        # Example task execution
        result = await orchestrator.execute_task("Create a new product roadmap")
        print(f"Task result: {result}")
        
        # Keep running
        logger.info("🔄 IZA OS Orchestrator running... Press Ctrl+C to stop")
        while True:
            await asyncio.sleep(1)
            
    except KeyboardInterrupt:
        logger.info("🛑 Shutting down IZA OS Orchestrator...")
    except Exception as e:
        logger.error(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

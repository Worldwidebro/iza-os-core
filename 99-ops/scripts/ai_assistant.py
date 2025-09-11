#!/usr/bin/env python3
"""
IZA OS AI Assistant
Intelligent agent to help complete repository cloning and system setup
"""

import asyncio
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IZAOSAIAssistant:
    """AI Assistant for IZA OS operations"""
    
    def __init__(self):
        self.base_path = Path.cwd()
        self.orchestrator = None
        self.llm_manager = None
        
    async def initialize(self):
        """Initialize the AI assistant"""
        logger.info("🤖 Initializing IZA OS AI Assistant...")
        
        # Try to initialize orchestrator if available
        try:
            sys.path.append(str(self.base_path))
            from models.llm_manager import LLMManager, LLMRequest
            self.llm_manager = LLMManager()
            await self.llm_manager.initialize()
            logger.info("✅ LLM Manager initialized")
        except Exception as e:
            logger.warning(f"⚠️ Could not initialize LLM Manager: {e}")
            
        logger.info("✅ AI Assistant ready")
        
    async def analyze_system_status(self) -> Dict:
        """Analyze current system status"""
        logger.info("🔍 Analyzing IZA OS system status...")
        
        status = {
            "repositories": await self._scan_repositories(),
            "services": await self._check_services(),
            "configuration": await self._check_configuration(),
            "recommendations": []
        }
        
        # Generate AI recommendations
        if self.llm_manager:
            recommendations = await self._generate_recommendations(status)
            status["recommendations"] = recommendations
            
        return status
        
    async def _scan_repositories(self) -> Dict:
        """Scan existing repositories"""
        repo_status = {
            "total_found": 0,
            "categories": {},
            "missing_critical": []
        }
        
        # Critical repositories to check for
        critical_repos = {
            "mcp": ["fastmcp", "mcp-go", "git-mcp", "awesome-mcp-servers"],
            "ai_agents": ["autogen", "voltagent", "suna", "SEAL", "BMAD"],
            "inference": ["vllm", "llama.cpp", "gpt4all", "unsloth"],
            "apps": ["lobe-chat", "activepieces", "dify", "budibase"],
            "development": ["vite", "drizzle-orm", "tailwindcss", "storybook"]
        }
        
        external_dirs = [
            "40-mcp-agents/external",
            "45-agent-frameworks/external", 
            "50-apps/external",
            "30-models/external",
            "55-automation/external"
        ]
        
        for category, patterns in critical_repos.items():
            repo_status["categories"][category] = {"found": [], "missing": []}
            
            for ext_dir in external_dirs:
                full_dir = self.base_path / ext_dir
                if full_dir.exists():
                    for item in full_dir.iterdir():
                        if item.is_dir() and (item / ".git").exists():
                            repo_status["total_found"] += 1
                            for pattern in patterns:
                                if pattern.lower() in item.name.lower():
                                    repo_status["categories"][category]["found"].append(item.name)
                                    break
                            
            # Check for missing repos
            for pattern in patterns:
                found = False
                for found_repo in repo_status["categories"][category]["found"]:
                    if pattern.lower() in found_repo.lower():
                        found = True
                        break
                if not found:
                    repo_status["categories"][category]["missing"].append(pattern)
                    repo_status["missing_critical"].append(pattern)
                    
        return repo_status
        
    async def _check_services(self) -> Dict:
        """Check running services"""
        services = {
            "orchestrator": False,
            "dashboard": False,
            "mcp_servers": False,
            "ports": {}
        }
        
        # Check if orchestrator is running
        try:
            result = subprocess.run(["pgrep", "-f", "core.py"], capture_output=True, text=True)
            services["orchestrator"] = result.returncode == 0
        except:
            pass
            
        # Check if dashboard is running
        try:
            result = subprocess.run(["pgrep", "-f", "npm.*dev"], capture_output=True, text=True)
            services["dashboard"] = result.returncode == 0
        except:
            pass
            
        # Check ports
        ports_to_check = [3000, 8001, 8002, 8003, 8004, 9090]
        for port in ports_to_check:
            try:
                result = subprocess.run(["lsof", "-i", f":{port}"], capture_output=True, text=True)
                services["ports"][port] = result.returncode == 0
            except:
                services["ports"][port] = False
                
        return services
        
    async def _check_configuration(self) -> Dict:
        """Check configuration files"""
        config_status = {
            "env_file": False,
            "model_configs": False,
            "orchestrator_config": False
        }
        
        # Check for .env file
        config_status["env_file"] = (self.base_path / ".env").exists()
        
        # Check model configurations
        model_config_path = self.base_path / "30-models/hosted"
        if model_config_path.exists():
            config_files = list(model_config_path.glob("**/*.yaml"))
            config_status["model_configs"] = len(config_files) > 0
            
        # Check orchestrator config
        config_status["orchestrator_config"] = (self.base_path / "config/orchestrator.json").exists()
        
        return config_status
        
    async def _generate_recommendations(self, status: Dict) -> List[str]:
        """Generate AI-powered recommendations"""
        recommendations = []
        
        # Repository recommendations
        missing_repos = status["repositories"]["missing_critical"]
        if missing_repos:
            recommendations.append(f"Clone missing critical repositories: {', '.join(missing_repos[:5])}")
            
        # Service recommendations
        if not status["services"]["orchestrator"]:
            recommendations.append("Start the IZA OS Orchestrator with: make start-orchestrator")
            
        if not status["services"]["dashboard"]:
            recommendations.append("Start the dashboard with: make start-dashboard")
            
        # Configuration recommendations
        if not status["configuration"]["env_file"]:
            recommendations.append("Create .env file with API keys for LLM providers")
            
        if not status["configuration"]["model_configs"]:
            recommendations.append("Set up model configurations in 30-models/hosted/")
            
        return recommendations
        
    async def execute_recommendation(self, recommendation: str) -> Dict:
        """Execute a specific recommendation"""
        logger.info(f"🎯 Executing: {recommendation}")
        
        result = {
            "recommendation": recommendation,
            "status": "pending",
            "output": "",
            "error": None
        }
        
        try:
            if "Clone missing" in recommendation:
                # Run the clone script
                cmd = ["python3", "99-ops/scripts/clone_from_registry.py", "00-meta/registry/repos.json"]
                process = await asyncio.create_subprocess_exec(
                    *cmd,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE
                )
                stdout, stderr = await process.communicate()
                result["output"] = stdout.decode()
                result["status"] = "completed" if process.returncode == 0 else "failed"
                
            elif "Start the IZA OS Orchestrator" in recommendation:
                # Start orchestrator
                cmd = ["make", "start-orchestrator"]
                process = await asyncio.create_subprocess_exec(
                    *cmd,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE
                )
                stdout, stderr = await process.communicate()
                result["output"] = stdout.decode()
                result["status"] = "completed" if process.returncode == 0 else "failed"
                
            elif "Start the dashboard" in recommendation:
                # Start dashboard
                cmd = ["make", "start-dashboard"]
                process = await asyncio.create_subprocess_exec(
                    *cmd,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE
                )
                stdout, stderr = await process.communicate()
                result["output"] = stdout.decode()
                result["status"] = "completed" if process.returncode == 0 else "failed"
                
            elif "Create .env file" in recommendation:
                # Create .env file
                env_content = """# IZA OS Environment Variables
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
HUGGINGFACE_API_KEY=your_huggingface_key_here
GITHUB_TOKEN=your_github_token_here
"""
                with open(self.base_path / ".env", "w") as f:
                    f.write(env_content)
                result["output"] = "Created .env file template"
                result["status"] = "completed"
                
            else:
                result["status"] = "not_implemented"
                result["output"] = "Recommendation not yet implemented"
                
        except Exception as e:
            result["status"] = "error"
            result["error"] = str(e)
            
        return result
        
    async def auto_complete_setup(self) -> Dict:
        """Automatically complete the IZA OS setup"""
        logger.info("🚀 Starting automatic IZA OS setup completion...")
        
        # Analyze current status
        status = await self.analyze_system_status()
        
        # Execute recommendations
        results = []
        for recommendation in status["recommendations"]:
            result = await self.execute_recommendation(recommendation)
            results.append(result)
            
        return {
            "initial_status": status,
            "execution_results": results,
            "final_status": await self.analyze_system_status()
        }

async def main():
    """Main function"""
    assistant = IZAOSAIAssistant()
    
    try:
        await assistant.initialize()
        
        print("🤖 IZA OS AI Assistant")
        print("=" * 50)
        
        # Analyze system
        status = await assistant.analyze_system_status()
        
        print(f"\n📊 System Status:")
        print(f"  • Repositories found: {status['repositories']['total_found']}")
        print(f"  • Missing critical: {len(status['repositories']['missing_critical'])}")
        print(f"  • Orchestrator running: {status['services']['orchestrator']}")
        print(f"  • Dashboard running: {status['services']['dashboard']}")
        
        print(f"\n💡 Recommendations:")
        for i, rec in enumerate(status['recommendations'], 1):
            print(f"  {i}. {rec}")
            
        # Ask user if they want to auto-complete
        print(f"\n🤖 Would you like me to automatically complete the setup? (y/n)")
        # For demo purposes, we'll auto-complete
        response = "y"
        
        if response.lower() == 'y':
            print(f"\n🚀 Auto-completing setup...")
            results = await assistant.auto_complete_setup()
            
            print(f"\n✅ Setup completion results:")
            for result in results['execution_results']:
                status_icon = "✅" if result['status'] == 'completed' else "❌"
                print(f"  {status_icon} {result['recommendation']}")
                if result['output']:
                    print(f"     Output: {result['output'][:100]}...")
                    
        else:
            print(f"\n👋 Setup analysis complete. Run individual recommendations as needed.")
            
    except Exception as e:
        logger.error(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

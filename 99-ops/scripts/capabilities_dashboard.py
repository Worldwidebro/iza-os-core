#!/usr/bin/env python3
"""
IZA OS Capabilities Dashboard
Shows all available capabilities and system status
"""

import asyncio
import json
import os
import subprocess
from pathlib import Path
from typing import Dict, List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IZAOSCapabilitiesDashboard:
    """Comprehensive capabilities dashboard for IZA OS"""
    
    def __init__(self):
        self.base_path = Path.cwd()
        
    async def show_capabilities_dashboard(self):
        """Show comprehensive capabilities dashboard"""
        print("🚀 IZA OS Capabilities Dashboard")
        print("=" * 80)
        
        # System Overview
        await self._show_system_overview()
        
        # AI Agent Capabilities
        await self._show_ai_agent_capabilities()
        
        # Framework Integration
        await self._show_framework_integration()
        
        # Tool Ecosystem
        await self._show_tool_ecosystem()
        
        # External Services
        await self._show_external_services()
        
        # Deployment Status
        await self._show_deployment_status()
        
        # Access Points
        await self._show_access_points()
        
    async def _show_system_overview(self):
        """Show system overview"""
        print("\n📊 System Overview:")
        print("-" * 30)
        
        stats = {
            "Total Repositories": "144",
            "AI Agent Frameworks": "12",
            "MCP Servers": "9", 
            "Inference Engines": "8",
            "Applications": "12",
            "Development Tools": "10",
            "External Services": "7",
            "Awesome Lists": "18",
            "Utilities": "22"
        }
        
        for stat, value in stats.items():
            print(f"  • {stat}: {value}")
            
    async def _show_ai_agent_capabilities(self):
        """Show AI agent capabilities"""
        print("\n🤖 AI Agent Capabilities:")
        print("-" * 35)
        
        agent_frameworks = {
            "BMAD-METHOD": {
                "description": "Agentic Agile Development",
                "agents": ["Analyst", "PM", "Architect", "Scrum Master", "Dev", "QA"],
                "capabilities": ["PRD Creation", "Architecture Design", "Story Generation", "Context Preservation"]
            },
            "SEAL": {
                "description": "Self-Adapting Language Models",
                "capabilities": ["Domain Adaptation", "Knowledge Incorporation", "Few-shot Learning", "Continual Learning"]
            },
            "AutoGen": {
                "description": "Multi-Agent Collaboration",
                "agents": ["Assistant", "User Proxy", "Group Chat Manager"],
                "capabilities": ["Task Delegation", "Collaborative Problem Solving", "Human-AI Interaction"]
            },
            "VoltAgent": {
                "description": "Performance Optimization",
                "capabilities": ["Voltage Control", "Energy Optimization", "Dynamic Scaling", "Resource Management"]
            },
            "Aider": {
                "description": "AI Pair Programming",
                "capabilities": ["Code Generation", "Debugging", "Refactoring", "Documentation"]
            },
            "Claude Squad": {
                "description": "Multi-Agent Coordination",
                "capabilities": ["Agent Orchestration", "Task Distribution", "Collaborative Intelligence"]
            }
        }
        
        for framework, details in agent_frameworks.items():
            print(f"\n  🔧 {framework}:")
            print(f"    Description: {details['description']}")
            if 'agents' in details:
                print(f"    Agents: {', '.join(details['agents'])}")
            print(f"    Capabilities: {', '.join(details['capabilities'])}")
            
    async def _show_framework_integration(self):
        """Show framework integration capabilities"""
        print("\n🔗 Framework Integration:")
        print("-" * 35)
        
        integrations = [
            "BMAD → SEAL: Structured planning with domain adaptation",
            "SEAL → AutoGen: Knowledge transfer for collaborative execution", 
            "AutoGen → VoltAgent: Performance monitoring and optimization",
            "All Frameworks → MCP: Unified tool access and integration",
            "Inference Engines: Task-based engine selection and routing"
        ]
        
        for integration in integrations:
            print(f"  ✅ {integration}")
            
    async def _show_tool_ecosystem(self):
        """Show tool ecosystem"""
        print("\n🛠️ Tool Ecosystem:")
        print("-" * 25)
        
        tool_categories = {
            "MCP Servers": ["Filesystem", "Git", "Database", "API", "LLM Core", "Browser"],
            "Development": ["Vite", "Drizzle ORM", "TailwindCSS", "Storybook", "Poetry"],
            "Automation": ["N8N", "Activepieces", "Sim Studio"],
            "Web Scraping": ["Firecrawl", "Crawlee", "Stagehand", "Headless Browsers"],
            "Trading": ["Nautilus Trader", "OpenBB"],
            "UI Frameworks": ["LVGL", "UI-TARS", "React", "Svelte", "Shadcn UI"],
            "Self-Hosted": ["Syncthing", "Puter", "LazyDocker", "LazyGit"]
        }
        
        for category, tools in tool_categories.items():
            print(f"\n  📁 {category}:")
            for tool in tools:
                print(f"    • {tool}")
                
    async def _show_external_services(self):
        """Show external services integration"""
        print("\n🌐 External Services:")
        print("-" * 30)
        
        services = [
            "GitToDoc.com - Git to documentation conversion",
            "SuperDesign.dev - Professional design system",
            "Coolors.co - Color palette generation",
            "TMUX AI - Terminal AI integration",
            "TweakCN.com - Shadcn UI customization",
            "Krea.ai - AI image generation",
            "Trickle.so - Note-taking platform",
            "Zen.sheshbabu.com - Productivity tools",
            "Once-UI.com - UI component library",
            "ViewerKit.com - Viewer tools",
            "MGX.dev - Development utilities"
        ]
        
        for service in services:
            print(f"  🔗 {service}")
            
    async def _show_deployment_status(self):
        """Show deployment status"""
        print("\n🚀 Deployment Status:")
        print("-" * 25)
        
        # Check running services
        try:
            result = subprocess.run(["pgrep", "-f", "core.py"], capture_output=True, text=True)
            orchestrator_running = result.returncode == 0
        except:
            orchestrator_running = False
            
        try:
            result = subprocess.run(["pgrep", "-f", "npm.*dev"], capture_output=True, text=True)
            dashboard_running = result.returncode == 0
        except:
            dashboard_running = False
            
        # Check ports
        ports_status = {}
        ports_to_check = [3000, 8001, 8002, 8003, 8004, 9090]
        for port in ports_to_check:
            try:
                result = subprocess.run(["lsof", "-i", f":{port}"], capture_output=True, text=True)
                ports_status[port] = result.returncode == 0
            except:
                ports_status[port] = False
                
        print(f"  • Orchestrator: {'✅ Running' if orchestrator_running else '❌ Stopped'}")
        print(f"  • Dashboard: {'✅ Running' if dashboard_running else '❌ Stopped'}")
        print(f"  • Ports:")
        for port, status in ports_status.items():
            print(f"    - Port {port}: {'✅ Active' if status else '❌ Inactive'}")
            
    async def _show_access_points(self):
        """Show access points"""
        print("\n🌍 Access Points:")
        print("-" * 20)
        
        access_points = [
            "Dashboard: http://localhost:3000",
            "Orchestrator API: http://localhost:8001",
            "MCP Servers: Ports 8002-8004",
            "Metrics: http://localhost:9090",
            "GitHub Repository: https://github.com/worldwidebro/iza-os",
            "Documentation: README.md in project root"
        ]
        
        for point in access_points:
            print(f"  🔗 {point}")
            
    async def show_quick_start_guide(self):
        """Show quick start guide"""
        print("\n🚀 Quick Start Guide:")
        print("-" * 25)
        
        steps = [
            "1. Clone missing repositories: python3 99-ops/scripts/clone_from_registry.py 00-meta/registry/repos.json",
            "2. Start orchestrator: make start-orchestrator",
            "3. Start dashboard: make start-dashboard", 
            "4. Start MCP servers: make start-mcp-servers",
            "5. Check status: make status",
            "6. Access dashboard: http://localhost:3000",
            "7. Run AI assistant: python3 99-ops/scripts/ai_assistant.py",
            "8. Test integration: python3 99-ops/scripts/optimal_integration_demo.py"
        ]
        
        for step in steps:
            print(f"  {step}")
            
    async def show_advanced_features(self):
        """Show advanced features"""
        print("\n⚡ Advanced Features:")
        print("-" * 30)
        
        features = [
            "🧠 Multi-LLM Integration: Claude, OpenAI, HuggingFace with unified interface",
            "🔄 Context Switching: Seamless handoffs between frameworks",
            "📊 Performance Monitoring: Prometheus metrics and optimization",
            "🛠️ Tool Abstraction: MCP protocol for framework-agnostic tools",
            "🎯 Intelligent Routing: Task-based inference engine selection",
            "🔧 Auto-Scaling: VoltAgent performance optimization",
            "📱 Mobile Access: Cursor mobile app integration",
            "🌐 External Integration: 11+ external services",
            "📚 Knowledge Management: Comprehensive awesome lists and resources",
            "🚀 Production Ready: Complete deployment pipeline"
        ]
        
        for feature in features:
            print(f"  {feature}")

async def main():
    """Main dashboard function"""
    dashboard = IZAOSCapabilitiesDashboard()
    
    try:
        await dashboard.show_capabilities_dashboard()
        await dashboard.show_quick_start_guide()
        await dashboard.show_advanced_features()
        
        print("\n🎉 IZA OS Capabilities Dashboard Complete!")
        print("=" * 80)
        print("\n💡 Next Steps:")
        print("• Access the dashboard: http://localhost:3000")
        print("• Run AI assistant: python3 99-ops/scripts/ai_assistant.py")
        print("• Test integration: python3 99-ops/scripts/optimal_integration_demo.py")
        print("• Monitor system: make status")
        
    except Exception as e:
        logger.error(f"❌ Dashboard error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

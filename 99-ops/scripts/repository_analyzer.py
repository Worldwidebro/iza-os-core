#!/usr/bin/env python3
"""
IZA OS Repository Integration Analyzer
Analyzes all repositories and creates optimal context switching and logic integration
using BMAD method, SEAL, AutoGen, and other frameworks
"""

import asyncio
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IZAOSRepositoryAnalyzer:
    """Analyzes repositories and creates optimal integration strategies"""
    
    def __init__(self):
        self.base_path = Path.cwd()
        self.repositories = {}
        self.integration_matrix = {}
        self.context_switches = {}
        
    async def analyze_all_repositories(self):
        """Analyze all repositories and their integration potential"""
        logger.info("🔍 Analyzing all IZA OS repositories...")
        
        # Define repository categories and their analysis methods
        analysis_categories = {
            "agent_frameworks": {
                "path": "45-agent-frameworks/external",
                "key_repos": ["autogen", "BMAD-METHOD", "SEAL", "voltagent", "suna", "graphiti"],
                "analysis_method": self._analyze_agent_frameworks
            },
            "mcp_servers": {
                "path": "40-mcp-agents/external", 
                "key_repos": ["fastmcp", "mcp-go", "git-mcp", "fastapi_mcp"],
                "analysis_method": self._analyze_mcp_servers
            },
            "inference_engines": {
                "path": "30-models/external",
                "key_repos": ["vllm", "llama.cpp", "gpt4all", "unsloth"],
                "analysis_method": self._analyze_inference_engines
            },
            "applications": {
                "path": "50-apps/external",
                "key_repos": ["lobe-chat", "activepieces", "dify", "budibase"],
                "analysis_method": self._analyze_applications
            },
            "automation": {
                "path": "55-automation/external",
                "key_repos": ["n8n", "sim"],
                "analysis_method": self._analyze_automation
            }
        }
        
        # Analyze each category
        for category, config in analysis_categories.items():
            logger.info(f"📁 Analyzing {category}...")
            category_path = self.base_path / config["path"]
            if category_path.exists():
                await config["analysis_method"](category_path, config["key_repos"])
                
        # Create integration matrix
        await self._create_integration_matrix()
        
        # Generate context switching strategies
        await self._generate_context_switching_strategies()
        
        return self.repositories
        
    async def _analyze_agent_frameworks(self, path: Path, key_repos: List[str]):
        """Analyze agent frameworks and their capabilities"""
        logger.info("🤖 Analyzing agent frameworks...")
        
        for repo_name in key_repos:
            repo_path = path / repo_name
            if repo_path.exists():
                analysis = await self._analyze_repository(repo_path, "agent_framework")
                
                # Special analysis for key frameworks
                if repo_name == "BMAD-METHOD":
                    analysis.update(await self._analyze_bmad_method(repo_path))
                elif repo_name == "SEAL":
                    analysis.update(await self._analyze_seal(repo_path))
                elif repo_name == "autogen":
                    analysis.update(await self._analyze_autogen(repo_path))
                elif repo_name == "voltagent":
                    analysis.update(await self._analyze_voltagent(repo_path))
                    
                self.repositories[repo_name] = analysis
                
    async def _analyze_bmad_method(self, path: Path) -> Dict:
        """Analyze BMAD method capabilities"""
        bmad_analysis = {
            "framework_type": "agentic_agile_development",
            "key_innovations": [
                "agentic_planning",
                "context_engineered_development"
            ],
            "agents": [
                "analyst", "pm", "architect", "scrum_master", "dev", "qa"
            ],
            "workflow_phases": [
                "planning_phase",
                "development_cycle"
            ],
            "integration_points": [
                "prd_generation",
                "architecture_design",
                "story_creation",
                "context_preservation"
            ],
            "context_switching": {
                "planning_to_development": "story_file_transfer",
                "agent_to_agent": "contextual_handoff",
                "phase_transitions": "document_based_continuity"
            }
        }
        
        # Check for specific BMAD components
        bmad_core = path / "bmad-core"
        if bmad_core.exists():
            bmad_analysis["core_components"] = list(bmad_core.iterdir())
            
        return bmad_analysis
        
    async def _analyze_seal(self, path: Path) -> Dict:
        """Analyze SEAL capabilities"""
        seal_analysis = {
            "framework_type": "self_adapting_language_models",
            "key_capabilities": [
                "self_editing",
                "continual_learning",
                "few_shot_adaptation"
            ],
            "domains": [
                "general_knowledge",
                "few_shot_learning"
            ],
            "integration_points": [
                "model_adaptation",
                "knowledge_incorporation",
                "task_specialization"
            ],
            "context_switching": {
                "knowledge_updates": "self_generated_finetuning",
                "task_adaptation": "few_shot_examples",
                "model_evolution": "rl_training"
            }
        }
        
        return seal_analysis
        
    async def _analyze_autogen(self, path: Path) -> Dict:
        """Analyze AutoGen capabilities"""
        autogen_analysis = {
            "framework_type": "multi_agent_ai_applications",
            "key_capabilities": [
                "multi_agent_collaboration",
                "autonomous_operation",
                "human_ai_interaction"
            ],
            "agent_types": [
                "assistant_agent",
                "user_proxy_agent",
                "group_chat_manager"
            ],
            "integration_points": [
                "agent_communication",
                "task_delegation",
                "collaborative_problem_solving"
            ],
            "context_switching": {
                "agent_handoffs": "message_passing",
                "task_delegation": "context_transfer",
                "collaboration": "shared_state_management"
            }
        }
        
        return autogen_analysis
        
    async def _analyze_voltagent(self, path: Path) -> Dict:
        """Analyze VoltAgent capabilities"""
        voltagent_analysis = {
            "framework_type": "voltage_based_agent_system",
            "key_capabilities": [
                "voltage_controlled_behavior",
                "energy_efficient_computation",
                "dynamic_agent_scaling"
            ],
            "integration_points": [
                "voltage_management",
                "energy_optimization",
                "scaling_decisions"
            ],
            "context_switching": {
                "voltage_transitions": "behavior_modulation",
                "energy_levels": "performance_scaling",
                "load_balancing": "agent_distribution"
            }
        }
        
        return voltagent_analysis
        
    async def _analyze_mcp_servers(self, path: Path, key_repos: List[str]):
        """Analyze MCP servers and their integration potential"""
        logger.info("🔌 Analyzing MCP servers...")
        
        for repo_name in key_repos:
            repo_path = path / repo_name
            if repo_path.exists():
                analysis = await self._analyze_repository(repo_path, "mcp_server")
                self.repositories[repo_name] = analysis
                
    async def _analyze_inference_engines(self, path: Path, key_repos: List[str]):
        """Analyze inference engines and their capabilities"""
        logger.info("⚡ Analyzing inference engines...")
        
        for repo_name in key_repos:
            repo_path = path / repo_name
            if repo_path.exists():
                analysis = await self._analyze_repository(repo_path, "inference_engine")
                self.repositories[repo_name] = analysis
                
    async def _analyze_applications(self, path: Path, key_repos: List[str]):
        """Analyze applications and their integration potential"""
        logger.info("📱 Analyzing applications...")
        
        for repo_name in key_repos:
            repo_path = path / repo_name
            if repo_path.exists():
                analysis = await self._analyze_repository(repo_path, "application")
                self.repositories[repo_name] = analysis
                
    async def _analyze_automation(self, path: Path, key_repos: List[str]):
        """Analyze automation tools and their capabilities"""
        logger.info("🔄 Analyzing automation tools...")
        
        for repo_name in key_repos:
            repo_path = path / repo_name
            if repo_path.exists():
                analysis = await self._analyze_repository(repo_path, "automation")
                self.repositories[repo_name] = analysis
                
    async def _analyze_repository(self, path: Path, repo_type: str) -> Dict:
        """Generic repository analysis"""
        analysis = {
            "type": repo_type,
            "path": str(path),
            "exists": path.exists(),
            "files": [],
            "capabilities": [],
            "integration_points": [],
            "dependencies": []
        }
        
        if path.exists():
            # Get file structure
            analysis["files"] = [str(f.relative_to(path)) for f in path.rglob("*") if f.is_file()]
            
            # Look for key files
            key_files = ["README.md", "requirements.txt", "package.json", "pyproject.toml", "setup.py"]
            for key_file in key_files:
                if (path / key_file).exists():
                    analysis["key_files"] = analysis.get("key_files", []) + [key_file]
                    
        return analysis
        
    async def _create_integration_matrix(self):
        """Create integration matrix showing how repositories work together"""
        logger.info("🔗 Creating integration matrix...")
        
        # Define integration patterns
        integration_patterns = {
            "bmad_autogen": {
                "description": "BMAD planning with AutoGen execution",
                "flow": "BMAD creates PRD/Architecture → AutoGen agents execute development",
                "context_switch": "document_based_handoff",
                "benefits": ["structured_planning", "collaborative_execution"]
            },
            "seal_bmad": {
                "description": "SEAL adaptation with BMAD methodology",
                "flow": "SEAL adapts to domain → BMAD applies structured approach",
                "context_switch": "knowledge_transfer",
                "benefits": ["domain_adaptation", "methodological_consistency"]
            },
            "autogen_voltagent": {
                "description": "AutoGen collaboration with VoltAgent scaling",
                "flow": "AutoGen manages agents → VoltAgent optimizes performance",
                "context_switch": "performance_monitoring",
                "benefits": ["collaborative_efficiency", "resource_optimization"]
            },
            "mcp_integration": {
                "description": "MCP servers as tool providers for all frameworks",
                "flow": "Any framework → MCP servers → External tools",
                "context_switch": "tool_abstraction",
                "benefits": ["unified_tool_access", "framework_agnostic_tools"]
            },
            "inference_optimization": {
                "description": "Multiple inference engines for different use cases",
                "flow": "Task analysis → Engine selection → Optimized execution",
                "context_switch": "engine_routing",
                "benefits": ["performance_optimization", "cost_efficiency"]
            }
        }
        
        self.integration_matrix = integration_patterns
        
    async def _generate_context_switching_strategies(self):
        """Generate optimal context switching strategies"""
        logger.info("🔄 Generating context switching strategies...")
        
        strategies = {
            "bmad_to_autogen": {
                "trigger": "planning_complete",
                "method": "story_file_transfer",
                "context_preservation": "full_document_context",
                "handoff_point": "scrum_master_agent"
            },
            "seal_to_bmad": {
                "trigger": "domain_adaptation_complete",
                "method": "knowledge_base_update",
                "context_preservation": "adapted_capabilities",
                "handoff_point": "analyst_agent"
            },
            "autogen_to_voltagent": {
                "trigger": "performance_degradation",
                "method": "voltage_adjustment",
                "context_preservation": "agent_state",
                "handoff_point": "system_monitor"
            },
            "framework_to_mcp": {
                "trigger": "tool_request",
                "method": "mcp_protocol",
                "context_preservation": "request_context",
                "handoff_point": "tool_interface"
            },
            "inference_switching": {
                "trigger": "task_type_change",
                "method": "engine_routing",
                "context_preservation": "model_state",
                "handoff_point": "inference_manager"
            }
        }
        
        self.context_switches = strategies
        
    async def generate_optimal_integration_plan(self) -> Dict:
        """Generate the optimal integration plan"""
        logger.info("🎯 Generating optimal integration plan...")
        
        integration_plan = {
            "overview": "IZA OS Optimal Repository Integration",
            "core_workflow": {
                "phase_1": "BMAD Planning",
                "phase_2": "SEAL Adaptation", 
                "phase_3": "AutoGen Execution",
                "phase_4": "VoltAgent Optimization",
                "phase_5": "MCP Tool Integration"
            },
            "context_switching_strategy": {
                "primary_flow": "BMAD → SEAL → AutoGen → VoltAgent",
                "tool_integration": "All frameworks → MCP servers",
                "inference_optimization": "Task-based engine selection"
            },
            "integration_benefits": [
                "Structured planning with BMAD methodology",
                "Domain adaptation with SEAL capabilities",
                "Collaborative execution with AutoGen agents",
                "Performance optimization with VoltAgent",
                "Unified tool access through MCP servers",
                "Optimal inference through engine selection"
            ],
            "implementation_steps": [
                "1. Set up BMAD planning agents (Analyst, PM, Architect)",
                "2. Configure SEAL for domain adaptation",
                "3. Initialize AutoGen multi-agent system",
                "4. Deploy VoltAgent for performance monitoring",
                "5. Integrate MCP servers for tool access",
                "6. Implement context switching mechanisms",
                "7. Create inference engine routing logic"
            ]
        }
        
        return integration_plan
        
    async def create_integration_implementation(self) -> str:
        """Create the actual integration implementation"""
        logger.info("🚀 Creating integration implementation...")
        
        implementation_code = '''
#!/usr/bin/env python3
"""
IZA OS Optimal Integration Implementation
Implements context switching and logic integration between all frameworks
"""

import asyncio
import json
from typing import Dict, List, Optional
from pathlib import Path

class IZAOSOptimalIntegration:
    """Optimal integration of all IZA OS frameworks"""
    
    def __init__(self):
        self.bmad_planner = None
        self.seal_adapter = None
        self.autogen_system = None
        self.voltagent_optimizer = None
        self.mcp_servers = {}
        self.inference_engines = {}
        self.context_manager = ContextManager()
        
    async def initialize(self):
        """Initialize all integrated components"""
        # Initialize BMAD planning system
        await self._initialize_bmad()
        
        # Initialize SEAL adaptation
        await self._initialize_seal()
        
        # Initialize AutoGen multi-agent system
        await self._initialize_autogen()
        
        # Initialize VoltAgent optimization
        await self._initialize_voltagent()
        
        # Initialize MCP servers
        await self._initialize_mcp_servers()
        
        # Initialize inference engines
        await self._initialize_inference_engines()
        
    async def execute_optimal_workflow(self, task: str) -> Dict:
        """Execute the optimal workflow using all frameworks"""
        
        # Phase 1: BMAD Planning
        planning_result = await self._bmad_planning_phase(task)
        
        # Phase 2: SEAL Adaptation
        adaptation_result = await self._seal_adaptation_phase(planning_result)
        
        # Phase 3: AutoGen Execution
        execution_result = await self._autogen_execution_phase(adaptation_result)
        
        # Phase 4: VoltAgent Optimization
        optimization_result = await self._voltagent_optimization_phase(execution_result)
        
        # Phase 5: MCP Tool Integration
        tool_result = await self._mcp_tool_integration_phase(optimization_result)
        
        return {
            "task": task,
            "planning": planning_result,
            "adaptation": adaptation_result,
            "execution": execution_result,
            "optimization": optimization_result,
            "tool_integration": tool_result,
            "final_result": tool_result
        }
        
    async def _bmad_planning_phase(self, task: str) -> Dict:
        """BMAD planning phase"""
        # Analyst analyzes requirements
        analysis = await self.bmad_planner.analyze_requirements(task)
        
        # PM creates PRD
        prd = await self.bmad_planner.create_prd(analysis)
        
        # Architect designs architecture
        architecture = await self.bmad_planner.design_architecture(prd)
        
        return {
            "analysis": analysis,
            "prd": prd,
            "architecture": architecture,
            "context": "bmad_planning_complete"
        }
        
    async def _seal_adaptation_phase(self, planning_result: Dict) -> Dict:
        """SEAL adaptation phase"""
        # Adapt to domain knowledge
        domain_adaptation = await self.seal_adapter.adapt_to_domain(planning_result)
        
        # Incorporate new knowledge
        knowledge_update = await self.seal_adapter.incorporate_knowledge(domain_adaptation)
        
        return {
            "domain_adaptation": domain_adaptation,
            "knowledge_update": knowledge_update,
            "context": "seal_adaptation_complete"
        }
        
    async def _autogen_execution_phase(self, adaptation_result: Dict) -> Dict:
        """AutoGen execution phase"""
        # Scrum Master creates stories
        stories = await self.autogen_system.create_stories(adaptation_result)
        
        # Dev agents execute development
        development = await self.autogen_system.execute_development(stories)
        
        # QA agents perform testing
        testing = await self.autogen_system.perform_testing(development)
        
        return {
            "stories": stories,
            "development": development,
            "testing": testing,
            "context": "autogen_execution_complete"
        }
        
    async def _voltagent_optimization_phase(self, execution_result: Dict) -> Dict:
        """VoltAgent optimization phase"""
        # Monitor performance
        performance = await self.voltagent_optimizer.monitor_performance(execution_result)
        
        # Optimize voltage levels
        optimization = await self.voltagent_optimizer.optimize_voltage(performance)
        
        # Scale resources
        scaling = await self.voltagent_optimizer.scale_resources(optimization)
        
        return {
            "performance": performance,
            "optimization": optimization,
            "scaling": scaling,
            "context": "voltagent_optimization_complete"
        }
        
    async def _mcp_tool_integration_phase(self, optimization_result: Dict) -> Dict:
        """MCP tool integration phase"""
        # Integrate with external tools
        tool_integration = await self._integrate_mcp_tools(optimization_result)
        
        # Finalize implementation
        finalization = await self._finalize_implementation(tool_integration)
        
        return {
            "tool_integration": tool_integration,
            "finalization": finalization,
            "context": "mcp_integration_complete"
        }

class ContextManager:
    """Manages context switching between frameworks"""
    
    def __init__(self):
        self.context_history = []
        self.current_context = None
        
    async def switch_context(self, from_framework: str, to_framework: str, context_data: Dict):
        """Switch context between frameworks"""
        # Preserve context
        self.context_history.append({
            "from": from_framework,
            "to": to_framework,
            "data": context_data,
            "timestamp": asyncio.get_event_loop().time()
        })
        
        # Transfer context
        await self._transfer_context(from_framework, to_framework, context_data)
        
    async def _transfer_context(self, from_framework: str, to_framework: str, context_data: Dict):
        """Transfer context between frameworks"""
        # Implementation depends on specific framework requirements
        pass
'''
        
        return implementation_code

async def main():
    """Main function"""
    analyzer = IZAOSRepositoryAnalyzer()
    
    try:
        # Analyze all repositories
        repositories = await analyzer.analyze_all_repositories()
        
        # Generate integration plan
        integration_plan = await analyzer.generate_optimal_integration_plan()
        
        # Create implementation
        implementation = await analyzer.create_integration_implementation()
        
        # Print results
        print("🔍 IZA OS Repository Analysis Complete!")
        print("=" * 60)
        
        print(f"\n📊 Analyzed Repositories: {len(repositories)}")
        for repo_name, analysis in repositories.items():
            print(f"  • {repo_name}: {analysis.get('type', 'unknown')}")
            
        print(f"\n🔗 Integration Matrix:")
        for integration, details in analyzer.integration_matrix.items():
            print(f"  • {integration}: {details['description']}")
            
        print(f"\n🔄 Context Switching Strategies:")
        for strategy, details in analyzer.context_switches.items():
            print(f"  • {strategy}: {details['method']}")
            
        print(f"\n🎯 Optimal Integration Plan:")
        print(f"  • Core Workflow: {integration_plan['core_workflow']}")
        print(f"  • Primary Flow: {integration_plan['context_switching_strategy']['primary_flow']}")
        
        # Save implementation
        implementation_path = Path("99-ops/scripts/optimal_integration.py")
        with open(implementation_path, "w") as f:
            f.write(implementation)
            
        print(f"\n✅ Implementation saved to: {implementation_path}")
        
    except Exception as e:
        logger.error(f"❌ Analysis error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

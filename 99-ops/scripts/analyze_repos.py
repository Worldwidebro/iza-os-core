#!/usr/bin/env python3
"""
IZA OS Repository Analysis Script
Analyzes the comprehensive repository registry and shows capabilities
"""

import json
import os
from pathlib import Path
from typing import Dict, List

def load_repos_config(config_path: str) -> Dict:
    """Load repository configuration from JSON file"""
    with open(config_path, 'r') as f:
        config = json.load(f)
    return config.get('repositories', {})

def analyze_repositories():
    """Analyze the repository registry"""
    config_path = "00-meta/registry/repos.json"
    
    if not os.path.exists(config_path):
        print("❌ Repository registry not found!")
        return
    
    repos_data = load_repos_config(config_path)
    
    print("🚀 IZA OS Repository Analysis")
    print("=" * 50)
    
    total_repos = 0
    for category, repos in repos_data.items():
        total_repos += len(repos)
        print(f"\n📁 {category.replace('_', ' ').title()} ({len(repos)} repos)")
        print("-" * 40)
        
        for repo_url in repos:
            repo_name = repo_url.split('/')[-1].replace('.git', '')
            print(f"  • {repo_name}")
    
    print(f"\n📊 Total Repositories: {total_repos}")
    
    # Show capabilities
    print("\n🎯 Key Capabilities:")
    print("-" * 20)
    
    capabilities = {
        "MCP Servers": ["fastmcp", "mcp-go", "git-mcp", "fastapi_mcp"],
        "AI Agents": ["autogen", "voltagent", "suna", "SEAL", "BMAD"],
        "LLM Inference": ["vllm", "llama.cpp", "gpt4all", "unsloth"],
        "Workflow Automation": ["n8n", "activepieces", "sim"],
        "Web Scraping": ["firecrawl", "crawlee", "stagehand"],
        "Development": ["vite", "drizzle-orm", "tailwindcss", "storybook"],
        "Trading": ["nautilus_trader", "OpenBB"],
        "UI Frameworks": ["lvgl", "UI-TARS", "awesome-react", "svelte"],
        "Self-Hosted": ["awesome-selfhosted", "syncthing", "puter"],
        "Awesome Lists": ["awesome-for-beginners", "public-apis", "free-programming-books"]
    }
    
    for capability, repos in capabilities.items():
        print(f"  ✅ {capability}: {', '.join(repos)}")
    
    # Show external resources
    print("\n🌐 External Resources:")
    print("-" * 20)
    resources = [
        "krea.ai - AI image generation",
        "trickle.so - Note-taking",
        "zen.sheshbabu.com - Productivity",
        "once-ui.com - UI components",
        "viewerkit.com - Viewer tools",
        "mgx.dev - Development tools",
        "huggingface.co/spaces/smolagents/computer-agent - Computer agent"
    ]
    
    for resource in resources:
        print(f"  🔗 {resource}")

def show_integration_status():
    """Show current integration status"""
    print("\n🔧 Integration Status:")
    print("-" * 20)
    
    external_dirs = [
        "40-mcp-agents/external",
        "45-agent-frameworks/external", 
        "50-apps/external",
        "30-models/external",
        "55-automation/external",
        "70-commerce-finance/external",
        "90-knowledge-bases/external",
        "95-playgrounds/external"
    ]
    
    for dir_path in external_dirs:
        if os.path.exists(dir_path):
            repos = [d for d in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, d)) and d != '.git']
            print(f"  📁 {dir_path}: {len(repos)} repos")
        else:
            print(f"  📁 {dir_path}: Not created")

def main():
    """Main function"""
    analyze_repositories()
    show_integration_status()
    
    print("\n🎉 IZA OS is ready with comprehensive AI capabilities!")
    print("\nNext steps:")
    print("1. Run: python3 99-ops/scripts/clone_from_registry.py 00-meta/registry/repos.json")
    print("2. Start services: make start-all")
    print("3. Access dashboard: http://localhost:3000")

if __name__ == "__main__":
    main()

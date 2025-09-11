#!/usr/bin/env python3
"""
IZA OS Repository Scanner
Scans existing repositories and identifies critical ones already present
"""

import os
import sys
from typing import Dict, Set

def scan_existing_repositories(base_path: str) -> Dict[str, Set[str]]:
    """Scan existing repositories and categorize them"""
    existing_repos = {}
    
    # Define critical repository patterns
    critical_patterns = {
        'mcp': ['fastmcp', 'mcp-go', 'git-mcp', 'fastapi_mcp', 'mcp-registry', 'awesome-mcp-servers', 'BrowserMCP'],
        'ai_agents': ['autogen', 'voltagent', 'suna', 'SEAL', 'BMAD', 'aider', 'claude-squad', 'OpenHands'],
        'inference': ['vllm', 'llama.cpp', 'gpt4all', 'unsloth', 'hyperlearn', 'cuml', 'cuvs'],
        'apps': ['lobe-chat', 'activepieces', 'dify', 'budibase', 'jan', 'midday', 'WrenAI', 'FastGPT', 'zen'],
        'development': ['vite', 'drizzle-orm', 'tailwindcss', 'storybook', 'superdesign', 'telegraf', 'poetry'],
        'automation': ['n8n', 'sim'],
        'scraping': ['firecrawl', 'crawlee', 'stagehand', 'HeadlessBrowsers'],
        'trading': ['nautilus_trader', 'OpenBB'],
        'ui_frameworks': ['lvgl', 'UI-TARS', 'awesome-react', 'svelte', 'shadcn-ui'],
        'selfhosted': ['awesome-selfhosted', 'syncthing', 'puter', 'lazydocker', 'lazygit'],
        'communication': ['novu', 'openreplay', 'Cap', 'node-telegram-bot-api'],
        'claude_ecosystem': ['claude-code-action', 'claude-code-templates', 'anthropic-cookbook', 'SuperClaude_Framework', 'claudia', 'claude-flow', 'Claudable']
    }
    
    # Scan external directories
    external_dirs = [
        '40-mcp-agents/external',
        '45-agent-frameworks/external',
        '50-apps/external',
        '30-models/external',
        '55-automation/external',
        '70-commerce-finance/external',
        '90-knowledge-bases/external',
        '95-playgrounds/external',
        '10-infra/external'
    ]
    
    for category, patterns in critical_patterns.items():
        existing_repos[category] = set()
        
        for ext_dir in external_dirs:
            full_dir = os.path.join(base_path, ext_dir)
            if os.path.exists(full_dir):
                for item in os.listdir(full_dir):
                    item_path = os.path.join(full_dir, item)
                    if os.path.isdir(item_path) and os.path.exists(os.path.join(item_path, '.git')):
                        # Check if this matches any critical pattern
                        for pattern in patterns:
                            if pattern.lower() in item.lower():
                                existing_repos[category].add(item)
                                break
    
    return existing_repos

def print_existing_repositories(existing_repos: Dict[str, Set[str]]):
    """Print a summary of existing critical repositories"""
    print("🔍 IZA OS Existing Repository Scanner")
    print("=" * 60)
    
    total_existing = 0
    categories_with_repos = 0
    
    for category, repos in existing_repos.items():
        if repos:
            categories_with_repos += 1
            print(f"\n📁 {category.replace('_', ' ').title()}:")
            for repo in sorted(repos):
                print(f"  ✅ {repo}")
            total_existing += len(repos)
    
    print(f"\n📊 Summary:")
    print(f"  • Categories with repositories: {categories_with_repos}/{len(existing_repos)}")
    print(f"  • Total existing critical repositories: {total_existing}")
    print("=" * 60)
    
    # Show what's missing
    print("\n🔍 Missing Critical Repositories:")
    print("-" * 40)
    
    critical_patterns = {
        'mcp': ['fastmcp', 'mcp-go', 'git-mcp', 'fastapi_mcp', 'mcp-registry', 'awesome-mcp-servers', 'BrowserMCP'],
        'ai_agents': ['autogen', 'voltagent', 'suna', 'SEAL', 'BMAD', 'aider', 'claude-squad', 'OpenHands'],
        'inference': ['vllm', 'llama.cpp', 'gpt4all', 'unsloth', 'hyperlearn', 'cuml', 'cuvs'],
        'apps': ['lobe-chat', 'activepieces', 'dify', 'budibase', 'jan', 'midday', 'WrenAI', 'FastGPT', 'zen'],
        'development': ['vite', 'drizzle-orm', 'tailwindcss', 'storybook', 'superdesign', 'telegraf', 'poetry'],
        'automation': ['n8n', 'sim'],
        'scraping': ['firecrawl', 'crawlee', 'stagehand', 'HeadlessBrowsers'],
        'trading': ['nautilus_trader', 'OpenBB'],
        'ui_frameworks': ['lvgl', 'UI-TARS', 'awesome-react', 'svelte', 'shadcn-ui'],
        'selfhosted': ['awesome-selfhosted', 'syncthing', 'puter', 'lazydocker', 'lazygit'],
        'communication': ['novu', 'openreplay', 'Cap', 'node-telegram-bot-api'],
        'claude_ecosystem': ['claude-code-action', 'claude-code-templates', 'anthropic-cookbook', 'SuperClaude_Framework', 'claudia', 'claude-flow', 'Claudable']
    }
    
    missing_count = 0
    for category, patterns in critical_patterns.items():
        existing = existing_repos.get(category, set())
        missing = []
        for pattern in patterns:
            found = False
            for existing_repo in existing:
                if pattern.lower() in existing_repo.lower():
                    found = True
                    break
            if not found:
                missing.append(pattern)
        
        if missing:
            print(f"\n❌ {category.replace('_', ' ').title()}:")
            for pattern in missing:
                print(f"  • {pattern}")
            missing_count += len(missing)
    
    if missing_count > 0:
        print(f"\n📊 Total missing critical repositories: {missing_count}")
    else:
        print("\n🎉 All critical repositories are present!")

def main():
    if len(sys.argv) > 1:
        base_path = sys.argv[1]
    else:
        # Default to current directory
        base_path = os.getcwd()
    
    print(f"📁 Scanning from: {base_path}")
    print()
    
    existing_repos = scan_existing_repositories(base_path)
    print_existing_repositories(existing_repos)

if __name__ == "__main__":
    main()

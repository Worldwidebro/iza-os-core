#!/usr/bin/env python3
"""
IZA OS Repository Cloner
Clones external repositories into the IZA OS monorepo structure
"""

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Set

def load_repos_config(config_path: str) -> List[Dict]:
    """Load repository configuration from JSON file"""
    with open(config_path, 'r') as f:
        config = json.load(f)
    
    repositories = []
    repos_data = config.get('repositories', {})
    
    # Convert the new structure to the old format for compatibility
    for category, repo_urls in repos_data.items():
        for url in repo_urls:
            # Extract repo name from URL
            repo_name = url.split('/')[-1].replace('.git', '')
            
            repositories.append({
                'name': repo_name,
                'url': url,
                'category': category,
                'description': f"{repo_name} - {category.replace('_', ' ').title()}"
            })
    
    return repositories

def scan_existing_repositories(base_path: str) -> Dict[str, Set[str]]:
    """Scan existing repositories and categorize them"""
    existing_repos = {}
    
    # Define critical repository patterns
    critical_patterns = {
        'mcp': ['fastmcp', 'mcp-go', 'git-mcp', 'fastapi_mcp', 'mcp-registry', 'awesome-mcp-servers'],
        'ai_agents': ['autogen', 'voltagent', 'suna', 'SEAL', 'BMAD', 'aider', 'claude-squad'],
        'inference': ['vllm', 'llama.cpp', 'gpt4all', 'unsloth', 'hyperlearn'],
        'apps': ['lobe-chat', 'activepieces', 'dify', 'budibase', 'jan', 'midday'],
        'development': ['vite', 'drizzle-orm', 'tailwindcss', 'storybook', 'superdesign'],
        'automation': ['n8n', 'sim'],
        'scraping': ['firecrawl', 'crawlee', 'stagehand'],
        'trading': ['nautilus_trader', 'OpenBB'],
        'ui_frameworks': ['lvgl', 'UI-TARS', 'awesome-react', 'svelte'],
        'selfhosted': ['awesome-selfhosted', 'syncthing', 'puter']
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
    print("🔍 Scanning existing repositories...")
    print("=" * 50)
    
    total_existing = 0
    for category, repos in existing_repos.items():
        if repos:
            print(f"\n📁 {category.replace('_', ' ').title()}:")
            for repo in sorted(repos):
                print(f"  ✅ {repo}")
            total_existing += len(repos)
    
    print(f"\n📊 Total existing critical repositories: {total_existing}")
    print("=" * 50)
    print()

def get_target_directory(category: str) -> str:
    """Map repository category to target directory"""
    category_mapping = {
        'mcp': '40-mcp-agents/external',
        'claude_and_cookbooks': '40-mcp-agents/external',
        'autonomous_agents': '45-agent-frameworks/external', 
        'runtimes_and_inference': '30-models/external',
        'apps_and_uix': '50-apps/external',
        'ai_tools_and_prompts': '90-knowledge-bases/external',
        'web_scraping_and_crawling': '55-automation/external',
        'automation_and_workflows': '55-automation/external',
        'development_tools': '50-apps/external',
        'trading_and_finance': '70-commerce-finance/external',
        'ui_frameworks': '50-apps/external',
        'selfhosted_and_devops': '10-infra/external',
        'notifications_and_communication': '55-automation/external',
        'awesome_lists': '90-knowledge-bases/external',
        'utilities_and_tools': '95-playgrounds/external',
        'external_services': '95-playgrounds/external',
        'knowledge': '90-knowledge-bases/external',
        'infrastructure': '10-infra/external'
    }
    return category_mapping.get(category, '95-playgrounds/external')

def clone_repository(repo: Dict, base_path: str) -> bool:
    """Clone a single repository"""
    name = repo['name']
    url = repo['url']
    category = repo['category']
    
    # Skip external services (URLs that aren't git repositories)
    if category == 'external_services' and not url.endswith('.git'):
        print(f"🌐 {name} is an external service ({url}), skipping clone...")
        return True
    
    target_dir = get_target_directory(category)
    full_path = os.path.join(base_path, target_dir, name)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    if os.path.exists(full_path):
        # Check if it's a valid git repository
        git_dir = os.path.join(full_path, '.git')
        if os.path.exists(git_dir):
            print(f"✅ {name} already exists and is a valid git repository, skipping...")
            return True
        else:
            print(f"⚠️  {name} directory exists but is not a git repository, removing...")
            import shutil
            shutil.rmtree(full_path)
    
    try:
        print(f"🔄 Cloning {name} to {target_dir}/{name}...")
        subprocess.run(['git', 'clone', url, full_path], check=True)
        print(f"✅ Successfully cloned {name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to clone {name}: {e}")
        return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 clone_from_registry.py <config.json>")
        sys.exit(1)
    
    config_path = sys.argv[1]
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(config_path)))
    
    print(f"🚀 IZA OS Repository Cloner")
    print(f"📁 Base path: {base_path}")
    print(f"📋 Config: {config_path}")
    print()
    
    # First, scan existing repositories
    existing_repos = scan_existing_repositories(base_path)
    print_existing_repositories(existing_repos)
    
    repos = load_repos_config(config_path)
    print(f"📦 Found {len(repos)} repositories to process")
    print()
    
    success_count = 0
    total_repos = len(repos)
    
    for i, repo in enumerate(repos, 1):
        print(f"[{i}/{total_repos}] Processing {repo['name']}...")
        if clone_repository(repo, base_path):
            success_count += 1
        print()  # Add spacing between repositories
    
    print()
    print(f"🎉 Processing complete!")
    print(f"✅ Successfully processed: {success_count}/{len(repos)} repositories")
    
    if success_count < len(repos):
        print(f"❌ Failed to process: {len(repos) - success_count} repositories")
        sys.exit(1)

if __name__ == "__main__":
    main()

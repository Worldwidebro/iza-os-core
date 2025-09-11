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
from typing import Dict, List

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
    
    target_dir = get_target_directory(category)
    full_path = os.path.join(base_path, target_dir, name)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    if os.path.exists(full_path):
        print(f"✅ {name} already exists, skipping...")
        return True
    
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
    
    repos = load_repos_config(config_path)
    print(f"📦 Found {len(repos)} repositories to clone")
    print()
    
    success_count = 0
    for repo in repos:
        if clone_repository(repo, base_path):
            success_count += 1
    
    print()
    print(f"🎉 Cloning complete!")
    print(f"✅ Successfully cloned: {success_count}/{len(repos)} repositories")
    
    if success_count < len(repos):
        print(f"❌ Failed to clone: {len(repos) - success_count} repositories")
        sys.exit(1)

if __name__ == "__main__":
    main()

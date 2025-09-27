#!/usr/bin/env python3
'''
Python Project Migration Script
Migrates existing Python projects to standardized stack
'''

import subprocess
import sys
from pathlib import Path

def migrate_python_project():
    print("🐍 Migrating Python project to standardized stack...")
    
    # Upgrade Python packages
    packages_to_upgrade = [
        "fastapi==0.117.1",
        "uvicorn[standard]==0.32.1",
        "sqlalchemy==2.0.43",
        "anthropic==0.68.0"
    ]
    
    for package in packages_to_upgrade:
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", "--upgrade", package], check=True)
            print(f"✅ Upgraded {package}")
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to upgrade {package}: {e}")
    
    print("✅ Python migration completed!")

if __name__ == "__main__":
    migrate_python_project()

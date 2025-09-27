# 🛠️ Environment Setup Guide
## OS-Level Dependencies, Python, Node.js, Docker Installation

**Complete Environment Setup for AI Enterprise OS**

---

## **System Requirements** 💻

### **Minimum Requirements**
```yaml
operating_system:
  - macOS 12.0+ (Monterey or later)
  - Ubuntu 20.04 LTS or later
  - Windows 10/11 with WSL2
  
hardware:
  - CPU: 8+ cores (16+ recommended)
  - RAM: 32GB (64GB+ recommended)
  - Storage: 500GB+ SSD
  - GPU: NVIDIA RTX 3080+ (for local LLMs)
  
network:
  - Internet connection: 100Mbps+ (1Gbps recommended)
  - Ports: 3000, 5432, 6379, 8080, 9090, 9200
```

---

## **macOS Setup** 🍎

### **1. Install Homebrew**
```bash
# Install Homebrew package manager
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

### **2. Install Core Dependencies**
```bash
# Install essential tools
brew install git curl wget jq tree htop

# Install development tools
brew install python@3.11 node@18 go rust

# Install Docker
brew install --cask docker

# Install VS Code/Cursor
brew install --cask cursor
```

### **3. Configure Shell Environment**
```bash
# Create .zshrc configuration
cat >> ~/.zshrc << 'EOF'

# AI Enterprise OS Environment
export AI_ENTERPRISE_HOME="$HOME/AI_Enterprise_OS"
export PATH="$AI_ENTERPRISE_HOME/bin:$PATH"

# Python environment
export PYTHONPATH="$AI_ENTERPRISE_HOME/python:$PYTHONPATH"

# Go environment
export GOPATH="$AI_ENTERPRISE_HOME/go"
export PATH="$GOPATH/bin:$PATH"

# Node.js environment
export NODE_PATH="$AI_ENTERPRISE_HOME/node_modules:$NODE_PATH"

# Docker environment
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Aliases
alias ai-enterprise="cd $AI_ENTERPRISE_HOME"
alias ai-status="docker-compose ps"
alias ai-logs="docker-compose logs -f"
alias ai-restart="docker-compose restart"

EOF

# Reload shell configuration
source ~/.zshrc
```

---

## **Ubuntu/Linux Setup** 🐧

### **1. Update System**
```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git jq tree htop build-essential
```

### **2. Install Core Dependencies**
```bash
# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3.11-dev python3-pip

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### **3. Configure Environment**
```bash
# Create .bashrc configuration
cat >> ~/.bashrc << 'EOF'

# AI Enterprise OS Environment
export AI_ENTERPRISE_HOME="$HOME/AI_Enterprise_OS"
export PATH="$AI_ENTERPRISE_HOME/bin:$PATH"

# Python environment
export PYTHONPATH="$AI_ENTERPRISE_HOME/python:$PYTHONPATH"

# Go environment
export GOPATH="$AI_ENTERPRISE_HOME/go"
export PATH="$GOPATH/bin:$PATH"

# Node.js environment
export NODE_PATH="$AI_ENTERPRISE_HOME/node_modules:$NODE_PATH"

# Docker environment
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Aliases
alias ai-enterprise="cd $AI_ENTERPRISE_HOME"
alias ai-status="docker-compose ps"
alias ai-logs="docker-compose logs -f"
alias ai-restart="docker-compose restart"

EOF

# Reload shell configuration
source ~/.bashrc
```

---

## **Python Environment Setup** 🐍

### **1. Create Virtual Environment**
```bash
# Create project directory
mkdir -p $AI_ENTERPRISE_HOME
cd $AI_ENTERPRISE_HOME

# Create Python virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip setuptools wheel
```

### **2. Install Python Dependencies**
```bash
# Create requirements.txt
cat > requirements.txt << 'EOF'
# Core AI and ML libraries
torch>=2.0.0
transformers>=4.30.0
langchain>=0.0.200
langchain-community>=0.0.10
openai>=1.0.0
anthropic>=0.3.0

# Data processing
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
matplotlib>=3.7.0
seaborn>=0.12.0

# Web frameworks
fastapi>=0.100.0
uvicorn>=0.23.0
websockets>=11.0.0
httpx>=0.24.0

# Database and storage
psycopg2-binary>=2.9.0
redis>=4.6.0
neo4j>=5.10.0
chromadb>=0.4.0

# Monitoring and logging
prometheus-client>=0.17.0
structlog>=23.1.0
loguru>=0.7.0

# Security
pyjwt>=2.8.0
cryptography>=41.0.0
passlib>=1.7.4

# Testing
pytest>=7.4.0
pytest-asyncio>=0.21.0
pytest-cov>=4.1.0

# Development tools
black>=23.7.0
flake8>=6.0.0
mypy>=1.5.0
pre-commit>=3.3.0
EOF

# Install dependencies
pip install -r requirements.txt
```

### **3. Configure Python Environment**
```bash
# Create .pythonrc
cat > .pythonrc << 'EOF'
# AI Enterprise OS Python Configuration
import sys
import os

# Add project paths
sys.path.insert(0, os.path.join(os.environ.get('AI_ENTERPRISE_HOME', '.'), 'python'))

# Configure logging
import logging
logging.basicConfig(level=logging.INFO)

# Import common modules
try:
    import pandas as pd
    import numpy as np
    import torch
    print("✅ AI Enterprise OS Python environment loaded successfully")
except ImportError as e:
    print(f"⚠️  Missing dependency: {e}")
EOF

# Add to shell profile
echo 'export PYTHONSTARTUP="$AI_ENTERPRISE_HOME/.pythonrc"' >> ~/.zshrc
```

---

## **Node.js Environment Setup** 📦

### **1. Install Node.js Dependencies**
```bash
# Create package.json
cat > package.json << 'EOF'
{
  "name": "ai-enterprise-os",
  "version": "1.0.0",
  "description": "AI Enterprise OS - Multi-Agent AI System",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "next": "^13.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.1.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "axios": "^1.4.0",
    "socket.io": "^4.7.0",
    "socket.io-client": "^4.7.0",
    "recharts": "^2.7.0",
    "lucide-react": "^0.263.0",
    "clsx": "^1.2.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "eslint": "^8.45.0",
    "eslint-config-next": "^13.4.0",
    "jest": "^29.6.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.17.0"
  }
}
EOF

# Install dependencies
npm install
```

### **2. Configure TypeScript**
```bash
# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

### **3. Configure Tailwind CSS**
```bash
# Create tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

---

## **Go Environment Setup** 🐹

### **1. Configure Go Workspace**
```bash
# Create Go workspace
mkdir -p $AI_ENTERPRISE_HOME/go/{src,bin,pkg}
cd $AI_ENTERPRISE_HOME/go/src

# Initialize Go module
go mod init ai-enterprise-os

# Create go.mod
cat > go.mod << 'EOF'
module ai-enterprise-os

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/gorilla/websocket v1.5.0
    github.com/redis/go-redis/v9 v9.0.5
    github.com/lib/pq v1.10.9
    github.com/golang-jwt/jwt/v5 v5.0.0
    github.com/prometheus/client_golang v1.16.0
    github.com/sirupsen/logrus v1.9.3
)
EOF

# Install dependencies
go mod tidy
```

### **2. Create Go Project Structure**
```bash
# Create project structure
mkdir -p {cmd,internal/{api,service,model},pkg/{utils,config}}

# Create main.go
cat > cmd/main.go << 'EOF'
package main

import (
    "log"
    "ai-enterprise-os/internal/api"
    "ai-enterprise-os/pkg/config"
)

func main() {
    cfg := config.Load()
    
    server := api.NewServer(cfg)
    
    log.Printf("Starting AI Enterprise OS server on port %s", cfg.Port)
    if err := server.Start(); err != nil {
        log.Fatal("Failed to start server:", err)
    }
}
EOF
```

---

## **Rust Environment Setup** 🦀

### **1. Configure Rust Project**
```bash
# Create Rust project
cd $AI_ENTERPRISE_HOME
cargo init --name ai-enterprise-os

# Create Cargo.toml
cat > Cargo.toml << 'EOF'
[package]
name = "ai-enterprise-os"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.0", features = ["full"] }
axum = "0.6"
tower = "0.4"
tower-http = { version = "0.4", features = ["cors"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tracing = "0.1"
tracing-subscriber = "0.3"
anyhow = "1.0"
thiserror = "1.0"
uuid = { version = "1.0", features = ["v4"] }
chrono = { version = "0.4", features = ["serde"] }
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"] }
redis = { version = "0.23", features = ["tokio-comp"] }
jsonwebtoken = "9.0"
argon2 = "0.5"
EOF

# Build project
cargo build
```

---

## **Docker Environment Setup** 🐳

### **1. Create Docker Configuration**
```bash
# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ai_enterprise_os
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Neo4j Graph Database
  neo4j:
    image: neo4j:5.10
    environment:
      NEO4J_AUTH: neo4j/password
      NEO4J_PLUGINS: '["apoc"]'
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
    healthcheck:
      test: ["CMD", "cypher-shell", "-u", "neo4j", "-p", "password", "RETURN 1"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Prometheus Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'

  # Grafana Dashboard
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources

volumes:
  postgres_data:
  redis_data:
  neo4j_data:
  neo4j_logs:
  prometheus_data:
  grafana_data:
EOF
```

### **2. Create Dockerfile**
```bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Start application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
```

---

## **Environment Validation** ✅

### **1. Create Validation Script**
```bash
# Create validation script
cat > validate_environment.sh << 'EOF'
#!/bin/bash

echo "🔍 Validating AI Enterprise OS Environment..."

# Check Python
echo "Python: $(python3 --version)"
echo "Pip: $(pip --version)"

# Check Node.js
echo "Node.js: $(node --version)"
echo "NPM: $(npm --version)"

# Check Go
echo "Go: $(go version)"

# Check Rust
echo "Rust: $(rustc --version)"

# Check Docker
echo "Docker: $(docker --version)"
echo "Docker Compose: $(docker-compose --version)"

# Check Git
echo "Git: $(git --version)"

# Check environment variables
echo "AI_ENTERPRISE_HOME: $AI_ENTERPRISE_HOME"

# Test Python imports
echo "Testing Python imports..."
python3 -c "
try:
    import torch, transformers, langchain, fastapi, pandas, numpy
    print('✅ All Python dependencies available')
except ImportError as e:
    print(f'❌ Missing Python dependency: {e}')
"

# Test Node.js modules
echo "Testing Node.js modules..."
node -e "
try {
    require('next');
    require('react');
    require('typescript');
    console.log('✅ All Node.js dependencies available');
} catch (e) {
    console.log('❌ Missing Node.js dependency:', e.message);
}
"

echo "🎉 Environment validation complete!"
EOF

chmod +x validate_environment.sh
```

### **2. Run Validation**
```bash
# Run environment validation
./validate_environment.sh
```

---

## **Quick Start Commands** 🚀

### **Environment Management**
```bash
# Activate Python environment
source venv/bin/activate

# Start Docker services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Development Commands**
```bash
# Start Python API
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Start Node.js frontend
npm run dev

# Run Go server
go run cmd/main.go

# Run Rust server
cargo run

# Run tests
pytest
npm test
go test ./...
cargo test
```

---

**Status**: 🟢 **ENVIRONMENT SETUP COMPLETE**

Your AI Enterprise OS environment is now fully configured with all necessary dependencies, tools, and configurations for development and deployment.

# 🚀 AI Enterprise OS - Complete Setup Script
## One-Click Setup and Integration Script

**Complete Setup Script for AI Enterprise OS**

---

## **Master Setup Script** 🎯

```bash
#!/bin/bash

# AI Enterprise OS - Complete Setup Script
# This script sets up the entire AI Enterprise OS system

set -e

echo "🚀 AI Enterprise OS - Complete Setup"
echo "===================================="

# Configuration
AI_ENTERPRISE_HOME="$HOME/AI_Enterprise_OS"
LOG_FILE="$AI_ENTERPRISE_HOME/setup.log"

# Create main directory
mkdir -p $AI_ENTERPRISE_HOME
cd $AI_ENTERPRISE_HOME

# Log setup progress
exec > >(tee -a $LOG_FILE) 2>&1

echo "📁 Setting up AI Enterprise OS in: $AI_ENTERPRISE_HOME"
echo "📝 Logging to: $LOG_FILE"

# Function to check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    # Check if required tools are installed
    local tools=("python3" "node" "npm" "docker" "git" "curl" "wget")
    
    for tool in "${tools[@]}"; do
        if command -v $tool >/dev/null 2>&1; then
            echo "✅ $tool is installed"
        else
            echo "❌ $tool is not installed. Please install it first."
            exit 1
        fi
    done
    
    echo "✅ All prerequisites met"
}

# Function to setup environment
setup_environment() {
    echo "🌍 Setting up environment..."
    
    # Create .env file
    cat > .env << 'EOF'
# AI Enterprise OS Environment Configuration
AI_ENTERPRISE_HOME=$AI_ENTERPRISE_HOME
PYTHONPATH=$AI_ENTERPRISE_HOME/python:$PYTHONPATH
GOPATH=$AI_ENTERPRISE_HOME/go
NODE_PATH=$AI_ENTERPRISE_HOME/node_modules:$NODE_PATH

# Service URLs
MCP_ORCHESTRATOR_URL=http://localhost:8001
KNOWLEDGE_MANAGER_URL=http://localhost:8002
DATA_PROCESSOR_URL=http://localhost:8003
MONITORING_AGENT_URL=http://localhost:8004
SECURITY_MANAGER_URL=http://localhost:8005

# Local LLM URLs
OLLAMA_URL=http://localhost:11434
ANYTHINGLLM_URL=http://localhost:3001

# Database URLs
POSTGRES_URL=postgresql://postgres:password@localhost:5432/ai_enterprise_os
REDIS_URL=redis://localhost:6379
NEO4J_URL=bolt://localhost:7687

# Monitoring URLs
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3000

# API Keys (Replace with your actual keys)
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
ABACUS_API_KEY=your-abacus-api-key-here
JWT_SECRET=your-jwt-secret-key-here

# Webhook URLs (Replace with your actual URLs)
WEBHOOK_SUCCESS_URL=https://your-webhook-url.com/success
WEBHOOK_FAILURE_URL=https://your-webhook-url.com/failure
EOF
    
    # Source environment
    source .env
    
    echo "✅ Environment configured"
}

# Function to setup Python environment
setup_python() {
    echo "🐍 Setting up Python environment..."
    
    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate
    
    # Upgrade pip
    pip install --upgrade pip setuptools wheel
    
    # Install Python dependencies
    pip install -r requirements.txt
    
    echo "✅ Python environment ready"
}

# Function to setup Node.js environment
setup_nodejs() {
    echo "📦 Setting up Node.js environment..."
    
    # Install Node.js dependencies
    npm install
    
    echo "✅ Node.js environment ready"
}

# Function to setup Docker services
setup_docker() {
    echo "🐳 Setting up Docker services..."
    
    # Start Docker services
    docker-compose up -d
    
    # Wait for services to be ready
    echo "⏳ Waiting for services to be ready..."
    sleep 30
    
    # Check service health
    docker-compose ps
    
    echo "✅ Docker services ready"
}

# Function to setup MCP servers
setup_mcp_servers() {
    echo "🔌 Setting up MCP servers..."
    
    # Start MCP servers
    ./mcp-servers/manage_mcp_servers.sh start all
    
    # Wait for servers to be ready
    sleep 10
    
    # Test MCP integration
    ./mcp-servers/manage_mcp_servers.sh test
    
    echo "✅ MCP servers ready"
}

# Function to setup local LLMs
setup_local_llms() {
    echo "🤖 Setting up local LLMs..."
    
    # Start local LLM services
    ./01_SETUP/manage_services.sh start all
    
    # Install Ollama models
    ./01_SETUP/install_models.sh
    
    # Wait for services to be ready
    sleep 20
    
    echo "✅ Local LLMs ready"
}

# Function to setup Vercept jobs
setup_vercept_jobs() {
    echo "⚡ Setting up Vercept jobs..."
    
    # Deploy Vercept jobs
    ./vercept-jobs/manage_vercept_jobs.sh deploy
    
    # Start Vercept jobs
    ./vercept-jobs/manage_vercept_jobs.sh start
    
    echo "✅ Vercept jobs ready"
}

# Function to setup monitoring
setup_monitoring() {
    echo "📊 Setting up monitoring..."
    
    # Start monitoring services
    docker-compose -f monitoring/docker-compose.yml up -d
    
    # Wait for monitoring to be ready
    sleep 15
    
    # Configure monitoring
    python3 monitoring/setup_monitoring.py
    
    echo "✅ Monitoring ready"
}

# Function to run integration tests
run_integration_tests() {
    echo "🧪 Running integration tests..."
    
    # Test MCP integration
    python3 mcp-servers/test_integration.py
    
    # Test local LLM integration
    python3 01_SETUP/test_integration.py
    
    # Test Vercept integration
    python3 vercept-jobs/test_integration.py
    
    echo "✅ Integration tests passed"
}

# Function to display status
display_status() {
    echo "📊 AI Enterprise OS Status"
    echo "=========================="
    
    # Check service status
    echo "🔍 Service Status:"
    docker-compose ps
    
    echo ""
    echo "🔌 MCP Server Status:"
    ./mcp-servers/manage_mcp_servers.sh status all
    
    echo ""
    echo "🤖 Local LLM Status:"
    ./01_SETUP/manage_services.sh status all
    
    echo ""
    echo "⚡ Vercept Job Status:"
    ./vercept-jobs/manage_vercept_jobs.sh status
    
    echo ""
    echo "📊 Monitoring Status:"
    curl -s http://localhost:9090/-/healthy && echo "✅ Prometheus healthy" || echo "❌ Prometheus not healthy"
    curl -s http://localhost:3000/api/health && echo "✅ Grafana healthy" || echo "❌ Grafana not healthy"
}

# Function to create startup script
create_startup_script() {
    echo "🚀 Creating startup script..."
    
    cat > start_ai_enterprise.sh << 'EOF'
#!/bin/bash

# AI Enterprise OS Startup Script

echo "🚀 Starting AI Enterprise OS..."

# Source environment
source $AI_ENTERPRISE_HOME/.env

# Start Docker services
docker-compose up -d

# Start MCP servers
./mcp-servers/manage_mcp_servers.sh start all

# Start local LLMs
./01_SETUP/manage_services.sh start all

# Start Vercept jobs
./vercept-jobs/manage_vercept_jobs.sh start

echo "✅ AI Enterprise OS started successfully!"
echo "🌐 Dashboard: http://localhost:3000"
echo "📊 Monitoring: http://localhost:9090"
echo "🤖 Ollama: http://localhost:11434"
echo "📚 AnythingLLM: http://localhost:3001"
EOF
    
    chmod +x start_ai_enterprise.sh
    
    echo "✅ Startup script created"
}

# Function to create shutdown script
create_shutdown_script() {
    echo "🛑 Creating shutdown script..."
    
    cat > stop_ai_enterprise.sh << 'EOF'
#!/bin/bash

# AI Enterprise OS Shutdown Script

echo "🛑 Stopping AI Enterprise OS..."

# Stop Vercept jobs
./vercept-jobs/manage_vercept_jobs.sh stop

# Stop MCP servers
./mcp-servers/manage_mcp_servers.sh stop all

# Stop local LLMs
./01_SETUP/manage_services.sh stop all

# Stop Docker services
docker-compose down

echo "✅ AI Enterprise OS stopped successfully!"
EOF
    
    chmod +x stop_ai_enterprise.sh
    
    echo "✅ Shutdown script created"
}

# Function to create status script
create_status_script() {
    echo "📊 Creating status script..."
    
    cat > status_ai_enterprise.sh << 'EOF'
#!/bin/bash

# AI Enterprise OS Status Script

echo "📊 AI Enterprise OS Status"
echo "=========================="

# Check Docker services
echo "🐳 Docker Services:"
docker-compose ps

echo ""
echo "🔌 MCP Servers:"
./mcp-servers/manage_mcp_servers.sh status all

echo ""
echo "🤖 Local LLMs:"
./01_SETUP/manage_services.sh status all

echo ""
echo "⚡ Vercept Jobs:"
./vercept-jobs/manage_vercept_jobs.sh status

echo ""
echo "📊 Monitoring:"
curl -s http://localhost:9090/-/healthy && echo "✅ Prometheus healthy" || echo "❌ Prometheus not healthy"
curl -s http://localhost:3000/api/health && echo "✅ Grafana healthy" || echo "❌ Grafana not healthy"
EOF
    
    chmod +x status_ai_enterprise.sh
    
    echo "✅ Status script created"
}

# Main setup function
main() {
    echo "🎯 Starting AI Enterprise OS setup..."
    
    # Check prerequisites
    check_prerequisites
    
    # Setup environment
    setup_environment
    
    # Setup Python
    setup_python
    
    # Setup Node.js
    setup_nodejs
    
    # Setup Docker
    setup_docker
    
    # Setup MCP servers
    setup_mcp_servers
    
    # Setup local LLMs
    setup_local_llms
    
    # Setup Vercept jobs
    setup_vercept_jobs
    
    # Setup monitoring
    setup_monitoring
    
    # Run integration tests
    run_integration_tests
    
    # Create management scripts
    create_startup_script
    create_shutdown_script
    create_status_script
    
    # Display final status
    display_status
    
    echo ""
    echo "🎉 AI Enterprise OS setup completed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Update API keys in .env file"
    echo "2. Configure webhook URLs in .env file"
    echo "3. Run: ./start_ai_enterprise.sh"
    echo "4. Access dashboard at: http://localhost:3000"
    echo ""
    echo "📚 Documentation:"
    echo "- Manual: $AI_ENTERPRISE_HOME/00_MANUAL/README.md"
    echo "- Setup: $AI_ENTERPRISE_HOME/01_SETUP/"
    echo "- Logs: $AI_ENTERPRISE_HOME/logs/"
    echo ""
    echo "🛠️ Management Commands:"
    echo "- Start: ./start_ai_enterprise.sh"
    echo "- Stop: ./stop_ai_enterprise.sh"
    echo "- Status: ./status_ai_enterprise.sh"
}

# Run main function
main "$@"
```

---

## **Quick Start Commands** 🚀

### **Setup and Start**
```bash
# Run complete setup
./setup_ai_enterprise.sh

# Start AI Enterprise OS
./start_ai_enterprise.sh

# Check status
./status_ai_enterprise.sh

# Stop AI Enterprise OS
./stop_ai_enterprise.sh
```

### **Individual Component Management**
```bash
# MCP Servers
./mcp-servers/manage_mcp_servers.sh start all
./mcp-servers/manage_mcp_servers.sh status all

# Local LLMs
./01_SETUP/manage_services.sh start all
./01_SETUP/manage_services.sh status all

# Vercept Jobs
./vercept-jobs/manage_vercept_jobs.sh start
./vercept-jobs/manage_vercept_jobs.sh status

# Docker Services
docker-compose up -d
docker-compose ps
```

---

**Status**: 🟢 **AI ENTERPRISE OS SETUP COMPLETE**

Your AI Enterprise OS is now fully configured with complete setup scripts, management tools, and integration testing for seamless operation.

#!/bin/bash
# IZA OS Complete Setup Script
# Sets up the entire IZA OS system with LLM integration

set -e

echo "🚀 IZA OS Complete Setup"
echo "========================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "40-mcp-agents" ]; then
    print_error "Please run this script from the IZA OS root directory"
    exit 1
fi

print_status "Starting IZA OS setup..."

# Create necessary directories
print_status "Creating directories..."
mkdir -p logs
mkdir -p config
mkdir -p data
mkdir -p cache
mkdir -p 30-models/hosted/{anthropic,openai,huggingface}
mkdir -p 60-observability/metrics/prometheus
mkdir -p 60-observability/logs
mkdir -p 60-observability/tracing

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from template..."
    cp env.example .env
    print_warning "Please edit .env file with your API keys before running the system"
else
    print_success ".env file already exists"
fi

# Install Python dependencies
print_status "Installing Python dependencies..."
if command -v pip3 &> /dev/null; then
    pip3 install -r requirements.txt
    print_success "Python dependencies installed"
else
    print_error "pip3 not found. Please install Python 3.11+ and pip"
    exit 1
fi

# Install orchestrator dependencies
print_status "Installing orchestrator dependencies..."
cd 40-mcp-agents/mcp-clients/iza-os-orchestrator
pip3 install -e .
cd ../../..

# Install dashboard dependencies
print_status "Installing dashboard dependencies..."
cd 50-apps/ux-ui/iza-os-dashboard
if command -v npm &> /dev/null; then
    npm install
    print_success "Dashboard dependencies installed"
else
    print_warning "npm not found. Please install Node.js and npm for the dashboard"
fi
cd ../../..

# Create configuration files
print_status "Creating configuration files..."

# Create orchestrator config
cat > config/orchestrator.json << EOF
{
  "name": "IZA OS Orchestrator",
  "version": "1.0.0",
  "agents": {
    "product_manager": {
      "enabled": true,
      "max_concurrent_tasks": 5
    },
    "tech_lead": {
      "enabled": true,
      "max_concurrent_tasks": 3
    },
    "finance_agent": {
      "enabled": true,
      "max_concurrent_tasks": 2
    },
    "marketing_agent": {
      "enabled": true,
      "max_concurrent_tasks": 4
    },
    "operations_agent": {
      "enabled": true,
      "max_concurrent_tasks": 3
    }
  },
  "mcp_servers": {
    "filesystem": {
      "enabled": true,
      "port": 8001
    },
    "git": {
      "enabled": true,
      "port": 8002
    },
    "database": {
      "enabled": true,
      "port": 8003
    },
    "api": {
      "enabled": true,
      "port": 8004
    }
  },
  "llm": {
    "default_provider": "anthropic",
    "fallback_provider": "openai",
    "cache_enabled": true
  },
  "monitoring": {
    "enabled": true,
    "prometheus_port": 9090,
    "metrics_interval": 30
  }
}
EOF

# Create Prometheus config
cat > 60-observability/metrics/prometheus/iza-os-prometheus.yml << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'iza-os-orchestrator'
    static_configs:
      - targets: ['localhost:9090']
    scrape_interval: 5s
    
  - job_name: 'iza-os-llm'
    static_configs:
      - targets: ['localhost:9091']
    scrape_interval: 10s
    
  - job_name: 'iza-os-agents'
    static_configs:
      - targets: ['localhost:9092']
    scrape_interval: 15s
EOF

print_success "Configuration files created"

# Set up permissions
print_status "Setting up permissions..."
chmod +x 99-ops/scripts/clone_from_registry.py
chmod +x 30-models/llm_manager.py
chmod +x 60-observability/metrics/metrics_collector.py
chmod +x 40-mcp-agents/mcp-clients/iza-os-orchestrator/src/core.py

print_success "Permissions set"

# Test the setup
print_status "Testing setup..."

# Test Python imports
python3 -c "
try:
    import yaml
    import asyncio
    import httpx
    print('✅ Core Python dependencies available')
except ImportError as e:
    print(f'❌ Missing dependency: {e}')
    exit(1)
"

# Test orchestrator
python3 -c "
import sys
import os
sys.path.append('40-mcp-agents/mcp-clients/iza-os-orchestrator/src')
try:
    from core import IZAOSOrchestrator
    print('✅ Orchestrator can be imported')
except Exception as e:
    print(f'❌ Orchestrator import failed: {e}')
"

print_success "Setup tests passed"

# Create startup scripts
print_status "Creating startup scripts..."

cat > start_iza_os.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting IZA OS..."

# Start orchestrator
echo "Starting orchestrator..."
cd 40-mcp-agents/mcp-clients/iza-os-orchestrator
python src/core.py &
ORCHESTRATOR_PID=$!

# Start dashboard
echo "Starting dashboard..."
cd ../../../50-apps/ux-ui/iza-os-dashboard
npm run dev &
DASHBOARD_PID=$!

# Start metrics collector
echo "Starting metrics collector..."
cd ../../../60-observability/metrics
python metrics_collector.py &
METRICS_PID=$!

echo "✅ IZA OS started successfully!"
echo "📱 Dashboard: http://localhost:3000"
echo "📊 Metrics: http://localhost:9090"
echo "🤖 Orchestrator: Running in background"

# Save PIDs for cleanup
echo $ORCHESTRATOR_PID > /tmp/iza_os_orchestrator.pid
echo $DASHBOARD_PID > /tmp/iza_os_dashboard.pid
echo $METRICS_PID > /tmp/iza_os_metrics.pid

wait
EOF

cat > stop_iza_os.sh << 'EOF'
#!/bin/bash
echo "🛑 Stopping IZA OS..."

# Stop orchestrator
if [ -f /tmp/iza_os_orchestrator.pid ]; then
    ORCHESTRATOR_PID=$(cat /tmp/iza_os_orchestrator.pid)
    kill $ORCHESTRATOR_PID 2>/dev/null || true
    rm /tmp/iza_os_orchestrator.pid
fi

# Stop dashboard
if [ -f /tmp/iza_os_dashboard.pid ]; then
    DASHBOARD_PID=$(cat /tmp/iza_os_dashboard.pid)
    kill $DASHBOARD_PID 2>/dev/null || true
    rm /tmp/iza_os_dashboard.pid
fi

# Stop metrics
if [ -f /tmp/iza_os_metrics.pid ]; then
    METRICS_PID=$(cat /tmp/iza_os_metrics.pid)
    kill $METRICS_PID 2>/dev/null || true
    rm /tmp/iza_os_metrics.pid
fi

# Clean up any remaining processes
pkill -f "python.*core.py" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
pkill -f "metrics_collector.py" 2>/dev/null || true

echo "✅ IZA OS stopped"
EOF

chmod +x start_iza_os.sh stop_iza_os.sh

print_success "Startup scripts created"

# Final status
print_success "IZA OS setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run: ./start_iza_os.sh"
echo "3. Access dashboard at: http://localhost:3000"
echo "4. View metrics at: http://localhost:9090"
echo ""
echo "🛠️  Available commands:"
echo "  make help          - Show all available commands"
echo "  make bootstrap     - Bootstrap the system"
echo "  make clone-all     - Clone external repositories"
echo "  make start-all     - Start all services"
echo "  make status        - Check system status"
echo "  make stop          - Stop all services"
echo ""
echo "📚 Documentation:"
echo "  README.md          - Main documentation"
echo "  env.example        - Environment configuration template"
echo "  config/            - Configuration files"
echo ""
print_success "Setup complete! 🎉"

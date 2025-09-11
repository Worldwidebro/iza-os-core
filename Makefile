# IZA OS Makefile
# The Operating System for an Autonomous Venture Studio

.PHONY: help setup bootstrap clone-all start-orchestrator start-dashboard start-all status stop clean

# Default target
help:
	@echo "IZA OS - The Operating System for an Autonomous Venture Studio"
	@echo ""
	@echo "Available commands:"
	@echo "  setup           - Initial setup and configuration"
	@echo "  bootstrap       - Bootstrap the entire system"
	@echo "  clone-all       - Clone all external repositories"
	@echo "  start-orchestrator - Start the IZA OS orchestrator"
	@echo "  start-dashboard - Start the dashboard"
	@echo "  start-all       - Start all services"
	@echo "  status          - Check system status"
	@echo "  stop            - Stop all services"
	@echo "  clean           - Clean up temporary files"

# Initial setup
setup:
	@echo "🚀 Setting up IZA OS..."
	@mkdir -p logs
	@mkdir -p config
	@mkdir -p data
	@echo "✅ Setup complete"

# Bootstrap the system
bootstrap: setup
	@echo "🔧 Bootstrapping IZA OS..."
	@cd 40-mcp-agents/mcp-clients/iza-os-orchestrator && pip install -e .
	@cd 50-apps/ux-ui/iza-os-dashboard && npm install
	@echo "✅ Bootstrap complete"

# Clone all external repositories
clone-all:
	@echo "📦 Cloning external repositories..."
	@python3 99-ops/scripts/clone_from_registry.py 00-meta/registry/repos.json
	@echo "✅ Repository cloning complete"

# Start the orchestrator
start-orchestrator:
	@echo "🤖 Starting IZA OS Orchestrator..."
	@cd 40-mcp-agents/mcp-clients/iza-os-orchestrator && python src/core.py &

# Start the dashboard
start-dashboard:
	@echo "📱 Starting IZA OS Dashboard..."
	@cd 50-apps/ux-ui/iza-os-dashboard && npm run dev &

# Start all services
start-all: start-orchestrator start-dashboard
	@echo "🚀 All IZA OS services started"
	@echo "📱 Dashboard: http://localhost:3000"
	@echo "🤖 Orchestrator: Running in background"

# Check system status
status:
	@echo "📊 IZA OS System Status:"
	@echo "========================"
	@ps aux | grep -E "(python.*core\.py|npm.*dev)" | grep -v grep || echo "No services running"
	@echo ""
	@echo "🌐 Port Status:"
	@netstat -an | grep -E "(3000|8001|8002|8003|8004)" | grep LISTEN || echo "No services listening"

# Stop all services
stop:
	@echo "🛑 Stopping IZA OS services..."
	@pkill -f "python.*core\.py" || true
	@pkill -f "npm.*dev" || true
	@echo "✅ All services stopped"

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	@rm -rf logs/*
	@rm -rf __pycache__
	@rm -rf .pytest_cache
	@find . -name "*.pyc" -delete
	@echo "✅ Cleanup complete"

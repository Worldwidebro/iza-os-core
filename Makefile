# IZA OS Makefile
# The Operating System for an Autonomous Venture Studio

.PHONY: help setup bootstrap clone-all start-orchestrator start-dashboard start-all status stop clean update-registry second-brain start-mcp-servers analyze-repos import-n8n

# Default target
help:
	@echo "IZA OS - The Operating System for an Autonomous Venture Studio"
	@echo ""
	@echo "Available commands:"
	@echo "  setup           - Initial setup and configuration"
	@echo "  bootstrap       - Bootstrap the entire system"
	@echo "  clone-all       - Clone all external repositories"
	@echo "  update-registry - Update repository registry"
	@echo "  second-brain    - Seed second brain with knowledge"
	@echo "  start-orchestrator - Start the IZA OS orchestrator"
	@echo "  start-dashboard - Start the dashboard"
	@echo "  start-mcp-servers - Start MCP servers"
	@echo "  start-all       - Start all services"
	@echo "  analyze-repos   - Analyze cloned repositories"
	@echo "  import-n8n      - Import n8n workflow templates"
	@echo "  status          - Check system status"
	@echo "  stop            - Stop all services"
	@echo "  clean           - Clean up temporary files"

# Initial setup
setup:
	@echo "🚀 Setting up IZA OS..."
	@pip install -r requirements.txt
	@pip install -e 40-mcp-agents/mcp-clients/iza-os-orchestrator/
	@pip install -e 40-mcp-agents/mcp-servers/iza-os-agents/
	@pip install -e 40-mcp-agents/mcp-servers/iza-os-tools/
	@mkdir -p logs config data
	@echo "✅ Setup complete"

# Bootstrap the system
bootstrap: setup
	@echo "🔧 Bootstrapping IZA OS..."
	@./setup_iza_os.sh
	@echo "✅ Bootstrap complete"

# Clone all external repositories
clone-all:
	@echo "📦 Cloning external repositories..."
	@python3 99-ops/scripts/clone_from_registry.py 00-meta/registry/repos.json
	@echo "✅ Repository cloning complete"

# Update repository registry
update-registry:
	@echo "🔄 Updating repository registry..."
	@./99-ops/scripts/refresh_registry.sh

# Seed second brain
second-brain:
	@echo "🧠 Seeding second brain..."
	@./99-ops/scripts/seed_second_brain.sh

# Start the orchestrator
start-orchestrator:
	@echo "🤖 Starting IZA OS Orchestrator..."
	@cd 40-mcp-agents/mcp-clients/iza-os-orchestrator && python src/core.py &

# Start the dashboard
start-dashboard:
	@echo "📱 Starting IZA OS Dashboard..."
	@cd 50-apps/ux-ui/iza-os-dashboard && npm run dev &

# Start MCP servers
start-mcp-servers:
	@echo "🔌 Starting MCP servers..."
	@cd 40-mcp-agents/mcp-servers/llm-core && fastmcp run src.llm.claude_client:app &
	@cd 40-mcp-agents/mcp-servers/iza-os-tools && fastmcp run src.mcp.github_server:app &

# Start all services
start-all: start-orchestrator start-dashboard start-mcp-servers
	@echo "🚀 All IZA OS services started"
	@echo "📱 Dashboard: http://localhost:3000"
	@echo "🤖 Orchestrator: Running in background"
	@echo "🔌 MCP Servers: Running in background"

# Analyze repositories
analyze-repos:
	@echo "📊 Analyzing repositories..."
	@python 99-ops/scripts/analyze_repos.py

# Import n8n templates
import-n8n:
	@echo "🔄 Importing n8n templates..."
	@python 99-ops/scripts/import_n8n_templates.py

# Check system status
status:
	@echo "📊 IZA OS System Status:"
	@echo "========================"
	@ps aux | grep -E "(python.*core\.py|npm.*dev|fastmcp)" | grep -v grep || echo "No services running"
	@echo ""
	@echo "🌐 Port Status:"
	@netstat -an | grep -E "(3000|8001|8002|8003|8004|9090)" | grep LISTEN || echo "No services listening"

# Stop all services
stop:
	@echo "🛑 Stopping IZA OS services..."
	@pkill -f "python.*core\.py" || true
	@pkill -f "npm.*dev" || true
	@pkill -f "fastmcp" || true
	@echo "✅ All services stopped"

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	@rm -rf logs/*
	@rm -rf __pycache__
	@rm -rf .pytest_cache
	@find . -name "*.pyc" -delete
	@echo "✅ Cleanup complete"

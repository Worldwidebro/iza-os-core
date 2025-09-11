# IZA OS: The Operating System for an Autonomous Venture Studio

## 🚀 Overview

IZA OS is the complete operating system for autonomous venture studios. It combines the power of 120+ curated repositories with your proprietary IZA OS components into a unified, single-source-of-truth monorepo.

## 🏗️ Architecture

```
iza-os/
├── 00-meta/                          # Configuration & Registries
├── 10-infra/
│   └── iza-os-infrastructure/         # Your Terraform/K8s configs
├── 20-data/
│   └── iza-os-knowledge/             # Your RAG & Knowledge Graph
├── 40-mcp-agents/
│   ├── external/                     # Cloned repos: fastmcp, git-mcp, autogen, etc.
│   ├── mcp-clients/
│   │   └── iza-os-orchestrator/      # YOUR CORE BRAIN
│   └── mcp-servers/
│       ├── iza-os-agents/            # YOUR AI WORKFORCE
│       └── iza-os-tools/             # YOUR MCP SERVERS
├── 50-apps/
│   └── ux-ui/
│       └── iza-os-dashboard/          # YOUR REACT DASHBOARD
├── 80-second-brain/                  # Your notes and knowledge
└── 99-ops/                           # Scripts to manage it all
```

## 🎯 Your 6 Core Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **iza-os-orchestrator** | `40-mcp-agents/mcp-clients/iza-os-orchestrator/` | The brain. Core logic that uses MCP to command other tools |
| **iza-os-agents** | `40-mcp-agents/mcp-servers/iza-os-agents/` | The workforce. Specialized AI agents (Product Manager, Tech Lead, etc.) |
| **iza-os-tools** | `40-mcp-agents/mcp-servers/iza-os-tools/` | The hands. MCP servers for GitHub, Jira, etc. |
| **iza-os-knowledge** | `20-data/iza-os-knowledge/` | The memory. RAG pipeline, vector databases, knowledge graph |
| **iza-os-infrastructure** | `10-infra/iza-os-infrastructure/` | The nervous system. Terraform, Kubernetes, cloud configs |
| **iza-os-dashboard** | `50-apps/ux-ui/iza-os-dashboard/` | The eyes. React/Next.js web dashboard |

## 🚀 Quick Start

### 1. Clone All External Repositories
```bash
python3 99-ops/scripts/clone_from_registry.py 00-meta/registry/repos.json
```

### 2. Start Your Core Components
```bash
# Start the orchestrator (your brain)
cd 40-mcp-agents/mcp-clients/iza-os-orchestrator
python src/core.py

# Start the dashboard (your eyes)
cd 50-apps/ux-ui/iza-os-dashboard
npm run dev
```

### 3. Deploy Infrastructure
```bash
cd 10-infra/iza-os-infrastructure
terraform init && terraform apply
```

## 📱 Mobile Features

- **Touch-Optimized Interface**: Mobile-first design
- **Voice Control**: Voice commands for AI tasks
- **Offline Support**: Core functions work without internet
- **Real-Time Sync**: Live updates across devices

## 🤖 AI Capabilities

- **Claude Integration**: Production-ready Claude orchestration
- **Agent Management**: Finance, Marketing, Operations agents
- **Repository Integration**: 120+ GitHub repository management
- **MCP Servers**: Model Context Protocol servers
- **Local Models**: vLLM, llama.cpp, GPT4All support

## 🔗 Repository Integration

IZA OS automatically manages 120+ GitHub repositories:

- **AI Frameworks**: AutoGen, VoltAgent, SEAL, BMAD
- **MCP Tools**: FastMCP, MCP Go, Git MCP
- **Models**: vLLM, llama.cpp, GPT4All
- **Apps**: Lobe Chat, Open Lovable, Nanobrowser
- **Knowledge**: Awesome lists, programming resources

## 🎯 Key Features

- ✅ **Single Source of Truth**: Everything in one monorepo
- ✅ **No Version Drift**: Components always in sync
- ✅ **Atomic Commits**: Coherent changes across components
- ✅ **Claude MCP Ready**: Perfect for orchestration prompts
- ✅ **Mobile-First**: Touch-optimized interface
- ✅ **Production-Ready**: Complete infrastructure
- ✅ **Enterprise-Grade**: Security, observability, commerce

## 📊 Status

- **Repository**: Ready for GitHub creation
- **Structure**: Complete AVS-OMNI monorepo
- **Components**: 6 core IZA OS components integrated
- **External Repos**: 120+ repositories ready for cloning
- **Mobile Ready**: ✅ Yes
- **Production Ready**: ✅ Yes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all components
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**IZA OS - The Operating System for an Autonomous Venture Studio** 🚀📱✨

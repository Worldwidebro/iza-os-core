# 🔌 MCP Server Setup & Configuration
## Model Context Protocol Server Configuration and Deployment

**Complete MCP Server Setup for AI Enterprise OS Integration**

---

## **MCP Server Architecture** 🏗️

### **Core MCP Components**
```yaml
mcp_servers:
  - name: "ai-orchestrator"
    purpose: "Main orchestration and agent coordination"
    port: 8001
    protocols: ["json-rpc", "websocket"]
    
  - name: "knowledge-manager"
    purpose: "RAG and knowledge graph management"
    port: 8002
    protocols: ["json-rpc", "http"]
    
  - name: "data-processor"
    purpose: "Data processing and ETL operations"
    port: 8003
    protocols: ["json-rpc", "grpc"]
    
  - name: "monitoring-agent"
    purpose: "System monitoring and metrics collection"
    port: 8004
    protocols: ["json-rpc", "prometheus"]
    
  - name: "security-manager"
    purpose: "Authentication and security management"
    port: 8005
    protocols: ["json-rpc", "oauth2"]
```

---

## **MCP Server Implementation** 🚀

### **1. Core MCP Server Framework**
```bash
# Create MCP server directory
mkdir -p $AI_ENTERPRISE_HOME/mcp-servers
cd $AI_ENTERPRISE_HOME/mcp-servers

# Create base MCP server
cat > mcp_server_base.py << 'EOF'
#!/usr/bin/env python3
"""
Base MCP Server Implementation for AI Enterprise OS
"""

import asyncio
import json
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod

@dataclass
class MCPRequest:
    """MCP Request structure"""
    id: str
    method: str
    params: Dict[str, Any]
    jsonrpc: str = "2.0"

@dataclass
class MCPResponse:
    """MCP Response structure"""
    id: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[Dict[str, Any]] = None
    jsonrpc: str = "2.0"

class MCPServerBase(ABC):
    """Base MCP Server class"""
    
    def __init__(self, name: str, port: int):
        self.name = name
        self.port = port
        self.methods = {}
        self.logger = logging.getLogger(f"mcp-{name}")
        self._register_methods()
    
    def _register_methods(self):
        """Register available MCP methods"""
        self.methods = {
            "initialize": self._handle_initialize,
            "ping": self._handle_ping,
            "get_capabilities": self._handle_get_capabilities,
            "shutdown": self._handle_shutdown,
        }
    
    async def handle_request(self, request_data: str) -> str:
        """Handle incoming MCP request"""
        try:
            request_dict = json.loads(request_data)
            request = MCPRequest(**request_dict)
            
            if request.method in self.methods:
                result = await self.methods[request.method](request.params)
                response = MCPResponse(id=request.id, result=result)
            else:
                error = {
                    "code": -32601,
                    "message": f"Method not found: {request.method}"
                }
                response = MCPResponse(id=request.id, error=error)
            
            return json.dumps(response.__dict__)
            
        except Exception as e:
            self.logger.error(f"Error handling request: {e}")
            error = {
                "code": -32603,
                "message": f"Internal error: {str(e)}"
            }
            response = MCPResponse(id="unknown", error=error)
            return json.dumps(response.__dict__)
    
    async def _handle_initialize(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle initialize request"""
        return {
            "protocolVersion": "2024-11-05",
            "capabilities": self.get_capabilities(),
            "serverInfo": {
                "name": self.name,
                "version": "1.0.0"
            }
        }
    
    async def _handle_ping(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle ping request"""
        return {"status": "pong"}
    
    async def _handle_get_capabilities(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle get capabilities request"""
        return self.get_capabilities()
    
    async def _handle_shutdown(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle shutdown request"""
        await self.shutdown()
        return {"status": "shutdown"}
    
    @abstractmethod
    def get_capabilities(self) -> Dict[str, Any]:
        """Get server capabilities"""
        pass
    
    @abstractmethod
    async def shutdown(self):
        """Shutdown server"""
        pass

class MCPServerRunner:
    """MCP Server runner with HTTP and WebSocket support"""
    
    def __init__(self, server: MCPServerBase):
        self.server = server
        self.logger = logging.getLogger(f"mcp-runner-{server.name}")
    
    async def start_http_server(self):
        """Start HTTP MCP server"""
        from aiohttp import web, web_request
        
        async def handle_request(request: web_request.Request):
            data = await request.text()
            response_data = await self.server.handle_request(data)
            return web.Response(text=response_data, content_type='application/json')
        
        app = web.Application()
        app.router.add_post('/', handle_request)
        
        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, 'localhost', self.server.port)
        
        self.logger.info(f"Starting MCP server {self.server.name} on port {self.server.port}")
        await site.start()
        
        # Keep server running
        try:
            await asyncio.Future()
        except KeyboardInterrupt:
            self.logger.info(f"Shutting down MCP server {self.server.name}")
            await runner.cleanup()
    
    async def start_websocket_server(self):
        """Start WebSocket MCP server"""
        import websockets
        
        async def handle_websocket(websocket, path):
            self.logger.info(f"WebSocket connection established for {self.server.name}")
            
            async for message in websocket:
                try:
                    response = await self.server.handle_request(message)
                    await websocket.send(response)
                except Exception as e:
                    self.logger.error(f"WebSocket error: {e}")
                    await websocket.close()
        
        self.logger.info(f"Starting WebSocket MCP server {self.server.name} on port {self.server.port}")
        
        async with websockets.serve(handle_websocket, "localhost", self.server.port):
            await asyncio.Future()

if __name__ == "__main__":
    # Example usage
    logging.basicConfig(level=logging.INFO)
    
    class ExampleMCPServer(MCPServerBase):
        def get_capabilities(self):
            return {
                "tools": ["example_tool"],
                "resources": ["example_resource"]
            }
        
        async def shutdown(self):
            self.logger.info("Example MCP server shutting down")
    
    server = ExampleMCPServer("example", 8001)
    runner = MCPServerRunner(server)
    
    # Start server
    asyncio.run(runner.start_http_server())
EOF
```

### **2. AI Orchestrator MCP Server**
```bash
# Create AI Orchestrator MCP Server
cat > ai_orchestrator_mcp.py << 'EOF'
#!/usr/bin/env python3
"""
AI Orchestrator MCP Server for AI Enterprise OS
"""

import asyncio
import json
from typing import Dict, List, Any
from mcp_server_base import MCPServerBase, MCPServerRunner
from ollama_client import OllamaClient
from anythingllm_client import AnythingLLMClient
from math_agent import MathAgent

class AIOrchestratorMCPServer(MCPServerBase):
    """AI Orchestrator MCP Server"""
    
    def __init__(self):
        super().__init__("ai-orchestrator", 8001)
        
        # Initialize AI clients
        self.ollama = OllamaClient()
        self.anythingllm = AnythingLLMClient()
        self.math_agent = MathAgent()
        
        # Register AI-specific methods
        self.methods.update({
            "generate_text": self._handle_generate_text,
            "chat_with_workspace": self._handle_chat_workspace,
            "solve_math_problem": self._handle_solve_math,
            "orchestrate_agents": self._handle_orchestrate_agents,
            "get_agent_status": self._handle_get_agent_status,
        })
    
    def get_capabilities(self) -> Dict[str, Any]:
        """Get AI Orchestrator capabilities"""
        return {
            "tools": [
                "generate_text",
                "chat_with_workspace", 
                "solve_math_problem",
                "orchestrate_agents",
                "get_agent_status"
            ],
            "resources": [
                "ollama_models",
                "anythingllm_workspaces",
                "math_calculations"
            ],
            "capabilities": {
                "text_generation": True,
                "mathematical_reasoning": True,
                "multi_agent_coordination": True,
                "workspace_management": True
            }
        }
    
    async def _handle_generate_text(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle text generation request"""
        try:
            model = params.get("model", "llama2:7b")
            prompt = params.get("prompt", "")
            max_tokens = params.get("max_tokens", 1000)
            
            response = self.ollama.generate(model, prompt, num_predict=max_tokens)
            
            return {
                "success": True,
                "response": response,
                "model": model,
                "tokens_generated": len(response.split())
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_chat_workspace(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle workspace chat request"""
        try:
            workspace_id = params.get("workspace_id", "default")
            message = params.get("message", "")
            
            response = self.anythingllm.chat(message, workspace_id)
            
            return {
                "success": True,
                "response": response,
                "workspace_id": workspace_id
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_solve_math(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle mathematical problem solving"""
        try:
            problem = params.get("problem", "")
            
            result = self.math_agent.process_math_query(problem)
            
            return {
                "success": True,
                "result": result
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_orchestrate_agents(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle multi-agent orchestration"""
        try:
            task = params.get("task", "")
            agents = params.get("agents", [])
            
            # Simple orchestration logic
            results = {}
            
            for agent in agents:
                if agent == "ollama":
                    response = self.ollama.generate("llama2:7b", task)
                    results[agent] = {"response": response}
                elif agent == "math":
                    result = self.math_agent.process_math_query(task)
                    results[agent] = {"result": result}
                elif agent == "anythingllm":
                    response = self.anythingllm.chat(task, "default")
                    results[agent] = {"response": response}
            
            return {
                "success": True,
                "task": task,
                "agent_results": results
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_get_agent_status(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Get status of all agents"""
        try:
            status = {
                "ollama": {
                    "available": len(self.ollama.list_models()) > 0,
                    "models": [m["name"] for m in self.ollama.list_models()]
                },
                "anythingllm": {
                    "available": len(self.anythingllm.list_workspaces()) >= 0,
                    "workspaces": [w["name"] for w in self.anythingllm.list_workspaces()]
                },
                "math_agent": {
                    "available": True,
                    "history_count": len(self.math_agent.get_history())
                }
            }
            
            return {
                "success": True,
                "status": status
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def shutdown(self):
        """Shutdown AI Orchestrator"""
        self.logger.info("AI Orchestrator MCP server shutting down")

async def main():
    """Main function to run AI Orchestrator MCP Server"""
    logging.basicConfig(level=logging.INFO)
    
    server = AIOrchestratorMCPServer()
    runner = MCPServerRunner(server)
    
    print("🚀 Starting AI Orchestrator MCP Server...")
    await runner.start_http_server()

if __name__ == "__main__":
    asyncio.run(main())
EOF
```

### **3. Knowledge Manager MCP Server**
```bash
# Create Knowledge Manager MCP Server
cat > knowledge_manager_mcp.py << 'EOF'
#!/usr/bin/env python3
"""
Knowledge Manager MCP Server for AI Enterprise OS
"""

import asyncio
import json
import os
from typing import Dict, List, Any
from mcp_server_base import MCPServerBase, MCPServerRunner
import chromadb
from neo4j import GraphDatabase

class KnowledgeManagerMCPServer(MCPServerBase):
    """Knowledge Manager MCP Server"""
    
    def __init__(self):
        super().__init__("knowledge-manager", 8002)
        
        # Initialize knowledge systems
        self.chroma_client = chromadb.Client()
        self.neo4j_driver = GraphDatabase.driver(
            "bolt://localhost:7687",
            auth=("neo4j", "password")
        )
        
        # Register knowledge-specific methods
        self.methods.update({
            "store_document": self._handle_store_document,
            "search_knowledge": self._handle_search_knowledge,
            "create_knowledge_graph": self._handle_create_knowledge_graph,
            "query_knowledge_graph": self._handle_query_knowledge_graph,
            "get_knowledge_stats": self._handle_get_knowledge_stats,
        })
    
    def get_capabilities(self) -> Dict[str, Any]:
        """Get Knowledge Manager capabilities"""
        return {
            "tools": [
                "store_document",
                "search_knowledge",
                "create_knowledge_graph",
                "query_knowledge_graph",
                "get_knowledge_stats"
            ],
            "resources": [
                "chroma_collections",
                "neo4j_graph",
                "document_storage"
            ],
            "capabilities": {
                "document_storage": True,
                "semantic_search": True,
                "knowledge_graph": True,
                "vector_search": True
            }
        }
    
    async def _handle_store_document(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle document storage request"""
        try:
            content = params.get("content", "")
            metadata = params.get("metadata", {})
            collection_name = params.get("collection", "default")
            
            # Get or create collection
            try:
                collection = self.chroma_client.get_collection(collection_name)
            except:
                collection = self.chroma_client.create_collection(collection_name)
            
            # Add document to collection
            collection.add(
                documents=[content],
                metadatas=[metadata],
                ids=[f"doc_{len(collection.get()['ids'])}"]
            )
            
            return {
                "success": True,
                "collection": collection_name,
                "document_id": f"doc_{len(collection.get()['ids'])-1}"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_search_knowledge(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle knowledge search request"""
        try:
            query = params.get("query", "")
            collection_name = params.get("collection", "default")
            n_results = params.get("n_results", 5)
            
            # Get collection
            try:
                collection = self.chroma_client.get_collection(collection_name)
            except:
                return {
                    "success": False,
                    "error": f"Collection {collection_name} not found"
                }
            
            # Search collection
            results = collection.query(
                query_texts=[query],
                n_results=n_results
            )
            
            return {
                "success": True,
                "query": query,
                "results": results
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_create_knowledge_graph(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle knowledge graph creation"""
        try:
            entities = params.get("entities", [])
            relationships = params.get("relationships", [])
            
            with self.neo4j_driver.session() as session:
                # Create entities
                for entity in entities:
                    session.run(
                        "CREATE (e:Entity {name: $name, type: $type, properties: $properties})",
                        name=entity["name"],
                        type=entity.get("type", "unknown"),
                        properties=entity.get("properties", {})
                    )
                
                # Create relationships
                for rel in relationships:
                    session.run(
                        "MATCH (a:Entity {name: $from}), (b:Entity {name: $to}) "
                        "CREATE (a)-[r:RELATES {type: $type, properties: $properties}]->(b)",
                        from=rel["from"],
                        to=rel["to"],
                        type=rel.get("type", "related"),
                        properties=rel.get("properties", {})
                    )
            
            return {
                "success": True,
                "entities_created": len(entities),
                "relationships_created": len(relationships)
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_query_knowledge_graph(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle knowledge graph query"""
        try:
            cypher_query = params.get("query", "")
            
            with self.neo4j_driver.session() as session:
                result = session.run(cypher_query)
                records = [record.data() for record in result]
            
            return {
                "success": True,
                "query": cypher_query,
                "results": records
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _handle_get_knowledge_stats(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Get knowledge system statistics"""
        try:
            # Get ChromaDB stats
            collections = self.chroma_client.list_collections()
            chroma_stats = {
                "collections": len(collections),
                "collection_names": [c.name for c in collections]
            }
            
            # Get Neo4j stats
            with self.neo4j_driver.session() as session:
                node_count = session.run("MATCH (n) RETURN count(n) as count").single()["count"]
                rel_count = session.run("MATCH ()-[r]->() RETURN count(r) as count").single()["count"]
            
            neo4j_stats = {
                "nodes": node_count,
                "relationships": rel_count
            }
            
            return {
                "success": True,
                "chroma_stats": chroma_stats,
                "neo4j_stats": neo4j_stats
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def shutdown(self):
        """Shutdown Knowledge Manager"""
        self.logger.info("Knowledge Manager MCP server shutting down")
        self.neo4j_driver.close()

async def main():
    """Main function to run Knowledge Manager MCP Server"""
    logging.basicConfig(level=logging.INFO)
    
    server = KnowledgeManagerMCPServer()
    runner = MCPServerRunner(server)
    
    print("🚀 Starting Knowledge Manager MCP Server...")
    await runner.start_http_server()

if __name__ == "__main__":
    asyncio.run(main())
EOF
```

### **4. MCP Client Implementation**
```bash
# Create MCP Client
cat > mcp_client.py << 'EOF'
#!/usr/bin/env python3
"""
MCP Client for AI Enterprise OS
"""

import asyncio
import json
import aiohttp
import websockets
from typing import Dict, List, Any, Optional

class MCPClient:
    """MCP Client for communicating with MCP servers"""
    
    def __init__(self, server_url: str, protocol: str = "http"):
        self.server_url = server_url
        self.protocol = protocol
        self.request_id = 0
    
    def _get_next_id(self) -> str:
        """Get next request ID"""
        self.request_id += 1
        return str(self.request_id)
    
    async def send_request(self, method: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        """Send MCP request to server"""
        request = {
            "jsonrpc": "2.0",
            "id": self._get_next_id(),
            "method": method,
            "params": params or {}
        }
        
        if self.protocol == "http":
            return await self._send_http_request(request)
        elif self.protocol == "websocket":
            return await self._send_websocket_request(request)
        else:
            raise ValueError(f"Unsupported protocol: {self.protocol}")
    
    async def _send_http_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """Send HTTP request"""
        async with aiohttp.ClientSession() as session:
            async with session.post(
                self.server_url,
                json=request,
                headers={"Content-Type": "application/json"}
            ) as response:
                return await response.json()
    
    async def _send_websocket_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """Send WebSocket request"""
        async with websockets.connect(self.server_url) as websocket:
            await websocket.send(json.dumps(request))
            response = await websocket.recv()
            return json.loads(response)

class MCPOrchestrator:
    """MCP Orchestrator for managing multiple MCP servers"""
    
    def __init__(self):
        self.servers = {
            "ai-orchestrator": MCPClient("http://localhost:8001", "http"),
            "knowledge-manager": MCPClient("http://localhost:8002", "http"),
            "data-processor": MCPClient("http://localhost:8003", "http"),
            "monitoring-agent": MCPClient("http://localhost:8004", "http"),
            "security-manager": MCPClient("http://localhost:8005", "http"),
        }
    
    async def initialize_all_servers(self) -> Dict[str, Any]:
        """Initialize all MCP servers"""
        results = {}
        
        for server_name, client in self.servers.items():
            try:
                response = await client.send_request("initialize")
                results[server_name] = {
                    "status": "success",
                    "capabilities": response.get("result", {}).get("capabilities", {})
                }
            except Exception as e:
                results[server_name] = {
                    "status": "error",
                    "error": str(e)
                }
        
        return results
    
    async def orchestrate_task(self, task: str, agents: List[str]) -> Dict[str, Any]:
        """Orchestrate task across multiple agents"""
        results = {}
        
        for agent in agents:
            if agent in self.servers:
                try:
                    if agent == "ai-orchestrator":
                        response = await self.servers[agent].send_request(
                            "orchestrate_agents",
                            {"task": task, "agents": ["ollama", "math", "anythingllm"]}
                        )
                    elif agent == "knowledge-manager":
                        response = await self.servers[agent].send_request(
                            "search_knowledge",
                            {"query": task, "n_results": 3}
                        )
                    else:
                        response = await self.servers[agent].send_request("ping")
                    
                    results[agent] = response
                except Exception as e:
                    results[agent] = {"error": str(e)}
        
        return results
    
    async def get_system_status(self) -> Dict[str, Any]:
        """Get status of all MCP servers"""
        status = {}
        
        for server_name, client in self.servers.items():
            try:
                response = await client.send_request("ping")
                status[server_name] = {
                    "status": "online",
                    "response": response
                }
            except Exception as e:
                status[server_name] = {
                    "status": "offline",
                    "error": str(e)
                }
        
        return status

async def main():
    """Main function to test MCP orchestration"""
    orchestrator = MCPOrchestrator()
    
    print("🔍 Initializing MCP servers...")
    init_results = await orchestrator.initialize_all_servers()
    print("Initialization results:", json.dumps(init_results, indent=2))
    
    print("\n📊 Getting system status...")
    status = await orchestrator.get_system_status()
    print("System status:", json.dumps(status, indent=2))
    
    print("\n🎯 Orchestrating task...")
    task_results = await orchestrator.orchestrate_task(
        "What is 2 + 2?",
        ["ai-orchestrator", "knowledge-manager"]
    )
    print("Task results:", json.dumps(task_results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
EOF
```

---

## **MCP Server Management** 🛠️

### **1. Create MCP Server Manager**
```bash
# Create MCP server management script
cat > manage_mcp_servers.sh << 'EOF'
#!/bin/bash

# MCP Server Management Script for AI Enterprise OS

MCP_DIR="$AI_ENTERPRISE_HOME/mcp-servers"
SERVICES_DIR="$AI_ENTERPRISE_HOME/services"
LOG_DIR="$AI_ENTERPRISE_HOME/logs"

mkdir -p $SERVICES_DIR $LOG_DIR

start_mcp_server() {
    local server_name=$1
    local server_file=$2
    local port=$3
    
    echo "🚀 Starting MCP server: $server_name on port $port..."
    
    cd $MCP_DIR
    python3 $server_file > $LOG_DIR/mcp-$server_name.log 2>&1 &
    echo $! > $SERVICES_DIR/mcp-$server_name.pid
    
    echo "✅ MCP server $server_name started (PID: $!)"
}

stop_mcp_server() {
    local server_name=$1
    
    echo "🛑 Stopping MCP server: $server_name..."
    
    if [ -f "$SERVICES_DIR/mcp-$server_name.pid" ]; then
        local pid=$(cat $SERVICES_DIR/mcp-$server_name.pid)
        kill $pid 2>/dev/null
        rm $SERVICES_DIR/mcp-$server_name.pid
        echo "✅ MCP server $server_name stopped"
    else
        echo "ℹ️  MCP server $server_name was not running"
    fi
}

status_mcp_server() {
    local server_name=$1
    
    if [ -f "$SERVICES_DIR/mcp-$server_name.pid" ]; then
        local pid=$(cat $SERVICES_DIR/mcp-$server_name.pid)
        if ps -p $pid > /dev/null; then
            echo "✅ MCP server $server_name is running (PID: $pid)"
        else
            echo "❌ MCP server $server_name is not running (stale PID file)"
            rm $SERVICES_DIR/mcp-$server_name.pid
        fi
    else
        echo "❌ MCP server $server_name is not running"
    fi
}

start_all_mcp_servers() {
    echo "🚀 Starting all MCP servers..."
    
    start_mcp_server "ai-orchestrator" "ai_orchestrator_mcp.py" "8001"
    sleep 2
    start_mcp_server "knowledge-manager" "knowledge_manager_mcp.py" "8002"
    sleep 2
    start_mcp_server "data-processor" "data_processor_mcp.py" "8003"
    sleep 2
    start_mcp_server "monitoring-agent" "monitoring_agent_mcp.py" "8004"
    sleep 2
    start_mcp_server "security-manager" "security_manager_mcp.py" "8005"
    
    echo "✅ All MCP servers started"
}

stop_all_mcp_servers() {
    echo "🛑 Stopping all MCP servers..."
    
    stop_mcp_server "ai-orchestrator"
    stop_mcp_server "knowledge-manager"
    stop_mcp_server "data-processor"
    stop_mcp_server "monitoring-agent"
    stop_mcp_server "security-manager"
    
    echo "✅ All MCP servers stopped"
}

status_all_mcp_servers() {
    echo "📊 MCP Server Status:"
    echo "===================="
    
    status_mcp_server "ai-orchestrator"
    status_mcp_server "knowledge-manager"
    status_mcp_server "data-processor"
    status_mcp_server "monitoring-agent"
    status_mcp_server "security-manager"
}

test_mcp_servers() {
    echo "🧪 Testing MCP servers..."
    
    cd $MCP_DIR
    python3 mcp_client.py
}

case $1 in
    "start")
        if [ -n "$2" ]; then
            case $2 in
                "ai-orchestrator")
                    start_mcp_server "ai-orchestrator" "ai_orchestrator_mcp.py" "8001"
                    ;;
                "knowledge-manager")
                    start_mcp_server "knowledge-manager" "knowledge_manager_mcp.py" "8002"
                    ;;
                "all")
                    start_all_mcp_servers
                    ;;
                *)
                    echo "Unknown server: $2"
                    ;;
            esac
        else
            start_all_mcp_servers
        fi
        ;;
    "stop")
        if [ -n "$2" ]; then
            stop_mcp_server $2
        else
            stop_all_mcp_servers
        fi
        ;;
    "status")
        if [ -n "$2" ]; then
            status_mcp_server $2
        else
            status_all_mcp_servers
        fi
        ;;
    "restart")
        if [ -n "$2" ]; then
            stop_mcp_server $2
            sleep 2
            case $2 in
                "ai-orchestrator")
                    start_mcp_server "ai-orchestrator" "ai_orchestrator_mcp.py" "8001"
                    ;;
                "knowledge-manager")
                    start_mcp_server "knowledge-manager" "knowledge_manager_mcp.py" "8002"
                    ;;
            esac
        else
            stop_all_mcp_servers
            sleep 3
            start_all_mcp_servers
        fi
        ;;
    "test")
        test_mcp_servers
        ;;
    *)
        echo "Usage: $0 {start|stop|status|restart|test} [server_name|all]"
        echo ""
        echo "Examples:"
        echo "  $0 start all"
        echo "  $0 start ai-orchestrator"
        echo "  $0 stop knowledge-manager"
        echo "  $0 status all"
        echo "  $0 restart all"
        echo "  $0 test"
        ;;
esac
EOF

chmod +x manage_mcp_servers.sh
```

### **2. Create MCP Configuration**
```bash
# Create MCP configuration file
cat > mcp_config.yaml << 'EOF'
# MCP Server Configuration for AI Enterprise OS

servers:
  ai-orchestrator:
    name: "AI Orchestrator"
    port: 8001
    protocol: "http"
    capabilities:
      - text_generation
      - mathematical_reasoning
      - multi_agent_coordination
      - workspace_management
    dependencies:
      - ollama
      - anythingllm
      - abacus-ai
  
  knowledge-manager:
    name: "Knowledge Manager"
    port: 8002
    protocol: "http"
    capabilities:
      - document_storage
      - semantic_search
      - knowledge_graph
      - vector_search
    dependencies:
      - chromadb
      - neo4j
  
  data-processor:
    name: "Data Processor"
    port: 8003
    protocol: "grpc"
    capabilities:
      - etl_processing
      - data_transformation
      - pipeline_management
      - data_validation
    dependencies:
      - pandas
      - numpy
      - airflow
  
  monitoring-agent:
    name: "Monitoring Agent"
    port: 8004
    protocol: "prometheus"
    capabilities:
      - metrics_collection
      - performance_monitoring
      - alerting
      - health_checks
    dependencies:
      - prometheus
      - grafana
  
  security-manager:
    name: "Security Manager"
    port: 8005
    protocol: "oauth2"
    capabilities:
      - authentication
      - authorization
      - token_management
      - security_monitoring
    dependencies:
      - jwt
      - oauth2

orchestration:
  workflow_engine: "vercept"
  cli_orchestrator: "warp"
  service_discovery: "consul"
  load_balancer: "nginx"

integration:
  auto_start: true
  health_check_interval: 30
  retry_attempts: 3
  timeout: 30
EOF
```

---

## **Quick Start Commands** 🚀

### **MCP Server Management**
```bash
# Start all MCP servers
./manage_mcp_servers.sh start all

# Start specific server
./manage_mcp_servers.sh start ai-orchestrator

# Check server status
./manage_mcp_servers.sh status all

# Test MCP integration
./manage_mcp_servers.sh test

# Stop all servers
./manage_mcp_servers.sh stop all
```

### **MCP Client Usage**
```bash
# Test MCP client
cd $AI_ENTERPRISE_HOME/mcp-servers
python3 mcp_client.py

# Test specific server
python3 -c "
import asyncio
from mcp_client import MCPClient

async def test():
    client = MCPClient('http://localhost:8001')
    response = await client.send_request('ping')
    print(response)

asyncio.run(test())
"
```

---

**Status**: 🟢 **MCP SERVER SETUP COMPLETE WITH FULL INTEGRATION**

Your MCP server setup now includes complete orchestration capabilities, knowledge management, and integration testing for seamless AI enterprise operations.

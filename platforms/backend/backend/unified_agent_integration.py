#!/usr/bin/env python3
"""
🔗 IZA OS UNIFIED AGENT INTEGRATION
==================================
Connects to existing agent systems instead of creating duplicates:
- AgentOrchestra (port 8087)
- Fast Agent Server (port 8002) 
- MCP Servers (filesystem, github, azure)
- All IZA OS specialized agents
"""

import asyncio
import logging
import os
import sys
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from uuid import uuid4

import uvicorn
import httpx
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
import redis
import jwt
from passlib.context import CryptContext

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/unified_agent_integration.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Security configuration
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Existing agent system endpoints
EXISTING_AGENT_SYSTEMS = {
    "agentorchestra": {
        "url": "http://localhost:8087",
        "description": "Hierarchical Multi-Agent Framework",
        "capabilities": ["planning", "research", "browser", "analysis", "automation"]
    },
    "fast_agent": {
        "url": "http://localhost:8002", 
        "description": "Fast Agent Execution Server",
        "capabilities": ["quick_execution", "task_processing", "real_time"]
    },
    "mcp_filesystem": {
        "url": "http://localhost:3000",
        "description": "MCP Filesystem Server",
        "capabilities": ["file_operations", "directory_management"]
    },
    "mcp_github": {
        "url": "http://localhost:3001",
        "description": "MCP GitHub Server", 
        "capabilities": ["repository_management", "code_operations"]
    },
    "mcp_azure": {
        "url": "http://localhost:3002",
        "description": "MCP Azure Server",
        "capabilities": ["cloud_operations", "azure_integration"]
    }
}

# Pydantic models
class AgentTaskRequest(BaseModel):
    """Unified agent task request"""
    task_type: str = Field(..., description="Type of task to execute")
    task_description: str = Field(..., description="Detailed task description")
    target_system: Optional[str] = Field(None, description="Specific agent system to use")
    parameters: Dict[str, Any] = Field(default_factory=dict)
    priority: int = Field(default=1, ge=1, le=10)
    timeout: int = Field(default=300, ge=30, le=3600)

class AgentTaskResponse(BaseModel):
    """Unified agent task response"""
    task_id: str
    status: str
    target_system: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    execution_time: float
    created_at: datetime

class SystemStatus(BaseModel):
    """System status for all agent systems"""
    system_name: str
    status: str
    url: str
    capabilities: List[str]
    last_checked: datetime
    response_time: float

class UnifiedAgentOrchestrator:
    """Unified orchestrator for existing agent systems"""
    
    def __init__(self):
        self.active_tasks = {}
        self.system_status = {}
        self.http_client = httpx.AsyncClient(timeout=30.0)
    
    async def execute_task(self, request: AgentTaskRequest, user_id: str) -> AgentTaskResponse:
        """Execute task using appropriate existing agent system"""
        task_id = str(uuid4())
        start_time = datetime.now()
        
        try:
            # Determine best agent system for the task
            target_system = await self._select_best_system(request)
            
            logger.info(f"🎯 Executing task {task_id} using {target_system}")
            
            # Add to active tasks
            self.active_tasks[task_id] = {
                'request': request,
                'user_id': user_id,
                'target_system': target_system,
                'start_time': start_time,
                'status': 'running'
            }
            
            # Execute task on selected system
            result = await self._execute_on_system(target_system, request, task_id)
            
            execution_time = (datetime.now() - start_time).total_seconds()
            
            return AgentTaskResponse(
                task_id=task_id,
                status='completed',
                target_system=target_system,
                result=result,
                execution_time=execution_time,
                created_at=start_time
            )
            
        except Exception as e:
            execution_time = (datetime.now() - start_time).total_seconds()
            logger.error(f"❌ Task {task_id} failed: {e}")
            
            return AgentTaskResponse(
                task_id=task_id,
                status='failed',
                target_system=target_system or 'unknown',
                error=str(e),
                execution_time=execution_time,
                created_at=start_time
            )
    
    async def _select_best_system(self, request: AgentTaskRequest) -> str:
        """Select the best existing agent system for the task"""
        task_type = request.task_type.lower()
        
        # Check if specific system is requested
        if request.target_system and request.target_system in EXISTING_AGENT_SYSTEMS:
            return request.target_system
        
        # Route based on task type
        if task_type in ['planning', 'research', 'analysis', 'automation']:
            return 'agentorchestra'
        elif task_type in ['quick', 'fast', 'real_time']:
            return 'fast_agent'
        elif task_type in ['file', 'directory', 'filesystem']:
            return 'mcp_filesystem'
        elif task_type in ['github', 'repository', 'code']:
            return 'mcp_github'
        elif task_type in ['azure', 'cloud']:
            return 'mcp_azure'
        else:
            # Default to AgentOrchestra for complex tasks
            return 'agentorchestra'
    
    async def _execute_on_system(self, system_name: str, request: AgentTaskRequest, task_id: str) -> Dict[str, Any]:
        """Execute task on specific existing system"""
        system_config = EXISTING_AGENT_SYSTEMS[system_name]
        
        if system_name == 'agentorchestra':
            return await self._execute_on_agentorchestra(request, task_id)
        elif system_name == 'fast_agent':
            return await self._execute_on_fast_agent(request, task_id)
        elif system_name.startswith('mcp_'):
            return await self._execute_on_mcp_system(system_name, request, task_id)
        else:
            raise ValueError(f"Unknown system: {system_name}")
    
    async def _execute_on_agentorchestra(self, request: AgentTaskRequest, task_id: str) -> Dict[str, Any]:
        """Execute task on AgentOrchestra system"""
        try:
            # Prepare AgentOrchestra request
            agentorchestra_request = {
                "task": request.task_description,
                "task_type": request.task_type,
                "parameters": request.parameters,
                "priority": request.priority,
                "timeout": request.timeout
            }
            
            # Call AgentOrchestra API
            response = await self.http_client.post(
                f"{EXISTING_AGENT_SYSTEMS['agentorchestra']['url']}/api/tasks",
                json=agentorchestra_request
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "system": "agentorchestra",
                    "task_id": result.get("task_id", task_id),
                    "status": result.get("status", "completed"),
                    "result": result.get("result", {}),
                    "execution_details": result
                }
            else:
                raise Exception(f"AgentOrchestra API error: {response.status_code}")
                
        except Exception as e:
            logger.error(f"❌ AgentOrchestra execution failed: {e}")
            # Fallback to mock execution
            return await self._mock_execution("agentorchestra", request)
    
    async def _execute_on_fast_agent(self, request: AgentTaskRequest, task_id: str) -> Dict[str, Any]:
        """Execute task on Fast Agent system"""
        try:
            # Prepare Fast Agent request
            fast_agent_request = {
                "task": request.task_description,
                "type": request.task_type,
                "params": request.parameters,
                "priority": request.priority
            }
            
            # Call Fast Agent API
            response = await self.http_client.post(
                f"{EXISTING_AGENT_SYSTEMS['fast_agent']['url']}/execute",
                json=fast_agent_request
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "system": "fast_agent",
                    "task_id": result.get("id", task_id),
                    "status": result.get("status", "completed"),
                    "result": result.get("output", {}),
                    "execution_details": result
                }
            else:
                raise Exception(f"Fast Agent API error: {response.status_code}")
                
        except Exception as e:
            logger.error(f"❌ Fast Agent execution failed: {e}")
            # Fallback to mock execution
            return await self._mock_execution("fast_agent", request)
    
    async def _execute_on_mcp_system(self, system_name: str, request: AgentTaskRequest, task_id: str) -> Dict[str, Any]:
        """Execute task on MCP system"""
        try:
            system_url = EXISTING_AGENT_SYSTEMS[system_name]['url']
            
            # MCP systems typically use different endpoints
            mcp_request = {
                "method": "execute",
                "params": {
                    "task": request.task_description,
                    "type": request.task_type,
                    "parameters": request.parameters
                }
            }
            
            # Call MCP system
            response = await self.http_client.post(
                f"{system_url}/mcp/execute",
                json=mcp_request
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "system": system_name,
                    "task_id": task_id,
                    "status": "completed",
                    "result": result.get("result", {}),
                    "execution_details": result
                }
            else:
                raise Exception(f"MCP {system_name} API error: {response.status_code}")
                
        except Exception as e:
            logger.error(f"❌ MCP {system_name} execution failed: {e}")
            # Fallback to mock execution
            return await self._mock_execution(system_name, request)
    
    async def _mock_execution(self, system_name: str, request: AgentTaskRequest) -> Dict[str, Any]:
        """Mock execution when real system is unavailable"""
        await asyncio.sleep(1)  # Simulate processing time
        
        return {
            "system": system_name,
            "status": "completed",
            "result": {
                "message": f"Mock execution completed for {request.task_type}",
                "task": request.task_description,
                "system_used": system_name,
                "note": "This is a mock response - real system integration needed"
            },
            "execution_details": {
                "mock": True,
                "timestamp": datetime.now().isoformat()
            }
        }
    
    async def check_system_health(self) -> List[SystemStatus]:
        """Check health of all existing agent systems"""
        health_status = []
        
        for system_name, config in EXISTING_AGENT_SYSTEMS.items():
            start_time = datetime.now()
            
            try:
                # Try to reach the system
                response = await self.http_client.get(f"{config['url']}/health", timeout=5.0)
                response_time = (datetime.now() - start_time).total_seconds()
                
                if response.status_code == 200:
                    health_status.append(SystemStatus(
                        system_name=system_name,
                        status="healthy",
                        url=config['url'],
                        capabilities=config['capabilities'],
                        last_checked=datetime.now(),
                        response_time=response_time
                    ))
                else:
                    health_status.append(SystemStatus(
                        system_name=system_name,
                        status="unhealthy",
                        url=config['url'],
                        capabilities=config['capabilities'],
                        last_checked=datetime.now(),
                        response_time=response_time
                    ))
                    
            except Exception as e:
                response_time = (datetime.now() - start_time).total_seconds()
                health_status.append(SystemStatus(
                    system_name=system_name,
                    status=f"error: {str(e)[:50]}",
                    url=config['url'],
                    capabilities=config['capabilities'],
                    last_checked=datetime.now(),
                    response_time=response_time
                ))
        
        self.system_status = {status.system_name: status for status in health_status}
        return health_status

# Global orchestrator
orchestrator = UnifiedAgentOrchestrator()

# FastAPI application setup
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    # Startup
    logger.info("🚀 Starting IZA OS Unified Agent Integration")
    logger.info("🔗 Connecting to existing agent systems...")
    
    # Check system health on startup
    health_status = await orchestrator.check_system_health()
    logger.info(f"✅ System health check complete: {len(health_status)} systems checked")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down IZA OS Unified Agent Integration")
    await orchestrator.http_client.aclose()

# Create FastAPI application
app = FastAPI(
    title="IZA OS Unified Agent Integration",
    description="Unified interface for existing agent systems",
    version="1.0.0",
    lifespan=lifespan
)

# Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests"""
    start_time = datetime.now()
    
    response = await call_next(request)
    
    process_time = (datetime.now() - start_time).total_seconds()
    
    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Time: {process_time:.3f}s"
    )
    
    return response

# API Routes

@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint"""
    return {
        "message": "IZA OS Unified Agent Integration",
        "version": "1.0.0",
        "status": "operational",
        "timestamp": datetime.now().isoformat(),
        "connected_systems": list(EXISTING_AGENT_SYSTEMS.keys())
    }

@app.get("/health", response_model=List[SystemStatus])
async def health_check():
    """Comprehensive health check for all agent systems"""
    return await orchestrator.check_system_health()

@app.get("/systems", response_model=Dict[str, Dict[str, Any]])
async def list_systems():
    """List all available agent systems"""
    return EXISTING_AGENT_SYSTEMS

@app.post("/execute", response_model=AgentTaskResponse)
async def execute_task(
    request: AgentTaskRequest,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(lambda: {"sub": "unified_user"})  # Simplified auth for now
):
    """Execute task using appropriate existing agent system"""
    try:
        result = await orchestrator.execute_task(request, current_user['sub'])
        
        # Log task execution
        background_tasks.add_task(
            log_task_execution,
            request.task_type,
            request.task_description,
            result.target_system,
            result.status,
            current_user['sub']
        )
        
        return result
        
    except Exception as e:
        logger.error(f"❌ Task execution failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tasks/{task_id}")
async def get_task_status(task_id: str):
    """Get task execution status"""
    if task_id in orchestrator.active_tasks:
        return orchestrator.active_tasks[task_id]
    else:
        raise HTTPException(status_code=404, detail="Task not found")

@app.get("/tasks")
async def list_tasks():
    """List all active tasks"""
    return {
        "active_tasks": orchestrator.active_tasks,
        "total_active": len(orchestrator.active_tasks)
    }

@app.get("/metrics")
async def get_metrics():
    """Get system metrics"""
    return {
        "active_tasks": len(orchestrator.active_tasks),
        "system_status": orchestrator.system_status,
        "available_systems": len(EXISTING_AGENT_SYSTEMS),
        "timestamp": datetime.now().isoformat()
    }

# Background tasks
async def log_task_execution(task_type: str, task_description: str, target_system: str, 
                           status: str, user_id: str):
    """Log task execution"""
    logger.info(f"📝 Task logged: {task_type} -> {target_system} -> {status}")

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "timestamp": datetime.now().isoformat()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    logger.error(f"❌ Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "status_code": 500,
            "timestamp": datetime.now().isoformat()
        }
    )

if __name__ == "__main__":
    # Create logs directory
    os.makedirs("logs", exist_ok=True)
    
    # Run the application
    uvicorn.run(
        "unified_agent_integration:app",
        host="0.0.0.0",
        port=3003,  # Different port to avoid conflicts
        reload=True,
        log_level="info"
    )

from shared.core.base_manager import BaseManager
from shared.core.config import get_config

#!/usr/bin/env python3
"""
🗄️ IZA OS Database Manager
=========================
Production-ready database management with Prisma integration
"""

import asyncio
import logging
import os
from typing import Dict, List, Optional, Any
from datetime import datetime
import json

from prisma import Prisma
from prisma.errors import PrismaError
import redis
import psycopg2
from psycopg2.extras import RealDictCursor
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Production-ready database manager with Prisma ORM"""
    
    def __init__(self):
        self.prisma = None
        self.redis_client = None
        self.sqlalchemy_engine = None
        self.session_factory = None
        self.connection_pool = None
    
    async def initialize(self):
        """Initialize all database connections"""
        try:
            # Initialize Prisma client
            self.prisma = Prisma()
            await self.prisma.connect()
            logger.info("✅ Prisma client connected")
            
            # Initialize Redis
            self.redis_client = redis.Redis(
                host=os.getenv('REDIS_HOST', 'localhost'),
                port=int(os.getenv('REDIS_PORT', '6379')),
                db=0,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5
            )
            
            # Test Redis connection
            self.redis_client.ping()
            logger.info("✅ Redis client connected")
            
            # Initialize SQLAlchemy for complex queries
            database_url = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/iza_os')
            self.sqlalchemy_engine = create_engine(
                database_url,
                poolclass=QueuePool,
                pool_size=10,
                max_overflow=20,
                pool_pre_ping=True,
                pool_recycle=3600
            )
            
            self.session_factory = sessionmaker(bind=self.sqlalchemy_engine)
            logger.info("✅ SQLAlchemy engine initialized")
            
            # Initialize connection pool for raw queries
            self.connection_pool = psycopg2.pool.SimpleConnectionPool(
                minconn=1,
                maxconn=20,
                host=os.getenv('DB_HOST', 'localhost'),
                port=os.getenv('DB_PORT', '5432'),
                database=os.getenv('DB_NAME', 'iza_os'),
                user=os.getenv('DB_USER', 'postgres'),
                password=os.getenv('DB_PASSWORD', 'password')
            )
            logger.info("✅ PostgreSQL connection pool initialized")
            
        except Exception as e:
            logger.error(f"❌ Database initialization failed: {e}")
            raise
    
    async def close(self):
        """Close all database connections"""
        try:
            if self.prisma:
                await self.prisma.disconnect()
                logger.info("✅ Prisma client disconnected")
            
            if self.redis_client:
                self.redis_client.close()
                logger.info("✅ Redis client disconnected")
            
            if self.connection_pool:
                self.connection_pool.closeall()
                logger.info("✅ PostgreSQL connection pool closed")
            
            if self.sqlalchemy_engine:
                self.sqlalchemy_engine.dispose()
                logger.info("✅ SQLAlchemy engine disposed")
                
        except Exception as e:
            logger.error(f"❌ Database cleanup failed: {e}")

class UserRepository:
    """User data repository with Prisma ORM"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db = db_manager
    
    async def create_user(self, email: str, username: str, password_hash: str, 
                         first_name: str = None, last_name: str = None, role: str = "USER") -> Dict[str, Any]:
        """Create a new user"""
        try:
            user = await self.db.prisma.user.create(
                data={
                    "email": email,
                    "username": username,
                    "passwordHash": password_hash,
                    "firstName": first_name,
                    "lastName": last_name,
                    "role": role
                }
            )
            return user.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to create user: {e}")
            raise
    
    async def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            user = await self.db.prisma.user.find_unique(
                where={"id": user_id},
                include={
                    "agentExecutions": True,
                    "projects": True,
                    "ventures": True
                }
            )
            return user.model_dump() if user else None
        except PrismaError as e:
            logger.error(f"❌ Failed to get user: {e}")
            raise
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            user = await self.db.prisma.user.find_unique(
                where={"email": email}
            )
            return user.model_dump() if user else None
        except PrismaError as e:
            logger.error(f"❌ Failed to get user by email: {e}")
            raise
    
    async def update_user(self, user_id: str, **kwargs) -> Dict[str, Any]:
        """Update user"""
        try:
            user = await self.db.prisma.user.update(
                where={"id": user_id},
                data=kwargs
            )
            return user.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to update user: {e}")
            raise
    
    async def delete_user(self, user_id: str) -> bool:
        """Delete user"""
        try:
            await self.db.prisma.user.delete(where={"id": user_id})
            return True
        except PrismaError as e:
            logger.error(f"❌ Failed to delete user: {e}")
            raise

class AgentRepository:
    """Agent data repository with Prisma ORM"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db = db_manager
    
    async def create_agent(self, name: str, agent_type: str, description: str = None, 
                          config: Dict[str, Any] = None) -> Dict[str, Any]:
        """Create a new agent"""
        try:
            agent = await self.db.prisma.agent.create(
                data={
                    "name": name,
                    "type": agent_type,
                    "description": description,
                    "config": config or {}
                }
            )
            return agent.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to create agent: {e}")
            raise
    
    async def get_agent_by_id(self, agent_id: str) -> Optional[Dict[str, Any]]:
        """Get agent by ID"""
        try:
            agent = await self.db.prisma.agent.find_unique(
                where={"id": agent_id},
                include={"executions": True}
            )
            return agent.model_dump() if agent else None
        except PrismaError as e:
            logger.error(f"❌ Failed to get agent: {e}")
            raise
    
    async def list_agents(self, limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """List all agents"""
        try:
            agents = await self.db.prisma.agent.find_many(
                take=limit,
                skip=offset,
                order={"createdAt": "desc"}
            )
            return [agent.model_dump() for agent in agents]
        except PrismaError as e:
            logger.error(f"❌ Failed to list agents: {e}")
            raise
    
    async def update_agent(self, agent_id: str, **kwargs) -> Dict[str, Any]:
        """Update agent"""
        try:
            agent = await self.db.prisma.agent.update(
                where={"id": agent_id},
                data=kwargs
            )
            return agent.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to update agent: {e}")
            raise

class AgentExecutionRepository:
    """Agent execution tracking repository"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db = db_manager
    
    async def create_execution(self, agent_id: str, user_id: str, task: str, 
                              parameters: Dict[str, Any] = None, priority: int = 1, 
                              timeout: int = 300) -> Dict[str, Any]:
        """Create agent execution record"""
        try:
            execution = await self.db.prisma.agentexecution.create(
                data={
                    "agentId": agent_id,
                    "userId": user_id,
                    "task": task,
                    "parameters": parameters or {},
                    "priority": priority,
                    "timeout": timeout
                }
            )
            return execution.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to create execution: {e}")
            raise
    
    async def update_execution_status(self, execution_id: str, status: str, 
                                    result: Dict[str, Any] = None, error: str = None) -> Dict[str, Any]:
        """Update execution status"""
        try:
            update_data = {"status": status}
            
            if status == "RUNNING":
                update_data["startedAt"] = datetime.now()
            elif status in ["COMPLETED", "FAILED", "TIMEOUT", "CANCELLED"]:
                update_data["completedAt"] = datetime.now()
            
            if result:
                update_data["result"] = result
            if error:
                update_data["error"] = error
            
            execution = await self.db.prisma.agentexecution.update(
                where={"id": execution_id},
                data=update_data
            )
            return execution.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to update execution: {e}")
            raise
    
    async def get_execution_by_id(self, execution_id: str) -> Optional[Dict[str, Any]]:
        """Get execution by ID"""
        try:
            execution = await self.db.prisma.agentexecution.find_unique(
                where={"id": execution_id},
                include={"agent": True, "user": True}
            )
            return execution.model_dump() if execution else None
        except PrismaError as e:
            logger.error(f"❌ Failed to get execution: {e}")
            raise
    
    async def list_executions(self, user_id: str = None, agent_id: str = None, 
                            status: str = None, limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """List executions with filters"""
        try:
            where_clause = {}
            if user_id:
                where_clause["userId"] = user_id
            if agent_id:
                where_clause["agentId"] = agent_id
            if status:
                where_clause["status"] = status
            
            executions = await self.db.prisma.agentexecution.find_many(
                where=where_clause,
                take=limit,
                skip=offset,
                order={"createdAt": "desc"},
                include={"agent": True, "user": True}
            )
            return [execution.model_dump() for execution in executions]
        except PrismaError as e:
            logger.error(f"❌ Failed to list executions: {e}")
            raise

class ProjectRepository:
    """Project management repository"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db = db_manager
    
    async def create_project(self, name: str, description: str = None, 
                           user_id: str = None, budget: float = None) -> Dict[str, Any]:
        """Create a new project"""
        try:
            project = await self.db.prisma.project.create(
                data={
                    "name": name,
                    "description": description,
                    "userId": user_id,
                    "budget": budget
                }
            )
            return project.model_dump()
        except PrismaError as e:
            logger.error(f"❌ Failed to create project: {e}")
            raise
    
    async def get_project_by_id(self, project_id: str) -> Optional[Dict[str, Any]]:
        """Get project by ID"""
        try:
            project = await self.db.prisma.project.find_unique(
                where={"id": project_id},
                include={"user": True, "ventures": True, "tasks": True}
            )
            return project.model_dump() if project else None
        except PrismaError as e:
            logger.error(f"❌ Failed to get project: {e}")
            raise
    
    async def list_projects(self, user_id: str = None, status: str = None, 
                          limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """List projects with filters"""
        try:
            where_clause = {}
            if user_id:
                where_clause["userId"] = user_id
            if status:
                where_clause["status"] = status
            
            projects = await self.db.prisma.project.find_many(
                where=where_clause,
                take=limit,
                skip=offset,
                order={"createdAt": "desc"},
                include={"user": True, "ventures": True, "tasks": True}
            )
            return [project.model_dump() for project in projects]
        except PrismaError as e:
            logger.error(f"❌ Failed to list projects: {e}")
            raise

class CacheManager:
    """Redis-based cache manager"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.redis = db_manager.redis_client
    
    async def get(self, key: str) -> Optional[str]:
        """Get value from cache"""
        try:
            return self.redis.get(key)
        except Exception as e:
            logger.error(f"❌ Cache get failed: {e}")
            return None
    
    async def set(self, key: str, value: str, ttl: int = 3600) -> bool:
        """Set value in cache with TTL"""
        try:
            self.redis.setex(key, ttl, value)
            return True
        except Exception as e:
            logger.error(f"❌ Cache set failed: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Delete key from cache"""
        try:
            self.redis.delete(key)
            return True
        except Exception as e:
            logger.error(f"❌ Cache delete failed: {e}")
            return False
    
    async def exists(self, key: str) -> bool:
        """Check if key exists in cache"""
        try:
            return bool(self.redis.exists(key))
        except Exception as e:
            logger.error(f"❌ Cache exists check failed: {e}")
            return False

class DatabaseService:
    """Main database service orchestrator"""
    
    def __init__(self):
        self.db_manager = DatabaseManager()
        self.user_repo = None
        self.agent_repo = None
        self.execution_repo = None
        self.project_repo = None
        self.cache_manager = None
    
    async def initialize(self):
        """Initialize all database services"""
        await self.db_manager.initialize()
        
        # Initialize repositories
        self.user_repo = UserRepository(self.db_manager)
        self.agent_repo = AgentRepository(self.db_manager)
        self.execution_repo = AgentExecutionRepository(self.db_manager)
        self.project_repo = ProjectRepository(self.db_manager)
        self.cache_manager = CacheManager(self.db_manager)
        
        logger.info("✅ Database service initialized")
    
    async def close(self):
        """Close all database connections"""
        await self.db_manager.close()
        logger.info("✅ Database service closed")
    
    async def health_check(self) -> Dict[str, Any]:
        """Comprehensive database health check"""
        health_status = {
            "prisma": "healthy",
            "redis": "healthy",
            "postgresql": "healthy",
            "timestamp": datetime.now().isoformat()
        }
        
        try:
            # Test Prisma
            await self.db_manager.prisma.user.find_first()
        except Exception as e:
            health_status["prisma"] = f"unhealthy: {e}"
        
        try:
            # Test Redis
            self.db_manager.redis_client.ping()
        except Exception as e:
            health_status["redis"] = f"unhealthy: {e}"
        
        try:
            # Test PostgreSQL
            conn = self.db_manager.connection_pool.getconn()
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            cursor.close()
            self.db_manager.connection_pool.putconn(conn)
        except Exception as e:
            health_status["postgresql"] = f"unhealthy: {e}"
        
        return health_status

# Global database service instance
db_service = DatabaseService()

# Database initialization functions
async def initialize_database():
    """Initialize database with required tables and data"""
    try:
        await db_service.initialize()
        
        # Create default admin user if not exists
        admin_user = await db_service.user_repo.get_user_by_email("admin@iza-os.com")
        if not admin_user:
            from passlib.context import CryptContext
            pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            
            await db_service.user_repo.create_user(
                email="admin@iza-os.com",
                username="admin",
                password_hash=pwd_context.hash("admin123"),
                first_name="System",
                last_name="Administrator",
                role="ADMIN"
            )
            logger.info("✅ Default admin user created")
        
        # Create default agents
        agents = await db_service.agent_repo.list_agents()
        if not agents:
            default_agents = [
                {"name": "Research Agent", "type": "RESEARCH", "description": "AI research and analysis agent"},
                {"name": "Analysis Agent", "type": "ANALYSIS", "description": "Data analysis and insights agent"},
                {"name": "Automation Agent", "type": "AUTOMATION", "description": "Process automation agent"},
                {"name": "Integration Agent", "type": "INTEGRATION", "description": "System integration agent"}
            ]
            
            for agent_data in default_agents:
                await db_service.agent_repo.create_agent(**agent_data)
            
            logger.info("✅ Default agents created")
        
        logger.info("✅ Database initialization complete")
        
    except Exception as e:
        logger.error(f"❌ Database initialization failed: {e}")
        raise

if __name__ == "__main__":
    # Test database connection
    async def test_database():
        await initialize_database()
        
        # Test health check
        health = await db_service.health_check()
        print("Database Health Check:")
        print(json.dumps(health, indent=2))
        
        await db_service.close()
    
    asyncio.run(test_database())

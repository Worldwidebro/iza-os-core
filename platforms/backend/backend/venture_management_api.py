#!/usr/bin/env python3
"""
🚀 IZA OS VENTURE MANAGEMENT API
===============================
Complete venture portfolio management with full-stack integration
Implements the complete user flow: Backend API → MCP wrapper → Frontend UI
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Import shared library components
from shared.core.base_manager import BaseManager, DatabaseManager
from shared.core.security import SecurityManager, get_current_user, User
from shared.core.config import get_config, get_service_config

logger = logging.getLogger(__name__)

# Pydantic models for API
class VentureCreateRequest(BaseModel):
    """Venture creation request"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    industry: Optional[str] = Field(None, max_length=100)
    stage: str = Field("IDEA", regex="^(IDEA|MVP|GROWTH|SCALE|EXIT)$")
    initial_funding: Optional[float] = Field(None, ge=0)
    team_size: Optional[int] = Field(None, ge=1)
    founders: List[str] = Field(default_factory=list)
    
    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Venture name cannot be empty')
        return v.strip()

class VentureUpdateRequest(BaseModel):
    """Venture update request"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    industry: Optional[str] = Field(None, max_length=100)
    stage: Optional[str] = Field(None, regex="^(IDEA|MVP|GROWTH|SCALE|EXIT)$")
    valuation: Optional[float] = Field(None, ge=0)
    funding: Optional[float] = Field(None, ge=0)
    team_size: Optional[int] = Field(None, ge=1)
    founders: Optional[List[str]] = None

class VentureResponse(BaseModel):
    """Venture response model"""
    id: str
    name: str
    description: Optional[str]
    industry: Optional[str]
    stage: str
    status: str
    valuation: Optional[float]
    funding: Optional[float]
    team_size: Optional[int]
    founders: List[str]
    created_at: datetime
    updated_at: datetime
    metrics: Dict[str, Any] = Field(default_factory=dict)

class VentureListResponse(BaseModel):
    """Venture list response"""
    ventures: List[VentureResponse]
    total: int
    page: int
    limit: int
    has_next: bool
    has_prev: bool

class VentureAnalyticsResponse(BaseModel):
    """Venture analytics response"""
    total_ventures: int
    total_valuation: float
    total_funding: float
    stage_distribution: Dict[str, int]
    industry_distribution: Dict[str, int]
    growth_metrics: Dict[str, Any]
    top_performers: List[Dict[str, Any]]

class VentureManager(BaseManager):
    """Venture portfolio management"""
    
    def __init__(self):
        super().__init__("venture_manager", get_config().to_dict())
        self.db_manager = DatabaseManager()
    
    async def initialize(self) -> bool:
        """Initialize venture manager"""
        try:
            await super().initialize()
            await self.db_manager.initialize()
            
            # Initialize database tables
            await self._init_database_tables()
            
            self.logger.info("✅ Venture manager initialized")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Venture manager initialization failed: {e}")
            return False
    
    async def shutdown(self) -> bool:
        """Shutdown venture manager"""
        try:
            await self.db_manager.shutdown()
            await super().shutdown()
            
            self.logger.info("✅ Venture manager shutdown")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Venture manager shutdown failed: {e}")
            return False
    
    async def _init_database_tables(self):
        """Initialize venture-related database tables"""
        try:
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            # Create ventures table if not exists
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ventures (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    industry VARCHAR(100),
                    stage VARCHAR(20) DEFAULT 'IDEA',
                    status VARCHAR(20) DEFAULT 'ACTIVE',
                    valuation DECIMAL(15,2),
                    funding DECIMAL(15,2),
                    team_size INTEGER,
                    founders TEXT[], -- PostgreSQL array
                    metrics JSONB DEFAULT '{}',
                    user_id UUID NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create indexes
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ventures_user_id ON ventures(user_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ventures_stage ON ventures(stage)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ventures_industry ON ventures(industry)")
            
            conn.commit()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            self.logger.info("✅ Venture database tables initialized")
            
        except Exception as e:
            self.logger.error(f"❌ Database initialization failed: {e}")
            raise
    
    async def create_venture(self, venture_data: VentureCreateRequest, user_id: str) -> VentureResponse:
        """Create a new venture"""
        try:
            venture_id = str(uuid4())
            
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("""
                INSERT INTO ventures (
                    id, name, description, industry, stage, status,
                    valuation, funding, team_size, founders, user_id
                ) VALUES (
                    %s, %s, %s, %s, %s, 'ACTIVE',
                    %s, %s, %s, %s, %s
                )
            """, (
                venture_id,
                venture_data.name,
                venture_data.description,
                venture_data.industry,
                venture_data.stage,
                venture_data.initial_funding,
                venture_data.initial_funding,
                venture_data.team_size,
                venture_data.founders,
                user_id
            ))
            
            conn.commit()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            # Get created venture
            venture = await self.get_venture_by_id(venture_id, user_id)
            
            # Log metric
            await self.log_metric("ventures_created", 1)
            
            self.logger.info(f"✅ Venture created: {venture_id}")
            return venture
            
        except Exception as e:
            self.logger.error(f"❌ Failed to create venture: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_venture_by_id(self, venture_id: str, user_id: str) -> VentureResponse:
        """Get venture by ID"""
        try:
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, name, description, industry, stage, status,
                       valuation, funding, team_size, founders, metrics,
                       created_at, updated_at
                FROM ventures
                WHERE id = %s AND user_id = %s
            """, (venture_id, user_id))
            
            row = cursor.fetchone()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            if not row:
                raise HTTPException(status_code=404, detail="Venture not found")
            
            return VentureResponse(
                id=str(row[0]),
                name=row[1],
                description=row[2],
                industry=row[3],
                stage=row[4],
                status=row[5],
                valuation=float(row[6]) if row[6] else None,
                funding=float(row[7]) if row[7] else None,
                team_size=row[8],
                founders=row[9] or [],
                metrics=row[10] or {},
                created_at=row[11],
                updated_at=row[12]
            )
            
        except HTTPException:
            raise
        except Exception as e:
            self.logger.error(f"❌ Failed to get venture: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def list_ventures(self, user_id: str, page: int = 1, limit: int = 20, 
                          stage: Optional[str] = None, industry: Optional[str] = None) -> VentureListResponse:
        """List ventures with pagination and filters"""
        try:
            offset = (page - 1) * limit
            
            # Build query
            where_conditions = ["user_id = %s"]
            params = [user_id]
            
            if stage:
                where_conditions.append("stage = %s")
                params.append(stage)
            
            if industry:
                where_conditions.append("industry = %s")
                params.append(industry)
            
            where_clause = " AND ".join(where_conditions)
            
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            # Get total count
            cursor.execute(f"SELECT COUNT(*) FROM ventures WHERE {where_clause}", params)
            total = cursor.fetchone()[0]
            
            # Get ventures
            cursor.execute(f"""
                SELECT id, name, description, industry, stage, status,
                       valuation, funding, team_size, founders, metrics,
                       created_at, updated_at
                FROM ventures
                WHERE {where_clause}
                ORDER BY created_at DESC
                LIMIT %s OFFSET %s
            """, params + [limit, offset])
            
            rows = cursor.fetchall()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            ventures = []
            for row in rows:
                ventures.append(VentureResponse(
                    id=str(row[0]),
                    name=row[1],
                    description=row[2],
                    industry=row[3],
                    stage=row[4],
                    status=row[5],
                    valuation=float(row[6]) if row[6] else None,
                    funding=float(row[7]) if row[7] else None,
                    team_size=row[8],
                    founders=row[9] or [],
                    metrics=row[10] or {},
                    created_at=row[11],
                    updated_at=row[12]
                ))
            
            return VentureListResponse(
                ventures=ventures,
                total=total,
                page=page,
                limit=limit,
                has_next=offset + limit < total,
                has_prev=page > 1
            )
            
        except Exception as e:
            self.logger.error(f"❌ Failed to list ventures: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def update_venture(self, venture_id: str, venture_data: VentureUpdateRequest, user_id: str) -> VentureResponse:
        """Update venture"""
        try:
            # Build update query
            update_fields = []
            params = []
            
            if venture_data.name is not None:
                update_fields.append("name = %s")
                params.append(venture_data.name)
            
            if venture_data.description is not None:
                update_fields.append("description = %s")
                params.append(venture_data.description)
            
            if venture_data.industry is not None:
                update_fields.append("industry = %s")
                params.append(venture_data.industry)
            
            if venture_data.stage is not None:
                update_fields.append("stage = %s")
                params.append(venture_data.stage)
            
            if venture_data.valuation is not None:
                update_fields.append("valuation = %s")
                params.append(venture_data.valuation)
            
            if venture_data.funding is not None:
                update_fields.append("funding = %s")
                params.append(venture_data.funding)
            
            if venture_data.team_size is not None:
                update_fields.append("team_size = %s")
                params.append(venture_data.team_size)
            
            if venture_data.founders is not None:
                update_fields.append("founders = %s")
                params.append(venture_data.founders)
            
            if not update_fields:
                raise HTTPException(status_code=400, detail="No fields to update")
            
            update_fields.append("updated_at = CURRENT_TIMESTAMP")
            params.extend([venture_id, user_id])
            
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute(f"""
                UPDATE ventures
                SET {', '.join(update_fields)}
                WHERE id = %s AND user_id = %s
            """, params)
            
            if cursor.rowcount == 0:
                cursor.close()
                await self.db_manager.return_db_connection(conn)
                raise HTTPException(status_code=404, detail="Venture not found")
            
            conn.commit()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            # Get updated venture
            venture = await self.get_venture_by_id(venture_id, user_id)
            
            # Log metric
            await self.log_metric("ventures_updated", 1)
            
            self.logger.info(f"✅ Venture updated: {venture_id}")
            return venture
            
        except HTTPException:
            raise
        except Exception as e:
            self.logger.error(f"❌ Failed to update venture: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def delete_venture(self, venture_id: str, user_id: str) -> bool:
        """Delete venture"""
        try:
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("""
                DELETE FROM ventures
                WHERE id = %s AND user_id = %s
            """, (venture_id, user_id))
            
            if cursor.rowcount == 0:
                cursor.close()
                await self.db_manager.return_db_connection(conn)
                raise HTTPException(status_code=404, detail="Venture not found")
            
            conn.commit()
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            # Log metric
            await self.log_metric("ventures_deleted", 1)
            
            self.logger.info(f"✅ Venture deleted: {venture_id}")
            return True
            
        except HTTPException:
            raise
        except Exception as e:
            self.logger.error(f"❌ Failed to delete venture: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_venture_analytics(self, user_id: str) -> VentureAnalyticsResponse:
        """Get venture portfolio analytics"""
        try:
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            
            # Get basic stats
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_ventures,
                    COALESCE(SUM(valuation), 0) as total_valuation,
                    COALESCE(SUM(funding), 0) as total_funding,
                    AVG(valuation) as avg_valuation,
                    AVG(funding) as avg_funding
                FROM ventures
                WHERE user_id = %s AND status = 'ACTIVE'
            """, (user_id,))
            
            basic_stats = cursor.fetchone()
            
            # Get stage distribution
            cursor.execute("""
                SELECT stage, COUNT(*) as count
                FROM ventures
                WHERE user_id = %s AND status = 'ACTIVE'
                GROUP BY stage
            """, (user_id,))
            
            stage_dist = {row[0]: row[1] for row in cursor.fetchall()}
            
            # Get industry distribution
            cursor.execute("""
                SELECT industry, COUNT(*) as count
                FROM ventures
                WHERE user_id = %s AND status = 'ACTIVE'
                GROUP BY industry
            """, (user_id,))
            
            industry_dist = {row[0]: row[1] for row in cursor.fetchall()}
            
            # Get top performers
            cursor.execute("""
                SELECT name, valuation, funding, stage
                FROM ventures
                WHERE user_id = %s AND status = 'ACTIVE'
                ORDER BY valuation DESC NULLS LAST, funding DESC NULLS LAST
                LIMIT 5
            """, (user_id,))
            
            top_performers = []
            for row in cursor.fetchall():
                top_performers.append({
                    'name': row[0],
                    'valuation': float(row[1]) if row[1] else 0,
                    'funding': float(row[2]) if row[2] else 0,
                    'stage': row[3]
                })
            
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            return VentureAnalyticsResponse(
                total_ventures=basic_stats[0],
                total_valuation=float(basic_stats[1]),
                total_funding=float(basic_stats[2]),
                stage_distribution=stage_dist,
                industry_distribution=industry_dist,
                growth_metrics={
                    'avg_valuation': float(basic_stats[3]) if basic_stats[3] else 0,
                    'avg_funding': float(basic_stats[4]) if basic_stats[4] else 0,
                    'portfolio_diversity': len(industry_dist),
                    'stage_progression': self._calculate_stage_progression(stage_dist)
                },
                top_performers=top_performers
            )
            
        except Exception as e:
            self.logger.error(f"❌ Failed to get analytics: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    def _calculate_stage_progression(self, stage_dist: Dict[str, int]) -> Dict[str, float]:
        """Calculate stage progression metrics"""
        total = sum(stage_dist.values())
        if total == 0:
            return {}
        
        progression = {}
        for stage, count in stage_dist.items():
            progression[stage] = (count / total) * 100
        
        return progression
    
    async def _check_service_health(self) -> Dict[str, Any]:
        """Check venture service health"""
        try:
            # Test database connection
            conn = await self.db_manager.get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM ventures")
            cursor.close()
            await self.db_manager.return_db_connection(conn)
            
            return {'status': 'healthy', 'message': 'Venture service operational'}
            
        except Exception as e:
            return {'status': 'unhealthy', 'message': f'Database error: {e}'}

# FastAPI application
app = FastAPI(
    title="IZA OS Venture Management API",
    description="Complete venture portfolio management with full-stack integration",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global venture manager
venture_manager = VentureManager()

@app.on_event("startup")
async def startup_event():
    """Startup event"""
    await venture_manager.initialize()

@app.on_event("shutdown")
async def shutdown_event():
    """Shutdown event"""
    await venture_manager.shutdown()

# API Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    health = await venture_manager.get_health_status()
    return health

@app.post("/ventures", response_model=VentureResponse)
async def create_venture(
    venture_data: VentureCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Create a new venture"""
    return await venture_manager.create_venture(venture_data, current_user.id)

@app.get("/ventures", response_model=VentureListResponse)
async def list_ventures(
    page: int = 1,
    limit: int = 20,
    stage: Optional[str] = None,
    industry: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """List ventures with pagination and filters"""
    return await venture_manager.list_ventures(
        current_user.id, page, limit, stage, industry
    )

@app.get("/ventures/{venture_id}", response_model=VentureResponse)
async def get_venture(
    venture_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get venture by ID"""
    return await venture_manager.get_venture_by_id(venture_id, current_user.id)

@app.put("/ventures/{venture_id}", response_model=VentureResponse)
async def update_venture(
    venture_id: str,
    venture_data: VentureUpdateRequest,
    current_user: User = Depends(get_current_user)
):
    """Update venture"""
    return await venture_manager.update_venture(venture_id, venture_data, current_user.id)

@app.delete("/ventures/{venture_id}")
async def delete_venture(
    venture_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete venture"""
    await venture_manager.delete_venture(venture_id, current_user.id)
    return {"message": "Venture deleted successfully"}

@app.get("/ventures/analytics/overview", response_model=VentureAnalyticsResponse)
async def get_venture_analytics(
    current_user: User = Depends(get_current_user)
):
    """Get venture portfolio analytics"""
    return await venture_manager.get_venture_analytics(current_user.id)

@app.get("/metrics")
async def get_metrics():
    """Get service metrics"""
    return await venture_manager.get_metrics()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)

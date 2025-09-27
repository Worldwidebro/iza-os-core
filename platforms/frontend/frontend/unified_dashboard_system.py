#!/usr/bin/env python3
"""
🎨 IZA OS UNIFIED DASHBOARD SYSTEM
==================================
Modern React/TypeScript dashboard with real-time updates and comprehensive ecosystem management
Implements micro-frontend architecture with shared component library
"""

import asyncio
import logging
import os
import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union, Tuple
from dataclasses import dataclass, asdict
import yaml
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import uvicorn

logger = logging.getLogger(__name__)

@dataclass
class DashboardWidget:
    """Dashboard widget configuration"""
    widget_id: str
    name: str
    type: str  # chart, table, metric, alert
    position: Dict[str, int]  # x, y, width, height
    config: Dict[str, Any]
    data_source: str
    refresh_interval: int  # seconds
    last_updated: Optional[datetime]

@dataclass
class DashboardLayout:
    """Dashboard layout configuration"""
    layout_id: str
    name: str
    description: str
    widgets: List[DashboardWidget]
    theme: str  # light, dark, auto
    created_at: datetime
    updated_at: datetime

@dataclass
class RealTimeEvent:
    """Real-time event data"""
    event_id: str
    event_type: str
    data: Dict[str, Any]
    timestamp: datetime
    source: str

class ComponentLibrary:
    """Shared component library management"""
    
    def __init__(self):
        self.components = {
            'charts': {
                'line_chart': {
                    'name': 'Line Chart',
                    'description': 'Time series line chart component',
                    'props': ['data', 'xAxis', 'yAxis', 'colors'],
                    'example': self._get_line_chart_example()
                },
                'bar_chart': {
                    'name': 'Bar Chart',
                    'description': 'Categorical bar chart component',
                    'props': ['data', 'categories', 'values'],
                    'example': self._get_bar_chart_example()
                },
                'pie_chart': {
                    'name': 'Pie Chart',
                    'description': 'Proportional pie chart component',
                    'props': ['data', 'colors'],
                    'example': self._get_pie_chart_example()
                }
            },
            'tables': {
                'data_table': {
                    'name': 'Data Table',
                    'description': 'Sortable and filterable data table',
                    'props': ['columns', 'data', 'pagination', 'sorting'],
                    'example': self._get_data_table_example()
                },
                'metric_table': {
                    'name': 'Metric Table',
                    'description': 'Key-value metric display table',
                    'props': ['metrics', 'format'],
                    'example': self._get_metric_table_example()
                }
            },
            'metrics': {
                'kpi_card': {
                    'name': 'KPI Card',
                    'description': 'Key performance indicator card',
                    'props': ['title', 'value', 'change', 'trend'],
                    'example': self._get_kpi_card_example()
                },
                'gauge_chart': {
                    'name': 'Gauge Chart',
                    'description': 'Circular gauge for single metrics',
                    'props': ['value', 'max', 'thresholds'],
                    'example': self._get_gauge_chart_example()
                }
            },
            'alerts': {
                'alert_banner': {
                    'name': 'Alert Banner',
                    'description': 'System alert notification banner',
                    'props': ['severity', 'message', 'dismissible'],
                    'example': self._get_alert_banner_example()
                },
                'status_indicator': {
                    'name': 'Status Indicator',
                    'description': 'Service status indicator',
                    'props': ['status', 'service', 'last_check'],
                    'example': self._get_status_indicator_example()
                }
            }
        }
    
    def _get_line_chart_example(self) -> str:
        """Get line chart component example"""
        return '''
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
  data: Array<{name: string, value: number}>;
  xAxis: string;
  yAxis: string;
  colors: string[];
}

export const LineChartComponent: React.FC<LineChartProps> = ({ data, xAxis, yAxis, colors }) => {
  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={yAxis} stroke={colors[0]} strokeWidth={2} />
    </LineChart>
  );
};
'''
    
    def _get_bar_chart_example(self) -> str:
        """Get bar chart component example"""
        return '''
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BarChartProps {
  data: Array<{name: string, value: number}>;
  categories: string[];
  values: string[];
}

export const BarChartComponent: React.FC<BarChartProps> = ({ data, categories, values }) => {
  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {values.map((value, index) => (
        <Bar key={value} dataKey={value} fill={`hsl(${index * 60}, 70%, 50%)`} />
      ))}
    </BarChart>
  );
};
'''
    
    def _get_kpi_card_example(self) -> str:
        """Get KPI card component example"""
        return '''
import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change !== undefined && (
        <p className={`text-sm ${getTrendColor()}`}>
          {change > 0 ? '+' : ''}{change}%
        </p>
      )}
    </div>
  );
};
'''
    
    def get_component(self, category: str, component_name: str) -> Optional[Dict[str, Any]]:
        """Get component definition"""
        return self.components.get(category, {}).get(component_name)
    
    def get_all_components(self) -> Dict[str, Any]:
        """Get all available components"""
        return self.components

class RealTimeDataManager:
    """Real-time data management with WebSocket support"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.data_cache = {}
        self.event_queue = asyncio.Queue()
        
    async def connect(self, websocket: WebSocket):
        """Connect WebSocket client"""
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"✅ WebSocket connected: {len(self.active_connections)} active connections")
    
    async def disconnect(self, websocket: WebSocket):
        """Disconnect WebSocket client"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        logger.info(f"✅ WebSocket disconnected: {len(self.active_connections)} active connections")
    
    async def broadcast_event(self, event: RealTimeEvent):
        """Broadcast event to all connected clients"""
        message = {
            'event_id': event.event_id,
            'event_type': event.event_type,
            'data': event.data,
            'timestamp': event.timestamp.isoformat(),
            'source': event.source
        }
        
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                disconnected.append(connection)
        
        # Remove disconnected clients
        for connection in disconnected:
            if connection in self.active_connections:
                self.active_connections.remove(connection)
        
        logger.info(f"📡 Event broadcasted: {event.event_type} to {len(self.active_connections)} clients")
    
    async def get_cached_data(self, data_source: str) -> Optional[Dict[str, Any]]:
        """Get cached data for data source"""
        return self.data_cache.get(data_source)
    
    async def update_cached_data(self, data_source: str, data: Dict[str, Any]):
        """Update cached data"""
        self.data_cache[data_source] = {
            'data': data,
            'timestamp': datetime.now(),
            'source': data_source
        }
        
        # Broadcast data update
        event = RealTimeEvent(
            event_id=f"data_update_{int(time.time())}",
            event_type='data_update',
            data={'source': data_source, 'data': data},
            timestamp=datetime.now(),
            source='data_manager'
        )
        
        await self.broadcast_event(event)

class DashboardManager:
    """Dashboard management and configuration"""
    
    def __init__(self, component_library: ComponentLibrary, data_manager: RealTimeDataManager):
        self.component_library = component_library
        self.data_manager = data_manager
        self.dashboards = {}
        self.default_dashboard = self._create_default_dashboard()
        
    def _create_default_dashboard(self) -> DashboardLayout:
        """Create default dashboard layout"""
        widgets = [
            DashboardWidget(
                widget_id='ecosystem_overview',
                name='Ecosystem Overview',
                type='kpi_card',
                position={'x': 0, 'y': 0, 'width': 3, 'height': 2},
                config={
                    'title': 'Ecosystem Health',
                    'value': '99.9%',
                    'trend': 'stable',
                    'color': 'green'
                },
                data_source='ecosystem_health',
                refresh_interval=30,
                last_updated=None
            ),
            DashboardWidget(
                widget_id='revenue_metrics',
                name='Revenue Metrics',
                type='line_chart',
                position={'x': 3, 'y': 0, 'width': 6, 'height': 4},
                config={
                    'xAxis': 'date',
                    'yAxis': 'revenue',
                    'colors': ['#3B82F6', '#10B981']
                },
                data_source='revenue_data',
                refresh_interval=60,
                last_updated=None
            ),
            DashboardWidget(
                widget_id='service_status',
                name='Service Status',
                type='table',
                position={'x': 9, 'y': 0, 'width': 3, 'height': 4},
                config={
                    'columns': ['service', 'status', 'uptime', 'response_time'],
                    'sortable': True
                },
                data_source='service_status',
                refresh_interval=15,
                last_updated=None
            ),
            DashboardWidget(
                widget_id='ai_agents',
                name='AI Agents',
                type='gauge_chart',
                position={'x': 0, 'y': 2, 'width': 3, 'height': 2},
                config={
                    'value': 85,
                    'max': 100,
                    'thresholds': [70, 90]
                },
                data_source='ai_agents_performance',
                refresh_interval=30,
                last_updated=None
            ),
            DashboardWidget(
                widget_id='portfolio_performance',
                name='Portfolio Performance',
                type='pie_chart',
                position={'x': 3, 'y': 4, 'width': 6, 'height': 3},
                config={
                    'colors': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
                },
                data_source='portfolio_breakdown',
                refresh_interval=120,
                last_updated=None
            )
        ]
        
        return DashboardLayout(
            layout_id='default_dashboard',
            name='IZA OS Executive Dashboard',
            description='Comprehensive overview of the autonomous venture studio ecosystem',
            widgets=widgets,
            theme='auto',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    
    async def get_dashboard(self, dashboard_id: str = 'default') -> DashboardLayout:
        """Get dashboard configuration"""
        if dashboard_id == 'default':
            return self.default_dashboard
        
        if dashboard_id in self.dashboards:
            return self.dashboards[dashboard_id]
        
        raise HTTPException(status_code=404, detail="Dashboard not found")
    
    async def create_dashboard(self, layout_config: Dict[str, Any]) -> DashboardLayout:
        """Create new dashboard"""
        try:
            dashboard = DashboardLayout(
                layout_id=layout_config['layout_id'],
                name=layout_config['name'],
                description=layout_config.get('description', ''),
                widgets=[],
                theme=layout_config.get('theme', 'auto'),
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            
            # Add widgets
            for widget_config in layout_config.get('widgets', []):
                widget = DashboardWidget(
                    widget_id=widget_config['widget_id'],
                    name=widget_config['name'],
                    type=widget_config['type'],
                    position=widget_config['position'],
                    config=widget_config.get('config', {}),
                    data_source=widget_config['data_source'],
                    refresh_interval=widget_config.get('refresh_interval', 60),
                    last_updated=None
                )
                dashboard.widgets.append(widget)
            
            self.dashboards[dashboard.layout_id] = dashboard
            
            logger.info(f"✅ Dashboard created: {dashboard.name}")
            return dashboard
            
        except Exception as e:
            logger.error(f"❌ Dashboard creation failed: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def update_dashboard(self, dashboard_id: str, updates: Dict[str, Any]) -> DashboardLayout:
        """Update dashboard configuration"""
        try:
            if dashboard_id == 'default':
                dashboard = self.default_dashboard
            elif dashboard_id in self.dashboards:
                dashboard = self.dashboards[dashboard_id]
            else:
                raise HTTPException(status_code=404, detail="Dashboard not found")
            
            # Update dashboard properties
            if 'name' in updates:
                dashboard.name = updates['name']
            if 'description' in updates:
                dashboard.description = updates['description']
            if 'theme' in updates:
                dashboard.theme = updates['theme']
            
            dashboard.updated_at = datetime.now()
            
            logger.info(f"✅ Dashboard updated: {dashboard.name}")
            return dashboard
            
        except Exception as e:
            logger.error(f"❌ Dashboard update failed: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_widget_data(self, widget: DashboardWidget) -> Dict[str, Any]:
        """Get data for dashboard widget"""
        try:
            # Get cached data
            cached_data = await self.data_manager.get_cached_data(widget.data_source)
            
            if cached_data and (datetime.now() - cached_data['timestamp']).seconds < widget.refresh_interval:
                return cached_data['data']
            
            # Generate mock data based on data source
            mock_data = self._generate_mock_data(widget.data_source, widget.type)
            
            # Update cache
            await self.data_manager.update_cached_data(widget.data_source, mock_data)
            
            return mock_data
            
        except Exception as e:
            logger.error(f"❌ Widget data retrieval failed: {e}")
            return {'error': str(e)}
    
    def _generate_mock_data(self, data_source: str, widget_type: str) -> Dict[str, Any]:
        """Generate mock data for widgets"""
        if data_source == 'ecosystem_health':
            return {
                'value': 99.9,
                'status': 'healthy',
                'services': 6,
                'uptime': '99.9%',
                'last_check': datetime.now().isoformat()
            }
        
        elif data_source == 'revenue_data':
            # Generate time series data
            data = []
            base_date = datetime.now() - timedelta(days=30)
            base_revenue = 1000000
            
            for i in range(30):
                date = base_date + timedelta(days=i)
                revenue = base_revenue + (i * 50000) + (i % 7 * 10000)
                data.append({
                    'date': date.strftime('%Y-%m-%d'),
                    'revenue': revenue,
                    'growth': (revenue - base_revenue) / base_revenue * 100
                })
            
            return {'data': data}
        
        elif data_source == 'service_status':
            services = [
                {'service': 'IZA OS API', 'status': 'healthy', 'uptime': '99.9%', 'response_time': '45ms'},
                {'service': 'MEMU Dashboard', 'status': 'healthy', 'uptime': '99.8%', 'response_time': '32ms'},
                {'service': 'Security System', 'status': 'healthy', 'uptime': '99.9%', 'response_time': '28ms'},
                {'service': 'AI Agents', 'status': 'healthy', 'uptime': '99.7%', 'response_time': '156ms'},
                {'service': 'N8N Workflows', 'status': 'healthy', 'uptime': '99.6%', 'response_time': '89ms'},
                {'service': 'Quant Finance', 'status': 'healthy', 'uptime': '99.8%', 'response_time': '67ms'}
            ]
            return {'data': services}
        
        elif data_source == 'ai_agents_performance':
            return {
                'value': 85,
                'max': 100,
                'agents_active': 12,
                'tasks_completed': 1247,
                'success_rate': 94.2
            }
        
        elif data_source == 'portfolio_breakdown':
            return {
                'data': [
                    {'name': 'Technology', 'value': 45, 'color': '#3B82F6'},
                    {'name': 'Healthcare', 'value': 25, 'color': '#10B981'},
                    {'name': 'Finance', 'value': 20, 'color': '#F59E0B'},
                    {'name': 'Other', 'value': 10, 'color': '#EF4444'}
                ]
            }
        
        else:
            return {'message': 'No data available'}

class UnifiedDashboardSystem:
    """Main unified dashboard system"""
    
    def __init__(self):
        self.component_library = ComponentLibrary()
        self.data_manager = RealTimeDataManager()
        self.dashboard_manager = DashboardManager(self.component_library, self.data_manager)
        self.logger = logging.getLogger(__name__)
        
    async def initialize(self) -> bool:
        """Initialize dashboard system"""
        try:
            # Start data refresh loop
            asyncio.create_task(self._data_refresh_loop())
            
            self.logger.info("✅ Unified Dashboard System initialized")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Dashboard system initialization failed: {e}")
            return False
    
    async def _data_refresh_loop(self):
        """Background data refresh loop"""
        while True:
            try:
                # Refresh all dashboard data
                for dashboard_id in ['default'] + list(self.dashboard_manager.dashboards.keys()):
                    dashboard = await self.dashboard_manager.get_dashboard(dashboard_id)
                    
                    for widget in dashboard.widgets:
                        try:
                            await self.dashboard_manager.get_widget_data(widget)
                        except Exception as e:
                            self.logger.error(f"❌ Widget data refresh failed: {e}")
                
                await asyncio.sleep(30)  # Refresh every 30 seconds
                
            except Exception as e:
                self.logger.error(f"❌ Data refresh loop error: {e}")
                await asyncio.sleep(30)
    
    async def get_health_status(self) -> Dict[str, Any]:
        """Get system health status"""
        try:
            return {
                'status': 'healthy',
                'message': 'Unified Dashboard System operational',
                'components': {
                    'component_library': 'healthy',
                    'data_manager': 'healthy',
                    'dashboard_manager': 'healthy',
                    'websocket_connections': len(self.data_manager.active_connections)
                },
                'metrics': {
                    'total_dashboards': 1 + len(self.dashboard_manager.dashboards),
                    'total_widgets': len(self.dashboard_manager.default_dashboard.widgets),
                    'active_connections': len(self.data_manager.active_connections),
                    'cached_data_sources': len(self.data_manager.data_cache)
                }
            }
            
        except Exception as e:
            return {
                'status': 'unhealthy',
                'message': f'Dashboard system error: {e}',
                'components': {},
                'metrics': {}
            }

# FastAPI application
app = FastAPI(
    title="IZA OS Unified Dashboard System",
    description="Modern React/TypeScript dashboard with real-time updates",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global dashboard system
dashboard_system = UnifiedDashboardSystem()

@app.on_event("startup")
async def startup_event():
    """Startup event"""
    await dashboard_system.initialize()

# Pydantic models
class DashboardConfig(BaseModel):
    layout_id: str
    name: str
    description: str = ""
    theme: str = "auto"
    widgets: List[Dict[str, Any]] = []

class WidgetConfig(BaseModel):
    widget_id: str
    name: str
    type: str
    position: Dict[str, int]
    config: Dict[str, Any] = {}
    data_source: str
    refresh_interval: int = 60

# API Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    health = await dashboard_system.get_health_status()
    return health

@app.get("/dashboard")
async def get_dashboard(dashboard_id: str = "default"):
    """Get dashboard configuration"""
    dashboard = await dashboard_system.dashboard_manager.get_dashboard(dashboard_id)
    return asdict(dashboard)

@app.post("/dashboard")
async def create_dashboard(config: DashboardConfig):
    """Create new dashboard"""
    dashboard = await dashboard_system.dashboard_manager.create_dashboard(config.dict())
    return asdict(dashboard)

@app.put("/dashboard/{dashboard_id}")
async def update_dashboard(dashboard_id: str, updates: Dict[str, Any]):
    """Update dashboard"""
    dashboard = await dashboard_system.dashboard_manager.update_dashboard(dashboard_id, updates)
    return asdict(dashboard)

@app.get("/dashboard/{dashboard_id}/widget/{widget_id}/data")
async def get_widget_data(dashboard_id: str, widget_id: str):
    """Get widget data"""
    dashboard = await dashboard_system.dashboard_manager.get_dashboard(dashboard_id)
    
    widget = None
    for w in dashboard.widgets:
        if w.widget_id == widget_id:
            widget = w
            break
    
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    
    data = await dashboard_system.dashboard_manager.get_widget_data(widget)
    return data

@app.get("/components")
async def get_component_library():
    """Get component library"""
    components = dashboard_system.component_library.get_all_components()
    return components

@app.get("/components/{category}")
async def get_components_by_category(category: str):
    """Get components by category"""
    components = dashboard_system.component_library.components.get(category, {})
    return components

@app.get("/components/{category}/{component_name}")
async def get_component(category: str, component_name: str):
    """Get specific component"""
    component = dashboard_system.component_library.get_component(category, component_name)
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    return component

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await dashboard_system.data_manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        await dashboard_system.data_manager.disconnect(websocket)

@app.get("/", response_class=HTMLResponse)
async def dashboard_home():
    """Serve dashboard HTML"""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IZA OS Unified Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body class="bg-gray-100">
        <div id="root"></div>
        <script type="text/babel">
            const { useState, useEffect } = React;
            
            function Dashboard() {
                const [dashboard, setDashboard] = useState(null);
                const [loading, setLoading] = useState(true);
                
                useEffect(() => {
                    fetch('/dashboard')
                        .then(response => response.json())
                        .then(data => {
                            setDashboard(data);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error loading dashboard:', error);
                            setLoading(false);
                        });
                }, []);
                
                if (loading) {
                    return (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-xl">Loading IZA OS Dashboard...</div>
                        </div>
                    );
                }
                
                if (!dashboard) {
                    return (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-xl text-red-500">Failed to load dashboard</div>
                        </div>
                    );
                }
                
                return (
                    <div className="min-h-screen bg-gray-100">
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center py-6">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {dashboard.name}
                                    </h1>
                                    <div className="text-sm text-gray-500">
                                        Last updated: {new Date().toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        </header>
                        
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="grid grid-cols-12 gap-6">
                                {dashboard.widgets.map(widget => (
                                    <div key={widget.widget_id} 
                                         className={`col-span-${widget.position.width} row-span-${widget.position.height} bg-white p-6 rounded-lg shadow`}>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            {widget.name}
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            Widget: {widget.type} | Data: {widget.data_source}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                );
            }
            
            ReactDOM.render(<Dashboard />, document.getElementById('root'));
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3010)

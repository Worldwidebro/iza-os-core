import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Server, 
  Network, 
  Shield, 
  Zap, 
  Monitor, 
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  Square,
  RotateCcw,
  Globe,
  Brain,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Building2
} from 'lucide-react';

interface CoreService {
  id: string;
  name: string;
  type: 'api' | 'database' | 'cache' | 'queue' | 'storage' | 'monitoring';
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  uptime: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  version: string;
  lastDeployment: string;
  endpoints: ServiceEndpoint[];
}

interface ServiceEndpoint {
  id: string;
  name: string;
  url: string;
  method: string;
  status: 'active' | 'deprecated' | 'beta';
  responseTime: number;
  requests: number;
  errors: number;
}

interface PlatformMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
}

interface InfrastructureComponent {
  id: string;
  name: string;
  type: 'server' | 'database' | 'load-balancer' | 'cdn' | 'firewall';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
    network: number;
  };
  uptime: number;
  lastUpdate: string;
}

export default function CorePlatformUI() {
  const [coreServices, setCoreServices] = useState<CoreService[]>([
    {
      id: '1',
      name: 'IZA API Gateway',
      type: 'api',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 45,
      throughput: 125000,
      errorRate: 0.01,
      version: 'v3.2.1',
      lastDeployment: '2024-01-15 14:30:00',
      endpoints: [
        {
          id: '1-1',
          name: 'Authentication',
          url: '/api/v1/auth',
          method: 'POST',
          status: 'active',
          responseTime: 25,
          requests: 45000,
          errors: 5
        },
        {
          id: '1-2',
          name: 'Business Operations',
          url: '/api/v1/business',
          method: 'GET',
          status: 'active',
          responseTime: 65,
          requests: 32000,
          errors: 3
        }
      ]
    },
    {
      id: '2',
      name: 'Primary Database',
      type: 'database',
      status: 'healthy',
      uptime: 99.8,
      responseTime: 12,
      throughput: 89000,
      errorRate: 0.005,
      version: 'PostgreSQL 15.3',
      lastDeployment: '2024-01-10 09:15:00',
      endpoints: []
    },
    {
      id: '3',
      name: 'Redis Cache',
      type: 'cache',
      status: 'warning',
      uptime: 99.5,
      responseTime: 8,
      throughput: 250000,
      errorRate: 0.02,
      version: 'Redis 7.0',
      lastDeployment: '2024-01-12 16:45:00',
      endpoints: []
    },
    {
      id: '4',
      name: 'Message Queue',
      type: 'queue',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 15,
      throughput: 180000,
      errorRate: 0.008,
      version: 'RabbitMQ 3.12',
      lastDeployment: '2024-01-08 11:20:00',
      endpoints: []
    }
  ]);

  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetric[]>([
    {
      id: '1',
      name: 'Total Requests/min',
      value: 125000,
      unit: 'requests',
      trend: 'up',
      threshold: { warning: 100000, critical: 150000 }
    },
    {
      id: '2',
      name: 'Average Response Time',
      value: 45,
      unit: 'ms',
      trend: 'stable',
      threshold: { warning: 100, critical: 200 }
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 0.01,
      unit: '%',
      trend: 'down',
      threshold: { warning: 1, critical: 5 }
    },
    {
      id: '4',
      name: 'Active Users',
      value: 1250,
      unit: 'users',
      trend: 'up',
      threshold: { warning: 1000, critical: 2000 }
    },
    {
      id: '5',
      name: 'CPU Usage',
      value: 65,
      unit: '%',
      trend: 'stable',
      threshold: { warning: 80, critical: 95 }
    },
    {
      id: '6',
      name: 'Memory Usage',
      value: 72,
      unit: '%',
      trend: 'up',
      threshold: { warning: 85, critical: 95 }
    }
  ]);

  const [infrastructure, setInfrastructure] = useState<InfrastructureComponent[]>([
    {
      id: '1',
      name: 'Web Server Cluster',
      type: 'server',
      status: 'online',
      location: 'US-East-1',
      resources: { cpu: 68, memory: 75, storage: 45, network: 82 },
      uptime: 99.9,
      lastUpdate: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Database Cluster',
      type: 'database',
      status: 'online',
      location: 'US-East-1',
      resources: { cpu: 45, memory: 62, storage: 78, network: 35 },
      uptime: 99.8,
      lastUpdate: '1 minute ago'
    },
    {
      id: '3',
      name: 'Load Balancer',
      type: 'load-balancer',
      status: 'online',
      location: 'Global',
      resources: { cpu: 25, memory: 38, storage: 15, network: 95 },
      uptime: 99.9,
      lastUpdate: '3 minutes ago'
    },
    {
      id: '4',
      name: 'CDN Network',
      type: 'cdn',
      status: 'online',
      location: 'Global',
      resources: { cpu: 15, memory: 22, storage: 85, network: 98 },
      uptime: 99.7,
      lastUpdate: '5 minutes ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      case 'maintenance': return 'text-blue-400';
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      case 'maintenance': return 'bg-blue-500';
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <Network className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'cache': return <Zap className="h-4 w-4" />;
      case 'queue': return <Activity className="h-4 w-4" />;
      case 'storage': return <Server className="h-4 w-4" />;
      case 'monitoring': return <Monitor className="h-4 w-4" />;
      case 'server': return <Server className="h-4 w-4" />;
      case 'load-balancer': return <Globe className="h-4 w-4" />;
      case 'cdn': return <Network className="h-4 w-4" />;
      case 'firewall': return <Shield className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-blue-400" />;
    }
  };

  const formatNumber = (value: number, unit: string) => {
    if (unit === 'requests' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    if (unit === 'users' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                IZA Core Platform
              </h1>
              <p className="text-xl text-blue-200">
                Infrastructure Management & System Monitoring Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Monitor className="h-4 w-4 mr-2" />
                Platform Health: 99.8%
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Platform Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {platformMetrics.map((metric) => (
            <Card key={metric.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">{metric.name}</h3>
                  {getTrendIcon(metric.trend)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">
                      {formatNumber(metric.value, metric.unit)}
                    </span>
                    <span className="text-sm text-gray-400">{metric.unit}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Warning</span>
                      <span className="text-yellow-400">{formatNumber(metric.threshold.warning, metric.unit)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Critical</span>
                      <span className="text-red-400">{formatNumber(metric.threshold.critical, metric.unit)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Management */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="services" className="text-white">Core Services</TabsTrigger>
            <TabsTrigger value="infrastructure" className="text-white">Infrastructure</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {coreServices.map((service) => (
                <Card key={service.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(service.type)}
                        <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBgColor(service.status)} text-white border-0`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Uptime:</span>
                        <p className="text-white font-medium">{service.uptime}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Response Time:</span>
                        <p className="text-white font-medium">{service.responseTime}ms</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Throughput:</span>
                        <p className="text-white font-medium">{service.throughput.toLocaleString()}/min</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Error Rate:</span>
                        <p className={`font-medium ${getStatusColor(service.errorRate > 1 ? 'warning' : 'healthy')}`}>
                          {service.errorRate}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Version:</span>
                        <p className="text-white font-medium">{service.version}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Deploy:</span>
                        <p className="text-white font-medium">{service.lastDeployment.split(' ')[0]}</p>
                      </div>
                    </div>

                    {service.endpoints.length > 0 && (
                      <div>
                        <h4 className="text-white text-sm font-medium mb-2">Endpoints</h4>
                        <div className="space-y-2">
                          {service.endpoints.map((endpoint) => (
                            <div key={endpoint.id} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  endpoint.method === 'GET' ? 'bg-blue-500' : 'bg-green-500'
                                }`}>
                                  {endpoint.method}
                                </span>
                                <span className="text-white text-sm">{endpoint.name}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <span>{endpoint.responseTime}ms</span>
                                <span>{endpoint.requests.toLocaleString()}</span>
                                <span className={endpoint.errors > 0 ? 'text-red-400' : 'text-green-400'}>
                                  {endpoint.errors} errors
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          {service.endpoints.length} endpoints
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Monitor className="h-3 w-3 mr-2" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Settings className="h-3 w-3 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {infrastructure.map((component) => (
                <Card key={component.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(component.type)}
                        <CardTitle className="text-white text-lg">{component.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBgColor(component.status)} text-white border-0`}
                      >
                        {component.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <p className="text-white font-medium">{component.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Uptime:</span>
                        <p className="text-white font-medium">{component.uptime}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Update:</span>
                        <p className="text-white font-medium">{component.lastUpdate}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-3">Resource Usage</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">CPU</span>
                            <span className="text-white">{component.resources.cpu}%</span>
                          </div>
                          <Progress value={component.resources.cpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Memory</span>
                            <span className="text-white">{component.resources.memory}%</span>
                          </div>
                          <Progress value={component.resources.memory} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Storage</span>
                            <span className="text-white">{component.resources.storage}%</span>
                          </div>
                          <Progress value={component.resources.storage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Network</span>
                            <span className="text-white">{component.resources.network}%</span>
                          </div>
                          <Progress value={component.resources.network} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Monitor className="h-3 w-3 mr-2" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Settings className="h-3 w-3 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    System Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Service Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Service Health Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Resource Usage Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Network Traffic Chart Component
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

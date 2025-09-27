import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Brain, 
  Zap, 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp,
  Activity,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Monitor,
  Server,
  Globe,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface EnterpriseMetrics {
  totalValue: number;
  monthlyRevenue: number;
  activeClients: number;
  automationRate: number;
  platformUptime: number;
  performanceScore: number;
  globalReach: number;
  aiIntelligence: number;
}

interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'onboarding' | 'inactive';
  revenue: number;
  satisfaction: number;
  automation: boolean;
  lastActivity: string;
  services: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'development' | 'maintenance';
  clients: number;
  revenue: number;
  automation: boolean;
  uptime: number;
  performance: number;
}

export default function EnterpriseDashboard() {
  const [metrics, setMetrics] = useState<EnterpriseMetrics>({
    totalValue: 8500000000,
    monthlyRevenue: 12500000,
    activeClients: 1250,
    automationRate: 92,
    platformUptime: 99.8,
    performanceScore: 96,
    globalReach: 35,
    aiIntelligence: 94
  });

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Fortune 500 Corp',
      industry: 'Technology',
      status: 'active',
      revenue: 2500000,
      satisfaction: 98,
      automation: true,
      lastActivity: '2 hours ago',
      services: ['AI Automation', 'Strategic Planning', 'Performance Optimization']
    },
    {
      id: '2',
      name: 'Global Manufacturing Ltd',
      industry: 'Manufacturing',
      status: 'active',
      revenue: 1800000,
      satisfaction: 95,
      automation: true,
      lastActivity: '1 hour ago',
      services: ['Process Automation', 'Supply Chain Optimization', 'Quality Control']
    },
    {
      id: '3',
      name: 'Financial Services Group',
      industry: 'Finance',
      status: 'onboarding',
      revenue: 3200000,
      satisfaction: 92,
      automation: false,
      lastActivity: '4 hours ago',
      services: ['Risk Assessment', 'Compliance Automation', 'Market Analysis']
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'AI Business Automation',
      description: 'Comprehensive AI-powered business process automation',
      status: 'active',
      clients: 850,
      revenue: 8500000,
      automation: true,
      uptime: 99.9,
      performance: 98
    },
    {
      id: '2',
      name: 'Strategic Planning AI',
      description: 'AI-driven strategic planning and decision support',
      status: 'active',
      clients: 420,
      revenue: 4200000,
      automation: true,
      uptime: 99.8,
      performance: 96
    },
    {
      id: '3',
      name: 'Performance Optimization',
      description: 'Continuous performance monitoring and optimization',
      status: 'development',
      clients: 180,
      revenue: 1800000,
      automation: true,
      uptime: 99.5,
      performance: 94
    }
  ]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'onboarding': return 'bg-blue-500';
      case 'development': return 'bg-yellow-500';
      case 'maintenance': return 'bg-orange-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                IZA Enterprise Platform
              </h1>
              <p className="text-xl text-blue-200">
                AI-Powered Business Operations & Client Management Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Building2 className="h-4 w-4 mr-2" />
                Platform Score: {metrics.performanceScore}%
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Platform Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Platform Value</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(metrics.totalValue)}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(metrics.monthlyRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Active Clients</p>
                  <p className="text-3xl font-bold text-white">{metrics.activeClients.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">AI Intelligence</p>
                  <p className="text-3xl font-bold text-white">{metrics.aiIntelligence}%</p>
                </div>
                <Brain className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Automation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Current Level</span>
                  <span className="text-white font-medium">{metrics.automationRate}%</span>
                </div>
                <Progress value={metrics.automationRate} className="h-2" />
                <p className="text-xs text-gray-400">Target: 95% automated operations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-green-400" />
                Platform Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Current Uptime</span>
                  <span className="text-white font-medium">{metrics.platformUptime}%</span>
                </div>
                <Progress value={metrics.platformUptime} className="h-2" />
                <p className="text-xs text-gray-400">Enterprise-grade reliability</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                Global Reach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Countries Served</span>
                  <span className="text-white font-medium">{metrics.globalReach}</span>
                </div>
                <Progress value={metrics.globalReach} className="h-2" />
                <p className="text-xs text-gray-400">Expanding to 50+ countries</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client & Service Management */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="clients" className="text-white">Client Management</TabsTrigger>
            <TabsTrigger value="services" className="text-white">Service Portfolio</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Platform Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{client.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(client.status)} text-white border-0`}
                      >
                        {client.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{client.industry}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Revenue:</span>
                        <p className="text-white font-medium">{formatCurrency(client.revenue)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Satisfaction:</span>
                        <p className="text-white font-medium">{client.satisfaction}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Activity:</span>
                        <p className="text-white font-medium">{client.lastActivity}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Automation:</span>
                        <p className="text-white font-medium">{client.automation ? 'Enabled' : 'Manual'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Monitor className="h-3 w-3 mr-2" />
                        Dashboard
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

          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(service.status)} text-white border-0`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Clients:</span>
                        <p className="text-white font-medium">{service.clients}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue:</span>
                        <p className="text-white font-medium">{formatCurrency(service.revenue)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Uptime:</span>
                        <p className="text-white font-medium">{service.uptime}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <p className="text-white font-medium">{service.performance}%</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Performance</span>
                        <span className="text-white font-medium">{service.performance}%</span>
                      </div>
                      <Progress value={service.performance} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {service.automation ? 'Automated' : 'Manual'}
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

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Revenue Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Service Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Service Distribution Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Client Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Client Growth Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Performance Chart Component
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

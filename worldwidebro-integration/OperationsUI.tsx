import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap, 
  Activity,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Server,
  Network,
  Shield,
  Building2,
  Brain,
  Database
} from 'lucide-react';

interface GlobalOperation {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'scaling' | 'maintenance' | 'paused';
  revenue: number;
  growth: number;
  marketShare: number;
  teamSize: number;
  automation: boolean;
  lastUpdate: string;
  metrics: OperationMetrics;
}

interface OperationMetrics {
  clients: number;
  projects: number;
  satisfaction: number;
  efficiency: number;
  uptime: number;
  performance: number;
}

interface IntegrationFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'error' | 'completed';
  source: string;
  destination: string;
  dataVolume: number;
  frequency: string;
  lastSync: string;
  successRate: number;
}

interface MarketIntelligence {
  id: string;
  market: string;
  opportunity: string;
  value: number;
  competition: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'researching' | 'analyzing' | 'ready' | 'executing';
}

export default function OperationsUI() {
  const [operations, setOperations] = useState<GlobalOperation[]>([
    {
      id: '1',
      name: 'North American Operations',
      region: 'North America',
      status: 'active',
      revenue: 8500000,
      growth: 25.5,
      marketShare: 12.3,
      teamSize: 45,
      automation: true,
      lastUpdate: '2 minutes ago',
      metrics: {
        clients: 125,
        projects: 89,
        satisfaction: 96,
        efficiency: 94,
        uptime: 99.8,
        performance: 97
      }
    },
    {
      id: '2',
      name: 'European Operations',
      region: 'Europe',
      status: 'scaling',
      revenue: 6200000,
      growth: 42.8,
      marketShare: 8.7,
      teamSize: 32,
      automation: true,
      lastUpdate: '5 minutes ago',
      metrics: {
        clients: 89,
        projects: 67,
        satisfaction: 94,
        efficiency: 91,
        uptime: 99.6,
        performance: 95
      }
    },
    {
      id: '3',
      name: 'Asia-Pacific Operations',
      region: 'Asia-Pacific',
      status: 'active',
      revenue: 4800000,
      growth: 67.2,
      marketShare: 5.4,
      teamSize: 28,
      automation: false,
      lastUpdate: '1 minute ago',
      metrics: {
        clients: 67,
        projects: 45,
        satisfaction: 92,
        efficiency: 88,
        uptime: 99.4,
        performance: 93
      }
    }
  ]);

  const [integrationFlows, setIntegrationFlows] = useState<IntegrationFlow[]>([
    {
      id: '1',
      name: 'Client Data Sync',
      description: 'Synchronize client data across all regional operations',
      status: 'active',
      source: 'North America',
      destination: 'Global Database',
      dataVolume: 2500000,
      frequency: 'Real-time',
      lastSync: '30 seconds ago',
      successRate: 99.8
    },
    {
      id: '2',
      name: 'Revenue Analytics',
      description: 'Aggregate revenue data from all regions for global analysis',
      status: 'active',
      source: 'All Regions',
      destination: 'Analytics Engine',
      dataVolume: 1800000,
      frequency: 'Hourly',
      lastSync: '2 minutes ago',
      successRate: 99.9
    },
    {
      id: '3',
      name: 'Market Intelligence',
      description: 'Collect and process market intelligence from global sources',
      status: 'pending',
      source: 'External APIs',
      destination: 'Intelligence Database',
      dataVolume: 950000,
      frequency: 'Daily',
      lastSync: '4 hours ago',
      successRate: 97.5
    }
  ]);

  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence[]>([
    {
      id: '1',
      market: 'Latin America',
      opportunity: 'AI automation market expansion',
      value: 2500000,
      competition: 'Medium',
      timeline: '6 months',
      priority: 'high',
      status: 'analyzing'
    },
    {
      id: '2',
      market: 'Middle East',
      opportunity: 'Enterprise digital transformation',
      value: 1800000,
      competition: 'Low',
      timeline: '4 months',
      priority: 'medium',
      status: 'researching'
    },
    {
      id: '3',
      market: 'Africa',
      opportunity: 'Fintech and mobile solutions',
      value: 3200000,
      competition: 'High',
      timeline: '8 months',
      priority: 'high',
      status: 'ready'
    }
  ]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scaling': return 'bg-blue-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'paused': return 'bg-gray-500';
      case 'completed': return 'bg-purple-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Worldwidebro Global Operations
              </h1>
              <p className="text-xl text-green-200">
                Worldwide Market Expansion & Global Operations Management Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Globe className="h-4 w-4 mr-2" />
                Global Reach: 35 Countries
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Global Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Global Revenue</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(19500000)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Active Regions</p>
                  <p className="text-3xl font-bold text-white">{operations.length}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Global Team</p>
                  <p className="text-3xl font-bold text-white">{operations.reduce((sum, op) => sum + op.teamSize, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Avg Growth</p>
                  <p className="text-3xl font-bold text-white">
                    {(operations.reduce((sum, op) => sum + op.growth, 0) / operations.length).toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Management */}
        <Tabs defaultValue="operations" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="operations" className="text-white">Global Operations</TabsTrigger>
            <TabsTrigger value="integrations" className="text-white">Integration Flows</TabsTrigger>
            <TabsTrigger value="intelligence" className="text-white">Market Intelligence</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Global Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {operations.map((operation) => (
                <Card key={operation.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-green-400" />
                        <CardTitle className="text-white text-lg">{operation.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(operation.status)} text-white border-0`}
                      >
                        {operation.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{operation.region}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Revenue:</span>
                        <p className="text-white font-medium">{formatCurrency(operation.revenue)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Growth:</span>
                        <p className="text-green-400 font-medium">+{operation.growth}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Market Share:</span>
                        <p className="text-white font-medium">{operation.marketShare}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Team Size:</span>
                        <p className="text-white font-medium">{operation.teamSize}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Clients:</span>
                        <p className="text-white font-medium">{operation.metrics.clients}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Projects:</span>
                        <p className="text-white font-medium">{operation.metrics.projects}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Performance</span>
                        <span className="text-white font-medium">{operation.metrics.performance}%</span>
                      </div>
                      <Progress value={operation.metrics.performance} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">Satisfaction</p>
                        <p className="text-white font-medium">{operation.metrics.satisfaction}%</p>
                      </div>
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">Efficiency</p>
                        <p className="text-white font-medium">{operation.metrics.efficiency}%</p>
                      </div>
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">Uptime</p>
                        <p className="text-white font-medium">{operation.metrics.uptime}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {operation.automation ? 'Automated' : 'Manual'}
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

          <TabsContent value="integrations" className="space-y-6">
            <div className="space-y-4">
              {integrationFlows.map((flow) => (
                <Card key={flow.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Network className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white">{flow.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(flow.status)} text-white border-0`}
                      >
                        {flow.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{flow.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Flow Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Source:</span>
                            <span className="text-white">{flow.source}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Destination:</span>
                            <span className="text-white">{flow.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Frequency:</span>
                            <span className="text-white">{flow.frequency}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Performance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Data Volume:</span>
                            <span className="text-white">{flow.dataVolume.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Success Rate:</span>
                            <span className="text-green-400">{flow.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Sync:</span>
                            <span className="text-white">{flow.lastSync}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status</span>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(flow.status)} text-white border-0`}
                            >
                              {flow.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Success Rate</span>
                            <span className="text-green-400">{flow.successRate}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Actions</h4>
                        <div className="flex flex-col space-y-2">
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {marketIntelligence.map((intel) => (
                <Card key={intel.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{intel.market}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(intel.status)} text-white border-0`}
                        >
                          {intel.status}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(intel.priority)}`}>
                          {intel.priority}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Opportunity</h4>
                      <p className="text-gray-300 text-sm">{intel.opportunity}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Value:</span>
                        <p className="text-white font-medium">{formatCurrency(intel.value)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <p className="text-white font-medium">{intel.timeline}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Competition:</span>
                        <p className="text-white font-medium">{intel.competition}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Priority:</span>
                        <p className={`font-medium ${getPriorityColor(intel.priority)}`}>
                          {intel.priority}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Target className="h-3 w-3 mr-2" />
                        Analyze
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <TrendingUp className="h-3 w-3 mr-2" />
                        Execute
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Global Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Global Revenue Trends Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Regional Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Market Intelligence Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Integration Flows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Integration Flows Chart Component
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

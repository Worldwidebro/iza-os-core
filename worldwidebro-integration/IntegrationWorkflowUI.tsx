import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Workflow, 
  GitBranch, 
  Code, 
  Database, 
  Globe, 
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
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface IntegrationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'error' | 'completed' | 'paused';
  source: string;
  destination: string;
  type: 'data-sync' | 'api-integration' | 'deployment' | 'monitoring' | 'analytics';
  frequency: string;
  lastRun: string;
  nextRun: string;
  successRate: number;
  dataVolume: number;
  latency: number;
  steps: WorkflowStep[];
  dependencies: string[];
  alerts: WorkflowAlert[];
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'transform' | 'validate' | 'load' | 'notify';
  status: 'completed' | 'running' | 'pending' | 'error';
  duration: number;
  output: any;
  error?: string;
}

interface WorkflowAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface IntegrationMetrics {
  totalWorkflows: number;
  activeWorkflows: number;
  successRate: number;
  averageLatency: number;
  dataProcessed: number;
  alertsResolved: number;
  uptime: number;
  performance: number;
}

export default function IntegrationWorkflowUI() {
  const [workflows, setWorkflows] = useState<IntegrationWorkflow[]>([
    {
      id: '1',
      name: 'Global Data Synchronization',
      description: 'Synchronize data across all regional operations and repositories',
      status: 'active',
      source: 'All Regions',
      destination: 'Global Database',
      type: 'data-sync',
      frequency: 'Real-time',
      lastRun: '2 minutes ago',
      nextRun: 'Continuous',
      successRate: 99.8,
      dataVolume: 2500000,
      latency: 45,
      steps: [
        { id: '1', name: 'Data Collection', type: 'trigger', status: 'completed', duration: 120, output: '2.5M records collected' },
        { id: '2', name: 'Data Validation', type: 'validate', status: 'completed', duration: 89, output: '99.9% valid records' },
        { id: '3', name: 'Data Transformation', type: 'transform', status: 'completed', duration: 156, output: 'Transformed successfully' },
        { id: '4', name: 'Data Loading', type: 'load', status: 'running', duration: 0, output: 'Loading...' },
        { id: '5', name: 'Notification', type: 'notify', status: 'pending', duration: 0, output: 'Pending' }
      ],
      dependencies: ['Authentication Service', 'Database Connection Pool'],
      alerts: [
        { id: '1', type: 'info', message: 'Data volume increased by 15% this hour', timestamp: '2024-01-15 16:30:00', resolved: false },
        { id: '2', type: 'success', message: 'Performance optimization applied successfully', timestamp: '2024-01-15 16:25:00', resolved: true }
      ]
    },
    {
      id: '2',
      name: 'Repository Integration Pipeline',
      description: 'Automated integration pipeline for all repository deployments',
      status: 'active',
      source: 'Git Repositories',
      destination: 'Production Environments',
      type: 'deployment',
      frequency: 'On Commit',
      lastRun: '5 minutes ago',
      nextRun: 'Next Commit',
      successRate: 98.5,
      dataVolume: 156000,
      latency: 120,
      steps: [
        { id: '1', name: 'Code Checkout', type: 'trigger', status: 'completed', duration: 45, output: 'Latest commit checked out' },
        { id: '2', name: 'Build Process', type: 'transform', status: 'completed', duration: 234, output: 'Build successful' },
        { id: '3', name: 'Test Execution', type: 'validate', status: 'completed', duration: 189, output: 'All tests passed' },
        { id: '4', name: 'Security Scan', type: 'validate', status: 'completed', duration: 67, output: 'No vulnerabilities found' },
        { id: '5', name: 'Deployment', type: 'load', status: 'completed', duration: 89, output: 'Deployed successfully' },
        { id: '6', name: 'Health Check', type: 'validate', status: 'completed', duration: 23, output: 'All services healthy' }
      ],
      dependencies: ['Build Server', 'Test Environment', 'Production Environment'],
      alerts: [
        { id: '3', type: 'warning', message: 'Build time increased by 20%', timestamp: '2024-01-15 16:20:00', resolved: false },
        { id: '4', type: 'success', message: 'Deployment completed successfully', timestamp: '2024-01-15 16:18:00', resolved: true }
      ]
    },
    {
      id: '3',
      name: 'AI Model Training Pipeline',
      description: 'Automated training and deployment of AI models across the ecosystem',
      status: 'active',
      source: 'Training Data',
      destination: 'Model Registry',
      type: 'analytics',
      frequency: 'Daily',
      lastRun: '1 hour ago',
      nextRun: 'Tomorrow 02:00',
      successRate: 96.2,
      dataVolume: 4500000,
      latency: 3600,
      steps: [
        { id: '1', name: 'Data Ingestion', type: 'trigger', status: 'completed', duration: 450, output: '4.5M records ingested' },
        { id: '2', name: 'Data Preprocessing', type: 'transform', status: 'completed', duration: 890, output: 'Data preprocessed' },
        { id: '3', name: 'Model Training', type: 'transform', status: 'completed', duration: 2340, output: 'Model trained successfully' },
        { id: '4', name: 'Model Validation', type: 'validate', status: 'completed', duration: 567, output: 'Accuracy: 94.2%' },
        { id: '5', name: 'Model Deployment', type: 'load', status: 'completed', duration: 234, output: 'Model deployed' },
        { id: '6', name: 'Performance Monitoring', type: 'monitor', status: 'running', duration: 0, output: 'Monitoring...' }
      ],
      dependencies: ['GPU Cluster', 'Model Registry', 'Monitoring System'],
      alerts: [
        { id: '5', type: 'error', message: 'Model accuracy dropped below threshold', timestamp: '2024-01-15 15:45:00', resolved: false },
        { id: '6', type: 'info', message: 'New training data available', timestamp: '2024-01-15 15:30:00', resolved: false }
      ]
    },
    {
      id: '4',
      name: 'Financial Data Integration',
      description: 'Real-time integration of financial data from multiple sources',
      status: 'error',
      source: 'Financial APIs',
      destination: 'Analytics Database',
      type: 'api-integration',
      frequency: 'Every 5 minutes',
      lastRun: '15 minutes ago',
      nextRun: '5 minutes',
      successRate: 94.7,
      dataVolume: 890000,
      latency: 89,
      steps: [
        { id: '1', name: 'API Authentication', type: 'trigger', status: 'completed', duration: 12, output: 'Authenticated successfully' },
        { id: '2', name: 'Data Fetching', type: 'transform', status: 'completed', duration: 156, output: '890K records fetched' },
        { id: '3', name: 'Data Validation', type: 'validate', status: 'error', duration: 0, output: 'Validation failed', error: 'Invalid data format received' },
        { id: '4', name: 'Data Transformation', type: 'transform', status: 'pending', duration: 0, output: 'Pending' },
        { id: '5', name: 'Database Insert', type: 'load', status: 'pending', duration: 0, output: 'Pending' }
      ],
      dependencies: ['Financial API Gateway', 'Analytics Database', 'Validation Service'],
      alerts: [
        { id: '7', type: 'error', message: 'Data validation failed - Invalid format', timestamp: '2024-01-15 16:15:00', resolved: false },
        { id: '8', type: 'warning', message: 'API rate limit approaching', timestamp: '2024-01-15 16:10:00', resolved: false }
      ]
    }
  ]);

  const [metrics, setMetrics] = useState<IntegrationMetrics>({
    totalWorkflows: 4,
    activeWorkflows: 3,
    successRate: 97.3,
    averageLatency: 478,
    dataProcessed: 8046000,
    alertsResolved: 3,
    uptime: 99.2,
    performance: 95
  });

  const formatDataVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const formatDuration = (seconds: number) => {
    if (seconds >= 3600) {
      return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    } else if (seconds >= 60) {
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'paused': return 'bg-gray-500';
      case 'running': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'data-sync': return <Database className="h-4 w-4" />;
      case 'api-integration': return <Network className="h-4 w-4" />;
      case 'deployment': return <Server className="h-4 w-4" />;
      case 'monitoring': return <Monitor className="h-4 w-4" />;
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      default: return <Workflow className="h-4 w-4" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'info': return <Activity className="h-4 w-4 text-blue-400" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
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
                Worldwidebro Integration Workflows
              </h1>
              <p className="text-xl text-green-200">
                Global Workflow Orchestration & Integration Management Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Workflow className="h-4 w-4 mr-2" />
                {metrics.totalWorkflows} Active Workflows
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Workflow Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{metrics.successRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Data Processed</p>
                  <p className="text-3xl font-bold text-white">{formatDataVolume(metrics.dataProcessed)}</p>
                </div>
                <Database className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Avg Latency</p>
                  <p className="text-3xl font-bold text-white">{formatDuration(metrics.averageLatency)}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Uptime</p>
                  <p className="text-3xl font-bold text-white">{metrics.uptime}%</p>
                </div>
                <Activity className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Management */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="workflows" className="text-white">Workflows</TabsTrigger>
            <TabsTrigger value="executions" className="text-white">Executions</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
            <TabsTrigger value="alerts" className="text-white">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(workflow.type)}
                        <CardTitle className="text-white text-xl">{workflow.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(workflow.status)} text-white border-0`}
                        >
                          {workflow.status}
                        </Badge>
                        <span className="text-sm text-green-400">{workflow.successRate}% success</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{workflow.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Workflow Steps */}
                      <div className="lg:col-span-2">
                        <h4 className="text-white font-medium mb-4">Workflow Steps</h4>
                        <div className="space-y-3">
                          {workflow.steps.map((step, index) => (
                            <div key={step.id} className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(step.status)} text-white border-0`}
                                >
                                  {step.status}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium">{step.name}</span>
                                  <span className="text-sm text-gray-400">{formatDuration(step.duration)}</span>
                                </div>
                                <p className="text-sm text-gray-300">{step.output}</p>
                                {step.error && (
                                  <p className="text-sm text-red-400 mt-1">{step.error}</p>
                                )}
                              </div>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Workflow Info */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Workflow Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Source:</span>
                              <span className="text-white">{workflow.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Destination:</span>
                              <span className="text-white">{workflow.destination}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Frequency:</span>
                              <span className="text-white">{workflow.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Last Run:</span>
                              <span className="text-white">{workflow.lastRun}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Data Volume:</span>
                              <span className="text-white">{formatDataVolume(workflow.dataVolume)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Latency:</span>
                              <span className="text-white">{formatDuration(workflow.latency)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Dependencies</h4>
                          <div className="space-y-1">
                            {workflow.dependencies.map((dep, index) => (
                              <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs mr-1">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Actions</h4>
                          <div className="flex flex-col space-y-2">
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                              <Play className="h-3 w-3 mr-2" />
                              Run Now
                            </Button>
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                              <Pause className="h-3 w-3 mr-2" />
                              Pause
                            </Button>
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                              <Monitor className="h-3 w-3 mr-2" />
                              Monitor
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                workflow.alerts.length > 0 && (
                  <Card key={workflow.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">{workflow.name} - Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {workflow.alerts.map((alert) => (
                          <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex-shrink-0">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-white font-medium">{alert.message}</span>
                                <Badge 
                                  variant="outline" 
                                  className={alert.resolved ? "text-green-400 border-green-400" : "text-yellow-400 border-yellow-400"}
                                >
                                  {alert.resolved ? "Resolved" : "Active"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400">{alert.timestamp}</p>
                            </div>
                            {!alert.resolved && (
                              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Resolve
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </TabsContent>

          <TabsContent value="executions" className="space-y-6">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Execution History Chart Component
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Workflow Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Success Rate Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Success Rate Chart Component
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

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Puzzle, 
  Workflow, 
  Zap, 
  Activity, 
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Server,
  Shield,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Bot,
  Cpu,
  Network,
  Database,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Star,
  Award,
  Trophy,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Code,
  GitBranch,
  Terminal,
  Layers,
  Command,
  Sparkles,
  Wand2,
  Cog,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Share,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  PauseCircle,
  StopCircle
} from 'lucide-react';

interface ActivepiecesFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error' | 'draft' | 'archived';
  trigger: FlowTrigger;
  actions: FlowAction[];
  lastRun: string;
  nextRun: string;
  executionCount: number;
  successRate: number;
  averageExecutionTime: number;
  errorCount: number;
  tags: string[];
  created: string;
  updated: string;
  version: string;
}

interface FlowTrigger {
  type: 'webhook' | 'schedule' | 'event' | 'manual' | 'api';
  name: string;
  config: any;
  status: 'active' | 'inactive';
}

interface FlowAction {
  id: string;
  name: string;
  type: 'api' | 'database' | 'email' | 'file' | 'condition' | 'loop' | 'transform' | 'notification';
  status: 'completed' | 'running' | 'pending' | 'error' | 'skipped';
  config: any;
  output: any;
  error?: string;
  executionTime: number;
}

interface ActivepiecesMetrics {
  totalFlows: number;
  activeFlows: number;
  totalExecutions: number;
  successRate: number;
  averageExecutionTime: number;
  errorRate: number;
  activeConnections: number;
  dataProcessed: number;
}

interface Connection {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastUsed: string;
  usage: number;
  credentials: string;
  endpoints: string[];
}

export default function ActivepiecesUI() {
  const [flows, setFlows] = useState<ActivepiecesFlow[]>([
    {
      id: '1',
      name: 'AI Business Intelligence Pipeline',
      description: 'Automated data collection, analysis, and reporting for business intelligence',
      status: 'active',
      trigger: {
        type: 'schedule',
        name: 'Daily at 9 AM',
        config: { cron: '0 9 * * *', timezone: 'UTC' },
        status: 'active'
      },
      actions: [
        {
          id: '1',
          name: 'Collect Financial Data',
          type: 'api',
          status: 'completed',
          config: { endpoint: '/api/financial-data', method: 'GET' },
          output: { records: 1250, size: '2.5MB' },
          executionTime: 45
        },
        {
          id: '2',
          name: 'Process Data',
          type: 'transform',
          status: 'completed',
          config: { transformations: ['normalize', 'aggregate', 'calculate'] },
          output: { processed: 1250, insights: 15 },
          executionTime: 120
        },
        {
          id: '3',
          name: 'Generate Report',
          type: 'file',
          status: 'completed',
          config: { format: 'PDF', template: 'business-report' },
          output: { file: 'report-2024-01-15.pdf', size: '1.2MB' },
          executionTime: 30
        },
        {
          id: '4',
          name: 'Send Notifications',
          type: 'notification',
          status: 'completed',
          config: { recipients: ['executives', 'managers'], channels: ['email', 'slack'] },
          output: { sent: 12, delivered: 12 },
          executionTime: 15
        }
      ],
      lastRun: '2024-01-15 09:00:00',
      nextRun: '2024-01-16 09:00:00',
      executionCount: 45,
      successRate: 97.8,
      averageExecutionTime: 210,
      errorCount: 1,
      tags: ['business', 'intelligence', 'automation'],
      created: '2024-01-01',
      updated: '2024-01-15',
      version: '2.1.0'
    },
    {
      id: '2',
      name: 'Customer Onboarding Automation',
      description: 'Automated customer onboarding process with verification and welcome sequences',
      status: 'active',
      trigger: {
        type: 'webhook',
        name: 'New Customer Registration',
        config: { endpoint: '/webhook/customer-registration', method: 'POST' },
        status: 'active'
      },
      actions: [
        {
          id: '5',
          name: 'Validate Customer Data',
          type: 'condition',
          status: 'completed',
          config: { rules: ['email_valid', 'phone_valid', 'identity_verified'] },
          output: { valid: true, score: 95 },
          executionTime: 5
        },
        {
          id: '6',
          name: 'Create Customer Record',
          type: 'database',
          status: 'completed',
          config: { table: 'customers', operation: 'insert' },
          output: { id: 'CUST-12345', created: true },
          executionTime: 12
        },
        {
          id: '7',
          name: 'Send Welcome Email',
          type: 'email',
          status: 'completed',
          config: { template: 'welcome', personalization: true },
          output: { sent: true, messageId: 'msg-67890' },
          executionTime: 8
        },
        {
          id: '8',
          name: 'Assign Account Manager',
          type: 'api',
          status: 'running',
          config: { endpoint: '/api/assign-manager', method: 'POST' },
          output: null,
          executionTime: 0
        }
      ],
      lastRun: '2024-01-15 16:30:00',
      nextRun: 'On trigger',
      executionCount: 128,
      successRate: 99.2,
      averageExecutionTime: 25,
      errorCount: 1,
      tags: ['customer', 'onboarding', 'automation'],
      created: '2024-01-05',
      updated: '2024-01-14',
      version: '1.5.2'
    },
    {
      id: '3',
      name: 'AI Content Generation Workflow',
      description: 'Automated content generation and distribution across multiple channels',
      status: 'paused',
      trigger: {
        type: 'schedule',
        name: 'Weekly Content Generation',
        config: { cron: '0 10 * * 1', timezone: 'UTC' },
        status: 'inactive'
      },
      actions: [
        {
          id: '9',
          name: 'Generate Content Ideas',
          type: 'api',
          status: 'pending',
          config: { endpoint: '/api/ai/content-ideas', method: 'POST' },
          output: null,
          executionTime: 0
        },
        {
          id: '10',
          name: 'Create Content',
          type: 'transform',
          status: 'pending',
          config: { type: 'blog_post', length: '1000-1500 words' },
          output: null,
          executionTime: 0
        },
        {
          id: '11',
          name: 'Review Content',
          type: 'condition',
          status: 'pending',
          config: { quality_threshold: 85, plagiarism_check: true },
          output: null,
          executionTime: 0
        },
        {
          id: '12',
          name: 'Publish Content',
          type: 'api',
          status: 'pending',
          config: { platforms: ['website', 'social', 'newsletter'] },
          output: null,
          executionTime: 0
        }
      ],
      lastRun: '2024-01-08 10:00:00',
      nextRun: '2024-01-22 10:00:00',
      executionCount: 12,
      successRate: 91.7,
      averageExecutionTime: 450,
      errorCount: 1,
      tags: ['content', 'ai', 'marketing'],
      created: '2023-12-15',
      updated: '2024-01-10',
      version: '1.2.0'
    },
    {
      id: '4',
      name: 'Financial Transaction Monitoring',
      description: 'Real-time monitoring and analysis of financial transactions for fraud detection',
      status: 'active',
      trigger: {
        type: 'event',
        name: 'Transaction Event',
        config: { event_type: 'transaction.created', source: 'payment_gateway' },
        status: 'active'
      },
      actions: [
        {
          id: '13',
          name: 'Analyze Transaction',
          type: 'api',
          status: 'completed',
          config: { endpoint: '/api/fraud-detection', method: 'POST' },
          output: { risk_score: 15, decision: 'approved' },
          executionTime: 2
        },
        {
          id: '14',
          name: 'Update Risk Profile',
          type: 'database',
          status: 'completed',
          config: { table: 'risk_profiles', operation: 'update' },
          output: { updated: true, new_score: 12 },
          executionTime: 3
        },
        {
          id: '15',
          name: 'Log Transaction',
          type: 'database',
          status: 'completed',
          config: { table: 'transaction_log', operation: 'insert' },
          output: { logged: true, id: 'TXN-98765' },
          executionTime: 1
        }
      ],
      lastRun: '2024-01-15 16:45:00',
      nextRun: 'On trigger',
      executionCount: 2847,
      successRate: 99.9,
      averageExecutionTime: 6,
      errorCount: 3,
      tags: ['financial', 'security', 'monitoring'],
      created: '2023-11-20',
      updated: '2024-01-12',
      version: '3.0.1'
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Financial Data API',
      type: 'REST API',
      status: 'connected',
      lastUsed: '2024-01-15 09:00:00',
      usage: 1250,
      credentials: 'OAuth 2.0',
      endpoints: ['/api/financial-data', '/api/transactions', '/api/accounts']
    },
    {
      id: '2',
      name: 'Customer Database',
      type: 'PostgreSQL',
      status: 'connected',
      lastUsed: '2024-01-15 16:30:00',
      usage: 892,
      credentials: 'Connection String',
      endpoints: ['customers', 'accounts', 'transactions', 'risk_profiles']
    },
    {
      id: '3',
      name: 'Email Service',
      type: 'SMTP',
      status: 'connected',
      lastUsed: '2024-01-15 16:35:00',
      usage: 234,
      credentials: 'API Key',
      endpoints: ['send', 'templates', 'tracking']
    },
    {
      id: '4',
      name: 'AI Content API',
      type: 'OpenAI API',
      status: 'disconnected',
      lastUsed: '2024-01-08 10:00:00',
      usage: 45,
      credentials: 'API Key',
      endpoints: ['/v1/chat/completions', '/v1/completions', '/v1/embeddings']
    },
    {
      id: '5',
      name: 'Slack Integration',
      type: 'Webhook',
      status: 'connected',
      lastUsed: '2024-01-15 09:05:00',
      usage: 67,
      credentials: 'Bot Token',
      endpoints: ['/webhook/slack', '/api/chat.postMessage']
    }
  ]);

  const [metrics, setMetrics] = useState<ActivepiecesMetrics>({
    totalFlows: 4,
    activeFlows: 3,
    totalExecutions: 3032,
    successRate: 98.7,
    averageExecutionTime: 172,
    errorRate: 1.3,
    activeConnections: 4,
    dataProcessed: 1250000
  });

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
      case 'running': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'error': return 'bg-red-500';
      case 'draft': return 'bg-gray-500';
      case 'archived': return 'bg-gray-600';
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <Globe className="h-4 w-4 text-blue-400" />;
      case 'database': return <Database className="h-4 w-4 text-green-400" />;
      case 'email': return <Mail className="h-4 w-4 text-yellow-400" />;
      case 'file': return <FileText className="h-4 w-4 text-purple-400" />;
      case 'condition': return <Target className="h-4 w-4 text-orange-400" />;
      case 'loop': return <RefreshCw className="h-4 w-4 text-cyan-400" />;
      case 'transform': return <Wand2 className="h-4 w-4 text-pink-400" />;
      case 'notification': return <Bell className="h-4 w-4 text-red-400" />;
      default: return <Puzzle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'webhook': return <Globe className="h-4 w-4 text-blue-400" />;
      case 'schedule': return <Clock className="h-4 w-4 text-green-400" />;
      case 'event': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'manual': return <Play className="h-4 w-4 text-purple-400" />;
      case 'api': return <Network className="h-4 w-4 text-orange-400" />;
      default: return <Workflow className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Activepieces Workflow Automation
              </h1>
              <p className="text-xl text-orange-200">
                Visual Workflow Automation & Integration Platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                <Workflow className="h-4 w-4 mr-2" />
                {metrics.totalFlows} Active Flows
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Platform Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Total Flows</p>
                  <p className="text-3xl font-bold text-white">{metrics.totalFlows}</p>
                </div>
                <Workflow className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{metrics.successRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-600 to-pink-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-200 text-sm font-medium">Total Executions</p>
                  <p className="text-3xl font-bold text-white">{metrics.totalExecutions.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Active Connections</p>
                  <p className="text-3xl font-bold text-white">{metrics.activeConnections}</p>
                </div>
                <Network className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Management */}
        <Tabs defaultValue="flows" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="flows" className="text-white">Workflows</TabsTrigger>
            <TabsTrigger value="connections" className="text-white">Connections</TabsTrigger>
            <TabsTrigger value="executions" className="text-white">Executions</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="flows" className="space-y-6">
            <div className="space-y-4">
              {flows.map((flow) => (
                <Card key={flow.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Puzzle className="h-5 w-5 text-orange-400" />
                        <CardTitle className="text-white text-xl">{flow.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(flow.status)} text-white border-0`}
                        >
                          {flow.status}
                        </Badge>
                        <span className="text-sm text-green-400">{flow.successRate}% success</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{flow.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Flow Details */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Flow Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Version:</span>
                            <span className="text-white">{flow.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Executions:</span>
                            <span className="text-white">{flow.executionCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg Time:</span>
                            <span className="text-white">{formatDuration(flow.averageExecutionTime)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Errors:</span>
                            <span className="text-red-400">{flow.errorCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Run:</span>
                            <span className="text-white">{flow.lastRun}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Next Run:</span>
                            <span className="text-white">{flow.nextRun}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trigger */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Trigger</h4>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTriggerIcon(flow.trigger.type)}
                            <span className="text-white font-medium">{flow.trigger.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(flow.trigger.status)} text-white border-0`}
                            >
                              {flow.trigger.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300">Type: {flow.trigger.type}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Actions ({flow.actions.length})</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {flow.actions.map((action, index) => (
                            <div key={action.id} className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded">
                              <div className="flex-shrink-0">
                                {getActionTypeIcon(action.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium text-sm">{action.name}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(action.status)} text-white border-0`}
                                  >
                                    {action.status}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400">{action.type} • {formatDuration(action.executionTime)}</p>
                                {action.error && (
                                  <p className="text-xs text-red-400 mt-1">{action.error}</p>
                                )}
                              </div>
                              {index < flow.actions.length - 1 && (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tags and Actions */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Tags:</span>
                        {flow.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <PlayCircle className="h-3 w-3 mr-2" />
                          Run
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Monitor className="h-3 w-3 mr-2" />
                          Monitor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {connections.map((connection) => (
                <Card key={connection.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Network className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{connection.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(connection.status)} text-white border-0`}
                      >
                        {connection.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{connection.type}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Usage:</span>
                        <p className="text-white font-medium">{connection.usage.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Credentials:</span>
                        <p className="text-white font-medium">{connection.credentials}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Used:</span>
                        <p className="text-white font-medium">{connection.lastUsed}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Endpoints:</span>
                        <p className="text-white font-medium">{connection.endpoints.length}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Available Endpoints</h4>
                      <div className="space-y-1">
                        {connection.endpoints.map((endpoint, index) => (
                          <Badge key={index} variant="outline" className="text-green-400 border-green-400 text-xs mr-1">
                            {endpoint}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Monitor className="h-3 w-3 mr-2" />
                        Test
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

          <TabsContent value="executions" className="space-y-6">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Execution History & Analytics Chart Component
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Flow Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Flow Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Connection Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Connection Health Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Error Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Error Tracking Chart Component
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

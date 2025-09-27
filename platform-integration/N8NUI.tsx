import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
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
  StopCircle,
  Node,
  GitCommit,
  GitBranch as GitBranchIcon,
  Link,
  Unlink,
  Split,
  Merge,
  Fork,
  Layers3,
  TreePine,
  Workflow as WorkflowIcon
} from 'lucide-react';

interface N8NWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'draft';
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
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
  trigger: WorkflowTrigger;
  settings: WorkflowSettings;
}

interface WorkflowNode {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'transform' | 'webhook' | 'schedule' | 'email' | 'database' | 'api' | 'file' | 'http';
  status: 'active' | 'inactive' | 'error';
  position: { x: number; y: number };
  parameters: any;
  credentials?: string;
  lastExecution?: string;
  executionTime?: number;
  error?: string;
}

interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  sourceOutput: string;
  targetInput: string;
  data?: any;
}

interface WorkflowTrigger {
  type: 'webhook' | 'schedule' | 'manual' | 'event';
  config: any;
  status: 'active' | 'inactive';
}

interface WorkflowSettings {
  executionOrder: 'parallel' | 'sequential';
  errorHandling: 'stop' | 'continue' | 'retry';
  timeout: number;
  retries: number;
  saveData: boolean;
  saveDataErrorExecution: boolean;
}

interface N8NCredential {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastUsed: string;
  usage: number;
  nodes: string[];
  security: 'encrypted' | 'plain';
}

interface N8NMetrics {
  totalWorkflows: number;
  activeWorkflows: number;
  totalExecutions: number;
  successRate: number;
  averageExecutionTime: number;
  errorRate: number;
  activeNodes: number;
  dataProcessed: number;
  webhooksActive: number;
}

export default function N8NUI() {
  const [workflows, setWorkflows] = useState<N8NWorkflow[]>([
    {
      id: '1',
      name: 'AI Data Processing Pipeline',
      description: 'Automated data ingestion, processing, and AI analysis workflow',
      status: 'active',
      nodes: [
        {
          id: '1',
          name: 'Webhook Trigger',
          type: 'webhook',
          status: 'active',
          position: { x: 100, y: 100 },
          parameters: { httpMethod: 'POST', path: '/webhook/data' },
          lastExecution: '2024-01-15 16:30:00',
          executionTime: 0.5
        },
        {
          id: '2',
          name: 'Data Validation',
          type: 'condition',
          status: 'active',
          position: { x: 300, y: 100 },
          parameters: { conditions: ['data_format_valid', 'required_fields_present'] },
          lastExecution: '2024-01-15 16:30:01',
          executionTime: 2.1
        },
        {
          id: '3',
          name: 'Data Transformation',
          type: 'transform',
          status: 'active',
          position: { x: 500, y: 100 },
          parameters: { transformations: ['normalize', 'clean', 'enrich'] },
          lastExecution: '2024-01-15 16:30:03',
          executionTime: 15.8
        },
        {
          id: '4',
          name: 'AI Analysis',
          type: 'api',
          status: 'active',
          position: { x: 700, y: 100 },
          parameters: { endpoint: '/api/ai/analyze', method: 'POST' },
          credentials: 'AI Service API',
          lastExecution: '2024-01-15 16:30:19',
          executionTime: 45.2
        },
        {
          id: '5',
          name: 'Save Results',
          type: 'database',
          status: 'active',
          position: { x: 900, y: 100 },
          parameters: { table: 'analysis_results', operation: 'insert' },
          credentials: 'Database Connection',
          lastExecution: '2024-01-15 16:31:04',
          executionTime: 8.7
        },
        {
          id: '6',
          name: 'Send Notification',
          type: 'email',
          status: 'active',
          position: { x: 1100, y: 100 },
          parameters: { template: 'analysis_complete', recipients: ['admin@company.com'] },
          credentials: 'Email Service',
          lastExecution: '2024-01-15 16:31:13',
          executionTime: 3.2
        }
      ],
      connections: [
        { id: '1', source: '1', target: '2', sourceOutput: 'main', targetInput: 'main' },
        { id: '2', source: '2', target: '3', sourceOutput: 'true', targetInput: 'main' },
        { id: '3', source: '3', target: '4', sourceOutput: 'main', targetInput: 'main' },
        { id: '4', source: '4', target: '5', sourceOutput: 'main', targetInput: 'main' },
        { id: '5', source: '5', target: '6', sourceOutput: 'main', targetInput: 'main' }
      ],
      trigger: {
        type: 'webhook',
        config: { httpMethod: 'POST', path: '/webhook/data' },
        status: 'active'
      },
      settings: {
        executionOrder: 'sequential',
        errorHandling: 'retry',
        timeout: 300,
        retries: 3,
        saveData: true,
        saveDataErrorExecution: true
      },
      lastRun: '2024-01-15 16:31:16',
      nextRun: 'On trigger',
      executionCount: 156,
      successRate: 98.7,
      averageExecutionTime: 75.5,
      errorCount: 2,
      tags: ['ai', 'data', 'processing', 'automation'],
      created: '2024-01-01',
      updated: '2024-01-15',
      version: '1.3.0'
    },
    {
      id: '2',
      name: 'Customer Support Automation',
      description: 'Automated customer support ticket processing and response system',
      status: 'active',
      nodes: [
        {
          id: '7',
          name: 'Email Trigger',
          type: 'trigger',
          status: 'active',
          position: { x: 100, y: 200 },
          parameters: { emailAccount: 'support@company.com', folder: 'INBOX' },
          lastExecution: '2024-01-15 16:25:00',
          executionTime: 1.0
        },
        {
          id: '8',
          name: 'Parse Email',
          type: 'transform',
          status: 'active',
          position: { x: 300, y: 200 },
          parameters: { extractFields: ['subject', 'body', 'sender', 'priority'] },
          lastExecution: '2024-01-15 16:25:01',
          executionTime: 2.5
        },
        {
          id: '9',
          name: 'Classify Ticket',
          type: 'api',
          status: 'active',
          position: { x: 500, y: 200 },
          parameters: { endpoint: '/api/classify-ticket', method: 'POST' },
          credentials: 'AI Classification API',
          lastExecution: '2024-01-15 16:25:04',
          executionTime: 8.3
        },
        {
          id: '10',
          name: 'Create Ticket',
          type: 'database',
          status: 'active',
          position: { x: 700, y: 200 },
          parameters: { table: 'support_tickets', operation: 'insert' },
          credentials: 'Database Connection',
          lastExecution: '2024-01-15 16:25:12',
          executionTime: 5.1
        },
        {
          id: '11',
          name: 'Auto Response',
          type: 'condition',
          status: 'active',
          position: { x: 900, y: 200 },
          parameters: { condition: 'priority == "low" AND category == "common"' },
          lastExecution: '2024-01-15 16:25:17',
          executionTime: 0.8
        },
        {
          id: '12',
          name: 'Send Response',
          type: 'email',
          status: 'active',
          position: { x: 1100, y: 200 },
          parameters: { template: 'auto_response', sender: 'support@company.com' },
          credentials: 'Email Service',
          lastExecution: '2024-01-15 16:25:18',
          executionTime: 2.7
        }
      ],
      connections: [
        { id: '6', source: '7', target: '8', sourceOutput: 'main', targetInput: 'main' },
        { id: '7', source: '8', target: '9', sourceOutput: 'main', targetInput: 'main' },
        { id: '8', source: '9', target: '10', sourceOutput: 'main', targetInput: 'main' },
        { id: '9', source: '10', target: '11', sourceOutput: 'main', targetInput: 'main' },
        { id: '10', source: '11', target: '12', sourceOutput: 'true', targetInput: 'main' }
      ],
      trigger: {
        type: 'event',
        config: { eventType: 'email.received' },
        status: 'active'
      },
      settings: {
        executionOrder: 'sequential',
        errorHandling: 'continue',
        timeout: 60,
        retries: 2,
        saveData: true,
        saveDataErrorExecution: false
      },
      lastRun: '2024-01-15 16:25:21',
      nextRun: 'On trigger',
      executionCount: 89,
      successRate: 96.6,
      averageExecutionTime: 20.4,
      errorCount: 3,
      tags: ['support', 'automation', 'email', 'ai'],
      created: '2024-01-10',
      updated: '2024-01-14',
      version: '2.1.0'
    },
    {
      id: '3',
      name: 'Financial Data Sync',
      description: 'Synchronize financial data across multiple systems and databases',
      status: 'inactive',
      nodes: [
        {
          id: '13',
          name: 'Schedule Trigger',
          type: 'schedule',
          status: 'inactive',
          position: { x: 100, y: 300 },
          parameters: { cron: '0 */6 * * *', timezone: 'UTC' }
        },
        {
          id: '14',
          name: 'Fetch Data',
          type: 'api',
          status: 'inactive',
          position: { x: 300, y: 300 },
          parameters: { endpoint: '/api/financial-data', method: 'GET' },
          credentials: 'Financial API',
          error: 'API endpoint not responding'
        }
      ],
      connections: [
        { id: '11', source: '13', target: '14', sourceOutput: 'main', targetInput: 'main' }
      ],
      trigger: {
        type: 'schedule',
        config: { cron: '0 */6 * * *', timezone: 'UTC' },
        status: 'inactive'
      },
      settings: {
        executionOrder: 'sequential',
        errorHandling: 'stop',
        timeout: 120,
        retries: 1,
        saveData: true,
        saveDataErrorExecution: true
      },
      lastRun: '2024-01-15 12:00:00',
      nextRun: '2024-01-15 18:00:00',
      executionCount: 12,
      successRate: 83.3,
      averageExecutionTime: 45.2,
      errorCount: 2,
      tags: ['financial', 'sync', 'data'],
      created: '2024-01-05',
      updated: '2024-01-12',
      version: '1.0.2'
    }
  ]);

  const [credentials, setCredentials] = useState<N8NCredential[]>([
    {
      id: '1',
      name: 'AI Service API',
      type: 'HTTP Request',
      status: 'connected',
      lastUsed: '2024-01-15 16:30:19',
      usage: 156,
      nodes: ['AI Analysis'],
      security: 'encrypted'
    },
    {
      id: '2',
      name: 'Database Connection',
      type: 'PostgreSQL',
      status: 'connected',
      lastUsed: '2024-01-15 16:31:04',
      usage: 89,
      nodes: ['Save Results', 'Create Ticket'],
      security: 'encrypted'
    },
    {
      id: '3',
      name: 'Email Service',
      type: 'SMTP',
      status: 'connected',
      lastUsed: '2024-01-15 16:31:13',
      usage: 67,
      nodes: ['Send Notification', 'Send Response'],
      security: 'encrypted'
    },
    {
      id: '4',
      name: 'Financial API',
      type: 'REST API',
      status: 'error',
      lastUsed: '2024-01-15 12:00:00',
      usage: 12,
      nodes: ['Fetch Data'],
      security: 'encrypted'
    }
  ]);

  const [metrics, setMetrics] = useState<N8NMetrics>({
    totalWorkflows: 3,
    activeWorkflows: 2,
    totalExecutions: 257,
    successRate: 97.3,
    averageExecutionTime: 47.0,
    errorRate: 2.7,
    activeNodes: 18,
    dataProcessed: 890000,
    webhooksActive: 1
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
      case 'connected': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'disconnected': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap className="h-4 w-4 text-green-400" />;
      case 'webhook': return <Globe className="h-4 w-4 text-blue-400" />;
      case 'schedule': return <Clock className="h-4 w-4 text-purple-400" />;
      case 'condition': return <Target className="h-4 w-4 text-orange-400" />;
      case 'transform': return <Wand2 className="h-4 w-4 text-pink-400" />;
      case 'api': return <Network className="h-4 w-4 text-cyan-400" />;
      case 'database': return <Database className="h-4 w-4 text-green-400" />;
      case 'email': return <Mail className="h-4 w-4 text-yellow-400" />;
      case 'file': return <FileText className="h-4 w-4 text-indigo-400" />;
      case 'http': return <Globe className="h-4 w-4 text-blue-400" />;
      default: return <Node className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'webhook': return <Globe className="h-4 w-4 text-blue-400" />;
      case 'schedule': return <Clock className="h-4 w-4 text-green-400" />;
      case 'event': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'manual': return <Play className="h-4 w-4 text-purple-400" />;
      default: return <Workflow className="h-4 w-4 text-gray-400" />;
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
                N8N Workflow Automation
              </h1>
              <p className="text-xl text-blue-200">
                Node-Based Workflow Automation & Integration Platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                <Network className="h-4 w-4 mr-2" />
                {metrics.totalWorkflows} Workflows
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                N8N Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Workflows</p>
                  <p className="text-3xl font-bold text-white">{metrics.totalWorkflows}</p>
                </div>
                <Workflow className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-600 to-indigo-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-200 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{metrics.successRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Executions</p>
                  <p className="text-3xl font-bold text-white">{metrics.totalExecutions.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-200 text-sm font-medium">Active Nodes</p>
                  <p className="text-3xl font-bold text-white">{metrics.activeNodes}</p>
                </div>
                <Node className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Management */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="workflows" className="text-white">Workflows</TabsTrigger>
            <TabsTrigger value="nodes" className="text-white">Nodes</TabsTrigger>
            <TabsTrigger value="credentials" className="text-white">Credentials</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Network className="h-5 w-5 text-blue-400" />
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
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Workflow Details */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Workflow Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Version:</span>
                            <span className="text-white">{workflow.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Nodes:</span>
                            <span className="text-white">{workflow.nodes.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Executions:</span>
                            <span className="text-white">{workflow.executionCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg Time:</span>
                            <span className="text-white">{formatDuration(workflow.averageExecutionTime)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Errors:</span>
                            <span className="text-red-400">{workflow.errorCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Run:</span>
                            <span className="text-white">{workflow.lastRun}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trigger */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Trigger</h4>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTriggerIcon(workflow.trigger.type)}
                            <span className="text-white font-medium">{workflow.trigger.type}</span>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(workflow.trigger.status)} text-white border-0`}
                            >
                              {workflow.trigger.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300">
                            {workflow.trigger.type === 'webhook' && `Path: ${workflow.trigger.config.path}`}
                            {workflow.trigger.type === 'schedule' && `Cron: ${workflow.trigger.config.cron}`}
                            {workflow.trigger.type === 'event' && `Event: ${workflow.trigger.config.eventType}`}
                          </p>
                        </div>
                      </div>

                      {/* Node Flow */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Node Flow</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {workflow.nodes.map((node, index) => (
                            <div key={node.id} className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded">
                              <div className="flex-shrink-0">
                                {getNodeTypeIcon(node.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium text-sm">{node.name}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(node.status)} text-white border-0`}
                                  >
                                    {node.status}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400">{node.type}</p>
                                {node.error && (
                                  <p className="text-xs text-red-400 mt-1">{node.error}</p>
                                )}
                              </div>
                              {index < workflow.nodes.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Settings */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Settings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Execution:</span>
                            <span className="text-white">{workflow.settings.executionOrder}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Error Handling:</span>
                            <span className="text-white">{workflow.settings.errorHandling}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Timeout:</span>
                            <span className="text-white">{workflow.settings.timeout}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Retries:</span>
                            <span className="text-white">{workflow.settings.retries}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Save Data:</span>
                            <span className="text-white">{workflow.settings.saveData ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags and Actions */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Tags:</span>
                        {workflow.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <PlayCircle className="h-3 w-3 mr-2" />
                          Execute
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

          <TabsContent value="nodes" className="space-y-6">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Node Editor & Flow Designer Component
            </div>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {credentials.map((credential) => (
                <Card key={credential.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-5 w-5 text-green-400" />
                        <CardTitle className="text-white text-lg">{credential.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(credential.status)} text-white border-0`}
                      >
                        {credential.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{credential.type}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Usage:</span>
                        <p className="text-white font-medium">{credential.usage.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Security:</span>
                        <p className="text-white font-medium">{credential.security}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Used:</span>
                        <p className="text-white font-medium">{credential.lastUsed}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Nodes:</span>
                        <p className="text-white font-medium">{credential.nodes.length}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Used by Nodes</h4>
                      <div className="space-y-1">
                        {credential.nodes.map((node, index) => (
                          <Badge key={index} variant="outline" className="text-green-400 border-green-400 text-xs mr-1">
                            {node}
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

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Workflow Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Workflow Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Node Execution Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Node Execution Times Chart Component
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

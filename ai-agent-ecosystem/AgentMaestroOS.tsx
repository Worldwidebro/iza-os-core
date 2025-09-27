import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Bot, 
  Cpu, 
  Network, 
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
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Users,
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
  Workflow,
  Command,
  Sparkles,
  Wand2,
  Cog,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  type: 'assistant' | 'analyst' | 'automation' | 'security' | 'communication' | 'creative' | 'research' | 'trading';
  status: 'active' | 'idle' | 'busy' | 'error' | 'maintenance' | 'offline';
  priority: 'high' | 'medium' | 'low';
  capabilities: string[];
  performance: AgentPerformance;
  tasks: AgentTask[];
  resources: AgentResources;
  connections: string[];
  lastActivity: string;
  uptime: number;
  version: string;
  location: string;
}

interface AgentPerformance {
  responseTime: number;
  accuracy: number;
  throughput: number;
  errorRate: number;
  satisfaction: number;
  efficiency: number;
  learningRate: number;
  memoryUsage: number;
  cpuUsage: number;
  networkUsage: number;
}

interface AgentTask {
  id: string;
  name: string;
  type: 'processing' | 'analysis' | 'communication' | 'automation' | 'monitoring' | 'learning';
  status: 'running' | 'queued' | 'completed' | 'failed' | 'paused';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  startTime: string;
  estimatedDuration: number;
  actualDuration: number;
  input: any;
  output: any;
  dependencies: string[];
}

interface AgentResources {
  memory: number;
  cpu: number;
  storage: number;
  network: number;
  gpu: number;
  models: string[];
  apis: string[];
  databases: string[];
}

interface OrchestrationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  target: string;
  status: 'active' | 'inactive' | 'testing';
  priority: number;
  executionCount: number;
  successRate: number;
  lastExecuted: string;
}

export default function AgentMaestroOS() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: '1',
      name: 'ROMA - Research Orchestration Manager',
      type: 'assistant',
      status: 'active',
      priority: 'high',
      capabilities: ['Research', 'Analysis', 'Documentation', 'Knowledge Management'],
      performance: {
        responseTime: 1.2,
        accuracy: 96.8,
        throughput: 150,
        errorRate: 0.02,
        satisfaction: 94,
        efficiency: 92,
        learningRate: 0.15,
        memoryUsage: 68,
        cpuUsage: 45,
        networkUsage: 23
      },
      tasks: [
        {
          id: '1',
          name: 'Market Research Analysis',
          type: 'analysis',
          status: 'running',
          priority: 'high',
          progress: 75,
          startTime: '2024-01-15 16:30:00',
          estimatedDuration: 1800,
          actualDuration: 1350,
          input: { topic: 'AI Banking Trends', sources: 50 },
          output: null,
          dependencies: []
        }
      ],
      resources: {
        memory: 8,
        cpu: 4,
        storage: 256,
        network: 100,
        gpu: 0,
        models: ['GPT-4', 'Claude-3', 'Research-LLM'],
        apis: ['Research API', 'News API', 'Academic API'],
        databases: ['Knowledge Base', 'Research Database']
      },
      connections: ['Dria', 'CrewAI', 'Knowledge Graph'],
      lastActivity: '2 minutes ago',
      uptime: 99.8,
      version: '2.1.0',
      location: 'Primary Cluster'
    },
    {
      id: '2',
      name: 'Dria - Data Intelligence Assistant',
      type: 'analyst',
      status: 'active',
      priority: 'high',
      capabilities: ['Data Analysis', 'Visualization', 'Insights', 'Reporting'],
      performance: {
        responseTime: 0.8,
        accuracy: 98.2,
        throughput: 280,
        errorRate: 0.01,
        satisfaction: 96,
        efficiency: 95,
        learningRate: 0.12,
        memoryUsage: 72,
        cpuUsage: 52,
        networkUsage: 31
      },
      tasks: [
        {
          id: '2',
          name: 'Financial Data Processing',
          type: 'processing',
          status: 'completed',
          priority: 'high',
          progress: 100,
          startTime: '2024-01-15 16:00:00',
          estimatedDuration: 900,
          actualDuration: 845,
          input: { dataset: 'Q4 Financial Data', size: '2.5GB' },
          output: { insights: 15, charts: 8, recommendations: 3 },
          dependencies: []
        }
      ],
      resources: {
        memory: 12,
        cpu: 6,
        storage: 512,
        network: 150,
        gpu: 2,
        models: ['Data-Analysis-Model', 'Visualization-LLM'],
        apis: ['Financial API', 'Visualization API'],
        databases: ['Financial DB', 'Analytics DB']
      },
      connections: ['ROMA', 'CrewAI', 'Business Intelligence'],
      lastActivity: '5 minutes ago',
      uptime: 99.9,
      version: '1.8.5',
      location: 'Analytics Cluster'
    },
    {
      id: '3',
      name: 'CrewAI - Collaborative Workflow Engine',
      type: 'automation',
      status: 'active',
      priority: 'high',
      capabilities: ['Workflow Management', 'Task Orchestration', 'Team Coordination'],
      performance: {
        responseTime: 0.5,
        accuracy: 99.1,
        throughput: 420,
        errorRate: 0.005,
        satisfaction: 98,
        efficiency: 97,
        learningRate: 0.08,
        memoryUsage: 45,
        cpuUsage: 38,
        networkUsage: 18
      },
      tasks: [
        {
          id: '3',
          name: 'Daily Operations Workflow',
          type: 'automation',
          status: 'running',
          priority: 'medium',
          progress: 60,
          startTime: '2024-01-15 16:15:00',
          estimatedDuration: 3600,
          actualDuration: 2160,
          input: { workflow: 'Daily Operations', tasks: 25 },
          output: null,
          dependencies: ['ROMA', 'Dria']
        }
      ],
      resources: {
        memory: 6,
        cpu: 3,
        storage: 128,
        network: 75,
        gpu: 0,
        models: ['Workflow-LLM', 'Coordination-Model'],
        apis: ['Workflow API', 'Task API'],
        databases: ['Workflow DB', 'Task DB']
      },
      connections: ['ROMA', 'Dria', 'All Agents'],
      lastActivity: '1 minute ago',
      uptime: 99.95,
      version: '3.0.2',
      location: 'Orchestration Cluster'
    },
    {
      id: '4',
      name: 'Guardian - Security Intelligence',
      type: 'security',
      status: 'active',
      priority: 'high',
      capabilities: ['Threat Detection', 'Security Analysis', 'Incident Response'],
      performance: {
        responseTime: 0.3,
        accuracy: 99.5,
        throughput: 600,
        errorRate: 0.001,
        satisfaction: 99,
        efficiency: 98,
        learningRate: 0.05,
        memoryUsage: 38,
        cpuUsage: 42,
        networkUsage: 28
      },
      tasks: [
        {
          id: '4',
          name: 'Threat Monitoring',
          type: 'monitoring',
          status: 'running',
          priority: 'high',
          progress: 100,
          startTime: '2024-01-15 16:45:00',
          estimatedDuration: 0,
          actualDuration: 0,
          input: { scope: 'All Systems', sensitivity: 'High' },
          output: null,
          dependencies: []
        }
      ],
      resources: {
        memory: 4,
        cpu: 2,
        storage: 64,
        network: 50,
        gpu: 1,
        models: ['Security-Model', 'Threat-Detection-LLM'],
        apis: ['Security API', 'Threat Intel API'],
        databases: ['Security DB', 'Threat DB']
      },
      connections: ['All Agents', 'Security Systems'],
      lastActivity: '30 seconds ago',
      uptime: 99.99,
      version: '1.5.8',
      location: 'Security Cluster'
    },
    {
      id: '5',
      name: 'Nexus - Communication Hub',
      type: 'communication',
      status: 'idle',
      priority: 'medium',
      capabilities: ['Multi-Channel Communication', 'Translation', 'Sentiment Analysis'],
      performance: {
        responseTime: 0.9,
        accuracy: 95.5,
        throughput: 180,
        errorRate: 0.03,
        satisfaction: 91,
        efficiency: 88,
        learningRate: 0.18,
        memoryUsage: 55,
        cpuUsage: 35,
        networkUsage: 45
      },
      tasks: [],
      resources: {
        memory: 8,
        cpu: 4,
        storage: 128,
        network: 200,
        gpu: 0,
        models: ['Communication-LLM', 'Translation-Model'],
        apis: ['Communication API', 'Translation API'],
        databases: ['Communication DB', 'Translation Cache']
      },
      connections: ['All Agents', 'External APIs'],
      lastActivity: '15 minutes ago',
      uptime: 99.5,
      version: '2.0.1',
      location: 'Communication Cluster'
    },
    {
      id: '6',
      name: 'Artisan - Creative Assistant',
      type: 'creative',
      status: 'busy',
      priority: 'low',
      capabilities: ['Content Creation', 'Design', 'Creative Writing', 'Media Production'],
      performance: {
        responseTime: 2.1,
        accuracy: 92.3,
        throughput: 85,
        errorRate: 0.05,
        satisfaction: 89,
        efficiency: 85,
        learningRate: 0.22,
        memoryUsage: 78,
        cpuUsage: 65,
        networkUsage: 12
      },
      tasks: [
        {
          id: '5',
          name: 'Marketing Content Generation',
          type: 'processing',
          status: 'running',
          priority: 'medium',
          progress: 45,
          startTime: '2024-01-15 16:20:00',
          estimatedDuration: 2400,
          actualDuration: 1080,
          input: { type: 'Marketing Campaign', requirements: 'Banking Services' },
          output: null,
          dependencies: []
        }
      ],
      resources: {
        memory: 16,
        cpu: 8,
        storage: 1024,
        network: 100,
        gpu: 4,
        models: ['Creative-LLM', 'Design-Model', 'Media-Model'],
        apis: ['Creative API', 'Design API', 'Media API'],
        databases: ['Creative DB', 'Asset DB']
      },
      connections: ['Nexus', 'Content Management'],
      lastActivity: '3 minutes ago',
      uptime: 98.8,
      version: '1.3.4',
      location: 'Creative Cluster'
    }
  ]);

  const [orchestrationRules, setOrchestrationRules] = useState<OrchestrationRule[]>([
    {
      id: '1',
      name: 'Auto-Scale Agents',
      description: 'Automatically scale agent resources based on workload',
      trigger: 'High CPU Usage',
      condition: 'cpu_usage > 80% for 5 minutes',
      action: 'Increase Resources',
      target: 'All Agents',
      status: 'active',
      priority: 1,
      executionCount: 45,
      successRate: 98.5,
      lastExecuted: '2024-01-15 16:30:00'
    },
    {
      id: '2',
      name: 'Failover Protocol',
      description: 'Automatically switch to backup agents on failure',
      trigger: 'Agent Failure',
      condition: 'agent_status == "error"',
      action: 'Activate Backup',
      target: 'Failed Agent',
      status: 'active',
      priority: 1,
      executionCount: 3,
      successRate: 100,
      lastExecuted: '2024-01-15 14:22:00'
    },
    {
      id: '3',
      name: 'Load Balancing',
      description: 'Distribute tasks across available agents',
      trigger: 'Task Queue',
      condition: 'queue_length > 10',
      action: 'Redistribute Tasks',
      target: 'Idle Agents',
      status: 'active',
      priority: 2,
      executionCount: 128,
      successRate: 95.3,
      lastExecuted: '2024-01-15 16:25:00'
    },
    {
      id: '4',
      name: 'Security Monitoring',
      description: 'Monitor all agents for security threats',
      trigger: 'Continuous',
      condition: 'always',
      action: 'Monitor Security',
      target: 'All Agents',
      status: 'active',
      priority: 1,
      executionCount: 2880,
      successRate: 99.9,
      lastExecuted: '2024-01-15 16:45:00'
    }
  ]);

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
      case 'idle': return 'bg-blue-500';
      case 'busy': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'maintenance': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assistant': return <Brain className="h-4 w-4 text-blue-400" />;
      case 'analyst': return <BarChart3 className="h-4 w-4 text-green-400" />;
      case 'automation': return <Workflow className="h-4 w-4 text-purple-400" />;
      case 'security': return <Shield className="h-4 w-4 text-red-400" />;
      case 'communication': return <Network className="h-4 w-4 text-yellow-400" />;
      case 'creative': return <Sparkles className="h-4 w-4 text-pink-400" />;
      case 'research': return <Search className="h-4 w-4 text-indigo-400" />;
      case 'trading': return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      default: return <Bot className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Agent Maestro OS
              </h1>
              <p className="text-xl text-purple-200">
                AI Agent Orchestration & Management System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                <Bot className="h-4 w-4 mr-2" />
                {agents.length} Active Agents
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Maestro Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Agent Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Agents</p>
                  <p className="text-3xl font-bold text-white">{agents.length}</p>
                </div>
                <Bot className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Active Agents</p>
                  <p className="text-3xl font-bold text-white">
                    {agents.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Avg Performance</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(agents.reduce((sum, a) => sum + a.performance.efficiency, 0) / agents.length)}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Orchestration Rules</p>
                  <p className="text-3xl font-bold text-white">{orchestrationRules.length}</p>
                </div>
                <Command className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Management */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="agents" className="text-white">Agents</TabsTrigger>
            <TabsTrigger value="orchestration" className="text-white">Orchestration</TabsTrigger>
            <TabsTrigger value="performance" className="text-white">Performance</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(agent.type)}
                        <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(agent.status)} text-white border-0`}
                        >
                          {agent.status}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(agent.priority)}`}>
                          {agent.priority}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Version:</span>
                        <p className="text-white font-medium">{agent.version}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Uptime:</span>
                        <p className="text-white font-medium">{agent.uptime}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <p className="text-white font-medium">{agent.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Activity:</span>
                        <p className="text-white font-medium">{agent.lastActivity}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center p-2 bg-gray-700/50 rounded">
                          <p className="text-gray-400">Response Time</p>
                          <p className="text-white font-medium">{agent.performance.responseTime}s</p>
                        </div>
                        <div className="text-center p-2 bg-gray-700/50 rounded">
                          <p className="text-gray-400">Accuracy</p>
                          <p className="text-white font-medium">{agent.performance.accuracy}%</p>
                        </div>
                        <div className="text-center p-2 bg-gray-700/50 rounded">
                          <p className="text-gray-400">Throughput</p>
                          <p className="text-white font-medium">{agent.performance.throughput}/h</p>
                        </div>
                        <div className="text-center p-2 bg-gray-700/50 rounded">
                          <p className="text-gray-400">Efficiency</p>
                          <p className="text-white font-medium">{agent.performance.efficiency}%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Resource Usage</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">CPU</span>
                            <span className="text-white">{agent.performance.cpuUsage}%</span>
                          </div>
                          <Progress value={agent.performance.cpuUsage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Memory</span>
                            <span className="text-white">{agent.performance.memoryUsage}%</span>
                          </div>
                          <Progress value={agent.performance.memoryUsage} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Capabilities</h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {agent.tasks.length > 0 && (
                      <div>
                        <h4 className="text-white text-sm font-medium mb-2">Active Tasks</h4>
                        <div className="space-y-2">
                          {agent.tasks.map((task) => (
                            <div key={task.id} className="p-2 bg-gray-700/50 rounded text-sm">
                              <div className="flex justify-between">
                                <span className="text-white font-medium">{task.name}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(task.status)} text-white border-0`}
                                >
                                  {task.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>{task.type}</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
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
                      <div className="flex items-center space-x-1">
                        <Wifi className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">Connected</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orchestration" className="space-y-6">
            <div className="space-y-4">
              {orchestrationRules.map((rule) => (
                <Card key={rule.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Command className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-white text-xl">{rule.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(rule.status)} text-white border-0`}
                        >
                          {rule.status}
                        </Badge>
                        <span className="text-sm text-green-400">{rule.successRate}% success</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{rule.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Rule Logic</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Trigger:</span>
                            <span className="text-white">{rule.trigger}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Condition:</span>
                            <span className="text-white">{rule.condition}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Action:</span>
                            <span className="text-white">{rule.action}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Target:</span>
                            <span className="text-white">{rule.target}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Execution Stats</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Executions:</span>
                            <span className="text-white">{rule.executionCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Success Rate:</span>
                            <span className="text-green-400">{rule.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Priority:</span>
                            <span className="text-white">{rule.priority}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Executed:</span>
                            <span className="text-white">{rule.lastExecuted}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Performance</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Success Rate</span>
                              <span className="text-white">{rule.successRate}%</span>
                            </div>
                            <Progress value={rule.successRate} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Actions</h4>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                            <Play className="h-3 w-3 mr-2" />
                            Execute
                          </Button>
                          <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                            <Settings className="h-3 w-3 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Agent Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Agent Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Resource Utilization Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Task Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Task Distribution Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Orchestration Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Orchestration Efficiency Chart Component
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Agent Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Real-time Agent Status Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    System Health Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Topology</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Network Topology Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Alert Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Alert Dashboard Chart Component
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

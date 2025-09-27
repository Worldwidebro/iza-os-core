import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Cpu, 
  MemoryStick, 
  Network, 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  Square,
  RotateCcw,
  Monitor,
  Server,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  TrendingUp,
  Globe,
  Shield,
  Database
} from 'lucide-react';

interface AIComponent {
  id: string;
  name: string;
  type: 'neural-network' | 'decision-engine' | 'learning-system' | 'optimization-engine';
  status: 'active' | 'idle' | 'learning' | 'error';
  performance: number;
  memoryUsage: number;
  cpuUsage: number;
  uptime: string;
  lastUpdate: string;
  tasks: AITask[];
}

interface AITask {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  actualTime?: string;
  resourceUsage: {
    cpu: number;
    memory: number;
    network: number;
  };
}

interface SystemMetrics {
  totalProcessingPower: number;
  activeNeuralNetworks: number;
  learningAccuracy: number;
  decisionSpeed: number;
  optimizationEfficiency: number;
  systemIntelligence: number;
}

export default function AIOSUI() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalProcessingPower: 98,
    activeNeuralNetworks: 47,
    learningAccuracy: 96,
    decisionSpeed: 94,
    optimizationEfficiency: 92,
    systemIntelligence: 95
  });

  const [aiComponents, setAIComponents] = useState<AIComponent[]>([
    {
      id: '1',
      name: 'Strategic Decision Engine',
      type: 'decision-engine',
      status: 'active',
      performance: 98,
      memoryUsage: 45,
      cpuUsage: 67,
      uptime: '99.9%',
      lastUpdate: '2 minutes ago',
      tasks: [
        {
          id: '1-1',
          name: 'Market Analysis',
          description: 'Analyzing global market trends and opportunities',
          status: 'running',
          progress: 75,
          priority: 'high',
          estimatedTime: '5 minutes',
          resourceUsage: { cpu: 45, memory: 32, network: 15 }
        },
        {
          id: '1-2',
          name: 'Risk Assessment',
          description: 'Evaluating investment risks and mitigation strategies',
          status: 'completed',
          progress: 100,
          priority: 'high',
          estimatedTime: '3 minutes',
          actualTime: '2.5 minutes',
          resourceUsage: { cpu: 38, memory: 28, network: 12 }
        }
      ]
    },
    {
      id: '2',
      name: 'Consciousness Integration Network',
      type: 'neural-network',
      status: 'learning',
      performance: 96,
      memoryUsage: 78,
      cpuUsage: 82,
      uptime: '99.8%',
      lastUpdate: '1 minute ago',
      tasks: [
        {
          id: '2-1',
          name: 'Pattern Recognition',
          description: 'Learning from human consciousness patterns',
          status: 'running',
          progress: 60,
          priority: 'high',
          estimatedTime: '15 minutes',
          resourceUsage: { cpu: 72, memory: 65, network: 25 }
        },
        {
          id: '2-2',
          name: 'Consciousness Mapping',
          description: 'Mapping consciousness states to business outcomes',
          status: 'queued',
          progress: 0,
          priority: 'medium',
          estimatedTime: '10 minutes',
          resourceUsage: { cpu: 55, memory: 45, network: 18 }
        }
      ]
    },
    {
      id: '3',
      name: 'Business Optimization Engine',
      type: 'optimization-engine',
      status: 'active',
      performance: 94,
      memoryUsage: 52,
      cpuUsage: 58,
      uptime: '99.9%',
      lastUpdate: '3 minutes ago',
      tasks: [
        {
          id: '3-1',
          name: 'Process Optimization',
          description: 'Optimizing business processes for maximum efficiency',
          status: 'running',
          progress: 85,
          priority: 'medium',
          estimatedTime: '8 minutes',
          resourceUsage: { cpu: 48, memory: 35, network: 20 }
        }
      ]
    },
    {
      id: '4',
      name: 'Learning & Adaptation System',
      type: 'learning-system',
      status: 'idle',
      performance: 92,
      memoryUsage: 38,
      cpuUsage: 25,
      uptime: '99.7%',
      lastUpdate: '5 minutes ago',
      tasks: [
        {
          id: '4-1',
          name: 'Model Training',
          description: 'Training AI models on new data patterns',
          status: 'completed',
          progress: 100,
          priority: 'low',
          estimatedTime: '30 minutes',
          actualTime: '28 minutes',
          resourceUsage: { cpu: 85, memory: 70, network: 35 }
        }
      ]
    }
  ]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'learning': return 'bg-blue-500';
      case 'idle': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'neural-network': return <Brain className="h-4 w-4" />;
      case 'decision-engine': return <Target className="h-4 w-4" />;
      case 'learning-system': return <TrendingUp className="h-4 w-4" />;
      case 'optimization-engine': return <Zap className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Clock className="h-4 w-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'queued': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
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

  const handleComponentAction = (componentId: string, action: string) => {
    setAIComponents(prev => prev.map(component => {
      if (component.id === componentId) {
        switch (action) {
          case 'start':
            return { ...component, status: 'active' };
          case 'stop':
            return { ...component, status: 'idle' };
          case 'restart':
            return { ...component, status: 'active' };
          default:
            return component;
        }
      }
      return component;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                IZA AI Operating System
              </h1>
              <p className="text-xl text-blue-200">
                Advanced AI Intelligence & Neural Network Management Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Brain className="h-4 w-4 mr-2" />
                Intelligence: {systemMetrics.systemIntelligence}%
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                AI Settings
              </Button>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Processing Power</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.totalProcessingPower}%</p>
                </div>
                <Cpu className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Neural Networks</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.activeNeuralNetworks}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Learning Accuracy</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.learningAccuracy}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Decision Speed</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.decisionSpeed}%</p>
                </div>
                <Target className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-200 text-sm font-medium">Optimization Efficiency</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.optimizationEfficiency}%</p>
                </div>
                <Zap className="h-8 w-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-600 to-pink-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-200 text-sm font-medium">System Intelligence</p>
                  <p className="text-3xl font-bold text-white">{systemMetrics.systemIntelligence}%</p>
                </div>
                <Brain className="h-8 w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Component Management */}
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="components" className="text-white">AI Components</TabsTrigger>
            <TabsTrigger value="tasks" className="text-white">Task Management</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">AI Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {aiComponents.map((component) => (
                <Card key={component.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(component.type)}
                        <CardTitle className="text-white text-lg">{component.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(component.status)} text-white border-0`}
                      >
                        {component.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <p className="text-white font-medium">{component.performance}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Uptime:</span>
                        <p className="text-white font-medium">{component.uptime}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Memory:</span>
                        <p className="text-white font-medium">{component.memoryUsage}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">CPU:</span>
                        <p className="text-white font-medium">{component.cpuUsage}%</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Performance</span>
                        <span className="text-white font-medium">{component.performance}%</span>
                      </div>
                      <Progress value={component.performance} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          {component.tasks.length} tasks
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleComponentAction(component.id, component.status === 'active' ? 'stop' : 'start')}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          {component.status === 'active' ? <Square className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedComponent(component.id)}
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="space-y-4">
              {aiComponents.map((component) => (
                <Card key={component.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(component.type)}
                        <CardTitle className="text-white">{component.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {component.tasks.filter(t => t.status === 'running').length} Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {component.tasks.map((task) => (
                        <div key={task.id} className="p-4 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              {getTaskStatusIcon(task.status)}
                              <h3 className="text-white font-medium">{task.name}</h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant="outline" 
                                className={`${getStatusColor(task.status)} text-white border-0`}
                              >
                                {task.status}
                              </Badge>
                              <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Progress:</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={task.progress} className="h-1 flex-1" />
                                <span className="text-white font-medium">{task.progress}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400">Estimated Time:</span>
                              <p className="text-white font-medium">{task.estimatedTime}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Actual Time:</span>
                              <p className="text-white font-medium">{task.actualTime || 'In Progress'}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">CPU:</span>
                              <span className="text-white">{task.resourceUsage.cpu}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Memory:</span>
                              <span className="text-white">{task.resourceUsage.memory}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Network:</span>
                              <span className="text-white">{task.resourceUsage.network}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
                  <CardTitle className="text-white">AI Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Performance Trends Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Neural Network Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Neural Network Activity Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Learning Progress Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System Resource Usage</CardTitle>
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

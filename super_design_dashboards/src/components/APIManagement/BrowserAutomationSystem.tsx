import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Code, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Link,
  Database,
  Shield,
  Zap,
  Activity,
  Bot,
  Brain
} from 'lucide-react';

interface BrowserAgent {
  id: string;
  name: string;
  type: 'browser' | 'stagebrowser' | 'browserhand' | 'agentx' | 'agents';
  status: 'active' | 'idle' | 'working' | 'error';
  capabilities: string[];
  currentTask?: string;
  progress?: number;
  lastActivity?: string;
  discoveredEndpoints: number;
  testedEndpoints: number;
  successRate: number;
}

interface DiscoveredEndpoint {
  id: string;
  name: string;
  url: string;
  method: string;
  category: string;
  status: 'discovered' | 'testing' | 'integrated' | 'failed';
  source: 'browser' | 'documentation' | 'api' | 'manual';
  authentication?: string;
  parameters?: Record<string, any>;
  response?: any;
  discoveredAt: string;
  testedAt?: string;
  integratedAt?: string;
  confidence: number;
}

interface BrowserTask {
  id: string;
  name: string;
  description: string;
  type: 'discovery' | 'testing' | 'integration' | 'monitoring';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedAgent?: string;
  progress: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
  targetUrl?: string;
  expectedOutcome?: string;
}

export const BrowserAutomationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agents' | 'discovery' | 'tasks' | 'monitoring'>('agents');
  const [browserAgents, setBrowserAgents] = useState<BrowserAgent[]>([]);
  const [discoveredEndpoints, setDiscoveredEndpoints] = useState<DiscoveredEndpoint[]>([]);
  const [browserTasks, setBrowserTasks] = useState<BrowserTask[]>([]);
  const [isDeployingAgent, setIsDeployingAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    // Initialize browser agents
    setBrowserAgents([
      {
        id: '1',
        name: 'Web Scraper Bot',
        type: 'browser',
        status: 'active',
        capabilities: ['web_scraping', 'form_interaction', 'element_detection', 'api_discovery'],
        currentTask: 'Scanning documentation sites for API endpoints',
        progress: 65,
        lastActivity: '2025-01-20T20:55:00Z',
        discoveredEndpoints: 15,
        testedEndpoints: 12,
        successRate: 92.3
      },
      {
        id: '2',
        name: 'Stage Browser Agent',
        type: 'stagebrowser',
        status: 'working',
        capabilities: ['staged_browsing', 'multi_tab_management', 'session_persistence', 'api_testing'],
        currentTask: 'Testing discovered endpoints in staged environment',
        progress: 40,
        lastActivity: '2025-01-20T20:56:30Z',
        discoveredEndpoints: 8,
        testedEndpoints: 6,
        successRate: 88.7
      },
      {
        id: '3',
        name: 'Browser Hand Controller',
        type: 'browserhand',
        status: 'idle',
        capabilities: ['hand_gesture_control', 'visual_recognition', 'automated_interaction', 'ui_testing'],
        currentTask: undefined,
        progress: 0,
        lastActivity: '2025-01-20T20:50:00Z',
        discoveredEndpoints: 0,
        testedEndpoints: 5,
        successRate: 95.2
      },
      {
        id: '4',
        name: 'Agent X Coordinator',
        type: 'agentx',
        status: 'active',
        capabilities: ['multi_agent_coordination', 'task_distribution', 'result_aggregation', 'workflow_management'],
        currentTask: 'Coordinating multi-agent API discovery workflow',
        progress: 80,
        lastActivity: '2025-01-20T20:54:15Z',
        discoveredEndpoints: 25,
        testedEndpoints: 20,
        successRate: 89.1
      },
      {
        id: '5',
        name: 'Agents Swarm',
        type: 'agents',
        status: 'active',
        capabilities: ['swarm_intelligence', 'distributed_computing', 'parallel_processing', 'collective_learning'],
        currentTask: 'Parallel API discovery across multiple domains',
        progress: 55,
        lastActivity: '2025-01-20T20:53:45Z',
        discoveredEndpoints: 18,
        testedEndpoints: 15,
        successRate: 91.8
      }
    ]);

    // Initialize discovered endpoints
    setDiscoveredEndpoints([
      {
        id: '1',
        name: 'Anthropic Messages API',
        url: 'https://api.anthropic.com/v1/messages',
        method: 'POST',
        category: 'ai',
        status: 'integrated',
        source: 'documentation',
        authentication: 'api_key',
        parameters: {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          messages: 'array'
        },
        discoveredAt: '2025-01-20T20:30:00Z',
        testedAt: '2025-01-20T20:35:00Z',
        integratedAt: '2025-01-20T20:40:00Z',
        confidence: 95
      },
      {
        id: '2',
        name: 'xAI Chat Completions',
        url: 'https://api.x.ai/v1/chat/completions',
        method: 'POST',
        category: 'ai',
        status: 'integrated',
        source: 'browser',
        authentication: 'bearer',
        parameters: {
          model: 'grok-4-latest',
          messages: 'array',
          temperature: 0.7
        },
        discoveredAt: '2025-01-20T20:25:00Z',
        testedAt: '2025-01-20T20:30:00Z',
        integratedAt: '2025-01-20T20:35:00Z',
        confidence: 92
      },
      {
        id: '3',
        name: 'Stripe Payment Intents',
        url: 'https://api.stripe.com/v1/payment_intents',
        method: 'POST',
        category: 'payment',
        status: 'testing',
        source: 'api',
        authentication: 'bearer',
        parameters: {
          amount: 'integer',
          currency: 'string',
          payment_method: 'string'
        },
        discoveredAt: '2025-01-20T20:20:00Z',
        testedAt: '2025-01-20T20:25:00Z',
        confidence: 88
      },
      {
        id: '4',
        name: 'GitHub API',
        url: 'https://api.github.com/repos/{owner}/{repo}',
        method: 'GET',
        category: 'development',
        status: 'discovered',
        source: 'browser',
        authentication: 'bearer',
        parameters: {
          owner: 'string',
          repo: 'string'
        },
        discoveredAt: '2025-01-20T20:15:00Z',
        confidence: 85
      }
    ]);

    // Initialize browser tasks
    setBrowserTasks([
      {
        id: '1',
        name: 'Discover Payment APIs',
        description: 'Automatically discover and catalog payment processing APIs',
        type: 'discovery',
        status: 'in_progress',
        assignedAgent: 'Web Scraper Bot',
        progress: 60,
        createdAt: '2025-01-20T20:00:00Z',
        targetUrl: 'https://stripe.com/docs/api',
        expectedOutcome: 'Complete API endpoint catalog'
      },
      {
        id: '2',
        name: 'Test AI Model APIs',
        description: 'Test discovered AI model APIs for functionality and performance',
        type: 'testing',
        status: 'pending',
        assignedAgent: 'Stage Browser Agent',
        progress: 0,
        createdAt: '2025-01-20T20:10:00Z',
        targetUrl: 'https://api.anthropic.com',
        expectedOutcome: 'Performance metrics and test results'
      },
      {
        id: '3',
        name: 'Integrate GitHub API',
        description: 'Integrate GitHub API for repository management',
        type: 'integration',
        status: 'pending',
        assignedAgent: 'Agent X Coordinator',
        progress: 0,
        createdAt: '2025-01-20T20:05:00Z',
        targetUrl: 'https://api.github.com',
        expectedOutcome: 'Working GitHub integration'
      }
    ]);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'integrated':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'working':
      case 'in_progress':
      case 'testing':
        return <Activity className="w-4 h-4 text-blue-400" />;
      case 'idle':
      case 'pending':
      case 'discovered':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error':
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'browser':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'stagebrowser':
        return <TestTube className="w-5 h-5 text-green-400" />;
      case 'browserhand':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'agentx':
        return <Brain className="w-5 h-5 text-orange-400" />;
      case 'agents':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Bot className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'discovery':
        return <Search className="w-4 h-4 text-blue-400" />;
      case 'testing':
        return <TestTube className="w-4 h-4 text-green-400" />;
      case 'integration':
        return <Link className="w-4 h-4 text-purple-400" />;
      case 'monitoring':
        return <Activity className="w-4 h-4 text-orange-400" />;
      default:
        return <Code className="w-4 h-4 text-gray-400" />;
    }
  };

  const deployAgent = async (agentId: string, task: string) => {
    setIsDeployingAgent(true);
    setBrowserAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'working' as const, currentTask: task, progress: 0 }
        : agent
    ));
    
    // Simulate agent work
    setTimeout(() => {
      setBrowserAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'active' as const, currentTask: undefined, progress: 100 }
          : agent
      ));
      setIsDeployingAgent(false);
    }, 3000);
  };

  const createBrowserTask = async (task: BrowserTask) => {
    setBrowserTasks(prev => [...prev, task]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Browser Automation System
            </h2>
            <p className="text-gray-400">Automated API discovery and integration through browser automation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Active Agents</div>
              <div className="text-2xl font-bold text-green-400">
                {browserAgents.filter(a => a.status === 'active' || a.status === 'working').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Discovered Endpoints</div>
              <div className="text-2xl font-bold text-blue-400">
                {discoveredEndpoints.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Active Tasks</div>
              <div className="text-2xl font-bold text-purple-400">
                {browserTasks.filter(t => t.status === 'in_progress').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {[
            { id: 'agents', label: 'Browser Agents', icon: Bot },
            { id: 'discovery', label: 'API Discovery', icon: Search },
            { id: 'tasks', label: 'Tasks', icon: Code },
            { id: 'monitoring', label: 'Monitoring', icon: Activity }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Browser Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Browser Automation Agents</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                <Brain className="w-4 h-4" />
                Deploy Agent X
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Bot className="w-4 h-4" />
                Create Agent
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {browserAgents.map((agent) => (
              <motion.div
                key={agent.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAgentTypeIcon(agent.type)}
                    <span className="font-semibold text-white">{agent.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    agent.status === 'active' ? 'bg-green-500' :
                    agent.status === 'working' ? 'bg-blue-500' :
                    agent.status === 'idle' ? 'bg-gray-500' : 'bg-red-500'
                  }`}>
                    {agent.status}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{agent.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-white">{agent.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discovered:</span>
                    <span className="text-white">{agent.discoveredEndpoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tested:</span>
                    <span className="text-white">{agent.testedEndpoints}</span>
                  </div>
                  {agent.currentTask && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Task:</span>
                      <span className="text-white text-xs">{agent.currentTask}</span>
                    </div>
                  )}
                  {agent.progress !== undefined && agent.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Progress:</span>
                        <span className="text-white">{agent.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Capabilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.map((cap) => (
                      <span key={cap} className="px-2 py-1 bg-gray-700 text-xs rounded">
                        {cap.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => deployAgent(agent.id, 'Auto-discover APIs through browser automation')}
                    className="flex-1 px-3 py-2 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600 transition-colors"
                  >
                    Deploy
                  </button>
                  <button className="px-3 py-2 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors">
                    <Settings className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agent Templates */}
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Browser Agent Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Web Scraper Bot',
                  description: 'Automated web scraping for API discovery and documentation parsing',
                  capabilities: ['Web scraping', 'Form interaction', 'Element detection', 'API discovery'],
                  useCase: 'Documentation sites, API catalogs, developer portals'
                },
                {
                  name: 'Stage Browser Agent',
                  description: 'Staged browser environment for safe API testing and validation',
                  capabilities: ['Staged browsing', 'Multi-tab management', 'Session persistence', 'API testing'],
                  useCase: 'API testing, sandbox environments, development testing'
                },
                {
                  name: 'Browser Hand Controller',
                  description: 'Advanced browser automation with visual recognition and gesture control',
                  capabilities: ['Hand gesture control', 'Visual recognition', 'Automated interaction', 'UI testing'],
                  useCase: 'Complex UI interactions, visual testing, gesture-based automation'
                },
                {
                  name: 'Agent X Coordinator',
                  description: 'Multi-agent coordination system for distributed browser automation',
                  capabilities: ['Multi-agent coordination', 'Task distribution', 'Result aggregation', 'Workflow management'],
                  useCase: 'Large-scale automation, distributed tasks, complex workflows'
                }
              ].map((template) => (
                <motion.div
                  key={template.name}
                  className="glass-card p-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className="font-semibold text-white mb-2">{template.name}</h5>
                  <p className="text-gray-400 text-sm mb-3">{template.description}</p>
                  
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Capabilities:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.capabilities.map((cap) => (
                        <span key={cap} className="px-2 py-1 bg-gray-700 text-xs rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Use Case:</div>
                    <div className="text-xs text-white">{template.useCase}</div>
                  </div>
                  
                  <button className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                    Deploy Template
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Discovery Tab */}
      {activeTab === 'discovery' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Discovered API Endpoints</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Search className="w-4 h-4" />
              Start Discovery
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {discoveredEndpoints.map((endpoint) => (
              <motion.div
                key={endpoint.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(endpoint.status)}
                    <span className="font-semibold text-white">{endpoint.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-green-400">
                      <TestTube className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-400">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      endpoint.method === 'GET' ? 'bg-green-500' :
                      endpoint.method === 'POST' ? 'bg-blue-500' :
                      endpoint.method === 'PUT' ? 'bg-yellow-500' :
                      endpoint.method === 'DELETE' ? 'bg-red-500' : 'bg-gray-500'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">URL:</span>
                    <span className="text-white font-mono text-xs truncate max-w-48">
                      {endpoint.url}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{endpoint.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Source:</span>
                    <span className="text-white">{endpoint.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-white">{endpoint.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discovered:</span>
                    <span className="text-white">{new Date(endpoint.discoveredAt).toLocaleString()}</span>
                  </div>
                  {endpoint.testedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tested:</span>
                      <span className="text-white">{new Date(endpoint.testedAt).toLocaleString()}</span>
                    </div>
                  )}
                  {endpoint.integratedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Integrated:</span>
                      <span className="text-white">{new Date(endpoint.integratedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {endpoint.parameters && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Parameters:</div>
                    <div className="space-y-1">
                      {Object.entries(endpoint.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Browser Automation Tasks</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Code className="w-4 h-4" />
              Create Task
            </button>
          </div>

          <div className="space-y-4">
            {browserTasks.map((task) => (
              <motion.div
                key={task.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTaskTypeIcon(task.type)}
                    <span className="font-semibold text-white">{task.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-green-400">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-yellow-400">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-3">{task.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{task.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white">{task.status.replace('_', ' ')}</span>
                  </div>
                  {task.assignedAgent && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Assigned Agent:</span>
                      <span className="text-white">{task.assignedAgent}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{task.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(task.createdAt).toLocaleString()}</span>
                  </div>
                  {task.targetUrl && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target URL:</span>
                      <span className="text-white text-xs">{task.targetUrl}</span>
                    </div>
                  )}
                  {task.expectedOutcome && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expected Outcome:</span>
                      <span className="text-white text-xs">{task.expectedOutcome}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {task.error && (
                  <div className="mt-3 p-2 bg-red-900 border border-red-500 rounded text-red-200 text-xs">
                    Error: {task.error}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Browser Automation Monitoring</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Active Agents</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {browserAgents.filter(a => a.status === 'active').length}
              </div>
              <div className="text-xs text-gray-400">Working agents</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Endpoints Found</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {discoveredEndpoints.length}
              </div>
              <div className="text-xs text-gray-400">Total discovered</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <TestTube className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Tests Run</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {discoveredEndpoints.filter(ep => ep.testedAt).length}
              </div>
              <div className="text-xs text-gray-400">Successful tests</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(browserAgents.reduce((acc, agent) => acc + agent.successRate, 0) / browserAgents.length)}%
              </div>
              <div className="text-xs text-gray-400">Average success rate</div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {[
                { time: '2 minutes ago', event: 'Web Scraper Bot discovered 3 new API endpoints', type: 'success' },
                { time: '5 minutes ago', event: 'Stage Browser Agent completed API testing', type: 'success' },
                { time: '8 minutes ago', event: 'Agent X Coordinator distributed tasks to swarm', type: 'info' },
                { time: '12 minutes ago', event: 'Browser Hand Controller detected UI changes', type: 'warning' },
                { time: '15 minutes ago', event: 'Agents Swarm completed parallel discovery', type: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    activity.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.event}</div>
                    <div className="text-gray-400 text-xs">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

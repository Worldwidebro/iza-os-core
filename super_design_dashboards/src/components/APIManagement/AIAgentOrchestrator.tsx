import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Globe, 
  Code, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Bot,
  Brain,
  Zap,
  Link,
  Database,
  Shield,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Upload,
  Settings
} from 'lucide-react';

interface APIDiscoveryAgent {
  id: string;
  name: string;
  role: 'discovery' | 'integration' | 'testing' | 'monitoring' | 'optimization';
  status: 'active' | 'idle' | 'working' | 'error';
  capabilities: string[];
  currentTask?: string;
  progress?: number;
  lastActivity?: string;
  discoveredAPIs: number;
  integratedAPIs: number;
  successRate: number;
}

interface DiscoveredAPI {
  id: string;
  name: string;
  url: string;
  method: string;
  category: string;
  status: 'discovered' | 'testing' | 'integrated' | 'failed';
  documentation?: string;
  authentication?: string;
  parameters?: Record<string, any>;
  response?: any;
  discoveredAt: string;
  testedAt?: string;
  integratedAt?: string;
}

interface IntegrationTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedAgent?: string;
  progress: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

export const AIAgentOrchestrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agents' | 'discovery' | 'integration' | 'monitoring'>('agents');
  const [agents, setAgents] = useState<APIDiscoveryAgent[]>([]);
  const [discoveredAPIs, setDiscoveredAPIs] = useState<DiscoveredAPI[]>([]);
  const [integrationTasks, setIntegrationTasks] = useState<IntegrationTask[]>([]);
  const [isDeployingAgent, setIsDeployingAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    // Initialize AI agents
    setAgents([
      {
        id: '1',
        name: 'API Discovery Specialist',
        role: 'discovery',
        status: 'active',
        capabilities: ['web_scraping', 'documentation_parsing', 'endpoint_discovery', 'schema_analysis'],
        currentTask: 'Scanning Anthropic documentation for new endpoints',
        progress: 75,
        lastActivity: '2025-01-20T20:55:00Z',
        discoveredAPIs: 23,
        integratedAPIs: 18,
        successRate: 94.2
      },
      {
        id: '2',
        name: 'Integration Architect',
        role: 'integration',
        status: 'working',
        capabilities: ['code_generation', 'schema_mapping', 'error_handling', 'testing'],
        currentTask: 'Integrating new payment API endpoints',
        progress: 45,
        lastActivity: '2025-01-20T20:56:30Z',
        discoveredAPIs: 12,
        integratedAPIs: 8,
        successRate: 89.5
      },
      {
        id: '3',
        name: 'Testing Automation Bot',
        role: 'testing',
        status: 'idle',
        capabilities: ['automated_testing', 'performance_monitoring', 'error_detection', 'load_testing'],
        currentTask: undefined,
        progress: 0,
        lastActivity: '2025-01-20T20:50:00Z',
        discoveredAPIs: 0,
        integratedAPIs: 15,
        successRate: 97.8
      },
      {
        id: '4',
        name: 'Security Auditor',
        role: 'monitoring',
        status: 'active',
        capabilities: ['security_scanning', 'compliance_checking', 'vulnerability_assessment'],
        currentTask: 'Auditing OAuth2 implementations',
        progress: 60,
        lastActivity: '2025-01-20T20:54:15Z',
        discoveredAPIs: 5,
        integratedAPIs: 3,
        successRate: 91.3
      }
    ]);

    // Initialize discovered APIs
    setDiscoveredAPIs([
      {
        id: '1',
        name: 'Claude Messages API',
        url: 'https://api.anthropic.com/v1/messages',
        method: 'POST',
        category: 'ai',
        status: 'integrated',
        documentation: 'https://docs.anthropic.com/api/messages',
        authentication: 'api_key',
        parameters: {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          messages: 'array'
        },
        discoveredAt: '2025-01-20T20:30:00Z',
        testedAt: '2025-01-20T20:35:00Z',
        integratedAt: '2025-01-20T20:40:00Z'
      },
      {
        id: '2',
        name: 'Grok Chat Completions',
        url: 'https://api.x.ai/v1/chat/completions',
        method: 'POST',
        category: 'ai',
        status: 'integrated',
        documentation: 'https://docs.x.ai/api',
        authentication: 'bearer',
        parameters: {
          model: 'grok-4-latest',
          messages: 'array',
          temperature: 0.7
        },
        discoveredAt: '2025-01-20T20:25:00Z',
        testedAt: '2025-01-20T20:30:00Z',
        integratedAt: '2025-01-20T20:35:00Z'
      },
      {
        id: '3',
        name: 'Qwen Model API',
        url: 'http://localhost:8000/api/qwen/chat',
        method: 'POST',
        category: 'ai',
        status: 'testing',
        documentation: 'Local Qwen integration',
        authentication: 'none',
        parameters: {
          messages: 'array',
          max_tokens: 512
        },
        discoveredAt: '2025-01-20T20:20:00Z',
        testedAt: '2025-01-20T20:25:00Z'
      },
      {
        id: '4',
        name: 'Stripe Payment API',
        url: 'https://api.stripe.com/v1/payment_intents',
        method: 'POST',
        category: 'payment',
        status: 'discovered',
        documentation: 'https://stripe.com/docs/api/payment_intents',
        authentication: 'bearer',
        parameters: {
          amount: 'integer',
          currency: 'string',
          payment_method: 'string'
        },
        discoveredAt: '2025-01-20T20:15:00Z'
      }
    ]);

    // Initialize integration tasks
    setIntegrationTasks([
      {
        id: '1',
        name: 'Integrate Stripe Payment API',
        description: 'Add Stripe payment processing capabilities to the system',
        status: 'in_progress',
        assignedAgent: 'Integration Architect',
        progress: 45,
        createdAt: '2025-01-20T20:00:00Z'
      },
      {
        id: '2',
        name: 'Test Qwen Model Integration',
        description: 'Validate Qwen model API integration and performance',
        status: 'pending',
        assignedAgent: 'Testing Automation Bot',
        progress: 0,
        createdAt: '2025-01-20T20:10:00Z'
      },
      {
        id: '3',
        name: 'Security Audit OAuth2',
        description: 'Audit all OAuth2 implementations for security compliance',
        status: 'in_progress',
        assignedAgent: 'Security Auditor',
        progress: 60,
        createdAt: '2025-01-20T20:05:00Z'
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'discovery':
        return <Search className="w-5 h-5 text-blue-400" />;
      case 'integration':
        return <Link className="w-5 h-5 text-green-400" />;
      case 'testing':
        return <TestTube className="w-5 h-5 text-yellow-400" />;
      case 'monitoring':
        return <Activity className="w-5 h-5 text-purple-400" />;
      case 'optimization':
        return <Zap className="w-5 h-5 text-orange-400" />;
      default:
        return <Bot className="w-5 h-5 text-gray-400" />;
    }
  };

  const deployAgent = async (agentId: string, task: string) => {
    setIsDeployingAgent(true);
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'working' as const, currentTask: task, progress: 0 }
        : agent
    ));
    
    // Simulate agent work
    setTimeout(() => {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'active' as const, currentTask: undefined, progress: 100 }
          : agent
      ));
      setIsDeployingAgent(false);
    }, 3000);
  };

  const createClaudeSwarm = async () => {
    setIsDeployingAgent(true);
    
    // Simulate Claude Swarm deployment
    setTimeout(() => {
      const newAgent: APIDiscoveryAgent = {
        id: Date.now().toString(),
        name: 'Claude Swarm Coordinator',
        role: 'discovery',
        status: 'active',
        capabilities: ['claude_swarm', 'multi_agent_coordination', 'api_discovery', 'integration'],
        currentTask: 'Coordinating multi-agent API discovery',
        progress: 0,
        lastActivity: new Date().toISOString(),
        discoveredAPIs: 0,
        integratedAPIs: 0,
        successRate: 0
      };
      
      setAgents(prev => [...prev, newAgent]);
      setIsDeployingAgent(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              AI Agent Orchestrator
            </h2>
            <p className="text-gray-400">Automated API discovery, integration, and management with AI agents</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Active Agents</div>
              <div className="text-2xl font-bold text-green-400">
                {agents.filter(a => a.status === 'active' || a.status === 'working').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Discovered APIs</div>
              <div className="text-2xl font-bold text-blue-400">
                {discoveredAPIs.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Integration Tasks</div>
              <div className="text-2xl font-bold text-purple-400">
                {integrationTasks.filter(t => t.status === 'in_progress').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {[
            { id: 'agents', label: 'AI Agents', icon: Bot },
            { id: 'discovery', label: 'API Discovery', icon: Search },
            { id: 'integration', label: 'Integration', icon: Link },
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

      {/* AI Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">AI Integration Agents</h3>
            <div className="flex gap-2">
              <button
                onClick={createClaudeSwarm}
                disabled={isDeployingAgent}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                {isDeployingAgent ? <Activity className="w-4 h-4 animate-pulse" /> : <Brain className="w-4 h-4" />}
                Deploy Claude Swarm
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Bot className="w-4 h-4" />
                Create Agent
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(agent.role)}
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
                    <span className="text-gray-400">Role:</span>
                    <span className="text-white">{agent.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-white">{agent.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discovered:</span>
                    <span className="text-white">{agent.discoveredAPIs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Integrated:</span>
                    <span className="text-white">{agent.integratedAPIs}</span>
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
                    onClick={() => deployAgent(agent.id, 'Auto-discover and integrate APIs')}
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

          {/* Claude Swarm Templates */}
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Claude Swarm Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'API Discovery Swarm',
                  description: 'Multi-agent system for comprehensive API discovery and cataloging',
                  agents: ['Discovery Specialist', 'Documentation Parser', 'Schema Analyzer'],
                  capabilities: ['Web scraping', 'Documentation parsing', 'Endpoint discovery', 'Schema analysis']
                },
                {
                  name: 'Integration Swarm',
                  description: 'Coordinated agents for seamless API integration and testing',
                  agents: ['Integration Architect', 'Testing Bot', 'Error Handler'],
                  capabilities: ['Code generation', 'Automated testing', 'Error handling', 'Performance monitoring']
                },
                {
                  name: 'Security Swarm',
                  description: 'Specialized agents for API security auditing and compliance',
                  agents: ['Security Auditor', 'Compliance Checker', 'Vulnerability Scanner'],
                  capabilities: ['Security scanning', 'Compliance checking', 'Vulnerability assessment', 'Penetration testing']
                },
                {
                  name: 'Optimization Swarm',
                  description: 'AI agents focused on API performance optimization and monitoring',
                  agents: ['Performance Monitor', 'Load Tester', 'Optimization Engine'],
                  capabilities: ['Performance monitoring', 'Load testing', 'Optimization', 'Analytics']
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
                    <div className="text-xs text-gray-400 mb-1">Agents:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.agents.map((agent) => (
                        <span key={agent} className="px-2 py-1 bg-blue-500 text-xs rounded">
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                  
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
                  
                  <button className="w-full px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors">
                    Deploy Swarm
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
            <h3 className="text-xl font-semibold text-white">Discovered APIs</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Search className="w-4 h-4" />
              Start Discovery
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {discoveredAPIs.map((api) => (
              <motion.div
                key={api.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(api.status)}
                    <span className="font-semibold text-white">{api.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-green-400">
                      <TestTube className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-400">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      api.method === 'GET' ? 'bg-green-500' :
                      api.method === 'POST' ? 'bg-blue-500' :
                      api.method === 'PUT' ? 'bg-yellow-500' :
                      api.method === 'DELETE' ? 'bg-red-500' : 'bg-gray-500'
                    }`}>
                      {api.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">URL:</span>
                    <span className="text-white font-mono text-xs truncate max-w-48">
                      {api.url}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{api.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Authentication:</span>
                    <span className="text-white">{api.authentication || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discovered:</span>
                    <span className="text-white">{new Date(api.discoveredAt).toLocaleString()}</span>
                  </div>
                  {api.testedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tested:</span>
                      <span className="text-white">{new Date(api.testedAt).toLocaleString()}</span>
                    </div>
                  )}
                  {api.integratedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Integrated:</span>
                      <span className="text-white">{new Date(api.integratedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {api.parameters && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Parameters:</div>
                    <div className="space-y-1">
                      {Object.entries(api.parameters).map(([key, value]) => (
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

      {/* Integration Tab */}
      {activeTab === 'integration' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Integration Tasks</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Link className="w-4 h-4" />
              Create Task
            </button>
          </div>

          <div className="space-y-4">
            {integrationTasks.map((task) => (
              <motion.div
                key={task.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
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
                  {task.completedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed:</span>
                      <span className="text-white">{new Date(task.completedAt).toLocaleString()}</span>
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
          <h3 className="text-xl font-semibold text-white">Agent Monitoring Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Active Agents</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {agents.filter(a => a.status === 'active').length}
              </div>
              <div className="text-xs text-gray-400">Working agents</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">APIs Discovered</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {discoveredAPIs.length}
              </div>
              <div className="text-xs text-gray-400">Total discovered</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Link className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Integrations</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {discoveredAPIs.filter(api => api.status === 'integrated').length}
              </div>
              <div className="text-xs text-gray-400">Successfully integrated</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(agents.reduce((acc, agent) => acc + agent.successRate, 0) / agents.length)}%
              </div>
              <div className="text-xs text-gray-400">Average success rate</div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {[
                { time: '2 minutes ago', event: 'API Discovery Agent found 3 new endpoints', type: 'success' },
                { time: '5 minutes ago', event: 'Integration Architect completed Stripe API integration', type: 'success' },
                { time: '8 minutes ago', event: 'Testing Bot detected performance issue in Qwen API', type: 'warning' },
                { time: '12 minutes ago', event: 'Security Auditor completed OAuth2 audit', type: 'success' },
                { time: '15 minutes ago', event: 'Claude Swarm deployed successfully', type: 'success' }
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

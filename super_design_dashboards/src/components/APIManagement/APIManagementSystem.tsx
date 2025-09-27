import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Globe, 
  Zap, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  TestTube,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Brain,
  Bot,
  Search,
  Link,
  Database,
  Shield,
  Activity
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  provider: string;
  key: string;
  maskedKey: string;
  environment: 'development' | 'staging' | 'production';
  status: 'active' | 'inactive' | 'expired' | 'testing';
  lastUsed?: string;
  usage: number;
  rateLimit?: number;
  permissions: string[];
}

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  category: 'ai' | 'database' | 'payment' | 'analytics' | 'communication' | 'storage' | 'other';
  status: 'connected' | 'disconnected' | 'testing' | 'error';
  responseTime?: number;
  successRate?: number;
  lastTested?: string;
  authentication: 'api_key' | 'oauth' | 'bearer' | 'basic' | 'none';
  requiredHeaders?: Record<string, string>;
  documentation?: string;
}

interface AIAgent {
  id: string;
  name: string;
  role: 'api_discovery' | 'api_integration' | 'api_testing' | 'api_monitoring' | 'api_optimization';
  status: 'active' | 'idle' | 'working' | 'error';
  capabilities: string[];
  currentTask?: string;
  progress?: number;
  lastActivity?: string;
}

export const APIManagementSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'keys' | 'endpoints' | 'agents' | 'monitoring'>('keys');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [isAddingEndpoint, setIsAddingEndpoint] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Initialize with sample data
  useEffect(() => {
    setApiKeys([
      {
        id: '1',
        name: 'Anthropic Claude',
        provider: 'Anthropic',
        key: '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',
        maskedKey: 'sk-ant-api03-***xgAA',
        environment: 'development',
        status: 'active',
        lastUsed: '2025-01-20T20:56:45Z',
        usage: 1250,
        rateLimit: 10000,
        permissions: ['chat', 'completion', 'analysis']
      },
      {
        id: '2',
        name: 'xAI Grok',
        provider: 'xAI',
        key: 'xai-YoIXj21ZNWQhWngmwaK3y2ONLSuibUvvA9KWamWbmyJLsyrarjzXX425pdxVJrpUZ4Ulz6NT1Vk0shdW',
        maskedKey: 'xai-***shdW',
        environment: 'development',
        status: 'active',
        lastUsed: '2025-01-20T20:45:30Z',
        usage: 890,
        rateLimit: 5000,
        permissions: ['chat', 'completion', 'reasoning']
      },
      {
        id: '3',
        name: 'Hugging Face',
        provider: 'Hugging Face',
        key: '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',
        maskedKey: 'hf_***Yqbm',
        environment: 'development',
        status: 'testing',
        lastUsed: '2025-01-20T19:30:15Z',
        usage: 45,
        rateLimit: 1000,
        permissions: ['inference', 'model_access']
      }
    ]);

    setEndpoints([
      {
        id: '1',
        name: 'Claude Chat API',
        url: 'https://api.anthropic.com/v1/messages',
        method: 'POST',
        category: 'ai',
        status: 'connected',
        responseTime: 1200,
        successRate: 99.2,
        lastTested: '2025-01-20T20:56:45Z',
        authentication: 'api_key',
        requiredHeaders: { 'x-api-key': 'sk-ant-api03-***', 'Content-Type': 'application/json' },
        documentation: 'https://docs.anthropic.com/api'
      },
      {
        id: '2',
        name: 'Grok Chat API',
        url: 'https://api.x.ai/v1/chat/completions',
        method: 'POST',
        category: 'ai',
        status: 'connected',
        responseTime: 950,
        successRate: 98.8,
        lastTested: '2025-01-20T20:45:30Z',
        authentication: 'bearer',
        requiredHeaders: { 'Authorization': 'Bearer xai-***', 'Content-Type': 'application/json' },
        documentation: 'https://docs.x.ai/api'
      },
      {
        id: '3',
        name: 'Qwen Model API',
        url: 'http://localhost:8000/api/qwen/chat',
        method: 'POST',
        category: 'ai',
        status: 'error',
        responseTime: undefined,
        successRate: 0,
        lastTested: '2025-01-20T20:30:00Z',
        authentication: 'none',
        documentation: 'Local Qwen integration'
      }
    ]);

    setAIAgents([
      {
        id: '1',
        name: 'API Discovery Agent',
        role: 'api_discovery',
        status: 'active',
        capabilities: ['web_scraping', 'api_documentation_parsing', 'endpoint_discovery'],
        currentTask: 'Scanning Anthropic documentation for new endpoints',
        progress: 75,
        lastActivity: '2025-01-20T20:55:00Z'
      },
      {
        id: '2',
        name: 'Integration Specialist',
        role: 'api_integration',
        status: 'working',
        capabilities: ['code_generation', 'schema_mapping', 'error_handling'],
        currentTask: 'Integrating new payment API endpoints',
        progress: 45,
        lastActivity: '2025-01-20T20:56:30Z'
      },
      {
        id: '3',
        name: 'Testing Bot',
        role: 'api_testing',
        status: 'idle',
        capabilities: ['automated_testing', 'performance_monitoring', 'error_detection'],
        currentTask: undefined,
        progress: 0,
        lastActivity: '2025-01-20T20:50:00Z'
      }
    ]);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'testing':
        return <TestTube className="w-4 h-4 text-yellow-400" />;
      case 'error':
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAgentIcon = (role: string) => {
    switch (role) {
      case 'api_discovery':
        return <Search className="w-5 h-5 text-blue-400" />;
      case 'api_integration':
        return <Link className="w-5 h-5 text-green-400" />;
      case 'api_testing':
        return <TestTube className="w-5 h-5 text-yellow-400" />;
      case 'api_monitoring':
        return <Activity className="w-5 h-5 text-purple-400" />;
      case 'api_optimization':
        return <Zap className="w-5 h-5 text-orange-400" />;
      default:
        return <Bot className="w-5 h-5 text-gray-400" />;
    }
  };

  const deployAIAgent = (agentId: string, task: string) => {
    setAIAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'working' as const, currentTask: task, progress: 0 }
        : agent
    ));
    
    // Simulate agent work
    setTimeout(() => {
      setAIAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'active' as const, currentTask: undefined, progress: 100 }
          : agent
      ));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-6 h-6" />
              API Management System
            </h2>
            <p className="text-gray-400">Comprehensive API key management and automated integration</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Active APIs</div>
              <div className="text-2xl font-bold text-green-400">
                {apiKeys.filter(k => k.status === 'active').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Connected Endpoints</div>
              <div className="text-2xl font-bold text-blue-400">
                {endpoints.filter(e => e.status === 'connected').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">AI Agents</div>
              <div className="text-2xl font-bold text-purple-400">
                {aiAgents.filter(a => a.status === 'active' || a.status === 'working').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {[
            { id: 'keys', label: 'API Keys', icon: Key },
            { id: 'endpoints', label: 'Endpoints', icon: Globe },
            { id: 'agents', label: 'AI Agents', icon: Bot },
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

      {/* API Keys Tab */}
      {activeTab === 'keys' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">API Keys Management</h3>
            <button
              onClick={() => setIsAddingKey(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add API Key
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiKeys.map((key) => (
              <motion.div
                key={key.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(key.status)}
                    <span className="font-semibold text-white">{key.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-white">{key.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Key:</span>
                    <span className="text-white font-mono">{key.maskedKey}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environment:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      key.environment === 'production' ? 'bg-red-500' : 
                      key.environment === 'staging' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {key.environment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Usage:</span>
                    <span className="text-white">{key.usage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate Limit:</span>
                    <span className="text-white">{key.rateLimit?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {key.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-gray-700 text-xs rounded">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Endpoints Tab */}
      {activeTab === 'endpoints' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">API Endpoints</h3>
            <button
              onClick={() => setIsAddingEndpoint(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Endpoint
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {endpoints.map((endpoint) => (
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
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Edit className="w-4 h-4" />
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
                  {endpoint.responseTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-white">{endpoint.responseTime}ms</span>
                    </div>
                  )}
                  {endpoint.successRate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="text-white">{endpoint.successRate}%</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Authentication:</div>
                  <span className="px-2 py-1 bg-gray-700 text-xs rounded">
                    {endpoint.authentication}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* AI Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">AI Integration Agents</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                <Brain className="w-4 h-4" />
                Deploy Claude Swarm
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Plus className="w-4 h-4" />
                Create Agent
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiAgents.map((agent) => (
              <motion.div
                key={agent.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAgentIcon(agent.role)}
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
                    <span className="text-white">{agent.role.replace('_', ' ')}</span>
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
                    onClick={() => deployAIAgent(agent.id, 'Auto-discover and integrate APIs')}
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
                  name: 'API Discovery Specialist',
                  description: 'Automatically discovers and catalogs APIs from documentation',
                  capabilities: ['Web scraping', 'Documentation parsing', 'Endpoint discovery'],
                  template: 'claude-swarm-api-discovery'
                },
                {
                  name: 'Integration Architect',
                  description: 'Designs and implements API integrations with error handling',
                  capabilities: ['Code generation', 'Schema mapping', 'Error handling'],
                  template: 'claude-swarm-integration'
                },
                {
                  name: 'Testing Automation Bot',
                  description: 'Automatically tests APIs and monitors performance',
                  capabilities: ['Automated testing', 'Performance monitoring', 'Error detection'],
                  template: 'claude-swarm-testing'
                },
                {
                  name: 'Security Auditor',
                  description: 'Audits API security and compliance',
                  capabilities: ['Security scanning', 'Compliance checking', 'Vulnerability assessment'],
                  template: 'claude-swarm-security'
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
                  <div className="space-y-1 mb-3">
                    {template.capabilities.map((cap) => (
                      <span key={cap} className="inline-block px-2 py-1 bg-gray-700 text-xs rounded mr-1">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <button className="w-full px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors">
                    Deploy Template
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">API Monitoring Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Total Requests</span>
              </div>
              <div className="text-2xl font-bold text-green-400">12,847</div>
              <div className="text-xs text-gray-400">+15% from yesterday</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">99.2%</div>
              <div className="text-xs text-gray-400">-0.1% from yesterday</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Avg Response</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">1.2s</div>
              <div className="text-xs text-gray-400">+0.1s from yesterday</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">Errors</span>
              </div>
              <div className="text-2xl font-bold text-red-400">23</div>
              <div className="text-xs text-gray-400">-5 from yesterday</div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {[
                { time: '2 minutes ago', event: 'Claude API key rotated successfully', type: 'success' },
                { time: '5 minutes ago', event: 'New endpoint discovered: /api/v2/chat', type: 'info' },
                { time: '8 minutes ago', event: 'Grok API rate limit warning', type: 'warning' },
                { time: '12 minutes ago', event: 'Qwen model integration failed', type: 'error' },
                { time: '15 minutes ago', event: 'API Discovery Agent completed scan', type: 'success' }
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

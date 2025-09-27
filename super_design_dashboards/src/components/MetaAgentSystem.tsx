import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Bot, 
  Zap, 
  TrendingUp, 
  Users, 
  Globe, 
  Settings, 
  BarChart3,
  Cpu,
  Database,
  Network,
  Shield,
  Workflow,
  Code,
  Sparkles,
  Target,
  Rocket,
  Star,
  Activity,
  Monitor,
  Server,
  Cloud,
  Lock,
  Key,
  Eye,
  Command,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RefreshCw,
  Play,
  Pause,
  Square,
  BookOpen,
  Lightbulb,
  Cog,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Upload,
  GitBranch,
  GitCommit,
  GitPullRequest
} from 'lucide-react';

interface AgentTask {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  progress: number;
  agent: string;
  createdAt: string;
  completedAt?: string;
  result?: string;
}

interface SelfImprovement {
  id: string;
  type: 'prompt_optimization' | 'model_finetune' | 'workflow_update' | 'performance_boost';
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'scheduled';
  improvement: number;
  date: string;
}

interface KnowledgeExtraction {
  id: string;
  source: string;
  type: 'chat_history' | 'code_repository' | 'documentation' | 'user_feedback';
  insights: string[];
  confidence: number;
  extractedAt: string;
}

const MetaAgentSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'awareness' | 'tasks' | 'improvements' | 'knowledge'>('awareness');
  const [isSelfImproving, setIsSelfImproving] = useState(true);

  // Mock data for demonstration
  const agentTasks: AgentTask[] = [
    {
      id: '1',
      name: 'Extract Chat Knowledge',
      description: 'Analyze conversation history for insights and patterns',
      status: 'completed',
      progress: 100,
      agent: 'MetaAgent',
      createdAt: '2024-01-01T10:00:00Z',
      completedAt: '2024-01-01T10:05:00Z',
      result: 'Extracted 247 insights from chat history'
    },
    {
      id: '2',
      name: 'Optimize Prompt Templates',
      description: 'Fine-tune prompts for better AI responses',
      status: 'in_progress',
      progress: 65,
      agent: 'CTO Agent',
      createdAt: '2024-01-01T10:30:00Z'
    },
    {
      id: '3',
      name: 'Update Workflow Engine',
      description: 'Implement new orchestration patterns',
      status: 'pending',
      progress: 0,
      agent: 'Product Agent',
      createdAt: '2024-01-01T11:00:00Z'
    },
    {
      id: '4',
      name: 'Performance Analysis',
      description: 'Analyze system performance and identify bottlenecks',
      status: 'completed',
      progress: 100,
      agent: 'Finance Agent',
      createdAt: '2024-01-01T09:00:00Z',
      completedAt: '2024-01-01T09:15:00Z',
      result: 'Identified 3 optimization opportunities'
    }
  ];

  const selfImprovements: SelfImprovement[] = [
    {
      id: '1',
      type: 'prompt_optimization',
      description: 'Enhanced Claude prompts for better code generation',
      impact: 'high',
      status: 'completed',
      improvement: 23,
      date: '2024-01-01T09:00:00Z'
    },
    {
      id: '2',
      type: 'model_finetune',
      description: 'Fine-tuned Qwen model for business analysis',
      impact: 'medium',
      status: 'in_progress',
      improvement: 15,
      date: '2024-01-01T10:00:00Z'
    },
    {
      id: '3',
      type: 'workflow_update',
      description: 'Optimized agent coordination patterns',
      impact: 'high',
      status: 'completed',
      improvement: 31,
      date: '2024-01-01T08:00:00Z'
    },
    {
      id: '4',
      type: 'performance_boost',
      description: 'Implemented caching for faster responses',
      impact: 'medium',
      status: 'scheduled',
      improvement: 18,
      date: '2024-01-01T12:00:00Z'
    }
  ];

  const knowledgeExtractions: KnowledgeExtraction[] = [
    {
      id: '1',
      source: 'Chat History',
      type: 'chat_history',
      insights: [
        'User prefers glass-morphism UI design',
        'Focus on autonomous agent systems',
        'Integration of multiple AI providers is key',
        'Real-time metrics and monitoring are important'
      ],
      confidence: 0.94,
      extractedAt: '2024-01-01T10:05:00Z'
    },
    {
      id: '2',
      source: 'Code Repository',
      type: 'code_repository',
      insights: [
        'React + TypeScript architecture preferred',
        'FastAPI backend with async support',
        'Socket.IO for real-time communication',
        'Tailwind CSS for styling'
      ],
      confidence: 0.87,
      extractedAt: '2024-01-01T09:30:00Z'
    },
    {
      id: '3',
      source: 'User Feedback',
      type: 'user_feedback',
      insights: [
        'Navigation system needs improvement',
        'All routes should be clickable',
        'Loading states should be faster',
        'Error handling needs enhancement'
      ],
      confidence: 0.92,
      extractedAt: '2024-01-01T11:15:00Z'
    }
  ];

  const tabs = [
    { id: 'awareness', label: 'Self-Awareness', icon: Brain, color: 'from-purple-500 to-pink-600' },
    { id: 'tasks', label: 'Task Management', icon: Workflow, color: 'from-blue-500 to-cyan-600' },
    { id: 'improvements', label: 'Self-Improvement', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
    { id: 'knowledge', label: 'Knowledge Extraction', icon: BookOpen, color: 'from-orange-500 to-red-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'scheduled': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prompt_optimization': return Code;
      case 'model_finetune': return Brain;
      case 'workflow_update': return Workflow;
      case 'performance_boost': return Zap;
      default: return Settings;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">MetaAgent System</h1>
            <p className="text-gray-300">Self-Aware, Self-Improving AI Ecosystem</p>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Self-Awareness</p>
                <p className="text-lg font-bold text-purple-400">94%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Tasks</p>
                <p className="text-lg font-bold text-blue-400">{agentTasks.filter(t => t.status === 'in_progress').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Improvements</p>
                <p className="text-lg font-bold text-green-400">{selfImprovements.filter(i => i.status === 'completed').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Knowledge Base</p>
                <p className="text-lg font-bold text-orange-400">{knowledgeExtractions.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Self-Improvement Toggle */}
        <div className="flex justify-center mb-6">
          <motion.button
            onClick={() => setIsSelfImproving(!isSelfImproving)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
              isSelfImproving 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSelfImproving ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span>Self-Improvement: {isSelfImproving ? 'ACTIVE' : 'PAUSED'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg' 
                  : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 rounded-xl"
      >
        {activeTab === 'awareness' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Self-Awareness Dashboard</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span>Current Context</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Purpose:</span>
                    <span className="text-white">Autonomous AI Ecosystem Management</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Environment:</span>
                    <span className="text-white">IZA OS Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">User Intent:</span>
                    <span className="text-white">Complete System Integration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Active Agents:</span>
                    <span className="text-white">8 Specialized Agents</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>System Health</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Memory Usage:</span>
                    <span className="text-green-400">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Processing Power:</span>
                    <span className="text-blue-400">84%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Learning Rate:</span>
                    <span className="text-purple-400">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Adaptation Score:</span>
                    <span className="text-orange-400">92%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10 md:col-span-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>Current Insights</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">• User requires full system integration</p>
                    <p className="text-sm text-gray-300">• Navigation system needs improvement</p>
                    <p className="text-sm text-gray-300">• All components should be clickable</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">• Glass-morphism UI is preferred</p>
                    <p className="text-sm text-gray-300">• Real-time updates are critical</p>
                    <p className="text-sm text-gray-300">• Error handling needs enhancement</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Task Management</h3>
              <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {agentTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                      <h4 className="font-semibold text-white">{task.name}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}/20 text-white`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Agent: {task.agent}</span>
                    <span className="text-sm text-gray-400">{task.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in_progress' ? 'bg-blue-500' :
                        task.status === 'failed' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  
                  {task.result && (
                    <p className="text-sm text-green-400 bg-green-500/10 p-2 rounded">
                      ✓ {task.result}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Self-Improvement Log</h3>
              <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selfImprovements.map((improvement, index) => {
                const TypeIcon = getTypeIcon(improvement.type);
                
                return (
                  <motion.div
                    key={improvement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{improvement.description}</h4>
                          <p className="text-sm text-gray-400 capitalize">{improvement.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(improvement.status)}/20 text-white`}>
                          {improvement.status}
                        </span>
                        <p className={`text-sm font-semibold ${getImpactColor(improvement.impact)}`}>
                          {improvement.impact} impact
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          Improvement: <span className="text-green-400 font-semibold">+{improvement.improvement}%</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Date: {new Date(improvement.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {improvement.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {improvement.status === 'in_progress' && <Clock className="w-4 h-4 text-blue-400" />}
                        {improvement.status === 'scheduled' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Knowledge Extraction</h3>
              <button className="p-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {knowledgeExtractions.map((extraction, index) => (
                <motion.div
                  key={extraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{extraction.source}</h4>
                        <p className="text-sm text-gray-400 capitalize">{extraction.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Confidence</p>
                      <p className="text-lg font-semibold text-orange-400">{(extraction.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 mb-2">Key Insights:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {extraction.insights.map((insight, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                      Extracted: {new Date(extraction.extractedAt).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MetaAgentSystem;

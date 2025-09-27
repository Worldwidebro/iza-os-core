import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Code, 
  Database, 
  Settings, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Download,
  RefreshCw,
  Play,
  Pause,
  Server,
  Workflow,
  Users
} from 'lucide-react';
import { comprehensiveOllamaIntegration, AgentOllamaIntegration, WorkflowOllamaIntegration, BackendServiceOllamaIntegration } from '../services/comprehensiveOllamaIntegration';
import { ollamaService } from '../services/ollamaService';

export const ComprehensiveOllamaIntegration: React.FC = () => {
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [integrationReport, setIntegrationReport] = useState<any>(null);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'agents' | 'workflows' | 'backend'>('agents');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Check Ollama connection
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const connected = await ollamaService.initialize();
        setOllamaConnected(connected);
      } catch (error) {
        console.warn('Ollama not available:', error);
        setOllamaConnected(false);
      }
    };

    checkOllama();
  }, []);

  const startComprehensiveIntegration = async () => {
    if (!ollamaConnected) {
      alert('Ollama is not connected. Please ensure Ollama is running and has models available.');
      return;
    }

    setIsIntegrating(true);
    try {
      // Integrate with all components
      const agentIntegrations = await comprehensiveOllamaIntegration.integrateWithAllAgents();
      const workflowIntegrations = await comprehensiveOllamaIntegration.integrateWithAllWorkflows();
      const backendIntegrations = await comprehensiveOllamaIntegration.integrateWithBackendServices();
      
      const report = comprehensiveOllamaIntegration.getIntegrationReport();
      setIntegrationReport(report);
    } catch (error) {
      console.error('Integration failed:', error);
      alert('Integration failed. Please try again.');
    } finally {
      setIsIntegrating(false);
    }
  };

  const exportIntegrationReport = () => {
    const data = comprehensiveOllamaIntegration.exportIntegrationReport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ollama-integration-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getIntegrationLevelColor = (level: number) => {
    if (level >= 8) return 'text-green-400 bg-green-400/20';
    if (level >= 6) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getIntegrationLevelText = (level: number) => {
    if (level >= 8) return 'High Integration';
    if (level >= 6) return 'Medium Integration';
    return 'Low Integration';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Comprehensive Ollama Integration
        </motion.h2>
        <motion.p
          className="text-base md:text-xl text-gray-300 mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI-Powered Integration with All 29 Agents, 156 Workflows, and Backend Services
        </motion.p>
        
        {/* Ollama Status */}
        <motion.div
          className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
            ollamaConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {ollamaConnected ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> : <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />}
          {ollamaConnected ? 'Ollama Connected' : 'Ollama Not Available'}
        </motion.div>
      </div>

      {/* Integration Controls */}
      <motion.div
        className="glass-card p-4 md:p-6 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={startComprehensiveIntegration}
              disabled={isIntegrating || !ollamaConnected}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isIntegrating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isIntegrating ? 'Integrating...' : 'Start Comprehensive Integration'}</span>
            </button>
            
            {integrationReport && (
              <button
                onClick={exportIntegrationReport}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            {ollamaConnected ? 'Ready to integrate with entire MEMU ecosystem' : 'Ollama required for integration'}
          </div>
        </div>
      </motion.div>

      {/* Integration Results */}
      {integrationReport && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-xl border border-blue-400/20 bg-blue-500/10">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Agents Integrated</h3>
              </div>
              <p className="text-2xl font-bold text-blue-200">{integrationReport.summary.totalAgents}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-purple-400/20 bg-purple-500/10">
              <div className="flex items-center mb-2">
                <Workflow className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Workflows Integrated</h3>
              </div>
              <p className="text-2xl font-bold text-purple-200">{integrationReport.summary.totalWorkflows}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-green-400/20 bg-green-500/10">
              <div className="flex items-center mb-2">
                <Server className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Backend Services</h3>
              </div>
              <p className="text-2xl font-bold text-green-200">{integrationReport.summary.totalBackendServices}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-yellow-400/20 bg-yellow-500/10">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Avg Integration</h3>
              </div>
              <p className="text-2xl font-bold text-yellow-200">{integrationReport.summary.averageAgentIntegrationLevel.toFixed(1)}/10</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('agents')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'agents' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Agents ({integrationReport.summary.totalAgents})
            </button>
            <button
              onClick={() => setSelectedTab('workflows')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'workflows' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Workflow className="w-4 h-4 inline mr-2" />
              Workflows ({integrationReport.summary.totalWorkflows})
            </button>
            <button
              onClick={() => setSelectedTab('backend')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'backend' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Server className="w-4 h-4 inline mr-2" />
              Backend ({integrationReport.summary.totalBackendServices})
            </button>
          </div>

          {/* Tab Content */}
          {selectedTab === 'agents' && (
            <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Agent Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrationReport.agentIntegrations.map((agent: AgentOllamaIntegration, index: number) => (
                  <motion.div
                    key={agent.agentId}
                    className="glass-card p-4 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-200 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setSelectedItem(agent)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-white">{agent.agentName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getIntegrationLevelColor(agent.integrationLevel)}`}>
                        {agent.integrationLevel}/10
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mb-3">{agent.role}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Model:</span>
                        <span className="text-xs font-semibold text-blue-200">{agent.modelPreference}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Capabilities:</span>
                        <span className="text-xs font-semibold text-green-200">{agent.ollamaCapabilities.length}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {agent.ollamaCapabilities.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'workflows' && (
            <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Workflow Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrationReport.workflowIntegrations.map((workflow: WorkflowOllamaIntegration, index: number) => (
                  <motion.div
                    key={workflow.workflowId}
                    className="glass-card p-4 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-200 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setSelectedItem(workflow)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-white">{workflow.workflowName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getIntegrationLevelColor(workflow.automationLevel)}`}>
                        {workflow.automationLevel}/10
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">AI Tasks:</span>
                        <span className="text-xs font-semibold text-purple-200">{workflow.ollamaTasks.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Models:</span>
                        <span className="text-xs font-semibold text-green-200">{workflow.modelRequirements.length}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {workflow.ollamaTasks.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'backend' && (
            <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Backend Service Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrationReport.backendIntegrations.map((service: BackendServiceOllamaIntegration, index: number) => (
                  <motion.div
                    key={service.serviceName}
                    className="glass-card p-4 rounded-lg border border-white/10 hover:border-green-400/30 transition-all duration-200 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setSelectedItem(service)}
                  >
                    <div className="flex items-center mb-3">
                      <Code className="w-4 h-4 text-green-400 mr-2" />
                      <h4 className="text-sm font-semibold text-white">{service.serviceName}</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Features:</span>
                        <span className="text-xs font-semibold text-green-200">{service.ollamaFeatures.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Integration Points:</span>
                        <span className="text-xs font-semibold text-blue-200">{service.integrationPoints.length}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {service.ollamaFeatures.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="glass-card p-6 rounded-xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Integration Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Name</h4>
                <p className="text-sm text-gray-300">{selectedItem.agentName || selectedItem.workflowName || selectedItem.serviceName}</p>
              </div>
              
              {selectedItem.role && (
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Role</h4>
                  <p className="text-sm text-gray-300">{selectedItem.role}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Ollama Capabilities</h4>
                <ul className="space-y-1">
                  {(selectedItem.ollamaCapabilities || selectedItem.ollamaTasks || selectedItem.ollamaFeatures).map((capability: string, index: number) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedItem.modelPreference && (
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">Recommended Model</h4>
                  <p className="text-sm text-gray-300">{selectedItem.modelPreference}</p>
                </div>
              )}
              
              {selectedItem.integrationLevel && (
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Integration Level</h4>
                  <p className="text-sm text-gray-300">{selectedItem.integrationLevel}/10 - {getIntegrationLevelText(selectedItem.integrationLevel)}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveOllamaIntegration;

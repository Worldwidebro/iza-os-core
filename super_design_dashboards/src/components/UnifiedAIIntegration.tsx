import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Settings, Brain, TrendingUp, Users, Zap, Sparkles, Cpu, Building2, Server } from 'lucide-react';
import { useUniversalAPI } from '../hooks/useUniversalAPI';
import { useAgentSystem } from '../hooks/useAgentSystem';

type AIProvider = 'claude' | 'grok' | 'qwen' | 'iza' | 'ollama';

export const UnifiedAIIntegration: React.FC = () => {
  const universalAPI = useUniversalAPI();
  const { agents, isLoading: agentsLoading } = useAgentSystem();
  
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'recommendations' | 'analysis' | 'insights'>('chat');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('grok');
  const [lastProvider, setLastProvider] = useState<AIProvider>('grok');

  const isAnyConfigured = universalAPI.configuredProviders.length > 0;

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      const result = await universalAPI.sendMessage(selectedProvider, message);
      setResponse(result);
      setMessage('');
      setLastProvider(selectedProvider);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const systemMetrics = {
        totalAgents: Object.keys(agents).length,
        activeAgents: Object.values(agents).filter((agent: any) => agent.status === 'active').length,
        averageSuccessRate: Object.values(agents).reduce((acc: number, agent: any) => acc + (agent.metrics?.successRate || 0), 0) / Object.keys(agents).length,
        timestamp: new Date().toISOString()
      };
      
      const result = await universalAPI.getAgentRecommendations(selectedProvider, systemMetrics);
      setResponse(result);
      setLastProvider(selectedProvider);
    } catch (err) {
      console.error('Failed to get recommendations:', err);
    }
  };

  const handleAnalyzePerformance = async () => {
    try {
      const agentData = Object.values(agents).map((agent: any) => ({
        name: agent.name,
        role: agent.role,
        status: agent.status,
        metrics: agent.metrics
      }));
      
      const result = await universalAPI.analyzeAgentPerformance(selectedProvider, agentData);
      setResponse(result);
      setLastProvider(selectedProvider);
    } catch (err) {
      console.error('Failed to analyze performance:', err);
    }
  };

  const handleGenerateInsights = async () => {
    try {
      const businessMetrics = {
        ecosystemValue: '$1.4B+',
        revenuePipeline: '$10M+',
        automationLevel: '95%',
        teamEfficiency: '98.7%',
        agentCount: Object.keys(agents).length,
        timestamp: new Date().toISOString()
      };
      
      const result = await universalAPI.generateStrategicInsights(selectedProvider, businessMetrics);
      setResponse(result);
      setLastProvider(selectedProvider);
    } catch (err) {
      console.error('Failed to generate insights:', err);
    }
  };

  if (!isAnyConfigured) {
    return (
      <div className="glass rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Assistant Integration</h3>
          <p className="text-gray-600 mb-6">
            Configure either Claude or Grok (or both) to use AI-powered features.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h4>
            <div className="text-sm text-yellow-700 text-left space-y-2">
              <div>
                <strong>For Claude (Anthropic):</strong>
                <ol className="ml-4 mt-1 space-y-1">
                  <li>1. Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">Anthropic Console</a></li>
                  <li>2. Add: <code className="bg-yellow-100 px-1 rounded">VITE_ANTHROPIC_API_KEY=your_key_here</code></li>
                </ol>
              </div>
              <div>
                <strong>For Grok (xAI):</strong>
                <ol className="ml-4 mt-1 space-y-1">
                  <li>1. Get your API key from <a href="https://console.x.ai/" target="_blank" rel="noopener noreferrer" className="underline">xAI Console</a></li>
                  <li>2. Add: <code className="bg-yellow-100 px-1 rounded">VITE_XAI_API_KEY=your_key_here</code></li>
                </ol>
              </div>
              <div className="mt-2">
                <strong>Then:</strong>
                <ol className="ml-4 mt-1 space-y-1">
                  <li>3. Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in the project root</li>
                  <li>4. Add your API keys to the file</li>
                  <li>5. Restart the development server</li>
                </ol>
              </div>
            </div>
          </div>
                  <div className="grid grid-cols-5 gap-4 text-sm text-gray-500">
                    <div>
                      <p><strong>Claude:</strong> {universalAPI.configStatus.claude.configured ? '✅ Configured' : '❌ Not configured'}</p>
                      <p>Model: {universalAPI.configStatus.claude.model}</p>
                    </div>
                    <div>
                      <p><strong>Grok:</strong> {universalAPI.configStatus.grok.configured ? '✅ Configured' : '❌ Not configured'}</p>
                      <p>Model: {universalAPI.configStatus.grok.model}</p>
                    </div>
                    <div>
                      <p><strong>Qwen:</strong> {universalAPI.configStatus.qwen.configured ? '✅ Configured' : '❌ Not configured'}</p>
                      <p>Model: {universalAPI.configStatus.qwen.model}</p>
                    </div>
                    <div>
                      <p><strong>IZA OS:</strong> {universalAPI.configStatus.iza.configured ? '✅ Configured' : '❌ Not configured'}</p>
                      <p>Models: {universalAPI.configStatus.iza.models.length} available</p>
                    </div>
                    <div>
                      <p><strong>Ollama:</strong> {universalAPI.configStatus.ollama.configured ? '✅ Connected' : '❌ Not connected'}</p>
                      <p>Model: {universalAPI.configStatus.ollama.model || 'None'}</p>
                      <p>Models: {universalAPI.configStatus.ollama.modelsCount} available</p>
                    </div>
                  </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-blue-500" />
          <h3 className="text-2xl font-bold text-gray-800">AI Assistant Hub</h3>
        </div>
        
                {/* Provider Selection */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedProvider('claude')}
                    disabled={!universalAPI.configStatus.claude.configured}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedProvider === 'claude' && universalAPI.configStatus.claude.configured
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : universalAPI.configStatus.claude.configured
                          ? 'text-gray-600 hover:text-gray-800' 
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Claude</span>
                  </button>
                  <button
                    onClick={() => setSelectedProvider('grok')}
                    disabled={!universalAPI.configStatus.grok.configured}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedProvider === 'grok' && universalAPI.configStatus.grok.configured
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : universalAPI.configStatus.grok.configured
                          ? 'text-gray-600 hover:text-gray-800' 
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Grok</span>
                  </button>
                  <button
                    onClick={() => setSelectedProvider('qwen')}
                    disabled={!universalAPI.configStatus.qwen.configured}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedProvider === 'qwen' && universalAPI.configStatus.qwen.configured
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : universalAPI.configStatus.qwen.configured
                          ? 'text-gray-600 hover:text-gray-800' 
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Qwen</span>
                  </button>
                  <button
                    onClick={() => setSelectedProvider('iza')}
                    disabled={!universalAPI.configStatus.iza.configured}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedProvider === 'iza' && universalAPI.configStatus.iza.configured
                        ? 'bg-white text-green-600 shadow-sm' 
                        : universalAPI.configStatus.iza.configured
                          ? 'text-gray-600 hover:text-gray-800' 
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>IZA OS</span>
                  </button>
                  <button
                    onClick={() => setSelectedProvider('ollama')}
                    disabled={!universalAPI.configStatus.ollama.configured}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedProvider === 'ollama' && universalAPI.configStatus.ollama.configured
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : universalAPI.configStatus.ollama.configured
                          ? 'text-gray-600 hover:text-gray-800' 
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Server className="w-4 h-4" />
                    <span>Ollama</span>
                  </button>
                </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${universalAPI.configStatus.claude.configured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={universalAPI.configStatus.claude.configured ? 'text-green-600' : 'text-gray-500'}>Claude</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${universalAPI.configStatus.grok.configured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={universalAPI.configStatus.grok.configured ? 'text-green-600' : 'text-gray-500'}>Grok</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${universalAPI.configStatus.qwen.configured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={universalAPI.configStatus.qwen.configured ? 'text-green-600' : 'text-gray-500'}>Qwen</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${universalAPI.configStatus.iza.configured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={universalAPI.configStatus.iza.configured ? 'text-green-600' : 'text-gray-500'}>IZA OS</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${universalAPI.configStatus.ollama.configured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={universalAPI.configStatus.ollama.configured ? 'text-green-600' : 'text-gray-500'}>Ollama</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Using: <span className="font-semibold">{selectedProvider === 'claude' ? 'Claude' : selectedProvider === 'grok' ? 'Grok' : selectedProvider === 'qwen' ? 'Qwen' : selectedProvider === 'iza' ? 'IZA OS' : 'Ollama'}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'chat' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Chat
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'recommendations' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" />
          Recommendations
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analysis' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Analysis
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'insights' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Insights
        </button>
      </div>

      {/* Error Display */}
      {universalAPI.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-red-800">{universalAPI.error}</p>
            <button
              onClick={universalAPI.clearError}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask ${selectedProvider === 'claude' ? 'Claude' : 'Grok'} anything about your autonomous agents...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={currentService.isLoading || !message.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {currentService.isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <p className="text-gray-600">Get AI-powered recommendations for optimizing your agent ecosystem.</p>
          <button
            onClick={handleGetRecommendations}
            disabled={currentService.isLoading || agentsLoading}
            className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {currentService.isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Get Agent Recommendations</span>
              </>
            )}
          </button>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-4">
          <p className="text-gray-600">Analyze agent performance and get optimization suggestions.</p>
          <button
            onClick={handleAnalyzePerformance}
            disabled={currentService.isLoading || agentsLoading}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {currentService.isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Users className="w-5 h-5" />
                <span>Analyze Agent Performance</span>
              </>
            )}
          </button>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-4">
          <p className="text-gray-600">Generate strategic insights for your venture studio growth.</p>
          <button
            onClick={handleGenerateInsights}
            disabled={currentService.isLoading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {currentService.isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Generate Strategic Insights</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">
              {lastProvider === 'claude' ? 'Claude' : 'Grok'}'s Response:
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {lastProvider === 'claude' ? (
                <Sparkles className="w-4 h-4 text-blue-500" />
              ) : (
                <Zap className="w-4 h-4 text-orange-500" />
              )}
              <span>{lastProvider === 'claude' ? 'Claude' : 'Grok'}</span>
            </div>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {response}
          </div>
        </motion.div>
      )}

      {/* Configuration Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <p><strong>Claude:</strong> {anthropic.configStatus.model}</p>
            <p>Max Tokens: {anthropic.configStatus.maxTokens}</p>
          </div>
          <div>
            <p><strong>Grok:</strong> {xai.configStatus.model}</p>
            <p>API: {xai.configStatus.baseUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

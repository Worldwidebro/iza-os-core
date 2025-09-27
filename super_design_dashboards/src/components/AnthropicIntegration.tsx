import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Settings, Brain, TrendingUp, Users } from 'lucide-react';
import { useAnthropic } from '../hooks/useAnthropic';
import { useAgentSystem } from '../hooks/useAgentSystem';

export const AnthropicIntegration: React.FC = () => {
  const { 
    isLoading, 
    isConfigured, 
    error, 
    sendMessage, 
    getAgentRecommendations,
    analyzeAgentPerformance,
    generateStrategicInsights,
    configStatus,
    clearError 
  } = useAnthropic();
  
  const { agents, isLoading: agentsLoading } = useAgentSystem();
  
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'recommendations' | 'analysis' | 'insights'>('chat');

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      const result = await sendMessage(message);
      setResponse(result);
      setMessage('');
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
      
      const result = await getAgentRecommendations(systemMetrics);
      setResponse(result);
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
      
      const result = await analyzeAgentPerformance(agentData);
      setResponse(result);
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
      
      const result = await generateStrategicInsights(businessMetrics);
      setResponse(result);
    } catch (err) {
      console.error('Failed to generate insights:', err);
    }
  };

  if (!isConfigured) {
    return (
      <div className="glass rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Anthropic Claude Integration</h3>
          <p className="text-gray-600 mb-6">
            To use Claude AI features, please configure your Anthropic API key.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-yellow-700 text-left space-y-1">
              <li>1. Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">Anthropic Console</a></li>
              <li>2. Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in the project root</li>
              <li>3. Add: <code className="bg-yellow-100 px-1 rounded">VITE_ANTHROPIC_API_KEY=your_key_here</code></li>
              <li>4. Restart the development server</li>
            </ol>
          </div>
          <div className="text-sm text-gray-500">
            <p>Model: {configStatus.model}</p>
            <p>Max Tokens: {configStatus.maxTokens}</p>
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
          <h3 className="text-2xl font-bold text-gray-800">Claude AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Connected</span>
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
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-red-800">{error}</p>
            <button
              onClick={clearError}
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
              placeholder="Ask Claude anything about your autonomous agents..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
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
            disabled={isLoading || agentsLoading}
            className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
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
            disabled={isLoading || agentsLoading}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
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
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
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
          <h4 className="font-semibold text-gray-800 mb-2">Claude's Response:</h4>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {response}
          </div>
        </motion.div>
      )}

      {/* Configuration Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Model: {configStatus.model}</span>
          <span>Max Tokens: {configStatus.maxTokens}</span>
        </div>
      </div>
    </div>
  );
};

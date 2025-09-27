import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Github, 
  Zap, 
  Database, 
  Code, 
  FileText, 
  Sync, 
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { useIZAOSCore } from '../hooks/useIZAOSCore';
import { CoreRepository } from '../services/izaOSCoreIntegration';

const IZAOSCoreIntegration: React.FC = () => {
  const {
    isConnected,
    coreRepositories,
    izaOSConfig,
    ecosystemStatus,
    agentSystem,
    metrics,
    isLoading,
    integrationPerformance,
    ecosystemValue,
    automationLevel,
    repositoryCount,
    isHighPerformance,
    isFullyIntegrated,
    refreshAll
  } = useIZAOSCore();

  const getRepositoryIcon = (repoName: string) => {
    const icons: Record<string, React.ElementType> = {
      'codex': Code,
      'mcp_registry': Database,
      'filebrowser': FileText,
      'filesync': Sync,
      'pathway': TrendingUp,
      'bitnet': Cpu,
      'codebuff': Code
    };
    return icons[repoName] || Github;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-red-400 bg-red-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm md:text-base">Loading IZA OS Core Integration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Header */}
      <div className="text-center px-4">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          IZA OS Core Integration
        </motion.h2>
        <motion.p
          className="text-base md:text-xl text-gray-300 mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          10X Faster Ecosystem Integration
        </motion.p>
        
        {/* Connection Status */}
        <motion.div
          className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isConnected ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> : <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />}
          {isConnected ? 'Connected' : 'Disconnected'}
        </motion.div>
      </div>

      {/* Performance Metrics - Mobile Optimized */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="glass-card p-3 md:p-6 rounded-xl border border-blue-400/20 bg-blue-500/10">
          <div className="flex items-center mb-2 md:mb-4">
            <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-blue-400 mr-2 md:mr-3" />
            <h3 className="text-sm md:text-xl font-semibold text-white">Ecosystem Value</h3>
          </div>
          <p className="text-lg md:text-3xl font-bold text-blue-200">{formatCurrency(ecosystemValue)}</p>
        </div>

        <div className="glass-card p-3 md:p-6 rounded-xl border border-purple-400/20 bg-purple-500/10">
          <div className="flex items-center mb-2 md:mb-4">
            <Activity className="w-5 h-5 md:w-8 md:h-8 text-purple-400 mr-2 md:mr-3" />
            <h3 className="text-sm md:text-xl font-semibold text-white">Integration Score</h3>
          </div>
          <p className="text-lg md:text-3xl font-bold text-purple-200">{integrationPerformance}/100</p>
        </div>

        <div className="glass-card p-3 md:p-6 rounded-xl border border-green-400/20 bg-green-500/10">
          <div className="flex items-center mb-2 md:mb-4">
            <Zap className="w-5 h-5 md:w-8 md:h-8 text-green-400 mr-2 md:mr-3" />
            <h3 className="text-sm md:text-xl font-semibold text-white">Automation Level</h3>
          </div>
          <p className="text-lg md:text-3xl font-bold text-green-200">{(automationLevel * 100).toFixed(0)}%</p>
        </div>

        <div className="glass-card p-3 md:p-6 rounded-xl border border-yellow-400/20 bg-yellow-500/10">
          <div className="flex items-center mb-2 md:mb-4">
            <Github className="w-5 h-5 md:w-8 md:h-8 text-yellow-400 mr-2 md:mr-3" />
            <h3 className="text-sm md:text-xl font-semibold text-white">Repositories</h3>
          </div>
          <p className="text-lg md:text-3xl font-bold text-yellow-200">{repositoryCount}</p>
        </div>
      </motion.div>

      {/* Core Repositories - Mobile Optimized */}
      <motion.div
        className="glass-card p-4 md:p-8 rounded-2xl border border-white/10 mx-4 md:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-2xl font-bold text-white">Core Repository Integrations</h3>
          <button
            onClick={refreshAll}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold transition-colors text-sm md:text-base"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {coreRepositories.map((repo, index) => {
            const IconComponent = getRepositoryIcon(repo.name);
            return (
              <motion.div
                key={repo.name}
                className="glass-card p-4 md:p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mr-2 md:mr-3" />
                  <div>
                    <h4 className="text-sm md:text-lg font-semibold text-white capitalize">{repo.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(repo.status)}`}>
                      {repo.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 break-all">{repo.url}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-400">Integration Level:</span>
                    <span className="text-xs md:text-sm font-semibold text-blue-200">{repo.integration_level}/10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 md:h-2">
                    <div
                      className="bg-blue-500 h-1 md:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(repo.integration_level / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-3 md:mt-4">
                  <h5 className="text-xs md:text-sm font-semibold text-gray-300 mb-2">Capabilities:</h5>
                  <div className="flex flex-wrap gap-1">
                    {repo.capabilities.slice(0, 2).map((capability, capIndex) => (
                      <span
                        key={capIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md"
                      >
                        {capability.replace('_', ' ')}
                      </span>
                    ))}
                    {repo.capabilities.length > 2 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
                        +{repo.capabilities.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 md:mt-4 text-blue-400 hover:text-blue-300 text-xs md:text-sm font-semibold transition-colors"
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  View Repository
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Indicators - Mobile Optimized */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className={`flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                isHighPerformance ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                <Activity className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                {isHighPerformance ? 'High Performance' : 'Building Performance'}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                isFullyIntegrated ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                {isFullyIntegrated ? 'Fully Integrated' : 'Partial Integration'}
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400">
              {repositoryCount}/7 repositories integrated
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IZAOSCoreIntegration;
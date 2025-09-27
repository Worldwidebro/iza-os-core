import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  GitBranch,
  FileText,
  Layers,
  PieChart,
  BarChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus,
  ExternalLink,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';

// Types and Interfaces
interface EcosystemMetrics {
  completion_percentage: number;
  automation_level: number;
  ecosystem_value: string;
  revenue_pipeline: string;
  integration_score: number;
}

interface CompletionTracking {
  project_completion: number;
  agent_completion: number;
  repository_completion: number;
  ecosystem_completion: number;
  automation_level: number;
}

interface AgentEcosystem {
  meta_agent: { status: string; efficiency: number };
  sovereign44: { status: string; efficiency: number };
  specialized_bots: {
    total_bots: number;
    active_bots: number;
    categories: Record<string, number>;
  };
}

interface RepositoryManagement {
  worldwidebro_repos: number;
  external_integrations: number;
  total_repositories: number;
  integration_score: number;
}

interface VentureStudio {
  active_projects: number;
  revenue_pipeline: string;
  ecosystem_value: string;
  automation_level: number;
}

interface EcosystemAnalytics {
  performance_metrics: {
    frontend_performance: number;
    backend_efficiency: number;
    agent_coordination: number;
    repository_management: number;
    venture_operations: number;
    ecosystem_health: number;
  };
  health_checks: {
    api_status: string;
    database_status: string;
    websocket_status: string;
    agent_status: string;
  };
}

interface UnifiedEcosystemData {
  ecosystem_name: string;
  version: string;
  completion_tracking: CompletionTracking;
  agent_ecosystem: AgentEcosystem;
  repository_management: RepositoryManagement;
  venture_studio: VentureStudio;
  ecosystem_analytics: EcosystemAnalytics;
  overall_metrics: EcosystemMetrics;
}

// Custom Hooks
const useWorldwidebroEcosystem = () => {
  const [ecosystemData, setEcosystemData] = useState<UnifiedEcosystemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEcosystemData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/unified/status');
        if (response.ok) {
          const data = await response.json();
          setEcosystemData(data.data);
          setIsConnected(true);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error('Error fetching ecosystem data:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEcosystemData();
    const interval = setInterval(fetchEcosystemData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/unified/status');
      if (response.ok) {
        const data = await response.json();
        setEcosystemData(data.data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ecosystemData,
    isLoading,
    isConnected,
    lastUpdate,
    refreshData
  };
};

// Component Definitions
const ConnectionStatus: React.FC<{ isConnected: boolean }> = ({ isConnected }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
    isConnected 
      ? 'bg-green-100 text-green-800 border border-green-200' 
      : 'bg-red-100 text-red-800 border border-red-200'
  }`}>
    {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
    {isConnected ? 'Connected' : 'Disconnected'}
  </div>
);

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
}> = ({ title, value, icon: Icon, color, trend, subtitle }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && getTrendIcon()}
      </div>
      <h3 className="text-white/80 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-white/60 text-xs mt-1">{subtitle}</p>}
    </motion.div>
  );
};

const ProgressBar: React.FC<{ progress: number; label: string; color?: string }> = ({ 
  progress, 
  label, 
  color = 'bg-gradient-to-r from-blue-500 to-purple-500' 
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-white/80 text-sm font-medium">{label}</span>
      <span className="text-white text-sm font-bold">{progress}%</span>
    </div>
    <div className="w-full bg-white/20 rounded-full h-2">
      <motion.div
        className={`h-2 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const CompletionTrackingSection: React.FC<{ data: CompletionTracking }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
        <Target className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">🎯 Completion Tracking</h2>
        <p className="text-white/60">Real-time progress monitoring across all components</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard
        title="Project Completion"
        value={`${data.project_completion}%`}
        icon={CheckCircle}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
        trend="up"
      />
      <MetricCard
        title="Agent Completion"
        value={`${data.agent_completion}%`}
        icon={Bot}
        color="bg-gradient-to-r from-blue-500 to-cyan-500"
        trend="stable"
      />
      <MetricCard
        title="Repository Completion"
        value={`${data.repository_completion}%`}
        icon={GitBranch}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        trend="up"
      />
      <MetricCard
        title="Automation Level"
        value={`${data.automation_level}%`}
        icon={Zap}
        color="bg-gradient-to-r from-orange-500 to-red-500"
        trend="up"
      />
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Overall Progress</h3>
      <ProgressBar progress={data.ecosystem_completion} label="Ecosystem Completion" />
    </div>
  </motion.div>
);

const AgentEcosystemSection: React.FC<{ data: AgentEcosystem }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
        <Brain className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">🤖 Agent Ecosystem</h2>
        <p className="text-white/60">Advanced AI orchestration and specialized bot management</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Meta Agent"
        value={`${data.meta_agent.efficiency}%`}
        icon={Brain}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        subtitle={`Status: ${data.meta_agent.status}`}
        trend="up"
      />
      <MetricCard
        title="Sovereign44"
        value={`${data.sovereign44.efficiency}%`}
        icon={Cpu}
        color="bg-gradient-to-r from-cyan-500 to-blue-500"
        subtitle={`Status: ${data.sovereign44.status}`}
        trend="up"
      />
      <MetricCard
        title="Specialized Bots"
        value={`${data.specialized_bots.active_bots}/${data.specialized_bots.total_bots}`}
        icon={Bot}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
        subtitle="Active Bots"
        trend="stable"
      />
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Bot Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(data.specialized_bots.categories).map(([category, count]) => (
          <div key={category} className="text-center">
            <div className="text-white text-2xl font-bold">{count}</div>
            <div className="text-white/60 text-xs capitalize">
              {category.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const RepositoryManagementSection: React.FC<{ data: RepositoryManagement }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <GitBranch className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">📁 Repository Management</h2>
        <p className="text-white/60">Centralized repository coordination and integration</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Worldwidebro Repos"
        value={data.worldwidebro_repos}
        icon={Globe}
        color="bg-gradient-to-r from-blue-500 to-purple-500"
        subtitle="Core Repositories"
      />
      <MetricCard
        title="External Integrations"
        value={data.external_integrations}
        icon={ExternalLink}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
        subtitle="Connected Services"
      />
      <MetricCard
        title="Integration Score"
        value={`${data.integration_score}/100`}
        icon={Target}
        color="bg-gradient-to-r from-orange-500 to-red-500"
        subtitle="Overall Integration"
      />
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Repository Overview</h3>
      <div className="space-y-4">
        <ProgressBar 
          progress={(data.worldwidebro_repos / data.total_repositories) * 100} 
          label="Worldwidebro Repositories" 
        />
        <ProgressBar 
          progress={(data.external_integrations / 10) * 100} 
          label="External Integrations" 
          color="bg-gradient-to-r from-green-500 to-emerald-500"
        />
      </div>
    </div>
  </motion.div>
);

const VentureStudioSection: React.FC<{ data: VentureStudio }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
        <Rocket className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">🚀 Venture Studio</h2>
        <p className="text-white/60">Autonomous business operations and revenue generation</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Active Projects"
        value={data.active_projects}
        icon={Layers}
        color="bg-gradient-to-r from-blue-500 to-cyan-500"
        subtitle="Venture Projects"
      />
      <MetricCard
        title="Revenue Pipeline"
        value={data.revenue_pipeline}
        icon={DollarSign}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
        subtitle="Projected Revenue"
        trend="up"
      />
      <MetricCard
        title="Ecosystem Value"
        value={data.ecosystem_value}
        icon={TrendingUp}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        subtitle="Total Value"
        trend="up"
      />
      <MetricCard
        title="Automation Level"
        value={`${data.automation_level}%`}
        icon={Zap}
        color="bg-gradient-to-r from-orange-500 to-red-500"
        subtitle="Operations Automated"
        trend="up"
      />
    </div>
  </motion.div>
);

const EcosystemAnalyticsSection: React.FC<{ data: EcosystemAnalytics }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
        <BarChart3 className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-white text-xl font-bold">📈 Ecosystem Analytics</h2>
        <p className="text-white/60">Performance metrics and system health monitoring</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(data.performance_metrics).map(([metric, value]) => (
        <MetricCard
          key={metric}
          title={metric.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          value={`${value}%`}
          icon={BarChart}
          color="bg-gradient-to-r from-indigo-500 to-purple-500"
          trend={value >= 90 ? 'up' : value >= 80 ? 'stable' : 'down'}
        />
      ))}
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">System Health Checks</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(data.health_checks).map(([check, status]) => (
          <div key={check} className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              status === 'Healthy' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {status === 'Healthy' ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
              {status}
            </div>
            <div className="text-white/60 text-xs mt-1 capitalize">
              {check.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Main Component
const WorldwidebroUnifiedDashboard: React.FC = () => {
  const { ecosystemData, isLoading, isConnected, lastUpdate, refreshData } = useWorldwidebroEcosystem();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading Worldwidebro Ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🌍 IZA OS Worldwidebro Unified Dashboard</h1>
              <p className="text-white/60">Complete Integration of All Ecosystem Components</p>
            </div>
            <div className="flex items-center gap-4">
              <ConnectionStatus isConnected={isConnected} />
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <div className="text-white/60 text-sm">
                <Clock className="w-4 h-4 inline mr-1" />
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {ecosystemData && (
          <div className="space-y-12">
            {/* Overall Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              <MetricCard
                title="Ecosystem Completion"
                value={`${ecosystemData.overall_metrics.completion_percentage}%`}
                icon={Target}
                color="bg-gradient-to-r from-green-500 to-emerald-500"
                trend="up"
              />
              <MetricCard
                title="Automation Level"
                value={`${ecosystemData.overall_metrics.automation_level}%`}
                icon={Zap}
                color="bg-gradient-to-r from-blue-500 to-cyan-500"
                trend="up"
              />
              <MetricCard
                title="Ecosystem Value"
                value={ecosystemData.overall_metrics.ecosystem_value}
                icon={TrendingUp}
                color="bg-gradient-to-r from-purple-500 to-pink-500"
                trend="up"
              />
              <MetricCard
                title="Revenue Pipeline"
                value={ecosystemData.overall_metrics.revenue_pipeline}
                icon={DollarSign}
                color="bg-gradient-to-r from-orange-500 to-red-500"
                trend="up"
              />
              <MetricCard
                title="Integration Score"
                value={`${ecosystemData.overall_metrics.integration_score}/100`}
                icon={Network}
                color="bg-gradient-to-r from-indigo-500 to-purple-500"
                trend="up"
              />
            </motion.div>

            {/* Section Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CompletionTrackingSection data={ecosystemData.completion_tracking} />
              <AgentEcosystemSection data={ecosystemData.agent_ecosystem} />
              <RepositoryManagementSection data={ecosystemData.repository_management} />
              <VentureStudioSection data={ecosystemData.venture_studio} />
            </div>

            {/* Full Width Analytics */}
            <EcosystemAnalyticsSection data={ecosystemData.ecosystem_analytics} />
          </div>
        )}

        {!ecosystemData && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">Unable to Load Ecosystem Data</h2>
            <p className="text-white/60 mb-6">Please check your connection and try again.</p>
            <button
              onClick={refreshData}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
            >
              Retry Connection
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-lg mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-white/60">
            <div>
              <p className="text-sm">© 2024 IZA OS Worldwidebro Unified Ecosystem</p>
              <p className="text-xs">Version {ecosystemData?.version || '1.0.0'} • Complete Integration Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Powered by Advanced AI Orchestration</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorldwidebroUnifiedDashboard;

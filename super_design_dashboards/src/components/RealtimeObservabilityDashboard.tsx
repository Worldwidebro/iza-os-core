import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Eye, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign,
  Bot,
  Database,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Network,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import toast from 'react-hot-toast';

// Real-time metrics types
interface RealtimeMetrics {
  timestamp: string;
  agents: {
    active: number;
    idle: number;
    error: number;
    total: number;
  };
  system: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  business: {
    revenue: number;
    deals: number;
    conversions: number;
    pipeline: number;
  };
  performance: {
    responseTime: number;
    throughput: number;
    errorRate: number;
    uptime: number;
  };
  security: {
    threats: number;
    blocked: number;
    alerts: number;
    compliance: number;
  };
}

interface LiveEvent {
  id: string;
  type: 'agent' | 'business' | 'system' | 'security' | 'performance';
  timestamp: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  data?: any;
}

export const RealtimeObservabilityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<RealtimeMetrics | null>(null);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [selectedView, setSelectedView] = useState<'overview' | 'agents' | 'business' | 'system' | 'security'>('overview');

  // WebSocket connection for real-time data
  const { socket, isConnected, lastMessage } = useWebSocket({
    url: process.env.VITE_WS_URL || 'ws://localhost:8000',
    path: '/socket.io/',
    autoConnect: true,
    reconnect: true,
    maxReconnectAttempts: 10
  });

  // Handle real-time metrics updates
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'metrics_update') {
      setMetrics(lastMessage.data);
    }
  }, [lastMessage]);

  // Handle live events
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'live_event') {
      const event: LiveEvent = {
        id: `event-${Date.now()}-${Math.random()}`,
        type: lastMessage.data.type,
        timestamp: new Date().toISOString(),
        message: lastMessage.data.message,
        severity: lastMessage.data.severity,
        data: lastMessage.data.data
      };
      
      setLiveEvents(prev => [event, ...prev.slice(0, 99)]); // Keep last 100 events
      
      // Show toast for important events
      if (event.severity === 'error') {
        toast.error(event.message);
      } else if (event.severity === 'warning') {
        toast(event.message, { icon: '⚠️' });
      } else if (event.severity === 'success') {
        toast.success(event.message);
      }
    }
  }, [lastMessage]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (socket && isConnected) {
      socket.emit('subscribe', 'realtime_metrics');
      socket.emit('subscribe', 'live_events');
      socket.emit('subscribe', 'agent_updates');
      socket.emit('subscribe', 'business_updates');
      socket.emit('subscribe', 'system_updates');
      socket.emit('subscribe', 'security_updates');
    }
  }, [socket, isConnected]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-500 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'success': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold">Live Observatory</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-sm">{isConnected ? 'LIVE' : 'DISCONNECTED'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg transition-all ${
                isLive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isLive ? 'PAUSE' : 'RESUME'}
            </button>
            
            <div className="text-sm text-gray-300">
              Last Update: {metrics ? new Date(metrics.timestamp).toLocaleTimeString() : '--:--:--'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 p-4">
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'agents', label: 'Agents', icon: Bot },
              { id: 'business', label: 'Business', icon: DollarSign },
              { id: 'system', label: 'System', icon: Cpu },
              { id: 'security', label: 'Security', icon: Shield }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                  selectedView === id 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Live Events Feed */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Live Events</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {liveEvents.slice(0, 10).map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`p-2 rounded-lg border text-xs ${getSeverityColor(event.severity)}`}
                  >
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(event.severity)}
                      <span className="font-medium">{event.type.toUpperCase()}</span>
                      <span className="text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-1 text-gray-700">{event.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedView === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Active Agents</p>
                      <p className="text-3xl font-bold text-green-400">
                        {metrics?.agents.active || 0}
                      </p>
                    </div>
                    <Bot className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">+12% from last hour</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Revenue Today</p>
                      <p className="text-3xl font-bold text-blue-400">
                        ${metrics?.business.revenue?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">+23% from yesterday</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">System Health</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {metrics?.performance.uptime || 0}%
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">All systems operational</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Security Score</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        {metrics?.security.compliance || 0}%
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">No threats detected</span>
                  </div>
                </motion.div>
              </div>

              {/* Real-time Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Agent Activity</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Real-time agent activity chart would go here
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Business Metrics</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Real-time business metrics chart would go here
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === 'agents' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Live Agent Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Agent cards would be rendered here with real-time data */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4">BotGod_v1</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Status:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tasks:</span>
                      <span className="text-blue-400">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Success Rate:</span>
                      <span className="text-green-400">98.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add other views for business, system, and security */}
        </div>
      </div>
    </div>
  );
};

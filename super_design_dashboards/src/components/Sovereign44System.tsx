import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Building2, 
  Network, 
  DollarSign, 
  Target, 
  Zap, 
  Shield, 
  Database,
  Globe,
  Bot,
  Brain,
  Code,
  BarChart3,
  Users,
  Settings,
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
  Square
} from 'lucide-react';

interface TradingPosition {
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

interface BusinessMetrics {
  name: string;
  revenue: number;
  growth: number;
  customers: number;
  status: 'active' | 'growing' | 'stable' | 'declining';
}

interface NetworkConnection {
  id: string;
  name: string;
  type: 'person' | 'company' | 'opportunity';
  value: number;
  probability: number;
  expectedValue: number;
  status: 'active' | 'pending' | 'closed';
}

const Sovereign44System: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trading' | 'businesses' | 'network' | 'automation'>('trading');
  const [isAutoTrading, setIsAutoTrading] = useState(false);
  const [isAutoBusiness, setIsAutoBusiness] = useState(false);

  // Mock data for demonstration
  const tradingPositions: TradingPosition[] = [
    {
      symbol: 'AAPL',
      side: 'long',
      size: 100,
      entryPrice: 150.00,
      currentPrice: 155.50,
      pnl: 550,
      pnlPercent: 3.67
    },
    {
      symbol: 'TSLA',
      side: 'short',
      size: 50,
      entryPrice: 200.00,
      currentPrice: 195.00,
      pnl: 250,
      pnlPercent: 2.50
    },
    {
      symbol: 'NVDA',
      side: 'long',
      size: 75,
      entryPrice: 400.00,
      currentPrice: 420.00,
      pnl: 1500,
      pnlPercent: 5.00
    }
  ];

  const businesses: BusinessMetrics[] = [
    {
      name: 'AI SaaS Platform',
      revenue: 50000,
      growth: 25,
      customers: 150,
      status: 'growing'
    },
    {
      name: 'Trading Algorithm',
      revenue: 75000,
      growth: 40,
      customers: 25,
      status: 'growing'
    },
    {
      name: 'Consulting Services',
      revenue: 30000,
      growth: 15,
      customers: 45,
      status: 'stable'
    }
  ];

  const networkConnections: NetworkConnection[] = [
    {
      id: '1',
      name: 'Tech Startup CEO',
      type: 'person',
      value: 100000,
      probability: 0.7,
      expectedValue: 70000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Enterprise Client',
      type: 'company',
      value: 500000,
      probability: 0.4,
      expectedValue: 200000,
      status: 'pending'
    },
    {
      id: '3',
      name: 'Investment Opportunity',
      type: 'opportunity',
      value: 250000,
      probability: 0.6,
      expectedValue: 150000,
      status: 'active'
    }
  ];

  const totalPnL = tradingPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalRevenue = businesses.reduce((sum, biz) => sum + biz.revenue, 0);
  const totalExpectedValue = networkConnections.reduce((sum, conn) => sum + conn.expectedValue, 0);

  const tabs = [
    { id: 'trading', label: 'Trading Engine', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
    { id: 'businesses', label: 'Business Portfolio', icon: Building2, color: 'from-blue-500 to-cyan-600' },
    { id: 'network', label: 'Network Intelligence', icon: Network, color: 'from-purple-500 to-pink-600' },
    { id: 'automation', label: 'Automation Hub', icon: Zap, color: 'from-orange-500 to-red-600' }
  ];

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
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Sovereign-44 System</h1>
            <p className="text-gray-300">Autonomous Quantitative Empire Management</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Trading P&L</p>
                <p className={`text-lg font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalPnL.toLocaleString()}
                </p>
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
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Monthly Revenue</p>
                <p className="text-lg font-bold text-blue-400">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Expected Value</p>
                <p className="text-lg font-bold text-purple-400">${totalExpectedValue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Automation Status */}
        <div className="flex justify-center space-x-4 mb-6">
          <motion.button
            onClick={() => setIsAutoTrading(!isAutoTrading)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isAutoTrading 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoTrading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>Auto Trading: {isAutoTrading ? 'ON' : 'OFF'}</span>
          </motion.button>

          <motion.button
            onClick={() => setIsAutoBusiness(!isAutoBusiness)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isAutoBusiness 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoBusiness ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>Auto Business: {isAutoBusiness ? 'ON' : 'OFF'}</span>
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
        {activeTab === 'trading' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Trading Positions</h3>
              <div className="flex space-x-2">
                <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {tradingPositions.map((position, index) => (
                <motion.div
                  key={position.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${position.side === 'long' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-semibold text-white">{position.symbol}</p>
                      <p className="text-sm text-gray-400">{position.side.toUpperCase()} • {position.size} shares</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white">${position.currentPrice.toFixed(2)}</p>
                    <div className="flex items-center space-x-1">
                      {position.pnl >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <p className={`font-semibold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${position.pnl.toFixed(0)} ({position.pnlPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'businesses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Business Portfolio</h3>
              <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid gap-4">
              {businesses.map((business, index) => (
                <motion.div
                  key={business.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{business.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      business.status === 'growing' ? 'bg-green-500/20 text-green-400' :
                      business.status === 'stable' ? 'bg-blue-500/20 text-blue-400' :
                      business.status === 'declining' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {business.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Revenue</p>
                      <p className="font-semibold text-white">${business.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Growth</p>
                      <p className="font-semibold text-green-400">+{business.growth}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Customers</p>
                      <p className="font-semibold text-white">{business.customers}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Network Intelligence</h3>
              <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid gap-4">
              {networkConnections.map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        connection.type === 'person' ? 'bg-blue-500/20' :
                        connection.type === 'company' ? 'bg-green-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        {connection.type === 'person' ? <Users className="w-4 h-4 text-blue-400" /> :
                         connection.type === 'company' ? <Building2 className="w-4 h-4 text-green-400" /> :
                         <Target className="w-4 h-4 text-purple-400" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{connection.name}</h4>
                        <p className="text-sm text-gray-400 capitalize">{connection.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      connection.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      connection.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {connection.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Deal Value</p>
                      <p className="font-semibold text-white">${connection.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Probability</p>
                      <p className="font-semibold text-blue-400">{(connection.probability * 100).toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Expected Value</p>
                      <p className="font-semibold text-purple-400">${connection.expectedValue.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Automation Hub</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Trading Automation</h4>
                    <p className="text-sm text-gray-400">Automated trading strategies</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Kelly Criterion</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Risk Management</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Portfolio Rebalancing</span>
                    <span className="text-blue-400">Scheduled</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Business Automation</h4>
                    <p className="text-sm text-gray-400">Automated business operations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer Success</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenue Tracking</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance Optimization</span>
                    <span className="text-blue-400">Scheduled</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Network Automation</h4>
                    <p className="text-sm text-gray-400">Automated relationship management</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lead Scoring</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Follow-up Automation</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Value Calculation</span>
                    <span className="text-blue-400">Real-time</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 bg-white/5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">System Automation</h4>
                    <p className="text-sm text-gray-400">Infrastructure automation</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Auto-scaling</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance Monitoring</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Backup & Recovery</span>
                    <span className="text-blue-400">Scheduled</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Sovereign44System;

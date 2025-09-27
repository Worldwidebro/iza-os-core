import React from 'react'
import { motion } from 'framer-motion'
import { Target, Activity, TrendingUp, DollarSign, Users, Zap } from 'lucide-react'

export const MetricsPage: React.FC = () => {
  const metrics = [
    {
      title: 'Ecosystem Value',
      value: '$1.4B+',
      change: '+25%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Revenue Pipeline',
      value: '$10M+',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Automation Level',
      value: '95%+',
      change: '+5%',
      trend: 'up',
      icon: Zap,
      color: 'text-purple-400'
    },
    {
      title: 'Active Agents',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'text-orange-400'
    },
    {
      title: 'Performance Score',
      value: '99%',
      change: '+3%',
      trend: 'up',
      icon: Target,
      color: 'text-yellow-400'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-400'
    }
  ]

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">IZA OS Key Metrics</h1>
            <p className="text-gray-400">Real-time business intelligence and performance analytics</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-green-400">{metric.change}</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{metric.title}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${parseInt(metric.value.replace(/[^\d]/g, ''))}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

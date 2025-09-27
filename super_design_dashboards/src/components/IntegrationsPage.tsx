import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Link, Shield, User, BarChart3, Activity, Target, Users, Settings, TrendingUp, DollarSign, Network, Zap } from 'lucide-react'

export const IntegrationsPage: React.FC = () => {
  const integrations = [
    {
      name: 'Trading APIs',
      icon: TrendingUp,
      status: 'connected',
      description: 'Alpaca, Alpha Vantage, IEX Cloud',
      color: 'text-green-400'
    },
    {
      name: 'AI Services',
      icon: Zap,
      status: 'connected',
      description: 'Anthropic, OpenAI, Hugging Face',
      color: 'text-purple-400'
    },
    {
      name: 'Database',
      icon: Shield,
      status: 'connected',
      description: 'Supabase, Neo4j, PostgreSQL',
      color: 'text-blue-400'
    },
    {
      name: 'Business Tools',
      icon: DollarSign,
      status: 'connected',
      description: 'Base44, Stripe, Analytics',
      color: 'text-yellow-400'
    },
    {
      name: 'Network APIs',
      icon: Network,
      status: 'connected',
      description: 'LinkedIn, Twitter, GitHub',
      color: 'text-orange-400'
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
          <Globe className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">IZA OS Integrations</h1>
            <p className="text-gray-400">Complete API ecosystem for autonomous operations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="glass-card p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <integration.icon className={`w-6 h-6 ${integration.color}`} />
                <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
              </div>
              <p className="text-gray-400 text-sm">{integration.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-green-400 text-sm font-medium">Connected</span>
                <span className="text-gray-500 text-xs">99.9% uptime</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

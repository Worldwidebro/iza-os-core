import React from 'react'
import { motion } from 'framer-motion'
import { Users, Settings, BarChart3, Brain, Cpu, Zap, Shield, Target } from 'lucide-react'

export const AgentManagementPage: React.FC = () => {
  const agents = [
    {
      name: 'MetaAgent',
      role: 'CEO Agent',
      status: 'active',
      performance: 99,
      icon: Brain,
      color: 'text-blue-400',
      description: 'Self-aware, self-improving system orchestrator'
    },
    {
      name: 'CTO Agent',
      role: 'Technical Architect',
      status: 'active',
      performance: 96,
      icon: Cpu,
      color: 'text-green-400',
      description: 'Code generation and system architecture'
    },
    {
      name: 'Marketing Agent',
      role: 'Brand Strategist',
      status: 'active',
      performance: 94,
      icon: Zap,
      color: 'text-purple-400',
      description: 'Content creation and brand strategy'
    },
    {
      name: 'Finance Agent',
      role: 'Financial Analyst',
      status: 'active',
      performance: 95,
      icon: BarChart3,
      color: 'text-yellow-400',
      description: 'P&L analysis and cost optimization'
    },
    {
      name: 'Legal Agent',
      role: 'Compliance Officer',
      status: 'active',
      performance: 98,
      icon: Shield,
      color: 'text-red-400',
      description: 'Risk management and compliance'
    },
    {
      name: 'HR Agent',
      role: 'Team Manager',
      status: 'active',
      performance: 92,
      icon: Users,
      color: 'text-orange-400',
      description: 'Talent acquisition and team management'
    },
    {
      name: 'Sales Agent',
      role: 'Revenue Generator',
      status: 'active',
      performance: 93,
      icon: Target,
      color: 'text-pink-400',
      description: 'Client relations and revenue growth'
    },
    {
      name: 'Product Agent',
      role: 'UX Specialist',
      status: 'active',
      performance: 91,
      icon: Settings,
      color: 'text-cyan-400',
      description: 'User experience and feature development'
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
          <Users className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">IZA OS Agent Management</h1>
            <p className="text-gray-400">Advanced AI agent orchestration with Maestro hierarchy</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
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
                <agent.icon className={`w-8 h-8 ${agent.color}`} />
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">{agent.status}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-1">{agent.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{agent.role}</p>
              <p className="text-gray-400 text-xs mb-4">{agent.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-white">{agent.performance}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.performance}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

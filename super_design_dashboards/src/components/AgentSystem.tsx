import React from 'react'
import { motion } from 'framer-motion'

export const AgentSystem: React.FC = () => {
  return (
    <motion.section 
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 gradient-text"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        AI Agent System
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Agent Hierarchy</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-gray-300">CEO Agent (MetaAgent)</span>
            </div>
            <div className="ml-4 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">CTO Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Marketing Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Finance Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Legal Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">HR Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Sales Agent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Product Agent</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Agent Capabilities</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Strategic Planning</span>
              <span className="text-green-400">99%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Code Generation</span>
              <span className="text-green-400">96%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">UI/UX Design</span>
              <span className="text-green-400">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Marketing</span>
              <span className="text-green-400">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Financial Analysis</span>
              <span className="text-green-400">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Legal Compliance</span>
              <span className="text-green-400">98%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

import React from 'react'
import { motion } from 'framer-motion'

export const OrchestrationEngine: React.FC = () => {
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
        Orchestration Engine
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Maestro</h3>
          <p className="text-gray-300 mb-4">
            AI agent orchestration and task management system
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Active Workflows</span>
              <span className="text-white">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-green-400">98%</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Traycer v2</h3>
          <p className="text-gray-300 mb-4">
            Multi-site optimization and performance monitoring
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Sites Optimized</span>
              <span className="text-white">300+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Performance Gain</span>
              <span className="text-green-400">+35%</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Pathfinder</h3>
          <p className="text-gray-300 mb-4">
            AI agent collaboration and skill matching system
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Collaborations</span>
              <span className="text-white">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Match Accuracy</span>
              <span className="text-green-400">99%</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

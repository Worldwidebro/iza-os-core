import React from 'react'
import { motion } from 'framer-motion'

export const PromptArsenal: React.FC = () => {
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
        200-Prompt Arsenal
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          <h3 className="text-xl font-semibold text-white mb-4">Glass-Morphism UI</h3>
          <p className="text-gray-300 mb-4">20 prompts for premium frosted, floating UI</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">DesignBot</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">Tailwind, CSS</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Agent Orchestration</h3>
          <p className="text-gray-300 mb-4">20 prompts for AI agent coordination</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">MetaAgent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">LangChain, Socket.IO</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">God-Mode Features</h3>
          <p className="text-gray-300 mb-4">20 prompts for self-healing systems</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">MetaAgent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">LangChain, Temporal</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Components & Layouts</h3>
          <p className="text-gray-300 mb-4">20 prompts for modular components</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">CTO Agent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">React, TypeScript</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Animations & Interactions</h3>
          <p className="text-gray-300 mb-4">20 prompts for micro-interactions</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">MotionBot</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">Framer Motion</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Deployment & Monitoring</h3>
          <p className="text-gray-300 mb-4">20 prompts for CI/CD and monitoring</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Agent</span>
              <span className="text-white">DeployBot</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tools</span>
              <span className="text-white">Vercel, GitHub Actions</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

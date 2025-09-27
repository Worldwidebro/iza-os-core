import React from 'react'
import { motion } from 'framer-motion'

export const EcosystemOverview: React.FC = () => {
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
        IZA OS Ecosystem Overview
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div 
          className="glass-card hover-glow transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-blue-400 mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              $1.4B+
            </motion.div>
            <div className="text-gray-300">Ecosystem Value</div>
            <div className="text-sm text-gray-400 mt-2">Autonomous venture studio</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card hover-glow transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-green-400 mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              $10M+
            </motion.div>
            <div className="text-gray-300">Revenue Pipeline</div>
            <div className="text-sm text-gray-400 mt-2">Project portfolio</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card hover-glow transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-purple-400 mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              95%+
            </motion.div>
            <div className="text-gray-300">Automation Level</div>
            <div className="text-sm text-gray-400 mt-2">AI-powered operations</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card hover-glow transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-yellow-400 mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              4
            </motion.div>
            <div className="text-gray-300">AI Providers</div>
            <div className="text-sm text-gray-400 mt-2">Claude, Grok, Qwen, IZA</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

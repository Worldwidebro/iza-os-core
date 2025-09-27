import React from 'react'
import { motion } from 'framer-motion'

interface AgentCardProps {
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'busy';
  performance: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ 
  name, 
  role, 
  status, 
  performance 
}) => {
  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    busy: 'bg-yellow-500'
  }
  
  return (
    <motion.div 
      className="glass-card hover:scale-105 transition-transform duration-300 cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <motion.div 
          className={`w-3 h-3 rounded-full ${statusColors[status]}`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.p 
        className="text-gray-300 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {role}
      </motion.p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Performance</span>
          <span className="text-white">{performance}%</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${performance}%` }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
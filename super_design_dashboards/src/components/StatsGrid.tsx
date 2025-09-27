import React from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend }) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  }
  
  return (
    <motion.div 
      className="glass-card hover:scale-105 transition-transform duration-300 cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h4 
        className="text-sm font-medium text-gray-400 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h4>
      <motion.p 
        className="text-2xl font-bold text-white mb-1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {value}
      </motion.p>
      {change && (
        <motion.p 
          className={`text-sm ${trendColors[trend || 'neutral']}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {change}
        </motion.p>
      )}
    </motion.div>
  )
}

export const StatsGrid: React.FC = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <StatCard 
          title="Total Agents"
          value="8"
          change="+2 this week"
          trend="up"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <StatCard 
          title="Active Tasks"
          value="147"
          change="+12 today"
          trend="up"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <StatCard 
          title="Performance Score"
          value="99%"
          change="+5% this month"
          trend="up"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <StatCard 
          title="Revenue Impact"
          value="$1.4B"
          change="+25% this quarter"
          trend="up"
        />
      </motion.div>
    </motion.div>
  )
}
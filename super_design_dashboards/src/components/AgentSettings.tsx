import React from 'react';
import { motion } from 'framer-motion';

export const AgentSettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Agent Settings</h1>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <p className="text-gray-600">Agent configuration settings will be displayed here.</p>
        </div>
      </motion.div>
    </div>
  );
};

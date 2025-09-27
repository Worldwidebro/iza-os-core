import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Bot, Users } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'active' | 'idle' | 'error';
  metrics: {
    tasksCompleted: number;
    successRate: number;
    revenue: string;
  };
  agents: string[];
}

interface AgentFlowProps {
  agents: Record<string, Agent>;
}

export const AgentFlow: React.FC<AgentFlowProps> = ({ agents }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Organize agents by hierarchy level
  const hierarchyLevels = [
    ['botgod_v1'], // CEO level
    ['cto_agent', 'cmo_agent', 'cfo_agent'], // C-level
    ['devin', 'jasper', 'penny', 'loop', 'fin', 'forecast', 'audit'], // Manager level
    ['smol', 'claire', 'aider'], // Individual contributor level
  ];

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-card"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Autonomous Agent Hierarchy
        </h2>
        <p className="text-gray-600">
          Real-time visualization of our AI agent ecosystem
        </p>
      </div>

      <div className="space-y-8">
        {hierarchyLevels.map((level, levelIndex) => (
          <motion.div
            key={levelIndex}
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-6"
          >
            {level.map((agentId, agentIndex) => {
              const agent = agents[agentId];
              if (!agent) return null;

              return (
                <motion.div
                  key={agentId}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative"
                >
                  {/* Agent Node */}
                  <div className="glass-card p-4 min-w-[200px] text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className={`w-3 h-3 rounded-full ${getAgentStatusColor(agent.status)} mr-2`} />
                      <Bot className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{agent.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{agent.role}</p>
                    <div className="text-xs text-gray-500">
                      {agent.metrics.tasksCompleted} tasks
                    </div>
                  </div>

                  {/* Connection Lines */}
                  {levelIndex < hierarchyLevels.length - 1 && (
                    <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2">
                      <ArrowDown className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-gray-600">Idle</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-600">Error</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

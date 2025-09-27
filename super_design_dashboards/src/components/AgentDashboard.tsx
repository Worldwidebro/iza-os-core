import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAgentSystem } from '../hooks/useAgentSystem';
import { AgentCard } from '../components/AgentCard';
import { StatsGrid } from '../components/StatsGrid';
import { AgentFlow } from '../components/AgentFlow';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Confetti } from '../components/Confetti';
import { useAutoCelebrate } from '../hooks/useAutoCelebrate';
import { AnthropicIntegration } from '../components/AnthropicIntegration';
import { UnifiedAIIntegration } from '../components/UnifiedAIIntegration';

// Agent definitions based on the architecture diagram
const AGENT_SYSTEM = {
  ceo: {
    id: 'botgod_v1',
    name: 'BotGod_v1',
    role: 'CEO Agent',
    description: 'Orchestrates the entire autonomous development team',
    status: 'active',
    metrics: { tasksCompleted: 1247, successRate: 98.7, revenue: '$2.4M' },
    agents: ['cto', 'cmo', 'cfo']
  },
  cto: {
    id: 'cto_agent',
    name: 'CTO Agent',
    role: 'Chief Technology Officer',
    description: 'Manages engineering agents and technical architecture',
    status: 'active',
    metrics: { tasksCompleted: 892, successRate: 96.2, revenue: '$1.8M' },
    agents: ['devin', 'smol', 'claire', 'aider']
  },
  devin: {
    id: 'devin',
    name: 'Devin',
    role: 'Full-Stack Engineer',
    description: 'Autonomous software development and architecture',
    status: 'active',
    metrics: { tasksCompleted: 456, successRate: 94.8, revenue: '$1.2M' },
    agents: ['smol', 'claire']
  },
  smol: {
    id: 'smol',
    name: 'Smol',
    role: 'Frontend MVP',
    description: 'Rapid prototyping and UI/UX development',
    status: 'active',
    metrics: { tasksCompleted: 234, successRate: 92.1, revenue: '$800K' },
    agents: []
  },
  claire: {
    id: 'claire',
    name: 'Claire',
    role: 'In-Editor Pair Programmer',
    description: 'Real-time code assistance and pair programming',
    status: 'active',
    metrics: { tasksCompleted: 678, successRate: 97.3, revenue: '$1.5M' },
    agents: []
  },
  aider: {
    id: 'aider',
    name: 'Aider',
    role: 'Legacy Code Whisperer',
    description: 'Refactoring and modernizing legacy systems',
    status: 'active',
    metrics: { tasksCompleted: 189, successRate: 89.5, revenue: '$600K' },
    agents: []
  },
  cmo: {
    id: 'cmo_agent',
    name: 'CMO Agent',
    role: 'Chief Marketing Officer',
    description: 'Manages growth agents and marketing strategy',
    status: 'active',
    metrics: { tasksCompleted: 567, successRate: 95.4, revenue: '$1.9M' },
    agents: ['jasper', 'penny', 'loop']
  },
  jasper: {
    id: 'jasper',
    name: 'Jasper',
    role: 'Chief Content Officer',
    description: 'Content creation and marketing automation',
    status: 'active',
    metrics: { tasksCompleted: 345, successRate: 93.7, revenue: '$1.1M' },
    agents: []
  },
  penny: {
    id: 'penny',
    name: 'Penny',
    role: 'Ad Creative Director',
    description: 'Creative advertising and campaign management',
    status: 'active',
    metrics: { tasksCompleted: 278, successRate: 91.2, revenue: '$950K' },
    agents: []
  },
  loop: {
    id: 'loop',
    name: 'Loop',
    role: 'Growth Loops',
    description: 'Automated growth and retention strategies',
    status: 'active',
    metrics: { tasksCompleted: 412, successRate: 96.8, revenue: '$1.3M' },
    agents: []
  },
  cfo: {
    id: 'cfo_agent',
    name: 'CFO Agent',
    role: 'Chief Financial Officer',
    description: 'Manages finance agents and financial operations',
    status: 'active',
    metrics: { tasksCompleted: 234, successRate: 98.1, revenue: '$2.1M' },
    agents: ['fin', 'forecast', 'audit']
  },
  fin: {
    id: 'fin',
    name: 'Fin',
    role: 'Banking Operations AI',
    description: 'Automated banking and financial transactions',
    status: 'active',
    metrics: { tasksCompleted: 156, successRate: 99.2, revenue: '$1.7M' },
    agents: []
  },
  forecast: {
    id: 'forecast',
    name: 'Forecast',
    role: 'FP&A Predictor',
    description: 'Financial planning and predictive analytics',
    status: 'active',
    metrics: { tasksCompleted: 89, successRate: 94.6, revenue: '$800K' },
    agents: []
  },
  audit: {
    id: 'audit',
    name: 'Audit',
    role: 'Compliance Scanner',
    description: 'Automated compliance and audit processes',
    status: 'active',
    metrics: { tasksCompleted: 67, successRate: 97.8, revenue: '$600K' },
    agents: []
  }
};

export const AgentDashboard: React.FC = () => {
  const { agents, isLoading, error, isUpdating } = useAgentSystem();
  const { shouldCelebrate, triggerCelebration } = useAutoCelebrate();

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

  return (
    <>
      <Helmet>
        <title>IZA OS - Autonomous Agent Dashboard</title>
        <meta name="description" content="Enterprise AI Development Platform with Autonomous Agents" />
      </Helmet>

      {shouldCelebrate && <Confetti onComplete={triggerCelebration} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🤖 IZA OS Autonomous Agent System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade AI development platform powered by autonomous agents working 24/7 to build, deploy, and optimize your digital empire.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <StatsGrid />
          </motion.div>

          {/* Agent Hierarchy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Autonomous Agent Hierarchy
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading agents...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Agents</h3>
                <p className="text-gray-600 mb-4">{error.message || 'Failed to load agents'}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : Object.keys(agents).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Agents Found</h3>
                <p className="text-gray-600">No agents are currently available. Create your first agent to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(agents).map(([key, agent]) => (
                  <motion.div key={agent.id} variants={itemVariants}>
                    <AgentCard
                      agent={agent}
                      isLoading={isUpdating}
                      onCelebrate={() => triggerCelebration()}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Agent Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <AgentFlow agents={agents} />
          </motion.div>

          {/* AI Assistant Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              🤖 AI Assistant Hub
            </h2>
            <UnifiedAIIntegration />
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

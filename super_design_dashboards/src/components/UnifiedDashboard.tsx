import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Brain,
  Settings,
  Zap,
  BarChart2,
  GitBranch,
  Cog,
  Users,
  Link,
  PieChart,
  Shield,
  Cpu,
  Rocket,
  Star,
  Eye,
  Command,
  Smartphone,
  Tablet,
  Monitor,
  Key,
  Globe,
  FileText
} from 'lucide-react';
import { useAgentSystem } from '../hooks/useAgentSystem';
import { UnifiedAIIntegration } from './UnifiedAIIntegration';
import { StatsGrid } from './StatsGrid';
import { EcosystemOverview } from './EcosystemOverview';
import { AgentSystem } from './AgentSystem';
import { PromptArsenal } from './PromptArsenal';
import { OrchestrationEngine } from './OrchestrationEngine';
import Sovereign44System from './Sovereign44System';
import MetaAgentSystem from './MetaAgentSystem';
import AdvancedWorkflowScraper from './AdvancedWorkflowScraper';
import { APIManagementSystem } from './APIManagement/APIManagementSystem';
import { TokenManagementSystem } from './APIManagement/TokenManagementSystem';
import { AIAgentOrchestrator } from './APIManagement/AIAgentOrchestrator';
import { BrowserAutomationSystem } from './APIManagement/BrowserAutomationSystem';

interface DashboardSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  component: React.FC;
  status?: 'online' | 'offline' | 'warning' | 'beta';
}

const UnifiedDashboard: React.FC = () => {
  const { metrics } = useAgentSystem();

  const sections: DashboardSection[] = [
    {
      id: 'overview',
      title: 'Ecosystem Overview',
      description: 'High-level view of the entire IZA OS enterprise system.',
      icon: LayoutDashboard,
      color: 'from-blue-500 to-purple-600',
      gradient: 'from-blue-400/20 to-purple-600/20',
      component: EcosystemOverview,
      status: 'online'
    },
    {
      id: 'stats',
      title: 'Key Performance Indicators',
      description: 'Real-time metrics for agents, system health, and business impact.',
      icon: BarChart2,
      color: 'from-green-500 to-teal-600',
      gradient: 'from-green-400/20 to-teal-600/20',
      component: StatsGrid,
      status: 'online'
    },
    {
      id: 'agent-system',
      title: 'AI Agent System',
      description: 'Manage and monitor autonomous agents and their hierarchy.',
      icon: Brain,
      color: 'from-pink-500 to-red-600',
      gradient: 'from-pink-400/20 to-red-600/20',
      component: AgentSystem,
      status: 'online'
    },
    {
      id: 'ai-integration',
      title: 'Unified AI Integration',
      description: 'Seamlessly switch and interact with multiple AI providers (Claude, Grok, Qwen, Hugging Face).',
      icon: Cpu,
      color: 'from-indigo-500 to-blue-600',
      gradient: 'from-indigo-400/20 to-blue-600/20',
      component: UnifiedAIIntegration,
      status: 'online'
    },
    {
      id: 'prompt-arsenal',
      title: '200-Prompt Arsenal',
      description: 'Access and manage a comprehensive library of optimized prompts.',
      icon: Command,
      color: 'from-orange-500 to-yellow-600',
      gradient: 'from-orange-400/20 to-yellow-600/20',
      component: PromptArsenal,
      status: 'online'
    },
    {
      id: 'orchestration',
      title: 'Orchestration Engine',
      description: 'Control and visualize complex agent workflows with Maestro, Traycer, and Pathfinder.',
      icon: GitBranch,
      color: 'from-teal-500 to-cyan-600',
      gradient: 'from-teal-400/20 to-cyan-600/20',
      component: OrchestrationEngine,
      status: 'online'
    },
    {
      id: 'sovereign-44',
      title: 'Sovereign-44 Architecture',
      description: 'Autonomous Quantitative Empire Management',
      icon: Rocket,
      color: 'from-violet-500 to-purple-600',
      gradient: 'from-violet-400/20 to-purple-600/20',
      component: Sovereign44System,
      status: 'beta'
    },
    {
      id: 'meta-agent',
      title: 'MetaAgent System',
      description: 'Self-aware, self-improving AI ecosystem',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      gradient: 'from-yellow-400/20 to-orange-600/20',
      component: MetaAgentSystem,
      status: 'beta'
    },
    {
      id: 'iza-os-core',
      title: 'IZA OS Core Integration',
      description: '10X Faster Integration with Core Repositories (Codex, MCP, FileBrowser, FileSync, Pathway, BitNet, CodeBuff)',
      icon: Rocket,
      color: 'from-indigo-500 to-purple-600',
      gradient: 'from-indigo-400/20 to-purple-600/20',
      component: IZAOSCoreIntegration,
      status: 'online'
    },
    {
      id: 'memu-ecosystem-analyzer',
      title: 'MEMU Ecosystem Analyzer',
      description: 'AI-Powered Analysis of Entire MEMU Ecosystem with Ollama Integration for File Analysis, Repository Alignment, and Optimization',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      gradient: 'from-purple-400/20 to-pink-600/20',
      component: MEMUEcosystemAnalyzer,
      status: 'online'
    },
    {
      id: 'comprehensive-ollama-integration',
      title: 'Comprehensive Ollama Integration',
      description: 'Complete AI Integration with All 29 Agents, 156 Workflows, and Backend Services - Enterprise-Grade AI Capabilities',
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
      gradient: 'from-cyan-400/20 to-blue-600/20',
      component: ComprehensiveOllamaIntegration,
      status: 'online'
    },
    {
      id: 'anythingllm-integration',
      title: 'AnythingLLM Integration',
      description: 'Document Analysis & AI-Powered MEMU Ecosystem Processing with Local Privacy and Enterprise Features',
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
      gradient: 'from-emerald-400/20 to-teal-600/20',
      component: AnythingLLMIntegration,
      status: 'online'
    },
    {
      id: 'boring-business-ai',
      title: 'Boring Business AI',
      description: 'Google Maps Scraper + N8N Workflows + Stealth Money Printing Machine - AI-Powered Business Intelligence',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-600',
      gradient: 'from-yellow-400/20 to-orange-600/20',
      component: BoringBusinessAI,
      status: 'online'
    },
    {
      id: 'n8n-workflow-scraper',
      title: 'N8N Workflow Scraper',
      description: 'Automated Workflow Generation + Google Maps Scraping + Business Automation - AI-Powered Money Printing',
      icon: Workflow,
      color: 'from-indigo-500 to-purple-600',
      gradient: 'from-indigo-400/20 to-purple-600/20',
      component: N8NWorkflowScraper,
      status: 'online'
    },
    {
      id: 'stealth-business-operations',
      title: 'Stealth Business Operations',
      description: 'Market Intelligence + Revenue Optimization + Operation Monitoring - Quiet Money Printing Machine',
      icon: Eye,
      color: 'from-red-500 to-pink-600',
      gradient: 'from-red-400/20 to-pink-600/20',
      component: StealthBusinessOperations,
      status: 'online'
    },
    {
      id: 'advanced-workflow-scraper',
      title: 'Advanced Workflow Scraper',
      description: 'Aider + Ollama + AnythingLLM Integration - Repository Intelligence + Marketplace Analysis + Aider-Style Optimization',
      icon: GitBranch,
      color: 'from-violet-500 to-purple-600',
      gradient: 'from-violet-400/20 to-purple-600/20',
      component: AdvancedWorkflowScraper,
      status: 'online'
    },
    {
      id: 'api-management',
      title: 'API Management System',
      description: 'Comprehensive API key management, endpoint discovery, and automated integration with JWT/OAuth2 support',
      icon: Shield,
      color: 'from-red-500 to-pink-600',
      gradient: 'from-red-400/20 to-pink-600/20',
      component: APIManagementSystem,
      status: 'online'
    },
    {
      id: 'token-management',
      title: 'Token & Authentication Management',
      description: 'Enterprise-grade JWT token management, OAuth2 flows, and comprehensive authentication mechanisms',
      icon: Key,
      color: 'from-amber-500 to-orange-600',
      gradient: 'from-amber-400/20 to-orange-600/20',
      component: TokenManagementSystem,
      status: 'online'
    },
    {
      id: 'ai-agent-orchestrator',
      title: 'AI Agent Orchestrator',
      description: 'Automated API discovery, integration, and management with Claude Swarm templates and multi-agent coordination',
      icon: Brain,
      color: 'from-violet-500 to-purple-600',
      gradient: 'from-violet-400/20 to-purple-600/20',
      component: AIAgentOrchestrator,
      status: 'online'
    },
    {
      id: 'browser-automation',
      title: 'Browser Automation System',
      description: 'Automated API discovery through browser automation with Web Scraper, Stage Browser, and Agent X coordination',
      icon: Globe,
      color: 'from-sky-500 to-blue-600',
      gradient: 'from-sky-400/20 to-blue-600/20',
      component: BrowserAutomationSystem,
      status: 'online'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'beta': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <motion.header
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          IZA OS
        </motion.h1>
        <motion.p
          className="text-base md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Unified TypeScript-first Autonomous Agent Ecosystem
        </motion.p>
        <motion.p
          className="text-sm md:text-lg text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Complete 200-Prompt Arsenal Integration + MetaAgent System + Sovereign-44 Architecture
        </motion.p>
        
        {/* Mobile Device Indicator */}
        <motion.div
          className="flex justify-center items-center mt-4 text-gray-400 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Smartphone className="w-4 h-4 mr-2 md:hidden" />
          <Tablet className="w-4 h-4 mr-2 hidden md:block lg:hidden" />
          <Monitor className="w-4 h-4 mr-2 hidden lg:block" />
          <span className="md:hidden">Mobile Optimized</span>
          <span className="hidden md:block lg:hidden">Tablet Optimized</span>
          <span className="hidden lg:block">Desktop Optimized</span>
        </motion.div>
      </motion.header>

      <main className="space-y-6 md:space-y-12">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`glass-card p-4 md:p-8 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden mx-2 md:mx-0
                        bg-gradient-to-br ${section.gradient}`}
          >
            <div className="absolute inset-0 opacity-10" style={{ background: `url(/path/to/pattern.svg)` }}></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4 md:mb-6">
                <div className={`p-2 md:p-3 rounded-full ${section.color} text-white shadow-lg mr-3 md:mr-4`}>
                  <section.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h2 className="text-xl md:text-4xl font-bold text-white flex items-center">
                  {section.title}
                  <span className={`ml-2 md:ml-3 text-xs md:text-sm font-semibold px-2 py-1 md:px-3 md:py-1 rounded-full ${getStatusColor(section.status || '')} bg-white/10`}>
                    {section.status}
                  </span>
                </h2>
              </div>
              <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8">{section.description}</p>
              <section.component />
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default UnifiedDashboard;
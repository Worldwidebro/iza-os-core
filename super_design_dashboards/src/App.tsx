import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAgentSystem } from './hooks/useAgentSystem';
import { AgentDashboard } from './components/AgentDashboard';
import { AgentFlow } from './components/AgentFlow';
import { AgentMetrics } from './components/AgentMetrics';
import { AgentSettings } from './components/AgentSettings';
import { EcosystemOverview } from './components/EcosystemOverview';
import { AgentSystem } from './components/AgentSystem';
import { PromptArsenal } from './components/PromptArsenal';
import { OrchestrationEngine } from './components/OrchestrationEngine';
import { StatsGrid } from './components/StatsGrid';
import { UnifiedAIIntegration } from './components/UnifiedAIIntegration';
import { IntegrationsPage } from './components/IntegrationsPage';
import { MetricsPage } from './components/MetricsPage';
import { AgentManagementPage } from './components/AgentManagementPage';
import Navigation from './components/Navigation';
import UnifiedDashboard from './components/UnifiedDashboard';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <div className="pt-16 md:pt-20"> {/* Responsive padding for fixed navigation */}
          <AppContent />
        </div>
      </div>
    </BrowserRouter>
  );
}

function AppContent() {
  const { isLoading, error } = useAgentSystem();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <h2 className="text-xl md:text-2xl font-bold text-white mt-4">Initializing IZA OS Enterprise System</h2>
          <p className="text-gray-300 mt-2 text-sm md:text-base">MetaAgent is orchestrating the autonomous development team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card p-6 md:p-8 text-center">
          <div className="text-4xl md:text-6xl mb-4">🤖</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Agent System Offline</h2>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            The autonomous agent system is currently unavailable. Please check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<UnifiedDashboard />} />
      <Route path="/dashboard" element={<UnifiedDashboard />} />
      <Route path="/agents" element={<AgentDashboard />} />
      <Route path="/flow" element={<AgentFlow />} />
      <Route path="/metrics" element={<AgentMetrics />} />
      <Route path="/settings" element={<AgentSettings />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/analytics" element={<MetricsPage />} />
      <Route path="/management" element={<AgentManagementPage />} />
    </Routes>
  );
}

export default App;
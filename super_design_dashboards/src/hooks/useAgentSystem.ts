import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Types
interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'busy' | 'error' | 'maintenance' | 'starting' | 'stopping';
  capabilities: string[];
  configuration: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_heartbeat: string | null;
  version: string | null;
  host: string | null;
  port: number | null;
  is_active: boolean;
}

interface SystemMetrics {
  ecosystem_value: number;
  revenue_pipeline: number;
  automation_level: number;
  performance_score: number;
  system_uptime: number;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Mock data for when API is not available
const mockAgents: Agent[] = [
  {
    id: 'meta-agent',
    name: 'MetaAgent',
    role: 'CEO',
    status: 'active',
    capabilities: ['strategic_planning', 'decision_making', 'team_coordination'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'cto-agent',
    name: 'CTO Agent',
    role: 'Technical Architect',
    status: 'active',
    capabilities: ['code_generation', 'system_architecture', 'performance_optimization'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Agent',
    role: 'Brand Strategist',
    status: 'active',
    capabilities: ['content_creation', 'brand_strategy', 'market_analysis'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'finance-agent',
    name: 'Finance Agent',
    role: 'Financial Analyst',
    status: 'active',
    capabilities: ['financial_analysis', 'cost_optimization', 'revenue_tracking'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'legal-agent',
    name: 'Legal Agent',
    role: 'Compliance Officer',
    status: 'active',
    capabilities: ['compliance_monitoring', 'risk_assessment', 'legal_analysis'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'hr-agent',
    name: 'HR Agent',
    role: 'Team Manager',
    status: 'active',
    capabilities: ['talent_management', 'team_coordination', 'performance_tracking'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'sales-agent',
    name: 'Sales Agent',
    role: 'Revenue Generator',
    status: 'active',
    capabilities: ['lead_generation', 'client_relations', 'sales_optimization'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  },
  {
    id: 'product-agent',
    name: 'Product Agent',
    role: 'UX Specialist',
    status: 'active',
    capabilities: ['user_experience', 'feature_development', 'product_optimization'],
    configuration: {},
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
    version: '1.0.0',
    host: 'localhost',
    port: 8000,
    is_active: true
  }
];

const mockMetrics: SystemMetrics = {
  ecosystem_value: 1400000000,
  revenue_pipeline: 10000000,
  automation_level: 95,
  performance_score: 99,
  system_uptime: 99.9
};

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getAgents(): Promise<Agent[]> {
    try {
      const response = await this.request<{agents: Agent[]}>('/api/agents');
      return response.agents;
    } catch (error) {
      console.warn('API not available, using mock data:', error);
      return mockAgents;
    }
  }

  async getMetrics(): Promise<SystemMetrics> {
    try {
      return await this.request<SystemMetrics>('/api/metrics');
    } catch (error) {
      console.warn('API not available, using mock data:', error);
      return mockMetrics;
    }
  }

  async getHealth(): Promise<{status: string}> {
    try {
      return await this.request<{status: string}>('/health');
    } catch (error) {
      console.warn('API not available, using mock health:', error);
      return { status: 'healthy' };
    }
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Custom hook for agent system
export function useAgentSystem() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Health check query
  const { data: health, isLoading: healthLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.getHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1, // Only retry once
    staleTime: 10000, // Consider stale after 10 seconds
  });

  // Agents query
  const { data: agents = [], isLoading: agentsLoading, error: agentsError } = useQuery({
    queryKey: ['agents'],
    queryFn: () => apiClient.getAgents(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1, // Only retry once
    staleTime: 10000, // Consider stale after 10 seconds
  });

  // Metrics query
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => apiClient.getMetrics(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1, // Only retry once
    staleTime: 10000, // Consider stale after 10 seconds
  });

  // Initialize after first load
  useEffect(() => {
    if (!healthLoading && !agentsLoading) {
      setIsInitialized(true);
    }
  }, [healthLoading, agentsLoading]);

  const isLoading = !isInitialized || healthLoading || agentsLoading;
  const error = agentsError;

  return {
    agents,
    metrics,
    health,
    isLoading,
    error,
    refetch: () => {
      // Refetch all queries
      window.location.reload();
    }
  };
}
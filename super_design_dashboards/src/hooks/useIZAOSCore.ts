import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { izaOSCoreIntegration, CoreRepository, IZAOSConfig } from '../services/izaOSCoreIntegration';

export const useIZAOSCore = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  // Health check
  const { data: healthStatus, isLoading: isHealthLoading } = useQuery({
    queryKey: ['iza-os-health'],
    queryFn: () => izaOSCoreIntegration.checkHealth(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
    onSuccess: (data) => {
      setIsConnected(data);
    }
  });

  // Core repositories
  const { data: coreRepositories, isLoading: isLoadingRepos } = useQuery({
    queryKey: ['core-repositories'],
    queryFn: () => izaOSCoreIntegration.getCoreRepositories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isConnected
  });

  // IZA OS configuration
  const { data: izaOSConfig, isLoading: isLoadingConfig } = useQuery({
    queryKey: ['iza-os-config'],
    queryFn: () => izaOSCoreIntegration.getIZAOSConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isConnected
  });

  // Ecosystem status
  const { data: ecosystemStatus, isLoading: isLoadingEcosystem } = useQuery({
    queryKey: ['ecosystem-status'],
    queryFn: () => izaOSCoreIntegration.getEcosystemStatus(),
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 10 * 1000,
    enabled: isConnected
  });

  // Agent system
  const { data: agentSystem, isLoading: isLoadingAgents } = useQuery({
    queryKey: ['agent-system'],
    queryFn: () => izaOSCoreIntegration.getAgentSystem(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
    enabled: isConnected
  });

  // Performance metrics
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['performance-metrics'],
    queryFn: () => izaOSCoreIntegration.getPerformanceMetrics(),
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 10 * 1000,
    enabled: isConnected
  });

  // Integrate new repository mutation
  const integrateRepositoryMutation = useMutation({
    mutationFn: ({ repoName, repoUrl }: { repoName: string; repoUrl: string }) =>
      izaOSCoreIntegration.integrateRepository(repoName, repoUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['core-repositories'] });
      queryClient.invalidateQueries({ queryKey: ['ecosystem-status'] });
      toast.success('Repository integrated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to integrate repository: ${error}`);
    }
  });

  // Get integration performance
  const getIntegrationPerformance = useCallback(() => {
    return izaOSCoreIntegration.getIntegrationPerformance();
  }, []);

  // Get ecosystem value
  const getEcosystemValue = useCallback(() => {
    return izaOSCoreIntegration.getEcosystemValue();
  }, [izaOSConfig]);

  // Get automation level
  const getAutomationLevel = useCallback(() => {
    return izaOSCoreIntegration.getAutomationLevel();
  }, [izaOSConfig]);

  // Refresh all data
  const refreshAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['iza-os-health'] });
    queryClient.invalidateQueries({ queryKey: ['core-repositories'] });
    queryClient.invalidateQueries({ queryKey: ['iza-os-config'] });
    queryClient.invalidateQueries({ queryKey: ['ecosystem-status'] });
    queryClient.invalidateQueries({ queryKey: ['agent-system'] });
    queryClient.invalidateQueries({ queryKey: ['performance-metrics'] });
  }, [queryClient]);

  return {
    // Connection status
    isConnected,
    healthStatus,
    isHealthLoading,

    // Core data
    coreRepositories: coreRepositories || [],
    izaOSConfig,
    ecosystemStatus,
    agentSystem,
    metrics,

    // Loading states
    isLoading: isHealthLoading || isLoadingRepos || isLoadingConfig || isLoadingEcosystem || isLoadingAgents || isLoadingMetrics,

    // Mutations
    integrateRepository: integrateRepositoryMutation.mutate,

    // Computed values
    integrationPerformance: getIntegrationPerformance(),
    ecosystemValue: getEcosystemValue(),
    automationLevel: getAutomationLevel(),

    // Actions
    refreshAll,

    // Repository count
    repositoryCount: coreRepositories?.length || 0,

    // Performance indicators
    isHighPerformance: (coreRepositories?.length || 0) >= 6,
    isFullyIntegrated: (coreRepositories?.length || 0) >= 7
  };
};

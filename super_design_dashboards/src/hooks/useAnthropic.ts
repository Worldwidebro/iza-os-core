import { useState, useCallback } from 'react';
import { anthropicService, AnthropicResponse } from '../services/anthropicService';
import toast from 'react-hot-toast';

export interface UseAnthropicReturn {
  // State
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  lastResponse: AnthropicResponse | null;
  
  // Configuration
  configStatus: {
    configured: boolean;
    model: string;
    maxTokens: number;
  };
  
  // Actions
  sendMessage: (message: string, systemPrompt?: string) => Promise<string>;
  getAgentRecommendations: (systemMetrics: any) => Promise<string>;
  analyzeAgentPerformance: (agentData: any) => Promise<string>;
  generateStrategicInsights: (businessMetrics: any) => Promise<string>;
  
  // Utilities
  clearError: () => void;
}

export const useAnthropic = (): UseAnthropicReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<AnthropicResponse | null>(null);

  const configStatus = anthropicService.getConfigStatus();

  const handleError = useCallback((err: Error) => {
    setError(err.message);
    toast.error(`Anthropic API Error: ${err.message}`);
  }, []);

  const sendMessage = useCallback(async (
    message: string, 
    systemPrompt?: string
  ): Promise<string> => {
    if (!configStatus.configured) {
      const errorMsg = 'Anthropic API is not configured. Please set VITE_ANTHROPIC_API_KEY in your environment variables.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await anthropicService.sendMessage(message, systemPrompt);
      setLastResponse(response);
      toast.success('Message sent successfully');
      return response.content;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configStatus.configured, handleError]);

  const getAgentRecommendations = useCallback(async (systemMetrics: any): Promise<string> => {
    if (!configStatus.configured) {
      const errorMsg = 'Anthropic API is not configured. Please set VITE_ANTHROPIC_API_KEY in your environment variables.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await anthropicService.getAgentRecommendations(systemMetrics);
      toast.success('Agent recommendations generated');
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configStatus.configured, handleError]);

  const analyzeAgentPerformance = useCallback(async (agentData: any): Promise<string> => {
    if (!configStatus.configured) {
      const errorMsg = 'Anthropic API is not configured. Please set VITE_ANTHROPIC_API_KEY in your environment variables.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await anthropicService.analyzeAgentPerformance(agentData);
      toast.success('Agent performance analyzed');
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configStatus.configured, handleError]);

  const generateStrategicInsights = useCallback(async (businessMetrics: any): Promise<string> => {
    if (!configStatus.configured) {
      const errorMsg = 'Anthropic API is not configured. Please set VITE_ANTHROPIC_API_KEY in your environment variables.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await anthropicService.generateStrategicInsights(businessMetrics);
      toast.success('Strategic insights generated');
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configStatus.configured, handleError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isLoading,
    isConfigured: configStatus.configured,
    error,
    lastResponse,
    
    // Configuration
    configStatus,
    
    // Actions
    sendMessage,
    getAgentRecommendations,
    analyzeAgentPerformance,
    generateStrategicInsights,
    
    // Utilities
    clearError,
  };
};

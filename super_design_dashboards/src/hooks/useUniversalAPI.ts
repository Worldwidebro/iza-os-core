import { useState, useCallback, useEffect } from 'react';
import { universalAPIOrchestrator, AIResponse } from '../services/universalAPIOrchestrator';
import { ollamaService } from '../services/ollamaService';
import toast from 'react-hot-toast';

export interface UseUniversalAPIReturn {
  // State
  isLoading: boolean;
  error: string | null;
  lastResponse: AIResponse | null;
  
  // Configuration
  configuredProviders: Array<'claude' | 'grok' | 'ollama'>;
  configStatus: {
    claude: { configured: boolean; model: string; maxTokens: number };
    grok: { configured: boolean; model: string; baseUrl: string };
    ollama: { configured: boolean; model: string; modelsCount: number; connected: boolean };
  };
  
  // Actions
  sendMessage: (provider: 'claude' | 'grok' | 'ollama', message: string, systemPrompt?: string) => Promise<string>;
  sendMessageWithFallback: (primaryProvider: 'claude' | 'grok' | 'ollama', message: string, systemPrompt?: string) => Promise<string>;
  getAgentRecommendations: (provider: 'claude' | 'grok' | 'ollama', systemMetrics: any) => Promise<string>;
  analyzeAgentPerformance: (provider: 'claude' | 'grok' | 'ollama', agentData: any) => Promise<string>;
  generateStrategicInsights: (provider: 'claude' | 'grok' | 'ollama', businessMetrics: any) => Promise<string>;
  
  // Utilities
  clearError: () => void;
}

export const useUniversalAPI = (): UseUniversalAPIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState({ connected: false, model: '', modelsCount: 0 });

  // Initialize Ollama connection
  useEffect(() => {
    const initOllama = async () => {
      try {
        const connected = await ollamaService.initialize();
        const status = ollamaService.getConnectionStatus();
        setOllamaStatus(status);
        
        if (connected) {
          toast.success('✅ Ollama connected successfully');
        } else {
          toast.error('⚠️ Ollama not available - ensure it\'s running on localhost:11434');
        }
      } catch (error) {
        console.warn('Ollama initialization failed:', error);
      }
    };

    initOllama();
  }, []);

  const configuredProviders = universalAPIOrchestrator.getConfiguredProviders();
  const configStatus = universalAPIOrchestrator.getConfigStatus();
  
  // Add Ollama to configured providers if connected
  const allConfiguredProviders = ollamaStatus.connected 
    ? [...configuredProviders, 'ollama' as const]
    : configuredProviders;

  const enhancedConfigStatus = {
    ...configStatus,
    ollama: {
      configured: ollamaStatus.connected,
      model: ollamaStatus.model,
      modelsCount: ollamaStatus.modelsCount,
      connected: ollamaStatus.connected
    }
  };

  const handleError = useCallback((err: Error) => {
    setError(err.message);
    toast.error(`AI API Error: ${err.message}`);
  }, []);

  const sendMessage = useCallback(async (
    provider: 'claude' | 'grok' | 'ollama',
    message: string, 
    systemPrompt?: string
  ): Promise<string> => {
    if (provider === 'ollama') {
      if (!ollamaStatus.connected) {
        const errorMsg = 'Ollama is not connected. Please ensure Ollama is running and has models available.';
        setError(errorMsg);
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await ollamaService.sendMessage(message, undefined, {
          systemPrompt,
          temperature: 0.7,
          maxTokens: 2048
        });
        toast.success('Message sent to Ollama successfully');
        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        handleError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    // Handle Claude and Grok as before
    if (!configuredProviders.includes(provider)) {
      const errorMsg = `${provider === 'claude' ? 'Claude' : 'Grok'} API is not configured. Please set up the API key.`;
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await universalAPIOrchestrator.sendMessage(provider, message, systemPrompt);
      setLastResponse(response);
      toast.success(`Message sent to ${provider === 'claude' ? 'Claude' : 'Grok'} successfully`);
      return response.content;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configuredProviders, ollamaStatus.connected, handleError]);

  const sendMessageWithFallback = useCallback(async (
    primaryProvider: 'claude' | 'grok',
    message: string, 
    systemPrompt?: string
  ): Promise<string> => {
    if (configuredProviders.length === 0) {
      const errorMsg = 'No AI providers are configured. Please set up either Claude or Grok API keys.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await universalAPIOrchestrator.sendMessageWithFallback(primaryProvider, message, systemPrompt);
      setLastResponse(response);
      toast.success(`Message sent via ${response.provider === 'claude' ? 'Claude' : 'Grok'} successfully`);
      return response.content;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configuredProviders, handleError]);

  const getAgentRecommendations = useCallback(async (
    provider: 'claude' | 'grok',
    systemMetrics: any
  ): Promise<string> => {
    if (!configuredProviders.includes(provider)) {
      const errorMsg = `${provider === 'claude' ? 'Claude' : 'Grok'} API is not configured. Please set up the API key.`;
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await universalAPIOrchestrator.getAgentRecommendations(provider, systemMetrics);
      toast.success(`Agent recommendations generated by ${provider === 'claude' ? 'Claude' : 'Grok'}`);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configuredProviders, handleError]);

  const analyzeAgentPerformance = useCallback(async (
    provider: 'claude' | 'grok',
    agentData: any
  ): Promise<string> => {
    if (!configuredProviders.includes(provider)) {
      const errorMsg = `${provider === 'claude' ? 'Claude' : 'Grok'} API is not configured. Please set up the API key.`;
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await universalAPIOrchestrator.analyzeAgentPerformance(provider, agentData);
      toast.success(`Agent performance analyzed by ${provider === 'claude' ? 'Claude' : 'Grok'}`);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configuredProviders, handleError]);

  const generateStrategicInsights = useCallback(async (
    provider: 'claude' | 'grok',
    businessMetrics: any
  ): Promise<string> => {
    if (!configuredProviders.includes(provider)) {
      const errorMsg = `${provider === 'claude' ? 'Claude' : 'Grok'} API is not configured. Please set up the API key.`;
      setError(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await universalAPIOrchestrator.generateStrategicInsights(provider, businessMetrics);
      toast.success(`Strategic insights generated by ${provider === 'claude' ? 'Claude' : 'Grok'}`);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [configuredProviders, handleError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isLoading,
    error,
    lastResponse,
    
    // Configuration
    configuredProviders: allConfiguredProviders,
    configStatus: enhancedConfigStatus,
    
    // Actions
    sendMessage,
    sendMessageWithFallback,
    getAgentRecommendations,
    analyzeAgentPerformance,
    generateStrategicInsights,
    
    // Utilities
    clearError,
  };
};

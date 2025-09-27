/**
 * Qwen Hook for IZA OS Dashboard
 * React hook for Qwen3-Next-80B-A3B-Instruct integration
 */

import { useState, useCallback } from 'react';
import { qwenService, QwenMessage, QwenModelInfo } from '../services/qwenService';

export interface UseQwenReturn {
  // State
  isLoading: boolean;
  error: string | null;
  modelInfo: QwenModelInfo | null;
  isAvailable: boolean;
  
  // Actions
  chat: (messages: QwenMessage[], maxTokens?: number) => Promise<string>;
  generateCode: (requirements: string, context?: string) => Promise<string>;
  analyzeBusiness: (metrics: Record<string, any>) => Promise<string>;
  getModelInfo: () => Promise<void>;
  checkAvailability: () => Promise<void>;
  clearError: () => void;
}

export const useQwen = (): UseQwenReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelInfo, setModelInfo] = useState<QwenModelInfo | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const chat = useCallback(async (messages: QwenMessage[], maxTokens: number = 512): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await qwenService.chat(messages, maxTokens);
      return response.response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to chat with Qwen';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateCode = useCallback(async (requirements: string, context?: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await qwenService.generateCode(requirements, context);
      return response.generated_code;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate code with Qwen';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeBusiness = useCallback(async (metrics: Record<string, any>): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await qwenService.analyzeBusiness(metrics);
      return response.analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze business with Qwen';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getModelInfo = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const info = await qwenService.getModelInfo();
      setModelInfo(info);
      setIsAvailable(info.is_initialized && info.transformers_available);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get Qwen model info';
      setError(errorMessage);
      setIsAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkAvailability = useCallback(async (): Promise<void> => {
    try {
      const available = await qwenService.isAvailable();
      setIsAvailable(available);
    } catch (err) {
      setIsAvailable(false);
    }
  }, []);

  return {
    isLoading,
    error,
    modelInfo,
    isAvailable,
    chat,
    generateCode,
    analyzeBusiness,
    getModelInfo,
    checkAvailability,
    clearError
  };
};


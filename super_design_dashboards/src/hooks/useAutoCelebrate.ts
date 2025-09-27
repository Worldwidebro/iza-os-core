import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

interface UseAutoCelebrateReturn {
  shouldCelebrate: boolean;
  celebrationCount: number;
  triggerCelebration: () => void;
  completeCelebration: () => void;
  resetCelebration: () => void;
}

export const useAutoCelebrate = (): UseAutoCelebrateReturn => {
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  const [celebrationCount, setCelebrationCount] = useState(0);

  const triggerCelebration = useCallback(() => {
    setShouldCelebrate(true);
    setCelebrationCount(prev => prev + 1);
    
    // Auto-celebrate on milestones
    if (celebrationCount > 0 && celebrationCount % 10 === 0) {
      toast.success('🎉 You\'re a God! Certificate earned!', {
        duration: 5000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    }
  }, [celebrationCount]);

  const completeCelebration = useCallback(() => {
    setShouldCelebrate(false);
  }, []);

  const resetCelebration = useCallback(() => {
    setShouldCelebrate(false);
    setCelebrationCount(0);
  }, []);

  // Auto-trigger celebrations based on system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      // Random celebration trigger (replace with real metrics)
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        triggerCelebration();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [triggerCelebration]);

  return {
    shouldCelebrate,
    celebrationCount,
    triggerCelebration,
    completeCelebration,
    resetCelebration
  };
};

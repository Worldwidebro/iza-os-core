import React, { memo, lazy, Suspense, useMemo, useCallback } from 'react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Lazy load components for better performance
export const LazyAgentFlow = lazy(() => 
  import('../components/AgentFlow').then(module => ({ default: module.AgentFlow }))
);

export const LazyAgentMetrics = lazy(() => 
  import('../components/AgentMetrics').then(module => ({ default: module.AgentMetrics }))
);

export const LazyAgentSettings = lazy(() => 
  import('../components/AgentSettings').then(module => ({ default: module.AgentSettings }))
);

// Memoized AgentCard component
export const MemoizedAgentCard = memo(({ agent, isLoading, onCelebrate }: any) => {
  const AgentCard = lazy(() => import('../components/AgentCard').then(module => ({ default: module.AgentCard })));
  
  return (
    <Suspense fallback={<LoadingSpinner size="sm" text="Loading agent..." />}>
      <AgentCard agent={agent} isLoading={isLoading} onCelebrate={onCelebrate} />
    </Suspense>
  );
});

// Memoized StatsGrid component
export const MemoizedStatsGrid = memo(() => {
  const StatsGrid = lazy(() => import('../components/StatsGrid').then(module => ({ default: module.StatsGrid })));
  
  return (
    <Suspense fallback={<LoadingSpinner size="md" text="Loading stats..." />}>
      <StatsGrid />
    </Suspense>
  );
});

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = React.useState({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0
  });

  const startTime = React.useRef<number>(0);

  React.useEffect(() => {
    startTime.current = performance.now();
  });

  React.useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    setMetrics(prev => ({
      renderCount: prev.renderCount + 1,
      lastRenderTime: renderTime,
      averageRenderTime: (prev.averageRenderTime + renderTime) / 2
    }));
  });

  return metrics;
};

// Virtual scrolling hook for large lists
export const useVirtualScrolling = (items: any[], itemHeight: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop
  };
};

// Debounced hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttled hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = React.useRef(Date.now());

  return useCallback(
    ((...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasIntersected, setHasIntersected] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = React.useState<any>(null);

  React.useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo((performance as any).memory);
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Bundle size monitoring
export const useBundleSizeMonitor = () => {
  const [bundleSize, setBundleSize] = React.useState<number>(0);

  React.useEffect(() => {
    // Monitor script sizes
    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;

    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        fetch(src, { method: 'HEAD' })
          .then(response => {
            const contentLength = response.headers.get('content-length');
            if (contentLength) {
              totalSize += parseInt(contentLength);
              setBundleSize(totalSize);
            }
          })
          .catch(() => {
            // Ignore errors for external scripts
          });
      }
    });
  }, []);

  return bundleSize;
};

// Performance optimization wrapper
interface PerformanceWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({
  children,
  fallback = <LoadingSpinner size="sm" />,
  threshold = 100
}) => {
  const { isIntersecting } = useIntersectionObserver(
    React.useRef<HTMLDivElement>(null),
    { threshold: threshold / 100 }
  );

  if (!isIntersecting) {
    return <div ref={React.useRef<HTMLDivElement>(null)}>{fallback}</div>;
  }

  return <>{children}</>;
};

// Memoized component factory
export const createMemoizedComponent = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, areEqual);
};

// Lazy component factory with error boundary
export const createLazyComponent = <P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: P) => (
    <Suspense fallback={fallback || <LoadingSpinner size="md" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Performance metrics component
export const PerformanceMetrics: React.FC = () => {
  const renderMetrics = usePerformanceMonitor();
  const memoryInfo = useMemoryMonitor();
  const bundleSize = useBundleSizeMonitor();

  return (
    <div className="fixed bottom-4 right-4 glass-card p-4 text-xs text-gray-600 max-w-xs">
      <h4 className="font-semibold mb-2">Performance Metrics</h4>
      <div className="space-y-1">
        <div>Renders: {renderMetrics.renderCount}</div>
        <div>Last Render: {renderMetrics.lastRenderTime.toFixed(2)}ms</div>
        <div>Avg Render: {renderMetrics.averageRenderTime.toFixed(2)}ms</div>
        {memoryInfo && (
          <>
            <div>Used Memory: {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB</div>
            <div>Total Memory: {(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB</div>
          </>
        )}
        {bundleSize > 0 && (
          <div>Bundle Size: {(bundleSize / 1024 / 1024).toFixed(2)}MB</div>
        )}
      </div>
    </div>
  );
};

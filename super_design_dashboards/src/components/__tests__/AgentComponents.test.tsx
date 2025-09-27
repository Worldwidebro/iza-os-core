import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AgentCard } from '../components/AgentCard';
import { StatsGrid } from '../components/StatsGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Mock agent data
const mockAgent = {
  id: 'botgod_v1',
  name: 'BotGod_v1',
  role: 'CEO Agent',
  description: 'Orchestrates the entire autonomous development team',
  status: 'active' as const,
  metrics: {
    tasksCompleted: 1247,
    successRate: 98.7,
    revenue: '$2.4M'
  },
  agents: ['cto', 'cmo', 'cfo']
};

describe('AgentCard Component', () => {
  it('renders agent information correctly', () => {
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} />
      </TestWrapper>
    );

    expect(screen.getByText('BotGod_v1')).toBeInTheDocument();
    expect(screen.getByText('CEO Agent')).toBeInTheDocument();
    expect(screen.getByText('Orchestrates the entire autonomous development team')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('98.7%')).toBeInTheDocument();
    expect(screen.getByText('$2.4M')).toBeInTheDocument();
  });

  it('shows correct status indicator for active agent', () => {
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} />
      </TestWrapper>
    );

    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} isLoading={true} />
      </TestWrapper>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('calls onCelebrate when provided', () => {
    const mockCelebrate = vi.fn();
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} onCelebrate={mockCelebrate} />
      </TestWrapper>
    );

    // Simulate hover to trigger celebration
    fireEvent.mouseEnter(screen.getByText('BotGod_v1'));
    expect(mockCelebrate).toHaveBeenCalled();
  });
});

describe('StatsGrid Component', () => {
  it('renders all stats correctly', () => {
    render(
      <TestWrapper>
        <StatsGrid />
      </TestWrapper>
    );

    expect(screen.getByText('Active Agents')).toBeInTheDocument();
    expect(screen.getByText('Ecosystem Value')).toBeInTheDocument();
    expect(screen.getByText('Automation Level')).toBeInTheDocument();
    expect(screen.getByText('ACE Businesses')).toBeInTheDocument();
    expect(screen.getByText('N8N Workflows')).toBeInTheDocument();
    expect(screen.getByText('Repositories')).toBeInTheDocument();
  });

  it('displays correct values', () => {
    render(
      <TestWrapper>
        <StatsGrid />
      </TestWrapper>
    );

    expect(screen.getByText('27+')).toBeInTheDocument();
    expect(screen.getByText('$1.4B+')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('382')).toBeInTheDocument();
    expect(screen.getByText('2,056+')).toBeInTheDocument();
    expect(screen.getByText('211')).toBeInTheDocument();
  });

  it('shows positive change indicators', () => {
    render(
      <TestWrapper>
        <StatsGrid />
      </TestWrapper>
    );

    const changeElements = screen.getAllByText(/\+/);
    expect(changeElements.length).toBeGreaterThan(0);
  });
});

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Custom loading text" />);
    
    expect(screen.getByText('Custom loading text')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4');

    rerender(<LoadingSpinner size="md" />);
    expect(screen.getByRole('status')).toHaveClass('w-8', 'h-8');

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12');
  });
});

describe('Agent System Integration', () => {
  it('handles agent status changes', async () => {
    const { rerender } = render(
      <TestWrapper>
        <AgentCard agent={mockAgent} />
      </TestWrapper>
    );

    expect(screen.getByText('active')).toBeInTheDocument();

    // Simulate status change
    const updatedAgent = { ...mockAgent, status: 'idle' as const };
    rerender(
      <TestWrapper>
        <AgentCard agent={updatedAgent} />
      </TestWrapper>
    );

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('handles error states gracefully', () => {
    const errorAgent = { ...mockAgent, status: 'error' as const };
    
    render(
      <TestWrapper>
        <AgentCard agent={errorAgent} />
      </TestWrapper>
    );

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} />
      </TestWrapper>
    );

    // Check for proper ARIA attributes
    const statusIndicator = screen.getByLabelText(/Service is online and operational/);
    expect(statusIndicator).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <TestWrapper>
        <AgentCard agent={mockAgent} />
      </TestWrapper>
    );

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });
});

describe('Performance', () => {
  it('renders without performance issues', () => {
    const startTime = performance.now();
    
    render(
      <TestWrapper>
        <StatsGrid />
      </TestWrapper>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render within reasonable time (adjust threshold as needed)
    expect(renderTime).toBeLessThan(100);
  });
});

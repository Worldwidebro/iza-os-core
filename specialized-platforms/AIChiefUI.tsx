import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity, 
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Server,
  Network,
  Shield,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Star,
  Award,
  Trophy,
  TrendingDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Code,
  GitBranch,
  Terminal,
  Layers,
  Workflow,
  Command,
  Sparkles,
  Wand2,
  Cog,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Share,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Building2,
  Briefcase,
  Lightbulb,
  Rocket,
  Flag,
  Compass,
  Map,
  Navigation,
  Anchor,
  Ship,
  Plane,
  Car,
  Train,
  Bike,
  Footprints,
  Mountain,
  TreePine,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind
} from 'lucide-react';

interface AIChiefStrategy {
  id: string;
  name: string;
  type: 'growth' | 'optimization' | 'innovation' | 'market_expansion' | 'cost_reduction' | 'risk_management';
  status: 'active' | 'planning' | 'executing' | 'completed' | 'paused' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  objectives: StrategyObjective[];
  timeline: StrategyTimeline;
  budget: StrategyBudget;
  team: StrategyTeam;
  metrics: StrategyMetrics;
  risks: StrategyRisk[];
  dependencies: string[];
  progress: number;
  roi: number;
  impact: 'high' | 'medium' | 'low';
  created: string;
  updated: string;
  owner: string;
}

interface StrategyObjective {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: 'on_track' | 'at_risk' | 'behind' | 'completed';
  owner: string;
}

interface StrategyTimeline {
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  phases: Phase[];
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  description: string;
}

interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in_progress' | 'pending';
  deliverables: string[];
}

interface StrategyBudget {
  total: number;
  allocated: number;
  spent: number;
  remaining: number;
  categories: BudgetCategory[];
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
}

interface StrategyTeam {
  members: TeamMember[];
  roles: TeamRole[];
  capacity: number;
  utilization: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number;
  contribution: number;
}

interface TeamRole {
  id: string;
  name: string;
  description: string;
  required: number;
  filled: number;
  skills: string[];
}

interface StrategyMetrics {
  kpis: KPI[];
  successRate: number;
  completionRate: number;
  efficiency: number;
  quality: number;
  customerSatisfaction: number;
  revenueImpact: number;
  costSavings: number;
}

interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface StrategyRisk {
  id: string;
  name: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'mitigated' | 'resolved' | 'monitoring';
  mitigation: string;
  owner: string;
}

interface AIChiefInsight {
  id: string;
  type: 'opportunity' | 'threat' | 'trend' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  data: any;
  recommendations: string[];
  created: string;
  status: 'new' | 'reviewed' | 'actioned' | 'archived';
}

export default function AIChiefUI() {
  const [strategies, setStrategies] = useState<AIChiefStrategy[]>([
    {
      id: '1',
      name: 'AI-Powered Market Expansion',
      type: 'market_expansion',
      status: 'executing',
      priority: 'critical',
      description: 'Leverage AI capabilities to expand into new markets and customer segments',
      objectives: [
        {
          id: '1',
          name: 'Market Penetration',
          description: 'Increase market share in target segments',
          target: 25,
          current: 18,
          unit: '%',
          deadline: '2024-06-30',
          status: 'on_track',
          owner: 'Market Development Team'
        },
        {
          id: '2',
          name: 'Revenue Growth',
          description: 'Achieve revenue targets for new markets',
          target: 50000000,
          current: 32000000,
          unit: '$',
          deadline: '2024-12-31',
          status: 'on_track',
          owner: 'Revenue Team'
        }
      ],
      timeline: {
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        milestones: [
          {
            id: '1',
            name: 'Market Research Complete',
            date: '2024-02-15',
            status: 'completed',
            description: 'Comprehensive market analysis and opportunity identification'
          },
          {
            id: '2',
            name: 'AI Models Deployed',
            date: '2024-03-30',
            status: 'completed',
            description: 'AI-powered market analysis and prediction models'
          },
          {
            id: '3',
            name: 'Pilot Launch',
            date: '2024-05-15',
            status: 'in_progress',
            description: 'Launch pilot programs in target markets'
          },
          {
            id: '4',
            name: 'Full Market Entry',
            date: '2024-08-31',
            status: 'pending',
            description: 'Complete market entry and scaling'
          }
        ],
        phases: [
          {
            id: '1',
            name: 'Research & Planning',
            startDate: '2024-01-01',
            endDate: '2024-02-28',
            status: 'completed',
            deliverables: ['Market Analysis', 'Strategy Document', 'Resource Plan']
          },
          {
            id: '2',
            name: 'AI Development',
            startDate: '2024-02-01',
            endDate: '2024-04-30',
            status: 'in_progress',
            deliverables: ['AI Models', 'Data Pipeline', 'Integration APIs']
          },
          {
            id: '3',
            name: 'Market Entry',
            startDate: '2024-04-01',
            endDate: '2024-09-30',
            status: 'pending',
            deliverables: ['Pilot Programs', 'Marketing Campaign', 'Sales Enablement']
          }
        ]
      },
      budget: {
        total: 10000000,
        allocated: 7500000,
        spent: 3200000,
        remaining: 6800000,
        categories: [
          { id: '1', name: 'Technology', allocated: 4000000, spent: 1800000, remaining: 2200000 },
          { id: '2', name: 'Marketing', allocated: 3000000, spent: 800000, remaining: 2200000 },
          { id: '3', name: 'Operations', allocated: 2000000, spent: 400000, remaining: 1600000 },
          { id: '4', name: 'Personnel', allocated: 1000000, spent: 200000, remaining: 800000 }
        ]
      },
      team: {
        members: [
          {
            id: '1',
            name: 'Sarah Chen',
            role: 'Strategy Director',
            skills: ['Strategic Planning', 'Market Analysis', 'Leadership'],
            availability: 100,
            contribution: 95
          },
          {
            id: '2',
            name: 'Michael Rodriguez',
            role: 'AI Engineer',
            skills: ['Machine Learning', 'Data Science', 'Python'],
            availability: 85,
            contribution: 90
          }
        ],
        roles: [
          {
            id: '1',
            name: 'Strategy Director',
            description: 'Lead strategic planning and execution',
            required: 1,
            filled: 1,
            skills: ['Strategic Planning', 'Leadership', 'Market Analysis']
          },
          {
            id: '2',
            name: 'AI Engineer',
            description: 'Develop and deploy AI models',
            required: 2,
            filled: 1,
            skills: ['Machine Learning', 'Data Science', 'Python']
          }
        ],
        capacity: 100,
        utilization: 85
      },
      metrics: {
        kpis: [
          {
            id: '1',
            name: 'Market Share',
            target: 25,
            current: 18,
            trend: 'up',
            unit: '%',
            frequency: 'monthly'
          },
          {
            id: '2',
            name: 'Revenue Growth',
            target: 50,
            current: 32,
            trend: 'up',
            unit: 'M$',
            frequency: 'quarterly'
          }
        ],
        successRate: 85,
        completionRate: 72,
        efficiency: 88,
        quality: 92,
        customerSatisfaction: 89,
        revenueImpact: 32000000,
        costSavings: 5000000
      },
      risks: [
        {
          id: '1',
          name: 'Market Competition',
          description: 'Increased competition from established players',
          probability: 'high',
          impact: 'high',
          status: 'mitigated',
          mitigation: 'Differentiate through AI capabilities and superior customer experience',
          owner: 'Strategy Team'
        }
      ],
      dependencies: ['AI Platform', 'Market Research', 'Sales Team'],
      progress: 72,
      roi: 320,
      impact: 'high',
      created: '2024-01-01',
      updated: '2024-01-15',
      owner: 'Sarah Chen'
    }
  ]);

  const [insights, setInsights] = useState<AIChiefInsight[]>([
    {
      id: '1',
      type: 'opportunity',
      title: 'AI-Driven Customer Personalization',
      description: 'Advanced AI models can increase customer engagement by 40% through personalized experiences',
      confidence: 92,
      impact: 'high',
      urgency: 'medium',
      source: 'Customer Analytics AI',
      data: { engagement_increase: 40, implementation_cost: 2000000, roi: 450 },
      recommendations: [
        'Implement advanced recommendation engine',
        'Deploy real-time personalization API',
        'Train customer behavior models'
      ],
      created: '2024-01-15',
      status: 'new'
    },
    {
      id: '2',
      type: 'threat',
      title: 'Competitive AI Capabilities',
      description: 'Major competitor is investing heavily in AI, threatening market position',
      confidence: 85,
      impact: 'high',
      urgency: 'high',
      source: 'Competitive Intelligence',
      data: { competitor_investment: 50000000, market_impact: -15, timeline: '6 months' },
      recommendations: [
        'Accelerate AI development roadmap',
        'Increase AI talent acquisition',
        'Form strategic AI partnerships'
      ],
      created: '2024-01-14',
      status: 'reviewed'
    }
  ]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'executing': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'planning': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      case 'on_track': return 'bg-green-500';
      case 'at_risk': return 'bg-yellow-500';
      case 'behind': return 'bg-red-500';
      case 'new': return 'bg-blue-500';
      case 'reviewed': return 'bg-yellow-500';
      case 'actioned': return 'bg-green-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'growth': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'optimization': return <Target className="h-4 w-4 text-blue-400" />;
      case 'innovation': return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      case 'market_expansion': return <Globe className="h-4 w-4 text-purple-400" />;
      case 'cost_reduction': return <DollarSign className="h-4 w-4 text-red-400" />;
      case 'risk_management': return <Shield className="h-4 w-4 text-orange-400" />;
      case 'opportunity': return <Star className="h-4 w-4 text-green-400" />;
      case 'threat': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'trend': return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      case 'prediction': return <CrystalBall className="h-4 w-4 text-purple-400" />;
      default: return <Brain className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                AI Chief Strategic Command Center
              </h1>
              <p className="text-xl text-purple-200">
                AI-Powered Strategic Planning & Executive Decision Support System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                <Crown className="h-4 w-4 mr-2" />
                Strategic Command
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                AI Chief Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Strategic Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Active Strategies</p>
                  <p className="text-3xl font-bold text-white">{strategies.length}</p>
                </div>
                <Crown className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Strategic ROI</p>
                  <p className="text-3xl font-bold text-white">
                    {strategies.reduce((sum, s) => sum + s.roi, 0) / strategies.length}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Revenue Impact</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(strategies.reduce((sum, s) => sum + s.metrics.revenueImpact, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">AI Insights</p>
                  <p className="text-3xl font-bold text-white">{insights.length}</p>
                </div>
                <Brain className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chief Dashboard */}
        <Tabs defaultValue="strategies" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="strategies" className="text-white">Strategic Plans</TabsTrigger>
            <TabsTrigger value="insights" className="text-white">AI Insights</TabsTrigger>
            <TabsTrigger value="execution" className="text-white">Execution</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-6">
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(strategy.type)}
                        <CardTitle className="text-white text-xl">{strategy.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(strategy.status)} text-white border-0`}
                        >
                          {strategy.status}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(strategy.priority)}`}>
                          {strategy.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Strategy Overview */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Strategy Overview</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Progress:</span>
                            <span className="text-white">{strategy.progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">ROI:</span>
                            <span className="text-green-400">{strategy.roi}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Impact:</span>
                            <span className="text-white">{strategy.impact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Owner:</span>
                            <span className="text-white">{strategy.owner}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-white">{strategy.progress}%</span>
                          </div>
                          <Progress value={strategy.progress} className="h-2" />
                        </div>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Objectives</h4>
                        <div className="space-y-2">
                          {strategy.objectives.map((objective) => (
                            <div key={objective.id} className="p-2 bg-gray-700/50 rounded text-sm">
                              <div className="flex justify-between mb-1">
                                <span className="text-white font-medium">{objective.name}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(objective.status)} text-white border-0`}
                                >
                                  {objective.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>{objective.current}{objective.unit}</span>
                                <span>/ {objective.target}{objective.unit}</span>
                              </div>
                              <Progress value={(objective.current / objective.target) * 100} className="h-1 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Budget</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-white">{formatCurrency(strategy.budget.total)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Spent:</span>
                            <span className="text-white">{formatCurrency(strategy.budget.spent)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Remaining:</span>
                            <span className="text-green-400">{formatCurrency(strategy.budget.remaining)}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Budget Usage</span>
                            <span className="text-white">
                              {Math.round((strategy.budget.spent / strategy.budget.allocated) * 100)}%
                            </span>
                          </div>
                          <Progress value={(strategy.budget.spent / strategy.budget.allocated) * 100} className="h-2" />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Success Rate:</span>
                            <span className="text-white">{strategy.metrics.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Efficiency:</span>
                            <span className="text-white">{strategy.metrics.efficiency}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Quality:</span>
                            <span className="text-white">{strategy.metrics.quality}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Customer Satisfaction:</span>
                            <span className="text-white">{strategy.metrics.customerSatisfaction}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Monitor className="h-3 w-3 mr-2" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Edit className="h-3 w-3 mr-2" />
                          Edit Strategy
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <BarChart3 className="h-3 w-3 mr-2" />
                          Analytics
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Created: {strategy.created}</span>
                        <span className="text-gray-400 text-sm">Updated: {strategy.updated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <Card key={insight.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(insight.type)}
                        <CardTitle className="text-white text-lg">{insight.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(insight.status)} text-white border-0`}
                        >
                          {insight.status}
                        </Badge>
                        <span className="text-sm text-blue-400">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{insight.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Impact:</span>
                        <p className="text-white font-medium">{insight.impact}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Urgency:</span>
                        <p className={`font-medium ${getPriorityColor(insight.urgency)}`}>
                          {insight.urgency}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Source:</span>
                        <p className="text-white font-medium">{insight.source}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Created:</span>
                        <p className="text-white font-medium">{insight.created}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Lightbulb className="h-3 w-3 mr-2" />
                        Take Action
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Share className="h-3 w-3 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Strategy Execution Dashboard & Timeline Component
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Strategy Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Strategy Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">ROI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    ROI Analysis Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Risk Assessment Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Market Intelligence Chart Component
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

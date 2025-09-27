import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, 
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
  Monitor,
  Server,
  Network,
  Shield,
  Brain,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  FileText,
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
  Globe
} from 'lucide-react';

interface MVPFeature {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  effort: number;
  value: number;
  dependencies: string[];
  progress: number;
  team: string[];
  deadline: string;
  metrics: FeatureMetrics;
}

interface FeatureMetrics {
  userAdoption: number;
  performance: number;
  satisfaction: number;
  revenue: number;
  cost: number;
  roi: number;
}

interface MVPPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  startDate: string;
  endDate: string;
  features: string[];
  budget: number;
  actualCost: number;
  progress: number;
  risks: string[];
  deliverables: string[];
}

interface MarketValidation {
  id: string;
  market: string;
  segment: string;
  size: number;
  growth: number;
  competition: string;
  validation: 'validated' | 'testing' | 'failed' | 'pending';
  feedback: string;
  nextSteps: string[];
}

export default function MVPUI() {
  const [features, setFeatures] = useState<MVPFeature[]>([
    {
      id: '1',
      name: 'Core Banking API',
      description: 'Essential banking operations API for deposits, withdrawals, and transfers',
      status: 'completed',
      priority: 'high',
      effort: 8,
      value: 9,
      dependencies: [],
      progress: 100,
      team: ['Backend Team', 'Security Team'],
      deadline: '2024-01-15',
      metrics: {
        userAdoption: 95,
        performance: 98,
        satisfaction: 92,
        revenue: 2500000,
        cost: 150000,
        roi: 1567
      }
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      description: 'Native mobile application for iOS and Android banking operations',
      status: 'in_progress',
      priority: 'high',
      effort: 7,
      value: 8,
      dependencies: ['Core Banking API'],
      progress: 75,
      team: ['Mobile Team', 'UX Team'],
      deadline: '2024-02-15',
      metrics: {
        userAdoption: 68,
        performance: 89,
        satisfaction: 85,
        revenue: 1800000,
        cost: 200000,
        roi: 800
      }
    },
    {
      id: '3',
      name: 'AI-Powered Fraud Detection',
      description: 'Machine learning system for real-time fraud detection and prevention',
      status: 'in_progress',
      priority: 'high',
      effort: 9,
      value: 9,
      dependencies: ['Core Banking API'],
      progress: 60,
      team: ['AI Team', 'Security Team', 'Data Team'],
      deadline: '2024-03-01',
      metrics: {
        userAdoption: 45,
        performance: 94,
        satisfaction: 88,
        revenue: 1200000,
        cost: 300000,
        roi: 300
      }
    },
    {
      id: '4',
      name: 'Investment Portfolio Management',
      description: 'Automated investment portfolio management with AI recommendations',
      status: 'planned',
      priority: 'medium',
      effort: 6,
      value: 7,
      dependencies: ['Core Banking API', 'AI-Powered Fraud Detection'],
      progress: 0,
      team: ['Investment Team', 'AI Team'],
      deadline: '2024-04-15',
      metrics: {
        userAdoption: 0,
        performance: 0,
        satisfaction: 0,
        revenue: 0,
        cost: 250000,
        roi: 0
      }
    },
    {
      id: '5',
      name: 'Business Banking Suite',
      description: 'Comprehensive business banking solution with accounting integration',
      status: 'planned',
      priority: 'medium',
      effort: 8,
      value: 8,
      dependencies: ['Core Banking API', 'Mobile Banking App'],
      progress: 0,
      team: ['Business Team', 'Integration Team'],
      deadline: '2024-05-30',
      metrics: {
        userAdoption: 0,
        performance: 0,
        satisfaction: 0,
        revenue: 0,
        cost: 400000,
        roi: 0
      }
    },
    {
      id: '6',
      name: 'Cryptocurrency Integration',
      description: 'Secure cryptocurrency trading and wallet management features',
      status: 'blocked',
      priority: 'low',
      effort: 7,
      value: 6,
      dependencies: ['Regulatory Approval', 'Security Audit'],
      progress: 0,
      team: ['Crypto Team', 'Security Team'],
      deadline: '2024-06-30',
      metrics: {
        userAdoption: 0,
        performance: 0,
        satisfaction: 0,
        revenue: 0,
        cost: 350000,
        roi: 0
      }
    }
  ]);

  const [phases, setPhases] = useState<MVPPhase[]>([
    {
      id: '1',
      name: 'Foundation Phase',
      description: 'Core banking infrastructure and basic operations',
      status: 'completed',
      startDate: '2023-10-01',
      endDate: '2024-01-15',
      features: ['Core Banking API'],
      budget: 500000,
      actualCost: 450000,
      progress: 100,
      risks: [],
      deliverables: ['Banking API', 'Security Framework', 'Database Design']
    },
    {
      id: '2',
      name: 'User Experience Phase',
      description: 'Mobile applications and user interface development',
      status: 'in_progress',
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      features: ['Mobile Banking App', 'AI-Powered Fraud Detection'],
      budget: 800000,
      actualCost: 520000,
      progress: 65,
      risks: ['UI/UX delays', 'Mobile platform compatibility'],
      deliverables: ['Mobile App', 'Fraud Detection System', 'User Testing Results']
    },
    {
      id: '3',
      name: 'Advanced Features Phase',
      description: 'Investment and business banking capabilities',
      status: 'planned',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      features: ['Investment Portfolio Management', 'Business Banking Suite'],
      budget: 1000000,
      actualCost: 0,
      progress: 0,
      risks: ['Regulatory compliance', 'Integration complexity'],
      deliverables: ['Investment Platform', 'Business Suite', 'Compliance Documentation']
    }
  ]);

  const [marketValidation, setMarketValidation] = useState<MarketValidation[]>([
    {
      id: '1',
      market: 'Digital Banking',
      segment: 'Millennials & Gen Z',
      size: 45000000000,
      growth: 12.5,
      competition: 'High',
      validation: 'validated',
      feedback: 'Strong demand for mobile-first banking with AI features',
      nextSteps: ['Launch beta program', 'Gather user feedback', 'Iterate on features']
    },
    {
      id: '2',
      market: 'Business Banking',
      segment: 'Small & Medium Enterprises',
      size: 28000000000,
      growth: 8.3,
      competition: 'Medium',
      validation: 'testing',
      feedback: 'Interest in automated accounting integration and cash flow management',
      nextSteps: ['Complete market research', 'Validate with 100+ businesses', 'Refine value proposition']
    },
    {
      id: '3',
      market: 'Investment Management',
      segment: 'Retail Investors',
      size: 32000000000,
      growth: 15.2,
      competition: 'High',
      validation: 'pending',
      feedback: 'Waiting for validation data',
      nextSteps: ['Design MVP', 'Conduct user interviews', 'Test investment algorithms']
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
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      case 'blocked': return 'bg-red-500';
      case 'validated': return 'bg-green-500';
      case 'testing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getEffortValue = (effort: number, value: number) => {
    return value / effort;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Genix Bank MVP Development
              </h1>
              <p className="text-xl text-blue-200">
                Minimum Viable Product Development & Market Validation Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                <Rocket className="h-4 w-4 mr-2" />
                MVP Development
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                MVP Settings
              </Button>
            </div>
          </div>
        </div>

        {/* MVP Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Features Completed</p>
                  <p className="text-3xl font-bold text-white">
                    {features.filter(f => f.status === 'completed').length}/{features.length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(features.reduce((sum, f) => sum + f.metrics.revenue, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Avg ROI</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(features.filter(f => f.metrics.roi > 0).reduce((sum, f) => sum + f.metrics.roi, 0) / features.filter(f => f.metrics.roi > 0).length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Market Size</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(marketValidation.reduce((sum, m) => sum + m.size, 0))}
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MVP Development */}
        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="features" className="text-white">Features</TabsTrigger>
            <TabsTrigger value="phases" className="text-white">Development Phases</TabsTrigger>
            <TabsTrigger value="validation" className="text-white">Market Validation</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">MVP Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(feature.status)} text-white border-0`}
                        >
                          {feature.status.replace('_', ' ')}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(feature.priority)}`}>
                          {feature.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Effort:</span>
                        <p className="text-white font-medium">{feature.effort}/10</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Value:</span>
                        <p className="text-white font-medium">{feature.value}/10</p>
                      </div>
                      <div>
                        <span className="text-gray-400">ROI Score:</span>
                        <p className="text-green-400 font-medium">
                          {getEffortValue(feature.effort, feature.value).toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Deadline:</span>
                        <p className="text-white font-medium">{feature.deadline}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white font-medium">{feature.progress}%</span>
                      </div>
                      <Progress value={feature.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">Adoption</p>
                        <p className="text-white font-medium">{feature.metrics.userAdoption}%</p>
                      </div>
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">Revenue</p>
                        <p className="text-white font-medium">{formatCurrency(feature.metrics.revenue)}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-700/50 rounded">
                        <p className="text-gray-400">ROI</p>
                        <p className="text-white font-medium">{feature.metrics.roi}%</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Team</h4>
                      <div className="flex flex-wrap gap-1">
                        {feature.team.map((member, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Due: {feature.deadline}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Monitor className="h-3 w-3 mr-2" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Settings className="h-3 w-3 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="phases" className="space-y-6">
            <div className="space-y-4">
              {phases.map((phase) => (
                <Card key={phase.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <CardTitle className="text-white text-xl">{phase.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(phase.status)} text-white border-0`}
                        >
                          {phase.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-green-400">
                          {formatCurrency(phase.budget)} budget
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300">{phase.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Phase Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Start Date:</span>
                            <span className="text-white">{phase.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">End Date:</span>
                            <span className="text-white">{phase.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Budget:</span>
                            <span className="text-white">{formatCurrency(phase.budget)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Actual Cost:</span>
                            <span className="text-white">{formatCurrency(phase.actualCost)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Progress & Features</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-white">{phase.progress}%</span>
                            </div>
                            <Progress value={phase.progress} className="h-2" />
                          </div>
                          <div className="mt-4">
                            <span className="text-gray-400 text-sm">Features:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {phase.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Deliverables & Risks</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-400 text-sm">Deliverables:</span>
                            <ul className="list-disc list-inside text-sm text-gray-300 mt-1">
                              {phase.deliverables.map((deliverable, index) => (
                                <li key={index}>{deliverable}</li>
                              ))}
                            </ul>
                          </div>
                          {phase.risks.length > 0 && (
                            <div>
                              <span className="text-gray-400 text-sm">Risks:</span>
                              <ul className="list-disc list-inside text-sm text-red-300 mt-1">
                                {phase.risks.map((risk, index) => (
                                  <li key={index}>{risk}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="validation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {marketValidation.map((market) => (
                <Card key={market.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{market.market}</CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(market.validation)} text-white border-0`}
                      >
                        {market.validation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Segment:</span>
                        <p className="text-white font-medium">{market.segment}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <p className="text-white font-medium">{formatCurrency(market.size)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Growth:</span>
                        <p className="text-green-400 font-medium">+{market.growth}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Competition:</span>
                        <p className="text-white font-medium">{market.competition}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Feedback</h4>
                      <p className="text-gray-300 text-sm">{market.feedback}</p>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Next Steps</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        {market.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Target className="h-3 w-3 mr-2" />
                        Validate
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <TrendingUp className="h-3 w-3 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Feature Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Feature Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Market Validation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Market Validation Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Development Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Development Timeline Chart Component
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

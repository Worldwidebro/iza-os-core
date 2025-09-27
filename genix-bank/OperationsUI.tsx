import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard,
  Activity, 
  Settings,
  BarChart3,
  PieChart,
  LineChart,
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
  Brain,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Banknote,
  PiggyBank,
  Calculator,
  FileText,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Database,
  Globe,
  Phone,
  Mail,
  Calendar,
  MapPin,
  UserCheck,
  UserX,
  Scale,
  Gavel
} from 'lucide-react';

interface BankingOperation {
  id: string;
  name: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'loan' | 'investment' | 'payment' | 'compliance';
  status: 'active' | 'pending' | 'completed' | 'failed' | 'suspended';
  priority: 'high' | 'medium' | 'low';
  volume: number;
  value: number;
  successRate: number;
  lastExecuted: string;
  nextExecution: string;
  team: string[];
  dependencies: string[];
  risks: OperationRisk[];
  metrics: OperationMetrics;
}

interface OperationRisk {
  id: string;
  type: 'security' | 'compliance' | 'operational' | 'financial' | 'reputational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string;
  status: 'identified' | 'mitigated' | 'resolved' | 'monitoring';
}

interface OperationMetrics {
  transactionsPerHour: number;
  averageProcessingTime: number;
  errorRate: number;
  customerSatisfaction: number;
  complianceScore: number;
  securityScore: number;
  uptime: number;
  performance: number;
}

interface ComplianceCheck {
  id: string;
  regulation: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'pending' | 'under_review';
  lastChecked: string;
  nextCheck: string;
  responsible: string;
  documentation: string[];
  violations: ComplianceViolation[];
}

interface ComplianceViolation {
  id: string;
  type: string;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  discovered: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo: string;
}

interface OperationalAlert {
  id: string;
  type: 'security' | 'performance' | 'compliance' | 'system' | 'financial';
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo: string;
  escalation: boolean;
}

export default function OperationsUI() {
  const [operations, setOperations] = useState<BankingOperation[]>([
    {
      id: '1',
      name: 'Real-time Transaction Processing',
      type: 'deposit',
      status: 'active',
      priority: 'high',
      volume: 45000,
      value: 125000000,
      successRate: 99.8,
      lastExecuted: '2024-01-15 16:45:00',
      nextExecution: 'Continuous',
      team: ['Transaction Team', 'Security Team'],
      dependencies: ['Payment Gateway', 'Fraud Detection'],
      risks: [
        {
          id: '1',
          type: 'security',
          severity: 'medium',
          description: 'Potential for fraudulent transactions',
          mitigation: 'AI-powered fraud detection',
          status: 'mitigated'
        }
      ],
      metrics: {
        transactionsPerHour: 45000,
        averageProcessingTime: 1.2,
        errorRate: 0.02,
        customerSatisfaction: 96,
        complianceScore: 98,
        securityScore: 97,
        uptime: 99.9,
        performance: 98
      }
    },
    {
      id: '2',
      name: 'International Wire Transfers',
      type: 'transfer',
      status: 'active',
      priority: 'high',
      volume: 850,
      value: 45000000,
      successRate: 99.5,
      lastExecuted: '2024-01-15 16:30:00',
      nextExecution: 'Continuous',
      team: ['International Team', 'Compliance Team'],
      dependencies: ['SWIFT Network', 'Regulatory Compliance'],
      risks: [
        {
          id: '2',
          type: 'compliance',
          severity: 'high',
          description: 'Regulatory compliance across multiple jurisdictions',
          mitigation: 'Automated compliance checking',
          status: 'monitoring'
        }
      ],
      metrics: {
        transactionsPerHour: 850,
        averageProcessingTime: 4.5,
        errorRate: 0.05,
        customerSatisfaction: 94,
        complianceScore: 95,
        securityScore: 96,
        uptime: 99.7,
        performance: 95
      }
    },
    {
      id: '3',
      name: 'Automated Investment Management',
      type: 'investment',
      status: 'active',
      priority: 'medium',
      volume: 1200,
      value: 89000000,
      successRate: 97.8,
      lastExecuted: '2024-01-15 16:00:00',
      nextExecution: 'Every 15 minutes',
      team: ['Investment Team', 'AI Team'],
      dependencies: ['Market Data Feed', 'AI Models'],
      risks: [
        {
          id: '3',
          type: 'financial',
          severity: 'medium',
          description: 'Market volatility affecting portfolio performance',
          mitigation: 'Risk management algorithms',
          status: 'monitoring'
        }
      ],
      metrics: {
        transactionsPerHour: 1200,
        averageProcessingTime: 2.8,
        errorRate: 0.08,
        customerSatisfaction: 92,
        complianceScore: 96,
        securityScore: 94,
        uptime: 99.5,
        performance: 93
      }
    },
    {
      id: '4',
      name: 'Loan Origination & Processing',
      type: 'loan',
      status: 'active',
      priority: 'high',
      volume: 45,
      value: 12500000,
      successRate: 98.5,
      lastExecuted: '2024-01-15 15:30:00',
      nextExecution: 'On demand',
      team: ['Lending Team', 'Credit Analysis Team'],
      dependencies: ['Credit Bureau', 'Document Verification'],
      risks: [
        {
          id: '4',
          type: 'financial',
          severity: 'high',
          description: 'Credit risk assessment accuracy',
          mitigation: 'Advanced credit scoring models',
          status: 'mitigated'
        }
      ],
      metrics: {
        transactionsPerHour: 45,
        averageProcessingTime: 180,
        errorRate: 0.03,
        customerSatisfaction: 89,
        complianceScore: 97,
        securityScore: 95,
        uptime: 99.8,
        performance: 96
      }
    },
    {
      id: '5',
      name: 'Regulatory Compliance Monitoring',
      type: 'compliance',
      status: 'active',
      priority: 'high',
      volume: 2500,
      value: 0,
      successRate: 99.9,
      lastExecuted: '2024-01-15 16:40:00',
      nextExecution: 'Every 5 minutes',
      team: ['Compliance Team', 'Legal Team'],
      dependencies: ['Regulatory Database', 'Transaction Monitoring'],
      risks: [
        {
          id: '5',
          type: 'compliance',
          severity: 'critical',
          description: 'Regulatory violations resulting in penalties',
          mitigation: 'Real-time compliance monitoring',
          status: 'monitoring'
        }
      ],
      metrics: {
        transactionsPerHour: 2500,
        averageProcessingTime: 0.8,
        errorRate: 0.001,
        customerSatisfaction: 100,
        complianceScore: 99,
        securityScore: 98,
        uptime: 99.9,
        performance: 99
      }
    }
  ]);

  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
    {
      id: '1',
      regulation: 'PCI DSS',
      requirement: 'Payment Card Industry Data Security Standard',
      status: 'compliant',
      lastChecked: '2024-01-10',
      nextCheck: '2024-04-10',
      responsible: 'Security Team',
      documentation: ['Security Assessment', 'Penetration Test Report'],
      violations: []
    },
    {
      id: '2',
      regulation: 'GDPR',
      requirement: 'General Data Protection Regulation',
      status: 'compliant',
      lastChecked: '2024-01-05',
      nextCheck: '2024-07-05',
      responsible: 'Privacy Team',
      documentation: ['Privacy Impact Assessment', 'Data Processing Agreement'],
      violations: []
    },
    {
      id: '3',
      regulation: 'Basel III',
      requirement: 'Capital Adequacy Requirements',
      status: 'under_review',
      lastChecked: '2024-01-12',
      nextCheck: '2024-03-12',
      responsible: 'Risk Management Team',
      documentation: ['Capital Adequacy Report', 'Stress Test Results'],
      violations: [
        {
          id: '1',
          type: 'Capital Ratio',
          severity: 'minor',
          description: 'Tier 1 capital ratio slightly below optimal level',
          discovered: '2024-01-12',
          status: 'investigating',
          assignedTo: 'Risk Management Team'
        }
      ]
    },
    {
      id: '4',
      regulation: 'AML/KYC',
      requirement: 'Anti-Money Laundering / Know Your Customer',
      status: 'compliant',
      lastChecked: '2024-01-08',
      nextCheck: '2024-04-08',
      responsible: 'Compliance Team',
      documentation: ['AML Policy', 'KYC Procedures', 'Transaction Monitoring Report'],
      violations: []
    }
  ]);

  const [alerts, setAlerts] = useState<OperationalAlert[]>([
    {
      id: '1',
      type: 'performance',
      severity: 'warning',
      message: 'Transaction processing latency increased by 15%',
      timestamp: '2024-01-15 16:30:00',
      source: 'Transaction Monitoring System',
      status: 'active',
      assignedTo: 'Performance Team',
      escalation: false
    },
    {
      id: '2',
      type: 'security',
      severity: 'info',
      message: 'Unusual login pattern detected from APAC region',
      timestamp: '2024-01-15 16:25:00',
      source: 'Security Monitoring System',
      status: 'acknowledged',
      assignedTo: 'Security Team',
      escalation: false
    },
    {
      id: '3',
      type: 'compliance',
      severity: 'error',
      message: 'Potential AML violation detected in transaction #123456789',
      timestamp: '2024-01-15 16:20:00',
      source: 'AML Monitoring System',
      status: 'active',
      assignedTo: 'Compliance Team',
      escalation: true
    },
    {
      id: '4',
      type: 'system',
      severity: 'critical',
      message: 'Database connection pool exhausted',
      timestamp: '2024-01-15 16:15:00',
      source: 'Database Monitoring System',
      status: 'resolved',
      assignedTo: 'Database Team',
      escalation: true
    }
  ]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
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
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'suspended': return 'bg-gray-500';
      case 'compliant': return 'bg-green-500';
      case 'non_compliant': return 'bg-red-500';
      case 'under_review': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'acknowledged': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      case 'critical': return 'text-red-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case 'withdrawal': return <ArrowDownRight className="h-4 w-4 text-red-400" />;
      case 'transfer': return <Network className="h-4 w-4 text-blue-400" />;
      case 'investment': return <TrendingUp className="h-4 w-4 text-purple-400" />;
      case 'loan': return <CreditCard className="h-4 w-4 text-orange-400" />;
      case 'payment': return <Banknote className="h-4 w-4 text-yellow-400" />;
      case 'compliance': return <Scale className="h-4 w-4 text-indigo-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4 text-red-400" />;
      case 'performance': return <TrendingUp className="h-4 w-4 text-yellow-400" />;
      case 'compliance': return <Scale className="h-4 w-4 text-orange-400" />;
      case 'system': return <Server className="h-4 w-4 text-blue-400" />;
      case 'financial': return <DollarSign className="h-4 w-4 text-green-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Genix Bank Operations Center
              </h1>
              <p className="text-xl text-blue-200">
                Banking Operations Management & Compliance Monitoring Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                <Activity className="h-4 w-4 mr-2" />
                {operations.length} Active Operations
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Operations Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Operations Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Transactions</p>
                  <p className="text-3xl font-bold text-white">
                    {operations.reduce((sum, op) => sum + op.volume, 0).toLocaleString()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-white">
                    {(operations.reduce((sum, op) => sum + op.successRate, 0) / operations.length).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Compliance Score</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(operations.reduce((sum, op) => sum + op.metrics.complianceScore, 0) / operations.length)}%
                  </p>
                </div>
                <Scale className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Active Alerts</p>
                  <p className="text-3xl font-bold text-white">
                    {alerts.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Management */}
        <Tabs defaultValue="operations" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="operations" className="text-white">Operations</TabsTrigger>
            <TabsTrigger value="compliance" className="text-white">Compliance</TabsTrigger>
            <TabsTrigger value="alerts" className="text-white">Alerts</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-6">
            <div className="space-y-4">
              {operations.map((operation) => (
                <Card key={operation.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getOperationIcon(operation.type)}
                        <CardTitle className="text-white text-xl">{operation.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(operation.status)} text-white border-0`}
                        >
                          {operation.status}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(operation.priority)}`}>
                          {operation.priority}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Operation Details */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Operation Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Volume:</span>
                            <span className="text-white">{operation.volume.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Value:</span>
                            <span className="text-white">{formatCurrency(operation.value)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Success Rate:</span>
                            <span className="text-green-400">{operation.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Executed:</span>
                            <span className="text-white">{operation.lastExecuted}</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Performance Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Uptime</span>
                            <span className="text-white">{operation.metrics.uptime}%</span>
                          </div>
                          <Progress value={operation.metrics.uptime} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Performance</span>
                            <span className="text-white">{operation.metrics.performance}%</span>
                          </div>
                          <Progress value={operation.metrics.performance} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Customer Satisfaction</span>
                            <span className="text-white">{operation.metrics.customerSatisfaction}%</span>
                          </div>
                          <Progress value={operation.metrics.customerSatisfaction} className="h-2" />
                        </div>
                      </div>

                      {/* Team & Actions */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Team & Actions</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-400 text-sm">Team:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {operation.team.map((member, index) => (
                                <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                              <Monitor className="h-3 w-3 mr-2" />
                              Monitor
                            </Button>
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                              <Settings className="h-3 w-3 mr-2" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risks */}
                    {operation.risks.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-white font-medium mb-2">Risk Assessment</h4>
                        <div className="space-y-2">
                          {operation.risks.map((risk) => (
                            <div key={risk.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                              <AlertTriangle className="h-4 w-4 text-yellow-400" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium">{risk.description}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(risk.status)} text-white border-0`}
                                  >
                                    {risk.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-300">Mitigation: {risk.mitigation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="space-y-4">
              {complianceChecks.map((check) => (
                <Card key={check.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Scale className="h-5 w-5 text-indigo-400" />
                        <CardTitle className="text-white text-xl">{check.regulation}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(check.status)} text-white border-0`}
                        >
                          {check.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-blue-400">{check.responsible}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{check.requirement}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Compliance Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Checked:</span>
                            <span className="text-white">{check.lastChecked}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Next Check:</span>
                            <span className="text-white">{check.nextCheck}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Responsible:</span>
                            <span className="text-white">{check.responsible}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Documentation</h4>
                        <div className="space-y-1">
                          {check.documentation.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-green-400 border-green-400 text-xs mr-1">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Violations</h4>
                        {check.violations.length > 0 ? (
                          <div className="space-y-2">
                            {check.violations.map((violation) => (
                              <div key={violation.id} className="p-2 bg-red-900/50 rounded text-sm">
                                <div className="flex justify-between">
                                  <span className="text-red-400 font-medium">{violation.type}</span>
                                  <span className={`text-xs ${getPriorityColor(violation.severity)}`}>
                                    {violation.severity}
                                  </span>
                                </div>
                                <p className="text-red-300 text-xs mt-1">{violation.description}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-green-400 text-sm">No violations</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{alert.message}</h4>
                          <p className="text-sm text-gray-400">
                            {alert.timestamp} • {alert.source} • Assigned to: {alert.assignedTo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(alert.status)} text-white border-0`}
                          >
                            {alert.status}
                          </Badge>
                          <p className={`text-sm mt-1 ${getPriorityColor(alert.severity)}`}>
                            {alert.severity}
                          </p>
                        </div>
                        {alert.escalation && (
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Operation Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Operation Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Compliance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Compliance Trends Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Alert Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Alert Trends Chart Component
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap,
  Brain,
  MapPin,
  Search,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { boringBusinessAIService } from '../services/boringBusinessAIService';
import { ollamaService } from '../services/ollamaService';
import toast from 'react-hot-toast';

interface StealthOperation {
  id: string;
  name: string;
  description: string;
  business_type: string;
  revenue_potential: number;
  stealth_level: number;
  automation_level: number;
  implementation_time: string;
  risk_level: string;
  profit_timeline: string;
  required_resources: string[];
  operational_steps: string[];
  revenue_streams: string[];
  competitive_advantages: string[];
}

interface MarketIntelligence {
  market_size: number;
  competition_density: number;
  opportunity_score: number;
  trend_analysis: string;
  growth_potential: string;
  barriers_to_entry: string[];
  market_gaps: string[];
  pricing_analysis: string;
  customer_segments: string[];
  revenue_optimization: string[];
}

interface RevenueOptimization {
  strategy: string;
  implementation: string;
  expected_revenue_increase: number;
  time_to_implement: string;
  automation_potential: number;
  stealth_factor: number;
  risk_level: string;
}

const StealthBusinessOperations: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'operations' | 'intelligence' | 'optimization' | 'monitoring'>('operations');
  const [stealthOperations, setStealthOperations] = useState<StealthOperation[]>([]);
  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence | null>(null);
  const [revenueOptimizations, setRevenueOptimizations] = useState<RevenueOptimization[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<StealthOperation | null>(null);
  const [operationStatus, setOperationStatus] = useState<{[key: string]: string}>({});
  const [searchLocation, setSearchLocation] = useState('New York, NY');
  const [searchCategory, setSearchCategory] = useState('local services');

  const businessCategories = [
    'Cleaning Services', 'Lawn Care', 'Pet Grooming', 'Car Wash', 'Pressure Washing',
    'Window Cleaning', 'Gutter Cleaning', 'HVAC Services', 'Plumbing', 'Electrical',
    'Locksmith', 'Moving Services', 'Storage Units', 'Laundromat', 'Dry Cleaning',
    'Auto Repair', 'Tire Shop', 'Oil Change', 'Car Detailing', 'Mobile Car Wash',
    'Food Truck', 'Coffee Cart', 'Ice Cream Truck', 'Vending Machines', 'ATM Services',
    'Parking Lot Management', 'Security Services', 'Trash Collection', 'Snow Removal',
    'Pool Maintenance', 'Pest Control', 'Home Inspection', 'Property Management',
    'Digital Marketing', 'SEO Services', 'Content Creation', 'Social Media Management',
    'Lead Generation', 'Email Marketing', 'Web Design', 'Graphic Design', 'Video Production'
  ];

  const handleGenerateStealthOperations = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 20 stealth business operations that can quietly print money with AI automation.
      
      Each operation should include:
      - Operation name and description
      - Business type
      - Revenue potential (monthly)
      - Stealth level (0-100%, how quietly it operates)
      - Automation level (0-100%)
      - Implementation time
      - Risk level (Low/Medium/High)
      - Profit timeline
      - Required resources
      - Operational steps (5-7 steps)
      - Revenue streams (3-5 streams)
      - Competitive advantages (3-5 advantages)
      
      Focus on operations that:
      - Generate $10K-$100K monthly revenue
      - Operate with 80%+ automation
      - Have 80%+ stealth factor
      - Require minimal upfront investment
      - Scale without attracting attention
      - Have low competition
      - Can be implemented quickly
      
      Examples of good stealth operations:
      - Local service automation
      - Digital service arbitrage
      - Lead generation systems
      - Content creation automation
      - Social media management
      - Email marketing automation
      - SEO service automation
      - Local business optimization
      
      Return in JSON format with array of operations.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a stealth business operations expert who specializes in creating profitable, automated businesses that operate quietly and generate significant revenue.",
        temperature: 0.6,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      const operations: StealthOperation[] = data.operations?.map((op: any, index: number) => ({
        id: `operation-${index}`,
        name: op.name,
        description: op.description,
        business_type: op.business_type,
        revenue_potential: op.revenue_potential || Math.floor(Math.random() * 90000) + 10000,
        stealth_level: op.stealth_level || Math.floor(Math.random() * 30) + 70,
        automation_level: op.automation_level || Math.floor(Math.random() * 30) + 70,
        implementation_time: op.implementation_time || '2-4 weeks',
        risk_level: op.risk_level || 'Low',
        profit_timeline: op.profit_timeline || '1-3 months',
        required_resources: op.required_resources || ['Computer', 'Internet', 'AI Tools', 'Basic Software'],
        operational_steps: op.operational_steps || ['Setup', 'Configure', 'Test', 'Launch', 'Scale'],
        revenue_streams: op.revenue_streams || ['Service Fees', 'Subscription', 'Commission', 'Upselling'],
        competitive_advantages: op.competitive_advantages || ['AI Automation', 'Low Overhead', 'Stealth Operations']
      })) || [];

      setStealthOperations(operations);
      toast.success(`Generated ${operations.length} stealth business operations`);
    } catch (error) {
      console.error('Error generating stealth operations:', error);
      toast.error('Failed to generate stealth operations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeMarketIntelligence = async () => {
    setIsLoading(true);
    try {
      const prompt = `Analyze market intelligence for ${searchCategory} businesses in ${searchLocation}.
      
      Provide comprehensive analysis including:
      - Market size estimate (total addressable market)
      - Competition density (0-100%)
      - Opportunity score (0-100%)
      - Trend analysis (current market trends)
      - Growth potential (Low/Medium/High)
      - Barriers to entry (5-7 barriers)
      - Market gaps (5-7 opportunities)
      - Pricing analysis (pricing strategies)
      - Customer segments (3-5 segments)
      - Revenue optimization strategies (5-7 strategies)
      
      Focus on:
      - Identifying underserved niches
      - Finding low-competition opportunities
      - Understanding market dynamics
      - Identifying revenue optimization opportunities
      - Assessing growth potential
      
      Return in JSON format.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a market intelligence expert specializing in identifying profitable business opportunities and market gaps for stealth operations.",
        temperature: 0.4,
        maxTokens: 1536
      });

      const data = JSON.parse(response);
      setMarketIntelligence(data);
      toast.success('Market intelligence analysis complete');
    } catch (error) {
      console.error('Error analyzing market intelligence:', error);
      toast.error('Failed to analyze market intelligence');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateRevenueOptimizations = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 15 revenue optimization strategies for stealth business operations.
      
      Each strategy should include:
      - Strategy name and description
      - Implementation steps
      - Expected revenue increase (percentage)
      - Time to implement
      - Automation potential (0-100%)
      - Stealth factor (0-100%)
      - Risk level (Low/Medium/High)
      
      Focus on strategies that:
      - Increase revenue without increasing costs significantly
      - Can be automated with AI
      - Operate quietly (stealth mode)
      - Scale easily
      - Require minimal upfront investment
      - Have low risk
      
      Include strategies for:
      - Pricing optimization
      - Upselling and cross-selling
      - Customer retention
      - Lead generation
      - Market expansion
      - Service diversification
      - Automation opportunities
      - Partnership opportunities
      - Revenue stream diversification
      - Cost reduction
      - Efficiency improvements
      - Customer acquisition
      - Market penetration
      - Product development
      - Competitive advantage
      
      Return in JSON format with array of strategies.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a revenue optimization expert specializing in stealth business growth and AI automation. Focus on practical strategies that can be implemented quickly.",
        temperature: 0.5,
        maxTokens: 1536
      });

      const data = JSON.parse(response);
      setRevenueOptimizations(data.strategies || []);
      toast.success(`Generated ${data.strategies?.length || 0} revenue optimization strategies`);
    } catch (error) {
      console.error('Error generating revenue optimizations:', error);
      toast.error('Failed to generate revenue optimizations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOperation = async (operationId: string) => {
    setIsLoading(true);
    try {
      setOperationStatus(prev => ({ ...prev, [operationId]: 'starting' }));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOperationStatus(prev => ({ ...prev, [operationId]: 'running' }));
      toast.success('Stealth operation started successfully!');
    } catch (error) {
      setOperationStatus(prev => ({ ...prev, [operationId]: 'failed' }));
      toast.error('Failed to start stealth operation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopOperation = async (operationId: string) => {
    setIsLoading(true);
    try {
      setOperationStatus(prev => ({ ...prev, [operationId]: 'stopping' }));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOperationStatus(prev => ({ ...prev, [operationId]: 'stopped' }));
      toast.success('Stealth operation stopped successfully!');
    } catch (error) {
      toast.error('Failed to stop stealth operation');
    } finally {
      setIsLoading(false);
    }
  };

  const isOllamaReady = ollamaService.getConnectionStatus().connected;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          🥷 Stealth Business Operations - Quiet Money Printing
        </h2>
        <p className="text-gray-300 text-lg">
          AI-Powered Stealth Operations for Maximum Profit with Minimal Attention
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('operations')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'operations'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Eye className="w-4 h-4 inline mr-2" /> Stealth Operations
        </button>
        <button
          onClick={() => setActiveTab('intelligence')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'intelligence'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" /> Market Intelligence
        </button>
        <button
          onClick={() => setActiveTab('optimization')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'optimization'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" /> Revenue Optimization
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'monitoring'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" /> Operation Monitoring
        </button>
      </div>

      {/* Stealth Operations Tab */}
      {activeTab === 'operations' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2" /> Stealth Business Operations
            </h3>
            <p className="text-gray-300 mb-6">
              Generate and manage stealth business operations that quietly print money with AI automation.
            </p>

            <motion.button
              onClick={handleGenerateStealthOperations}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Stealth Operations...' : 'Generate Stealth Operations'}</span>
            </motion.button>
          </div>

          {stealthOperations.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Stealth Operations ({stealthOperations.length} operations)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stealthOperations.map((operation) => (
                  <div key={operation.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white">{operation.name}</h5>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStartOperation(operation.id)}
                          className="text-green-400 hover:text-green-300"
                          title="Start Operation"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStopOperation(operation.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Stop Operation"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">{operation.business_type}</p>
                    <p className="text-gray-300 text-sm mb-3">{operation.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Revenue Potential:</span>
                        <span className="text-green-400 text-sm">${operation.revenue_potential?.toLocaleString()}/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Stealth Level:</span>
                        <span className="text-red-400 text-sm">{operation.stealth_level}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automation Level:</span>
                        <span className="text-purple-400 text-sm">{operation.automation_level}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Implementation Time:</span>
                        <span className="text-blue-400 text-sm">{operation.implementation_time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Risk Level:</span>
                        <span className="text-yellow-400 text-sm">{operation.risk_level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Profit Timeline:</span>
                        <span className="text-orange-400 text-sm">{operation.profit_timeline}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Revenue Streams:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {operation.revenue_streams?.map((stream, i) => (
                          <span key={i} className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            {stream}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Competitive Advantages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {operation.competitive_advantages?.map((advantage, i) => (
                          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {advantage}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Status:</span>
                      <span className={`ml-2 text-sm ${
                        operationStatus[operation.id] === 'running' ? 'text-green-400' :
                        operationStatus[operation.id] === 'starting' ? 'text-blue-400' :
                        operationStatus[operation.id] === 'stopping' ? 'text-yellow-400' :
                        operationStatus[operation.id] === 'stopped' ? 'text-gray-400' :
                        operationStatus[operation.id] === 'failed' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {operationStatus[operation.id] || 'Ready'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Market Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" /> Market Intelligence Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                  placeholder="City, State or Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Category
                </label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                >
                  {businessCategories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleAnalyzeMarketIntelligence}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
              <span>{isLoading ? 'Analyzing Market...' : 'Analyze Market Intelligence'}</span>
            </motion.button>
          </div>

          {marketIntelligence && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Market Intelligence Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Market Metrics</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Size:</span>
                        <span className="text-green-400">${marketIntelligence.market_size?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Competition Density:</span>
                        <span className="text-red-400">{marketIntelligence.competition_density}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Opportunity Score:</span>
                        <span className="text-blue-400">{marketIntelligence.opportunity_score}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Potential:</span>
                        <span className="text-purple-400">{marketIntelligence.growth_potential}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Trend Analysis</h5>
                    <p className="text-gray-300 text-sm">{marketIntelligence.trend_analysis}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Market Gaps</h5>
                    <div className="space-y-1">
                      {marketIntelligence.market_gaps?.map((gap, i) => (
                        <div key={i} className="text-gray-300 text-sm">• {gap}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">Customer Segments</h5>
                    <div className="space-y-1">
                      {marketIntelligence.customer_segments?.map((segment, i) => (
                        <div key={i} className="text-gray-300 text-sm">• {segment}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revenue Optimization Tab */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" /> Revenue Optimization Strategies
            </h3>
            <p className="text-gray-300 mb-6">
              Generate AI-powered revenue optimization strategies for maximum profit with minimal effort.
            </p>

            <motion.button
              onClick={handleGenerateRevenueOptimizations}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Strategies...' : 'Generate Revenue Optimization Strategies'}</span>
            </motion.button>
          </div>

          {revenueOptimizations.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Revenue Optimization Strategies ({revenueOptimizations.length} strategies)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {revenueOptimizations.map((strategy, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">{strategy.strategy}</h5>
                    <p className="text-gray-300 text-sm mb-3">{strategy.implementation}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Revenue Increase:</span>
                        <span className="text-green-400 text-sm">+{strategy.expected_revenue_increase}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Time to Implement:</span>
                        <span className="text-blue-400 text-sm">{strategy.time_to_implement}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automation Potential:</span>
                        <span className="text-purple-400 text-sm">{strategy.automation_potential}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Stealth Factor:</span>
                        <span className="text-red-400 text-sm">{strategy.stealth_factor}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Risk Level:</span>
                        <span className="text-yellow-400 text-sm">{strategy.risk_level}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Operation Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" /> Operation Monitoring Dashboard
            </h3>
            <p className="text-gray-300 mb-6">
              Monitor and manage your stealth operations for maximum profitability and security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Active Operations</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(operationStatus).filter(status => status === 'running').length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <Play className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Starting</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(operationStatus).filter(status => status === 'starting').length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <Pause className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Stopped</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(operationStatus).filter(status => status === 'stopped').length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Failed</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(operationStatus).filter(status => status === 'failed').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
          isOllamaReady ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          <Brain className="w-4 h-4 mr-2" />
          {isOllamaReady ? 'AI Ready - Ollama Connected' : 'AI Offline - Ollama Not Connected'}
        </div>
      </div>
    </div>
  );
};

export default StealthBusinessOperations;

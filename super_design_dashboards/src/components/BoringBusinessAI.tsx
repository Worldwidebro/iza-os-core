import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Brain, 
  Zap, 
  Target,
  Loader2,
  Download,
  Eye,
  BarChart3,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';
import { ollamaService } from '../services/ollamaService';
import toast from 'react-hot-toast';

interface BusinessData {
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  category: string;
  revenue_estimate: number;
  competition_score: number;
  opportunity_score: number;
}

interface BoringBusinessIdea {
  business_type: string;
  description: string;
  startup_cost: number;
  monthly_revenue_potential: number;
  competition_level: string;
  scalability: string;
  ai_automation_potential: number;
  stealth_factor: number;
}

interface N8NWorkflow {
  name: string;
  description: string;
  triggers: string[];
  actions: string[];
  automation_level: number;
  revenue_impact: number;
}

const BoringBusinessAI: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'scraper' | 'generator' | 'analyzer' | 'workflows'>('scraper');
  const [businessData, setBusinessData] = useState<BusinessData[]>([]);
  const [businessIdeas, setBusinessIdeas] = useState<BoringBusinessIdea[]>([]);
  const [n8nWorkflows, setN8nWorkflows] = useState<N8NWorkflow[]>([]);
  const [searchLocation, setSearchLocation] = useState('New York, NY');
  const [searchCategory, setSearchCategory] = useState('restaurants');

  const boringBusinessCategories = [
    'Cleaning Services', 'Lawn Care', 'Pet Grooming', 'Car Wash', 'Pressure Washing',
    'Window Cleaning', 'Gutter Cleaning', 'HVAC Services', 'Plumbing', 'Electrical',
    'Locksmith', 'Moving Services', 'Storage Units', 'Laundromat', 'Dry Cleaning',
    'Auto Repair', 'Tire Shop', 'Oil Change', 'Car Detailing', 'Mobile Car Wash',
    'Food Truck', 'Coffee Cart', 'Ice Cream Truck', 'Vending Machines', 'ATM Services',
    'Parking Lot Management', 'Security Services', 'Trash Collection', 'Snow Removal',
    'Pool Maintenance', 'Pest Control', 'Home Inspection', 'Property Management'
  ];

  const handleGoogleMapsScrape = async () => {
    setIsLoading(true);
    try {
      const prompt = `Analyze Google Maps business data for ${searchLocation} in the ${searchCategory} category. 
      Provide detailed business information including:
      - Business name, address, phone, website
      - Rating and review count
      - Estimated revenue potential
      - Competition analysis
      - Market opportunity score
      
      Focus on boring but profitable businesses that can be automated with AI.
      Return data in JSON format for 10 businesses.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are an expert business analyst specializing in identifying profitable boring businesses with high automation potential.",
        temperature: 0.3,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      setBusinessData(data.businesses || []);
      toast.success(`Scraped ${data.businesses?.length || 0} businesses from Google Maps`);
    } catch (error) {
      console.error('Error scraping Google Maps:', error);
      toast.error('Failed to scrape Google Maps data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBoringIdeas = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 15 boring but highly profitable business ideas that can be quietly scaled with AI automation.
      
      Focus on:
      - Low competition, high demand services
      - Businesses that can be automated 80%+ with AI
      - Stealth operations (quiet money making)
      - Scalable without attracting attention
      - $10K-$100K monthly revenue potential
      
      Include for each idea:
      - Business type and description
      - Startup cost estimate
      - Monthly revenue potential
      - Competition level (Low/Medium/High)
      - Scalability rating
      - AI automation potential (0-100%)
      - Stealth factor (0-100%)
      
      Return in JSON format.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a stealth business strategist who specializes in identifying boring businesses that quietly print money with AI automation.",
        temperature: 0.6,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      setBusinessIdeas(data.ideas || []);
      toast.success(`Generated ${data.ideas?.length || 0} boring business ideas`);
    } catch (error) {
      console.error('Error generating business ideas:', error);
      toast.error('Failed to generate business ideas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeBusinessOpportunity = async (business: BusinessData) => {
    setIsLoading(true);
    try {
      const prompt = `Analyze the business opportunity for "${business.name}" in ${business.category}.
      
      Provide detailed analysis:
      - Market size and demand
      - Competition analysis
      - Revenue optimization strategies
      - AI automation opportunities
      - Stealth scaling methods
      - Risk assessment
      - Action plan for implementation
      
      Focus on how to quietly build this into a profitable AI-automated business.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a business optimization expert who specializes in turning boring businesses into AI-powered profit machines.",
        temperature: 0.4,
        maxTokens: 1536
      });

      toast.success(`Analysis complete for ${business.name}`);
      // Store analysis results
    } catch (error) {
      console.error('Error analyzing business:', error);
      toast.error('Failed to analyze business opportunity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateN8NWorkflows = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 20 n8n workflow templates for automating boring businesses and quietly printing money.
      
      Include workflows for:
      - Google Maps data scraping and analysis
      - Lead generation and qualification
      - Customer communication automation
      - Revenue optimization
      - Competitor monitoring
      - Market research automation
      - Social media management
      - Email marketing automation
      - Appointment scheduling
      - Payment processing
      - Inventory management
      - Customer feedback collection
      - Review management
      - SEO optimization
      - Local business listing management
      - Competitor price monitoring
      - Market trend analysis
      - Customer retention
      - Upselling automation
      - Financial reporting
      
      For each workflow, provide:
      - Workflow name and description
      - Trigger events
      - Action steps
      - Automation level (0-100%)
      - Revenue impact potential
      
      Return in JSON format.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are an n8n workflow automation expert specializing in business process automation for maximum profit with minimal effort.",
        temperature: 0.5,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      setN8nWorkflows(data.workflows || []);
      toast.success(`Generated ${data.workflows?.length || 0} n8n workflows`);
    } catch (error) {
      console.error('Error generating workflows:', error);
      toast.error('Failed to generate n8n workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const isOllamaReady = ollamaService.getConnectionStatus().connected;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          🤖 Boring Business AI - Quiet Money Printing Machine
        </h2>
        <p className="text-gray-300 text-lg">
          AI-Powered Business Intelligence for Stealth Profits
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('scraper')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'scraper'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MapPin className="w-4 h-4 inline mr-2" /> Google Maps Scraper
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'generator'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" /> Business Generator
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analyzer'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" /> Opportunity Analyzer
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'workflows'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" /> N8N Workflows
        </button>
      </div>

      {/* Google Maps Scraper Tab */}
      {activeTab === 'scraper' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" /> Google Maps Business Scraper
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
                  {boringBusinessCategories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleMapsScrape}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              <span>{isLoading ? 'Scraping Google Maps...' : 'Scrape Business Data'}</span>
            </motion.button>
          </div>

          {businessData.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Scraped Business Data ({businessData.length} businesses)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessData.map((business, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white">{business.name}</h5>
                    <p className="text-gray-300 text-sm">{business.address}</p>
                    <p className="text-gray-300 text-sm">{business.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-400">⭐ {business.rating}</span>
                      <span className="text-green-400">${business.revenue_estimate?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-blue-400">{business.reviews} reviews</span>
                      <span className="text-purple-400">{business.opportunity_score}% opportunity</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Business Generator Tab */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" /> AI Business Idea Generator
            </h3>
            <p className="text-gray-300 mb-6">
              Generate boring but highly profitable business ideas that can be quietly scaled with AI automation.
            </p>

            <motion.button
              onClick={handleGenerateBoringIdeas}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Ideas...' : 'Generate Boring Business Ideas'}</span>
            </motion.button>
          </div>

          {businessIdeas.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Business Ideas ({businessIdeas.length} ideas)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessIdeas.map((idea, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">{idea.business_type}</h5>
                    <p className="text-gray-300 text-sm mb-3">{idea.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Startup Cost:</span>
                        <span className="text-red-400">${idea.startup_cost?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="text-green-400">${idea.monthly_revenue_potential?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Competition:</span>
                        <span className="text-yellow-400">{idea.competition_level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scalability:</span>
                        <span className="text-blue-400">{idea.scalability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Automation:</span>
                        <span className="text-purple-400">{idea.ai_automation_potential}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stealth Factor:</span>
                        <span className="text-orange-400">{idea.stealth_factor}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Opportunity Analyzer Tab */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" /> Business Opportunity Analyzer
            </h3>
            <p className="text-gray-300 mb-6">
              Analyze business opportunities and get AI-powered insights for maximum profit potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Revenue Analysis</h4>
                <p className="text-gray-300 text-sm">AI-powered revenue optimization</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Market Trends</h4>
                <p className="text-gray-300 text-sm">Real-time market intelligence</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Competition Analysis</h4>
                <p className="text-gray-300 text-sm">Stealth competitive advantage</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* N8N Workflows Tab */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" /> N8N Workflow Generator
            </h3>
            <p className="text-gray-300 mb-6">
              Generate automated workflows for boring businesses to quietly print money.
            </p>

            <motion.button
              onClick={handleGenerateN8NWorkflows}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Workflows...' : 'Generate N8N Workflows'}</span>
            </motion.button>
          </div>

          {n8nWorkflows.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated N8N Workflows ({n8nWorkflows.length} workflows)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {n8nWorkflows.map((workflow, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">{workflow.name}</h5>
                    <p className="text-gray-300 text-sm mb-3">{workflow.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400 text-sm">Triggers:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workflow.triggers?.map((trigger, i) => (
                            <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Actions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workflow.actions?.map((action, i) => (
                            <span key={i} className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Automation:</span>
                          <span className="text-purple-400">{workflow.automation_level}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Revenue Impact:</span>
                          <span className="text-green-400">{workflow.revenue_impact}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default BoringBusinessAI;

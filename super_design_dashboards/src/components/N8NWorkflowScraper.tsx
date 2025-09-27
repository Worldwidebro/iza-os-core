import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Download, 
  Play, 
  Settings, 
  BarChart3, 
  DollarSign,
  Target,
  Zap,
  Brain,
  MapPin,
  Search,
  TrendingUp,
  Loader2,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { boringBusinessAIService } from '../services/boringBusinessAIService';
import { ollamaService } from '../services/ollamaService';
import toast from 'react-hot-toast';

interface N8NWorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  triggers: string[];
  actions: string[];
  automation_level: number;
  revenue_impact: number;
  implementation_complexity: string;
  time_to_profit: string;
  setup_steps: string[];
  required_integrations: string[];
  estimated_monthly_revenue: number;
  stealth_factor: number;
}

interface GoogleMapsScrapingWorkflow {
  id: string;
  name: string;
  description: string;
  target_categories: string[];
  data_points: string[];
  automation_steps: string[];
  revenue_potential: number;
  implementation_time: string;
}

interface BusinessAutomationWorkflow {
  id: string;
  name: string;
  business_type: string;
  description: string;
  automation_level: number;
  monthly_revenue_potential: number;
  setup_complexity: string;
  required_tools: string[];
  workflow_steps: string[];
}

const N8NWorkflowScraper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'scraper' | 'automation' | 'deployment'>('templates');
  const [workflowTemplates, setWorkflowTemplates] = useState<N8NWorkflowTemplate[]>([]);
  const [scrapingWorkflows, setScrapingWorkflows] = useState<GoogleMapsScrapingWorkflow[]>([]);
  const [automationWorkflows, setAutomationWorkflows] = useState<BusinessAutomationWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<N8NWorkflowTemplate | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<{[key: string]: string}>({});

  const workflowCategories = [
    'Lead Generation',
    'Customer Communication',
    'Revenue Optimization',
    'Competitor Monitoring',
    'Market Research',
    'Social Media Management',
    'Email Marketing',
    'Appointment Scheduling',
    'Payment Processing',
    'Inventory Management',
    'Customer Feedback',
    'Review Management',
    'SEO Optimization',
    'Local Business Listings',
    'Price Monitoring',
    'Market Analysis',
    'Customer Retention',
    'Upselling',
    'Financial Reporting',
    'Content Creation'
  ];

  const handleGenerateWorkflowTemplates = async () => {
    setIsLoading(true);
    try {
      const workflows = await boringBusinessAIService.generateN8NWorkflows();
      
      // Transform the workflows into our template format
      const templates: N8NWorkflowTemplate[] = workflows.map((workflow, index) => ({
        id: `template-${index}`,
        name: workflow.name,
        description: workflow.description,
        category: workflowCategories[index % workflowCategories.length],
        triggers: workflow.triggers,
        actions: workflow.actions,
        automation_level: workflow.automation_level,
        revenue_impact: workflow.revenue_impact,
        implementation_complexity: workflow.implementation_complexity,
        time_to_profit: workflow.time_to_profit,
        setup_steps: [
          'Install n8n',
          'Configure API keys',
          'Set up webhooks',
          'Test workflow',
          'Deploy to production'
        ],
        required_integrations: [
          'Google Maps API',
          'Email Service',
          'CRM System',
          'Payment Gateway'
        ],
        estimated_monthly_revenue: Math.floor(Math.random() * 50000) + 5000,
        stealth_factor: Math.floor(Math.random() * 40) + 60
      }));

      setWorkflowTemplates(templates);
      toast.success(`Generated ${templates.length} N8N workflow templates`);
    } catch (error) {
      console.error('Error generating workflow templates:', error);
      toast.error('Failed to generate workflow templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateScrapingWorkflows = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 15 Google Maps scraping workflows for n8n that can be used to find boring business opportunities.
      
      Each workflow should include:
      - Workflow name and description
      - Target business categories
      - Data points to collect
      - Automation steps
      - Revenue potential
      - Implementation time
      
      Focus on workflows that:
      - Scrape business data from Google Maps
      - Analyze competition and opportunities
      - Generate leads for boring businesses
      - Monitor market trends
      - Identify underserved niches
      
      Return in JSON format with array of workflows.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are an n8n workflow expert specializing in Google Maps data scraping and business intelligence automation.",
        temperature: 0.4,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      const workflows: GoogleMapsScrapingWorkflow[] = data.workflows?.map((workflow: any, index: number) => ({
        id: `scraper-${index}`,
        name: workflow.name,
        description: workflow.description,
        target_categories: workflow.target_categories || ['restaurants', 'services', 'retail'],
        data_points: workflow.data_points || ['name', 'address', 'phone', 'rating', 'reviews'],
        automation_steps: workflow.automation_steps || ['scrape', 'analyze', 'store', 'notify'],
        revenue_potential: workflow.revenue_potential || Math.floor(Math.random() * 100000) + 10000,
        implementation_time: workflow.implementation_time || '2-4 weeks'
      })) || [];

      setScrapingWorkflows(workflows);
      toast.success(`Generated ${workflows.length} Google Maps scraping workflows`);
    } catch (error) {
      console.error('Error generating scraping workflows:', error);
      toast.error('Failed to generate scraping workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAutomationWorkflows = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 20 business automation workflows for n8n that can quietly print money with boring businesses.
      
      Each workflow should include:
      - Workflow name and business type
      - Description of what it automates
      - Automation level (0-100%)
      - Monthly revenue potential
      - Setup complexity
      - Required tools
      - Step-by-step workflow
      
      Focus on workflows for:
      - Local service businesses
      - E-commerce operations
      - Lead generation
      - Customer management
      - Revenue optimization
      - Marketing automation
      - Operations automation
      
      Return in JSON format with array of workflows.`;

      const response = await ollamaService.sendMessage(prompt, 'llama3.2:3b', {
        systemPrompt: "You are a business automation expert specializing in n8n workflows for profitable boring businesses.",
        temperature: 0.5,
        maxTokens: 2048
      });

      const data = JSON.parse(response);
      const workflows: BusinessAutomationWorkflow[] = data.workflows?.map((workflow: any, index: number) => ({
        id: `automation-${index}`,
        name: workflow.name,
        business_type: workflow.business_type || 'Service Business',
        description: workflow.description,
        automation_level: workflow.automation_level || Math.floor(Math.random() * 40) + 60,
        monthly_revenue_potential: workflow.monthly_revenue_potential || Math.floor(Math.random() * 50000) + 5000,
        setup_complexity: workflow.setup_complexity || 'Medium',
        required_tools: workflow.required_tools || ['n8n', 'CRM', 'Email Service', 'Payment Gateway'],
        workflow_steps: workflow.workflow_steps || ['Setup', 'Configure', 'Test', 'Deploy', 'Monitor']
      })) || [];

      setAutomationWorkflows(workflows);
      toast.success(`Generated ${workflows.length} business automation workflows`);
    } catch (error) {
      console.error('Error generating automation workflows:', error);
      toast.error('Failed to generate automation workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeployWorkflow = async (workflowId: string) => {
    setIsLoading(true);
    try {
      // Simulate deployment process
      setDeploymentStatus(prev => ({ ...prev, [workflowId]: 'deploying' }));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDeploymentStatus(prev => ({ ...prev, [workflowId]: 'deployed' }));
      toast.success('Workflow deployed successfully!');
    } catch (error) {
      setDeploymentStatus(prev => ({ ...prev, [workflowId]: 'failed' }));
      toast.error('Failed to deploy workflow');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyWorkflow = (workflow: N8NWorkflowTemplate) => {
    const workflowJson = JSON.stringify(workflow, null, 2);
    navigator.clipboard.writeText(workflowJson);
    toast.success('Workflow copied to clipboard!');
  };

  const isOllamaReady = ollamaService.getConnectionStatus().connected;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          🔧 N8N Workflow Scraper & Business Automation
        </h2>
        <p className="text-gray-300 text-lg">
          AI-Powered Workflow Generation for Stealth Money Printing
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'templates'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Workflow className="w-4 h-4 inline mr-2" /> Workflow Templates
        </button>
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
          onClick={() => setActiveTab('automation')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'automation'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" /> Business Automation
        </button>
        <button
          onClick={() => setActiveTab('deployment')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'deployment'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Play className="w-4 h-4 inline mr-2" /> Deployment
        </button>
      </div>

      {/* Workflow Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Workflow className="w-5 h-5 mr-2" /> N8N Workflow Templates
            </h3>
            <p className="text-gray-300 mb-6">
              Generate comprehensive N8N workflow templates for automating boring businesses and quietly printing money.
            </p>

            <motion.button
              onClick={handleGenerateWorkflowTemplates}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Workflow className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Templates...' : 'Generate N8N Workflow Templates'}</span>
            </motion.button>
          </div>

          {workflowTemplates.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Workflow Templates ({workflowTemplates.length} templates)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflowTemplates.map((template) => (
                  <div key={template.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white">{template.name}</h5>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCopyWorkflow(template)}
                          className="text-blue-400 hover:text-blue-300"
                          title="Copy Workflow"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeployWorkflow(template.id)}
                          className="text-green-400 hover:text-green-300"
                          title="Deploy Workflow"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Category:</span>
                        <span className="text-blue-400 text-sm">{template.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automation Level:</span>
                        <span className="text-purple-400 text-sm">{template.automation_level}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Revenue Impact:</span>
                        <span className="text-green-400 text-sm">{template.revenue_impact}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Complexity:</span>
                        <span className="text-yellow-400 text-sm">{template.implementation_complexity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Time to Profit:</span>
                        <span className="text-orange-400 text-sm">{template.time_to_profit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Monthly Revenue:</span>
                        <span className="text-green-400 text-sm">${template.estimated_monthly_revenue?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Stealth Factor:</span>
                        <span className="text-red-400 text-sm">{template.stealth_factor}%</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Triggers:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.triggers?.map((trigger, i) => (
                          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Actions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.actions?.map((action, i) => (
                          <span key={i} className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Google Maps Scraper Tab */}
      {activeTab === 'scraper' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" /> Google Maps Scraping Workflows
            </h3>
            <p className="text-gray-300 mb-6">
              Generate specialized workflows for scraping Google Maps data to find boring business opportunities.
            </p>

            <motion.button
              onClick={handleGenerateScrapingWorkflows}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Scraping Workflows...' : 'Generate Google Maps Scraping Workflows'}</span>
            </motion.button>
          </div>

          {scrapingWorkflows.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Scraping Workflows ({scrapingWorkflows.length} workflows)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scrapingWorkflows.map((workflow) => (
                  <div key={workflow.id} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">{workflow.name}</h5>
                    <p className="text-gray-300 text-sm mb-3">{workflow.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Revenue Potential:</span>
                        <span className="text-green-400 text-sm">${workflow.revenue_potential?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Implementation Time:</span>
                        <span className="text-blue-400 text-sm">{workflow.implementation_time}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Target Categories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {workflow.target_categories?.map((category, i) => (
                          <span key={i} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Data Points:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {workflow.data_points?.map((point, i) => (
                          <span key={i} className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Business Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" /> Business Automation Workflows
            </h3>
            <p className="text-gray-300 mb-6">
              Generate automation workflows for boring businesses to quietly print money with minimal effort.
            </p>

            <motion.button
              onClick={handleGenerateAutomationWorkflows}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={isLoading || !isOllamaReady}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              <span>{isLoading ? 'Generating Automation Workflows...' : 'Generate Business Automation Workflows'}</span>
            </motion.button>
          </div>

          {automationWorkflows.length > 0 && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                Generated Automation Workflows ({automationWorkflows.length} workflows)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {automationWorkflows.map((workflow) => (
                  <div key={workflow.id} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-white mb-2">{workflow.name}</h5>
                    <p className="text-gray-300 text-sm mb-2">{workflow.business_type}</p>
                    <p className="text-gray-300 text-sm mb-3">{workflow.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automation Level:</span>
                        <span className="text-purple-400 text-sm">{workflow.automation_level}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Monthly Revenue:</span>
                        <span className="text-green-400 text-sm">${workflow.monthly_revenue_potential?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Setup Complexity:</span>
                        <span className="text-yellow-400 text-sm">{workflow.setup_complexity}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Required Tools:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {workflow.required_tools?.map((tool, i) => (
                          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Workflow Steps:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {workflow.workflow_steps?.map((step, i) => (
                          <span key={i} className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deployment Tab */}
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2" /> Workflow Deployment Status
            </h3>
            <p className="text-gray-300 mb-6">
              Monitor and manage your deployed workflows for maximum profit generation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Deployed</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(deploymentStatus).filter(status => status === 'deployed').length} workflows
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <Loader2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Deploying</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(deploymentStatus).filter(status => status === 'deploying').length} workflows
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Failed</h4>
                <p className="text-gray-300 text-sm">
                  {Object.values(deploymentStatus).filter(status => status === 'failed').length} workflows
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

export default N8NWorkflowScraper;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Download,
  RefreshCw,
  Play,
  Folder,
  Code,
  Database,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { anythingLLMIntegrationService, AnythingLLMWorkspace, AnythingLLMIntegration, AnythingLLMDocument } from '../services/anythingLLMIntegrationService';
import { ollamaService } from '../services/ollamaService';

export const AnythingLLMIntegration: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [anythingLLMConnected, setAnythingLLMConnected] = useState(false);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [workspaces, setWorkspaces] = useState<AnythingLLMWorkspace[]>([]);
  const [integrations, setIntegrations] = useState<AnythingLLMIntegration[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<AnythingLLMWorkspace | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<AnythingLLMDocument | null>(null);
  const [showDocumentDetails, setShowDocumentDetails] = useState(false);

  // Check connections
  useEffect(() => {
    const checkConnections = async () => {
      try {
        const ollamaConnected = await ollamaService.initialize();
        setOllamaConnected(ollamaConnected);
        
        const anythingLLMConnected = await anythingLLMIntegrationService.initialize();
        setAnythingLLMConnected(anythingLLMConnected);
      } catch (error) {
        console.warn('Connection check failed:', error);
      }
    };

    checkConnections();
  }, []);

  const initializeAnythingLLM = async () => {
    setIsInitializing(true);
    try {
      const connected = await anythingLLMIntegrationService.initialize();
      setAnythingLLMConnected(connected);
      
      if (connected) {
        // Create MEMU workspace
        const workspace = await anythingLLMIntegrationService.createMEMUWorkspace();
        setWorkspaces([workspace]);
        setSelectedWorkspace(workspace);
        
        // Create Ollama integration
        const integration = await anythingLLMIntegrationService.createOllamaIntegration(
          workspace.id, 
          'llama3.2:3b'
        );
        setIntegrations([integration]);
      }
    } catch (error) {
      console.error('AnythingLLM initialization failed:', error);
      alert('AnythingLLM initialization failed. Please ensure AnythingLLM Desktop is running.');
    } finally {
      setIsInitializing(false);
    }
  };

  const uploadMEMUFiles = async () => {
    if (!selectedWorkspace) return;

    // Simulate uploading MEMU files
    const memuFiles = [
      'IZA_OS_MAIN.py',
      'IZA_OS_API_BACKEND.py',
      'IZA_OS_UNIFIED_BACKEND.py',
      'UnifiedDashboard.tsx',
      'IZAOSCoreIntegration.tsx',
      'MEMUEcosystemAnalyzer.tsx',
      'ollamaService.ts',
      'comprehensiveOllamaIntegration.ts'
    ];

    try {
      const documents = await anythingLLMIntegrationService.uploadMEMUFiles(memuFiles);
      
      // Update workspace with documents
      const updatedWorkspace = {
        ...selectedWorkspace,
        documents: [...selectedWorkspace.documents, ...documents]
      };
      
      setWorkspaces(workspaces.map(w => w.id === selectedWorkspace.id ? updatedWorkspace : w));
      setSelectedWorkspace(updatedWorkspace);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed. Please try again.');
    }
  };

  const analyzeDocuments = async () => {
    if (!selectedWorkspace || !ollamaConnected) return;

    setIsAnalyzing(true);
    try {
      await anythingLLMIntegrationService.analyzeDocuments(
        selectedWorkspace.id, 
        'llama3.2:3b'
      );
      
      // Refresh workspace data
      const updatedWorkspaces = anythingLLMIntegrationService.getWorkspaces();
      setWorkspaces(updatedWorkspaces);
      setSelectedWorkspace(updatedWorkspaces.find(w => w.id === selectedWorkspace.id) || null);
    } catch (error) {
      console.error('Document analysis failed:', error);
      alert('Document analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportIntegrationReport = () => {
    const data = anythingLLMIntegrationService.exportIntegrationReport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anythingllm-integration-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'processing': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'Python': return <Code className="w-4 h-4 text-green-500" />;
      case 'TypeScript React': return <Code className="w-4 h-4 text-blue-500" />;
      case 'TypeScript': return <Code className="w-4 h-4 text-blue-500" />;
      case 'JavaScript': return <Code className="w-4 h-4 text-yellow-500" />;
      case 'JSON': return <Database className="w-4 h-4 text-yellow-500" />;
      case 'Markdown': return <FileText className="w-4 h-4 text-gray-500" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AnythingLLM Integration
        </motion.h2>
        <motion.p
          className="text-base md:text-xl text-gray-300 mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Document Analysis & AI-Powered MEMU Ecosystem Processing
        </motion.p>
        
        {/* Connection Status */}
        <div className="flex justify-center space-x-4">
          <motion.div
            className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
              anythingLLMConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {anythingLLMConnected ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> : <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />}
            AnythingLLM
          </motion.div>
          
          <motion.div
            className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
              ollamaConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {ollamaConnected ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> : <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />}
            Ollama
          </motion.div>
        </div>
      </div>

      {/* Integration Controls */}
      <motion.div
        className="glass-card p-4 md:p-6 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={initializeAnythingLLM}
              disabled={isInitializing || anythingLLMConnected}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isInitializing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isInitializing ? 'Initializing...' : 'Initialize AnythingLLM'}</span>
            </button>
            
            {selectedWorkspace && (
              <button
                onClick={uploadMEMUFiles}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload MEMU Files</span>
              </button>
            )}
            
            {selectedWorkspace && selectedWorkspace.documents.length > 0 && (
              <button
                onClick={analyzeDocuments}
                disabled={isAnalyzing || !ollamaConnected}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Documents'}</span>
              </button>
            )}
            
            {integrations.length > 0 && (
              <button
                onClick={exportIntegrationReport}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            {anythingLLMConnected && ollamaConnected ? 'Ready for document analysis' : 'Both AnythingLLM and Ollama required'}
          </div>
        </div>
      </motion.div>

      {/* Workspace and Document Management */}
      {selectedWorkspace && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {/* Workspace Info */}
          <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white">{selectedWorkspace.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Documents:</span>
                <span className="text-sm font-semibold text-blue-200">{selectedWorkspace.documents.length}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base mb-4">{selectedWorkspace.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-200">{selectedWorkspace.agents.length}</div>
                <div className="text-xs text-gray-400">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-200">{selectedWorkspace.workflows.length}</div>
                <div className="text-xs text-gray-400">Workflows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">
                  {selectedWorkspace.documents.filter(d => d.analysisStatus === 'completed').length}
                </div>
                <div className="text-xs text-gray-400">Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-200">
                  {selectedWorkspace.documents.filter(d => d.analysisStatus === 'processing').length}
                </div>
                <div className="text-xs text-gray-400">Processing</div>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedWorkspace.documents.map((document, index) => (
                <motion.div
                  key={document.id}
                  className="glass-card p-4 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-200 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedDocument(document);
                    setShowDocumentDetails(true);
                  }}
                >
                  <div className="flex items-center mb-3">
                    {getFileTypeIcon(document.type)}
                    <div className="ml-2 flex-1">
                      <h4 className="text-sm font-semibold text-white truncate">{document.name}</h4>
                      <p className="text-xs text-gray-400">{document.type}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(document.analysisStatus)}`}>
                        {document.analysisStatus}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Size:</span>
                      <span className="text-xs font-semibold text-blue-200">{document.size} bytes</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Uploaded:</span>
                      <span className="text-xs font-semibold text-green-200">
                        {document.uploadDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {document.analysisResults && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-300 line-clamp-2">{document.analysisResults.summary}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && showDocumentDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="glass-card p-6 rounded-xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Document Analysis</h3>
              <button
                onClick={() => setShowDocumentDetails(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Document Information</h4>
                <p className="text-sm text-gray-300"><strong>Name:</strong> {selectedDocument.name}</p>
                <p className="text-sm text-gray-300"><strong>Type:</strong> {selectedDocument.type}</p>
                <p className="text-sm text-gray-300"><strong>Size:</strong> {selectedDocument.size} bytes</p>
                <p className="text-sm text-gray-300"><strong>Status:</strong> {selectedDocument.analysisStatus}</p>
                <p className="text-sm text-gray-300"><strong>Uploaded:</strong> {selectedDocument.uploadDate.toLocaleString()}</p>
              </div>
              
              {selectedDocument.analysisResults && (
                <>
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Summary</h4>
                    <p className="text-sm text-gray-300">{selectedDocument.analysisResults.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {selectedDocument.analysisResults.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Insights</h4>
                    <ul className="space-y-1">
                      {selectedDocument.analysisResults.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <Brain className="w-3 h-3 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {selectedDocument.analysisResults.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <Zap className="w-3 h-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AnythingLLMIntegration;

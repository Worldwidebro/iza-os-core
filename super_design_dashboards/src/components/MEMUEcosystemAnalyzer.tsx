import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Folder, 
  Code, 
  Database, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  Search,
  Download,
  RefreshCw
} from 'lucide-react';
import { memuEcosystemAnalyzer, EcosystemAnalysis, FileAnalysis } from '../services/memuEcosystemAnalyzer';
import { ollamaService } from '../services/ollamaService';

export const MEMUEcosystemAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<EcosystemAnalysis | null>(null);
  const [fileAnalyses, setFileAnalyses] = useState<FileAnalysis[]>([]);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileAnalysis | null>(null);

  // Check Ollama connection
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const connected = await ollamaService.initialize();
        setOllamaConnected(connected);
      } catch (error) {
        console.warn('Ollama not available:', error);
        setOllamaConnected(false);
      }
    };

    checkOllama();
  }, []);

  const startAnalysis = async () => {
    if (!ollamaConnected) {
      alert('Ollama is not connected. Please ensure Ollama is running and has models available.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const ecosystemAnalysis = await memuEcosystemAnalyzer.analyzeEcosystem();
      const analyses = memuEcosystemAnalyzer.getAnalysisResults();
      
      setAnalysis(ecosystemAnalysis);
      setFileAnalyses(analyses);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportAnalysis = () => {
    const data = memuEcosystemAnalyzer.exportAnalysis();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memu-ecosystem-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case '.tsx':
      case '.ts':
        return <Code className="w-4 h-4 text-blue-500" />;
      case '.py':
        return <Code className="w-4 h-4 text-green-500" />;
      case '.json':
        return <Database className="w-4 h-4 text-yellow-500" />;
      case '.md':
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
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
          MEMU Ecosystem Analyzer
        </motion.h2>
        <motion.p
          className="text-base md:text-xl text-gray-300 mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI-Powered Analysis for IZA OS Alignment
        </motion.p>
        
        {/* Ollama Status */}
        <motion.div
          className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
            ollamaConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {ollamaConnected ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> : <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />}
          {ollamaConnected ? 'Ollama Connected' : 'Ollama Not Available'}
        </motion.div>
      </div>

      {/* Analysis Controls */}
      <motion.div
        className="glass-card p-4 md:p-6 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing || !ollamaConnected}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Start Analysis'}</span>
            </button>
            
            {analysis && (
              <button
                onClick={exportAnalysis}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Results</span>
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            {ollamaConnected ? 'Ready to analyze your MEMU ecosystem' : 'Ollama required for analysis'}
          </div>
        </div>
      </motion.div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-xl border border-blue-400/20 bg-blue-500/10">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Total Files</h3>
              </div>
              <p className="text-2xl font-bold text-blue-200">{analysis.totalFiles}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-purple-400/20 bg-purple-500/10">
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Total Size</h3>
              </div>
              <p className="text-2xl font-bold text-purple-200">{formatFileSize(analysis.totalSize)}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-green-400/20 bg-green-500/10">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Integration Score</h3>
              </div>
              <p className="text-2xl font-bold text-green-200">{analysis.integrationScore}/100</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-yellow-400/20 bg-yellow-500/10">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">File Types</h3>
              </div>
              <p className="text-2xl font-bold text-yellow-200">{Object.keys(analysis.fileTypes).length}</p>
            </div>
          </div>

          {/* File Analysis Grid */}
          <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">File Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fileAnalyses.map((file, index) => (
                <motion.div
                  key={file.filePath}
                  className="glass-card p-4 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-200 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-center mb-3">
                    {getFileTypeIcon(file.fileType)}
                    <div className="ml-2 flex-1">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {file.filePath.split('/').pop()}
                      </h4>
                      <p className="text-xs text-gray-400">{file.fileType}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Size:</span>
                      <span className="text-xs font-semibold text-blue-200">{formatFileSize(file.size)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Integration Points:</span>
                      <span className="text-xs font-semibold text-green-200">{file.analysis.integrationPoints.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Issues:</span>
                      <span className="text-xs font-semibold text-red-200">{file.analysis.alignmentIssues.length}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-gray-300 line-clamp-2">{file.analysis.purpose}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-4 md:p-6 rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Strategic Recommendations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2">Alignment Issues</h4>
                <ul className="space-y-1">
                  {analysis.alignmentIssues.slice(0, 5).map((issue, index) => (
                    <li key={index} className="text-xs text-gray-300 flex items-start">
                      <AlertCircle className="w-3 h-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2">Optimization Opportunities</h4>
                <ul className="space-y-1">
                  {analysis.optimizationOpportunities.slice(0, 5).map((opportunity, index) => (
                    <li key={index} className="text-xs text-gray-300 flex items-start">
                      <Zap className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="glass-card p-6 rounded-xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">File Analysis Details</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">File Information</h4>
                <p className="text-sm text-gray-300"><strong>Path:</strong> {selectedFile.filePath}</p>
                <p className="text-sm text-gray-300"><strong>Type:</strong> {selectedFile.fileType}</p>
                <p className="text-sm text-gray-300"><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
                <p className="text-sm text-gray-300"><strong>Modified:</strong> {selectedFile.lastModified.toLocaleDateString()}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2">Purpose</h4>
                <p className="text-sm text-gray-300">{selectedFile.analysis.purpose}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Integration Points</h4>
                <ul className="space-y-1">
                  {selectedFile.analysis.integrationPoints.map((point, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2">Alignment Issues</h4>
                <ul className="space-y-1">
                  {selectedFile.analysis.alignmentIssues.map((issue, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <AlertCircle className="w-3 h-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-yellow-400 mb-2">Optimization Suggestions</h4>
                <ul className="space-y-1">
                  {selectedFile.analysis.optimizationSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <Zap className="w-3 h-3 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MEMUEcosystemAnalyzer;

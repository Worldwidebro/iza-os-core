import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Shield, 
  RefreshCw, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  RotateCcw,
  Lock,
  Unlock,
  User,
  Server,
  Database,
  Globe,
  Zap
} from 'lucide-react';

interface JWTToken {
  id: string;
  name: string;
  issuer: string;
  audience: string;
  algorithm: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';
  secret: string;
  maskedSecret: string;
  expiresAt: string;
  issuedAt: string;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  permissions: string[];
  refreshToken?: string;
  autoRefresh: boolean;
  lastUsed?: string;
  usage: number;
}

interface OAuth2Config {
  id: string;
  name: string;
  provider: string;
  clientId: string;
  clientSecret: string;
  maskedClientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  scope: string[];
  redirectUri: string;
  grantType: 'authorization_code' | 'client_credentials' | 'password' | 'refresh_token';
  status: 'active' | 'inactive' | 'expired';
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
  lastRefresh?: string;
}

interface AuthMethod {
  id: string;
  name: string;
  type: 'jwt' | 'oauth2' | 'bearer' | 'basic' | 'api_key' | 'custom';
  endpoint: string;
  headers: Record<string, string>;
  body?: Record<string, any>;
  status: 'active' | 'inactive' | 'testing';
  lastTested?: string;
  successRate?: number;
}

export const TokenManagementSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jwt' | 'oauth2' | 'methods' | 'security'>('jwt');
  const [jwtTokens, setJwtTokens] = useState<JWTToken[]>([]);
  const [oauthConfigs, setOauthConfigs] = useState<OAuth2Config[]>([]);
  const [authMethods, setAuthMethods] = useState<AuthMethod[]>([]);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);

  useEffect(() => {
    // Initialize with sample JWT tokens
    setJwtTokens([
      {
        id: '1',
        name: 'Claude API JWT',
        issuer: 'anthropic.com',
        audience: 'claude-api',
        algorithm: 'HS256',
        secret: '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',
        maskedSecret: 'sk-ant-api03-***xgAA',
        expiresAt: '2025-02-20T20:56:45Z',
        issuedAt: '2025-01-20T20:56:45Z',
        status: 'active',
        permissions: ['chat', 'completion', 'analysis'],
        autoRefresh: true,
        lastUsed: '2025-01-20T20:56:45Z',
        usage: 1250
      },
      {
        id: '2',
        name: 'Grok API Token',
        issuer: 'x.ai',
        audience: 'grok-api',
        algorithm: 'HS256',
        secret: 'xai-YoIXj21ZNWQhWngmwaK3y2ONLSuibUvvA9KWamWbmyJLsyrarjzXX425pdxVJrpUZ4Ulz6NT1Vk0shdW',
        maskedSecret: 'xai-***shdW',
        expiresAt: '2025-03-20T20:45:30Z',
        issuedAt: '2025-01-20T20:45:30Z',
        status: 'active',
        permissions: ['chat', 'completion', 'reasoning'],
        autoRefresh: true,
        lastUsed: '2025-01-20T20:45:30Z',
        usage: 890
      }
    ]);

    // Initialize OAuth2 configurations
    setOauthConfigs([
      {
        id: '1',
        name: 'Google OAuth2',
        provider: 'Google',
        clientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
        clientSecret: 'GOCSPX-abcdefghijklmnopqrstuvwxyz',
        maskedClientSecret: 'GOCSPX-***xyz',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        scope: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/cloud-platform'],
        redirectUri: 'http://localhost:3001/oauth/callback',
        grantType: 'authorization_code',
        status: 'active',
        accessToken: 'ya29.a0AfH6SMC...',
        refreshToken: '1//04...',
        expiresIn: 3600,
        tokenType: 'Bearer',
        lastRefresh: '2025-01-20T20:30:00Z'
      },
      {
        id: '2',
        name: 'Microsoft OAuth2',
        provider: 'Microsoft',
        clientId: '12345678-1234-1234-1234-123456789012',
        clientSecret: 'abcdefghijklmnopqrstuvwxyz123456',
        maskedClientSecret: '***123456',
        authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        scope: ['https://graph.microsoft.com/.default'],
        redirectUri: 'http://localhost:3001/oauth/callback',
        grantType: 'authorization_code',
        status: 'active',
        expiresIn: 3600,
        tokenType: 'Bearer'
      }
    ]);

    // Initialize authentication methods
    setAuthMethods([
      {
        id: '1',
        name: 'Claude Bearer Token',
        type: 'bearer',
        endpoint: 'https://api.anthropic.com/v1/messages',
        headers: {
          'Authorization': 'Bearer sk-ant-api03-***',
          'Content-Type': 'application/json',
          'x-api-key': 'sk-ant-api03-***'
        },
        status: 'active',
        lastTested: '2025-01-20T20:56:45Z',
        successRate: 99.2
      },
      {
        id: '2',
        name: 'Grok API Key',
        type: 'api_key',
        endpoint: 'https://api.x.ai/v1/chat/completions',
        headers: {
          'Authorization': 'Bearer xai-***',
          'Content-Type': 'application/json'
        },
        status: 'active',
        lastTested: '2025-01-20T20:45:30Z',
        successRate: 98.8
      },
      {
        id: '3',
        name: 'Basic Auth Example',
        type: 'basic',
        endpoint: 'https://api.example.com/v1/data',
        headers: {
          'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
          'Content-Type': 'application/json'
        },
        status: 'testing',
        lastTested: '2025-01-20T19:30:15Z',
        successRate: 95.5
      }
    ]);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'revoked':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAuthTypeIcon = (type: string) => {
    switch (type) {
      case 'jwt':
        return <Key className="w-4 h-4 text-blue-400" />;
      case 'oauth2':
        return <Globe className="w-4 h-4 text-green-400" />;
      case 'bearer':
        return <Shield className="w-4 h-4 text-purple-400" />;
      case 'basic':
        return <User className="w-4 h-4 text-orange-400" />;
      case 'api_key':
        return <Database className="w-4 h-4 text-cyan-400" />;
      default:
        return <Server className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleSecretVisibility = (id: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const refreshToken = async (tokenId: string) => {
    setIsGeneratingToken(true);
    // Simulate token refresh
    setTimeout(() => {
      setJwtTokens(prev => prev.map(token => 
        token.id === tokenId 
          ? { 
              ...token, 
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              lastUsed: new Date().toISOString(),
              usage: token.usage + 1
            }
          : token
      ));
      setIsGeneratingToken(false);
    }, 2000);
  };

  const generateNewToken = async (config: any) => {
    setIsGeneratingToken(true);
    // Simulate token generation
    setTimeout(() => {
      const newToken: JWTToken = {
        id: Date.now().toString(),
        name: config.name,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: config.algorithm,
        secret: `generated-token-${Date.now()}`,
        maskedSecret: `generated-token-***${Date.now().toString().slice(-4)}`,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        issuedAt: new Date().toISOString(),
        status: 'active',
        permissions: config.permissions || [],
        autoRefresh: config.autoRefresh || false,
        usage: 0
      };
      setJwtTokens(prev => [...prev, newToken]);
      setIsGeneratingToken(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Token & Authentication Management
            </h2>
            <p className="text-gray-400">Comprehensive JWT, OAuth2, and authentication token management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Active Tokens</div>
              <div className="text-2xl font-bold text-green-400">
                {jwtTokens.filter(t => t.status === 'active').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">OAuth2 Configs</div>
              <div className="text-2xl font-bold text-blue-400">
                {oauthConfigs.filter(c => c.status === 'active').length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Auth Methods</div>
              <div className="text-2xl font-bold text-purple-400">
                {authMethods.filter(m => m.status === 'active').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {[
            { id: 'jwt', label: 'JWT Tokens', icon: Key },
            { id: 'oauth2', label: 'OAuth2', icon: Globe },
            { id: 'methods', label: 'Auth Methods', icon: Shield },
            { id: 'security', label: 'Security', icon: Lock }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* JWT Tokens Tab */}
      {activeTab === 'jwt' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">JWT Token Management</h3>
            <button
              onClick={() => generateNewToken({ name: 'New JWT Token', issuer: 'localhost', audience: 'api', algorithm: 'HS256' })}
              disabled={isGeneratingToken}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            >
              {isGeneratingToken ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              Generate JWT
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {jwtTokens.map((token) => (
              <motion.div
                key={token.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(token.status)}
                    <span className="font-semibold text-white">{token.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleSecretVisibility(token.id)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      {showSecrets[token.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(token.secret)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => refreshToken(token.id)}
                      className="p-1 text-gray-400 hover:text-green-400"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issuer:</span>
                    <span className="text-white">{token.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audience:</span>
                    <span className="text-white">{token.audience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Algorithm:</span>
                    <span className="text-white font-mono">{token.algorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="text-white font-mono text-xs">
                      {showSecrets[token.id] ? token.secret : token.maskedSecret}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires:</span>
                    <span className="text-white">{new Date(token.expiresAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Usage:</span>
                    <span className="text-white">{token.usage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto Refresh:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      token.autoRefresh ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {token.autoRefresh ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {token.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-gray-700 text-xs rounded">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* OAuth2 Tab */}
      {activeTab === 'oauth2' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">OAuth2 Configurations</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Globe className="w-4 h-4" />
              Add OAuth2 Config
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {oauthConfigs.map((config) => (
              <motion.div
                key={config.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(config.status)}
                    <span className="font-semibold text-white">{config.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleSecretVisibility(config.id)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      {showSecrets[config.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-400">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-white">{config.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client ID:</span>
                    <span className="text-white font-mono text-xs">{config.clientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client Secret:</span>
                    <span className="text-white font-mono text-xs">
                      {showSecrets[config.id] ? config.clientSecret : config.maskedClientSecret}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Grant Type:</span>
                    <span className="text-white">{config.grantType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Redirect URI:</span>
                    <span className="text-white text-xs">{config.redirectUri}</span>
                  </div>
                  {config.accessToken && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Access Token:</span>
                      <span className="text-white font-mono text-xs">{config.accessToken}</span>
                    </div>
                  )}
                  {config.expiresIn && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expires In:</span>
                      <span className="text-white">{config.expiresIn}s</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Scopes:</div>
                  <div className="flex flex-wrap gap-1">
                    {config.scope.map((scope) => (
                      <span key={scope} className="px-2 py-1 bg-gray-700 text-xs rounded">
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Auth Methods Tab */}
      {activeTab === 'methods' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Authentication Methods</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <Shield className="w-4 h-4" />
              Add Auth Method
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {authMethods.map((method) => (
              <motion.div
                key={method.id}
                className="glass-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAuthTypeIcon(method.type)}
                    <span className="font-semibold text-white">{method.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-green-400">
                      <Zap className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{method.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Endpoint:</span>
                    <span className="text-white text-xs">{method.endpoint}</span>
                  </div>
                  {method.successRate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="text-white">{method.successRate}%</span>
                    </div>
                  )}
                  {method.lastTested && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Tested:</span>
                      <span className="text-white">{new Date(method.lastTested).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Headers:</div>
                  <div className="space-y-1">
                    {Object.entries(method.headers).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-white font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Security & Compliance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Token Security</span>
              </div>
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-xs text-gray-400">All tokens encrypted</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Access Control</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <div className="text-xs text-gray-400">RBAC implemented</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Token Rotation</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">85%</div>
              <div className="text-xs text-gray-400">Auto-rotation enabled</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">Compliance</span>
              </div>
              <div className="text-2xl font-bold text-red-400">92%</div>
              <div className="text-xs text-gray-400">SOC2 Type II</div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Security Recommendations</h4>
            <div className="space-y-3">
              {[
                { 
                  priority: 'high', 
                  title: 'Implement JWT token rotation', 
                  description: 'Rotate JWT tokens every 24 hours for enhanced security',
                  action: 'Enable auto-rotation'
                },
                { 
                  priority: 'medium', 
                  title: 'Add OAuth2 PKCE flow', 
                  description: 'Implement PKCE for public clients to prevent code interception',
                  action: 'Configure PKCE'
                },
                { 
                  priority: 'low', 
                  title: 'Audit token usage patterns', 
                  description: 'Review and optimize token usage to reduce attack surface',
                  action: 'Schedule audit'
                }
              ].map((rec, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-400' :
                    rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{rec.title}</div>
                    <div className="text-gray-400 text-xs">{rec.description}</div>
                  </div>
                  <button className="px-3 py-1 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600 transition-colors">
                    {rec.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

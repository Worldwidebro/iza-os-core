'use client';

import React, { useState, useEffect } from 'react';
import { 
  CpuChipIcon, 
  ServerIcon, 
  ChartBarIcon, 
  CogIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline';

interface AgentStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  lastActivity: string;
}

interface MCPServerStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  port: number;
}

export function IZAOSDashboard() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: 'Product Manager', status: 'running', lastActivity: '2 min ago' },
    { name: 'Tech Lead', status: 'running', lastActivity: '1 min ago' },
    { name: 'Finance Agent', status: 'stopped', lastActivity: '5 min ago' },
    { name: 'Marketing Agent', status: 'running', lastActivity: '30 sec ago' },
    { name: 'Operations Agent', status: 'running', lastActivity: '1 min ago' },
  ]);

  const [mcpServers, setMcpServers] = useState<MCPServerStatus[]>([
    { name: 'Filesystem', status: 'connected', port: 8001 },
    { name: 'Git', status: 'connected', port: 8002 },
    { name: 'Database', status: 'connected', port: 8003 },
    { name: 'API', status: 'connected', port: 8004 },
  ]);

  const [systemStatus, setSystemStatus] = useState<'running' | 'stopped'>('running');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'stopped':
      case 'disconnected':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'connected':
        return <PlayIcon className="w-4 h-4" />;
      case 'stopped':
      case 'disconnected':
        return <PauseIcon className="w-4 h-4" />;
      case 'error':
        return <StopIcon className="w-4 h-4" />;
      default:
        return <CogIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            IZA OS Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            The Operating System for an Autonomous Venture Studio
          </p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CpuChipIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
                <p className="text-gray-600">Overall system health and status</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${getStatusColor(systemStatus)}`}>
              <span className="flex items-center space-x-2">
                {getStatusIcon(systemStatus)}
                <span className="font-medium capitalize">{systemStatus}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Agents Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <ServerIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Agents</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{agent.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(agent.status)}
                      <span className="capitalize">{agent.status}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Last activity: {agent.lastActivity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MCP Servers */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <CogIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">MCP Servers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mcpServers.map((server, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{server.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(server.status)}`}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(server.status)}
                      <span className="capitalize">{server.status}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Port: {server.port}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ChartBarIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">System Analytics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">5</div>
              <div className="text-gray-600">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-gray-600">Connected Servers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">120+</div>
              <div className="text-gray-600">Managed Repositories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

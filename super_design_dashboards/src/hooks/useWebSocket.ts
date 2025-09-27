import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

// WebSocket message types
interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

interface WebSocketConfig {
  url: string;
  path?: string;
  transports?: string[];
  autoConnect?: boolean;
  reconnect?: boolean;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
}

export const useWebSocket = (config: WebSocketConfig): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = useRef(config.maxReconnectAttempts || 5);
  const shouldReconnect = useRef(config.reconnect !== false);
  const subscribedTopics = useRef<Set<string>>(new Set());

  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const newSocket = io(config.url, {
        path: config.path || '/api/websocket',
        transports: config.transports || ['websocket'],
        autoConnect: config.autoConnect !== false,
        reconnection: shouldReconnect.current,
        reconnectionAttempts: maxReconnectAttempts.current,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        reconnectAttempts.current = 0;
        
        // Resubscribe to topics
        subscribedTopics.current.forEach(topic => {
          newSocket.emit('subscribe', { topic });
        });
      });

      newSocket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
        setIsConnected(false);
        setIsConnecting(false);
        
        if (reason === 'io server disconnect') {
          // Server disconnected, don't reconnect automatically
          shouldReconnect.current = false;
        }
      });

      newSocket.on('connect_error', (err) => {
        console.error('WebSocket connection error:', err);
        setError(err.message);
        setIsConnecting(false);
        setIsConnected(false);
        
        if (reconnectAttempts.current >= maxReconnectAttempts.current) {
          toast.error('Failed to connect to server after multiple attempts');
          shouldReconnect.current = false;
        }
        reconnectAttempts.current++;
      });

      newSocket.on('reconnect', (attemptNumber) => {
        console.log('WebSocket reconnected after', attemptNumber, 'attempts');
        toast.success('Reconnected to server');
        reconnectAttempts.current = 0;
      });

      newSocket.on('reconnect_error', (err) => {
        console.error('WebSocket reconnection error:', err);
        toast.error('Failed to reconnect to server');
      });

      newSocket.on('reconnect_failed', () => {
        console.error('WebSocket reconnection failed');
        toast.error('Unable to reconnect to server');
        shouldReconnect.current = false;
      });

      // Message handlers
      newSocket.onAny((eventName, ...args) => {
        const message: WebSocketMessage = {
          type: eventName,
          data: args[0] || {},
          timestamp: new Date().toISOString()
        };
        setLastMessage(message);
      });

      // Specific message handlers
      newSocket.on('agent_created', (data) => {
        console.log('Agent created:', data);
        toast.success('New agent created');
      });

      newSocket.on('agent_updated', (data) => {
        console.log('Agent updated:', data);
        toast.success('Agent updated');
      });

      newSocket.on('agent_deleted', (data) => {
        console.log('Agent deleted:', data);
        toast.success('Agent deleted');
      });

      newSocket.on('agent_status_update', (data) => {
        console.log('Agent status update received:', data);
        toast.success('Agent status updated');
      });

      newSocket.on('system_metrics_update', (data) => {
        console.log('System metrics update received:', data);
      });

      newSocket.on('error', (data) => {
        console.error('WebSocket error:', data);
        toast.error(`WebSocket error: ${data.message || 'Unknown error'}`);
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsConnecting(false);
    }
  }, [config]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      shouldReconnect.current = false;
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
      setIsConnecting(false);
      subscribedTopics.current.clear();
    }
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    shouldReconnect.current = true;
    reconnectAttempts.current = 0;
    setTimeout(connect, 1000);
  }, [connect, disconnect]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(message.type, message.data);
    } else {
      console.warn('WebSocket not connected, cannot send message:', message);
      toast.error('Not connected to server');
    }
  }, []);

  const subscribe = useCallback((topic: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('subscribe', { topic });
      subscribedTopics.current.add(topic);
    } else {
      // Store subscription to apply when connected
      subscribedTopics.current.add(topic);
    }
  }, []);

  const unsubscribe = useCallback((topic: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('unsubscribe', { topic });
    }
    subscribedTopics.current.delete(topic);
  }, []);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (config.autoConnect !== false) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect, config.autoConnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    socket,
    isConnected,
    isConnecting,
    error,
    lastMessage,
    sendMessage,
    subscribe,
    unsubscribe,
    connect,
    disconnect,
    reconnect
  };
};

// Default WebSocket configuration
export const useDefaultWebSocket = () => {
  const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
  
  return useWebSocket({
    url: WS_URL,
    path: '/api/websocket',
    transports: ['websocket'],
    autoConnect: true,
    reconnect: true,
    maxReconnectAttempts: 5
  });
};

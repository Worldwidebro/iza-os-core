import React from 'react';
import { Helmet } from 'react-helmet-async';

// Security configuration
const SECURITY_CONFIG = {
  csp: {
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-inline'",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'font-src': "'self' https://fonts.gstatic.com",
    'img-src': "'self' data: https:",
    'connect-src': "'self' http://localhost:* https:",
    'frame-ancestors': "'none'",
    'base-uri': "'self'",
    'form-action': "'self'"
  },
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .slice(0, 1000) // Limit length
    .trim();
};

// URL validation utility
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    // Only allow http, https, and relative URLs
    return ['http:', 'https:', ''].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// XSS protection for HTML content
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Security headers component
export const SecurityHeaders: React.FC = () => {
  const cspString = Object.entries(SECURITY_CONFIG.csp)
    .map(([key, value]) => `${key} ${value}`)
    .join('; ');

  return (
    <Helmet>
      <meta httpEquiv="Content-Security-Policy" content={cspString} />
      {Object.entries(SECURITY_CONFIG.headers).map(([key, value]) => (
        <meta key={key} httpEquiv={key} content={value} />
      ))}
    </Helmet>
  );
};

// Secure link component
interface SecureLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const SecureLink: React.FC<SecureLinkProps> = ({ 
  href, 
  children, 
  className = '',
  target = '_self',
  rel = ''
}) => {
  const isValid = isValidUrl(href);
  
  if (!isValid) {
    console.warn(`Invalid URL detected: ${href}`);
    return <span className={className}>{children}</span>;
  }

  const secureRel = target === '_blank' 
    ? `${rel} noopener noreferrer nofollow`.trim()
    : rel;

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={secureRel}
      onClick={(e) => {
        // Additional security check on click
        if (!isValidUrl(href)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
};

// Secure input component
interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  sanitize?: boolean;
}

export const SecureInput: React.FC<SecureInputProps> = ({ 
  maxLength = 1000,
  sanitize = true,
  onChange,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sanitize) {
      e.target.value = sanitizeInput(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <input
      {...props}
      maxLength={maxLength}
      onChange={handleChange}
    />
  );
};

// Rate limiting hook
export const useRateLimit = (maxRequests: number = 100, windowMs: number = 60000) => {
  const [requests, setRequests] = React.useState<number[]>([]);

  const isAllowed = React.useCallback(() => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Remove old requests
    const validRequests = requests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    setRequests([...validRequests, now]);
    return true;
  }, [requests, maxRequests, windowMs]);

  return { isAllowed };
};

// Security context
interface SecurityContextType {
  csrfToken: string;
  isSecure: boolean;
  validateInput: (input: string) => boolean;
}

const SecurityContext = React.createContext<SecurityContextType | null>(null);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csrfToken] = React.useState(() => generateCSRFToken());
  const [isSecure] = React.useState(() => {
    // Check if running in secure context
    return window.isSecureContext;
  });

  const validateInput = React.useCallback((input: string): boolean => {
    return sanitizeInput(input).length > 0;
  }, []);

  const value: SecurityContextType = {
    csrfToken,
    isSecure,
    validateInput
  };

  return (
    <SecurityContext.Provider value={value}>
      <SecurityHeaders />
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = React.useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

// Error boundary for security
interface SecurityErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class SecurityErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  SecurityErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SecurityErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log security-related errors
    console.error('Security Error Boundary caught an error:', error, errorInfo);
    
    // Report to security monitoring service
    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon('/api/security/error', JSON.stringify({
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }));
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Security Error Detected
            </h2>
            <p className="text-red-600 mb-4">
              A security-related error has been detected and reported.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

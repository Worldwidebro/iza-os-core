/**
 * IZA OS Enterprise Dashboard Script
 * Enhanced with security, performance, and comprehensive error handling
 * Version: 2.0.0
 * Author: IZA OS Development Team
 */

// Security and Performance Configuration
const DASHBOARD_CONFIG = {
  security: {
    csrfToken: null,
    rateLimitWindow: 60000, // 1 minute
    maxRequestsPerWindow: 100,
    sanitizeHtml: true,
    validateInputs: true
  },
  performance: {
    debounceDelay: 300,
    lazyLoadThreshold: 100,
    cacheTimeout: 300000, // 5 minutes
    maxConcurrentRequests: 5,
    requestTimeout: 10000
  },
  logging: {
    level: 'info',
    enableConsole: true,
    enableRemote: false,
    correlationId: null
  }
};

// Input Validation and Sanitization Utilities
class SecurityUtils {
  static sanitizeHtml(input) {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  static validateUrl(url) {
    try {
      const urlObj = new URL(url);
      // Only allow http, https, and relative URLs
      return ['http:', 'https:', ''].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  static sanitizeInput(input, maxLength = 1000) {
    if (typeof input !== 'string') return '';
    return input.slice(0, maxLength).replace(/[<>\"']/g, '');
  }

  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

// Performance Monitoring and Caching
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requestCount: 0,
      errorCount: 0,
      avgResponseTime: 0,
      memoryUsage: 0
    };
    this.cache = new Map();
    this.requestQueue = [];
    this.activeRequests = 0;
  }

  startTimer(name) {
    performance.mark(`${name}-start`);
  }

  endTimer(name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    this.updateMetrics('avgResponseTime', measure.duration);
    return measure.duration;
  }

  updateMetrics(key, value) {
    if (this.metrics.hasOwnProperty(key)) {
      this.metrics[key] = value;
    }
  }

  getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < DASHBOARD_CONFIG.performance.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  async throttleRequest(fn) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.activeRequests >= DASHBOARD_CONFIG.performance.maxConcurrentRequests || this.requestQueue.length === 0) {
      return;
    }

    this.activeRequests++;
    const { fn, resolve, reject } = this.requestQueue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.activeRequests--;
      this.processQueue();
    }
  }
}

// Enhanced Logging System
class Logger {
  constructor(config) {
    this.config = config;
    this.correlationId = config.correlationId || this.generateCorrelationId();
  }

  generateCorrelationId() {
    return Math.random().toString(36).substr(2, 9);
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      correlationId: this.correlationId,
      data: data ? JSON.stringify(data) : null
    };

    if (this.config.enableConsole) {
      console[level === 'error' ? 'error' : 'log'](`[${timestamp}] ${level.toUpperCase()}: ${message}`, data);
    }

    if (this.config.enableRemote) {
      this.sendRemoteLog(logEntry);
    }
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
    this.metrics.errorCount++;
  }

  async sendRemoteLog(logEntry) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': DASHBOARD_CONFIG.security.csrfToken
        },
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      console.error('Failed to send remote log:', error);
    }
  }
}

class IZADashboard {
  constructor() {
    this.dashboardData = null;
    this.timestampElement = null;
    this.refreshInterval = null;
    this.statusCheckInterval = null;
    this.performanceMonitor = new PerformanceMonitor();
    this.logger = new Logger(DASHBOARD_CONFIG.logging);
    this.rateLimiter = new Map();
    this.debounceTimers = new Map();
    
    // Initialize security token
    DASHBOARD_CONFIG.security.csrfToken = SecurityUtils.generateCSRFToken();
    
    this.init();
  }

  async init() {
    try {
      this.performanceMonitor.startTimer('dashboard-init');
      this.logger.info('Initializing IZA OS Dashboard');
      
      // Check rate limiting before initialization
      if (!this.checkRateLimit('init')) {
        throw new Error('Rate limit exceeded for initialization');
      }

      await this.loadDashboardData();
      this.renderDashboard();
      this.setupEventListeners();
      this.startAutoRefresh();
      this.startStatusMonitoring();
      
      const initTime = this.performanceMonitor.endTimer('dashboard-init');
      this.logger.info(`Dashboard initialized successfully in ${initTime}ms`);
      
    } catch (error) {
      this.logger.error('Failed to initialize dashboard', { error: error.message, stack: error.stack });
      this.showError('Failed to load dashboard data', 'error');
      this.handleInitializationFailure(error);
    }
  }

  async loadDashboardData() {
    try {
      this.performanceMonitor.startTimer('data-load');
      
      // Check cache first
      const cachedData = this.performanceMonitor.getCached('dashboard-data');
      if (cachedData) {
        this.logger.info('Using cached dashboard data');
        this.dashboardData = cachedData;
        return;
      }

      // Rate limiting for data requests
      if (!this.checkRateLimit('data-load')) {
        throw new Error('Rate limit exceeded for data loading');
      }

      const response = await this.makeSecureRequest('./dashboard-data.json', {
        method: 'GET',
        headers: {
          'X-CSRF-Token': DASHBOARD_CONFIG.security.csrfToken,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate and sanitize data
      this.dashboardData = this.validateDashboardData(data);
      
      // Cache the data
      this.performanceMonitor.setCache('dashboard-data', this.dashboardData);
      
      const loadTime = this.performanceMonitor.endTimer('data-load');
      this.logger.info(`Dashboard data loaded successfully in ${loadTime}ms`);
      
    } catch (error) {
      this.logger.error('Error loading dashboard data', { error: error.message });
      // Fallback to basic data if JSON loading fails
      this.dashboardData = this.getFallbackData();
      this.logger.warn('Using fallback dashboard data');
    }
  }

  async makeSecureRequest(url, options = {}) {
    // Validate URL
    if (!SecurityUtils.validateUrl(url)) {
      throw new Error('Invalid URL provided');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DASHBOARD_CONFIG.performance.requestTimeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'same-origin'
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  validateDashboardData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid dashboard data format');
    }

    // Sanitize all string fields
    if (data.dashboard) {
      if (data.dashboard.title) {
        data.dashboard.title = SecurityUtils.sanitizeInput(data.dashboard.title);
      }
      if (data.dashboard.subtitle) {
        data.dashboard.subtitle = SecurityUtils.sanitizeInput(data.dashboard.subtitle);
      }
      
      // Sanitize cards
      if (Array.isArray(data.dashboard.cards)) {
        data.dashboard.cards = data.dashboard.cards.map(card => ({
          ...card,
          title: SecurityUtils.sanitizeInput(card.title || ''),
          description: SecurityUtils.sanitizeInput(card.description || ''),
          links: Array.isArray(card.links) ? card.links.map(link => ({
            ...link,
            text: SecurityUtils.sanitizeInput(link.text || ''),
            url: SecurityUtils.validateUrl(link.url) ? link.url : '#'
          })) : []
        }));
      }
    }

    return data;
  }

  checkRateLimit(operation) {
    const now = Date.now();
    const windowStart = now - DASHBOARD_CONFIG.security.rateLimitWindow;
    
    // Clean old entries
    for (const [key, timestamp] of this.rateLimiter.entries()) {
      if (timestamp < windowStart) {
        this.rateLimiter.delete(key);
      }
    }

    // Count requests in current window
    const requestCount = Array.from(this.rateLimiter.values())
      .filter(timestamp => timestamp >= windowStart).length;

    if (requestCount >= DASHBOARD_CONFIG.security.maxRequestsPerWindow) {
      this.logger.warn(`Rate limit exceeded for operation: ${operation}`);
      return false;
    }

    // Record this request
    this.rateLimiter.set(`${operation}-${now}`, now);
    return true;
  }

  handleInitializationFailure(error) {
    // Implement fallback mechanisms
    this.showFallbackUI();
    this.enableOfflineMode();
    
    // Report to monitoring system
    this.reportError('initialization_failure', error);
  }

  getFallbackData() {
    return {
      dashboard: {
        title: "🌟 IZA OS Main Dashboard",
        subtitle: "Comprehensive ecosystem overview and control center",
        stats: [
          { number: "27+", label: "Total Services" },
          { number: "382", label: "ACE Businesses" },
          { number: "$1.4B+", label: "Ecosystem Value" },
          { number: "95%", label: "Automation Level" },
          { number: "2,056+", label: "N8N Workflows" },
          { number: "211", label: "Repositories" }
        ],
        cards: [],
        footer: {
          title: "🌟 IZA OS Main Dashboard | Comprehensive Ecosystem Control Center",
          stats: "Total Services: 27+ | Health Score: 57.1%"
        }
      }
    };
  }

  renderDashboard() {
    try {
      this.performanceMonitor.startTimer('dashboard-render');
      
      if (!this.dashboardData) {
        this.logger.warn('No dashboard data available for rendering');
        return;
      }

      const data = this.dashboardData.dashboard;
      
      // Use DocumentFragment for efficient DOM manipulation
      const fragment = document.createDocumentFragment();
      
      // Render components efficiently
      this.renderHeader(data, fragment);
      this.renderStats(data.stats, fragment);
      this.renderDashboardCards(data.cards, fragment);
      this.renderFooter(data.footer, fragment);
      
      // Batch DOM updates
      const container = document.querySelector('.dashboard-grid') || document.body;
      container.appendChild(fragment);
      
      const renderTime = this.performanceMonitor.endTimer('dashboard-render');
      this.logger.info(`Dashboard rendered successfully in ${renderTime}ms`);
      
    } catch (error) {
      this.logger.error('Error rendering dashboard', { error: error.message });
      this.showError('Failed to render dashboard', 'error');
    }
  }

  renderHeader(data, container = null) {
    try {
      const header = document.querySelector('.header');
      if (!header || !data.title || !data.subtitle) return;

      // Sanitize content before rendering
      const title = DASHBOARD_CONFIG.security.sanitizeHtml ? 
        SecurityUtils.sanitizeHtml(data.title) : data.title;
      const subtitle = DASHBOARD_CONFIG.security.sanitizeHtml ? 
        SecurityUtils.sanitizeHtml(data.subtitle) : data.subtitle;

      const headerContent = document.createElement('div');
      headerContent.innerHTML = `
        <h1>${title}</h1>
        <p>${subtitle}</p>
      `;

      if (container) {
        container.appendChild(headerContent);
      } else {
        header.appendChild(headerContent);
      }
      
      this.logger.info('Header rendered successfully');
    } catch (error) {
      this.logger.error('Error rendering header', { error: error.message });
    }
  }

  renderStats(stats, container = null) {
    try {
      const statsContainer = document.querySelector('.main-stats');
      if (!statsContainer || !stats) return;

      // Use DocumentFragment for efficient rendering
      const fragment = document.createDocumentFragment();
      
      stats.forEach((stat, index) => {
        // Sanitize stat data
        const sanitizedNumber = SecurityUtils.sanitizeInput(stat.number || '--');
        const sanitizedLabel = SecurityUtils.sanitizeInput(stat.label || 'Unknown');
        
        const statElement = document.createElement('div');
        statElement.className = 'stat-card card';
        statElement.setAttribute('data-stat-index', index);
        
        statElement.innerHTML = `
          <div class="stat-number">${sanitizedNumber}</div>
          <div class="stat-label">${sanitizedLabel}</div>
        `;
        
        fragment.appendChild(statElement);
      });

      if (container) {
        container.appendChild(fragment);
      } else {
        statsContainer.appendChild(fragment);
      }
      
      this.logger.info(`Rendered ${stats.length} stats successfully`);
    } catch (error) {
      this.logger.error('Error rendering stats', { error: error.message });
    }
  }

  renderDashboardCards(cards, container = null) {
    try {
      const cardsContainer = document.querySelector('.dashboard-grid');
      if (!cardsContainer || !cards) return;

      // Use DocumentFragment for efficient rendering
      const fragment = document.createDocumentFragment();
      
      cards.forEach((card, index) => {
        // Sanitize card data
        const sanitizedTitle = SecurityUtils.sanitizeInput(card.title || 'Untitled');
        const sanitizedDescription = SecurityUtils.sanitizeInput(card.description || 'No description');
        const sanitizedIcon = SecurityUtils.sanitizeInput(card.icon || '📊');
        const sanitizedId = SecurityUtils.sanitizeInput(card.id || `card-${index}`);
        
        const cardElement = document.createElement('div');
        cardElement.className = 'dashboard-card card';
        cardElement.setAttribute('data-card-id', sanitizedId);
        cardElement.setAttribute('data-card-index', index);
        
        cardElement.innerHTML = `
          <div class="dashboard-title">
            <span class="dashboard-icon" aria-hidden="true">${sanitizedIcon}</span>
            ${sanitizedTitle}
          </div>
          <div class="dashboard-description">
            ${sanitizedDescription}
          </div>
          <div class="dashboard-links">
            ${this.renderLinks(card.links)}
          </div>
        `;
        
        fragment.appendChild(cardElement);
      });

      if (container) {
        container.appendChild(fragment);
      } else {
        cardsContainer.appendChild(fragment);
      }
      
      this.logger.info(`Rendered ${cards.length} dashboard cards successfully`);
    } catch (error) {
      this.logger.error('Error rendering dashboard cards', { error: error.message });
    }
  }

  renderLinks(links) {
    if (!links || !Array.isArray(links)) return '';

    return links.map((link, index) => {
      try {
        // Sanitize and validate link data
        const sanitizedUrl = SecurityUtils.validateUrl(link.url) ? link.url : '#';
        const sanitizedText = SecurityUtils.sanitizeInput(link.text || 'Link');
        const statusClass = this.getStatusClass(link.status);
        const statusAriaLabel = this.getStatusAriaLabel(link.status);
        
        // Security attributes for external links
        const targetAttr = link.external ? 'target="_blank" rel="noopener noreferrer nofollow"' : '';
        const securityAttr = link.external ? 'data-external="true"' : 'data-internal="true"';
        
        return `
          <a href="${sanitizedUrl}" 
             class="dashboard-link" 
             ${targetAttr} 
             ${securityAttr}
             data-link-index="${index}"
             aria-label="${sanitizedText} - ${statusAriaLabel}">
            <span class="status-indicator ${statusClass}" 
                  aria-label="${statusAriaLabel}" 
                  title="${statusAriaLabel}"></span>
            ${sanitizedText}
          </a>
        `;
      } catch (error) {
        this.logger.warn(`Error rendering link at index ${index}`, { error: error.message });
        return '';
      }
    }).join('');
  }

  getStatusClass(status) {
    const statusMap = {
      'online': 'status-online',
      'offline': 'status-offline',
      'degraded': 'status-degraded'
    };
    return statusMap[status] || 'status-offline';
  }

  getStatusAriaLabel(status) {
    const statusLabels = {
      'online': 'Service is online and operational',
      'offline': 'Service is offline or unavailable',
      'degraded': 'Service is running with limited functionality'
    };
    return statusLabels[status] || 'Service status unknown';
  }

  renderFooter(footer) {
    const footerElement = document.querySelector('.footer');
    if (!footerElement || !footer) return;

    this.timestampElement = document.createElement('span');
    this.timestampElement.id = 'timestamp';
    this.updateTimestamp();

    footerElement.innerHTML = `
      <p>${footer.title}</p>
      <p>${footer.stats} | Last Updated: ${this.timestampElement.outerHTML}</p>
    `;

    this.timestampElement = document.getElementById('timestamp');
  }

  setupEventListeners() {
    try {
      // Use event delegation for better performance
      document.addEventListener('click', this.debounce((event) => {
        this.handleClick(event);
      }, DASHBOARD_CONFIG.performance.debounceDelay));

      // Enhanced keyboard navigation
      document.addEventListener('keydown', this.debounce((event) => {
        this.handleKeydown(event);
      }, DASHBOARD_CONFIG.performance.debounceDelay));

      // Window resize handling
      window.addEventListener('resize', this.debounce(() => {
        this.handleResize();
      }, DASHBOARD_CONFIG.performance.debounceDelay));

      // Visibility change handling
      document.addEventListener('visibilitychange', () => {
        this.handleVisibilityChange();
      });

      // Error handling for unhandled promises
      window.addEventListener('unhandledrejection', (event) => {
        this.handleUnhandledRejection(event);
      });

      this.logger.info('Event listeners setup successfully');
    } catch (error) {
      this.logger.error('Error setting up event listeners', { error: error.message });
    }
  }

  handleClick(event) {
    try {
      const link = event.target.closest('.dashboard-link');
      if (link) {
        // Validate link before tracking
        const url = link.getAttribute('href');
        const text = link.textContent.trim();
        
        if (SecurityUtils.validateUrl(url)) {
          this.trackLinkClick(url, text);
          
          // Security check for external links
          if (link.hasAttribute('data-external')) {
            this.logSecurityEvent('external_link_click', { url, text });
          }
        } else {
          this.logger.warn('Invalid link clicked', { url, text });
          event.preventDefault();
        }
      }
    } catch (error) {
      this.logger.error('Error handling click event', { error: error.message });
    }
  }

  handleKeydown(event) {
    try {
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      } else if (event.key === 'Escape') {
        this.handleEscapeKey();
      } else if (event.key === 'Enter' || event.key === ' ') {
        this.handleEnterOrSpace(event);
      }
    } catch (error) {
      this.logger.error('Error handling keydown event', { error: error.message });
    }
  }

  handleResize() {
    try {
      // Optimize layout on resize
      this.optimizeLayout();
    } catch (error) {
      this.logger.error('Error handling resize', { error: error.message });
    }
  }

  handleVisibilityChange() {
    try {
      if (document.hidden) {
        this.pauseMonitoring();
        this.logger.info('Dashboard monitoring paused (tab hidden)');
      } else {
        this.resumeMonitoring();
        this.logger.info('Dashboard monitoring resumed (tab visible)');
      }
    } catch (error) {
      this.logger.error('Error handling visibility change', { error: error.message });
    }
  }

  handleUnhandledRejection(event) {
    this.logger.error('Unhandled promise rejection', { 
      reason: event.reason?.toString(),
      promise: event.promise 
    });
    this.reportError('unhandled_promise_rejection', event.reason);
  }

  trackLinkClick(url, text) {
    try {
      // Enhanced analytics tracking with security logging
      const trackingData = {
        url: SecurityUtils.sanitizeInput(url),
        text: SecurityUtils.sanitizeInput(text),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };

      this.logger.info('Dashboard link clicked', trackingData);
      
      // Send to analytics service if configured
      if (DASHBOARD_CONFIG.logging.enableRemote) {
        this.sendAnalyticsEvent('link_click', trackingData);
      }
    } catch (error) {
      this.logger.error('Error tracking link click', { error: error.message });
    }
  }

  debounce(func, wait) {
    return (...args) => {
      const key = func.name || 'anonymous';
      clearTimeout(this.debounceTimers.get(key));
      this.debounceTimers.set(key, setTimeout(() => func.apply(this, args), wait));
    };
  }

  handleTabNavigation(event) {
    const focusedElement = event.target;
    if (focusedElement.classList.contains('dashboard-link')) {
      focusedElement.style.outline = '2px solid var(--primary-gradient-start)';
      focusedElement.style.outlineOffset = '2px';
    }
  }

  updateTimestamp() {
    if (this.timestampElement) {
      const now = new Date();
      this.timestampElement.textContent = now.toLocaleString();
    }
  }

  startAutoRefresh() {
    // Update timestamp every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.updateTimestamp();
    }, 30000);
  }

  startStatusMonitoring() {
    // Check service statuses every 5 minutes
    this.statusCheckInterval = setInterval(() => {
      this.checkServiceStatuses();
    }, 300000);
  }

  async checkServiceStatuses() {
    if (!this.dashboardData) return;

    const cards = this.dashboardData.dashboard.cards;
    for (const card of cards) {
      if (card.links) {
        for (const link of card.links) {
          if (link.external && link.url.startsWith('http://localhost')) {
            try {
              const status = await this.checkServiceHealth(link.url);
              this.updateLinkStatus(card.id, link.url, status);
            } catch (error) {
              console.warn(`Failed to check status for ${link.url}:`, error);
            }
          }
        }
      }
    }
  }

  async checkServiceHealth(url) {
    try {
      // Use a simple fetch with timeout to check service health
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors' // Allow CORS for localhost services
      });
      
      clearTimeout(timeoutId);
      return 'online';
    } catch (error) {
      return 'offline';
    }
  }

  updateLinkStatus(cardId, url, status) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!card) return;

    const link = card.querySelector(`a[href="${url}"]`);
    if (!link) return;

    const statusIndicator = link.querySelector('.status-indicator');
    if (!statusIndicator) return;

    // Remove old status class
    statusIndicator.className = 'status-indicator';
    
    // Add new status class
    statusIndicator.classList.add(this.getStatusClass(status));
    
    // Update aria-label
    statusIndicator.setAttribute('aria-label', this.getStatusAriaLabel(status));
    statusIndicator.setAttribute('title', this.getStatusAriaLabel(status));
  }

  showError(message, type = 'error') {
    try {
      const container = document.querySelector('.container') || document.body;
      if (!container) return;

      // Remove existing error messages
      const existingErrors = container.querySelectorAll('.error-message, .warning-message, .info-message');
      existingErrors.forEach(error => error.remove());

      const errorDiv = document.createElement('div');
      errorDiv.className = `error-message ${type}-message`;
      errorDiv.setAttribute('role', 'alert');
      errorDiv.setAttribute('aria-live', 'polite');
      
      const colors = {
        error: { bg: 'rgba(220, 53, 69, 0.1)', border: '#dc3545', text: '#dc3545' },
        warning: { bg: 'rgba(255, 193, 7, 0.1)', border: '#ffc107', text: '#856404' },
        info: { bg: 'rgba(13, 202, 240, 0.1)', border: '#0dcaf0', text: '#055160' }
      };

      const color = colors[type] || colors.error;
      
      errorDiv.style.cssText = `
        background: ${color.bg};
        border: 2px solid ${color.border};
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        color: ${color.text};
        text-align: center;
        position: relative;
        z-index: 1000;
      `;
      
      errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
          <span aria-hidden="true">${type === 'error' ? '⚠️' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
          <span>${SecurityUtils.sanitizeInput(message)}</span>
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;"
                  aria-label="Dismiss message">×</button>
        </div>
      `;
      
      container.insertBefore(errorDiv, container.firstChild);
      
      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        if (errorDiv.parentNode) {
          errorDiv.remove();
        }
      }, 10000);
      
      this.logger.info(`Error message displayed: ${type} - ${message}`);
    } catch (error) {
      this.logger.error('Error displaying error message', { error: error.message });
    }
  }

  // New utility methods
  showFallbackUI() {
    try {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'fallback-ui';
      fallbackDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; background: rgba(0,0,0,0.05); border-radius: 10px; margin: 20px;">
          <h2>Dashboard Unavailable</h2>
          <p>Some features may be limited. Please check your connection and try refreshing the page.</p>
          <button onclick="location.reload()" class="btn btn-primary">Refresh Page</button>
        </div>
      `;
      
      const container = document.querySelector('.dashboard-grid') || document.body;
      container.appendChild(fallbackDiv);
      
      this.logger.info('Fallback UI displayed');
    } catch (error) {
      this.logger.error('Error showing fallback UI', { error: error.message });
    }
  }

  enableOfflineMode() {
    try {
      document.body.classList.add('offline-mode');
      this.logger.info('Offline mode enabled');
    } catch (error) {
      this.logger.error('Error enabling offline mode', { error: error.message });
    }
  }

  reportError(type, error) {
    try {
      const errorReport = {
        type,
        message: error?.message || 'Unknown error',
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      this.logger.error(`Error reported: ${type}`, errorReport);
      
      // Send to monitoring service if configured
      if (DASHBOARD_CONFIG.logging.enableRemote) {
        this.sendErrorReport(errorReport);
      }
    } catch (reportError) {
      this.logger.error('Error reporting error', { error: reportError.message });
    }
  }

  logSecurityEvent(eventType, data) {
    try {
      const securityEvent = {
        eventType,
        data: SecurityUtils.sanitizeInput(JSON.stringify(data)),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      this.logger.warn(`Security event: ${eventType}`, securityEvent);
      
      // Send to security monitoring if configured
      if (DASHBOARD_CONFIG.logging.enableRemote) {
        this.sendSecurityEvent(securityEvent);
      }
    } catch (error) {
      this.logger.error('Error logging security event', { error: error.message });
    }
  }

  async sendErrorReport(errorReport) {
    try {
      await this.makeSecureRequest('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': DASHBOARD_CONFIG.security.csrfToken
        },
        body: JSON.stringify(errorReport)
      });
    } catch (error) {
      this.logger.error('Failed to send error report', { error: error.message });
    }
  }

  async sendSecurityEvent(securityEvent) {
    try {
      await this.makeSecureRequest('/api/security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': DASHBOARD_CONFIG.security.csrfToken
        },
        body: JSON.stringify(securityEvent)
      });
    } catch (error) {
      this.logger.error('Failed to send security event', { error: error.message });
    }
  }

  async sendAnalyticsEvent(eventType, data) {
    try {
      await this.makeSecureRequest('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': DASHBOARD_CONFIG.security.csrfToken
        },
        body: JSON.stringify({ eventType, data })
      });
    } catch (error) {
      this.logger.error('Failed to send analytics event', { error: error.message });
    }
  }

  optimizeLayout() {
    try {
      // Implement layout optimizations
      const cards = document.querySelectorAll('.dashboard-card');
      cards.forEach(card => {
        // Add lazy loading for cards that are not visible
        if (!this.isElementVisible(card)) {
          card.classList.add('lazy-load');
        }
      });
    } catch (error) {
      this.logger.error('Error optimizing layout', { error: error.message });
    }
  }

  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  pauseMonitoring() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
      this.statusCheckInterval = null;
    }
  }

  resumeMonitoring() {
    this.startAutoRefresh();
    this.startStatusMonitoring();
  }

  handleEscapeKey() {
    // Close any open modals or overlays
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(modal => modal.remove());
  }

  handleEnterOrSpace(event) {
    const target = event.target;
    if (target.classList.contains('dashboard-link') && event.key === 'Enter') {
      event.preventDefault();
      target.click();
    }
  }

  destroy() {
    try {
      // Clear all intervals
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
      if (this.statusCheckInterval) {
        clearInterval(this.statusCheckInterval);
        this.statusCheckInterval = null;
      }

      // Clear debounce timers
      this.debounceTimers.forEach(timer => clearTimeout(timer));
      this.debounceTimers.clear();

      // Clear cache
      this.performanceMonitor.cache.clear();

      // Remove event listeners
      document.removeEventListener('click', this.handleClick);
      document.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);

      this.logger.info('Dashboard destroyed successfully');
    } catch (error) {
      this.logger.error('Error destroying dashboard', { error: error.message });
    }
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.izaDashboard = new IZADashboard();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.izaDashboard) {
    window.izaDashboard.destroy();
  }
});

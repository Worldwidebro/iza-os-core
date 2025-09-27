/**
 * Dashboard Monitoring Bot Integration
 * Integrates AI-powered dashboard monitoring with the IZA OS dashboard script
 */

class DashboardMonitoringBot {
  constructor(dashboard) {
    this.dashboard = dashboard;
    this.monitoringCapabilities = {
      performanceMonitoring: true,
      errorTracking: true,
      userBehaviorAnalysis: true,
      predictiveMaintenance: true,
      realTimeAlerts: true,
      healthScoring: true
    };
    
    this.metrics = {
      performance: new Map(),
      errors: new Map(),
      userInteractions: new Map(),
      systemHealth: new Map()
    };
    
    this.alertThresholds = {
      responseTime: 2000, // 2 seconds
      errorRate: 0.05, // 5%
      memoryUsage: 0.8, // 80%
      cpuUsage: 0.9, // 90%
      activeUsers: 1000
    };
    
    this.healthScore = 100;
    this.lastHealthCheck = Date.now();
    
    this.initializeMonitoring();
  }

  /**
   * Initialize dashboard monitoring capabilities
   */
  initializeMonitoring() {
    console.log('📊 Dashboard Monitoring Bot initialized');
    
    // Enhance dashboard with monitoring capabilities
    this.enhanceDashboardMonitoring();
    
    // Setup real-time monitoring
    this.setupRealTimeMonitoring();
    
    // Setup predictive analytics
    this.setupPredictiveAnalytics();
    
    // Setup alert system
    this.setupAlertSystem();
    
    // Setup health scoring
    this.setupHealthScoring();
  }

  /**
   * Enhance dashboard with monitoring capabilities
   */
  enhanceDashboardMonitoring() {
    // Override performance monitoring methods
    const originalStartTimer = this.dashboard.performanceMonitor.startTimer.bind(this.dashboard.performanceMonitor);
    const originalEndTimer = this.dashboard.performanceMonitor.endTimer.bind(this.dashboard.performanceMonitor);
    
    this.dashboard.performanceMonitor.startTimer = (name) => {
      const result = originalStartTimer(name);
      this.trackPerformanceStart(name);
      return result;
    };
    
    this.dashboard.performanceMonitor.endTimer = (name) => {
      const duration = originalEndTimer(name);
      this.trackPerformanceEnd(name, duration);
      return duration;
    };

    // Enhance error tracking
    const originalLoggerError = this.dashboard.logger.error.bind(this.dashboard.logger);
    
    this.dashboard.logger.error = (message, data = null) => {
      originalLoggerError(message, data);
      this.trackError(message, data);
    };

    // Enhance user interaction tracking
    this.enhanceUserInteractionTracking();
  }

  /**
   * Track performance start
   */
  trackPerformanceStart(operation) {
    const timestamp = Date.now();
    this.metrics.performance.set(`${operation}_start`, timestamp);
    
    // Track resource usage
    if (performance.memory) {
      this.metrics.performance.set(`${operation}_memory_start`, performance.memory.usedJSHeapSize);
    }
  }

  /**
   * Track performance end
   */
  trackPerformanceEnd(operation, duration) {
    const startTime = this.metrics.performance.get(`${operation}_start`);
    if (!startTime) return;

    const actualDuration = Date.now() - startTime;
    
    // Store performance metrics
    this.metrics.performance.set(`${operation}_duration`, actualDuration);
    this.metrics.performance.set(`${operation}_timestamp`, Date.now());
    
    // Track memory usage
    if (performance.memory) {
      const startMemory = this.metrics.performance.get(`${operation}_memory_start`);
      const endMemory = performance.memory.usedJSHeapSize;
      const memoryDelta = endMemory - startMemory;
      
      this.metrics.performance.set(`${operation}_memory_delta`, memoryDelta);
    }
    
    // Check for performance issues
    this.checkPerformanceThresholds(operation, actualDuration);
    
    // Update health score
    this.updateHealthScore();
  }

  /**
   * Check performance thresholds
   */
  checkPerformanceThresholds(operation, duration) {
    if (duration > this.alertThresholds.responseTime) {
      this.triggerAlert('performance', {
        operation,
        duration,
        threshold: this.alertThresholds.responseTime,
        severity: 'warning'
      });
    }
    
    // Track slow operations
    if (duration > this.alertThresholds.responseTime * 2) {
      this.triggerAlert('performance', {
        operation,
        duration,
        threshold: this.alertThresholds.responseTime * 2,
        severity: 'critical'
      });
    }
  }

  /**
   * Track errors
   */
  trackError(message, data) {
    const errorData = {
      message,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      stack: data?.stack || null
    };
    
    // Store error metrics
    const errorKey = `error_${Date.now()}`;
    this.metrics.errors.set(errorKey, errorData);
    
    // Update error rate
    this.updateErrorRate();
    
    // Check error thresholds
    this.checkErrorThresholds();
    
    // Update health score
    this.updateHealthScore();
  }

  /**
   * Update error rate
   */
  updateErrorRate() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Count errors in the last minute
    let errorCount = 0;
    let totalOperations = 0;
    
    for (const [key, timestamp] of this.metrics.performance.entries()) {
      if (key.includes('_timestamp') && timestamp >= oneMinuteAgo) {
        totalOperations++;
      }
    }
    
    for (const [key, errorData] of this.metrics.errors.entries()) {
      if (errorData.timestamp >= oneMinuteAgo) {
        errorCount++;
      }
    }
    
    const errorRate = totalOperations > 0 ? errorCount / totalOperations : 0;
    this.metrics.systemHealth.set('error_rate', errorRate);
    
    return errorRate;
  }

  /**
   * Check error thresholds
   */
  checkErrorThresholds() {
    const errorRate = this.metrics.systemHealth.get('error_rate') || 0;
    
    if (errorRate > this.alertThresholds.errorRate) {
      this.triggerAlert('error_rate', {
        rate: errorRate,
        threshold: this.alertThresholds.errorRate,
        severity: errorRate > this.alertThresholds.errorRate * 2 ? 'critical' : 'warning'
      });
    }
  }

  /**
   * Enhance user interaction tracking
   */
  enhanceUserInteractionTracking() {
    // Track clicks
    document.addEventListener('click', (event) => {
      this.trackUserInteraction('click', {
        target: event.target.tagName,
        className: event.target.className,
        id: event.target.id,
        timestamp: Date.now()
      });
    });

    // Track scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackUserInteraction('scroll', {
          scrollY: window.scrollY,
          scrollX: window.scrollX,
          timestamp: Date.now()
        });
      }, 100);
    });

    // Track keyboard events
    document.addEventListener('keydown', (event) => {
      this.trackUserInteraction('keydown', {
        key: event.key,
        code: event.code,
        timestamp: Date.now()
      });
    });

    // Track focus events
    document.addEventListener('focus', (event) => {
      this.trackUserInteraction('focus', {
        target: event.target.tagName,
        className: event.target.className,
        id: event.target.id,
        timestamp: Date.now()
      });
    }, true);
  }

  /**
   * Track user interactions
   */
  trackUserInteraction(type, data) {
    const interactionKey = `${type}_${Date.now()}`;
    this.metrics.userInteractions.set(interactionKey, {
      type,
      data,
      timestamp: Date.now()
    });
    
    // Clean up old interactions (keep last 1000)
    if (this.metrics.userInteractions.size > 1000) {
      const oldestKey = this.metrics.userInteractions.keys().next().value;
      this.metrics.userInteractions.delete(oldestKey);
    }
    
    // Update user behavior patterns
    this.updateUserBehaviorPatterns(type, data);
  }

  /**
   * Update user behavior patterns
   */
  updateUserBehaviorPatterns(type, data) {
    const patterns = this.metrics.systemHealth.get('user_patterns') || {
      clickFrequency: 0,
      scrollDepth: 0,
      sessionDuration: 0,
      mostUsedElements: new Map()
    };
    
    switch (type) {
      case 'click':
        patterns.clickFrequency++;
        if (data.target) {
          const elementKey = `${data.target}_${data.className}`;
          patterns.mostUsedElements.set(elementKey, (patterns.mostUsedElements.get(elementKey) || 0) + 1);
        }
        break;
      case 'scroll':
        patterns.scrollDepth = Math.max(patterns.scrollDepth, data.scrollY);
        break;
    }
    
    this.metrics.systemHealth.set('user_patterns', patterns);
  }

  /**
   * Setup real-time monitoring
   */
  setupRealTimeMonitoring() {
    // Monitor every 5 seconds
    setInterval(() => {
      this.performRealTimeHealthCheck();
    }, 5000);
    
    // Monitor memory usage
    if (performance.memory) {
      setInterval(() => {
        this.monitorMemoryUsage();
      }, 10000);
    }
    
    // Monitor network connectivity
    this.setupNetworkMonitoring();
  }

  /**
   * Perform real-time health check
   */
  performRealTimeHealthCheck() {
    const healthCheck = {
      timestamp: Date.now(),
      performance: this.getPerformanceMetrics(),
      errors: this.getErrorMetrics(),
      userActivity: this.getUserActivityMetrics(),
      systemResources: this.getSystemResourceMetrics()
    };
    
    // Store health check
    this.metrics.systemHealth.set('last_health_check', healthCheck);
    
    // Calculate overall health score
    this.calculateHealthScore(healthCheck);
    
    // Check for anomalies
    this.detectAnomalies(healthCheck);
    
    // Update dashboard health indicator
    this.updateDashboardHealthIndicator();
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    const metrics = {};
    
    for (const [key, value] of this.metrics.performance.entries()) {
      if (key.includes('_duration')) {
        const operation = key.replace('_duration', '');
        metrics[operation] = value;
      }
    }
    
    return metrics;
  }

  /**
   * Get error metrics
   */
  getErrorMetrics() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    let recentErrors = 0;
    for (const [key, errorData] of this.metrics.errors.entries()) {
      if (errorData.timestamp >= oneMinuteAgo) {
        recentErrors++;
      }
    }
    
    return {
      totalErrors: this.metrics.errors.size,
      recentErrors,
      errorRate: this.metrics.systemHealth.get('error_rate') || 0
    };
  }

  /**
   * Get user activity metrics
   */
  getUserActivityMetrics() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    let recentInteractions = 0;
    const interactionTypes = new Map();
    
    for (const [key, interaction] of this.metrics.userInteractions.entries()) {
      if (interaction.timestamp >= oneMinuteAgo) {
        recentInteractions++;
        interactionTypes.set(interaction.type, (interactionTypes.get(interaction.type) || 0) + 1);
      }
    }
    
    return {
      totalInteractions: this.metrics.userInteractions.size,
      recentInteractions,
      interactionTypes: Object.fromEntries(interactionTypes)
    };
  }

  /**
   * Get system resource metrics
   */
  getSystemResourceMetrics() {
    const metrics = {};
    
    if (performance.memory) {
      metrics.memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
      metrics.memoryTotal = performance.memory.jsHeapSizeLimit;
      metrics.memoryUsed = performance.memory.usedJSHeapSize;
    }
    
    // Get navigation timing
    if (performance.timing) {
      const timing = performance.timing;
      metrics.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      metrics.domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    }
    
    return metrics;
  }

  /**
   * Calculate health score
   */
  calculateHealthScore(healthCheck) {
    let score = 100;
    
    // Performance impact
    const avgResponseTime = Object.values(healthCheck.performance).reduce((sum, time) => sum + time, 0) / Object.keys(healthCheck.performance).length;
    if (avgResponseTime > this.alertThresholds.responseTime) {
      score -= Math.min(30, (avgResponseTime / this.alertThresholds.responseTime) * 30);
    }
    
    // Error impact
    if (healthCheck.errors.errorRate > this.alertThresholds.errorRate) {
      score -= Math.min(40, healthCheck.errors.errorRate * 800);
    }
    
    // Memory impact
    if (healthCheck.systemResources.memoryUsage > this.alertThresholds.memoryUsage) {
      score -= Math.min(20, (healthCheck.systemResources.memoryUsage - this.alertThresholds.memoryUsage) * 100);
    }
    
    this.healthScore = Math.max(0, score);
    this.metrics.systemHealth.set('health_score', this.healthScore);
    
    return this.healthScore;
  }

  /**
   * Detect anomalies
   */
  detectAnomalies(healthCheck) {
    // Detect performance anomalies
    const avgResponseTime = Object.values(healthCheck.performance).reduce((sum, time) => sum + time, 0) / Object.keys(healthCheck.performance).length;
    const performanceHistory = this.metrics.systemHealth.get('performance_history') || [];
    
    performanceHistory.push(avgResponseTime);
    if (performanceHistory.length > 20) {
      performanceHistory.shift();
    }
    
    this.metrics.systemHealth.set('performance_history', performanceHistory);
    
    if (performanceHistory.length >= 10) {
      const avg = performanceHistory.reduce((sum, val) => sum + val, 0) / performanceHistory.length;
      const variance = performanceHistory.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / performanceHistory.length;
      const stdDev = Math.sqrt(variance);
      
      if (avgResponseTime > avg + (2 * stdDev)) {
        this.triggerAlert('performance_anomaly', {
          currentTime: avgResponseTime,
          averageTime: avg,
          standardDeviation: stdDev,
          severity: 'warning'
        });
      }
    }
  }

  /**
   * Monitor memory usage
   */
  monitorMemoryUsage() {
    if (!performance.memory) return;
    
    const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
    
    if (memoryUsage > this.alertThresholds.memoryUsage) {
      this.triggerAlert('memory_usage', {
        usage: memoryUsage,
        threshold: this.alertThresholds.memoryUsage,
        used: performance.memory.usedJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        severity: memoryUsage > 0.9 ? 'critical' : 'warning'
      });
    }
    
    this.metrics.systemHealth.set('memory_usage', memoryUsage);
  }

  /**
   * Setup network monitoring
   */
  setupNetworkMonitoring() {
    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.triggerAlert('network', {
        status: 'online',
        severity: 'info'
      });
    });
    
    window.addEventListener('offline', () => {
      this.triggerAlert('network', {
        status: 'offline',
        severity: 'critical'
      });
    });
    
    // Monitor fetch failures
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        return response;
      } catch (error) {
        this.trackNetworkError(args[0], error);
        throw error;
      }
    };
  }

  /**
   * Track network errors
   */
  trackNetworkError(url, error) {
    this.trackError('Network request failed', {
      url,
      error: error.message,
      timestamp: Date.now()
    });
  }

  /**
   * Setup predictive analytics
   */
  setupPredictiveAnalytics() {
    // Run predictive analysis every minute
    setInterval(() => {
      this.runPredictiveAnalysis();
    }, 60000);
  }

  /**
   * Run predictive analysis
   */
  runPredictiveAnalysis() {
    const predictions = {
      timestamp: Date.now(),
      performanceTrend: this.predictPerformanceTrend(),
      errorTrend: this.predictErrorTrend(),
      userActivityTrend: this.predictUserActivityTrend(),
      resourceUtilizationTrend: this.predictResourceUtilizationTrend()
    };
    
    this.metrics.systemHealth.set('predictions', predictions);
    
    // Act on predictions
    this.actOnPredictions(predictions);
  }

  /**
   * Predict performance trend
   */
  predictPerformanceTrend() {
    const performanceHistory = this.metrics.systemHealth.get('performance_history') || [];
    if (performanceHistory.length < 5) return 'insufficient_data';
    
    const recent = performanceHistory.slice(-5);
    const older = performanceHistory.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;
    
    if (recentAvg > olderAvg * 1.2) return 'degrading';
    if (recentAvg < olderAvg * 0.8) return 'improving';
    return 'stable';
  }

  /**
   * Predict error trend
   */
  predictErrorTrend() {
    const errorRate = this.metrics.systemHealth.get('error_rate') || 0;
    const errorHistory = this.metrics.systemHealth.get('error_history') || [];
    
    errorHistory.push(errorRate);
    if (errorHistory.length > 20) {
      errorHistory.shift();
    }
    this.metrics.systemHealth.set('error_history', errorHistory);
    
    if (errorHistory.length < 5) return 'insufficient_data';
    
    const recent = errorHistory.slice(-5);
    const older = errorHistory.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;
    
    if (recentAvg > olderAvg * 1.5) return 'increasing';
    if (recentAvg < olderAvg * 0.5) return 'decreasing';
    return 'stable';
  }

  /**
   * Predict user activity trend
   */
  predictUserActivityTrend() {
    const userPatterns = this.metrics.systemHealth.get('user_patterns') || {};
    const clickFrequency = userPatterns.clickFrequency || 0;
    
    // Simple prediction based on current activity
    if (clickFrequency > 100) return 'high_activity';
    if (clickFrequency > 50) return 'moderate_activity';
    return 'low_activity';
  }

  /**
   * Predict resource utilization trend
   */
  predictResourceUtilizationTrend() {
    const memoryUsage = this.metrics.systemHealth.get('memory_usage') || 0;
    
    if (memoryUsage > 0.8) return 'high_utilization';
    if (memoryUsage > 0.6) return 'moderate_utilization';
    return 'low_utilization';
  }

  /**
   * Act on predictions
   */
  actOnPredictions(predictions) {
    // Performance degradation prediction
    if (predictions.performanceTrend === 'degrading') {
      this.triggerAlert('performance_prediction', {
        trend: 'degrading',
        severity: 'warning',
        message: 'Performance may degrade soon'
      });
    }
    
    // Error increase prediction
    if (predictions.errorTrend === 'increasing') {
      this.triggerAlert('error_prediction', {
        trend: 'increasing',
        severity: 'warning',
        message: 'Error rate may increase soon'
      });
    }
    
    // High resource utilization prediction
    if (predictions.resourceUtilizationTrend === 'high_utilization') {
      this.triggerAlert('resource_prediction', {
        trend: 'high_utilization',
        severity: 'warning',
        message: 'Resource utilization is high'
      });
    }
  }

  /**
   * Setup alert system
   */
  setupAlertSystem() {
    this.alertHistory = [];
    this.alertCallbacks = new Map();
  }

  /**
   * Trigger alert
   */
  triggerAlert(type, data) {
    const alert = {
      id: `alert_${Date.now()}`,
      type,
      data,
      timestamp: Date.now(),
      acknowledged: false
    };
    
    this.alertHistory.push(alert);
    
    // Keep only last 100 alerts
    if (this.alertHistory.length > 100) {
      this.alertHistory.shift();
    }
    
    // Show alert in dashboard
    this.showAlert(alert);
    
    // Call registered callbacks
    if (this.alertCallbacks.has(type)) {
      this.alertCallbacks.get(type).forEach(callback => callback(alert));
    }
    
    console.log(`🚨 Alert triggered: ${type}`, alert);
  }

  /**
   * Show alert in dashboard
   */
  showAlert(alert) {
    const alertContainer = document.querySelector('.alert-container') || this.createAlertContainer();
    
    const alertElement = document.createElement('div');
    alertElement.className = `dashboard-alert alert-${alert.data.severity || 'info'}`;
    alertElement.innerHTML = `
      <div class="alert-content">
        <div class="alert-icon">${this.getAlertIcon(alert.data.severity)}</div>
        <div class="alert-message">
          <strong>${this.getAlertTitle(alert.type)}</strong>
          <p>${this.getAlertMessage(alert)}</p>
        </div>
        <button class="alert-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    alertContainer.appendChild(alertElement);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (alertElement.parentNode) {
        alertElement.remove();
      }
    }, 10000);
  }

  /**
   * Create alert container
   */
  createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
  }

  /**
   * Get alert icon
   */
  getAlertIcon(severity) {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      critical: '🚨',
      error: '❌'
    };
    return icons[severity] || 'ℹ️';
  }

  /**
   * Get alert title
   */
  getAlertTitle(type) {
    const titles = {
      performance: 'Performance Alert',
      error_rate: 'Error Rate Alert',
      memory_usage: 'Memory Usage Alert',
      network: 'Network Alert',
      performance_anomaly: 'Performance Anomaly',
      performance_prediction: 'Performance Prediction',
      error_prediction: 'Error Prediction',
      resource_prediction: 'Resource Prediction'
    };
    return titles[type] || 'System Alert';
  }

  /**
   * Get alert message
   */
  getAlertMessage(alert) {
    switch (alert.type) {
      case 'performance':
        return `Operation ${alert.data.operation} took ${alert.data.duration}ms (threshold: ${alert.data.threshold}ms)`;
      case 'error_rate':
        return `Error rate is ${(alert.data.rate * 100).toFixed(2)}% (threshold: ${(alert.data.threshold * 100).toFixed(2)}%)`;
      case 'memory_usage':
        return `Memory usage is ${(alert.data.usage * 100).toFixed(1)}% (${(alert.data.used / 1024 / 1024).toFixed(1)}MB / ${(alert.data.limit / 1024 / 1024).toFixed(1)}MB)`;
      case 'network':
        return `Network status: ${alert.data.status}`;
      default:
        return alert.data.message || 'System alert detected';
    }
  }

  /**
   * Setup health scoring
   */
  setupHealthScoring() {
    // Update health score every 30 seconds
    setInterval(() => {
      this.updateHealthScore();
    }, 30000);
  }

  /**
   * Update health score
   */
  updateHealthScore() {
    const healthCheck = this.metrics.systemHealth.get('last_health_check');
    if (healthCheck) {
      this.calculateHealthScore(healthCheck);
    }
  }

  /**
   * Update dashboard health indicator
   */
  updateDashboardHealthIndicator() {
    // Find or create health indicator
    let healthIndicator = document.querySelector('.health-indicator');
    if (!healthIndicator) {
      healthIndicator = document.createElement('div');
      healthIndicator.className = 'health-indicator';
      healthIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 10px 15px;
        border-radius: 20px;
        font-weight: bold;
        z-index: 1000;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(healthIndicator);
    }
    
    // Update health indicator appearance
    const score = this.healthScore;
    let color, text;
    
    if (score >= 80) {
      color = '#28a745';
      text = '🟢 Healthy';
    } else if (score >= 60) {
      color = '#ffc107';
      text = '🟡 Warning';
    } else {
      color = '#dc3545';
      text = '🔴 Critical';
    }
    
    healthIndicator.style.backgroundColor = color;
    healthIndicator.style.color = 'white';
    healthIndicator.textContent = `${text} (${Math.round(score)}%)`;
  }

  /**
   * Get monitoring insights
   */
  getMonitoringInsights() {
    return {
      healthScore: this.healthScore,
      performanceMetrics: this.getPerformanceMetrics(),
      errorMetrics: this.getErrorMetrics(),
      userActivityMetrics: this.getUserActivityMetrics(),
      systemResourceMetrics: this.getSystemResourceMetrics(),
      recentAlerts: this.alertHistory.slice(-10),
      predictions: this.metrics.systemHealth.get('predictions'),
      recommendations: this.generateRecommendations()
    };
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    const healthCheck = this.metrics.systemHealth.get('last_health_check');
    
    if (!healthCheck) return recommendations;
    
    // Performance recommendations
    const avgResponseTime = Object.values(healthCheck.performance).reduce((sum, time) => sum + time, 0) / Object.keys(healthCheck.performance).length;
    if (avgResponseTime > 1000) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message: 'Consider optimizing slow operations',
        details: `Average response time: ${avgResponseTime.toFixed(0)}ms`
      });
    }
    
    // Memory recommendations
    if (healthCheck.systemResources.memoryUsage > 0.7) {
      recommendations.push({
        type: 'memory',
        priority: 'medium',
        message: 'Memory usage is high',
        details: `Current usage: ${(healthCheck.systemResources.memoryUsage * 100).toFixed(1)}%`
      });
    }
    
    // Error recommendations
    if (healthCheck.errors.errorRate > 0.01) {
      recommendations.push({
        type: 'errors',
        priority: 'high',
        message: 'Error rate is elevated',
        details: `Current error rate: ${(healthCheck.errors.errorRate * 100).toFixed(2)}%`
      });
    }
    
    return recommendations;
  }

  /**
   * Export monitoring data
   */
  exportMonitoringData() {
    return {
      metrics: Object.fromEntries(
        Array.from(this.metrics.entries()).map(([key, value]) => [
          key,
          value instanceof Map ? Object.fromEntries(value) : value
        ])
      ),
      healthScore: this.healthScore,
      alertHistory: this.alertHistory,
      insights: this.getMonitoringInsights()
    };
  }

  /**
   * Register alert callback
   */
  onAlert(type, callback) {
    if (!this.alertCallbacks.has(type)) {
      this.alertCallbacks.set(type, []);
    }
    this.alertCallbacks.get(type).push(callback);
  }

  /**
   * Destroy monitoring bot
   */
  destroy() {
    // Clear all intervals and timeouts
    // Note: In a real implementation, you'd store interval IDs and clear them
    
    // Remove alert container
    const alertContainer = document.querySelector('.alert-container');
    if (alertContainer) {
      alertContainer.remove();
    }
    
    // Remove health indicator
    const healthIndicator = document.querySelector('.health-indicator');
    if (healthIndicator) {
      healthIndicator.remove();
    }
    
    console.log('📊 Dashboard Monitoring Bot destroyed');
  }
}

// Initialize Dashboard Monitoring Bot when dashboard is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for dashboard to be initialized
  const initDashboardMonitoring = () => {
    if (window.izaDashboard) {
      window.dashboardMonitoringBot = new DashboardMonitoringBot(window.izaDashboard);
      console.log('📊 Dashboard Monitoring Bot integrated with IZA OS Dashboard');
    } else {
      setTimeout(initDashboardMonitoring, 100);
    }
  };
  
  initDashboardMonitoring();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardMonitoringBot;
}

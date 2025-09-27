/**
 * Dashboard Search Integration Script
 * Integrates modern search functionality into existing IZA OS dashboard
 */

class DashboardSearchIntegration {
  constructor() {
    this.isIntegrated = false;
    this.originalScript = null;
  }

  /**
   * Integrate search functionality into existing dashboard
   */
  integrate() {
    if (this.isIntegrated) {
      console.log('Search already integrated');
      return;
    }

    try {
      // 1. Load modern search implementation
      this.loadSearchImplementation();
      
      // 2. Enhance existing dashboard script
      this.enhanceExistingScript();
      
      // 3. Add search data integration
      this.addSearchDataIntegration();
      
      // 4. Setup real-time updates
      this.setupRealTimeUpdates();
      
      this.isIntegrated = true;
      console.log('✅ Modern search successfully integrated into IZA OS dashboard');
      
    } catch (error) {
      console.error('❌ Error integrating search:', error);
    }
  }

  /**
   * Load the modern search implementation
   */
  loadSearchImplementation() {
    // Check if modern search script is already loaded
    if (document.querySelector('script[src*="modern-search-implementation.js"]')) {
      return;
    }

    // Create and load the modern search script
    const script = document.createElement('script');
    script.src = 'modern-search-implementation.js';
    script.async = true;
    script.onload = () => {
      console.log('Modern search implementation loaded');
    };
    script.onerror = () => {
      console.error('Failed to load modern search implementation');
    };
    
    document.head.appendChild(script);
  }

  /**
   * Enhance existing dashboard script with search capabilities
   */
  enhanceExistingScript() {
    // Enhance the existing DashboardManager class
    if (typeof DashboardManager !== 'undefined') {
      this.enhanceDashboardManager();
    }

    // Add search-specific methods to existing classes
    this.addSearchMethods();
  }

  /**
   * Enhance DashboardManager with search capabilities
   */
  enhanceDashboardManager() {
    const originalInit = DashboardManager.prototype.init;
    
    DashboardManager.prototype.init = function() {
      // Call original init
      originalInit.call(this);
      
      // Initialize search after dashboard is ready
      setTimeout(() => {
        this.initializeSearch();
      }, 1000);
    };

    // Add search initialization method
    DashboardManager.prototype.initializeSearch = function() {
      if (window.modernSearch) {
        // Integrate with existing data sources
        this.integrateSearchWithData();
        
        // Setup search event handlers
        this.setupSearchEventHandlers();
        
        console.log('Search integrated with dashboard manager');
      }
    };

    // Add search data integration
    DashboardManager.prototype.integrateSearchWithData = function() {
      // Get services data from existing dashboard
      if (this.servicesData) {
        window.modernSearch.searchData = [
          ...window.modernSearch.searchData,
          ...this.servicesData.map(service => ({
            ...service,
            type: 'services',
            status: service.status || 'active'
          }))
        ];
      }

      // Get metrics data from existing dashboard
      if (this.metricsData) {
        window.modernSearch.searchData = [
          ...window.modernSearch.searchData,
          ...this.metricsData.map(metric => ({
            ...metric,
            type: 'metrics',
            status: metric.status || 'active'
          }))
        ];
      }
    };

    // Add search event handlers
    DashboardManager.prototype.setupSearchEventHandlers = function() {
      // Listen for search results
      document.addEventListener('searchResultSelected', (event) => {
        this.handleSearchResult(event.detail);
      });

      // Listen for search navigation
      document.addEventListener('searchNavigation', (event) => {
        this.handleSearchNavigation(event.detail);
      });
    };

    // Handle search result selection
    DashboardManager.prototype.handleSearchResult = function(result) {
      console.log('Search result selected:', result);
      
      // Navigate to the relevant section
      this.navigateToSection(result.type, result.id);
      
      // Highlight the result
      this.highlightResult(result);
      
      // Update analytics
      this.trackSearchUsage(result);
    };

    // Handle search navigation
    DashboardManager.prototype.handleSearchNavigation = function(navigation) {
      console.log('Search navigation:', navigation);
      
      switch (navigation.action) {
        case 'scrollToSection':
          this.scrollToSection(navigation.sectionId);
          break;
        case 'highlightElement':
          this.highlightElement(navigation.elementId);
          break;
        case 'showDetails':
          this.showElementDetails(navigation.elementId);
          break;
      }
    };

    // Navigate to section
    DashboardManager.prototype.navigateToSection = function(type, id) {
      const sectionMap = {
        services: 'services',
        metrics: 'analytics',
        users: 'settings'
      };

      const sectionId = sectionMap[type];
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          
          // Expand section if collapsed
          const expandBtn = section.querySelector('.expand-btn');
          if (expandBtn && !section.classList.contains('expanded')) {
            expandBtn.click();
          }
        }
      }
    };

    // Highlight search result
    DashboardManager.prototype.highlightResult = function(result) {
      const element = document.querySelector(`[data-${result.type}-id="${result.id}"]`);
      if (element) {
        element.classList.add('search-highlighted');
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          element.classList.remove('search-highlighted');
        }, 3000);
      }
    };

    // Track search usage
    DashboardManager.prototype.trackSearchUsage = function(result) {
      // Send analytics event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'search_result_click', {
          search_result_type: result.type,
          search_result_id: result.id,
          search_result_name: result.name
        });
      }
    };

    // Scroll to section
    DashboardManager.prototype.scrollToSection = function(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Highlight element
    DashboardManager.prototype.highlightElement = function(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add('highlighted');
        setTimeout(() => {
          element.classList.remove('highlighted');
        }, 3000);
      }
    };

    // Show element details
    DashboardManager.prototype.showElementDetails = function(elementId) {
      // Implement modal or detail view
      console.log('Showing details for:', elementId);
    };
  }

  /**
   * Add search-specific methods to existing classes
   */
  addSearchMethods() {
    // Enhance PerformanceMonitor with search metrics
    if (typeof PerformanceMonitor !== 'undefined') {
      PerformanceMonitor.prototype.getSearchMetrics = function() {
        return {
          searchQueries: this.metrics.searchQueries || 0,
          searchResponseTime: this.metrics.searchResponseTime || 0,
          searchCacheHitRate: this.metrics.searchCacheHitRate || 0
        };
      };
    }

    // Enhance SecurityUtils with search validation
    if (typeof SecurityUtils !== 'undefined') {
      SecurityUtils.validateSearchQuery = function(query) {
        if (!query || typeof query !== 'string') return false;
        if (query.length > 100) return false;
        if (/[<>\"'&]/.test(query)) return false;
        return true;
      };
    }
  }

  /**
   * Add search data integration with real dashboard data
   */
  addSearchDataIntegration() {
    // Override the mock data fetchers with real data
    if (window.modernSearch) {
      // Replace fetchServicesData with real implementation
      window.modernSearch.fetchServicesData = async () => {
        try {
          // Try to get services from existing dashboard data
          if (typeof DashboardManager !== 'undefined' && window.dashboardManager?.servicesData) {
            return window.dashboardManager.servicesData.map(service => ({
              id: service.id || service.name?.toLowerCase().replace(/\s+/g, '-'),
              name: service.name || service.title || 'Unknown Service',
              description: service.description || service.summary || 'No description available',
              status: service.status || 'unknown',
              tags: service.tags || [],
              category: service.category || 'general'
            }));
          }

          // Fallback to API call
          const response = await fetch('/api/services');
          if (response.ok) {
            const services = await response.json();
            return services.map(service => ({
              id: service.id,
              name: service.name,
              description: service.description,
              status: service.status,
              tags: service.tags || [],
              category: service.category || 'general'
            }));
          }
        } catch (error) {
          console.error('Error fetching services data:', error);
        }

        // Return empty array if all else fails
        return [];
      };

      // Replace fetchMetricsData with real implementation
      window.modernSearch.fetchMetricsData = async () => {
        try {
          // Try to get metrics from existing dashboard data
          if (typeof DashboardManager !== 'undefined' && window.dashboardManager?.metricsData) {
            return window.dashboardManager.metricsData.map(metric => ({
              id: metric.id || metric.name?.toLowerCase().replace(/\s+/g, '-'),
              name: metric.name || metric.title || 'Unknown Metric',
              description: metric.description || metric.summary || 'No description available',
              category: metric.category || 'general',
              status: metric.status || 'active'
            }));
          }

          // Fallback to API call
          const response = await fetch('/api/metrics');
          if (response.ok) {
            const metrics = await response.json();
            return metrics.map(metric => ({
              id: metric.id,
              name: metric.name,
              description: metric.description,
              category: metric.category || 'general',
              status: 'active'
            }));
          }
        } catch (error) {
          console.error('Error fetching metrics data:', error);
        }

        return [];
      };

      // Replace fetchUsersData with real implementation
      window.modernSearch.fetchUsersData = async () => {
        try {
          // Try to get users from existing dashboard data
          if (typeof DashboardManager !== 'undefined' && window.dashboardManager?.usersData) {
            return window.dashboardManager.usersData.map(user => ({
              id: user.id || user.username || user.email,
              name: user.name || user.username || user.email,
              description: user.role || user.title || 'User',
              status: user.status || 'active'
            }));
          }

          // Fallback to API call
          const response = await fetch('/api/users');
          if (response.ok) {
            const users = await response.json();
            return users.map(user => ({
              id: user.id,
              name: user.name || user.username,
              description: user.role || 'User',
              status: user.status || 'active'
            }));
          }
        } catch (error) {
          console.error('Error fetching users data:', error);
        }

        return [];
      };
    }
  }

  /**
   * Setup real-time updates for search
   */
  setupRealTimeUpdates() {
    // Update search data when dashboard data changes
    if (window.modernSearch && typeof DashboardManager !== 'undefined') {
      const originalUpdateData = DashboardManager.prototype.updateData;
      
      DashboardManager.prototype.updateData = function() {
        // Call original update
        originalUpdateData.call(this);
        
        // Update search data
        this.updateSearchData();
      };

      DashboardManager.prototype.updateSearchData = function() {
        if (window.modernSearch) {
          // Reload search data
          window.modernSearch.loadSearchData();
        }
      };
    }

    // Setup WebSocket updates for real-time search
    this.setupWebSocketUpdates();
  }

  /**
   * Setup WebSocket updates for real-time search data
   */
  setupWebSocketUpdates() {
    // Only setup WebSocket if it's available and not already connected
    if (typeof WebSocket !== 'undefined' && !window.searchWebSocket) {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/dashboard`;
        
        window.searchWebSocket = new WebSocket(wsUrl);
        
        window.searchWebSocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (data.type === 'search_update' && window.modernSearch) {
              // Update search data in real-time
              window.modernSearch.handleRealTimeUpdate(data);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        window.searchWebSocket.onclose = () => {
          console.log('Search WebSocket connection closed');
          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            this.setupWebSocketUpdates();
          }, 5000);
        };

        window.searchWebSocket.onerror = (error) => {
          console.error('Search WebSocket error:', error);
        };

      } catch (error) {
        console.error('Error setting up search WebSocket:', error);
      }
    }
  }

  /**
   * Add search-specific CSS styles
   */
  addSearchStyles() {
    const searchStyles = `
      <style>
        /* Search highlight styles */
        .search-highlighted {
          animation: searchHighlight 3s ease-in-out;
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }

        @keyframes searchHighlight {
          0% { 
            background-color: rgba(0, 123, 255, 0.3);
            transform: scale(1);
          }
          50% { 
            background-color: rgba(0, 123, 255, 0.1);
            transform: scale(1.02);
          }
          100% { 
            background-color: transparent;
            transform: scale(1);
          }
        }

        /* Enhanced dashboard styles for search integration */
        .dashboard-section {
          transition: all 0.3s ease;
        }

        .dashboard-section.expanded {
          transform: translateY(0);
          opacity: 1;
        }

        /* Search result navigation styles */
        .search-navigation {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .search-navigation.show {
          opacity: 1;
          transform: translateY(0);
        }

        .search-navigation h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #333;
        }

        .search-navigation p {
          margin: 0;
          font-size: 12px;
          color: #666;
        }

        /* Mobile search enhancements */
        @media (max-width: 768px) {
          .modern-search-container {
            order: -1;
            margin: 10px 0;
          }
          
          .search-results {
            position: fixed;
            top: 60px;
            left: 10px;
            right: 10px;
            max-height: calc(100vh - 80px);
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', searchStyles);
  }
}

// Initialize search integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for existing dashboard to initialize
  setTimeout(() => {
    const searchIntegration = new DashboardSearchIntegration();
    searchIntegration.integrate();
    searchIntegration.addSearchStyles();
    
    // Store reference for debugging
    window.dashboardSearchIntegration = searchIntegration;
    
    console.log('🔍 Dashboard search integration complete');
  }, 2000);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardSearchIntegration;
}

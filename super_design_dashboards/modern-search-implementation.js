/**
 * Modern Dashboard Search Implementation
 * Based on 2024 best practices for enterprise dashboards
 * Features: Real-time search, autocomplete, debouncing, fuzzy search, filters
 */

class ModernSearchEngine {
  constructor(options = {}) {
    this.config = {
      debounceDelay: 300,
      minSearchLength: 2,
      maxResults: 50,
      fuzzyThreshold: 0.6,
      cacheTimeout: 300000, // 5 minutes
      ...options
    };
    
    this.cache = new Map();
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    this.recentSearches = new Set();
    this.isSearching = false;
    
    this.initializeSearchInterface();
    this.loadSearchData();
  }

  /**
   * Initialize the search interface with modern UX patterns
   */
  initializeSearchInterface() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'modern-search-container';
    searchContainer.innerHTML = `
      <div class="search-input-wrapper">
        <div class="search-icon" aria-hidden="true">🔍</div>
        <input 
          type="text" 
          id="dashboard-search" 
          class="search-input" 
          placeholder="Search services, metrics, users..."
          autocomplete="off"
          spellcheck="false"
          aria-label="Search dashboard"
          role="searchbox"
        />
        <button class="search-clear" aria-label="Clear search" style="display: none;">×</button>
        <div class="search-loading" aria-hidden="true" style="display: none;">
          <div class="spinner"></div>
        </div>
      </div>
      
      <div class="search-results" id="search-results" style="display: none;">
        <div class="search-sections">
          <div class="search-section" id="recent-searches">
            <h3>Recent Searches</h3>
            <div class="search-items"></div>
          </div>
          <div class="search-section" id="suggestions">
            <h3>Suggestions</h3>
            <div class="search-items"></div>
          </div>
          <div class="search-section" id="results">
            <h3>Results</h3>
            <div class="search-items"></div>
          </div>
        </div>
      </div>
      
      <div class="search-filters" id="search-filters" style="display: none;">
        <div class="filter-group">
          <label>Type:</label>
          <div class="filter-chips">
            <button class="filter-chip active" data-filter="all">All</button>
            <button class="filter-chip" data-filter="services">Services</button>
            <button class="filter-chip" data-filter="metrics">Metrics</button>
            <button class="filter-chip" data-filter="users">Users</button>
            <button class="filter-chip" data-filter="logs">Logs</button>
          </div>
        </div>
        <div class="filter-group">
          <label>Status:</label>
          <div class="filter-chips">
            <button class="filter-chip" data-status="all">All</button>
            <button class="filter-chip" data-status="active">Active</button>
            <button class="filter-chip" data-status="inactive">Inactive</button>
            <button class="filter-chip" data-status="error">Error</button>
          </div>
        </div>
      </div>
    `;

    // Insert search container into header
    const headerControls = document.querySelector('.header-controls');
    if (headerControls) {
      headerControls.insertBefore(searchContainer, headerControls.firstChild);
    }

    this.setupEventListeners();
    this.addSearchStyles();
  }

  /**
   * Setup event listeners for search functionality
   */
  setupEventListeners() {
    const searchInput = document.getElementById('dashboard-search');
    const searchResults = document.getElementById('search-results');
    const searchClear = document.querySelector('.search-clear');
    const searchLoading = document.querySelector('.search-loading');

    // Debounced search input
    const debouncedSearch = this.debounce((query) => {
      this.performSearch(query);
    }, this.config.debounceDelay);

    // Search input events
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      if (query.length === 0) {
        this.hideResults();
        searchClear.style.display = 'none';
        searchLoading.style.display = 'none';
        return;
      }

      searchClear.style.display = 'block';
      
      if (query.length >= this.config.minSearchLength) {
        searchLoading.style.display = 'block';
        debouncedSearch(query);
      } else {
        this.showSuggestions();
      }
    });

    // Search input focus
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length === 0) {
        this.showRecentSearches();
      }
    });

    // Clear search
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      this.hideResults();
      searchClear.style.display = 'none';
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
        this.hideResults();
      }
    });

    // Filter chips
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-chip')) {
        this.handleFilterClick(e.target);
      }
    });
  }

  /**
   * Load search data from various sources
   */
  async loadSearchData() {
    try {
      // Load services data
      const servicesData = await this.fetchServicesData();
      
      // Load metrics data
      const metricsData = await this.fetchMetricsData();
      
      // Load users data
      const usersData = await this.fetchUsersData();
      
      // Combine all searchable data
      this.searchData = [
        ...servicesData.map(item => ({ ...item, type: 'services' })),
        ...metricsData.map(item => ({ ...item, type: 'metrics' })),
        ...usersData.map(item => ({ ...item, type: 'users' }))
      ];

      console.log(`Loaded ${this.searchData.length} searchable items`);
    } catch (error) {
      console.error('Error loading search data:', error);
    }
  }

  /**
   * Perform search with modern algorithms
   */
  async performSearch(query) {
    if (this.isSearching) return;
    
    this.isSearching = true;
    const searchLoading = document.querySelector('.search-loading');
    
    try {
      // Update search history
      this.updateSearchHistory(query);
      
      // Get active filters
      const activeFilters = this.getActiveFilters();
      
      // Perform fuzzy search
      const results = this.fuzzySearch(query, this.searchData, activeFilters);
      
      // Display results
      this.displaySearchResults(query, results);
      
      // Analytics tracking
      this.trackSearchEvent(query, results.length);
      
    } catch (error) {
      console.error('Search error:', error);
      this.showSearchError('Search failed. Please try again.');
    } finally {
      this.isSearching = false;
      searchLoading.style.display = 'none';
    }
  }

  /**
   * Fuzzy search implementation using Levenshtein distance
   */
  fuzzySearch(query, data, filters = {}) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    for (const item of data) {
      // Apply filters
      if (filters.type && filters.type !== 'all' && item.type !== filters.type) continue;
      if (filters.status && filters.status !== 'all' && item.status !== filters.status) continue;
      
      // Calculate relevance score
      const score = this.calculateRelevanceScore(queryLower, item);
      
      if (score >= this.config.fuzzyThreshold) {
        results.push({
          ...item,
          relevanceScore: score,
          matchedFields: this.getMatchedFields(queryLower, item)
        });
      }
    }
    
    // Sort by relevance score
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
                  .slice(0, this.config.maxResults);
  }

  /**
   * Calculate relevance score for search result
   */
  calculateRelevanceScore(query, item) {
    const searchableText = [
      item.name || '',
      item.description || '',
      item.type || '',
      item.category || '',
      ...(item.tags || [])
    ].join(' ').toLowerCase();
    
    // Exact match gets highest score
    if (searchableText.includes(query)) {
      return 1.0;
    }
    
    // Fuzzy match using Levenshtein distance
    const distance = this.levenshteinDistance(query, searchableText);
    const maxLength = Math.max(query.length, searchableText.length);
    
    return 1 - (distance / maxLength);
  }

  /**
   * Levenshtein distance algorithm for fuzzy matching
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Display search results with modern UI
   */
  displaySearchResults(query, results) {
    const resultsContainer = document.getElementById('results').querySelector('.search-items');
    const searchResults = document.getElementById('search-results');
    const searchFilters = document.getElementById('search-filters');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <h4>No results found</h4>
          <p>Try adjusting your search terms or filters</p>
          <div class="search-suggestions">
            <span>Suggestions:</span>
            <button class="suggestion-chip" data-query="services">services</button>
            <button class="suggestion-chip" data-query="metrics">metrics</button>
            <button class="suggestion-chip" data-query="users">users</button>
          </div>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = results.map(result => `
        <div class="search-result-item" data-type="${result.type}" data-id="${result.id}">
          <div class="result-icon">
            ${this.getTypeIcon(result.type)}
          </div>
          <div class="result-content">
            <div class="result-title">
              ${this.highlightMatches(result.name || result.title, query)}
            </div>
            <div class="result-description">
              ${this.highlightMatches(result.description || '', query)}
            </div>
            <div class="result-meta">
              <span class="result-type">${result.type}</span>
              <span class="result-status status-${result.status || 'unknown'}">${result.status || 'unknown'}</span>
              <span class="result-score">${Math.round(result.relevanceScore * 100)}% match</span>
            </div>
          </div>
          <div class="result-actions">
            <button class="action-btn" title="View details">👁️</button>
            <button class="action-btn" title="Navigate to">➡️</button>
          </div>
        </div>
      `).join('');
    }
    
    // Show results and filters
    searchResults.style.display = 'block';
    searchFilters.style.display = 'block';
    
    // Setup result item click handlers
    this.setupResultClickHandlers();
  }

  /**
   * Show recent searches
   */
  showRecentSearches() {
    const recentContainer = document.getElementById('recent-searches').querySelector('.search-items');
    const searchResults = document.getElementById('search-results');
    
    if (this.searchHistory.length === 0) {
      recentContainer.innerHTML = `
        <div class="no-recent">
          <p>No recent searches</p>
        </div>
      `;
    } else {
      recentContainer.innerHTML = this.searchHistory.slice(0, 5).map(search => `
        <div class="recent-search-item" data-query="${search.query}">
          <span class="recent-icon">🕒</span>
          <span class="recent-query">${search.query}</span>
          <span class="recent-count">${search.count} times</span>
        </div>
      `).join('');
    }
    
    searchResults.style.display = 'block';
  }

  /**
   * Show search suggestions
   */
  showSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions').querySelector('.search-items');
    const searchResults = document.getElementById('search-results');
    
    const suggestions = this.getSearchSuggestions();
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
      <div class="suggestion-item" data-query="${suggestion}">
        <span class="suggestion-icon">💡</span>
        <span class="suggestion-text">${suggestion}</span>
      </div>
    `).join('');
    
    searchResults.style.display = 'block';
  }

  /**
   * Get search suggestions based on popular searches and data
   */
  getSearchSuggestions() {
    const suggestions = [
      'services status',
      'performance metrics',
      'active users',
      'error logs',
      'system health',
      'security alerts'
    ];
    
    // Add type-based suggestions
    const types = [...new Set(this.searchData.map(item => item.type))];
    suggestions.push(...types.map(type => `show ${type}`));
    
    return suggestions.slice(0, 6);
  }

  /**
   * Highlight search matches in text
   */
  highlightMatches(text, query) {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  /**
   * Escape special regex characters
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get icon for search result type
   */
  getTypeIcon(type) {
    const icons = {
      services: '⚙️',
      metrics: '📊',
      users: '👥',
      logs: '📝',
      alerts: '🚨',
      settings: '⚙️'
    };
    return icons[type] || '📄';
  }

  /**
   * Utility functions
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  hideResults() {
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('search-filters').style.display = 'none';
  }

  updateSearchHistory(query) {
    const existing = this.searchHistory.find(item => item.query === query);
    if (existing) {
      existing.count++;
      existing.lastUsed = new Date().toISOString();
    } else {
      this.searchHistory.unshift({
        query,
        count: 1,
        lastUsed: new Date().toISOString()
      });
    }
    
    // Keep only last 20 searches
    this.searchHistory = this.searchHistory.slice(0, 20);
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  getActiveFilters() {
    const activeTypeFilter = document.querySelector('.filter-chip[data-filter].active');
    const activeStatusFilter = document.querySelector('.filter-chip[data-status].active');
    
    return {
      type: activeTypeFilter ? activeTypeFilter.dataset.filter : 'all',
      status: activeStatusFilter ? activeStatusFilter.dataset.status : 'all'
    };
  }

  handleFilterClick(chip) {
    // Remove active class from siblings
    const siblings = chip.parentElement.querySelectorAll('.filter-chip');
    siblings.forEach(sibling => sibling.classList.remove('active'));
    
    // Add active class to clicked chip
    chip.classList.add('active');
    
    // Re-run search with new filters
    const query = document.getElementById('dashboard-search').value.trim();
    if (query.length >= this.config.minSearchLength) {
      this.performSearch(query);
    }
  }

  handleKeyboardNavigation(e) {
    const results = document.querySelectorAll('.search-result-item, .recent-search-item, .suggestion-item');
    const activeElement = document.activeElement;
    let currentIndex = -1;
    
    // Find current active element index
    results.forEach((item, index) => {
      if (item === activeElement || item.contains(activeElement)) {
        currentIndex = index;
      }
    });
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < results.length - 1) {
          results[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          results[currentIndex - 1].focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activeElement && activeElement.dataset.query) {
          this.selectSearchResult(activeElement.dataset.query);
        }
        break;
      case 'Escape':
        this.hideResults();
        document.getElementById('dashboard-search').blur();
        break;
    }
  }

  setupResultClickHandlers() {
    // Recent search items
    document.querySelectorAll('.recent-search-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectSearchResult(item.dataset.query);
      });
    });
    
    // Suggestion items
    document.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectSearchResult(item.dataset.query);
      });
    });
    
    // Search result items
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigateToResult(item.dataset.id, item.dataset.type);
      });
    });
    
    // Suggestion chips in no-results
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('dashboard-search').value = chip.dataset.query;
        this.performSearch(chip.dataset.query);
      });
    });
  }

  selectSearchResult(query) {
    document.getElementById('dashboard-search').value = query;
    this.performSearch(query);
  }

  navigateToResult(id, type) {
    // Navigate to the specific result
    console.log(`Navigating to ${type} with id: ${id}`);
    
    // Hide search results
    this.hideResults();
    
    // Clear search input
    document.getElementById('dashboard-search').value = '';
    
    // Navigate to the result (implement based on your routing)
    this.navigateToSection(type, id);
  }

  navigateToSection(type, id) {
    // Implement navigation logic based on your dashboard structure
    switch (type) {
      case 'services':
        // Navigate to services section and highlight specific service
        this.scrollToSection('services');
        this.highlightService(id);
        break;
      case 'metrics':
        // Navigate to analytics section
        this.scrollToSection('analytics');
        break;
      case 'users':
        // Navigate to user management
        this.scrollToSection('users');
        break;
    }
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  highlightService(serviceId) {
    // Implement service highlighting
    const serviceElement = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (serviceElement) {
      serviceElement.classList.add('highlighted');
      setTimeout(() => {
        serviceElement.classList.remove('highlighted');
      }, 3000);
    }
  }

  trackSearchEvent(query, resultCount) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: query,
        result_count: resultCount
      });
    }
  }

  showSearchError(message) {
    const errorContainer = document.getElementById('results').querySelector('.search-items');
    errorContainer.innerHTML = `
      <div class="search-error">
        <div class="error-icon">⚠️</div>
        <p>${message}</p>
        <button class="retry-btn">Retry</button>
      </div>
    `;
  }

  // Mock data fetchers (replace with real API calls)
  async fetchServicesData() {
    return [
      { id: 'api-gateway', name: 'API Gateway', description: 'Main API gateway service', status: 'active', tags: ['api', 'gateway'] },
      { id: 'user-service', name: 'User Service', description: 'User management service', status: 'active', tags: ['users', 'auth'] },
      { id: 'payment-service', name: 'Payment Service', description: 'Payment processing service', status: 'error', tags: ['payments', 'finance'] },
      { id: 'notification-service', name: 'Notification Service', description: 'Email and SMS notifications', status: 'active', tags: ['notifications', 'email'] }
    ];
  }

  async fetchMetricsData() {
    return [
      { id: 'response-time', name: 'Response Time', description: 'Average API response time', category: 'performance' },
      { id: 'error-rate', name: 'Error Rate', description: 'Percentage of failed requests', category: 'reliability' },
      { id: 'active-users', name: 'Active Users', description: 'Number of currently active users', category: 'usage' },
      { id: 'cpu-usage', name: 'CPU Usage', description: 'Server CPU utilization', category: 'infrastructure' }
    ];
  }

  async fetchUsersData() {
    return [
      { id: 'admin-user', name: 'Admin User', description: 'System administrator', status: 'active' },
      { id: 'support-user', name: 'Support User', description: 'Customer support representative', status: 'active' },
      { id: 'guest-user', name: 'Guest User', description: 'Temporary guest access', status: 'inactive' }
    ];
  }

  /**
   * Add modern search styles
   */
  addSearchStyles() {
    const styles = `
      <style>
        .modern-search-container {
          position: relative;
          flex: 1;
          max-width: 500px;
          margin: 0 20px;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .search-input-wrapper:focus-within {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .search-icon {
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 14px;
          padding: 12px 0;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-clear, .search-loading {
          padding: 12px 16px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          font-size: 18px;
        }

        .search-loading .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          margin-top: 8px;
          max-height: 500px;
          overflow-y: auto;
          z-index: 1000;
        }

        .search-sections {
          padding: 16px;
        }

        .search-section {
          margin-bottom: 20px;
        }

        .search-section:last-child {
          margin-bottom: 0;
        }

        .search-section h3 {
          margin: 0 0 12px 0;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #666;
          letter-spacing: 0.5px;
        }

        .search-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .search-result-item, .recent-search-item, .suggestion-item {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          color: #333;
        }

        .search-result-item:hover, .recent-search-item:hover, .suggestion-item:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .search-result-item:focus, .recent-search-item:focus, .suggestion-item:focus {
          outline: 2px solid #007bff;
          outline-offset: -2px;
        }

        .result-icon, .recent-icon, .suggestion-icon {
          margin-right: 12px;
          font-size: 16px;
        }

        .result-content {
          flex: 1;
        }

        .result-title {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .result-description {
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
        }

        .result-meta {
          display: flex;
          gap: 8px;
          font-size: 11px;
        }

        .result-type {
          background: #e3f2fd;
          color: #1976d2;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .result-status {
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .status-active {
          background: #e8f5e8;
          color: #2e7d32;
        }

        .status-inactive {
          background: #fff3e0;
          color: #f57c00;
        }

        .status-error {
          background: #ffebee;
          color: #c62828;
        }

        .result-score {
          color: #666;
        }

        .result-actions {
          display: flex;
          gap: 4px;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .action-btn:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .search-highlight {
          background: #fff3cd;
          color: #856404;
          padding: 1px 2px;
          border-radius: 2px;
        }

        .search-filters {
          padding: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.02);
        }

        .filter-group {
          margin-bottom: 12px;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter-chip {
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 16px;
          padding: 4px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          background: #e0e0e0;
        }

        .filter-chip.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .no-results, .no-recent, .search-error {
          text-align: center;
          padding: 20px;
          color: #666;
        }

        .no-results-icon, .error-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .search-suggestions {
          margin-top: 12px;
        }

        .search-suggestions span {
          font-size: 12px;
          color: #999;
          margin-right: 8px;
        }

        .suggestion-chip {
          background: #e3f2fd;
          color: #1976d2;
          border: none;
          border-radius: 12px;
          padding: 4px 8px;
          font-size: 11px;
          cursor: pointer;
          margin: 2px;
          transition: background-color 0.2s ease;
        }

        .suggestion-chip:hover {
          background: #bbdefb;
        }

        .retry-btn {
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          margin-top: 8px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .modern-search-container {
            max-width: none;
            margin: 0 10px;
          }
          
          .search-results {
            left: -10px;
            right: -10px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }
}

// Initialize modern search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize search engine
  window.modernSearch = new ModernSearchEngine({
    debounceDelay: 300,
    minSearchLength: 2,
    maxResults: 50,
    fuzzyThreshold: 0.6
  });
  
  console.log('Modern search engine initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernSearchEngine;
}

/**
 * Search Intelligence Bot Integration
 * Integrates AI-powered search intelligence with the modern search implementation
 */

class SearchIntelligenceBot {
  constructor(searchEngine) {
    this.searchEngine = searchEngine;
    this.aiCapabilities = {
      queryUnderstanding: true,
      semanticSearch: true,
      intentClassification: true,
      learningMode: true,
      contextualSuggestions: true
    };
    
    this.searchPatterns = new Map();
    this.userBehaviorData = new Map();
    this.contextualHistory = [];
    
    this.initializeAIIntegration();
  }

  /**
   * Initialize AI integration with the search engine
   */
  initializeAIIntegration() {
    console.log('🤖 Search Intelligence Bot initialized');
    
    // Enhance search with AI capabilities
    this.enhanceSearchEngine();
    
    // Setup learning mechanisms
    this.setupLearningMechanisms();
    
    // Initialize contextual understanding
    this.initializeContextualUnderstanding();
  }

  /**
   * Enhance the search engine with AI capabilities
   */
  enhanceSearchEngine() {
    // Override search method with AI enhancement
    const originalPerformSearch = this.searchEngine.performSearch.bind(this.searchEngine);
    
    this.searchEngine.performSearch = async (query) => {
      // Pre-process query with AI understanding
      const enhancedQuery = await this.processQueryWithAI(query);
      
      // Perform enhanced search
      const results = await originalPerformSearch(enhancedQuery);
      
      // Post-process results with AI ranking
      const aiRankedResults = await this.rankResultsWithAI(query, results);
      
      // Learn from search patterns
      this.learnFromSearch(query, aiRankedResults);
      
      return aiRankedResults;
    };

    // Enhance suggestions with AI
    const originalGetSearchSuggestions = this.searchEngine.getSearchSuggestions.bind(this.searchEngine);
    
    this.searchEngine.getSearchSuggestions = () => {
      const baseSuggestions = originalGetSearchSuggestions();
      const aiSuggestions = this.generateAISuggestions();
      
      return [...baseSuggestions, ...aiSuggestions];
    };
  }

  /**
   * Process query with AI understanding
   */
  async processQueryWithAI(query) {
    try {
      // Intent classification
      const intent = await this.classifyIntent(query);
      
      // Query expansion
      const expandedQuery = await this.expandQuery(query, intent);
      
      // Contextual enhancement
      const contextualQuery = this.addContextualInformation(expandedQuery);
      
      console.log(`🧠 AI Query Processing: "${query}" → "${contextualQuery}"`);
      
      return contextualQuery;
    } catch (error) {
      console.error('AI query processing error:', error);
      return query;
    }
  }

  /**
   * Classify search intent
   */
  async classifyIntent(query) {
    const intentPatterns = {
      troubleshooting: ['error', 'problem', 'issue', 'broken', 'not working', 'failed'],
      monitoring: ['status', 'health', 'performance', 'metrics', 'uptime'],
      configuration: ['setup', 'configure', 'settings', 'config', 'install'],
      analysis: ['report', 'analytics', 'data', 'insights', 'trends'],
      management: ['manage', 'control', 'admin', 'users', 'permissions']
    };

    const queryLower = query.toLowerCase();
    
    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      if (patterns.some(pattern => queryLower.includes(pattern))) {
        return intent;
      }
    }
    
    return 'general';
  }

  /**
   * Expand query with related terms
   */
  async expandQuery(query, intent) {
    const expansionMap = {
      troubleshooting: {
        'error': 'error logs failure issue',
        'problem': 'issue trouble failure',
        'broken': 'not working failed error'
      },
      monitoring: {
        'status': 'health uptime availability',
        'performance': 'metrics speed latency',
        'health': 'status uptime monitoring'
      },
      configuration: {
        'setup': 'install configure initialize',
        'settings': 'config configuration options',
        'install': 'setup deploy configure'
      }
    };

    let expandedQuery = query;
    
    if (expansionMap[intent]) {
      for (const [term, expansion] of Object.entries(expansionMap[intent])) {
        if (query.toLowerCase().includes(term)) {
          expandedQuery += ` ${expansion}`;
        }
      }
    }
    
    return expandedQuery;
  }

  /**
   * Add contextual information to query
   */
  addContextualInformation(query) {
    // Add recent context
    if (this.contextualHistory.length > 0) {
      const recentContext = this.contextualHistory.slice(-3).join(' ');
      query += ` ${recentContext}`;
    }
    
    // Add user behavior context
    const userContext = this.getUserBehaviorContext();
    if (userContext) {
      query += ` ${userContext}`;
    }
    
    return query;
  }

  /**
   * Rank results with AI
   */
  async rankResultsWithAI(query, results) {
    try {
      // Calculate AI relevance scores
      const aiRankedResults = results.map(result => {
        const aiScore = this.calculateAIRelevanceScore(query, result);
        
        return {
          ...result,
          aiRelevanceScore: aiScore,
          combinedScore: (result.relevanceScore + aiScore) / 2
        };
      });
      
      // Sort by combined score
      return aiRankedResults.sort((a, b) => b.combinedScore - a.combinedScore);
    } catch (error) {
      console.error('AI ranking error:', error);
      return results;
    }
  }

  /**
   * Calculate AI relevance score
   */
  calculateAIRelevanceScore(query, result) {
    let score = 0;
    
    // Intent matching
    const intent = this.classifyIntent(query);
    if (result.type === intent || result.category === intent) {
      score += 0.3;
    }
    
    // Semantic similarity (simplified)
    const semanticScore = this.calculateSemanticSimilarity(query, result);
    score += semanticScore * 0.4;
    
    // User behavior relevance
    const behaviorScore = this.getUserBehaviorRelevance(query, result);
    score += behaviorScore * 0.2;
    
    // Temporal relevance
    const temporalScore = this.getTemporalRelevance(result);
    score += temporalScore * 0.1;
    
    return Math.min(score, 1.0);
  }

  /**
   * Calculate semantic similarity
   */
  calculateSemanticSimilarity(query, result) {
    const queryWords = query.toLowerCase().split(' ');
    const resultWords = [
      result.name || '',
      result.description || '',
      result.category || '',
      ...(result.tags || [])
    ].join(' ').toLowerCase().split(' ');
    
    const commonWords = queryWords.filter(word => resultWords.includes(word));
    return commonWords.length / Math.max(queryWords.length, resultWords.length);
  }

  /**
   * Get user behavior relevance
   */
  getUserBehaviorRelevance(query, result) {
    const userHistory = this.userBehaviorData.get('searchHistory') || [];
    const relevantSearches = userHistory.filter(search => 
      search.resultType === result.type || search.resultCategory === result.category
    );
    
    return Math.min(relevantSearches.length * 0.1, 1.0);
  }

  /**
   * Get temporal relevance
   */
  getTemporalRelevance(result) {
    // Recent items get higher scores
    if (result.lastUpdated) {
      const daysSinceUpdate = (Date.now() - new Date(result.lastUpdated)) / (1000 * 60 * 60 * 24);
      return Math.max(0, 1 - (daysSinceUpdate / 30)); // Decay over 30 days
    }
    
    return 0.5; // Default score for items without timestamps
  }

  /**
   * Generate AI-powered suggestions
   */
  generateAISuggestions() {
    const suggestions = [];
    
    // Context-based suggestions
    const contextSuggestions = this.getContextBasedSuggestions();
    suggestions.push(...contextSuggestions);
    
    // Pattern-based suggestions
    const patternSuggestions = this.getPatternBasedSuggestions();
    suggestions.push(...patternSuggestions);
    
    // Predictive suggestions
    const predictiveSuggestions = this.getPredictiveSuggestions();
    suggestions.push(...predictiveSuggestions);
    
    return suggestions.slice(0, 5); // Limit to 5 AI suggestions
  }

  /**
   * Get context-based suggestions
   */
  getContextBasedSuggestions() {
    const suggestions = [];
    
    // Based on current time
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 17) {
      suggestions.push('daily performance report');
    } else {
      suggestions.push('overnight system health');
    }
    
    // Based on recent searches
    if (this.contextualHistory.length > 0) {
      const lastSearch = this.contextualHistory[this.contextualHistory.length - 1];
      if (lastSearch.includes('error')) {
        suggestions.push('error resolution steps');
      }
    }
    
    return suggestions;
  }

  /**
   * Get pattern-based suggestions
   */
  getPatternBasedSuggestions() {
    const suggestions = [];
    
    // Common search patterns
    const patterns = Array.from(this.searchPatterns.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([pattern]) => pattern);
    
    suggestions.push(...patterns);
    
    return suggestions;
  }

  /**
   * Get predictive suggestions
   */
  getPredictiveSuggestions() {
    const suggestions = [];
    
    // Based on user behavior patterns
    const userBehavior = this.userBehaviorData.get('behaviorPattern') || {};
    
    if (userBehavior.frequentlySearchesErrors) {
      suggestions.push('preventive maintenance');
    }
    
    if (userBehavior.frequentlySearchesMetrics) {
      suggestions.push('performance optimization');
    }
    
    return suggestions;
  }

  /**
   * Learn from search patterns
   */
  learnFromSearch(query, results) {
    // Update search patterns
    const queryWords = query.toLowerCase().split(' ');
    queryWords.forEach(word => {
      const currentCount = this.searchPatterns.get(word) || 0;
      this.searchPatterns.set(word, currentCount + 1);
    });
    
    // Update user behavior data
    this.updateUserBehaviorData(query, results);
    
    // Update contextual history
    this.contextualHistory.push(query);
    if (this.contextualHistory.length > 10) {
      this.contextualHistory.shift();
    }
    
    // Store search session data
    this.storeSearchSession(query, results);
  }

  /**
   * Update user behavior data
   */
  updateUserBehaviorData(query, results) {
    const behaviorData = this.userBehaviorData.get('behaviorPattern') || {
      frequentlySearchesErrors: 0,
      frequentlySearchesMetrics: 0,
      frequentlySearchesUsers: 0,
      searchFrequency: 0
    };
    
    // Update behavior patterns
    if (query.toLowerCase().includes('error')) {
      behaviorData.frequentlySearchesErrors++;
    }
    if (query.toLowerCase().includes('metric')) {
      behaviorData.frequentlySearchesMetrics++;
    }
    if (query.toLowerCase().includes('user')) {
      behaviorData.frequentlySearchesUsers++;
    }
    
    behaviorData.searchFrequency++;
    
    this.userBehaviorData.set('behaviorPattern', behaviorData);
  }

  /**
   * Store search session data
   */
  storeSearchSession(query, results) {
    const sessionData = {
      timestamp: new Date().toISOString(),
      query,
      resultCount: results.length,
      resultTypes: [...new Set(results.map(r => r.type))],
      avgRelevanceScore: results.reduce((sum, r) => sum + r.relevanceScore, 0) / results.length
    };
    
    const searchHistory = this.userBehaviorData.get('searchHistory') || [];
    searchHistory.push(sessionData);
    
    // Keep only last 100 searches
    if (searchHistory.length > 100) {
      searchHistory.shift();
    }
    
    this.userBehaviorData.set('searchHistory', searchHistory);
  }

  /**
   * Get user behavior context
   */
  getUserBehaviorContext() {
    const behaviorData = this.userBehaviorData.get('behaviorPattern');
    if (!behaviorData) return null;
    
    if (behaviorData.frequentlySearchesErrors > 5) {
      return 'troubleshooting';
    }
    if (behaviorData.frequentlySearchesMetrics > 5) {
      return 'monitoring';
    }
    
    return null;
  }

  /**
   * Setup learning mechanisms
   */
  setupLearningMechanisms() {
    // Setup periodic learning updates
    setInterval(() => {
      this.updateLearningModels();
    }, 60000); // Update every minute
    
    // Setup feedback collection
    this.setupFeedbackCollection();
  }

  /**
   * Update learning models
   */
  updateLearningModels() {
    // Clean up old patterns
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    // Update pattern weights based on recency
    for (const [pattern, count] of this.searchPatterns.entries()) {
      const weight = Math.max(0, count - 1); // Decay over time
      this.searchPatterns.set(pattern, weight);
    }
    
    console.log('🧠 Learning models updated');
  }

  /**
   * Setup feedback collection
   */
  setupFeedbackCollection() {
    // Add feedback collection to search results
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('search-result-item')) {
        this.collectFeedback(e.target.dataset.id, 'click');
      }
    });
    
    // Add feedback for result actions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('action-btn')) {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem) {
          this.collectFeedback(resultItem.dataset.id, 'action');
        }
      }
    });
  }

  /**
   * Collect user feedback
   */
  collectFeedback(resultId, action) {
    const feedback = {
      timestamp: new Date().toISOString(),
      resultId,
      action,
      query: document.getElementById('dashboard-search')?.value || ''
    };
    
    const feedbackHistory = this.userBehaviorData.get('feedback') || [];
    feedbackHistory.push(feedback);
    
    // Keep only last 50 feedback items
    if (feedbackHistory.length > 50) {
      feedbackHistory.shift();
    }
    
    this.userBehaviorData.set('feedback', feedbackHistory);
    
    console.log('📊 Feedback collected:', feedback);
  }

  /**
   * Initialize contextual understanding
   */
  initializeContextualUnderstanding() {
    // Monitor page context
    this.monitorPageContext();
    
    // Setup context switching
    this.setupContextSwitching();
  }

  /**
   * Monitor page context
   */
  monitorPageContext() {
    // Monitor active sections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const element = mutation.target;
          if (element.classList.contains('active')) {
            this.updateContextualContext(element.id || element.className);
          }
        }
      });
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });
  }

  /**
   * Update contextual context
   */
  updateContextualContext(context) {
    this.contextualHistory.push(`context:${context}`);
    if (this.contextualHistory.length > 10) {
      this.contextualHistory.shift();
    }
  }

  /**
   * Setup context switching
   */
  setupContextSwitching() {
    // Listen for navigation events
    window.addEventListener('popstate', () => {
      this.updateContextualContext('navigation');
    });
    
    // Listen for section changes
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-section]')) {
        this.updateContextualContext(e.target.dataset.section);
      }
    });
  }

  /**
   * Get AI insights for search
   */
  getAISearchInsights() {
    const behaviorData = this.userBehaviorData.get('behaviorPattern');
    const searchHistory = this.userBehaviorData.get('searchHistory') || [];
    
    return {
      totalSearches: searchHistory.length,
      avgResultsPerSearch: searchHistory.reduce((sum, s) => sum + s.resultCount, 0) / searchHistory.length,
      commonSearchTypes: this.getCommonSearchTypes(searchHistory),
      behaviorPattern: behaviorData,
      topPatterns: Array.from(this.searchPatterns.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  }

  /**
   * Get common search types
   */
  getCommonSearchTypes(searchHistory) {
    const typeCount = {};
    
    searchHistory.forEach(search => {
      search.resultTypes.forEach(type => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });
    
    return Object.entries(typeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }

  /**
   * Export search intelligence data
   */
  exportSearchIntelligence() {
    return {
      searchPatterns: Object.fromEntries(this.searchPatterns),
      userBehaviorData: Object.fromEntries(this.userBehaviorData),
      contextualHistory: this.contextualHistory,
      aiCapabilities: this.aiCapabilities,
      insights: this.getAISearchInsights()
    };
  }
}

// Initialize Search Intelligence Bot when modern search is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for modern search to be initialized
  const initSearchIntelligence = () => {
    if (window.modernSearch) {
      window.searchIntelligenceBot = new SearchIntelligenceBot(window.modernSearch);
      console.log('🤖 Search Intelligence Bot integrated with Modern Search Engine');
    } else {
      setTimeout(initSearchIntelligence, 100);
    }
  };
  
  initSearchIntelligence();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchIntelligenceBot;
}

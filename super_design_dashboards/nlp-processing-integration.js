/**
 * NLP Processing Bot Integration
 * Integrates AI-powered natural language processing with search queries and user interactions
 */

class NLPProcessingBot {
  constructor() {
    this.nlpCapabilities = {
      intentClassification: true,
      entityExtraction: true,
      sentimentAnalysis: true,
      languageDetection: true,
      queryExpansion: true,
      contextualUnderstanding: true,
      multiLanguageSupport: true
    };
    
    this.processingModels = {
      intents: new Map(),
      entities: new Map(),
      sentiments: new Map(),
      languages: new Map()
    };
    
    this.contextMemory = new Map();
    this.conversationHistory = [];
    this.userPreferences = new Map();
    
    this.initializeNLP();
  }

  /**
   * Initialize NLP processing capabilities
   */
  initializeNLP() {
    console.log('🧠 NLP Processing Bot initialized');
    
    // Setup intent classification patterns
    this.setupIntentClassification();
    
    // Setup entity extraction patterns
    this.setupEntityExtraction();
    
    // Setup sentiment analysis
    this.setupSentimentAnalysis();
    
    // Setup language detection
    this.setupLanguageDetection();
    
    // Setup contextual processing
    this.setupContextualProcessing();
    
    // Integrate with search system
    this.integrateWithSearchSystem();
  }

  /**
   * Setup intent classification patterns
   */
  setupIntentClassification() {
    const intentPatterns = {
      search: {
        keywords: ['search', 'find', 'look for', 'show me', 'where is', 'how to'],
        patterns: [/search for (.+)/i, /find (.+)/i, /show me (.+)/i, /where is (.+)/i],
        confidence: 0.8
      },
      navigation: {
        keywords: ['go to', 'navigate to', 'open', 'visit', 'access'],
        patterns: [/go to (.+)/i, /navigate to (.+)/i, /open (.+)/i, /visit (.+)/i],
        confidence: 0.9
      },
      information: {
        keywords: ['what is', 'tell me about', 'explain', 'describe', 'information about'],
        patterns: [/what is (.+)/i, /tell me about (.+)/i, /explain (.+)/i, /describe (.+)/i],
        confidence: 0.85
      },
      action: {
        keywords: ['create', 'add', 'delete', 'update', 'modify', 'change'],
        patterns: [/create (.+)/i, /add (.+)/i, /delete (.+)/i, /update (.+)/i],
        confidence: 0.9
      },
      help: {
        keywords: ['help', 'how do i', 'how to', 'can you', 'support'],
        patterns: [/help (.+)/i, /how do i (.+)/i, /how to (.+)/i, /can you (.+)/i],
        confidence: 0.8
      },
      monitoring: {
        keywords: ['status', 'health', 'performance', 'metrics', 'monitor'],
        patterns: [/status of (.+)/i, /health of (.+)/i, /performance of (.+)/i],
        confidence: 0.85
      },
      troubleshooting: {
        keywords: ['error', 'problem', 'issue', 'broken', 'not working', 'failed'],
        patterns: [/error with (.+)/i, /problem with (.+)/i, /issue with (.+)/i],
        confidence: 0.9
      }
    };
    
    this.processingModels.intents.set('patterns', intentPatterns);
  }

  /**
   * Setup entity extraction patterns
   */
  setupEntityExtraction() {
    const entityPatterns = {
      service: {
        patterns: [/(\w+)-service/i, /(\w+) api/i, /(\w+) endpoint/i],
        types: ['api', 'service', 'endpoint']
      },
      metric: {
        patterns: [/(\w+) metric/i, /(\w+) performance/i, /(\w+) stats/i],
        types: ['metric', 'performance', 'statistic']
      },
      user: {
        patterns: [/(\w+) user/i, /user (\w+)/i, /(\w+) account/i],
        types: ['user', 'account', 'profile']
      },
      system: {
        patterns: [/(\w+) system/i, /(\w+) server/i, /(\w+) database/i],
        types: ['system', 'server', 'database']
      },
      time: {
        patterns: [/(\d+)\s*(hour|day|week|month|year)s?/i, /last (\w+)/i, /(\d+):(\d+)/i],
        types: ['time', 'duration', 'period']
      },
      number: {
        patterns: [/\d+/g, /(\d+\.?\d*)\s*(%|percent)/i, /\$(\d+)/i],
        types: ['number', 'percentage', 'currency']
      },
      url: {
        patterns: [/https?:\/\/[\w\-\.]+/i, /www\.[\w\-\.]+/i, /[\w\-\.]+\.(com|org|net)/i],
        types: ['url', 'website', 'link']
      }
    };
    
    this.processingModels.entities.set('patterns', entityPatterns);
  }

  /**
   * Setup sentiment analysis
   */
  setupSentimentAnalysis() {
    const sentimentLexicon = {
      positive: {
        words: ['good', 'great', 'excellent', 'amazing', 'fantastic', 'perfect', 'working', 'healthy', 'fast', 'efficient'],
        weight: 1.0
      },
      negative: {
        words: ['bad', 'terrible', 'awful', 'broken', 'slow', 'error', 'problem', 'issue', 'failed', 'down'],
        weight: -1.0
      },
      neutral: {
        words: ['okay', 'average', 'normal', 'standard', 'regular', 'typical'],
        weight: 0.0
      }
    };
    
    const intensityModifiers = {
      very: 1.5,
      extremely: 2.0,
      quite: 1.2,
      somewhat: 0.8,
      slightly: 0.6
    };
    
    this.processingModels.sentiments.set('lexicon', sentimentLexicon);
    this.processingModels.sentiments.set('modifiers', intensityModifiers);
  }

  /**
   * Setup language detection
   */
  setupLanguageDetection() {
    const languagePatterns = {
      english: {
        patterns: [/the\s+\w+/i, /and\s+\w+/i, /is\s+\w+/i, /are\s+\w+/i],
        commonWords: ['the', 'and', 'is', 'are', 'for', 'with', 'this', 'that']
      },
      spanish: {
        patterns: [/el\s+\w+/i, /la\s+\w+/i, /de\s+\w+/i, /que\s+\w+/i],
        commonWords: ['el', 'la', 'de', 'que', 'en', 'un', 'una', 'por']
      },
      french: {
        patterns: [/le\s+\w+/i, /la\s+\w+/i, /de\s+\w+/i, /du\s+\w+/i],
        commonWords: ['le', 'la', 'de', 'du', 'et', 'en', 'un', 'une']
      },
      german: {
        patterns: [/der\s+\w+/i, /die\s+\w+/i, /das\s+\w+/i, /und\s+\w+/i],
        commonWords: ['der', 'die', 'das', 'und', 'in', 'zu', 'den', 'von']
      }
    };
    
    this.processingModels.languages.set('patterns', languagePatterns);
  }

  /**
   * Setup contextual processing
   */
  setupContextualProcessing() {
    this.contextWindow = 5; // Keep last 5 interactions
    this.contextWeight = 0.3; // 30% weight for context
  }

  /**
   * Integrate with search system
   */
  integrateWithSearchSystem() {
    // Override search input processing
    document.addEventListener('input', (event) => {
      if (event.target.id === 'dashboard-search') {
        this.processSearchInput(event.target.value);
      }
    });
    
    // Override search form submission
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.querySelector('#dashboard-search')) {
        event.preventDefault();
        const query = form.querySelector('#dashboard-search').value;
        this.processSearchQuery(query);
      }
    });
  }

  /**
   * Process search input in real-time
   */
  processSearchInput(input) {
    if (!input || input.length < 3) return;
    
    try {
      // Analyze input for intent and entities
      const analysis = this.analyzeText(input);
      
      // Generate suggestions based on analysis
      this.generateSuggestions(analysis);
      
      // Update context
      this.updateContext('search_input', { input, analysis });
      
    } catch (error) {
      console.error('Error processing search input:', error);
    }
  }

  /**
   * Process search query
   */
  processSearchQuery(query) {
    try {
      // Perform comprehensive NLP analysis
      const analysis = this.analyzeText(query);
      
      // Enhance query based on analysis
      const enhancedQuery = this.enhanceQuery(query, analysis);
      
      // Update conversation history
      this.updateConversationHistory('user_query', { query, analysis });
      
      // Execute enhanced search
      this.executeEnhancedSearch(enhancedQuery, analysis);
      
      return analysis;
    } catch (error) {
      console.error('Error processing search query:', error);
      return null;
    }
  }

  /**
   * Analyze text with comprehensive NLP
   */
  analyzeText(text) {
    const analysis = {
      originalText: text,
      timestamp: Date.now(),
      intent: this.classifyIntent(text),
      entities: this.extractEntities(text),
      sentiment: this.analyzeSentiment(text),
      language: this.detectLanguage(text),
      confidence: 0,
      suggestions: []
    };
    
    // Calculate overall confidence
    analysis.confidence = this.calculateConfidence(analysis);
    
    // Generate contextual suggestions
    analysis.suggestions = this.generateContextualSuggestions(analysis);
    
    return analysis;
  }

  /**
   * Classify intent
   */
  classifyIntent(text) {
    const intentPatterns = this.processingModels.intents.get('patterns');
    const textLower = text.toLowerCase();
    
    let bestIntent = null;
    let bestScore = 0;
    
    for (const [intentName, intentData] of Object.entries(intentPatterns)) {
      let score = 0;
      
      // Check keywords
      const keywordMatches = intentData.keywords.filter(keyword => 
        textLower.includes(keyword.toLowerCase())
      ).length;
      score += keywordMatches * 0.3;
      
      // Check patterns
      const patternMatches = intentData.patterns.filter(pattern => 
        pattern.test(text)
      ).length;
      score += patternMatches * 0.7;
      
      // Apply confidence weight
      score *= intentData.confidence;
      
      if (score > bestScore) {
        bestScore = score;
        bestIntent = {
          name: intentName,
          confidence: score,
          matchedKeywords: intentData.keywords.filter(keyword => 
            textLower.includes(keyword.toLowerCase())
          ),
          matchedPatterns: intentData.patterns.filter(pattern => pattern.test(text))
        };
      }
    }
    
    return bestIntent || { name: 'unknown', confidence: 0, matchedKeywords: [], matchedPatterns: [] };
  }

  /**
   * Extract entities
   */
  extractEntities(text) {
    const entityPatterns = this.processingModels.entities.get('patterns');
    const entities = [];
    
    for (const [entityType, entityData] of Object.entries(entityPatterns)) {
      for (const pattern of entityData.patterns) {
        const matches = text.match(pattern);
        if (matches) {
          entities.push({
            type: entityType,
            value: matches[1] || matches[0],
            confidence: 0.8,
            pattern: pattern.toString(),
            position: text.indexOf(matches[0])
          });
        }
      }
    }
    
    return entities;
  }

  /**
   * Analyze sentiment
   */
  analyzeSentiment(text) {
    const sentimentLexicon = this.processingModels.sentiments.get('lexicon');
    const intensityModifiers = this.processingModels.sentiments.get('modifiers');
    
    const words = text.toLowerCase().split(/\s+/);
    let sentimentScore = 0;
    let wordCount = 0;
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let weight = 0;
      
      // Check for sentiment words
      for (const [sentiment, data] of Object.entries(sentimentLexicon)) {
        if (data.words.includes(word)) {
          weight = data.weight;
          break;
        }
      }
      
      // Check for intensity modifiers
      if (weight !== 0 && i > 0) {
        const prevWord = words[i - 1];
        if (intensityModifiers[prevWord]) {
          weight *= intensityModifiers[prevWord];
        }
      }
      
      if (weight !== 0) {
        sentimentScore += weight;
        wordCount++;
      }
    }
    
    const averageScore = wordCount > 0 ? sentimentScore / wordCount : 0;
    
    let sentiment = 'neutral';
    if (averageScore > 0.2) sentiment = 'positive';
    else if (averageScore < -0.2) sentiment = 'negative';
    
    return {
      sentiment,
      score: averageScore,
      confidence: Math.min(wordCount / 5, 1), // More words = higher confidence
      wordCount
    };
  }

  /**
   * Detect language
   */
  detectLanguage(text) {
    const languagePatterns = this.processingModels.languages.get('patterns');
    
    let bestLanguage = 'english'; // default
    let bestScore = 0;
    
    for (const [language, data] of Object.entries(languagePatterns)) {
      let score = 0;
      
      // Check patterns
      const patternMatches = data.patterns.filter(pattern => pattern.test(text)).length;
      score += patternMatches * 0.7;
      
      // Check common words
      const words = text.toLowerCase().split(/\s+/);
      const commonWordMatches = data.commonWords.filter(word => 
        words.includes(word.toLowerCase())
      ).length;
      score += commonWordMatches * 0.3;
      
      if (score > bestScore) {
        bestScore = score;
        bestLanguage = language;
      }
    }
    
    return {
      language: bestLanguage,
      confidence: bestScore,
      alternative: bestLanguage !== 'english' ? 'english' : null
    };
  }

  /**
   * Calculate overall confidence
   */
  calculateConfidence(analysis) {
    let confidence = 0;
    
    // Intent confidence
    confidence += analysis.intent.confidence * 0.4;
    
    // Entity confidence
    if (analysis.entities.length > 0) {
      const avgEntityConfidence = analysis.entities.reduce((sum, entity) => sum + entity.confidence, 0) / analysis.entities.length;
      confidence += avgEntityConfidence * 0.3;
    }
    
    // Sentiment confidence
    confidence += analysis.sentiment.confidence * 0.2;
    
    // Language confidence
    confidence += analysis.language.confidence * 0.1;
    
    return Math.min(confidence, 1);
  }

  /**
   * Generate contextual suggestions
   */
  generateContextualSuggestions(analysis) {
    const suggestions = [];
    
    // Intent-based suggestions
    switch (analysis.intent.name) {
      case 'search':
        suggestions.push('Try being more specific about what you want to find');
        suggestions.push('Consider adding filters to narrow down results');
        break;
      case 'monitoring':
        suggestions.push('Check system health dashboard');
        suggestions.push('View performance metrics');
        break;
      case 'troubleshooting':
        suggestions.push('Check error logs for more details');
        suggestions.push('Contact support if the issue persists');
        break;
    }
    
    // Entity-based suggestions
    if (analysis.entities.length > 0) {
      const entityTypes = [...new Set(analysis.entities.map(e => e.type))];
      entityTypes.forEach(type => {
        suggestions.push(`Focus on ${type} related information`);
      });
    }
    
    // Sentiment-based suggestions
    if (analysis.sentiment.sentiment === 'negative') {
      suggestions.push('Consider checking system status');
      suggestions.push('Look for error reports or issues');
    }
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  /**
   * Enhance query based on analysis
   */
  enhanceQuery(originalQuery, analysis) {
    let enhancedQuery = originalQuery;
    
    // Add intent-based enhancements
    switch (analysis.intent.name) {
      case 'search':
        // Add search-specific terms
        enhancedQuery += ' search results';
        break;
      case 'monitoring':
        // Add monitoring-specific terms
        enhancedQuery += ' status health metrics';
        break;
      case 'troubleshooting':
        // Add troubleshooting-specific terms
        enhancedQuery += ' error problem solution';
        break;
    }
    
    // Add entity-based enhancements
    analysis.entities.forEach(entity => {
      if (entity.type === 'time') {
        enhancedQuery += ` ${entity.value}`;
      }
    });
    
    // Add contextual enhancements
    const context = this.getContextualEnhancements(analysis);
    if (context) {
      enhancedQuery += ` ${context}`;
    }
    
    return enhancedQuery;
  }

  /**
   * Get contextual enhancements
   */
  getContextualEnhancements(analysis) {
    // Check recent context
    const recentContext = this.contextMemory.get('recent_context') || [];
    if (recentContext.length > 0) {
      // Use recent context to enhance query
      const lastContext = recentContext[recentContext.length - 1];
      if (lastContext.type === 'search_input' && lastContext.data.analysis.intent.name === analysis.intent.name) {
        return 'related';
      }
    }
    
    // Check user preferences
    const userPreferences = this.userPreferences.get('search_preferences') || [];
    if (userPreferences.includes(analysis.intent.name)) {
      return 'preferred';
    }
    
    return null;
  }

  /**
   * Execute enhanced search
   */
  executeEnhancedSearch(enhancedQuery, analysis) {
    // Update search input with enhanced query
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
      searchInput.value = enhancedQuery;
    }
    
    // Trigger search if modern search engine is available
    if (window.modernSearch) {
      window.modernSearch.performSearch(enhancedQuery);
    }
    
    // Log the enhancement
    console.log('🔍 Enhanced search query:', {
      original: analysis.originalText,
      enhanced: enhancedQuery,
      intent: analysis.intent.name,
      confidence: analysis.confidence
    });
  }

  /**
   * Generate suggestions based on analysis
   */
  generateSuggestions(analysis) {
    const suggestionsContainer = document.getElementById('suggestions');
    if (!suggestionsContainer) return;
    
    const suggestions = this.generateContextualSuggestions(analysis);
    
    if (suggestions.length > 0) {
      const suggestionsHTML = suggestions.map(suggestion => `
        <div class="nlp-suggestion" data-suggestion="${suggestion}">
          <span class="suggestion-icon">💡</span>
          <span class="suggestion-text">${suggestion}</span>
        </div>
      `).join('');
      
      suggestionsContainer.innerHTML = `
        <div class="nlp-suggestions">
          <h4>AI Suggestions</h4>
          ${suggestionsHTML}
        </div>
      `;
    }
  }

  /**
   * Update context
   */
  updateContext(type, data) {
    const context = {
      type,
      data,
      timestamp: Date.now()
    };
    
    // Store in context memory
    const recentContext = this.contextMemory.get('recent_context') || [];
    recentContext.push(context);
    
    // Keep only recent context
    if (recentContext.length > this.contextWindow) {
      recentContext.shift();
    }
    
    this.contextMemory.set('recent_context', recentContext);
  }

  /**
   * Update conversation history
   */
  updateConversationHistory(type, data) {
    const conversation = {
      type,
      data,
      timestamp: Date.now()
    };
    
    this.conversationHistory.push(conversation);
    
    // Keep only recent conversation
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift();
    }
  }

  /**
   * Update user preferences
   */
  updateUserPreferences(analysis) {
    // Learn from user interactions
    const preferences = this.userPreferences.get('search_preferences') || [];
    
    if (analysis.intent.confidence > 0.7) {
      if (!preferences.includes(analysis.intent.name)) {
        preferences.push(analysis.intent.name);
      }
    }
    
    // Update entity preferences
    analysis.entities.forEach(entity => {
      const entityPreferences = this.userPreferences.get('entity_preferences') || [];
      if (!entityPreferences.includes(entity.type)) {
        entityPreferences.push(entity.type);
      }
      this.userPreferences.set('entity_preferences', entityPreferences);
    });
    
    this.userPreferences.set('search_preferences', preferences);
  }

  /**
   * Process voice input
   */
  processVoiceInput(audioData) {
    // Placeholder for voice processing
    // In a real implementation, this would integrate with speech recognition APIs
    return {
      text: 'Voice input detected',
      confidence: 0.5,
      language: 'english'
    };
  }

  /**
   * Get NLP insights
   */
  getNLPInsights() {
    return {
      totalQueries: this.conversationHistory.length,
      intentDistribution: this.getIntentDistribution(),
      entityDistribution: this.getEntityDistribution(),
      sentimentDistribution: this.getSentimentDistribution(),
      languageDistribution: this.getLanguageDistribution(),
      userPreferences: Object.fromEntries(this.userPreferences),
      contextMemory: Object.fromEntries(this.contextMemory),
      recommendations: this.generateNLPRecommendations()
    };
  }

  /**
   * Get intent distribution
   */
  getIntentDistribution() {
    const distribution = new Map();
    
    this.conversationHistory.forEach(conversation => {
      if (conversation.type === 'user_query' && conversation.data.analysis.intent) {
        const intent = conversation.data.analysis.intent.name;
        distribution.set(intent, (distribution.get(intent) || 0) + 1);
      }
    });
    
    return Object.fromEntries(distribution);
  }

  /**
   * Get entity distribution
   */
  getEntityDistribution() {
    const distribution = new Map();
    
    this.conversationHistory.forEach(conversation => {
      if (conversation.type === 'user_query' && conversation.data.analysis.entities) {
        conversation.data.analysis.entities.forEach(entity => {
          distribution.set(entity.type, (distribution.get(entity.type) || 0) + 1);
        });
      }
    });
    
    return Object.fromEntries(distribution);
  }

  /**
   * Get sentiment distribution
   */
  getSentimentDistribution() {
    const distribution = { positive: 0, negative: 0, neutral: 0 };
    
    this.conversationHistory.forEach(conversation => {
      if (conversation.type === 'user_query' && conversation.data.analysis.sentiment) {
        const sentiment = conversation.data.analysis.sentiment.sentiment;
        distribution[sentiment]++;
      }
    });
    
    return distribution;
  }

  /**
   * Get language distribution
   */
  getLanguageDistribution() {
    const distribution = new Map();
    
    this.conversationHistory.forEach(conversation => {
      if (conversation.type === 'user_query' && conversation.data.analysis.language) {
        const language = conversation.data.analysis.language.language;
        distribution.set(language, (distribution.get(language) || 0) + 1);
      }
    });
    
    return Object.fromEntries(distribution);
  }

  /**
   * Generate NLP recommendations
   */
  generateNLPRecommendations() {
    const recommendations = [];
    
    // Intent-based recommendations
    const intentDistribution = this.getIntentDistribution();
    const mostCommonIntent = Object.keys(intentDistribution).reduce((a, b) => 
      intentDistribution[a] > intentDistribution[b] ? a : b, 'unknown'
    );
    
    if (mostCommonIntent !== 'unknown') {
      recommendations.push({
        type: 'intent',
        message: `Users frequently use ${mostCommonIntent} queries`,
        suggestion: `Optimize ${mostCommonIntent} functionality`
      });
    }
    
    // Sentiment-based recommendations
    const sentimentDistribution = this.getSentimentDistribution();
    const totalSentiments = Object.values(sentimentDistribution).reduce((sum, count) => sum + count, 0);
    
    if (totalSentiments > 0) {
      const negativeRatio = sentimentDistribution.negative / totalSentiments;
      if (negativeRatio > 0.3) {
        recommendations.push({
          type: 'sentiment',
          message: 'High negative sentiment detected',
          suggestion: 'Investigate user experience issues'
        });
      }
    }
    
    // Language-based recommendations
    const languageDistribution = this.getLanguageDistribution();
    const supportedLanguages = Object.keys(languageDistribution);
    
    if (supportedLanguages.length > 1) {
      recommendations.push({
        type: 'language',
        message: 'Multiple languages detected',
        suggestion: 'Consider implementing multi-language support'
      });
    }
    
    return recommendations;
  }

  /**
   * Export NLP data
   */
  exportNLPData() {
    return {
      processingModels: Object.fromEntries(
        Array.from(this.processingModels.entries()).map(([key, value]) => [
          key,
          value instanceof Map ? Object.fromEntries(value) : value
        ])
      ),
      contextMemory: Object.fromEntries(this.contextMemory),
      conversationHistory: this.conversationHistory,
      userPreferences: Object.fromEntries(this.userPreferences),
      insights: this.getNLPInsights()
    };
  }

  /**
   * Destroy NLP bot
   */
  destroy() {
    // Clear all data structures
    this.processingModels.clear();
    this.contextMemory.clear();
    this.conversationHistory = [];
    this.userPreferences.clear();
    
    console.log('🧠 NLP Processing Bot destroyed');
  }
}

// Initialize NLP Processing Bot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.nlpProcessingBot = new NLPProcessingBot();
  console.log('🧠 NLP Processing Bot integrated with IZA OS Dashboard');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NLPProcessingBot;
}

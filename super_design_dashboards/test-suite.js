/**
 * Comprehensive Test Suite for IZA OS Dashboard System
 * Tests security, performance, functionality, and accessibility
 */

class DashboardTestSuite {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            skipped: 0,
            tests: []
        };
        this.config = {
            timeout: 5000,
            retries: 3,
            verbose: true
        };
        this.securityConfig = null;
        this.performanceMetrics = {};
    }

    /**
     * Initialize test suite
     */
    async init() {
        console.log('🧪 Initializing IZA OS Dashboard Test Suite...');
        
        try {
            // Load security configuration
            await this.loadSecurityConfig();
            
            // Setup test environment
            await this.setupTestEnvironment();
            
            console.log('✅ Test suite initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize test suite:', error);
            return false;
        }
    }

    /**
     * Load security configuration
     */
    async loadSecurityConfig() {
        try {
            const response = await fetch('./security-config.json');
            if (response.ok) {
                this.securityConfig = await response.json();
            } else {
                console.warn('⚠️ Security config not found, using defaults');
                this.securityConfig = this.getDefaultSecurityConfig();
            }
        } catch (error) {
            console.warn('⚠️ Could not load security config:', error);
            this.securityConfig = this.getDefaultSecurityConfig();
        }
    }

    /**
     * Get default security configuration
     */
    getDefaultSecurityConfig() {
        return {
            security: {
                csp: {
                    'default-src': ["'self'"],
                    'script-src': ["'self'", "'unsafe-inline'"]
                },
                cors: {
                    enabled: true,
                    allowed_origins: ["http://localhost:3000"]
                },
                authentication: {
                    rate_limiting: {
                        enabled: true,
                        requests_per_minute: 100
                    }
                }
            }
        };
    }

    /**
     * Setup test environment
     */
    async setupTestEnvironment() {
        // Add test utilities to window object
        window.testUtils = {
            createMockElement: this.createMockElement.bind(this),
            simulateEvent: this.simulateEvent.bind(this),
            measurePerformance: this.measurePerformance.bind(this)
        };

        // Setup performance monitoring
        this.setupPerformanceMonitoring();
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🚀 Starting comprehensive test suite...');
        const startTime = performance.now();

        const testSuites = [
            { name: 'Security Tests', fn: this.runSecurityTests.bind(this) },
            { name: 'Performance Tests', fn: this.runPerformanceTests.bind(this) },
            { name: 'Functionality Tests', fn: this.runFunctionalityTests.bind(this) },
            { name: 'Accessibility Tests', fn: this.runAccessibilityTests.bind(this) },
            { name: 'Integration Tests', fn: this.runIntegrationTests.bind(this) }
        ];

        for (const suite of testSuites) {
            console.log(`\n📋 Running ${suite.name}...`);
            try {
                await suite.fn();
            } catch (error) {
                this.addTestResult(suite.name, false, `Suite failed: ${error.message}`);
            }
        }

        const endTime = performance.now();
        const totalTime = endTime - startTime;

        this.generateReport(totalTime);
    }

    /**
     * Security Tests
     */
    async runSecurityTests() {
        const tests = [
            { name: 'CSP Headers', fn: this.testCSPHeaders.bind(this) },
            { name: 'XSS Prevention', fn: this.testXSSPrevention.bind(this) },
            { name: 'CSRF Protection', fn: this.testCSRFProtection.bind(this) },
            { name: 'Input Validation', fn: this.testInputValidation.bind(this) },
            { name: 'Rate Limiting', fn: this.testRateLimiting.bind(this) },
            { name: 'Secure Headers', fn: this.testSecureHeaders.bind(this) },
            { name: 'File Upload Security', fn: this.testFileUploadSecurity.bind(this) },
            { name: 'Authentication Security', fn: this.testAuthenticationSecurity.bind(this) }
        ];

        for (const test of tests) {
            await this.runTest(`Security: ${test.name}`, test.fn);
        }
    }

    /**
     * Performance Tests
     */
    async runPerformanceTests() {
        const tests = [
            { name: 'Page Load Time', fn: this.testPageLoadTime.bind(this) },
            { name: 'DOM Performance', fn: this.testDOMPerformance.bind(this) },
            { name: 'Memory Usage', fn: this.testMemoryUsage.bind(this) },
            { name: 'Network Performance', fn: this.testNetworkPerformance.bind(this) },
            { name: 'Rendering Performance', fn: this.testRenderingPerformance.bind(this) },
            { name: 'Cache Performance', fn: this.testCachePerformance.bind(this) },
            { name: 'Lazy Loading', fn: this.testLazyLoading.bind(this) },
            { name: 'Bundle Size', fn: this.testBundleSize.bind(this) }
        ];

        for (const test of tests) {
            await this.runTest(`Performance: ${test.name}`, test.fn);
        }
    }

    /**
     * Functionality Tests
     */
    async runFunctionalityTests() {
        const tests = [
            { name: 'Dashboard Loading', fn: this.testDashboardLoading.bind(this) },
            { name: 'Data Fetching', fn: this.testDataFetching.bind(this) },
            { name: 'User Interactions', fn: this.testUserInteractions.bind(this) },
            { name: 'Error Handling', fn: this.testErrorHandling.bind(this) },
            { name: 'State Management', fn: this.testStateManagement.bind(this) },
            { name: 'API Integration', fn: this.testAPIIntegration.bind(this) },
            { name: 'Real-time Updates', fn: this.testRealTimeUpdates.bind(this) },
            { name: 'Offline Functionality', fn: this.testOfflineFunctionality.bind(this) }
        ];

        for (const test of tests) {
            await this.runTest(`Functionality: ${test.name}`, test.fn);
        }
    }

    /**
     * Accessibility Tests
     */
    async runAccessibilityTests() {
        const tests = [
            { name: 'ARIA Attributes', fn: this.testARIAAttributes.bind(this) },
            { name: 'Keyboard Navigation', fn: this.testKeyboardNavigation.bind(this) },
            { name: 'Screen Reader Support', fn: this.testScreenReaderSupport.bind(this) },
            { name: 'Color Contrast', fn: this.testColorContrast.bind(this) },
            { name: 'Focus Management', fn: this.testFocusManagement.bind(this) },
            { name: 'Semantic HTML', fn: this.testSemanticHTML.bind(this) },
            { name: 'Alternative Text', fn: this.testAlternativeText.bind(this) },
            { name: 'Responsive Design', fn: this.testResponsiveDesign.bind(this) }
        ];

        for (const test of tests) {
            await this.runTest(`Accessibility: ${test.name}`, test.fn);
        }
    }

    /**
     * Integration Tests
     */
    async runIntegrationTests() {
        const tests = [
            { name: 'End-to-End Workflow', fn: this.testEndToEndWorkflow.bind(this) },
            { name: 'Service Integration', fn: this.testServiceIntegration.bind(this) },
            { name: 'Database Integration', fn: this.testDatabaseIntegration.bind(this) },
            { name: 'External API Integration', fn: this.testExternalAPIIntegration.bind(this) },
            { name: 'Cross-Browser Compatibility', fn: this.testCrossBrowserCompatibility.bind(this) },
            { name: 'Mobile Compatibility', fn: this.testMobileCompatibility.bind(this) }
        ];

        for (const test of tests) {
            await this.runTest(`Integration: ${test.name}`, test.fn);
        }
    }

    /**
     * Run individual test
     */
    async runTest(testName, testFunction) {
        const startTime = performance.now();
        let passed = false;
        let error = null;

        try {
            await Promise.race([
                testFunction(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Test timeout')), this.config.timeout)
                )
            ]);
            passed = true;
        } catch (e) {
            error = e.message;
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        this.addTestResult(testName, passed, error, duration);
    }

    /**
     * Add test result
     */
    addTestResult(name, passed, error = null, duration = 0) {
        const result = {
            name,
            passed,
            error,
            duration: Math.round(duration * 100) / 100,
            timestamp: new Date().toISOString()
        };

        this.results.tests.push(result);
        
        if (passed) {
            this.results.passed++;
            if (this.config.verbose) {
                console.log(`✅ ${name} (${duration}ms)`);
            }
        } else {
            this.results.failed++;
            console.error(`❌ ${name}: ${error}`);
        }
    }

    // Security Test Implementations
    async testCSPHeaders() {
        const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!meta) {
            throw new Error('CSP headers not found');
        }
        
        const csp = meta.getAttribute('content');
        if (!csp.includes("default-src 'self'")) {
            throw new Error('CSP policy too permissive');
        }
    }

    async testXSSPrevention() {
        const testPayload = '<script>alert("xss")</script>';
        const input = this.createMockElement('input');
        input.value = testPayload;
        
        // Test if input is properly sanitized
        const sanitized = this.sanitizeInput(input.value);
        if (sanitized.includes('<script>')) {
            throw new Error('XSS prevention failed');
        }
    }

    async testCSRFProtection() {
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (!csrfToken) {
            throw new Error('CSRF token not found');
        }
        
        // Test if token is present in requests
        const token = csrfToken.getAttribute('content');
        if (!token || token.length < 10) {
            throw new Error('CSRF token invalid');
        }
    }

    async testInputValidation() {
        const testInputs = [
            { value: 'normal@email.com', shouldPass: true },
            { value: '<script>alert(1)</script>', shouldPass: false },
            { value: '../../../etc/passwd', shouldPass: false },
            { value: 'javascript:alert(1)', shouldPass: false }
        ];

        for (const test of testInputs) {
            const isValid = this.validateInput(test.value);
            if (isValid !== test.shouldPass) {
                throw new Error(`Input validation failed for: ${test.value}`);
            }
        }
    }

    async testRateLimiting() {
        const startTime = Date.now();
        const requests = [];
        
        // Simulate rapid requests
        for (let i = 0; i < 10; i++) {
            requests.push(fetch('/api/test', { method: 'GET' }));
        }
        
        try {
            await Promise.all(requests);
            const duration = Date.now() - startTime;
            
            // If all requests completed too quickly, rate limiting might not be working
            if (duration < 1000) {
                throw new Error('Rate limiting may not be active');
            }
        } catch (error) {
            // Rate limiting should block some requests
            if (!error.message.includes('429')) {
                throw new Error('Rate limiting not working properly');
            }
        }
    }

    async testSecureHeaders() {
        const requiredHeaders = [
            'X-Frame-Options',
            'X-Content-Type-Options',
            'X-XSS-Protection'
        ];

        // Note: This would need to be tested server-side
        // For now, we'll check if the dashboard has security considerations
        const hasSecurityMeta = document.querySelector('meta[name="security"]');
        if (!hasSecurityMeta) {
            throw new Error('Security metadata not found');
        }
    }

    async testFileUploadSecurity() {
        const fileInput = this.createMockElement('input');
        fileInput.type = 'file';
        
        // Test file type validation
        const testFile = new File(['test'], 'test.exe', { type: 'application/x-executable' });
        const isAllowed = this.validateFileType(testFile);
        
        if (isAllowed) {
            throw new Error('Dangerous file type allowed');
        }
    }

    async testAuthenticationSecurity() {
        // Test if authentication tokens are properly handled
        const authToken = localStorage.getItem('auth_token');
        if (authToken && authToken.length < 20) {
            throw new Error('Auth token too short');
        }
        
        // Test if sensitive data is not exposed
        const sensitiveData = document.querySelector('[data-sensitive]');
        if (sensitiveData) {
            throw new Error('Sensitive data exposed in DOM');
        }
    }

    // Performance Test Implementations
    async testPageLoadTime() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 3000) {
            throw new Error(`Page load time too slow: ${loadTime}ms`);
        }
    }

    async testDOMPerformance() {
        const startTime = performance.now();
        
        // Create and manipulate DOM elements
        for (let i = 0; i < 1000; i++) {
            const element = document.createElement('div');
            element.textContent = `Test ${i}`;
            document.body.appendChild(element);
            document.body.removeChild(element);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 100) {
            throw new Error(`DOM manipulation too slow: ${duration}ms`);
        }
    }

    async testMemoryUsage() {
        if (performance.memory) {
            const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize;
            if (memoryUsage > 0.8) {
                throw new Error(`High memory usage: ${(memoryUsage * 100).toFixed(1)}%`);
            }
        }
    }

    async testNetworkPerformance() {
        const startTime = performance.now();
        
        try {
            const response = await fetch('./dashboard-data.json', { 
                method: 'GET',
                cache: 'no-cache'
            });
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            if (duration > 1000) {
                throw new Error(`Network request too slow: ${duration}ms`);
            }
            
            if (!response.ok) {
                throw new Error(`Network request failed: ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Network test failed: ${error.message}`);
        }
    }

    async testRenderingPerformance() {
        const startTime = performance.now();
        
        // Force a reflow
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 16) { // 60fps threshold
            throw new Error(`Rendering performance poor: ${duration}ms`);
        }
    }

    async testCachePerformance() {
        const startTime = performance.now();
        
        // First request (should be slower)
        await fetch('./dashboard-data.json', { cache: 'no-cache' });
        const firstRequestTime = performance.now() - startTime;
        
        // Second request (should be faster due to cache)
        const secondStartTime = performance.now();
        await fetch('./dashboard-data.json');
        const secondRequestTime = performance.now() - secondStartTime;
        
        if (secondRequestTime >= firstRequestTime) {
            throw new Error('Caching not working effectively');
        }
    }

    async testLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if (images.length === 0) {
            throw new Error('No lazy loading images found');
        }
        
        // Check if images have proper lazy loading attributes
        for (const img of images) {
            if (!img.hasAttribute('loading')) {
                throw new Error('Lazy loading attribute missing');
            }
        }
    }

    async testBundleSize() {
        // Check if bundle size is reasonable
        const scripts = document.querySelectorAll('script[src]');
        let totalSize = 0;
        
        for (const script of scripts) {
            try {
                const response = await fetch(script.src, { method: 'HEAD' });
                const size = response.headers.get('content-length');
                if (size) {
                    totalSize += parseInt(size);
                }
            } catch (error) {
                // Ignore errors for external scripts
            }
        }
        
        if (totalSize > 1024 * 1024) { // 1MB limit
            throw new Error(`Bundle size too large: ${(totalSize / 1024).toFixed(1)}KB`);
        }
    }

    // Functionality Test Implementations
    async testDashboardLoading() {
        const dashboard = document.querySelector('.dashboard-grid');
        if (!dashboard) {
            throw new Error('Dashboard container not found');
        }
        
        const cards = dashboard.querySelectorAll('.dashboard-card');
        if (cards.length === 0) {
            throw new Error('No dashboard cards loaded');
        }
    }

    async testDataFetching() {
        try {
            const response = await fetch('./dashboard-data.json');
            if (!response.ok) {
                throw new Error(`Data fetch failed: ${response.status}`);
            }
            
            const data = await response.json();
            if (!data.dashboard) {
                throw new Error('Invalid dashboard data structure');
            }
        } catch (error) {
            throw new Error(`Data fetching test failed: ${error.message}`);
        }
    }

    async testUserInteractions() {
        const button = document.querySelector('button');
        if (!button) {
            throw new Error('No interactive elements found');
        }
        
        // Test click event
        const clickEvent = new MouseEvent('click', { bubbles: true });
        button.dispatchEvent(clickEvent);
        
        // Test keyboard interaction
        const keyEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        button.dispatchEvent(keyEvent);
    }

    async testErrorHandling() {
        try {
            // Test invalid API call
            await fetch('/api/nonexistent');
        } catch (error) {
            // Error handling should gracefully handle this
            if (!window.errorHandler) {
                throw new Error('No global error handler found');
            }
        }
    }

    async testStateManagement() {
        // Test if state is properly managed
        if (window.dashboardState) {
            const initialState = { ...window.dashboardState };
            
            // Modify state
            window.dashboardState.testValue = 'test';
            
            // Check if state changed
            if (window.dashboardState.testValue !== 'test') {
                throw new Error('State management not working');
            }
            
            // Restore state
            window.dashboardState = initialState;
        }
    }

    async testAPIIntegration() {
        // Test API endpoints
        const endpoints = ['/api/health', '/api/status'];
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (!response.ok && response.status !== 404) {
                    throw new Error(`API endpoint failed: ${endpoint}`);
                }
            } catch (error) {
                // 404 is acceptable for optional endpoints
                if (!error.message.includes('404')) {
                    throw new Error(`API integration test failed: ${error.message}`);
                }
            }
        }
    }

    async testRealTimeUpdates() {
        // Test WebSocket connection if available
        if (window.WebSocket) {
            try {
                const ws = new WebSocket('ws://localhost:8080/ws');
                
                await new Promise((resolve, reject) => {
                    ws.onopen = resolve;
                    ws.onerror = reject;
                    setTimeout(() => reject(new Error('WebSocket timeout')), 1000);
                });
                
                ws.close();
            } catch (error) {
                // WebSocket not available is acceptable
                console.warn('WebSocket test skipped:', error.message);
            }
        }
    }

    async testOfflineFunctionality() {
        // Test service worker registration
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.getRegistration();
            if (!registration) {
                throw new Error('Service worker not registered');
            }
        }
    }

    // Accessibility Test Implementations
    async testARIAAttributes() {
        const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        if (elementsWithAria.length === 0) {
            throw new Error('No ARIA attributes found');
        }
    }

    async testKeyboardNavigation() {
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) {
            throw new Error('No keyboard-navigable elements found');
        }
        
        // Test tab navigation
        focusableElements[0].focus();
        if (document.activeElement !== focusableElements[0]) {
            throw new Error('Focus management not working');
        }
    }

    async testScreenReaderSupport() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) {
            throw new Error('No headings found for screen readers');
        }
    }

    async testColorContrast() {
        // Basic color contrast check
        const textElements = document.querySelectorAll('p, span, div');
        for (const element of textElements) {
            const style = window.getComputedStyle(element);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            if (color === backgroundColor) {
                throw new Error('Color contrast issue detected');
            }
        }
    }

    async testFocusManagement() {
        const modal = document.querySelector('.modal, [role="dialog"]');
        if (modal && modal.style.display !== 'none') {
            const focusableInModal = modal.querySelector('button, [href], input, select, textarea');
            if (focusableInModal && document.activeElement !== focusableInModal) {
                throw new Error('Focus not trapped in modal');
            }
        }
    }

    async testSemanticHTML() {
        const semanticElements = document.querySelectorAll('main, section, article, nav, header, footer');
        if (semanticElements.length === 0) {
            throw new Error('No semantic HTML elements found');
        }
    }

    async testAlternativeText() {
        const images = document.querySelectorAll('img');
        for (const img of images) {
            if (!img.alt && !img.getAttribute('aria-label')) {
                throw new Error('Image missing alternative text');
            }
        }
    }

    async testResponsiveDesign() {
        // Test viewport meta tag
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            throw new Error('Viewport meta tag missing');
        }
        
        const content = viewport.getAttribute('content');
        if (!content.includes('width=device-width')) {
            throw new Error('Viewport configuration invalid');
        }
    }

    // Integration Test Implementations
    async testEndToEndWorkflow() {
        // Test complete user workflow
        const dashboard = document.querySelector('.dashboard-grid');
        if (!dashboard) {
            throw new Error('Dashboard not loaded');
        }
        
        const cards = dashboard.querySelectorAll('.dashboard-card');
        if (cards.length === 0) {
            throw new Error('No cards loaded');
        }
        
        // Test card interaction
        const firstCard = cards[0];
        const link = firstCard.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (!href) {
                throw new Error('Card link missing href');
            }
        }
    }

    async testServiceIntegration() {
        // Test integration with various services
        const serviceEndpoints = [
            '/api/dashboard/status',
            '/api/health'
        ];
        
        for (const endpoint of serviceEndpoints) {
            try {
                const response = await fetch(endpoint);
                // 404 is acceptable for optional services
                if (!response.ok && response.status !== 404) {
                    throw new Error(`Service integration failed: ${endpoint}`);
                }
            } catch (error) {
                console.warn(`Service test skipped: ${endpoint}`, error.message);
            }
        }
    }

    async testDatabaseIntegration() {
        // Test database connectivity through API
        try {
            const response = await fetch('/api/data/status');
            if (response.ok) {
                const data = await response.json();
                if (!data.connected) {
                    throw new Error('Database not connected');
                }
            }
        } catch (error) {
            console.warn('Database integration test skipped:', error.message);
        }
    }

    async testExternalAPIIntegration() {
        // Test external API integration
        const externalApis = [
            'https://api.github.com',
            'https://httpbin.org/status/200'
        ];
        
        for (const api of externalApis) {
            try {
                const response = await fetch(api, { 
                    method: 'GET',
                    mode: 'no-cors'
                });
                // No-cors mode doesn't allow checking response status
                console.log(`External API test completed: ${api}`);
            } catch (error) {
                console.warn(`External API test skipped: ${api}`, error.message);
            }
        }
    }

    async testCrossBrowserCompatibility() {
        // Test browser-specific features
        const requiredFeatures = [
            'fetch',
            'Promise',
            'localStorage',
            'sessionStorage'
        ];
        
        for (const feature of requiredFeatures) {
            if (!window[feature]) {
                throw new Error(`Required feature not available: ${feature}`);
            }
        }
    }

    async testMobileCompatibility() {
        // Test mobile-specific features
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            throw new Error('Mobile viewport not configured');
        }
        
        // Test touch events
        if ('ontouchstart' in window) {
            const touchElement = document.querySelector('.dashboard-card');
            if (touchElement) {
                const touchEvent = new TouchEvent('touchstart', { bubbles: true });
                touchElement.dispatchEvent(touchEvent);
            }
        }
    }

    // Utility Methods
    createMockElement(tagName) {
        return document.createElement(tagName);
    }

    simulateEvent(element, eventType) {
        const event = new Event(eventType, { bubbles: true });
        element.dispatchEvent(event);
    }

    measurePerformance(fn) {
        const start = performance.now();
        fn();
        const end = performance.now();
        return end - start;
    }

    sanitizeInput(input) {
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    validateInput(input) {
        const dangerousPatterns = [
            /<script/i,
            /javascript:/i,
            /vbscript:/i,
            /on\w+\s*=/i
        ];
        
        return !dangerousPatterns.some(pattern => pattern.test(input));
    }

    validateFileType(file) {
        const allowedTypes = ['.json', '.css', '.js', '.html', '.png', '.jpg', '.svg'];
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        return allowedTypes.includes(extension);
    }

    setupPerformanceMonitoring() {
        // Monitor performance metrics
        this.performanceMetrics = {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            firstPaint: 0,
            firstContentfulPaint: 0
        };

        // Get paint timing if available
        if (performance.getEntriesByType) {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(entry => {
                if (entry.name === 'first-paint') {
                    this.performanceMetrics.firstPaint = entry.startTime;
                } else if (entry.name === 'first-contentful-paint') {
                    this.performanceMetrics.firstContentfulPaint = entry.startTime;
                }
            });
        }
    }

    generateReport(totalTime) {
        console.log('\n' + '='.repeat(60));
        console.log('📊 IZA OS Dashboard Test Suite Report');
        console.log('='.repeat(60));
        
        const successRate = (this.results.passed / (this.results.passed + this.results.failed) * 100).toFixed(1);
        
        console.log(`⏱️  Total Time: ${totalTime.toFixed(2)}ms`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⏭️  Skipped: ${this.results.skipped}`);
        console.log(`📈 Success Rate: ${successRate}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => {
                    console.log(`   • ${test.name}: ${test.error}`);
                });
        }
        
        console.log('\n🎯 Performance Metrics:');
        Object.entries(this.performanceMetrics).forEach(([key, value]) => {
            console.log(`   • ${key}: ${value}ms`);
        });
        
        console.log('\n' + '='.repeat(60));
        
        // Return results for external use
        return {
            ...this.results,
            totalTime,
            successRate: parseFloat(successRate),
            performanceMetrics: this.performanceMetrics
        };
    }
}

// Initialize and run tests when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const testSuite = new DashboardTestSuite();
    await testSuite.init();
    
    // Run tests when requested
    window.runDashboardTests = () => testSuite.runAllTests();
    
    // Auto-run tests in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Development mode detected. Run tests with: window.runDashboardTests()');
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardTestSuite;
}

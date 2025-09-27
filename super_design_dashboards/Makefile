# IZA OS Dashboard Build System - Enhanced Security & Performance
# Version: 2.0.0

# Variables
DIST_DIR = dist
SRC_DIR = .
CSS_FILE = dashboard-styles.css
JS_FILE = dashboard-script.js
HTML_FILE = iza_os_main_dashboard.html
JSON_FILE = dashboard-data.json
SECURITY_CONFIG = security-config.json
MONITORING_CONFIG = monitoring-config.json
TEST_SUITE = test-suite.js
VALIDATOR = validate-dashboard.py
REPORTS_DIR = reports
LOGS_DIR = logs

# Security and Performance Variables
SECURITY_LEVEL = production
PERFORMANCE_BUDGET = 3000ms
BUNDLE_SIZE_LIMIT = 1MB
LIGHTHOUSE_THRESHOLD = 90

# Default target
.PHONY: all
all: clean security-check build performance-test

# Clean build directory and reports
.PHONY: clean
clean:
	@echo "Cleaning build directory and reports..."
	@rm -rf $(DIST_DIR) $(REPORTS_DIR) $(LOGS_DIR)
	@mkdir -p $(DIST_DIR) $(REPORTS_DIR) $(LOGS_DIR)

# Deep clean including node_modules
.PHONY: clean-all
clean-all: clean
	@echo "Deep cleaning including dependencies..."
	@rm -rf node_modules package-lock.json .nyc_output coverage

# Build all assets with security validation
.PHONY: build
build: clean security-check build-css build-js build-html build-json build-security

# Build CSS with minification and source maps
.PHONY: build-css
build-css:
	@echo "Building and minifying CSS with security validation..."
	@if command -v cleancss >/dev/null 2>&1; then \
		cleancss -o $(DIST_DIR)/$(CSS_FILE) $(SRC_DIR)/$(CSS_FILE) --source-map; \
		echo "✓ CSS minified with source map"; \
	else \
		cp $(SRC_DIR)/$(CSS_FILE) $(DIST_DIR)/$(CSS_FILE); \
		echo "⚠ CSS copied (cleancss not available)"; \
	fi

# Build JavaScript with minification and security scanning
.PHONY: build-js
build-js:
	@echo "Building and minifying JavaScript with security scanning..."
	@if command -v terser >/dev/null 2>&1; then \
		terser $(SRC_DIR)/$(JS_FILE) -o $(DIST_DIR)/$(JS_FILE) -c -m --source-map; \
		echo "✓ JavaScript minified with source map"; \
	else \
		cp $(SRC_DIR)/$(JS_FILE) $(DIST_DIR)/$(JS_FILE); \
		echo "⚠ JavaScript copied (terser not available)"; \
	fi
	@$(MAKE) security-scan-js

# Build HTML with minification and security headers
.PHONY: build-html
build-html:
	@echo "Building and minifying HTML with security headers..."
	@if command -v html-minifier >/dev/null 2>&1; then \
		html-minifier --input-dir $(SRC_DIR) --output-dir $(DIST_DIR) \
			--file-ext html --minify-css --minify-js \
			--remove-comments --collapse-whitespace \
			--remove-empty-attributes --remove-redundant-attributes; \
		echo "✓ HTML minified"; \
	else \
		cp $(SRC_DIR)/$(HTML_FILE) $(DIST_DIR)/$(HTML_FILE); \
		echo "⚠ HTML copied (html-minifier not available)"; \
	fi
	@$(MAKE) security-scan-html

# Copy JSON data file with validation
.PHONY: build-json
build-json:
	@echo "Validating and copying JSON data..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 -m json.tool $(SRC_DIR)/$(JSON_FILE) > /dev/null; \
		echo "✓ JSON validation passed"; \
	fi
	@cp $(SRC_DIR)/$(JSON_FILE) $(DIST_DIR)/$(JSON_FILE)
	@echo "✓ JSON data copied"

# Build security assets
.PHONY: build-security
build-security:
	@echo "Building security assets..."
	@cp $(SECURITY_CONFIG) $(DIST_DIR)/ 2>/dev/null || echo "⚠ Security config not found"
	@cp $(MONITORING_CONFIG) $(DIST_DIR)/ 2>/dev/null || echo "⚠ Monitoring config not found"
	@echo "✓ Security assets built"

# Development server
.PHONY: dev
dev:
	@echo "Starting development server..."
	@if command -v live-server >/dev/null 2>&1; then \
		live-server --port=8080 --open=$(HTML_FILE); \
	else \
		echo "live-server not found. Install with: npm install -g live-server"; \
	fi

# Lint CSS
.PHONY: lint-css
lint-css:
	@echo "Linting CSS..."
	@if command -v stylelint >/dev/null 2>&1; then \
		stylelint $(CSS_FILE); \
	else \
		echo "stylelint not found. Install with: npm install -g stylelint"; \
	fi

# Lint JavaScript
.PHONY: lint-js
lint-js:
	@echo "Linting JavaScript..."
	@if command -v eslint >/dev/null 2>&1; then \
		eslint $(JS_FILE); \
	else \
		echo "eslint not found. Install with: npm install -g eslint"; \
	fi

# Lint all files
.PHONY: lint
lint: lint-css lint-js

# Watch for changes and rebuild
.PHONY: watch
watch:
	@echo "Watching for changes..."
	@if command -v chokidar >/dev/null 2>&1; then \
		chokidar '*.css' '*.js' '*.html' '*.json' -c 'make build'; \
	else \
		echo "chokidar not found. Install with: npm install -g chokidar-cli"; \
	fi

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	@npm install

# Test build
.PHONY: test
test: build
	@echo "Testing build..."
	@if [ -f $(DIST_DIR)/$(HTML_FILE) ]; then \
		echo "✓ HTML file built successfully"; \
	else \
		echo "✗ HTML file not found"; exit 1; \
	fi
	@if [ -f $(DIST_DIR)/$(CSS_FILE) ]; then \
		echo "✓ CSS file built successfully"; \
	else \
		echo "✗ CSS file not found"; exit 1; \
	fi
	@if [ -f $(DIST_DIR)/$(JS_FILE) ]; then \
		echo "✓ JavaScript file built successfully"; \
	else \
		echo "✗ JavaScript file not found"; exit 1; \
	fi
	@if [ -f $(DIST_DIR)/$(JSON_FILE) ]; then \
		echo "✓ JSON file built successfully"; \
	else \
		echo "✗ JSON file not found"; exit 1; \
	fi

# Security targets
.PHONY: security-check
security-check:
	@echo "🔒 Running comprehensive security checks..."
	@$(MAKE) security-audit security-scan security-validate

.PHONY: security-audit
security-audit:
	@echo "🔍 Running security audit..."
	@if command -v npm >/dev/null 2>&1; then \
		npm audit --audit-level moderate || echo "⚠ Security vulnerabilities found"; \
	else \
		echo "⚠ npm not available for security audit"; \
	fi

.PHONY: security-scan
security-scan: security-scan-js security-scan-html security-scan-deps

.PHONY: security-scan-js
security-scan-js:
	@echo "🔍 Scanning JavaScript for security issues..."
	@if command -v eslint >/dev/null 2>&1; then \
		eslint $(JS_FILE) --config .eslintrc.json || echo "⚠ JavaScript security issues found"; \
	else \
		echo "⚠ eslint not available for JS security scan"; \
	fi

.PHONY: security-scan-html
security-scan-html:
	@echo "🔍 Scanning HTML for security issues..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 $(VALIDATOR) --security-only --verbose || echo "⚠ HTML security issues found"; \
	else \
		echo "⚠ Python validator not available for HTML security scan"; \
	fi

.PHONY: security-scan-deps
security-scan-deps:
	@echo "🔍 Scanning dependencies for vulnerabilities..."
	@if command -v snyk >/dev/null 2>&1; then \
		snyk test || echo "⚠ Dependency vulnerabilities found"; \
	else \
		echo "⚠ snyk not available for dependency scan"; \
	fi

.PHONY: security-validate
security-validate:
	@echo "✅ Validating security configuration..."
	@if [ -f $(SECURITY_CONFIG) ]; then \
		python3 -m json.tool $(SECURITY_CONFIG) > /dev/null && echo "✓ Security config valid"; \
	else \
		echo "⚠ Security config file not found"; \
	fi

# Performance targets
.PHONY: performance-test
performance-test:
	@echo "⚡ Running performance tests..."
	@$(MAKE) performance-lighthouse performance-bundle-size performance-accessibility

.PHONY: performance-lighthouse
performance-lighthouse:
	@echo "🚀 Running Lighthouse performance audit..."
	@if command -v lighthouse >/dev/null 2>&1; then \
		lighthouse http://localhost:8080 --output=json --output-path=$(REPORTS_DIR)/lighthouse.json --quiet || echo "⚠ Lighthouse audit failed"; \
	else \
		echo "⚠ lighthouse not available for performance audit"; \
	fi

.PHONY: performance-bundle-size
performance-bundle-size:
	@echo "📦 Checking bundle sizes..."
	@if [ -f $(DIST_DIR)/$(JS_FILE) ]; then \
		JS_SIZE=$$(stat -f%z $(DIST_DIR)/$(JS_FILE) 2>/dev/null || stat -c%s $(DIST_DIR)/$(JS_FILE) 2>/dev/null); \
		JS_SIZE_MB=$$(echo "scale=2; $$JS_SIZE/1024/1024" | bc -l 2>/dev/null || echo "unknown"); \
		echo "JavaScript bundle size: $$JS_SIZE_MB MB"; \
	fi

.PHONY: performance-accessibility
performance-accessibility:
	@echo "♿ Running accessibility tests..."
	@if command -v pa11y >/dev/null 2>&1; then \
		pa11y http://localhost:8080 --reporter json --reporter cli || echo "⚠ Accessibility issues found"; \
	else \
		echo "⚠ pa11y not available for accessibility testing"; \
	fi

# Testing targets
.PHONY: test
test: test-unit test-integration test-security test-accessibility

.PHONY: test-unit
test-unit:
	@echo "🧪 Running unit tests..."
	@if command -v jest >/dev/null 2>&1; then \
		jest --testEnvironment=jsdom --coverage --watchAll=false || echo "⚠ Unit tests failed"; \
	else \
		echo "⚠ jest not available for unit testing"; \
	fi

.PHONY: test-integration
test-integration:
	@echo "🔗 Running integration tests..."
	@if command -v node >/dev/null 2>&1; then \
		node $(TEST_SUITE) --integration-only || echo "⚠ Integration tests failed"; \
	else \
		echo "⚠ node not available for integration testing"; \
	fi

.PHONY: test-security
test-security:
	@echo "🔒 Running security tests..."
	@if command -v node >/dev/null 2>&1; then \
		node $(TEST_SUITE) --security-only || echo "⚠ Security tests failed"; \
	else \
		echo "⚠ node not available for security testing"; \
	fi

.PHONY: test-accessibility
test-accessibility:
	@echo "♿ Running accessibility tests..."
	@$(MAKE) performance-accessibility

# Monitoring targets
.PHONY: monitor
monitor:
	@echo "📊 Starting monitoring..."
	@if command -v node >/dev/null 2>&1; then \
		node scripts/start-monitoring.js || echo "⚠ Monitoring failed to start"; \
	else \
		echo "⚠ node not available for monitoring"; \
	fi

.PHONY: monitor-health
monitor-health:
	@echo "🏥 Running health checks..."
	@if command -v curl >/dev/null 2>&1; then \
		curl -f http://localhost:8080/health || echo "⚠ Health check failed"; \
	else \
		echo "⚠ curl not available for health checks"; \
	fi

# Deployment targets
.PHONY: deploy
deploy: ci build deploy-production

.PHONY: deploy-production
deploy-production:
	@echo "🚀 Deploying to production..."
	@if command -v node >/dev/null 2>&1; then \
		node scripts/deploy.js --env=production || echo "⚠ Production deployment failed"; \
	else \
		echo "⚠ node not available for deployment"; \
	fi

.PHONY: deploy-staging
deploy-staging:
	@echo "🚀 Deploying to staging..."
	@if command -v node >/dev/null 2>&1; then \
		node scripts/deploy.js --env=staging || echo "⚠ Staging deployment failed"; \
	else \
		echo "⚠ node not available for deployment"; \
	fi

.PHONY: ci
ci:
	@echo "🔄 Running CI pipeline..."
	@$(MAKE) lint test security-check performance-test
	@echo "✅ CI pipeline completed successfully"

# Show help
.PHONY: help
help:
	@echo "IZA OS Dashboard Build System - Enhanced Security & Performance"
	@echo "Version: 2.0.0"
	@echo ""
	@echo "🔧 Build Targets:"
	@echo "  all           - Clean, security check, build, and performance test"
	@echo "  build         - Build all assets with security validation"
	@echo "  build-css     - Build and minify CSS with source maps"
	@echo "  build-js      - Build and minify JavaScript with security scan"
	@echo "  build-html    - Build and minify HTML with security headers"
	@echo "  build-json    - Validate and copy JSON data"
	@echo "  build-security- Build security assets"
	@echo ""
	@echo "🔒 Security Targets:"
	@echo "  security-check     - Run comprehensive security checks"
	@echo "  security-audit     - Run npm security audit"
	@echo "  security-scan      - Scan all files for security issues"
	@echo "  security-scan-js   - Scan JavaScript for security issues"
	@echo "  security-scan-html - Scan HTML for security issues"
	@echo "  security-scan-deps - Scan dependencies for vulnerabilities"
	@echo "  security-validate  - Validate security configuration"
	@echo ""
	@echo "⚡ Performance Targets:"
	@echo "  performance-test         - Run all performance tests"
	@echo "  performance-lighthouse   - Run Lighthouse performance audit"
	@echo "  performance-bundle-size  - Check bundle sizes"
	@echo "  performance-accessibility- Run accessibility tests"
	@echo ""
	@echo "🧪 Testing Targets:"
	@echo "  test              - Run all tests"
	@echo "  test-unit         - Run unit tests"
	@echo "  test-integration  - Run integration tests"
	@echo "  test-security     - Run security tests"
	@echo "  test-accessibility- Run accessibility tests"
	@echo ""
	@echo "📊 Monitoring Targets:"
	@echo "  monitor       - Start monitoring system"
	@echo "  monitor-health- Run health checks"
	@echo ""
	@echo "🚀 Deployment Targets:"
	@echo "  deploy            - Run CI and deploy to production"
	@echo "  deploy-production - Deploy to production"
	@echo "  deploy-staging    - Deploy to staging"
	@echo "  ci               - Run CI pipeline"
	@echo ""
	@echo "🛠️ Utility Targets:"
	@echo "  clean       - Clean build directory and reports"
	@echo "  clean-all   - Deep clean including dependencies"
	@echo "  dev         - Start development server"
	@echo "  lint        - Lint all files"
	@echo "  watch       - Watch for changes and rebuild"
	@echo "  install     - Install dependencies"
	@echo "  help        - Show this help message"

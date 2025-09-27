-- IZA OS Database Initialization Script
-- Creates the database and initial setup

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS iza_os;

-- Use the database
\c iza_os;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create initial admin user
INSERT INTO users (id, email, username, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
    uuid_generate_v4(),
    'admin@iza-os.com',
    'admin',
    crypt('admin123', gen_salt('bf')),
    'System',
    'Administrator',
    'ADMIN',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create initial agents
INSERT INTO agents (id, name, type, description, config, is_active, version, created_at, updated_at)
VALUES 
    (uuid_generate_v4(), 'Research Agent', 'RESEARCH', 'AI research and analysis agent', '{"model": "gpt-4", "temperature": 0.7}', true, '1.0.0', NOW(), NOW()),
    (uuid_generate_v4(), 'Analysis Agent', 'ANALYSIS', 'Data analysis and insights agent', '{"model": "gpt-4", "temperature": 0.5}', true, '1.0.0', NOW(), NOW()),
    (uuid_generate_v4(), 'Automation Agent', 'AUTOMATION', 'Process automation agent', '{"model": "gpt-4", "temperature": 0.3}', true, '1.0.0', NOW(), NOW()),
    (uuid_generate_v4(), 'Integration Agent', 'INTEGRATION', 'System integration agent', '{"model": "gpt-4", "temperature": 0.4}', true, '1.0.0', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Create initial integrations
INSERT INTO integrations (id, name, type, config, status, created_at, updated_at)
VALUES 
    (uuid_generate_v4(), 'Ollama AI', 'CUSTOM', '{"url": "http://ollama-ai:11434", "type": "ai"}', 'ACTIVE', NOW(), NOW()),
    (uuid_generate_v4(), 'N8N Workflows', 'CUSTOM', '{"url": "http://n8n-workflows:5679", "type": "workflow"}', 'ACTIVE', NOW(), NOW()),
    (uuid_generate_v4(), 'Omnara MCP', 'OMNARA', '{"url": "http://omnara-mcp:8080", "type": "mcp"}', 'ACTIVE', NOW(), NOW()),
    (uuid_generate_v4(), 'Quant Finance', 'CUSTOM', '{"url": "http://quant-finance:8086", "type": "finance"}', 'ACTIVE', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Create initial configuration
INSERT INTO configurations (id, key, value, category, is_secret, created_at, updated_at)
VALUES 
    (uuid_generate_v4(), 'ecosystem.value', '"$13.5B+"', 'ecosystem', false, NOW(), NOW()),
    (uuid_generate_v4(), 'ecosystem.automation_level', '"98%"', 'ecosystem', false, NOW(), NOW()),
    (uuid_generate_v4(), 'ecosystem.ventures', '82', 'ecosystem', false, NOW(), NOW()),
    (uuid_generate_v4(), 'ecosystem.repositories', '191', 'ecosystem', false, NOW(), NOW()),
    (uuid_generate_v4(), 'jwt.secret', '"your-secret-key-change-in-production"', 'security', true, NOW(), NOW()),
    (uuid_generate_v4(), 'encryption.key', '"your-encryption-key-change-in-production"', 'security', true, NOW(), NOW())
ON CONFLICT (key) DO NOTHING;

-- Create initial project
INSERT INTO projects (id, name, description, status, priority, budget, user_id, created_at, updated_at)
SELECT 
    uuid_generate_v4(),
    'IZA OS Enterprise',
    'Autonomous venture studio ecosystem',
    'ACTIVE',
    1,
    13500000000.00,
    u.id,
    NOW(),
    NOW()
FROM users u 
WHERE u.email = 'admin@iza-os.com'
ON CONFLICT DO NOTHING;

-- Create initial venture
INSERT INTO ventures (id, name, description, industry, stage, status, valuation, funding, user_id, created_at, updated_at)
SELECT 
    uuid_generate_v4(),
    'IZA OS Platform',
    'AI-powered autonomous venture studio platform',
    'Technology',
    'SCALE',
    'ACTIVE',
    13500000000.00,
    50000000.00,
    u.id,
    NOW(),
    NOW()
FROM users u 
WHERE u.email = 'admin@iza-os.com'
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE iza_os TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

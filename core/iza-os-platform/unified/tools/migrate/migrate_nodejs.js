#!/usr/bin/env node
/**
 * Node.js Project Migration Script
 * Migrates existing Node.js projects to standardized stack
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function migrateNodeProject() {
    console.log('📦 Migrating Node.js project to standardized stack...');
    
    // Update package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Update dependencies
        packageJson.dependencies = {
            ...packageJson.dependencies,
            'next': '^15.0.0',
            'react': '^19.0.0',
            'react-dom': '^19.0.0',
            'typescript': '^5.1.0'
        };
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Updated package.json');
        
        // Install dependencies
        try {
            execSync('npm install', { stdio: 'inherit' });
            console.log('✅ Dependencies installed');
        } catch (error) {
            console.error('❌ Failed to install dependencies:', error.message);
        }
    }
    
    console.log('✅ Node.js migration completed!');
}

migrateNodeProject();

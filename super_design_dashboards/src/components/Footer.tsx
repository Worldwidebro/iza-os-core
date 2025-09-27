import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Heart, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass rounded-t-3xl mt-12 mx-4"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient-primary">IZA OS</h3>
                <p className="text-sm text-gray-600">Autonomous Agent System</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enterprise-grade AI development platform powered by autonomous agents 
              working 24/7 to build, deploy, and optimize your digital empire.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <div className="space-y-2">
              <a href="#agents" className="block text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Agent System
              </a>
              <a href="#metrics" className="block text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Performance Metrics
              </a>
              <a href="#deployment" className="block text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Auto-Deployment
              </a>
              <a href="#monitoring" className="block text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Health Monitoring
              </a>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Connect</h4>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/iza-os"
                className="p-2 rounded-xl bg-white/10 text-gray-600 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com/iza_os"
                className="p-2 rounded-xl bg-white/10 text-gray-600 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com/company/iza-os"
                className="p-2 rounded-xl bg-white/10 text-gray-600 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with AI agents</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} IZA OS Development Team. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#privacy" className="hover:text-blue-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-blue-600 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#support" className="hover:text-blue-600 transition-colors duration-200">
                Support
              </a>
            </div>
            <div className="text-sm text-gray-500">
              Version 3.0.0 | Built with React & TypeScript
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

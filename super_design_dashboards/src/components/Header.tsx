import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Settings, BarChart3, Workflow } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Bot },
    { path: '/flow', label: 'Agent Flow', icon: Workflow },
    { path: '/metrics', label: 'Metrics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 glass rounded-b-3xl mx-4 mt-4"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary">
                IZA OS
              </h1>
              <p className="text-sm text-gray-600">Autonomous Agent System</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-600 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-xl bg-white/10 text-gray-600 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

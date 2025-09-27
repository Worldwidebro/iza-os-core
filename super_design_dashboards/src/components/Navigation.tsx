import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Brain,
  Settings,
  Zap,
  BarChart2,
  GitBranch,
  Cog,
  Users,
  Menu,
  X,
  Cpu,
  Rocket,
  Star,
  Link,
  PieChart,
  Shield,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { useAgentSystem } from '../hooks/useAgentSystem';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  status?: 'online' | 'offline' | 'warning' | 'beta';
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, status }) => {
  const statusColor = status === 'online' ? 'bg-green-500' :
                      status === 'offline' ? 'bg-red-500' :
                      status === 'warning' ? 'bg-yellow-500' :
                      status === 'beta' ? 'bg-blue-500' : '';
  const statusText = status === 'online' ? 'Online' :
                     status === 'offline' ? 'Offline' :
                     status === 'warning' ? 'Warning' :
                     status === 'beta' ? 'Beta' : '';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center px-3 py-2 rounded-lg transition-all duration-200 group text-sm
        ${isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <Icon className="w-4 h-4 mr-2 md:w-5 md:h-5 md:mr-3" />
      <span className="font-medium hidden sm:inline">{label}</span>
      <span className="font-medium sm:hidden">{label.split(' ')[0]}</span>
      {status && (
        <span className={`ml-auto w-2 h-2 rounded-full ${statusColor} group-hover:scale-125 transition-transform`} title={statusText}></span>
      )}
      <span className="absolute left-full ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px] transition-all duration-200 text-sm text-gray-200 bg-gray-800 px-3 py-1 rounded-md pointer-events-none hidden lg:block">
        {label}
      </span>
    </NavLink>
  );
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { metrics } = useAgentSystem();

  const totalAgents = metrics?.agents?.total || 0;
  const activeAgents = metrics?.agents?.active || 0;
  const automationLevel = (metrics?.business?.automation_level * 100 || 0).toFixed(0);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800/80 to-purple-900/80 backdrop-blur-lg shadow-xl"
    >
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center text-white text-lg md:text-2xl font-bold mr-4 md:mr-8">
            <Cpu className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 text-blue-400" />
            <span className="hidden sm:inline">IZA OS</span>
            <span className="sm:hidden">IZA</span>
          </NavLink>
          <div className="hidden md:flex space-x-2 md:space-x-4">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" status="online" />
            <NavItem to="/integrations" icon={Link} label="Integrations" status="online" />
            <NavItem to="/analytics" icon={PieChart} label="Analytics" status="online" />
            <NavItem to="/management" icon={Shield} label="Management" status="online" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 md:space-x-4 text-gray-300 text-xs md:text-sm">
          <span className="flex items-center">
            <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-300" />
            <span className="hidden lg:inline">Agents: </span>{activeAgents}/{totalAgents}
          </span>
          <span className="flex items-center">
            <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 text-purple-300" />
            <span className="hidden lg:inline">Auto: </span>{automationLevel}%
          </span>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Status Indicators */}
          <div className="flex items-center space-x-1 text-xs text-gray-300">
            <Users className="w-3 h-3 text-blue-300" />
            <span>{activeAgents}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-300">
            <Zap className="w-3 h-3 text-purple-300" />
            <span>{automationLevel}%</span>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-slate-800/90 backdrop-blur-lg pb-4"
        >
          <div className="flex flex-col space-y-1 px-2">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" status="online" />
            <NavItem to="/integrations" icon={Link} label="Integrations" status="online" />
            <NavItem to="/analytics" icon={PieChart} label="Analytics" status="online" />
            <NavItem to="/management" icon={Shield} label="Management" status="online" />
            <NavItem to="/agents" icon={Brain} label="Agents" status="online" />
            <NavItem to="/flow" icon={GitBranch} label="Flow" status="online" />
            <NavItem to="/metrics" icon={BarChart2} label="Metrics" status="online" />
            <NavItem to="/settings" icon={Cog} label="Settings" status="online" />
          </div>
          
          {/* Mobile Device Indicator */}
          <div className="flex justify-center items-center mt-4 text-gray-300 text-xs border-t border-white/10 pt-4 mx-4">
            <Smartphone className="w-4 h-4 mr-2" />
            <span>Mobile Optimized</span>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Lightbulb, Gamepad2, Award, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/tips', icon: Lightbulb, label: 'Советы' },
    { path: '/games', icon: Gamepad2, label: 'Игры' },
    { path: '/progress', icon: Award, label: 'Прогресс' },
    { path: '/profile', icon: User, label: 'Профиль' }
  ];

  // Цветовая схема
  const activeColor = 'text-[#3498DB]';
  const inactiveColor = 'text-[#95A5A6]';
  const activeBg = 'bg-[#3498DB]';

  return (
    <motion.nav
      className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-100 shadow-lg z-[100]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                to={item.path} 
                key={item.path} 
                className="relative flex-1 min-w-[60px] flex justify-center"
              >
                <motion.div
                  className="flex flex-col items-center p-2 w-full"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon 
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${isActive ? activeColor : inactiveColor}`} 
                  />
                  <span 
                    className={`text-[10px] sm:text-xs mt-1 transition-colors ${isActive ? `font-semibold ${activeColor}` : inactiveColor}`}
                  >
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      className={`absolute -bottom-1 left-0 right-0 mx-auto ${activeBg} h-1 rounded-full`}
                      style={{ width: '60%' }}
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
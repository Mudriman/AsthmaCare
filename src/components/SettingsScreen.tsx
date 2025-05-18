import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Moon, Volume2, HelpCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const SettingsScreen: React.FC = () => {

  const { logout, user } =useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Точно выйти из аккаунта?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-12">
      <div className="flex items-center mb-6">
        <Link to="/profile">
          <motion.div whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </motion.div>
        </Link>
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-600">
            Уведомления
          </h2>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-[#4FC3F7] mr-3" />
                <span>Ежедневные напоминания</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-[#4FC3F7] mr-3" />
                <span>Предупреждения о рисках</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-600">
            Приложение
          </h2>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Moon className="h-5 w-5 text-[#E1BEE7] mr-3" />
                <span>Темная тема</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-[#E1BEE7] mr-3" />
                <span>Звуковые эффекты</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-600">
            Поддержка
          </h2>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-[#FFCA28] mr-3" />
                <span>Помощь</span>
              </div>
              <motion.div whileHover={{
              x: 3
            }} whileTap={{
              x: -3
            }}>
                <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
              </motion.div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-[#FFCA28] mr-3" />
                <span>Выйти</span>
              </div>
              <motion.div whileHover={{
              x: 3
            }} whileTap={{
              x: -3
            }}
              onClick={handleLogout}
              >
                <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto text-center text-gray-400 text-sm py-4">
        ChronCare v1.0.0
      </div>
    </div>
    );
};
export default SettingsScreen;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const avatars = [
  'https://img.freepik.com/free-vector/cute-boy-with-scarf-cartoon-vector-icon-illustration_138676-5890.jpg',
  'https://img.freepik.com/free-vector/cute-girl-gaming-holding-controller-cartoon-vector-icon-illustration_138676-5779.jpg',
  'https://img.freepik.com/free-vector/cute-boy-thumbs-up-cartoon-vector-icon-illustration_138676-5868.jpg',
  'https://img.freepik.com/free-vector/cute-girl-with-hat-cartoon-vector-icon-illustration_138676-5825.jpg',
  'https://img.freepik.com/free-vector/cute-astronaut-with-peace-hand-cartoon-vector-icon-illustration_138676-3497.jpg'
];

const ProfileScreen: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  
  return (
    <div className="flex flex-col h-full w-full bg-white pb-20">
      {/* Основной контент с ограничением ширины */}
      <div className="mx-auto w-full max-w-2xl px-4 pt-12">
        {/* Шапка профиля */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Профиль</h1>
          <Link to="/settings">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </motion.div>
          </Link>
        </div>

        {/* Аватар и информация */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <motion.img 
              src={avatars[selectedAvatar]} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full border-4 border-[#4FC3F7] object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 bg-[#4CAF50] rounded-full p-1 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="h-4 w-4 text-white" />
            </motion.div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Алексей</h2>
          <p className="text-gray-600 text-sm">Уровень 3</p>
        </div>

        {/* Выбор аватара */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Выберите аватар</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {avatars.map((avatar, index) => (
              <motion.img 
                key={index} 
                src={avatar} 
                alt={`Avatar ${index + 1}`} 
                className={`w-14 h-14 rounded-full cursor-pointer object-cover border-2 transition-all ${
                  selectedAvatar === index ? 'border-[#4CAF50] scale-105' : 'border-transparent'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>
        </div>

        {/* Карточки информации */}
        <div className="space-y-4">
          {/* Индекс здоровья */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
            whileHover={{ y: -2 }}
          >
            <h3 className="font-semibold text-gray-800 mb-3">Индекс здоровья</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#4CAF50] flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">75</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Хороший</p>
                  <p className="text-xs text-gray-500">5 дней без приступов</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Онбординг */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
            whileHover={{ y: -2 }}
          >
            <h3 className="font-semibold text-gray-800 mb-3">Онбординг</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#E1BEE7] flex items-center justify-center mr-3">
                  <span className="text-[#673AB7] font-bold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Пройден</p>
                  <p className="text-xs text-gray-500">Все вопросы заполнены</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Квесты */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
            whileHover={{ y: -2 }}
          >
            <h3 className="font-semibold text-gray-800 mb-3">Квесты</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-[#FFCA28] mr-3" />
                  <span className="text-gray-700">Дыхательная практика</span>
                </div>
                <div className="flex">
                  <span className="text-[#FFCA28]">★★★</span>
                  <span className="text-gray-200">★★</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-[#FFCA28] mr-3" />
                  <span className="text-gray-700">Идентификация триггеров</span>
                </div>
                <div className="flex">
                  <span className="text-[#FFCA28]">★★</span>
                  <span className="text-gray-200">★★★</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
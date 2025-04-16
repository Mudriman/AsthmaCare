import React from 'react';
import { motion } from 'framer-motion';
import { Wind, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GamesScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white pb-20">
      {/* Основной контент с ограничением ширины */}
      <div className="mx-auto w-full max-w-2xl px-4 pt-12">
        <h1 className="text-2xl font-bold mb-6">Игры</h1>

        {/* Анимированный чат-бот */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <motion.img
              src="https://img.freepik.com/free-vector/cute-boy-with-scarf-cartoon-vector-icon-illustration_138676-5890.jpg"
              alt="Astma-bot"
              className="w-16 h-16 mr-3 rounded-full object-cover"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="bg-white rounded-xl shadow-md p-3 max-w-[70%]">
              <p className="text-sm">
                Привет! Выбери игру, которая поможет улучшить твоё здоровье!
              </p>
            </div>
          </div>
        </div>

        {/* Карточка игры 1 */}
        <Link to="/games/breathing">
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 mb-5 border-2 border-transparent hover:border-[#4FC3F7] transition-colors"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mr-3">
                  <div className="h-6 w-6 text-[#4CAF50]" />
                </div>
                <h3 className="text-lg font-semibold">Дыхательный ритм</h3>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Бегите по лесу и правильно дышите, избегая триггеров
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xs font-medium bg-[#E8F5E9] text-[#4CAF50] py-1 px-2 rounded-full">
                  Лёгкий
                </span>
              </div>
              <div className="flex">
                <span className="text-[#FFCA28]">★★★</span>
                <span className="text-gray-300">★★</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Карточка игры 2 */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-4 mb-5 border-2 border-transparent hover:border-[#4FC3F7] transition-colors"
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF8E1] flex items-center justify-center mr-3">
                <Wind className="h-6 w-6 text-[#FFCA28]" />
              </div>
              <h3 className="text-lg font-semibold">Триггер-охота</h3>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Найдите и устраните триггеры астмы в разных сценариях
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium bg-[#FFF8E1] text-[#FFCA28] py-1 px-2 rounded-full">
                Средний
              </span>
            </div>
            <div className="flex">
              <span className="text-[#FFCA28]">★★</span>
              <span className="text-gray-300">★★★</span>
            </div>
          </div>
        </motion.div>

        {/* Карточка игры 3: 5 Слов */}
      <Link to="/games/five-words">
        <motion.div
          className="bg-white rounded-xl shadow-md p-4 mb-5 border-2 border-transparent hover:border-[#4FC3F7] transition-colors"
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mr-3">
                <BookOpen className="h-6 w-6 text-[#3498DB]" />
              </div>
              <h3 className="text-lg font-semibold">5 Слов</h3>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Угадайте слово из 5 букв за 5 попыток
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium bg-[#E3F2FD] text-[#3498DB] py-1 px-2 rounded-full">
                Лёгкий
              </span>
            </div>
            <div className="flex">
              <span className="text-[#FFCA28]">★★★</span>
              <span className="text-gray-300">★★</span>
            </div>
          </div>
        </motion.div>
      </Link>

      </div>

      {/* Ежедневная цель (прилипает к низу) */}
      <div className="mt-auto mx-auto w-full max-w-2xl px-4">
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ежедневная цель</h3>
              <p className="text-sm text-gray-600">
                Сыграйте в одну игру сегодня
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-2">0/1</span>
              <div className="w-10 h-10 rounded-full bg-[#E1BEE7] flex items-center justify-center">
                <span className="text-[#673AB7]">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesScreen;
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Check } from 'lucide-react';

const ProgressScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white pb-20 min-w-[320px]">
      {/* Основной контент с ограничением ширины */}
      <div className="mx-auto w-full max-w-2xl px-4 pt-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Прогресс</h1>

        {/* Блок уровня */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Уровень 3</h2>
            <div className="bg-[#E1BEE7] text-[#673AB7] text-xs font-medium py-1 px-2 rounded-full">
              125 XP
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mb-2">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#4CAF50] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>125 XP</span>
            <span>200 XP до уровня 4</span>
          </div>
        </motion.div>

        {/* Достижения */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Достижения</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {[
              { name: 'Новичок', icon: '🌱', unlocked: true },
              { name: 'Дыхательный мастер', icon: '🌬️', unlocked: true },
              { name: 'Знаток триггеров', icon: '🔍', unlocked: false },
              { name: 'Неделя без приступов', icon: '📅', unlocked: false },
              { name: 'Эксперт по лекарствам', icon: '💊', unlocked: true },
              { name: 'Социальная бабочка', icon: '🦋', unlocked: false }
            ].map((achievement, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-white shadow-sm border border-gray-100' 
                    : 'bg-gray-50'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    achievement.unlocked 
                      ? 'bg-[#FFF8E1] shadow-inner' 
                      : 'bg-gray-200'
                  }`}
                  animate={
                    achievement.unlocked 
                      ? {
                          boxShadow: [
                            '0px 0px 0px rgba(255,202,40,0)',
                            '0px 0px 8px rgba(255,202,40,0.3)',
                            '0px 0px 0px rgba(255,202,40,0)'
                          ]
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <span className="text-xl">{achievement.icon}</span>
                </motion.div>
                <p className={`text-xs text-center ${
                  achievement.unlocked 
                    ? 'font-medium text-gray-800' 
                    : 'text-gray-500'
                }`}>
                  {achievement.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Дерево квестов */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Дерево квестов</h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-[#E1BEE7] sm:transform sm:-translate-x-1/2 z-0" />
            {[
              {
                title: 'Начало пути',
                description: 'Пройдите онбординг',
                completed: true
              },
              {
                title: 'Первая игра',
                description: 'Сыграйте в дыхательную игру',
                completed: true
              },
              {
                title: 'Мастер советов',
                description: 'Выполните 5 советов',
                completed: false
              },
              {
                title: 'Неделя практики',
                description: 'Играйте 7 дней подряд',
                completed: false
              }
            ].map((quest, index) => (
              <motion.div 
                key={index}
                className="flex mb-6 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 ${
                  quest.completed 
                    ? 'bg-[#4CAF50]' 
                    : 'bg-white border-2 border-[#E1BEE7]'
                }`}>
                  {quest.completed ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  ) : (
                    <span className="font-bold text-[#673AB7] text-sm sm:text-base">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`bg-white rounded-lg shadow-sm p-3 ${
                    quest.completed 
                      ? 'border-l-2 sm:border-l-4 border-l-[#4CAF50]' 
                      : 'border border-gray-100'
                  }`}>
                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                      {quest.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {quest.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {quest.completed ? (
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFCA28] fill-[#FFCA28]" 
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="bg-[#E1BEE7] text-[#673AB7] text-xs font-medium py-0.5 px-2 rounded-full">
                            +15 XP
                          </div>
                        )}
                      </div>
                      {quest.completed && (
                        <div className="bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium py-0.5 px-2 rounded-full">
                          Завершено
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
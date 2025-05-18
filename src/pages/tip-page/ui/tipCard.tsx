import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { iconMap } from '../utils/tipUtils';
import { Tip } from '@/types';

interface TipCardProps {
  tip: Tip;
  isCompleted: (tipId: string) => boolean;
  handleToggleComplete: (tipId: string) => void;
}

export const TipCard: React.FC<TipCardProps> = ({ tip, isCompleted, handleToggleComplete }) => {
  const Icon = iconMap[tip.id as keyof typeof iconMap] || iconMap.tip1;
  const completed = isCompleted(tip.id);

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md p-4 border-l-4 ${completed ? 'border-l-[#4CAF50]' : ''}`}
      whileHover={{ scale: 1.02, y: -3 }}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: completed ? '#E8F5E9' : tip.bgColor }}
            >
              {completed ? (
                <Check className="h-5 w-5 text-[#4CAF50]" />
              ) : (
                <Icon className="h-5 w-5" style={{ color: tip.iconColor }} />
              )}
            </div>
            <h3 className="font-semibold">{tip.title}</h3>
          </div>
          <p className="text-gray-600 text-sm ml-13 pl-13">{tip.description}</p>
        </div>
        <motion.button
          className={`self-start ml-3 px-3 py-1 rounded-full text-sm font-medium ${
            completed ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#E1BEE7] text-[#673AB7]'
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleToggleComplete(tip.id)}
        >
          {completed ? 'Выполнено' : 'Выполнить'}
        </motion.button>
      </div>
      {completed && (
        <motion.div
          className="mt-2 ml-13 pl-13"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <span className="text-xs bg-[#E8F5E9] text-[#4CAF50] py-1 px-2 rounded-full mr-2">
              +5 XP
            </span>
            <div className="relative">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.random() * 40 - 20,
                    y: Math.random() * -30 - 10,
                    opacity: [1, 0],
                    scale: [0, 1.5],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  ✨
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
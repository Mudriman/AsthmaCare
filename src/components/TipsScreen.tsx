import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Thermometer, Wind } from 'lucide-react';
const TipsScreen: React.FC = () => {
  const [completedTips, setCompletedTips] = useState<string[]>([]);
  const handleComplete = (tipId: string) => {
    if (completedTips.includes(tipId)) {
      setCompletedTips(completedTips.filter(id => id !== tipId));
    } else {
      setCompletedTips([...completedTips, tipId]);
    }
  };
  const tips = [{
    id: 'tip1',
    title: 'Держите ингалятор рядом',
    description: 'Всегда имейте ингалятор при себе, особенно в периоды высокого риска',
    icon: AlertTriangle,
    iconColor: '#F44336',
    bgColor: '#FFEBEE'
  }, {
    id: 'tip2',
    title: 'Избегайте холодного воздуха',
    description: 'При выходе на улицу в холодную погоду используйте шарф, чтобы прикрыть нос и рот',
    icon: Thermometer,
    iconColor: '#4FC3F7',
    bgColor: '#E1F5FE'
  }, {
    id: 'tip3',
    title: 'Следите за качеством воздуха',
    description: 'Проверяйте индекс качества воздуха перед выходом на улицу',
    icon: Wind,
    iconColor: '#4CAF50',
    bgColor: '#E8F5E9'
  }];
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-12">
      <h1 className="text-2xl font-bold mb-6">Советы дня</h1>
      <div className="space-y-4">
        {tips.map(tip => {
        const isCompleted = completedTips.includes(tip.id);
        return <motion.div key={tip.id} className={`bg-white rounded-xl shadow-md p-4 border-l-4 ${isCompleted ? 'border-l-[#4CAF50]' : `border-l-[${tip.iconColor}]`}`} whileHover={{
          scale: 1.02,
          y: -3
        }}>
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3`} style={{
                  backgroundColor: isCompleted ? '#E8F5E9' : tip.bgColor
                }}>
                      {isCompleted ? <Check className="h-5 w-5 text-[#4CAF50]" /> : <tip.icon className={`h-5 w-5`} style={{
                    color: tip.iconColor
                  }} />}
                    </div>
                    <h3 className="font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-13 pl-13">
                    {tip.description}
                  </p>
                </div>
                <motion.button className={`self-start ml-3 px-3 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#E1BEE7] text-[#673AB7]'}`} whileTap={{
              scale: 0.95
            }} onClick={() => handleComplete(tip.id)}>
                  {isCompleted ? 'Выполнено' : 'Выполнить'}
                </motion.button>
              </div>
              {isCompleted && <motion.div className="mt-2 ml-13 pl-13" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.3
          }}>
                  <div className="flex items-center">
                    <span className="text-xs bg-[#E8F5E9] text-[#4CAF50] py-1 px-2 rounded-full mr-2">
                      +5 XP
                    </span>
                    <div className="relative">
                      {[...Array(5)].map((_, i) => <motion.span key={i} className="absolute" initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0
                }} animate={{
                  x: Math.random() * 40 - 20,
                  y: Math.random() * -30 - 10,
                  opacity: [1, 0],
                  scale: [0, 1.5]
                }} transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}>
                          ✨
                        </motion.span>)}
                    </div>
                  </div>
                </motion.div>}
            </motion.div>;
      })}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Прогресс</h2>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span>Выполнено советов</span>
            <span className="font-bold">
              {completedTips.length}/{tips.length}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#4CAF50] rounded-full" style={{
            width: `${completedTips.length / tips.length * 100}%`
          }} />
          </div>
          {completedTips.length === tips.length && <motion.div className="mt-3 text-center text-[#4CAF50] font-medium" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }}>
              Отлично! Все советы выполнены!
            </motion.div>}
        </div>
      </div>
    </div>
    );
};
export default TipsScreen;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Wind, Droplets, AlertTriangle, Activity } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const getRiskColor = (risk: number) => {
  if (risk < 30) return {
    color: '#27AE60',
    text: 'Низкий риск',
    description: 'Все хорошо'
  };
  if (risk < 60) return {
    color: '#F39C12',
    text: 'Средний риск',
    description: 'Будьте осторожны'
  };
  return {
    color: '#E74C3C',
    text: 'Высокий риск',
    description: 'Требуется внимание'
  };
};


const MainScreen: React.FC = () => {
  const {
    predictAttack
  } = useApp();
  const [showPrediction, setShowPrediction] = useState(false);
  const [prediction, setPrediction] = useState<{
    risk: number;
    factors: string[];
  } | null>(null);
  const [risk] = useState(60);
  const [daysWithoutAttacks] = useState(5);
  const [graphProgress, setGraphProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setGraphProgress(1), 500);
    return () => clearTimeout(timer);
  }, []);
  const handlePredictClick = () => {
    const result = predictAttack();
    setPrediction(result);
    setShowPrediction(true);
  };


  return <div className="flex flex-col h-full w-full bg-[#ECF0F1] p-4 md:p-6 pt-12 max-w-2xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-[#2C3E50]">Привет, Алексей!</h1>
      <motion.div className="bg-white p-2 rounded-full shadow-sm" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
        <Activity className="h-6 w-6 text-[#3498DB]" />
      </motion.div>
    </div>
    <motion.div className="bg-white rounded-2xl shadow-sm p-6 mb-4" initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }}>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#EEE" strokeWidth="8" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke={getRiskColor(risk).color} strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - 283 * risk / 100} initial={{
              strokeDashoffset: 283
            }} animate={{
              strokeDashoffset: 283 - 283 * risk / 100
            }} transition={{
              duration: 1,
              ease: 'easeOut'
            }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#2C3E50]">{risk}%</span>
            <span className="text-sm text-[#7F8C8D]">
              {getRiskColor(risk).text}
            </span>
          </div>
        </div>
        <button onClick={handlePredictClick} className="w-full py-3 px-6 bg-[#3498DB] text-white rounded-xl font-medium
                     transition-all duration-200 hover:bg-[#2980B9] focus:outline-none focus:ring-2 
                     focus:ring-[#3498DB] focus:ring-opacity-50">
          Прогноз риска
        </button>
      </div>
    </motion.div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <motion.div className="bg-white rounded-xl p-4 shadow-sm" initial={{
        x: -20,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
        <div className="flex items-center justify-between mb-2">
          <LineChart className="h-5 w-5 text-[#3498DB]" />
          <span className="text-lg font-bold text-[#2C3E50]">
            {daysWithoutAttacks}
          </span>
        </div>
        <p className="text-sm text-[#7F8C8D]">Дней без приступов</p>
      </motion.div>
      <motion.div className="bg-white rounded-xl p-4 shadow-sm" initial={{
        x: 20,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} transition={{
        delay: 0.3
      }}>
        <div className="flex items-center justify-between mb-2">
          <Wind className="h-5 w-5 text-[#F39C12]" />
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-[#FFF8E1] text-[#F39C12]">
            Высокий
          </span>
        </div>
        <p className="text-sm text-[#7F8C8D]">Уровень пыльцы</p>
      </motion.div>
    </div>
    <motion.div className="bg-white rounded-xl p-4 shadow-sm mb-4" initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.4
    }}>
      <h3 className="font-semibold text-[#2C3E50] mb-3">Погодные условия</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-[#3498DB] mr-2" />
          <div>
            <p className="text-sm text-[#7F8C8D]">Влажность</p>
            <p className="font-medium text-[#2C3E50]">75%</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-[#3498DB] mr-2" />
          <div>
            <p className="text-sm text-[#7F8C8D]">Ветер</p>
            <p className="font-medium text-[#2C3E50]">3 м/с</p>
          </div>
        </div>
      </div>
    </motion.div>
    <AnimatePresence>
      {showPrediction && prediction && <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setShowPrediction(false)}>
        <motion.div className="bg-white rounded-2xl p-6 w-full max-w-md" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()}>
          <h3 className="text-xl font-bold mb-4 text-[#2C3E50]">
            Прогноз риска
          </h3>
          <div className="flex items-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${prediction.risk > 50 ? 'bg-[#E74C3C]' : 'bg-[#27AE60]'}`}>
              <span className="text-white text-xl font-bold">
                {prediction.risk}%
              </span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-[#2C3E50]">
                {prediction.risk > 50 ? 'Высокий риск' : 'Низкий риск'}
              </p>
              <p className="text-sm text-[#7F8C8D]">
                На основе текущих факторов
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {prediction.factors.map((factor, index) => <div key={index} className="flex items-center text-sm">
              <AlertTriangle className="w-4 h-4 text-[#F39C12] mr-2" />
              <span className="text-[#2C3E50]">{factor}</span>
            </div>)}
          </div>
          <button className="mt-6 w-full py-3 bg-[#3498DB] text-white rounded-xl font-medium
                         hover:bg-[#2980B9] transition-colors duration-200" onClick={() => setShowPrediction(false)}>
            Понятно
          </button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </div>;
};
export default MainScreen;
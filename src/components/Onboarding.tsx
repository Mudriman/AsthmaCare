import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
interface OnboardingProps {
  onComplete: () => void;
}
const questions = [{
  id: 1,
  question: 'Как часто у вас бывают приступы астмы?',
  options: ['Редко', 'Иногда', 'Часто', 'Очень часто']
}, {
  id: 2,
  question: 'Что обычно провоцирует ваши приступы?',
  options: ['Пыльца', 'Холодный воздух', 'Физическая активность', 'Стресс', 'Другое']
}, {
  id: 3,
  question: 'Как давно вам поставили диагноз?',
  options: ['Менее года', '1-5 лет', '5-10 лет', 'Более 10 лет']
}, {
  id: 4,
  question: 'Используете ли вы ингалятор?',
  options: ['Да, регулярно', 'Да, иногда', 'Редко', 'Нет']
}, {
  id: 5,
  question: 'Какие симптомы беспокоят вас больше всего?',
  options: ['Одышка', 'Кашель', 'Свистящее дыхание', 'Боль в груди', 'Усталость']
}];
const Onboarding: React.FC<OnboardingProps> = ({
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  const handleSelectOption = (option: string) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: option
    });
  };
  const progress = (currentStep + 1) / questions.length * 100;
  return <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#ECF0F1]">
      <motion.div className="w-full max-w-md" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <div className="text-center mb-8">
          <motion.h1 className="text-3xl font-bold text-[#2C3E50]" initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.5
        }}>
            ChronCare
          </motion.h1>
          <motion.p className="text-[#7F8C8D] mt-2" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            Ваш персональный помощник
          </motion.p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#7F8C8D]">
                Шаг {currentStep + 1} из {questions.length}
              </span>
              <span className="text-sm font-medium text-[#3498DB]">
                {progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#EEE] rounded-full">
              <motion.div className="h-full bg-[#3498DB] rounded-full" initial={{
              width: 0
            }} animate={{
              width: `${progress}%`
            }} transition={{
              duration: 0.5
            }} />
            </div>
          </div>
          <motion.div key={currentStep} initial={{
          x: 50,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} exit={{
          x: -50,
          opacity: 0
        }}>
            <h2 className="text-2xl font-semibold mb-6 text-[#2C3E50]">
              {questions[currentStep].question}
            </h2>
            <div className="space-y-3">
              {questions[currentStep].options.map(option => {
              const isSelected = answers[questions[currentStep].id] === option;
              return <motion.button key={option} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors
                      ${isSelected ? 'border-[#3498DB] bg-[#EBF5FB]' : 'border-gray-200 hover:border-[#BDC3C7]'}`} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleSelectOption(option)}>
                    <span className={`${isSelected ? 'text-[#2C3E50]' : 'text-[#7F8C8D]'}`}>
                      {option}
                    </span>
                    {isSelected && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}>
                        <Check className="h-5 w-5 text-[#3498DB]" />
                      </motion.div>}
                  </motion.button>;
            })}
            </div>
          </motion.div>
        </div>
        <motion.button className={`w-full py-4 px-6 bg-[#3498DB] text-white font-semibold rounded-xl
            flex items-center justify-center transition-colors
            ${answers[questions[currentStep].id] ? 'hover:bg-[#2980B9]' : 'opacity-50 cursor-not-allowed'}`} whileHover={answers[questions[currentStep].id] ? {
        scale: 1.02
      } : {}} whileTap={answers[questions[currentStep].id] ? {
        scale: 0.98
      } : {}} onClick={handleNext} disabled={!answers[questions[currentStep].id]}>
          {currentStep < questions.length - 1 ? <>
              Далее
              <ArrowRight className="ml-2 h-5 w-5" />
            </> : 'Завершить'}
        </motion.button>
        <motion.div className="mt-6 text-center text-[#7F8C8D] text-sm" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5
      }}>
          Ваши ответы помогут нам настроить приложение под ваши потребности
        </motion.div>
      </motion.div>
    </div>;
};
export default Onboarding;
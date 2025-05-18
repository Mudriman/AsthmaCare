// components/RiskCircle.tsx
import { motion } from 'framer-motion';
import { getRiskColor } from '@/pages/main-page/utils/getRiskColor';

export const RiskCircle = ({ risk }: { risk: number }) => {
  const { color, text } = getRiskColor(risk);

  return (
    <div className="relative w-40 h-40 mb-4">
      <svg className="transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#EEE" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * risk) / 100}
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - (283 * risk) / 100 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-[#2C3E50]">{risk}%</span>
        <span className="text-sm text-[#7F8C8D]">{text}</span>
      </div>
    </div>
  );
};

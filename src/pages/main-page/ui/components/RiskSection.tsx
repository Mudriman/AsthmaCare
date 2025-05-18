import { motion } from 'framer-motion';
import { RiskCircle } from '@/pages/main-page/ui';

interface RiskSectionProps {
  risk: number;
  onPredictClick: () => void;
}

export const RiskSection = ({ risk, onPredictClick }: RiskSectionProps) => (
  <motion.div
    className="bg-white rounded-2xl shadow-sm p-6 mb-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
  >
    <div className="flex flex-col items-center">
      <RiskCircle risk={risk} />
      <button
        type="button"
        onClick={onPredictClick}
        className="w-full py-3 px-6 bg-[#3498DB] text-white rounded-xl font-medium
                   transition-all duration-200 hover:bg-[#2980B9] focus:outline-none focus:ring-2 
                   focus:ring-[#3498DB] focus:ring-opacity-50"
      >
        Прогноз риска
      </button>
    </div>
  </motion.div>
);
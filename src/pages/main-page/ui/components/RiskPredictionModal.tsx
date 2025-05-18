import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";


interface RiskPredictionModalProps {
  isVisible: boolean;
  risk: number;
  factors: string[];
  onClose: () => void;
}

export const RiskPredictionModal = ({ isVisible, risk, factors, onClose }: RiskPredictionModalProps) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold mb-4 text-[#2C3E50]">Прогноз риска</h3>
          <div className="flex items-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                risk > 50 ? 'bg-[#E74C3C]' : 'bg-[#27AE60]'
              }`}
            >
              <span className="text-white text-xl font-bold">{risk}%</span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-[#2C3E50]">
                {risk > 50 ? 'Высокий риск' : 'Низкий риск'}
              </p>
              <p className="text-sm text-[#7F8C8D]">На основе текущих факторов</p>
            </div>
          </div>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div key={index} className="flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 text-[#F39C12] mr-2" />
                <span className="text-[#2C3E50]">{factor}</span>
              </div>
            ))}
          </div>
          <button
            className="mt-6 w-full py-3 bg-[#3498DB] text-white rounded-xl font-medium
                       hover:bg-[#2980B9] transition-colors duration-200"
            onClick={onClose}
          >
            Понятно
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

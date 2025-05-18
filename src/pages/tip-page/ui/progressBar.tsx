import { motion } from 'framer-motion';
import { Tip, UserTip } from '@/types';

interface ProgressBarProps {
  tips: Tip[];
  userTips: UserTip[];
  userId?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ tips, userTips, userId }) => {
  const completedCount = tips.filter(tip =>
    userTips.some(u => u.tipId === tip.id && u.userId === userId)
  ).length;
  const progress = (completedCount / tips.length) * 100;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Прогресс</h2>
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
          <span>Выполнено советов</span>
          <span className="font-bold">{completedCount}/{tips.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#4CAF50] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {tips.length > 0 && completedCount === tips.length && (
          <motion.div
            className="mt-3 text-center text-[#4CAF50] font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Отлично! Все советы выполнены!
          </motion.div>
        )}
      </div>
    </div>
  );
};
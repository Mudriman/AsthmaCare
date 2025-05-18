// components/MainHeader.tsx
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const MainHeader = ({ name }: { name: string }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-[#2C3E50]">Привет, {name || 'Пользователь'}!</h1>
    <motion.div
      className="bg-white p-2 rounded-full shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Activity className="h-6 w-6 text-[#3498DB]" />
    </motion.div>
  </div>
);

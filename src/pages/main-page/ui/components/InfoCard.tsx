// components/ui/InfoCard.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface InfoCardProps {
    icon: ReactNode;         
    value: string | number;     
    label: string;              
    delay?: number;             
}
export const InfoCard = ({ icon, value, label, delay = 0 }: InfoCardProps) => (
  <motion.div
    className="bg-white rounded-xl p-4 shadow-sm"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-center justify-between mb-2">
      {icon}
      {typeof value === 'string' ? (
        <span className="text-sm font-medium px-2 py-1 rounded-full bg-[#FFF8E1] text-[#F39C12]">
          {value}
        </span>
      ) : (
        <span className="text-lg font-bold text-[#2C3E50]">{value}</span>
      )}
    </div>
    <p className="text-sm text-[#7F8C8D]">{label}</p>
  </motion.div>
);

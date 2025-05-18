import { useEnvironmentStore } from '@/stores/externalStore';
import { motion } from 'framer-motion';
import { Wind, Droplets } from 'lucide-react';

export interface WeatherCardProps {
  delay?: number;
}

export const WeatherCard = ({ delay = 0.4 }: WeatherCardProps) => {
  const weather = useEnvironmentStore((state) => state.weather);

  if (!weather) return null; // ничего не рендерим, пока данных нет

  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-sm mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <h3 className="font-semibold text-[#2C3E50] mb-3">Погодные условия</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-[#3498DB] mr-2" />
          <div>
            <p className="text-sm text-[#7F8C8D]">Влажность</p>
            <p className="font-medium text-[#2C3E50]">{weather.humidity}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-[#3498DB] mr-2" />
          <div>
            <p className="text-sm text-[#7F8C8D]">Ветер</p>
            <p className="font-medium text-[#2C3E50]">{weather.windSpeed}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

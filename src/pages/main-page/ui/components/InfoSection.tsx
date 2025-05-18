import { LineChart, Wind } from 'lucide-react';
import { InfoCard } from '@/pages/main-page/ui';

interface InfoSectionProps {
  daysWithoutAttacks: number;
}

export const InfoSection = ({ daysWithoutAttacks }: InfoSectionProps) => (
  <div className="grid grid-cols-2 gap-4 mb-4">
    <InfoCard
      icon={<LineChart className="h-5 w-5 text-[#3498DB]" />}
      value={daysWithoutAttacks}
      label="Дней без приступов"
      delay={0.2}
    />
    <InfoCard
      icon={<Wind className="h-5 w-5 text-[#F39C12]" />}
      value="Высокий"
      label="Уровень пыльцы"
      delay={0.3}
    />
  </div>
);
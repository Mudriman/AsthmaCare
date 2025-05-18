import React, { useEffect } from 'react';
import { MainHeader, WeatherCard, InfoSection, RiskPredictionContainer } from '@/pages/main-page/ui';
import { useUserData } from '@/pages/main-page/hooks';
import { initializeEnvironmentStore } from '@/utils/environmentInitializer';

const MainScreen: React.FC = () => {
  const { user, isLoading, error, daysWithoutAttacks } = useUserData();
  
  useEffect(() => {
    initializeEnvironmentStore('Krasnodar'); // или передай локацию динамически
  }, []);

  if (isLoading) return <div className="text-center text-[#2C3E50]">Загрузка...</div>;
  if (error) return <div className="text-center text-[#E74C3C]">Ошибка: {error}</div>;

  return (
    <div className="flex flex-col h-full w-full bg-[#ECF0F1] p-4 md:p-6 pt-12 max-w-2xl mx-auto">
      <MainHeader name={user?.name || ''} />
      <RiskPredictionContainer />
      <InfoSection daysWithoutAttacks={daysWithoutAttacks} />
      <WeatherCard delay={0.4} />
    </div>
  );
};

export default MainScreen;
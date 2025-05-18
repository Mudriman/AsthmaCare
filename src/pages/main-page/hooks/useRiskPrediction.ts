import { useState } from 'react';
import { useUserDataStore } from '@/stores/userDataStore';
import { useAuthStore } from '@/stores/authStore';

export const useRiskPrediction = () => {
  const { fetchRisk } = useUserDataStore();
  const { user } = useAuthStore();
  const [showPrediction, setShowPrediction] = useState(false);

  const handlePredictClick = async () => {
    if (!user?.id) {
      alert('Пользователь не авторизован');
      return;
    }
    const risk = await fetchRisk(user.id);
    if (risk) {
      setShowPrediction(true);
    } else {
      alert('Не удалось загрузить прогноз риска');
    }
  };

  return { showPrediction, setShowPrediction, handlePredictClick };
};
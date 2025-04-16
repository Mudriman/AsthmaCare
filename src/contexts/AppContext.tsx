import React, { useEffect, useState, createContext, useContext } from 'react';
interface UserData {
  name: string;
  avatar: number;
  level: number;
  xp: number;
  lastAttack: Date | null;
  completedTips: string[];
  settings: {
    notifications: boolean;
    darkMode: boolean;
    sound: boolean;
  };
}
interface AppContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  predictAttack: () => {
    risk: number;
    factors: string[];
  };
}
const defaultUserData: UserData = {
  name: 'Алексей',
  avatar: 0,
  level: 3,
  xp: 125,
  lastAttack: null,
  completedTips: [],
  settings: {
    notifications: true,
    darkMode: false,
    sound: true
  }
};
const AppContext = createContext<AppContextType | undefined>(undefined);
export function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : defaultUserData;
  });
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);
  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
  };
  const predictAttack = () => {
    // Простая логика предсказания, в реальном приложении здесь будет более сложный алгоритм
    const currentHour = new Date().getHours();
    const isEvening = currentHour >= 18 || currentHour <= 5;
    const isHighPollen = Math.random() > 0.5;
    const risk = isEvening ? 70 : isHighPollen ? 60 : 30;
    const factors = [];
    if (isEvening) factors.push('Вечернее время');
    if (isHighPollen) factors.push('Высокий уровень пыльцы');
    return {
      risk,
      factors
    };
  };
  return <AppContext.Provider value={{
    userData,
    updateUserData,
    predictAttack
  }}>
      {children}
    </AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
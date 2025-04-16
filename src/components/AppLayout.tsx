import React from 'react';
import { AppRoutes } from '../navigation/AppRoutes';
import BottomNavigation from './BottomNavigation';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#ECF0F1] font-sans antialiased min-w-[320px]">
      <AppRoutes />
      <BottomNavigation />
    </div>
  );
};
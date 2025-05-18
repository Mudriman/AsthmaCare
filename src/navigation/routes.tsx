import { Navigate } from 'react-router-dom';
import LoginScreen from '@/features/auth/LoginScreen';
import RegisterScreen from '@/features/auth/RegisterScreen';
import MainScreen from '@/pages/main-page';
import TipsScreen from '@/components/TipsScreen';
import GamesScreen from '@/components/GamesScreen';
import BreathingGameScreen from '@/components/BreathingGameScreen';
import ProgressScreen from '@/components/ProgressScreen';
import ProfileScreen from '@/components/ProfileScreen';
import SettingsScreen from '@/components/SettingsScreen';
import FiveWordsGame from '@/components/GamesScreen';

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  { path: '/login', element: <LoginScreen />, public: true },
  { path: '/register', element: <RegisterScreen />, public: true },
  { path: '/', element: <MainScreen /> },
  { path: '/tips', element: <TipsScreen /> },
  { path: '/games', element: <GamesScreen /> },
  { path: '/games/breathing', element: <BreathingGameScreen /> },
  { path: '/progress', element: <ProgressScreen /> },
  { path: '/profile', element: <ProfileScreen /> },
  { path: '/games/five-words', element: <FiveWordsGame /> },
  { path: '/settings', element: <SettingsScreen /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
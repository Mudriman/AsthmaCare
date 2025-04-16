import React, { useEffect, useState, createContext, useContext } from 'react';
import { authService } from '../services/auth.service';
interface User {
  id: string;
  email: string;
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
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Проверяем сохраненную сессию при загрузке
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const userData = await authService.register(email, password, name);
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    error,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
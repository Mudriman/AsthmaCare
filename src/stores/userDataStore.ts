import { create } from 'zustand';
import { getUserData, updateUserData, getRiskData } from '@/api/user.api';
import { User, Risk } from '@/types/User';
import { fixUserData } from '@/utils/fixers';

interface UserDataState {
  userData: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: (userId: string) => Promise<void>;
  updateUserData: (userId: string, newData: Partial<User>) => Promise<void>;
  fetchRisk: (userId: string) => Promise<Risk | undefined>;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  isLoading: false,
  error: null,

  fetchUserData: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      const data = await getUserData(userId);
      const fixed = fixUserData(data);
      set({ userData: fixed, isLoading: false });
      localStorage.setItem('userData', JSON.stringify(fixed));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка загрузки данных пользователя',
        isLoading: false,
      });
    }
  },

  updateUserData: async (userId, newData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedData = await updateUserData(userId, newData);
      const fixed = fixUserData(updatedData);
      set({ userData: fixed, isLoading: false });
      localStorage.setItem('userData', JSON.stringify(fixed));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка обновления данных пользователя',
        isLoading: false,
      });
    }
  },

  fetchRisk: async (userId) => {
    try {
      const risk = await getRiskData(userId);
      set((state) => {
        const updatedUserData = state.userData
          ? { ...state.userData, risk }
          : state.userData;
        if (updatedUserData) {
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }
        return { userData: updatedUserData };
      });
      return risk;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка загрузки риска',
      });
      return undefined;
    }
  },
}));

export const initializeUserData = () => {
  const savedUser = localStorage.getItem('userData');

  if (savedUser) {
    try {
      const parsed = fixUserData(JSON.parse(savedUser));
      useUserDataStore.setState({ userData: parsed });
    } catch {
      localStorage.removeItem('userData');
    }
  }
};

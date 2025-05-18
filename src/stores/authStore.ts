import { create } from 'zustand';
import { loginUser, registerUser } from "@/api/auth.api";
import { AuthState } from "@/types/Auth";
import { User } from "@/types/User";

// Корректировка поля даты
function fixUser(user: any): User {
  return {
    ...user,
    lastAttack: user.lastAttack ? new Date(user.lastAttack) : null,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const rawUser = await loginUser(email, password);
      const user = fixUser(rawUser);
      set({ user, isLoading: false });
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (err) {
      set({ user: null, isLoading: false, error: err instanceof Error ? err.message : 'Ошибка входа' });
    }
  },

  register: async (email, password, name) => {
    try {
      set({ isLoading: true, error: null });
      const rawUser = await registerUser({ email, password, name });
      const user = fixUser(rawUser);
      set({ user, isLoading: false });
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (err) {
      set({ user: null, isLoading: false, error: err instanceof Error ? err.message : 'Ошибка регистрации' });
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('currentUser');
  }
}));

// Вызови эту функцию один раз в App.tsx (или index.tsx)
export const initializeAuth = () => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      const fixedUser = fixUser(parsedUser);
      useAuthStore.setState({ user: fixedUser });
    } catch (err) {
      console.error('Ошибка при загрузке пользователя из localStorage:', err);
      localStorage.removeItem('currentUser');
    }
  }
};

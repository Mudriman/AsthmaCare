import { api } from './axios';
import { UserWithPassword, RegistrationData } from "@/types/Api";
import { UserWithoutPassword } from "@/types/User";

// 🔐 Авторизация
export const loginUser = async (
  email: string,
  password: string
): Promise<UserWithoutPassword> => {
  const res = await api.get<UserWithPassword[]>('/users', { params: { email, password } });
  const user = res.data[0];
  if (!user) throw new Error('Неверный email или пароль');
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// 📝 Регистрация
export const registerUser = async (
  userData: RegistrationData
): Promise<UserWithoutPassword> => {
  const res = await api.get<UserWithPassword[]>('/users', { params: { email: userData.email } });
  if (res.data.length > 0) throw new Error('Пользователь уже существует');

  const newUser: UserWithPassword = {
    id: Date.now().toString(),
    ...userData,
    avatar: 0,
    level: 1,
    xp: 0,
    lastAttack: null,
    completedTips: [],
    achievements: [],
    symptoms: [],
    settings: {
      notifications: true,
      darkMode: false,
      sound: true
    },
    risk: {
      value: 0,
      factors: []
    }
  };

  await api.post('/users', newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

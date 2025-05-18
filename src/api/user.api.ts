import { api } from './axios';
import { User } from "@/types";

// 📦 Получить пользовательские данные
export const getUserData = async (userId: string): Promise<User> => {
  const res = await api.get<User>(`/users/${userId}`);
  const user = res.data;
  if (!user) throw new Error('Пользователь не найден');

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    level: user.level,
    xp: user.xp,
    lastAttack: user.lastAttack,
    symptoms: user.symptoms,
    achievements: user.achievements,
    settings: user.settings,
    risk: user.risk
  };
};

// ✏️ Обновить пользовательские данные
export const updateUserData = async (
  userId: string,
  data: Partial<User>
): Promise<Partial<User>> => {
  const res = await api.patch<Partial<User>>(`/users/${userId}`, data);
  return res.data;
};

// 📊 Получить данные о риске
export const getRiskData = async (userId: string): Promise<{ value: number; factors: string[] }> => {
  const res = await api.get(`/users/${userId}`);
  return res.data.risk;
};
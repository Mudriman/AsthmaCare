import { api } from './axios';
import { UserData, User } from "@/types/User";

// 📦 Получить пользовательские данные
export const getUserData = async (userId: string): Promise<UserData> => {
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
    completedTips: user.completedTips,
    symptoms: user.symptoms,
    achievements: user.achievements,
    settings: user.settings,
    risk: user.risk
  };
};

// ✏️ Обновить пользовательские данные
export const updateUserData = async (
  userId: string,
  data: Partial<UserData>
): Promise<Partial<UserData>> => {
  const res = await api.patch<Partial<UserData>>(`/users/${userId}`, data);
  return res.data;
};

// 📊 Получить данные о риске
export const getRiskData = async (userId: string): Promise<{ value: number; factors: string[] }> => {
  const res = await api.get(`/users/${userId}`);
  return res.data.risk;
};
import { api } from './axios';
import { Tip, UserTip } from '@/types';

// 📦 Получить все советы
export const fetchTips = async (): Promise<Tip[]> => {
  const res = await api.get<Tip[]>('/tips');
  return res.data;
};

// 📦 Получить выполненные советы пользователя
export const fetchUserTips = async (userId: string): Promise<UserTip[]> => {
  const res = await api.get<UserTip[]>(`/userTips?userId=${userId}`);
  return res.data;
};

// ✅ Создать запись о выполненном совете
export const createUserTip = async (userTip: Omit<UserTip, 'id'>): Promise<UserTip> => {
  const res = await api.post<UserTip>('/userTips', userTip);
  return res.data;
};

// ❌ Удалить запись о выполненном совете
export const deleteUserTip = async (userTipId: string): Promise<void> => {
  await api.delete(`/userTips/${userTipId}`);
};
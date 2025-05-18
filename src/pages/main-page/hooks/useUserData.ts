import { useEffect } from 'react';
import { useUserDataStore } from '@/stores/userDataStore';
import { useAuthStore } from '@/stores/authStore';

export const useUserData = () => {
  const { userData, isLoading, error, fetchUserData } = useUserDataStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id && !userData) {
      fetchUserData(user.id);
    }
  }, [user?.id, userData, fetchUserData]);

  const daysWithoutAttacks = userData?.lastAttack
    ? Math.floor((Date.now() - new Date(userData.lastAttack).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return { user, isLoading, error, daysWithoutAttacks };
};
import { useEffect } from 'react';
import { useTipsStore } from '@/stores/tipStore';
import { useUserDataStore } from '@/stores/userDataStore';

export const useTipsLogic = () => {
  const { userData } = useUserDataStore();
  const {
    tips,
    userTips,
    loadTips,
    loadUserTips,
    completeTip,
    undoTip,
  } = useTipsStore();

  useEffect(() => {
    if (userData?.id) {
      loadTips();
      loadUserTips(userData.id);
    }
  }, [userData?.id, loadTips, loadUserTips]);

  const isCompleted = (tipId: string) =>
    userTips.some(t => t.tipId === tipId && t.userId === userData?.id);

  const handleToggleComplete = async (tipId: string) => {
    if (!userData) return;
    const userTip = userTips.find(t => t.tipId === tipId && t.userId === userData.id);
    if (userTip) {
      await undoTip(userTip.id);
    } else {
      await completeTip(userData.id, tipId);
    }
  };

  return { tips, userTips, isCompleted, handleToggleComplete, userData };
};
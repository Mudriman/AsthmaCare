import { create } from 'zustand';
import { Tip, UserTip } from '@/types';
import { fetchTips, fetchUserTips, createUserTip, deleteUserTip } from '@/api/tip.api';

type TipsState = {
  tips: Tip[];
  userTips: UserTip[];
  loading: boolean;
  loadTips: () => Promise<void>;
  loadUserTips: (userId: string) => Promise<void>;
  completeTip: (userId: string, tipId: string) => Promise<void>;
  undoTip: (userTipId: string) => Promise<void>;
};

export const useTipsStore = create<TipsState>((set, get) => ({
  tips: [],
  userTips: [],
  loading: false,

  loadTips: async () => {
    set({ loading: true });
    const tips = await fetchTips();
    set({ tips, loading: false });
  },

  loadUserTips: async (userId: string) => {
    set({ loading: true });
    const userTips = await fetchUserTips(userId);
    set({ userTips, loading: false });
  },

  completeTip: async (userId: string, tipId: string) => {
    const newUserTip = {
      userId,
      tipId,
      completedAt: new Date().toISOString(),
    };
    const created = await createUserTip(newUserTip);
    set({ userTips: [...get().userTips, created] });
  },

  undoTip: async (userTipId: string) => {
    await deleteUserTip(userTipId);
    set({ userTips: get().userTips.filter(t => t.id !== userTipId) });
  },
}));
export type Tip = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  relatedRisks: string[];
  reward: number;
};

export type UserTip = {
  id: string;
  userId: string;
  tipId: string;
  completedAt: string; // ISO string
};

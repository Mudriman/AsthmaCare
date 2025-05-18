export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  sound: boolean;
}

export interface Risk {
  value: number;
  factors: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: number;
  level: number;
  xp: number;
  lastAttack: Date | null;
  completedTips: string[];
  symptoms: string[];
  achievements: string[];
  settings: UserSettings;
  risk: Risk;
}

export type UserWithoutPassword = Omit<User, 'password'>;
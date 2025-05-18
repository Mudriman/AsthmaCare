import { User } from '@/types/User';
import { WeatherData, PollenData } from '@/types/ExternalData';

export const fixUserData = (data: any): User => {
  if (!data || typeof data !== 'object') throw new Error('Invalid data format');
  return {
    id: typeof data.id === 'string' ? data.id : '',
    email: typeof data.email === 'string' ? data.email : '',
    name: typeof data.name === 'string' ? data.name : 'Default User',
    avatar: typeof data.avatar === 'number' ? data.avatar : 0,
    level: typeof data.level === 'number' ? data.level : 1,
    xp: typeof data.xp === 'number' ? data.xp : 0,
    lastAttack: data.lastAttack ? new Date(data.lastAttack) : null,
    completedTips: Array.isArray(data.completedTips) ? data.completedTips : [],
    symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    settings: {
      notifications: typeof data.settings?.notifications === 'boolean' ? data.settings.notifications : true,
      darkMode: typeof data.settings?.darkMode === 'boolean' ? data.settings.darkMode : false,
      sound: typeof data.settings?.sound === 'boolean' ? data.settings.sound : true,
    },
    risk: {
      value: typeof data.risk?.value === 'number' ? data.risk.value : 0,
      factors: Array.isArray(data.risk?.factors) ? data.risk.factors : [],
    },
  };
};

export const fixWeatherData = (data: any): WeatherData => {
  if (!data || typeof data !== 'object') throw new Error('Invalid weather data format');
  return {
    temperature: typeof data.temperature === 'number' ? data.temperature : 0,
    humidity: typeof data.humidity === 'number' ? data.humidity : 0,
    condition: typeof data.condition === 'string' ? data.condition : '',
    windSpeed: typeof data.windSpeed === 'number' ? data.windSpeed : 0,
  };
};

export const fixPollenData = (data: any): PollenData => {
  if (!data || typeof data !== 'object') throw new Error('Invalid pollen data format');
  return {
    level: typeof data.level === 'string' ? data.level : '',
    types: Array.isArray(data.types) ? data.types : [],
  };
};
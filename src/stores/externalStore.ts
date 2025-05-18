import { create } from 'zustand';
import { getWeatherData, getPollenData } from '@/api/external.api';
import { fixWeatherData, fixPollenData } from '@/utils/fixers';
import { WeatherData, PollenData } from '@/types/ExternalData';

interface EnvironmentState {
  weather: WeatherData | null;
  pollen: PollenData | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
  fetchPollen: (location: string) => Promise<void>;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  weather: null,
  pollen: null,
  isLoading: false,
  error: null,

  fetchWeather: async (location) => {
    try {
      set({ isLoading: true, error: null });
      const weather = await getWeatherData(location);
      const fixed = fixWeatherData(weather);
      set({ weather: fixed, isLoading: false });
      localStorage.setItem('weatherData', JSON.stringify(fixed));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка загрузки погоды',
        isLoading: false,
      });
    }
  },

  fetchPollen: async (location) => {
    try {
      set({ isLoading: true, error: null });
      const pollen = await getPollenData(location);
      const fixed = fixPollenData(pollen);
      set({ pollen: fixed, isLoading: false });
      localStorage.setItem('pollenData', JSON.stringify(fixed));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка загрузки пыльцы',
        isLoading: false,
      });
    }
  },
}));

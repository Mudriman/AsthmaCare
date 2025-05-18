import { api } from './axios';
import { WeatherData, PollenData } from "@/types/ExternalData";

// ☁️ Получить данные о погоде
export const getWeatherData = async (location: string): Promise<WeatherData> => {
  const res = await api.get(`/weather`, { params: { location } });
  return res.data;
};

// 🌾 Получить данные о пыльце
export const getPollenData = async (location: string): Promise<PollenData> => {
  const res = await api.get(`/pollen`, { params: { location } });
  return res.data;
};
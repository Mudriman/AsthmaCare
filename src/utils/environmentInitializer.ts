import { useEnvironmentStore } from '@/stores/externalStore';

export const initializeEnvironmentStore = (location: string) => {
  const weatherData = localStorage.getItem('weatherData');
  const pollenData = localStorage.getItem('pollenData');

  if (weatherData) {
    try {
      const parsed = JSON.parse(weatherData);
      useEnvironmentStore.setState({ weather: parsed });
    } catch {
      localStorage.removeItem('weatherData');
    }
  } else {
    useEnvironmentStore.getState().fetchWeather(location);
  }

  if (pollenData) {
    try {
      const parsed = JSON.parse(pollenData);
      useEnvironmentStore.setState({ pollen: parsed });
    } catch {
      localStorage.removeItem('pollenData');
    }
  } else {
    useEnvironmentStore.getState().fetchPollen(location);
  }
};

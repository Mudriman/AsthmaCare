export interface WeatherData {
    temperature: number;
    humidity: number;
    condition: string;
    windSpeed: number;
  }
  
  export interface PollenData {
    level: string;
    types: string[];
  }
export interface WeatherCondition {
  temp: number;
  condition: string; // e.g., "Cloudy", "Rain", "Sunny"
  precipitationChance: number; // percentage
  windSpeed: number; // km/h
  humidity: number; // percentage
  cloudCover: number; // percentage
  icon: string; // Suggested icon name
}

export interface HourlyForecast extends WeatherCondition {
  time: string; // "14:00"
  timestamp: number; // useful for sorting
}

export interface DailyForecast {
  day: string; // "Monday"
  date: string; // "Oct 25"
  minTemp: number;
  maxTemp: number;
  condition: string;
  rainChance: number;
  icon: string;
}

export interface WeatherData {
  location: string;
  current: WeatherCondition;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  groundingSources?: { uri: string; title: string }[];
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
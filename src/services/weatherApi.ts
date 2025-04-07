import {OPENWEATHER_API_KEY, OPENWEATHER_API_URL} from '@env';
import type {WeatherResponse} from '../types/weather';


export const fetchWeatherData = async (cityIds: string): Promise<WeatherResponse> => {
  const response = await fetch(
    `${OPENWEATHER_API_URL}/group?id=${cityIds}&units=imperial&appid=${OPENWEATHER_API_KEY}`,
  );


  if (!response.ok) {
    throw new Error('Weather data fetch failed');
  }

  return response.json();
}; 
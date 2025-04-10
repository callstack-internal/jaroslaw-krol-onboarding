import {useQuery} from '@tanstack/react-query';
import {fetchWeatherData} from '../services/weatherApi';
import type {WeatherData, WeatherResponse} from '../types/weather';

// City IDs for the cities in our app
const CITY_IDS = {
  SAN_JOSE: '5392171',
  NEW_YORK: '5128581',
  LONDON: '2643743',
  PARIS: '2988507',
  HONG_KONG: '1819729',
  SINGAPORE: '1880252',
  BEIJING: '1816670',
  SYDNEY: '2147714',
  RADZYN: '760680',
  WARSZAWA: '7531889',
  ROME: '3169070',
  MADRID: '3085265',
  BARCELONA: '3067696',
  BERLIN: '2950159',
  MOSCOW: '524901',
  TOKYO: '1850147',
} as const;

type WeatherDataResponse = {
  list: WeatherData[];
  cnt: number;
};

export const useWeatherData = () => {
  const cityIds = Object.values(CITY_IDS).join(',');

  return useQuery<WeatherResponse, Error, WeatherDataResponse>({
    queryKey: ['weather'],
    queryFn: () => fetchWeatherData(cityIds),
    refetchInterval: 300000, // Refetch every 5 minutes
    select: (data: WeatherResponse) => {
      return {
        ...data,
        list: data.list.map(city => ({
          city: city.name,
          temperature: city.main.temp,
          condition: city.weather[0].main,
          humidity: city.main.humidity,
          pressure: city.main.pressure,
          windSpeed: city.wind.speed,
          cloudCover: city.clouds.all,
        })),
      };
    },
  });
}; 
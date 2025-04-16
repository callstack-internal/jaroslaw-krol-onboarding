import type {WeatherData} from './weather';

export type RootStackParamList = {
  Weather: undefined;
  Details: {weatherData: WeatherData};
};

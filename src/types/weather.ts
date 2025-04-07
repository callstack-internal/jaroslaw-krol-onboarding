export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  cloudCover?: number;
};

export type WeatherResponse = {
  list: Array<{
    id: number;
    name: string;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
  }>;
  cnt: number;
}; 
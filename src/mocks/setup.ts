import {setupServer} from 'msw/native';
import {http, HttpResponse} from 'msw';

export const mockWeatherResponse = {
  list: [
    {
      id: 5128581,
      name: 'New York',
      main: {
        temp: 72,
        humidity: 60,
        pressure: 1015,
      },
      weather: [{main: 'Clear', description: 'clear sky'}],
      wind: {speed: 5},
      clouds: {all: 20},
    },
    {
      id: 2643743,
      name: 'London',
      main: {
        temp: 65,
        humidity: 70,
        pressure: 1012,
      },
      weather: [{main: 'Clouds', description: 'scattered clouds'}],
      wind: {speed: 3},
      clouds: {all: 40},
    },
  ],
  cnt: 2,
};

export const handlers = [
  http.get('*/group', () => {
    return HttpResponse.json(mockWeatherResponse);
  }),
];

export const server = setupServer(...handlers);

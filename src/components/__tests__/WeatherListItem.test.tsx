import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import WeatherListItem from '../WeatherListItem';
import type {WeatherData} from '../../types/weather';

describe('WeatherListItem', () => {
  const mockWeatherData: WeatherData = {
    city: 'London',
    temperature: 20,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 5,
  };

  it('renders correctly with all props', () => {
    render(
      <WeatherListItem
        item={mockWeatherData}
        onPress={() => {}}
      />,
    );

    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('20°F')).toBeTruthy();
    expect(screen.getByText('Sunny')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(
      <WeatherListItem
        item={mockWeatherData}
        onPress={onPressMock}
      />,
    );

   const pressable = screen.getByTestId('weather-item');
   fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders correctly with missing optional data', () => {
    const incompleteData: WeatherData = {
      city: 'Paris',
      temperature: 15,
      condition: 'Cloudy',
    };

    render(
      <WeatherListItem
        item={incompleteData}
        onPress={() => {}}
      />,
    );

    expect(screen.getByText('Paris')).toBeTruthy();
    expect(screen.getByText('15°F')).toBeTruthy();
    expect(screen.getByText('Cloudy')).toBeTruthy();
  });

  it('renders with different weather conditions', () => {
    const conditions = ['clear', 'clouds', 'rain', 'mist', 'unknown'];

    conditions.forEach(condition => {
      const weatherData = {...mockWeatherData, condition};
      render(
        <WeatherListItem
          item={weatherData}
          onPress={() => {}}
        />,
      );

      expect(screen.getByText(condition)).toBeTruthy();
    });
  });

  it('applies focus styling when focused', () => {
    render(
      <WeatherListItem
        item={mockWeatherData}
        onPress={() => {}}
      />,
    );

    const focusable = screen.getByTestId('weather-item');
    fireEvent(focusable, 'focus');

    expect(focusable).toHaveStyle({
      transform: [{scale: 1.05}],
    });
  });
});

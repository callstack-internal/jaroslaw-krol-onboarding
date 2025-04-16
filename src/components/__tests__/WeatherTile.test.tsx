import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import WeatherTile from '../WeatherTile';
import type {WeatherData} from '../../types/weather';

// Mock weather data
const mockWeatherData: WeatherData = {
  city: 'New York',
  temperature: 72,
  condition: 'clear',
  humidity: 60,
  pressure: 1015,
  windSpeed: 5,
  cloudCover: 20,
};

describe('WeatherTile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    render(
      <WeatherTile
        item={mockWeatherData}
        onPress={() => {}}
      />,
    );

    expect(screen.getByText('New York')).toBeTruthy();
    expect(screen.getByText('clear')).toBeTruthy();
    expect(screen.getByText('72°')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(
      <WeatherTile
        item={mockWeatherData}
        onPress={onPressMock}
      />,
    );

    const pressable = screen.getByTestId('weather-tile');
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders correctly with missing optional data', () => {
    const incompleteData: WeatherData = {
      city: 'Paris',
      temperature: 15,
      condition: 'Cloudy',
    };

    render(
      <WeatherTile
        item={incompleteData}
        onPress={() => {}}
      />,
    );

    expect(screen.getByText('Paris')).toBeTruthy();
    expect(screen.getByText('15°')).toBeTruthy();
    expect(screen.getByText('Cloudy')).toBeTruthy();
  });

  it('applies focus styling when focused', () => {
    render(
      <WeatherTile
        item={mockWeatherData}
        onPress={jest.fn()}
      />,
    );

    const focusable = screen.getByTestId('weather-tile');
    fireEvent(focusable, 'focus');

    expect(focusable).toHaveStyle({
      transform: [{scale: 1.05}],
    });
  });
});

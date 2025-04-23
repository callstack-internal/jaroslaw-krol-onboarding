import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import WeatherListItem from '../WeatherListItem';
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

describe('WeatherListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders weather item correctly', () => {
    render(
      <WeatherListItem item={mockWeatherData} onPress={jest.fn()} />,
    );

    // Check if city name is displayed
    expect(screen.getByText('New York')).toBeTruthy();
    // Check if condition is displayed
    expect(screen.getByText('clear')).toBeTruthy();
    // Check if temperature is displayed
    expect(screen.getByText('72°F')).toBeTruthy();
  });

  it('navigates to details screen on press', () => {
    const mockOnPress = jest.fn();
    render(
      <WeatherListItem item={mockWeatherData} onPress={mockOnPress} />,
    );

    // Find and press the city name (which is wrapped in TouchableOpacity)
    fireEvent.press(screen.getByText('New York'));

    // Check if navigation.navigate was called with correct params
    expect(mockOnPress).toHaveBeenCalledWith(mockWeatherData);
  });

  it('renders with different weather conditions', () => {
    const conditions = ['clear', 'clouds', 'rain', 'mist', 'unknown'];

    conditions.forEach(condition => {
      const weatherData = {...mockWeatherData, condition};
      render(
        <WeatherListItem item={weatherData} onPress={jest.fn()} />,
      );

      expect(screen.getByText(condition)).toBeTruthy();
    });
  });
});

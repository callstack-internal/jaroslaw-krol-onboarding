import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WeatherListItem from '../WeatherListItem';
import type {WeatherData} from '../../types/weather';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
} as any;

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
    const {getByText} = render(
      <WeatherListItem item={mockWeatherData} navigation={mockNavigation} />,
    );

    // Check if city name is displayed
    expect(getByText('New York')).toBeTruthy();
    // Check if condition is displayed
    expect(getByText('clear')).toBeTruthy();
    // Check if temperature is displayed
    expect(getByText('72°F')).toBeTruthy();
  });

  it('navigates to details screen on press', () => {
    const {getByText} = render(
      <WeatherListItem item={mockWeatherData} navigation={mockNavigation} />,
    );

    // Find and press the city name (which is wrapped in TouchableOpacity)
    fireEvent.press(getByText('New York'));

    // Check if navigation.navigate was called with correct params
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      weatherData: mockWeatherData,
    });
  });

  it('renders with different weather conditions', () => {
    const conditions = ['clear', 'clouds', 'rain', 'mist', 'unknown'];

    conditions.forEach(condition => {
      const weatherData = {...mockWeatherData, condition};
      const {getByText} = render(
        <WeatherListItem item={weatherData} navigation={mockNavigation} />,
      );

      expect(getByText(condition)).toBeTruthy();
    });
  });
}); 
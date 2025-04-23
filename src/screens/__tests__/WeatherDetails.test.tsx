import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherDetails from '../WeatherDetails';
import {RootStackParamList} from '../../types/navigation';
import {WeatherData} from '../../types/weather';

const Stack = createNativeStackNavigator<RootStackParamList>();

const mockWeatherData: WeatherData = {
  city: 'London',
  temperature: 20,
  condition: 'Sunny',
  humidity: 65,
  pressure: 1013,
  windSpeed: 5,
  cloudCover: 30,
};

const mockWeatherDataWithMissingValues: WeatherData = {
  city: 'London',
  temperature: 20,
  condition: 'Sunny',
};

const renderWithNavigation = (weatherData: WeatherData) => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Details"
          component={WeatherDetails}
          initialParams={{weatherData}}
        />
      </Stack.Navigator>
    </NavigationContainer>,
  );
};

describe('WeatherDetails', () => {
  it('renders correctly with all props', () => {
    renderWithNavigation(mockWeatherData);

    // Check header content
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('20°C')).toBeTruthy();
    expect(screen.getByText('Sunny')).toBeTruthy();

    // Check weather details
    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('65%')).toBeTruthy();
    expect(screen.getByText('Pressure')).toBeTruthy();
    expect(screen.getByText('1013hPa')).toBeTruthy();
    expect(screen.getByText('Wind Speed')).toBeTruthy();
    expect(screen.getByText('5m/s')).toBeTruthy();
    expect(screen.getByText('Cloud Cover')).toBeTruthy();
    expect(screen.getByText('30%')).toBeTruthy();

    // Check if the scroll view is rendered
    expect(screen.getByTestId('weather-details')).toBeTruthy();
  });

  it('renders correctly with missing optional data', () => {
    renderWithNavigation(mockWeatherDataWithMissingValues);

    // Check header content
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('20°C')).toBeTruthy();
    expect(screen.getByText('Sunny')).toBeTruthy();

    // Check that missing values show N/A
    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('Pressure')).toBeTruthy();
    expect(screen.getByText('Wind Speed')).toBeTruthy();
    expect(screen.getByText('Cloud Cover')).toBeTruthy();
    expect(screen.getAllByText('N/A')).toHaveLength(4);

  });

  it('renders with different weather conditions', () => {
    const conditions = ['clear', 'clouds', 'rain', 'mist', 'unknown'];

    conditions.forEach(condition => {
      const weatherData = {...mockWeatherData, condition};
      renderWithNavigation(weatherData);
      expect(screen.getByText(condition)).toBeTruthy();
    });
  });

  it('renders weather icon correctly', () => {
    renderWithNavigation(mockWeatherData);
    expect(screen.getByTestId('weather-icon')).toBeTruthy();
  });
});

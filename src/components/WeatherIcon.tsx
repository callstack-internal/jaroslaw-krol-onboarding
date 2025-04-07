import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  condition: string;
  size?: number;
  color?: string;
};

const WeatherIcon = ({condition, size = 24, color}: Props) => {
  const getWeatherIcon = (weatherCondition: string) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return 'weather-sunny';
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'weather-pouring';
      case 'mist':
        return 'weather-fog';
      default:
        return 'weather-sunny';
    }
  };

  return (
    <MaterialCommunityIcons
      testID="weather-icon"
      name={getWeatherIcon(condition)}
      size={size}
      color={color}
    />
  );
};

export default WeatherIcon; 
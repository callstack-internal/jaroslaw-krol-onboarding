import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WeatherIcon from '../WeatherIcon';

describe('WeatherIcon', () => {
    it('renders correctly with all props', () => {
      render(
        <WeatherIcon
          condition="clear"
          size={32}
          color="red"
        />,
      );

      expect(screen.getByTestId('weather-icon')).toBeTruthy();
      expect(screen.getByTestId('weather-icon')).toHaveStyle({fontSize: 32});
      expect(screen.getByTestId('weather-icon')).toHaveStyle({color: 'red'});
    });

    it('renders correctly with only required props', () => {
        render(
          <WeatherIcon
            condition="clear"
          />,
        );

        expect(screen.getByTestId('weather-icon')).toBeTruthy();
        expect(screen.getByTestId('weather-icon')).toHaveStyle({fontSize: 24});
      });
});

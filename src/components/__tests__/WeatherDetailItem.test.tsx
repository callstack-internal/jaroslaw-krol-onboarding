import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WeatherDetailItem from '../WeatherDetailItem';

describe('WeatherDetailItem', () => {
  it('renders correctly with all props', () => {
    render(
      <WeatherDetailItem
        title="Humidity"
        value={65}
        unit="%"
        icon="water-percent"
      />,
    );

    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('65%')).toBeTruthy();
  });

  it('renders correctly with undefined value', () => {
    render(
      <WeatherDetailItem
        title="Pressure"
        value={undefined}
        unit="hPa"
        icon="gauge"
      />,
    );

    expect(screen.getByText('Pressure')).toBeTruthy();
    expect(screen.getByText('N/A')).toBeTruthy();
  });

  it('renders correctly without unit', () => {
    render(
      <WeatherDetailItem
        title="Wind Speed"
        value={'10'}
        icon="weather-windy"
      />,
    );

    expect(screen.getByText('Wind Speed')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });
});

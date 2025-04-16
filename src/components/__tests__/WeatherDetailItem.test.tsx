import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WeatherDetailItem from '../WeatherDetailItem';

describe('WeatherDetailItem', () => {
  it('renders title and value correctly', () => {
    render(<WeatherDetailItem title="Temperature" value={25} unit="°C" icon="thermometer" />);

    expect(screen.getByText('Temperature')).toBeTruthy();
    expect(screen.getByText('25°C')).toBeTruthy();
  });

  it('renders with undefined value', () => {
    render(<WeatherDetailItem title="Humidity" value={undefined} unit="%" icon="water-percent" />);

    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('N/A')).toBeTruthy();
  });

  it('renders without unit', () => {
    render(<WeatherDetailItem title="Wind" value="10" icon="weather-windy" />);

    expect(screen.getByText('Wind')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });
});

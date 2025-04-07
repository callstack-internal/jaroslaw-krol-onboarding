import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherDetailItem from '../WeatherDetailItem';

describe('WeatherDetailItem', () => {
  it('renders correctly with all props', () => {
    const {getByText} = render(
      <WeatherDetailItem
        title="Humidity"
        value={65}
        unit="%"
        icon="water-percent"
      />,
    );

    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('65%')).toBeTruthy();
  });

  it('renders correctly with undefined value', () => {
    const {getByText} = render(
      <WeatherDetailItem
        title="Pressure"
        value={undefined}
        unit="hPa"
        icon="gauge"
      />,
    );

    expect(getByText('Pressure')).toBeTruthy();
    expect(getByText('N/A')).toBeTruthy();
  });

  it('renders correctly without unit', () => {
    const {getByText} = render(
      <WeatherDetailItem
        title="Wind Speed"
        value={"10"}
        icon="weather-windy"
      />,
    );

    expect(getByText('Wind Speed')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });
}); 
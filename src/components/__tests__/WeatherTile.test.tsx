import { fireEvent, render, waitFor } from '@testing-library/react-native';
import WeatherTile from '../WeatherTile';
import { WeatherData } from '../../types/weather';

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

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('WeatherTile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders weather tile correctly', () => {
    const {getByText} = render(
      <WeatherTile
        item={mockWeatherData} 
        navigation={mockNavigation}
      />,
    );

    expect(getByText('New York')).toBeTruthy();
    expect(getByText('clear')).toBeTruthy();
    expect(getByText('72°')).toBeTruthy();
  });

  it('navigates to details screen on press', () => {
    const {getByText} = render(
      <WeatherTile 
        item={mockWeatherData} 
        navigation={mockNavigation}
      />,
    );

    fireEvent.press(getByText('New York'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      weatherData: mockWeatherData,
    });
  });

  it('applies focus styling when focused', () => {
    const {getByTestId} = render(
      <WeatherTile 
        item={mockWeatherData}
        navigation={mockNavigation}
      />,
    );

    const pressable = getByTestId('weather-tile');
    fireEvent(pressable, 'focus');
    
    expect(pressable).toHaveStyle({
      transform: [{scale: 1.05}]
    });
  });
});
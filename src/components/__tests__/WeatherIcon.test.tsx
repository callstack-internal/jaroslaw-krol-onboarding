import { render } from "@testing-library/react-native";
import WeatherIcon from "../WeatherIcon";

describe('WeatherIcon', () => {
    it('renders correctly with all props', () => {
      const {getByTestId} = render(
        <WeatherIcon
          condition="clear"
          size={32}
          color="red"
        />,
      );
  
      expect(getByTestId('weather-icon')).toBeTruthy();
      expect(getByTestId('weather-icon')).toHaveStyle({fontSize: 32});
      expect(getByTestId('weather-icon')).toHaveStyle({color: "red"});
    });

    it('renders correctly with only required props', () => {
        const {getByTestId} = render(
          <WeatherIcon
            condition="clear"
          />,
        );
    
        expect(getByTestId('weather-icon')).toBeTruthy();
        expect(getByTestId('weather-icon')).toHaveStyle({fontSize: 24});
      });
});
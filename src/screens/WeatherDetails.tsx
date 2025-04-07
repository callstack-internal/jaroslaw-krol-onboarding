import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import WeatherDetailItem from '../components/WeatherDetailItem';
import WeatherIcon from '../components/WeatherIcon';

type Props = {
  route: RouteProp<RootStackParamList, 'Details'>;
};

const WeatherDetails = ({route}: Props) => {
  const {weatherData} = route.params;
  const theme = useTheme();

  const weatherDetails = useMemo(
    () => [
      {
        title: 'Humidity',
        value: weatherData.humidity ?? 'N/A',
        unit: weatherData.humidity ? '%' : '',
        icon: 'water-percent',
      },
      {
        title: 'Pressure',
        value: weatherData.pressure ?? 'N/A',
        unit: weatherData.pressure ? 'hPa' : '',
        icon: 'gauge',
      },
      {
        title: 'Wind Speed',
        value: weatherData.windSpeed ?? 'N/A',
        unit: weatherData.windSpeed ? 'm/s' : '',
        icon: 'weather-windy',
      },
      {
        title: 'Cloud Cover',
        value: weatherData.cloudCover ?? 'N/A',
        unit: weatherData.cloudCover ? '%' : '',
        icon: 'cloud',
      },
    ],
    [weatherData],
  );

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <View style={styles.headerContent}>
          <WeatherIcon
            condition={weatherData.condition}
            size={64}
            color={theme.colors.primary}
          />
          <Text variant="headlineLarge" style={styles.city}>
            {weatherData.city}
          </Text>
          <Text variant="displaySmall" style={styles.temperature}>
            {weatherData.temperature}°C
          </Text>
          <Text variant="titleLarge" style={styles.condition}>
            {weatherData.condition}
          </Text>
        </View>
      </Surface>

      <Surface style={styles.detailsContainer} elevation={1}>
        {weatherDetails.map((detail, index) => (
          <WeatherDetailItem
            key={index}
            title={detail.title}
            value={detail.value}
            unit={detail.unit}
            icon={detail.icon}
          />
        ))}
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',

  },
  headerContent: {
    padding: 24,
    alignItems: 'center',
    
  },
  city: {
    marginTop: 8,
  },
  temperature: {
    marginVertical: 8,
  },
  condition: {
    opacity: 0.7,
  },
  detailsContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',

  },
});

export default WeatherDetails; 
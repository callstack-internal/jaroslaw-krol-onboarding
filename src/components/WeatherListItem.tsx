import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {List, Text, Surface} from 'react-native-paper';
import type {WeatherData} from '../types/weather';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  item: WeatherData;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Weather'>;
};

const WeatherListItem = ({item, navigation}: Props) => {
  const renderWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
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
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {weatherData: item})}>
      <Surface style={styles.surface}>
        <List.Item
          title={item.city}
          description={item.condition}
          left={props => (
            <List.Icon {...props} icon={renderWeatherIcon(item.condition)} />
          )}
          right={props => (
            <View {...props} style={styles.temperature}>
              <Text style={styles.temperatureText}>{item.temperature}°F</Text>
            </View>
          )}
        />
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  surface: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  temperature: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  temperatureText: {
    fontSize: 16,
    color: '#5c9cdb',
    fontWeight: '500',
  },
});

export default WeatherListItem; 
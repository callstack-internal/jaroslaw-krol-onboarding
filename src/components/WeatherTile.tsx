import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import type {WeatherData} from '../types/weather';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/navigation';
import WeatherIcon from './WeatherIcon';

type Props = {
  item: WeatherData;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Weather'>;
};

const WeatherTile = ({item, navigation}: Props) => {
  return (
    <Pressable
      testID="weather-tile"
      onPress={() => navigation.navigate('Details', {weatherData: item})}
      style={({focused}) => [
        styles.container,
        focused && styles.focused,
      ]}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <WeatherIcon
            condition={item.condition}
            size={48}
            color="#5c9cdb"
          />
        </View>
        <Text variant='titleLarge' style={styles.cityText}>{item.city}</Text>
        <Text variant='headlineLarge' style={styles.temperatureText}>{item.temperature}°</Text>
        <Text variant='bodyLarge'>{item.condition}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    padding: 12,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
  focused: {
    transform: [{scale: 1.05}],
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  cityText: {
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  temperatureText: {
    color: '#5c9cdb',
  },
});

export default WeatherTile; 
import React, { forwardRef } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {List, Text} from 'react-native-paper';
import type {WeatherData} from '../types/weather';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/navigation';
import WeatherIcon from './WeatherIcon';

type Props = {
  item: WeatherData;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Weather'>;
  index: number;
};

const WeatherListItem = forwardRef<View, Props>(({item, navigation}, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={() => navigation.navigate('Details', {weatherData: item})}
      style={({focused}) => [
        styles.container,
        (focused) && styles.focusedContainer,
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
        <Text variant='headlineLarge' style={styles.temperatureText}>{item.temperature}°F</Text>
        <Text variant='bodyLarge' style={styles.conditionText}>{item.condition}</Text>
      </View>
    </Pressable>
  );
});

WeatherListItem.displayName = 'WeatherListItem';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  focusedContainer: {
    transform: [{scale: 1.05}],
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    minWidth: 200,
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  cityText: {
    color: '#666',
    marginBottom: 4,
  },
  temperatureText: {
    color: '#5c9cdb',
    fontWeight: '600',
    marginBottom: 4,
  },
  conditionText: {
    color: '#333',
  },
});

export default WeatherListItem; 
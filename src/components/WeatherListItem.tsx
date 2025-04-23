import React, { useCallback, useMemo } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {List, Text, Surface} from 'react-native-paper';
import type {WeatherData} from '../types/weather';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

type Props = {
  item: WeatherData;
  onPress: (item: WeatherData) => void;
};

const WeatherListItem = ({item, onPress}: Props) => {
  const renderWeatherIcon = useMemo(() => {
    switch (item.condition.toLowerCase()) {
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
  }, [item.condition]);

  const left = useCallback((props: {color: string, style?: Style}) => <List.Icon {...props} icon={renderWeatherIcon} />, [renderWeatherIcon]);
  const right = useCallback((props: {color: string, style?: Style}) => (
    <View {...props} style={styles.temperature}>
      <Text style={styles.temperatureText}>{item.temperature}°F</Text>
    </View>
  ), [item]);

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}>
      <Surface style={styles.surface}>
        <List.Item
          title={item.city}
          description={item.condition}
          left={left}
          right={right}
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

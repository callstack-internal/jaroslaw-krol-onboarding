import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import WeatherListItem from '../components/WeatherListItem';
import type {RootStackParamList} from '../types/navigation';
import type {WeatherData} from '../types/weather';
import {useWeatherData} from '../hooks/useWeatherData';
import {Text} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const WeatherList = ({navigation}: Props) => {
  const {data, isLoading, isError, error} = useWeatherData();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5c9cdb" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error?.message || 'Something went wrong'}</Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: WeatherData}) => (
    <WeatherListItem item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.list}
        renderItem={renderItem}
        keyExtractor={item => item.city}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherList; 
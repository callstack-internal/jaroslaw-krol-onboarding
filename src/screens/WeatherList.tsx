import React, {useState, useMemo, useCallback} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import WeatherListItem from '../components/WeatherListItem';
import type {RootStackParamList} from '../types/navigation';
import type {WeatherData} from '../types/weather';
import {useWeatherData} from '../hooks/useWeatherData';
import {Text, Searchbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const WeatherList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {data, isLoading, isError, error} = useWeatherData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!data?.list) {return [];}
    return data.list.filter(item =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  const navigateToDetails = useCallback((item: WeatherData) => {
    navigation.navigate('Details', {weatherData: item});
  }, [navigation]);

  const renderItem = useCallback(({item}: {item: WeatherData}) => (
    <WeatherListItem item={item} onPress={navigateToDetails} />
  ), [navigateToDetails]);

  const renderEmptyComponent = useCallback(() => {
    if (searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No cities found matching "{searchQuery}"
          </Text>
        </View>
      );
    }
    return null;
  }, [searchQuery]);

  const keyExtractor = useCallback((item: WeatherData) => item.city, []);

  const searchBarMemo = useMemo(() => (
    <Searchbar
      placeholder="Search cities..."
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
    />
  ), [searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5c9cdb" testID="loading-indicator" />
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

  return (
    <View style={styles.container}>
      {searchBarMemo}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
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
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default WeatherList;

import React, {useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, Pressable, ScrollView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import WeatherListItem from '../components/WeatherListItem';
import type {RootStackParamList} from '../types/navigation';
import type {WeatherData} from '../types/weather';
import {useWeatherData} from '../hooks/useWeatherData';
import {Text, Searchbar, Card} from 'react-native-paper';
import WeatherIcon from '../components/WeatherIcon';
import WeatherTile from '../components/WeatherTile';

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const WeatherList = ({navigation}: Props) => {
  const {data, isLoading, isError, error} = useWeatherData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!data?.list) return [];
    return data.list.filter(item =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

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

  const renderItem = ({item}: {item: WeatherData}) => (
    <WeatherListItem item={item} navigation={navigation} />
  );

  const renderEmptyComponent = () => {
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
  };

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search cities..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Text variant='headlineLarge'>Weather List</Text>
      <FlatList
        horizontal
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.city}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Text variant='headlineLarge'>Weather Tiles</Text>
      <View style={styles.tilesContainer}>
        {filteredData.map(item => (
          <WeatherTile
            key={item.city}
            item={item}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    marginVertical: 16,
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
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});

export default WeatherList; 
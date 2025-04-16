/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider, MD3LightTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import WeatherList from './src/screens/WeatherList';
import WeatherDetails from './src/screens/WeatherDetails';
import type {RootStackParamList} from './src/types/navigation';

export const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'Weather',
  screenOptions: {
    headerStyle: {
      backgroundColor: '#f8f9fa',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  screens: {
    Weather: WeatherList,
    Details: WeatherDetails,
  },
});

export const Navigation = createStaticNavigation(RootStack);

const queryClient = new QueryClient();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5c9cdb',
  },
};

const Icon = (props: any) => <MaterialCommunityIcons {...props} />;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: Icon,
        }}>
        <Navigation />
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;

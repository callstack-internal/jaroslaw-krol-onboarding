import React from 'react';
import {render, screen, waitFor, cleanup, fireEvent, act} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { server } from '../../mocks/setup';
import { PaperProvider } from 'react-native-paper';
import WeatherList from '../WeatherList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { Navigation } from '../../../App';
import { http, HttpResponse } from 'msw';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
  },
});

const renderWithNavigation = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </QueryClientProvider>
  );
};

describe('WeatherList Integration Tests', () => {
  beforeAll(() => {
    server.listen();
  });
   
  afterEach(() => {
    cleanup();
    queryClient.clear();
    server.resetHandlers();
  });
   
  afterAll(() => {
    server.close();
  });

  it('displays loading indicator while fetching data', () => {
    const {getByTestId} = renderWithNavigation();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays weather data after successful fetch', async () => {
    const {getAllByText, getAllByTestId} = renderWithNavigation();
    
    await waitFor(() => {
      expect(getAllByText('New York')).toHaveLength(2);
      expect(getAllByTestId('weather-item')).toHaveLength(2);
      expect(getAllByTestId('weather-tile')).toHaveLength(2);
    });
  });

  it('filters cities based on search query', async () => {
    const {getByTestId, queryByText, getAllByText} = renderWithNavigation();

    // Wait for initial data load
    await waitFor(() => {
      expect(getAllByText('New York')).toHaveLength(2);
      expect(getAllByText('London')).toHaveLength(2);
    });

    // Perform search
    const searchBar = getByTestId('search-bar');
    await act(async () => {
      fireEvent.changeText(searchBar, 'New');
    });

    // Verify filtered results
    expect(getAllByText('New York')).toHaveLength(2);
    expect(queryByText('London')).toBeFalsy();
  });

  it('displays empty state when no cities match search', async () => {
    const {getByTestId, getByText, getAllByText} = renderWithNavigation();

    // Wait for initial data load
    await waitFor(() => {
      expect(getAllByText('New York')).toHaveLength(2);
    });

    // Perform search
    const searchBar = getByTestId('search-bar');
    await act(async () => {
      fireEvent.changeText(searchBar, 'NonExistentCity');
    });

    // Verify empty state
    expect(getByText('No cities found matching "NonExistentCity"')).toBeTruthy();
  });

  it('displays error message when fetch fails', async () => {
    server.use(
      http.get('*/group', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithNavigation();

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeTruthy();
    }, { timeout: 5000 });
  });
}); 
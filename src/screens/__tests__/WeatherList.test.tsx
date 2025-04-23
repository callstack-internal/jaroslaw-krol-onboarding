import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { server } from '../../mocks/setup';
import { PaperProvider } from 'react-native-paper';
import { Navigation } from '../../../App';
import { http, HttpResponse } from 'msw';

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
    queryClient.clear();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('displays loading indicator while fetching data', () => {
    renderWithNavigation();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays weather data after successful fetch', async () => {
    renderWithNavigation();

    await waitFor(() => {
      expect(screen.getByText('New York')).toBeTruthy();
    });
      expect(screen.getByText('London')).toBeTruthy();
  });

  it('filters cities based on search query', async () => {
    renderWithNavigation();

    await waitFor(() => {
      expect(screen.getByText('New York')).toBeTruthy();
    });
    expect(screen.getByText('London')).toBeTruthy();

    // Perform search
    const searchBar = screen.getByTestId('search-bar');
    fireEvent.changeText(searchBar, 'New');

    // Verify filtered results
    expect(screen.getByText('New York')).toBeTruthy();
    expect(screen.queryByText('London')).toBeFalsy();
  });

  it('displays empty state when no cities match search', async () => {
    renderWithNavigation();

    await waitFor(() => {
      expect(screen.getByText('New York')).toBeTruthy();
    });
    // Perform search
    const searchBar = screen.getByTestId('search-bar');
    fireEvent.changeText(searchBar, 'NonExistentCity');


    // Verify empty state
    expect(screen.getByText('No cities found matching "NonExistentCity"')).toBeTruthy();
  });

  it('navigates to details screen when weather item is pressed', async () => {
    renderWithNavigation();

    // Wait for items to load
    await waitFor(() => {
      expect(screen.getByText('New York')).toBeTruthy();
    });

    // Click weather tile
    const firstWeatherItem = screen.getByText('New York');
    fireEvent.press(firstWeatherItem);

    await waitFor(() => {
      expect(screen.getByTestId('weather-details')).toBeTruthy();
    });
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

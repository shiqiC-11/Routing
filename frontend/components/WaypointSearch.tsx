import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { getApiUrl } from '../utils/api';
import axios from 'axios';

const { LocalSearchModule } = NativeModules;

interface WaypointSearchProps {
  onSelectLocation: (location: {
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }) => void;
  placeholder?: string;
}

interface Suggestion {
  id: string;
  name: string;
  description: string;
  main_text: string;
  secondary_text: string;
  provider?: 'google' | 'native';
}

export const WaypointSearch: React.FC<WaypointSearchProps> = ({
  onSelectLocation,
  placeholder = 'Search for a location'
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const shouldUseNativeSearch = Platform.OS === 'ios' && LocalSearchModule;

  useEffect(() => {
    console.log('Debug - Platform:', Platform.OS);
    console.log('Debug - LocalSearchModule available:', !!LocalSearchModule);
    console.log('Debug - Should use native search:', shouldUseNativeSearch);

    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          setLoading(true);
          console.log('Starting search for:', query);
          
          if (shouldUseNativeSearch) {
            console.log('Using native iOS search');
            LocalSearchModule.startSearch(
              query,
              (error: any, results: Suggestion[]) => {
                if (error) {
                  console.error('Native search error:', error);
                } else {
                  console.log('Native search results:', JSON.stringify(results, null, 2));
                  setSuggestions(results.map(result => ({
                    ...result,
                    provider: 'native'
                  })));
                }
                setLoading(false);
              }
            );
          } else {
            console.log('Using Google Places API');
            const apiUrl = getApiUrl();
            console.log('Making API request to:', `${apiUrl}/places/autocomplete`);
            const response = await axios.post(`${apiUrl}/places/autocomplete`, {
              input: query
            });
            console.log('Google Places API response:', JSON.stringify(response.data, null, 2));
            setSuggestions(response.data.suggestions.map((suggestion: any) => ({
              ...suggestion,
              provider: 'google'
            })));
            setLoading(false);
          }
        } catch (error) {
          console.log('Debug - Platform:', Platform.OS);
          console.log('Debug - LocalSearchModule available:', !!LocalSearchModule);
          console.log('Debug - Should use native search:', shouldUseNativeSearch);
          console.error('Error fetching suggestion', error);
          if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
              response: error.response?.data,
              status: error.response?.status,
              headers: error.response?.headers
            });
          }
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, shouldUseNativeSearch]);

  const fetchPredictions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      console.log('Starting waypoint search with query:', query);
      console.log('Using native search:', shouldUseNativeSearch);
      
      if (shouldUseNativeSearch) {
        console.log('Using iOS native MapKit search');
        const results = await LocalSearchModule.startSearch(query);
        console.log('Native search results:', JSON.stringify(results, null, 2));
        setSuggestions(results);
      } else {
        console.log('Using Google Places API');
        const apiUrl = getApiUrl();
        const response = await axios.post(`${apiUrl}/places/autocomplete`, {
          query,
          types: ['geocode', 'establishment'],
          language: 'en',
          region: 'US'
        });
        console.log('Google Places API response:', JSON.stringify(response.data, null, 2));
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error('Search error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      }
    }
  };

  const handleSelectPlace = async (suggestion: Suggestion) => {
    try {
      console.log('Selected waypoint:', JSON.stringify(suggestion, null, 2));
      
      if (shouldUseNativeSearch && suggestion.provider === 'native') {
        console.log('Getting native place details');
        LocalSearchModule.getPlaceDetails(
          suggestion.id,
          suggestion.main_text,
          suggestion.secondary_text,
          (error: any, details: any) => {
            if (error) {
              console.error('Native place details error:', error);
            } else {
              console.log('Native place details:', details);
              onSelectLocation({
                name: suggestion.main_text,
                coordinates: details.coordinates
              });
              setQuery('');
              setSuggestions([]);
            }
            setLoading(false);
          }
        );
      } else {
        console.log('Getting Google place details');
        const apiUrl = getApiUrl();
        const response = await axios.get(`${apiUrl}/places/details/${suggestion.id}`);
        console.log('Google Places API details response:', JSON.stringify(response.data, null, 2));
        const { coordinates } = response.data;
        
        onSelectLocation({
          name: suggestion.main_text,
          coordinates: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }
        });
        
        setQuery('');
        setSuggestions([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons 
          name="search" 
          size={20} 
          color={theme.colors.text.secondary} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.secondary}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={theme.colors.primary[500]} 
            style={styles.loader} 
          />
        )}
        {query.length > 0 && !loading && (
          <TouchableOpacity 
            onPress={() => setQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectPlace(item)}
              >
                <Ionicons 
                  name="location" 
                  size={20} 
                  color={theme.colors.primary[500]} 
                  style={styles.locationIcon} 
                />
                <View style={styles.suggestionText}>
                  <Text style={styles.primaryText}>{item.main_text}</Text>
                  <Text style={styles.secondaryText}>{item.secondary_text}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    paddingHorizontal: theme.spacing.medium,
    height: 44,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    height: '100%',
  },
  loader: {
    marginLeft: theme.spacing.small,
  },
  clearButton: {
    padding: theme.spacing.small,
    marginLeft: theme.spacing.small,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  suggestionsList: {
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  locationIcon: {
    marginRight: theme.spacing.medium,
  },
  suggestionText: {
    flex: 1,
  },
  primaryText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
}); 
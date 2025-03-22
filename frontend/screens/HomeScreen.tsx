import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';
import { RootStackParamList } from '../types/navigation';
import { getApiUrl } from '../utils/api';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Waypoint {
  coordinates: Coordinates;
  name?: string;
}

interface SavedRoute {
  id: string;
  title: string;
  description: string;
  origin: Coordinates;
  destination: Coordinates;
  route: Coordinates[];
  distance: number;
  duration: number;
  created_at: string;
  waypoints: Waypoint[];
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState<SavedRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = getApiUrl();
      const response = await axios.get<SavedRoute[]>(`${apiUrl}/routes/`);
      setRoutes(response.data);
    } catch (error: any) {
      console.error('Error fetching routes:', error);
      setError('Failed to load routes. Please try again.');
      Alert.alert('Error', 'Failed to load routes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoutes();
    }, [])
  );

  const filteredRoutes = routes.filter(route =>
    route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDistance = (meters: number) => {
    return meters >= 1000
      ? `${(meters / 1000).toFixed(1)} km`
      : `${Math.round(meters)} m`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  };

  const renderRouteCard = ({ item }: { item: SavedRoute }) => (
    <TouchableOpacity
      style={styles.routeCard}
      onPress={() => {
        navigation.navigate('RouteDetails', { routeId: item.id });
      }}
    >
      <View style={styles.routeHeader}>
        <Text style={styles.routeTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.routeStats}>
          {formatDistance(item.distance)} • {formatDuration(item.duration)}
        </Text>
      </View>
      {item.description ? (
        <Text style={styles.routeDescription} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      <View style={styles.routeInfo}>
        <View style={styles.routePoints}>
          <Text style={styles.routePointText}>
            From: {formatCoordinates(item.origin)}
          </Text>
          <Text style={styles.routePointText}>
            To: {formatCoordinates(item.destination)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatCoordinates = (coords: Coordinates): string => {
    return `(${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`;
  };

  return (
    <>
      {loading ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          </View>
        </SafeAreaView>
      ) : error ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchRoutes}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Home Page</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Ionicons name="stats-chart" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="person-circle" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={theme.colors.text.secondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search routes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.text.secondary}
            />
          </View>

          {routes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No routes found</Text>
              <Text style={styles.emptySubtext}>
                Create your first route by tapping the + button
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.routeList}
              data={routes}
              keyExtractor={(item) => item.id}
              renderItem={renderRouteCard}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  headerIcons: {
    ...commonStyles.row,
    gap: theme.spacing.sm,
  },
  searchContainer: {
    ...commonStyles.row,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    ...theme.typography.body1,
    flex: 1,
    color: theme.colors.text.primary,
  },
  routeList: {
    flex: 1,
    padding: theme.spacing.md,
  },
  routeCard: {
    ...commonStyles.card,
    marginBottom: theme.spacing.md,
  },
  routeHeader: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  routeTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  routeStats: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  routeDescription: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  routeInfo: {
    ...commonStyles.row,
    justifyContent: 'space-between',
  },
  routePoints: {
    ...commonStyles.grow,
  },
  routePointText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  loadingContainer: {
    ...commonStyles.center,
    flex: 1,
  },
  errorContainer: {
    ...commonStyles.center,
    flex: 1,
    padding: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body1,
    color: theme.colors.error[500],
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    ...commonStyles.buttonPrimary,
  },
  retryButtonText: {
    ...commonStyles.buttonText,
  },
  emptyContainer: {
    ...commonStyles.center,
    flex: 1,
    padding: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default HomeScreen; 
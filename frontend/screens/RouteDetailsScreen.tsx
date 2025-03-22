import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import MapComponent from '../components/MapView';
import { styles } from '../styles/route-details.styles';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types/navigation';

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

type RouteDetailsScreenRouteProp = RouteProp<RootStackParamList, 'RouteDetails'>;

const formatDistance = (meters: number) => {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

const RouteDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteDetailsScreenRouteProp>();
  const [routeData, setRouteData] = useState<SavedRoute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRouteDetails();
  }, [route.params.routeId]);

  const fetchRouteDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const apiUrl = getApiUrl();
      const response = await axios.get<SavedRoute>(`${apiUrl}/routes/${route.params.routeId}`);
      setRouteData(response.data);
    } catch (error: any) {
      console.error('Error fetching route details:', error);
      setError('Failed to load route details. Please try again.');
      Alert.alert('Error', 'Failed to load route details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Route',
      'Are you sure you want to delete this route?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const apiUrl = getApiUrl();
              await axios.delete(`${apiUrl}/routes/${route.params.routeId}`);
              Alert.alert('Success', 'Route deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting route:', error);
              Alert.alert('Error', 'Failed to delete route. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </View>
    );
  }

  if (error || !routeData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Route not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRouteDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Route Details</Text>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={24} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </View> 

      <ScrollView style={styles.content}>
        <View style={styles.routeInfoCard}>
          <Text style={styles.routeTitle}>{routeData.title}</Text>
          <Text style={styles.routeDescription}>{routeData.description}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="speedometer-outline" size={24} color={theme.colors.primary[500]} />
              <Text style={styles.statValue}>{formatDistance(routeData.distance)}</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={24} color={theme.colors.primary[500]} />
              <Text style={styles.statValue}>{formatDuration(routeData.duration)}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapComponent
            region={{
              latitude: routeData.origin.latitude,
              longitude: routeData.origin.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            route={routeData.route}
          />
        </View>

        <View style={styles.coordinatesCard}>
          <View style={styles.coordinateItem}>
            <Text style={styles.coordinateLabel}>Origin</Text>
            <Text style={styles.coordinateValue}>
              {routeData.origin.latitude.toFixed(6)}, {routeData.origin.longitude.toFixed(6)}
            </Text>
          </View>
          <View style={styles.coordinateItem}>
            <Text style={styles.coordinateLabel}>Destination</Text>
            <Text style={styles.coordinateValue}>
              {routeData.destination.latitude.toFixed(6)}, {routeData.destination.longitude.toFixed(6)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RouteDetailsScreen; 
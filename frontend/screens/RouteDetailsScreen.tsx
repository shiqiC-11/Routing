import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Switch, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import MapComponent from '../components/MapView';
import { HandDrawnRoute } from '../components/HandDrawnRoute';
import { styles } from '../styles/route-details.styles';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types/navigation';
import { RouteStyle } from '../types/map';

const screenWidth = Dimensions.get('window').width;

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
  const [routeDetails, setRouteDetails] = useState<SavedRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHandDrawnMode, setIsHandDrawnMode] = useState(false);
  const [routeStyle, setRouteStyle] = useState<RouteStyle>({
    color: theme.colors.primary[500],
    strokeWidth: 3,
    handDrawnEffect: true
  });

  useEffect(() => {
    fetchRouteDetails();
  }, [route.params.routeId]);

  const fetchRouteDetails = async () => {
    try {
      setLoading(true);
      const apiUrl = getApiUrl();
      const response = await axios.get<SavedRoute>(`${apiUrl}/routes/${route.params.routeId}`);
      setRouteDetails(response.data);
    } catch (error: any) {
      console.error('Error fetching route details:', error);
      Alert.alert('Error', 'Failed to load route details. Please try again.');
    } finally {
      setLoading(false);
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
          <Ionicons name="trash-outline" size={24} color={theme.colors.error[500]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        ) : routeDetails ? (
          <>
            <View style={styles.mapContainer}>
              {!isHandDrawnMode && <MapComponent
                region={{
                  latitude: routeDetails.origin.latitude,
                  longitude: routeDetails.origin.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                route={routeDetails.route}
                markers={[
                  { id: 'origin', coordinate: routeDetails.origin },
                  { id: 'destination', coordinate: routeDetails.destination },
                  ...routeDetails.waypoints.map((wp, index) => ({
                    id: `waypoint-${index}`,
                    coordinate: wp.coordinates
                  }))
                ]}
              />}
              
              {isHandDrawnMode && routeDetails.route && (
                <HandDrawnRoute
                  points={routeDetails.route}
                  style={routeStyle}
                  width={screenWidth}
                  height={300}
                />
              )}
            </View>

            <View style={styles.routeStyleControls}>
              <Text style={styles.routeStyleLabel}>Hand-drawn</Text>
              <Switch
                value={isHandDrawnMode}
                onValueChange={setIsHandDrawnMode}
                trackColor={{
                  false: theme.colors.neutral[300],
                  true: theme.colors.primary[500],
                }}
                thumbColor={isHandDrawnMode ? theme.colors.primary[700] : theme.colors.neutral[100]}
              />
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.routeInfoCard}>
                <Text style={styles.routeTitle}>{routeDetails.title}</Text>
                <Text style={styles.routeDescription}>{routeDetails.description}</Text>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Ionicons name="speedometer-outline" size={24} color={theme.colors.primary[500]} />
                    <Text style={styles.statValue}>{formatDistance(routeDetails.distance)}</Text>
                    <Text style={styles.statLabel}>Distance</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="time-outline" size={24} color={theme.colors.primary[500]} />
                    <Text style={styles.statValue}>{formatDuration(routeDetails.duration)}</Text>
                    <Text style={styles.statLabel}>Duration</Text>
                  </View>
                </View>
              </View>

              <View style={styles.coordinatesCard}>
                <View style={styles.routePath}>
                  {/* Origin Point */}
                  <View style={styles.waypointRow}>
                    <View style={styles.waypointVisual}>
                      <View style={[styles.waypointDot, styles.originDot]}>
                        <Ionicons name="location" size={13} color={theme.colors.white} />
                      </View>
                      <View style={styles.connectingLine} />
                    </View>
                    <View style={styles.waypointInfo}>
                      <Text style={styles.coordinateName}>
                        {routeDetails.waypoints[0]?.name || 'Origin'}
                      </Text>
                    </View>
                  </View>

                  {/* Intermediate Waypoints */}
                  {routeDetails.waypoints.slice(1, -1).map((waypoint, index) => (
                    <View key={`waypoint-${index}`} style={styles.waypointRow}>
                      <View style={styles.waypointVisual}>
                        <View style={[styles.waypointDot, styles.intermediateDot]} />
                        <View style={styles.connectingLine} />
                      </View>
                      <View style={styles.waypointInfo}>
                        <Text style={styles.coordinateName}>
                          {waypoint.name || `Waypoint ${index + 1}`}
                        </Text>
                      </View>
                    </View>
                  ))}

                  {/* Destination Point */}
                  <View style={styles.waypointRow}>
                    <View style={styles.waypointVisual}>
                      <View style={[styles.waypointDot, styles.destinationDot]}>
                        <Ionicons name="location" size={13} color={theme.colors.white} />
                      </View>
                    </View>
                    <View style={styles.waypointInfo}>
                      <Text style={styles.coordinateName}>
                        {routeDetails.waypoints[routeDetails.waypoints.length - 1]?.name || 'Home'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Failed to load route details</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default RouteDetailsScreen; 
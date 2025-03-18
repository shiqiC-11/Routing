import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Text, Switch, Platform, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getApiUrl } from '../config';
import MapComponent from '../components/MapView';
import WaypointList from '../components/WaypointList';
import { theme } from '../styles/theme';
import { styles } from './styles/CreateRouteScreen.styles';
import type { RootStackParamList } from '../types/navigation';
import type { Region } from 'react-native-maps';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const MAX_WAYPOINTS = 10; // Maximum number of waypoints allowed

interface RouteWaypoint {
  id: string;
  coordinates: Coordinates;
  name?: string;
  order: number;
  type: 'origin' | 'destination' | 'waypoint';
}

interface SavedWaypoint {
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
  waypoints: SavedWaypoint[];
}

interface WaypointListProps {
  waypoints: RouteWaypoint[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

const CreateRouteScreen = () => {
  const navigation = useNavigation();
  const [isMapMode, setIsMapMode] = useState(true);
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number | null>(null);
  const [waypoints, setWaypoints] = useState<RouteWaypoint[]>([]);
  const [route, setRoute] = useState<{
    coordinates?: Coordinates[];
    title?: string;
    description?: string;
    distance?: number;
    duration?: number;
  }>({});
  const [debugInfo, setDebugInfo] = useState<string>('Tap a button to start');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleMapPress = async (event: { nativeEvent: { coordinate: Coordinates } }) => {
    const coordinate = event.nativeEvent.coordinate;
    if (selectedWaypointIndex !== null) {
      // Update existing waypoint
      setWaypoints(prev => {
        const updated = [...prev];
        updated[selectedWaypointIndex] = {
          ...updated[selectedWaypointIndex],
          coordinates: coordinate
        };
        return updated;
      });
      setSelectedWaypointIndex(null);
      setDebugInfo(`Updated point ${selectedWaypointIndex + 1}`);
    } else {
      handleAddWaypoint(coordinate);
    }
  };

  const handleCalculateRoute = async () => {
    if (waypoints.length < 2) {
      Alert.alert('Error', 'Please set at least origin and destination points');
      return;
    }

    try {
      setDebugInfo('Calculating route...');
      await calculateRoute(waypoints);
    } catch (error) {
      console.error('Failed to calculate route:', error);
      Alert.alert('Error', 'Failed to calculate route. Please try again.');
    }
  };

  const calculateRoute = async (waypointsList: RouteWaypoint[]) => {
    if (waypointsList.length < 2) return;

    try {
      const apiUrl = getApiUrl();
      setDebugInfo('Calculating route...');
      
      // Ensure waypoints are properly ordered and typed
      const orderedWaypoints = waypointsList.map((wp, i) => ({
        ...wp,
        order: i,
        type: i === 0 ? 'origin' : 
              i === waypointsList.length - 1 ? 'destination' : 'waypoint'
      }));

      console.log('Sending waypoints:', JSON.stringify(orderedWaypoints, null, 2));
      
      const response = await axios.post<{ route: Coordinates[]; distance: number; duration: number }>(
        `${apiUrl}/route/calculate/`,
        { waypoints: orderedWaypoints }
      );

      setRoute({
        coordinates: response.data.route,
        distance: response.data.distance,
        duration: response.data.duration,
      });
      setDebugInfo('Route calculated successfully');
    } catch (error: any) {
      console.error('Route calculation error:', error);
      const errorMessage = error.response?.data?.detail || error.message;
      setDebugInfo(`Error: ${errorMessage}`);
      Alert.alert('Error', 'Failed to calculate route. Please try again.');
      
      setRoute(prev => ({
        ...prev,
        coordinates: undefined,
        distance: undefined,
        duration: undefined,
      }));
    }
  };

  const handleWaypointPress = (index: number) => {
    setSelectedWaypointIndex(index);
    setDebugInfo(`Select new location for waypoint ${index + 1}`);
  };

  const handleWaypointDelete = (index: number) => {
    setWaypoints(prev => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.map((wp, i) => ({
        ...wp,
        order: i,
        type: i === 0 ? 'origin' : 
              i === updated.length - 1 ? 'destination' : 'waypoint'
      }));
    });
    setRoute({}); // Clear the route when waypoints change
  };

  const handleWaypointReorder = async (fromIndex: number, toIndex: number) => {
    setWaypoints(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      return updated.map((wp, i) => ({
        ...wp,
        order: i,
        type: i === 0 ? 'origin' : 
              i === updated.length - 1 ? 'destination' : 'waypoint'
      }));
    });
    setRoute({}); // Clear the route when waypoints change
  };

  const handleAddWaypoint = (coordinate: Coordinates) => {
    if (waypoints.length < MAX_WAYPOINTS) {
      const newWaypoint: RouteWaypoint = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        coordinates: coordinate,
        order: waypoints.length,
        type: waypoints.length === 0 ? 'origin' : 
              waypoints.length === 1 ? 'destination' : 'waypoint',
      };

      setWaypoints(prev => {
        const updated = [...prev];
        updated.push(newWaypoint);
        return updated.map((wp, i) => ({
          ...wp,
          order: i,
          type: i === 0 ? 'origin' : 
                i === updated.length - 1 ? 'destination' : 'waypoint'
        }));
      });

      setDebugInfo(`Added point ${waypoints.length + 1}`);
    }
  };

  const handleClearRoute = () => {
    setWaypoints([]);
    setRoute({});
    setSelectedWaypointIndex(null);
    setDebugInfo('Route cleared');
  };

  const handleSaveButtonPress = () => {
    if (waypoints.length < 2 || !route.coordinates) {
      Alert.alert('Error', 'Please set at least origin and destination points and calculate the route first');
      return;
    }
    setTitle('');
    setDescription('');
    setTitleError('');
    setSaveModalVisible(true);
  };

  const handleSaveConfirm = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setSaveModalVisible(false);
    handleSaveRoute();
  };

  const handleSaveRoute = async () => {
    if (waypoints.length < 2 || !route.coordinates) {
      Alert.alert('Error', 'Please set at least origin and destination points and calculate the route first');
      return;
    }

    try {
      setIsSaving(true);
      setDebugInfo('Saving route...');

      // Get origin and destination from waypoints
      const origin = waypoints[0].coordinates;
      const destination = waypoints[waypoints.length - 1].coordinates;
      
      // Validate coordinates are numbers and convert to float
      if (typeof origin.latitude !== 'number' || typeof origin.longitude !== 'number') {
        throw new Error('Origin coordinates must be numbers');
      }
      if (typeof destination.latitude !== 'number' || typeof destination.longitude !== 'number') {
        throw new Error('Destination coordinates must be numbers');
      }
      
      // Get intermediate waypoints (exclude origin and destination)
      // Strip unnecessary fields (order, type) and ensure coordinates are floats
      const intermediateWaypoints = waypoints.slice(1, -1).map(wp => {
        if (typeof wp.coordinates.latitude !== 'number' || typeof wp.coordinates.longitude !== 'number') {
          throw new Error('Waypoint coordinates must be numbers');
        }
        return {
          coordinates: {
            latitude: parseFloat(wp.coordinates.latitude.toString()),
            longitude: parseFloat(wp.coordinates.longitude.toString())
          },
          name: wp.name || undefined  // Use undefined instead of null for optional fields
        };
      });

      // Validate route coordinates and ensure they are floats
      const validatedRoute = route.coordinates.map(coord => {
        if (typeof coord.latitude !== 'number' || typeof coord.longitude !== 'number') {
          throw new Error('Route coordinates must be numbers');
        }
        return {
          latitude: parseFloat(coord.latitude.toString()),
          longitude: parseFloat(coord.longitude.toString())
        };
      });

      const routeData: Omit<SavedRoute, 'id' | 'created_at'> = {
        title,
        description,
        origin: waypoints[0].coordinates,
        destination: waypoints[waypoints.length - 1].coordinates,
        waypoints: waypoints.map(wp => ({
          coordinates: wp.coordinates,
          name: wp.name || undefined
        })),
        route: validatedRoute,
        distance: parseFloat((route.distance || 0).toString()),
        duration: parseFloat((route.duration || 0).toString())
      };

      console.log('Saving route data:', JSON.stringify(routeData, null, 2));
      console.log('Data types:', {
        originLat: typeof routeData.origin.latitude,
        originLng: typeof routeData.origin.longitude,
        destLat: typeof routeData.destination.latitude,
        destLng: typeof routeData.destination.longitude,
        distance: typeof routeData.distance,
        duration: typeof routeData.duration,
        waypoints: routeData.waypoints.map(wp => ({
          lat: typeof wp.coordinates.latitude,
          lng: typeof wp.coordinates.longitude
        }))
      });

      const apiUrl = getApiUrl();
      const response = await axios.post(`${apiUrl}/routes/`, routeData);
      
      setDebugInfo('Route saved successfully');
      Alert.alert(
        'Success',
        'Route saved successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      console.error('Save route error:', error);
      const errorMessage = error.response?.data?.detail || error.message;
      setDebugInfo(`Error: ${errorMessage}`);
      Alert.alert('Error', `Failed to save route: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const formatCoordinates = (coords: Coordinates): string => {
    return `(${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`;
  };

  const initiateWaypointAdd = () => {
    setSelectedWaypointIndex(waypoints.length);
    setDebugInfo('Tap on the map to add a waypoint');
  };

  const handleRegionChange = (region: Region) => {
    // Handle region change if needed
  };

  const handleMarkerDragEnd = (id: string, coordinate: Coordinates) => {
    const index = waypoints.findIndex(wp => wp.id === id);
    if (index !== -1) {
      setWaypoints(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          coordinates: coordinate
        };
        return updated;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.text.inverse} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Route</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.saveButton,
              (!route.coordinates || isSaving) && styles.saveButtonDisabled
            ]}
            onPress={handleSaveButtonPress}
            disabled={isSaving || !route.coordinates}
          >
            <Text style={[
              styles.saveButtonText,
              (!route.coordinates || isSaving) && styles.saveButtonTextDisabled
            ]}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="map-outline" size={24} color={theme.colors.primary[500]} />
              <Text style={styles.cardTitle}>Route Details</Text>
            </View>
          </View>
          <View style={styles.splitContainer}>
            <View style={styles.mapPanel}>
              <MapComponent
                region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                route={route.coordinates}
                markers={waypoints.map(wp => ({
                  id: wp.id,
                  coordinate: wp.coordinates
                }))}
                onMapPress={handleMapPress}
                onMarkerDragEnd={(id, coordinate) => {
                  const index = waypoints.findIndex(wp => wp.id === id);
                  if (index !== -1) {
                    setWaypoints(prev => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        coordinates: coordinate
                      };
                      return updated;
                    });
                    setDebugInfo(`Updated waypoint ${index + 1} position`);
                  }
                }}
              />
            </View>
            {waypoints.length > 0 && (
              <View style={styles.waypointPanel}>
                <WaypointList
                  waypoints={waypoints}
                  onMoveUp={(index) => handleWaypointReorder(index, index - 1)}
                  onMoveDown={(index) => handleWaypointReorder(index, index + 1)}
                  onDelete={handleWaypointDelete}
                  onEdit={handleWaypointPress}
                />
              </View>
            )}
          </View>
        </View>

        {route.coordinates && (
          <View style={styles.routeInfoCard}>
            <View style={styles.routeInfoHeader}>
              <Text style={styles.routeInfoTitle}>Route Summary</Text>
            </View>
            <View style={styles.routeInfoContent}>
              <View style={styles.routeInfoRow}>
                <View style={styles.routeInfoItem}>
                  <View style={styles.routeInfoIcon}>
                    <Ionicons name="speedometer-outline" size={24} color={theme.colors.primary[500]} />
                  </View>
                  <View style={styles.routeInfoDetails}>
                    <Text style={styles.routeInfoLabel}>Total Distance</Text>
                    <Text style={styles.routeInfoValue}>{formatDistance(route.distance || 0)}</Text>
                  </View>
                </View>
                <View style={styles.routeInfoDivider} />
                <View style={styles.routeInfoItem}>
                  <View style={styles.routeInfoIcon}>
                    <Ionicons name="time-outline" size={24} color={theme.colors.primary[500]} />
                  </View>
                  <View style={styles.routeInfoDetails}>
                    <Text style={styles.routeInfoLabel}>Estimated Time</Text>
                    <Text style={styles.routeInfoValue}>{formatDuration(route.duration || 0)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.routeInfoStats}>
                <View style={styles.routeInfoStat}>
                  <Text style={styles.routeInfoStatLabel}>Waypoints</Text>
                  <Text style={styles.routeInfoStatValue}>{waypoints.length}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {waypoints.length > 0 && (
        <View style={styles.fabContainer}>
          <TouchableOpacity 
            style={[styles.fab, styles.fabSecondary]}
            onPress={handleClearRoute}
          >
            <Ionicons name="trash-outline" size={24} color={theme.colors.text.inverse} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.fab, styles.fabPrimary]}
            onPress={handleCalculateRoute}
            disabled={waypoints.length < 2}
          >
            <Ionicons name="navigate-outline" size={24} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={isSaveModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Save Route</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setSaveModalVisible(false)}
              >
                <Ionicons name="close" size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Title *</Text>
                <TextInput
                  style={[styles.input, titleError ? styles.inputError : null]}
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    setTitleError('');
                  }}
                  placeholder="Enter route title"
                  placeholderTextColor={theme.colors.text.secondary}
                />
                {titleError ? (
                  <Text style={styles.errorText}>{titleError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter route description"
                  placeholderTextColor={theme.colors.text.secondary}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputHelper}>
                <Text>{waypoints.length} waypoints</Text>
              </View>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonSecondary]}
                  onPress={() => setSaveModalVisible(false)}
                >
                  <Text style={styles.modalButtonTextSecondary}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonPrimary]}
                  onPress={handleSaveConfirm}
                >
                  <Text style={styles.modalButtonTextPrimary}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>{debugInfo}</Text>
      </View>

    </View>
  );
};

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

export default CreateRouteScreen; 
import React, { useState, useRef } from 'react';
import { View, Alert, TouchableOpacity, Text, Switch, Platform, ScrollView, Modal, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import MapComponent from '../components/MapView';
import WaypointList from '../components/WaypointList';
import { HandDrawnRoute } from '../components/HandDrawnRoute';
import { MapIcons } from '../components/MapIcons';
import { theme } from '../styles/theme';
import { styles } from './styles/CreateRouteScreen.styles';
import type { RootStackParamList } from '../types/navigation';
import type { Region } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { StylePanel } from '../components/StylePanel';
import { IconPanel } from '../components/IconPanel';
import { RouteStyle, MapIcon } from '../types/map';

const screenWidth = Dimensions.get('window').width;

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
  const [isHandDrawnMode, setIsHandDrawnMode] = useState(false);
  const [mapIcons, setMapIcons] = useState<MapIcon[]>([]);
  const [selectedIconType, setSelectedIconType] = useState<string>('landmark');
  const [routeStyle, setRouteStyle] = useState<RouteStyle>({
    color: theme.colors.primary[500],
    strokeWidth: 3,
    handDrawnEffect: true
  });
  const [isIconPanelVisible, setIsIconPanelVisible] = useState(false);
  const [isStylePanelVisible, setIsStylePanelVisible] = useState(false);
  const [currentZoom, setCurrentZoom] = useState<number | null>(null);
  const [currentMapPosition, setCurrentMapPosition] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [editingWaypointName, setEditingWaypointName] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);

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

      // console.log('Saving route data:', JSON.stringify(routeData, null, 2));
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
    const zoomLevel = (region.latitudeDelta + region.longitudeDelta) / 2;
    setCurrentZoom(zoomLevel);
    setCurrentMapPosition(region);
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

  const handleIconAdd = (coordinate: Coordinates) => {
    const newIcon: MapIcon = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedIconType,
      position: coordinate,
      color: routeStyle.color,
      scale: 1
    };
    setMapIcons([...mapIcons, newIcon]);
  };

  const handleIconMove = (id: string, position: Coordinates) => {
    setMapIcons(prev => prev.map(icon => 
      icon.id === id ? { ...icon, position } : icon
    ));
  };

  const handleStyleChange = (updates: Partial<RouteStyle>) => {
    setRouteStyle(prev => ({ ...prev, ...updates }));
  };

  const handleExportMap = async () => {
    try {
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to save images');
        return;
      }

      // Generate map image (this is a placeholder - you'll need to implement actual map capture)
      const mapImage = await captureMap();
      
      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(mapImage);
      
      // Share options
      const shareOptions = {
        mimeType: 'image/png',
        dialogTitle: 'Share your travel map',
      };
      
      await Sharing.shareAsync(asset.uri, shareOptions);
    } catch (error) {
      console.error('Error exporting map:', error);
      Alert.alert('Error', 'Failed to export map. Please try again.');
    }
  };

  const captureMap = async () => {
    // This is a placeholder - you'll need to implement actual map capture
    // You might use react-native-view-shot or a similar library
    return 'path/to/captured/image.png';
  };

  // Update waypoint name handler
  const handleWaypointNameEdit = (index: number) => {
    setIsEditingName(true);
    setEditingNameIndex(index);
    setEditingWaypointName(waypoints[index].name || '');
  };

  const handleNameSave = () => {
    if (editingNameIndex !== null) {
      setWaypoints(prev => {
        const updated = [...prev];
        updated[editingNameIndex] = {
          ...updated[editingNameIndex],
          name: editingWaypointName.trim() || undefined
        };
        return updated;
      });
    }
    setIsEditingName(false);
    setEditingNameIndex(null);
    setEditingWaypointName('');
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
              {isSaving ? 'Saving...' : 'SAVE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mapContainer}>
          {!isHandDrawnMode && <MapComponent
            region={currentMapPosition}
            route={route.coordinates}
            markers={waypoints.map(wp => ({
              id: wp.id,
              coordinate: wp.coordinates
            }))}
            onMapPress={handleMapPress}
            onMarkerDragEnd={handleMarkerDragEnd}
            onRegionChange={handleRegionChange}
          />}
          
          {isHandDrawnMode && route.coordinates && (
            <HandDrawnRoute
              points={route.coordinates}
              style={routeStyle}
              width={screenWidth}
              height={300}
            />
          )}

          <MapIcons
            icons={mapIcons}
            onIconMove={handleIconMove}
          />
        </View>

        <View style={styles.routeDetailsContainer}>
          <View style={styles.routeDetailsHeader}>
            <View style={styles.routeDetailsTitleContainer}>
              <Ionicons name="map-outline" size={24} color={theme.colors.primary[500]} />
              <Text style={styles.routeDetailsTitle}>Route Details</Text>
            </View>
            <View style={styles.routeStyleControls}>
              <Text>Hand-drawn</Text>
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
          </View>

          <View style={styles.routeStyleSection}>
            <View style={styles.routeStyleHeader}>
              <Text style={styles.routeStyleTitle}>Route Style</Text>
            </View>
          </View>

          {waypoints.map((waypoint, index) => (
            <View key={waypoint.id} style={styles.waypointItem}>
              {isEditingName && editingNameIndex === index ? (
                <View style={styles.waypointNameEdit}>
                  <TextInput
                    style={styles.waypointNameInput}
                    value={editingWaypointName}
                    onChangeText={setEditingWaypointName}
                    placeholder="Enter waypoint name"
                    placeholderTextColor={theme.colors.text.secondary}
                    autoFocus
                    onSubmitEditing={handleNameSave}
                  />
                  <TouchableOpacity
                    onPress={handleNameSave}
                    style={styles.waypointNameSaveButton}
                  >
                    <Ionicons name="checkmark" size={20} color={theme.colors.primary[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditingName(false);
                      setEditingNameIndex(null);
                      setEditingWaypointName('');
                    }}
                    style={styles.waypointNameSaveButton}
                  >
                    <Ionicons name="close" size={20} color={theme.colors.error[500]} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleWaypointNameEdit(index)}
                  style={styles.waypointLabelContainer}
                >
                  <Text style={styles.waypointLabel}>
                    {waypoint.name || (index === 0 ? 'Start' : index === waypoints.length - 1 ? 'End' : `Waypoint ${index}`)}
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={styles.coordinatesText}>
                {formatCoordinates(waypoint.coordinates)}
              </Text>
              <View style={styles.waypointActions}>
                <TouchableOpacity
                  onPress={() => handleWaypointPress(index)}
                  style={styles.waypointActionButton}
                >
                  <Ionicons name="create-outline" size={20} color={theme.colors.primary[500]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleWaypointDelete(index)}
                  style={styles.waypointActionButton}
                >
                  <Ionicons name="trash-outline" size={20} color={theme.colors.error[500]} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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

      <Modal
        visible={isStylePanelVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsStylePanelVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Customize Style</Text>
              <TouchableOpacity
                onPress={() => setIsStylePanelVisible(false)}
              >
                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <StylePanel
                style={routeStyle}
                onStyleChange={handleStyleChange}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isIconPanelVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsIconPanelVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Icons</Text>
              <TouchableOpacity
                onPress={() => setIsIconPanelVisible(false)}
              >
                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <IconPanel
                selectedType={selectedIconType}
                onSelectType={(type) => {
                  setSelectedIconType(type);
                  setIsIconPanelVisible(false);
                  setDebugInfo('Tap on the map to add an icon');
                }}
              />
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
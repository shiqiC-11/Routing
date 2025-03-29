import React from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';
import { useMapAnchor } from '../hooks/useMapAnchor';

interface MapViewProps {
  region?: Region;
  markers?: Array<{
    id: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  }>;
  route?: Array<{
    latitude: number;
    longitude: number;
  }>;
  onRegionChange?: (region: Region) => void;
  onMarkerDragEnd?: (id: string, coordinate: { latitude: number; longitude: number }) => void;
  onMapPress?: (event: any) => void;
  autoAnchor?: boolean;
  preserveZoom?: boolean;
}

export const MapComponent: React.FC<MapViewProps> = ({
  region: initialRegion,
  route,
  markers,
  onMapPress,
  onMarkerDragEnd,
  onRegionChange,
  preserveZoom = true,
}) => {
  const { region, setRegion, loading, error } = useMapAnchor({
    routePoints: route,
    autoAnchor: false,
    defaultRegion: initialRegion,
    preserveZoom,
  });

  const handleRegionChange = (newRegion: Region) => {
    if (!loading) {
      setRegion(newRegion);
      onRegionChange?.(newRegion);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={region}
        onRegionChange={handleRegionChange}
        onPress={onMapPress}
        showsUserLocation
        showsMyLocationButton
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            identifier={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={(e) => onMarkerDragEnd?.(marker.id, e.nativeEvent.coordinate)}
            pinColor={theme.colors.primary[500]}
          />
        ))}
        {route && route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor={theme.colors.primary[500]}
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...commonStyles.grow,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    overflow: 'hidden',
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
});

export default MapComponent; 
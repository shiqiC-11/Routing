import React from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View, StyleSheet, Platform } from 'react-native';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';

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
}

const CustomMapView: React.FC<MapViewProps> = ({
  region,
  markers,
  route,
  onRegionChange,
  onMarkerDragEnd,
  onMapPress,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={region}
        onRegionChange={onRegionChange}
        onPress={onMapPress}
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
        {route && route.length > 1 && (
          <Polyline
            coordinates={route}
            strokeWidth={3}
            strokeColor={theme.colors.primary[500]}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.grow,
    backgroundColor: theme.colors.background,
  },
  map: {
    ...commonStyles.grow,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    overflow: 'hidden',
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
});

export default CustomMapView; 
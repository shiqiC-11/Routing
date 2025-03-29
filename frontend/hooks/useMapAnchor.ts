import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseMapAnchorProps {
  routePoints?: Coordinates[];
  autoAnchor?: boolean;
  defaultRegion?: Region;
  preserveZoom?: boolean;
}

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Default zoom levels
const ZOOM_LEVELS = {
  DEFAULT: 0.0922,  // Default zoom (city level)
  CLOSE: 0.01,      // Close zoom (street level)
  FAR: 0.5,         // Far zoom (country level)
};

export const useMapAnchor = ({
  routePoints,
  autoAnchor = true,
  defaultRegion = DEFAULT_REGION,
  preserveZoom = true,
}: UseMapAnchorProps = {}) => {
  const [region, setRegion] = useState<Region>(defaultRegion);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  // Initialize map region
  useEffect(() => {
    const initializeMap = async () => {
      if (!autoAnchor) {
        setLoading(false);
        return;
      }

      try {
        let newRegion: Region;

        // 1. First priority: Use route points if available
        if (routePoints && routePoints.length > 0) {
          console.log('Using route points for map region');
          const firstPoint = routePoints[0];
          newRegion = {
            latitude: firstPoint.latitude,
            longitude: firstPoint.longitude,
            latitudeDelta: defaultRegion.latitudeDelta,
            longitudeDelta: defaultRegion.longitudeDelta,
          };
        } else {
          // 2. Second priority: Try to get user's location
          console.log('Requesting location permission...');
          const { status } = await Location.requestForegroundPermissionsAsync();
          console.log('Location permission status:', status);
          
          if (status === 'granted') {
            console.log('Getting current position...');
            const location = await Location.getCurrentPositionAsync({});
            console.log('Current position:', location.coords);
            newRegion = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: defaultRegion.latitudeDelta,
              longitudeDelta: defaultRegion.longitudeDelta,
            };
          } else {
            console.log('Location permission denied, using default region');
            // 3. Third priority: Fallback to default region
            newRegion = defaultRegion;
          }
        }

        setRegion(newRegion);
      } catch (err) {
        console.error('Error determining map region:', err);
        setError(err instanceof Error ? err.message : 'Failed to determine map region');
        setRegion(defaultRegion);
      } finally {
        setLoading(false);
        isInitialMount.current = false;
      }
    };

    initializeMap();
  }, [routePoints, autoAnchor, defaultRegion]);

  return { region, setRegion, loading, error };
};
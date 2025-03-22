import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  BlurMask,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { RoutePoint, RouteStyle } from '../types/map';

interface HandDrawnRouteProps {
  points: RoutePoint[];
  style: RouteStyle;
  width: number;
  height: number;
}

const createHandDrawnPath = (points: RoutePoint[], width: number, height: number): SkPath => {
  const path = Skia.Path.Make();
  
  if (points.length < 2) return path;

  // Find the bounds of the route
  const bounds = points.reduce((acc, point) => ({
    minLat: Math.min(acc.minLat, point.latitude),
    maxLat: Math.max(acc.maxLat, point.latitude),
    minLng: Math.min(acc.minLng, point.longitude),
    maxLng: Math.max(acc.maxLng, point.longitude),
  }), {
    minLat: points[0].latitude,
    maxLat: points[0].latitude,
    minLng: points[0].longitude,
    maxLng: points[0].longitude,
  });

  // Calculate ranges
  const latRange = bounds.maxLat - bounds.minLat;
  const lngRange = bounds.maxLng - bounds.minLng;

  // Add padding (15% on each side)
  const padding = 0.15;
  const paddedLatRange = latRange * (1 + 2 * padding);
  const paddedLngRange = lngRange * (1 + 2 * padding);

  // Calculate the center of the bounds
  const centerLat = (bounds.maxLat + bounds.minLat) / 2;
  const centerLng = (bounds.maxLng + bounds.minLng) / 2;

  // Calculate scale to fit the smaller dimension
  const scaleX = width / paddedLngRange;
  const scaleY = height / paddedLatRange;
  const scale = Math.min(scaleX, scaleY);

  // Convert lat/lng to screen coordinates
  const screenPoints = points.map(point => {
    // Calculate position relative to center
    const relLng = point.longitude - centerLng;
    const relLat = point.latitude - centerLat;

    // Scale and center on canvas
    return {
      x: (width / 2) + (relLng * scale),
      y: (height / 2) - (relLat * scale), // Subtract because y increases downward
    };
  });

  // Draw the path starting from the first point
  const firstPoint = screenPoints[0];
  path.moveTo(firstPoint.x, firstPoint.y);

  // Create a hand-drawn effect by adding slight variations
  for (let i = 1; i < screenPoints.length; i++) {
    const prev = screenPoints[i - 1];
    const curr = screenPoints[i];
    
    // Calculate control points with slight random variations
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    
    // Scale variance based on the distance between points
    const distance = Math.sqrt(
      Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
    );
    const variance = Math.min(distance * 0.15, 3); // Reduced maximum variance
    
    const cp1x = midX + (Math.random() - 0.5) * variance;
    const cp1y = midY + (Math.random() - 0.5) * variance;
    
    path.quadTo(cp1x, cp1y, curr.x, curr.y);
  }

  return path;
};

export const HandDrawnRoute: React.FC<HandDrawnRouteProps> = ({
  points,
  style,
  width,
  height,
}) => {
  const progress = useSharedValue(0);
  const path = createHandDrawnPath(points, width, height);

  const animatedPath = useDerivedValue(() => {
    if (progress.value === 0) {
      return Skia.Path.Make(); // Don't draw anything yet
    }
  
    const animPath = Skia.Path.Make();
    const commands = path.toCmds();
    const length = commands.length * progress.value;
  
    let currentLength = 0;
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      if (currentLength > length) break;
  
      switch (cmd[0]) {
        case 0:
          animPath.moveTo(cmd[1], cmd[2]);
          break;
        case 2:
          animPath.quadTo(cmd[1], cmd[2], cmd[3], cmd[4]);
          break;
      }
      currentLength++;
    }
    console.log(animPath.toCmds());
    return animPath;
  });
  

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1000,
    });
  }, [points]);

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <Path
            path={animatedPath}
            style="stroke"
            strokeWidth={style.strokeWidth}
            strokeJoin="round"
            strokeCap="round"
            color={style.color}
          >
            <BlurMask blur={0.5} style="solid" />
          </Path>
        </Canvas>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
}); 
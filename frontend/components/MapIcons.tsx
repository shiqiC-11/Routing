import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { MapIcon } from '../types/map';
import { SvgIcon } from './SvgIcon';

interface MapIconsProps {
  icons: MapIcon[];
  onIconMove: (id: string, position: { latitude: number; longitude: number }) => void;
}

export const MapIcons: React.FC<MapIconsProps> = ({ icons, onIconMove }) => {
  return (
    <>
      {icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          onMove={onIconMove}
        />
      ))}
    </>
  );
};

interface DraggableIconProps {
  icon: MapIcon;
  onMove: (id: string, position: { latitude: number; longitude: number }) => void;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({ icon, onMove }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // Add spring animation for smooth end of drag
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);

      // Calculate new lat/lng position
      // Note: This is a simplified conversion. In a real app, you'd need to
      // convert screen coordinates to lat/lng based on the current map zoom level
      const newPosition = {
        latitude: icon.position.latitude + (translateY.value / 1000000),
        longitude: icon.position.longitude + (translateX.value / 1000000),
      };
      
      onMove(icon.id, newPosition);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <SvgIcon
          type={icon.type}
          color={icon.color}
          scale={icon.scale || 1}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../styles/theme';
import { RouteStyle } from '../types/map';

interface StylePanelProps {
  style: RouteStyle;
  onStyleChange: (updates: Partial<RouteStyle>) => void;
}

const COLORS = [
  '#FF5733', // Orange-Red
  '#33FF57', // Lime Green
  '#3357FF', // Blue
  '#FF33F5', // Pink
  '#33FFF5', // Cyan
  '#F5FF33', // Yellow
  '#8B33FF', // Purple
  '#FF8B33', // Orange
];

export const StylePanel: React.FC<StylePanelProps> = ({
  style,
  onStyleChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.colorGrid}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                style.color === color && styles.colorOptionSelected,
              ]}
              onPress={() => onStyleChange({ color })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stroke Width</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={style.strokeWidth}
          onValueChange={(value: number) => onStyleChange({ strokeWidth: value })}
          minimumTrackTintColor={theme.colors.primary[500]}
          maximumTrackTintColor={theme.colors.neutral[300]}
          thumbTintColor={theme.colors.primary[500]}
        />
        <Text style={styles.sliderValue}>{style.strokeWidth}px</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hand-drawn Effect</Text>
        <TouchableOpacity
          style={[
            styles.effectButton,
            style.handDrawnEffect && styles.effectButtonActive,
          ]}
          onPress={() => onStyleChange({ handDrawnEffect: !style.handDrawnEffect })}
        >
          <Text
            style={[
              styles.effectButtonText,
              style.handDrawnEffect && styles.effectButtonTextActive,
            ]}
          >
            {style.handDrawnEffect ? 'On' : 'Off'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.text.primary,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  colorOptionSelected: {
    borderColor: theme.colors.primary[500],
    borderWidth: 3,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  effectButton: {
    backgroundColor: theme.colors.neutral[100],
    padding: theme.spacing.md,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    alignItems: 'center',
  },
  effectButtonActive: {
    backgroundColor: theme.colors.primary[500],
  },
  effectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  effectButtonTextActive: {
    color: theme.colors.text.inverse,
  },
}); 
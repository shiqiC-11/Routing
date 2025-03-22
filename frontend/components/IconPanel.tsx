import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { SvgIcon } from './SvgIcon';

interface IconPanelProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ICON_TYPES = [
  { type: 'landmark', label: 'Landmark' },
  { type: 'cafe', label: 'Café' },
  { type: 'museum', label: 'Museum' },
  { type: 'restaurant', label: 'Restaurant' },
  { type: 'hotel', label: 'Hotel' },
  { type: 'shopping', label: 'Shopping' },
  { type: 'park', label: 'Park' },
];

export const IconPanel: React.FC<IconPanelProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Icon Type</Text>
      <View style={styles.grid}>
        {ICON_TYPES.map(({ type, label }) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.iconItem,
              selectedType === type && styles.iconItemSelected,
            ]}
            onPress={() => onSelectType(type)}
          >
            <SvgIcon
              type={type}
              color={selectedType === type ? theme.colors.primary[500] : theme.colors.text.primary}
              scale={1.5}
            />
            <Text
              style={[
                styles.iconLabel,
                selectedType === type && styles.iconLabelSelected,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    padding: theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  iconItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  iconItemSelected: {
    backgroundColor: theme.colors.primary[100],
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
  },
  iconLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  iconLabelSelected: {
    color: theme.colors.primary[500],
    fontWeight: 'bold',
  },
}); 
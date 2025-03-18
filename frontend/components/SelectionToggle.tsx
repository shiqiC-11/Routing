import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';

interface Option {
  value: string;
  label: string;
}

interface SelectionToggleProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const SelectionToggle: React.FC<SelectionToggleProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.toggleContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.toggleButton,
              value === option.value && styles.toggleButtonActive,
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[
                styles.toggleText,
                value === option.value && styles.toggleTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.subtitle2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  toggleContainer: {
    ...commonStyles.row,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    padding: theme.spacing.xxs,
  },
  toggleButton: {
    ...commonStyles.grow,
    ...commonStyles.center,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.primary[500],
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
  toggleText: {
    ...theme.typography.button,
    color: theme.colors.text.secondary,
  },
  toggleTextActive: {
    color: theme.colors.text.inverse,
  },
});

export default SelectionToggle; 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';

interface CoordinateInputProps {
  label: string;
  onSubmit: (coordinates: { latitude: number; longitude: number }) => void;
  initialCoordinates?: { latitude: number; longitude: number };
  error?: string;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
  label,
  onSubmit,
  initialCoordinates,
  error,
}) => {
  const [latitude, setLatitude] = useState(initialCoordinates?.latitude?.toString() || '');
  const [longitude, setLongitude] = useState(initialCoordinates?.longitude?.toString() || '');

  const handleSubmit = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      onSubmit({ latitude: lat, longitude: lng });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Latitude:</Text>
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
            placeholder="Enter latitude"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Longitude:</Text>
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
            placeholder="Enter longitude"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!latitude || !longitude) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!latitude || !longitude}
        >
          <Text style={styles.submitButtonText}>Set {label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.subtitle1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    gap: theme.spacing.sm,
  },
  inputWrapper: {
    gap: theme.spacing.xs,
  },
  inputLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  input: {
    ...commonStyles.input,
  },
  error: {
    ...theme.typography.caption,
    color: theme.colors.error[500],
    marginTop: theme.spacing.xs,
  },
  submitButton: {
    ...commonStyles.buttonPrimary,
    marginTop: theme.spacing.sm,
  },
  submitButtonDisabled: {
    opacity: theme.CONSTANTS.OPACITY.medium,
  },
  submitButtonText: {
    ...commonStyles.buttonText,
  },
});

export default CoordinateInput; 
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

interface RouteFormProps {
  onSubmit: (origin: string, destination: string) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = () => {
    if (origin && destination) {
      onSubmit(origin, destination);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter origin"
        value={origin}
        onChangeText={setOrigin}
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
        placeholderTextColor="#666"
      />
      <TouchableOpacity
        style={[styles.button, (!origin || !destination) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!origin || !destination}
      >
        <Text style={styles.buttonText}>Get Route</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RouteForm; 
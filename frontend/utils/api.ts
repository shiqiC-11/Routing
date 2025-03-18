import { Platform } from 'react-native';
import { config } from '../config';

export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:8000';
  }
  if (__DEV__) {
    return `http://${config.API_HOST}:8000`;
  }
  return `http://${config.API_HOST}:${config.API_PORT}`;
}; 
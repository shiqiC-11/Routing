import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.border,
    zIndex: 1,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  modeToggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  coordinateInputContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.border,
    zIndex: 1,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  debugContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.overlay.dark,
    padding: theme.spacing.sm,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    zIndex: 2,
  },
  debugText: {
    color: theme.colors.text.inverse,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  clearButton: {
    position: 'absolute',
    bottom: theme.spacing.xxl,
    alignSelf: 'center',
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    zIndex: 2,
    ...(Platform.OS === 'ios' ? theme.shadows.large.ios : theme.shadows.large.android),
  },
  clearButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
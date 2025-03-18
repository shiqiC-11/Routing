import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from './theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.large,
    backgroundColor: theme.colors.white,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: theme.spacing.small,
    marginRight: theme.spacing.small,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  saveButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.gray.light,
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: theme.colors.gray.medium,
  },
  content: {
    flex: 1,
  },
  modeToggleContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.light,
  },
  modeToggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.medium,
  },
  modeToggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  modeDescription: {
    fontSize: 14,
    color: theme.colors.gray.medium,
    marginTop: theme.spacing.small,
  },
  selectionContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  coordinateInputContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  routeInfoOverlay: {
    position: 'absolute',
    top: theme.spacing.medium,
    left: theme.spacing.medium,
    right: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    padding: theme.spacing.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  routeInfoText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  routeInfoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  statContainer: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.gray.medium,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: theme.spacing.large,
    left: theme.spacing.medium,
    right: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: theme.colors.error[500],
  },
  calculateButton: {
    backgroundColor: theme.colors.primary[500],
    marginLeft: theme.spacing.medium,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.small,
  },
  clearButtonText: {
    color: theme.colors.white,
  },
  calculateButtonText: {
    color: theme.colors.white,
  },
  debugContainer: {
    position: 'absolute',
    bottom: theme.spacing.xlarge + 60,
    left: theme.spacing.medium,
    right: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.small,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  debugText: {
    fontSize: 12,
    color: theme.colors.gray.dark,
  },
  waypointListContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
}); 
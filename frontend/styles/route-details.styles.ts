import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error[500],
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  retryButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
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
  deleteButton: {
    padding: theme.spacing.small,
  },
  content: {
    flex: 1,
  },
  routeInfoCard: {
    backgroundColor: theme.colors.white,
    margin: theme.spacing.medium,
    padding: theme.spacing.large,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  routeDescription: {
    fontSize: 14,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.large,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray.light,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.small,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.gray.medium,
  },
  mapContainer: {
    height: 300,
    margin: theme.spacing.medium,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    overflow: 'hidden',
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  coordinatesCard: {
    backgroundColor: theme.colors.white,
    margin: theme.spacing.medium,
    padding: theme.spacing.large,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  coordinateItem: {
    marginBottom: theme.spacing.medium,
  },
  coordinateLabel: {
    fontSize: 14,
    color: theme.colors.gray.medium,
    marginBottom: theme.spacing.small,
  },
  coordinateValue: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
}); 
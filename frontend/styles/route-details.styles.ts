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
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.md,
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
    backgroundColor: theme.colors.background,
  },
  routeInfoCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.large,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    marginBottom: theme.spacing.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  routeDescription: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.large,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.small,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  mapContainer: {
    height: 300,
    width: '100%',
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.medium,
  },
  coordinatesCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.large,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.large,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  coordinateItem: {
    marginBottom: theme.spacing.medium,
  },
  coordinateLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.small,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  coordinateValue: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 24,
  },
  routeStyleControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    marginBottom: theme.spacing.medium,
  },
  routeStyleLabel: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  detailsContainer: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
}); 
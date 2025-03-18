import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from './theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - theme.spacing.large * 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.xlarge,
    backgroundColor: theme.colors.white,
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.medium,
    padding: theme.spacing.small,
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  routeList: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  routeCard: {
    width: CARD_WIDTH,
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.medium,
    overflow: 'hidden',
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  routeImage: {
    width: '100%',
    height: 150,
    backgroundColor: theme.colors.gray.light,
    justifyContent: 'flex-end',
    padding: theme.spacing.small,
  },
  routeStats: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.small,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.small,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  routeInfo: {
    padding: theme.spacing.medium,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  routeDescription: {
    fontSize: 14,
    color: theme.colors.gray.medium,
  },
  createButton: {
    position: 'absolute',
    right: theme.spacing.large,
    bottom: theme.spacing.large,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
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
    padding: theme.spacing.large,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text.primary,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.gray.medium,
    textAlign: 'center',
  },
}); 
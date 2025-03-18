import { StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';
import { theme } from './theme';

export interface CommonStyles {
  // Layout
  container: ViewStyle;
  safeArea: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
  grow: ViewStyle;
  wrap: ViewStyle;
  center: ViewStyle;
  spaceBetween: ViewStyle;
  
  // Spacing
  padding: ViewStyle;
  margin: ViewStyle;
  gap: ViewStyle;
  
  // Card
  card: ViewStyle;
  cardElevated: ViewStyle;
  cardHeader: ViewStyle;
  cardTitle: TextStyle;
  
  // Input
  input: TextStyle;
  inputFocused: TextStyle;
  inputError: TextStyle;
  inputDisabled: TextStyle;
  inputLabel: TextStyle;
  inputHelper: TextStyle;
  errorText: TextStyle;
  
  // Button
  button: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  buttonOutline: ViewStyle;
  buttonText: TextStyle;
  buttonTextDisabled: TextStyle;
  buttonLabel: TextStyle;
  iconButton: ViewStyle;
  
  // List
  list: ViewStyle;
  listContent: ViewStyle;
  listSeparator: ViewStyle;
  listEmpty: ViewStyle;
  
  // Modal
  modal: ViewStyle;
  modalContent: ViewStyle;
  modalHeader: ViewStyle;
  modalFooter: ViewStyle;
  modalOverlay: ViewStyle;
  modalTitle: TextStyle;
  
  // FAB
  fab: ViewStyle;
  fabSecondary: ViewStyle;
  
  // Badge
  badge: ViewStyle;
  badgeText: TextStyle;
  
  // Avatar
  avatar: ViewStyle;
  avatarImage: ViewStyle;
  avatarText: TextStyle;
  
  // Progress
  progressBar: ViewStyle;
  progressCircle: ViewStyle;
}

export const commonStyles = StyleSheet.create<CommonStyles>({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  grow: {
    flex: 1,
  },
  wrap: {
    flexWrap: 'wrap',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Spacing
  padding: {
    padding: theme.spacing.md,
  },
  margin: {
    margin: theme.spacing.md,
  },
  gap: {
    gap: theme.spacing.md,
  },
  
  // Card
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
  cardElevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    ...(Platform.OS === 'ios' ? theme.shadows.md.ios : theme.shadows.md.android),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  
  // Input
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text.primary,
    ...theme.typography.body1,
  },
  inputFocused: {
    borderColor: theme.colors.primary[500],
    borderWidth: 2,
  },
  inputError: {
    borderColor: theme.colors.error[500],
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: theme.colors.neutral[100],
    color: theme.colors.text.disabled,
  },
  inputLabel: {
    ...theme.typography.subtitle2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  inputHelper: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error[500],
    marginTop: theme.spacing.xs,
  },
  
  // Button
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary[500],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
  buttonTextDisabled: {
    color: theme.colors.text.disabled,
  },
  buttonLabel: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[500],
  },
  
  // List
  list: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  listSeparator: {
    height: 1,
    backgroundColor: theme.colors.neutral[200],
  },
  listEmpty: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Modal
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    padding: theme.spacing.lg,
    ...(Platform.OS === 'ios' ? theme.shadows.lg.ios : theme.shadows.lg.android),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: `rgba(0, 0, 0, ${theme.CONSTANTS.OPACITY.high})`,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios' ? theme.shadows.md.ios : theme.shadows.md.android),
  },
  fabSecondary: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.secondary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios' ? theme.shadows.md.ios : theme.shadows.md.android),
  },
  
  // Badge
  badge: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xxs,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
  },
  
  // Avatar
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: theme.colors.primary[700],
    ...theme.typography.subtitle2,
  },
  
  // Progress
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.neutral[200],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: theme.colors.neutral[200],
  },
}); 
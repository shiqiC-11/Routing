import { StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from '../../styles/theme';
import { commonStyles } from '../../styles/common.styles';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 44 : 40,
    backgroundColor: theme.colors.primary[500],
  },
  header: {
    ...commonStyles.spaceBetween,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  headerLeft: {
    ...commonStyles.row,
  },
  backButton: {
    ...commonStyles.iconButton,
    backgroundColor: theme.colors.primary[400],
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.md,
  },
  saveButton: {
    ...commonStyles.button,
    height: 40,
    backgroundColor: theme.colors.surface,
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.primary[400],
  },
  saveButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary[500],
  },
  saveButtonTextDisabled: {
    color: theme.colors.text.disabled,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  splitContainer: {
    flexDirection: 'column',
  },
  waypointPanel: {
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  mapPanel: {
    height: 300,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    ...theme.shadows.sm,
  },
  routeInfoCard: {
    ...commonStyles.card,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  routeInfoHeader: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    backgroundColor: theme.colors.primary[500],
  },
  routeInfoTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.inverse,
    textAlign: 'center',
  },
  routeInfoContent: {
    padding: theme.spacing.md,
  },
  routeInfoRow: {
    ...commonStyles.row,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  routeInfoItem: {
    ...commonStyles.grow,
    ...commonStyles.row,
    paddingHorizontal: theme.spacing.md,
  },
  routeInfoIcon: {
    ...commonStyles.center,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.neutral[100],
    width: 40,
    height: 40,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
  },
  routeInfoDetails: {
    ...commonStyles.grow,
  },
  routeInfoLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.text.secondary,
  },
  routeInfoValue: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  routeInfoDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.neutral[200],
  },
  routeInfoStats: {
    ...commonStyles.row,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.neutral[50],
  },
  routeInfoStat: {
    ...commonStyles.grow,
    alignItems: 'center',
  },
  routeInfoStatLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.text.secondary,
  },
  routeInfoStatValue: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios' ? theme.shadows.medium.ios : theme.shadows.medium.android),
  },
  fabPrimary: {
    backgroundColor: theme.colors.primary[500],
  },
  fabSecondary: {
    backgroundColor: theme.colors.error[500],
  },
  debugContainer: {
    position: 'absolute',
    bottom: theme.spacing.xl + 80,
    left: theme.spacing.xl,
    right: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    ...(Platform.OS === 'ios' ? theme.shadows.small.ios : theme.shadows.small.android),
  },
  debugText: {
    fontSize: 12,
    color: theme.colors.gray.dark,
    textAlign: 'center',
  },
  modalOverlay: {
    ...commonStyles.modalOverlay,
  },
  modalCard: {
    ...commonStyles.modalContent,
  },
  modalHeader: {
    ...commonStyles.modalHeader,
  },
  modalTitle: {
    ...commonStyles.modalTitle,
  },
  modalCloseButton: {
    padding: theme.spacing.sm,
  },
  modalContent: {
    padding: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.xl,
  },
  inputLabel: {
    ...commonStyles.inputLabel,
  },
  requiredStar: {
    color: theme.colors.error[500],
  },
  input: {
    ...commonStyles.input,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    ...commonStyles.inputError,
  },
  errorText: {
    ...commonStyles.errorText,
  },
  inputHelper: {
    ...commonStyles.inputHelper,
  },
  modalFooter: {
    ...commonStyles.modalFooter,
  },
  modalButton: {
    ...commonStyles.button,
  },
  modalButtonPrimary: {
    ...commonStyles.buttonPrimary,
  },
  modalButtonSecondary: {
    backgroundColor: theme.colors.neutral[200],
  },
  modalButtonTextPrimary: {
    ...commonStyles.buttonLabel,
  },
  modalButtonTextSecondary: {
    ...commonStyles.buttonLabel,
    color: theme.colors.text.primary,
  },
}); 
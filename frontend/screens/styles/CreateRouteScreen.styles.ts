import { StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from '../../styles/theme';
import { commonStyles } from '../../styles/common.styles';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
    margin: theme.spacing.md,
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
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.medium,
    backgroundColor: theme.colors.surface,
    minHeight: 60,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  cardTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.sm,
  },
  switchLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  splitContainer: {
    flexDirection: 'column',
  },
  waypointPanel: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    overflow: 'hidden',
  },
  waypointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    backgroundColor: theme.colors.surface,
  },
  waypointHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  waypointHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  waypointTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  mapPanel: {
    height: 300,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    padding: theme.spacing.md,
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
  styleButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
  },
  styleButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary[500],
    marginLeft: theme.spacing.sm,
  },
  iconButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
  },
  iconButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary[500],
    marginLeft: theme.spacing.sm,
  },
  exportButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
  },
  exportButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary[500],
    marginLeft: theme.spacing.sm,
  },
  colorPicker: {
    marginBottom: theme.spacing.xl,
  },
  colorPickerLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.sm,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.neutral[200],
  },
  colorOptionSelected: {
    borderColor: theme.colors.primary[500],
    borderWidth: 3,
  },
  strokeWidthSlider: {
    marginBottom: theme.spacing.xl,
  },
  strokeWidthLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.sm,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  iconGridItem: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    backgroundColor: theme.colors.neutral[100],
  },
  iconGridItemSelected: {
    backgroundColor: theme.colors.primary[100],
    borderColor: theme.colors.primary[500],
    borderWidth: 2,
  },
  iconGridItemLabel: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  mapContainer: {
    height: 300,
    width: '100%',
  },
  routeDetailsContainer: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    borderTopRightRadius: theme.CONSTANTS.BORDER_RADIUS.lg,
    marginTop: -20,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    minHeight: 200,
  },
  routeDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  routeDetailsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDetailsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  routeStyleSection: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    padding: theme.spacing.md,
  },
  routeStyleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeStyleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  routeStyleControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  waypointItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  waypointLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    width: 80,
  },
  coordinatesText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginHorizontal: theme.spacing.md,
  },
  waypointActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  waypointActionButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.sm,
    backgroundColor: theme.colors.neutral[100],
  },
  waypointNameEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  waypointNameInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: 8,
    marginRight: 8,
  },
  waypointNameSaveButton: {
    padding: 4,
    marginLeft: 4,
  },
  waypointLabelContainer: {
    flex: 1,
    marginRight: 8,
  },
}); 
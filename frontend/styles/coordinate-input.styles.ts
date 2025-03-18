import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    marginVertical: theme.spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
  inputLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    color: theme.colors.text.primary,
  },
  error: {
    color: theme.colors.error[500],
    fontSize: 14,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing.md,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.neutral[200],
  },
  submitButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
}); 
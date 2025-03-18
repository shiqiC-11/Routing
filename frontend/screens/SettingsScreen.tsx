import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Language</Text>
          <Switch />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Profile</Text>
          <Switch />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy</Text>
          <Switch />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  settingLabel: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
});

export default SettingsScreen; 
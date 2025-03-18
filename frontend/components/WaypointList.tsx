import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { commonStyles } from '../styles/common.styles';

interface Waypoint {
  id: string;
  name?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface WaypointListProps {
  waypoints: Waypoint[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

const WaypointList: React.FC<WaypointListProps> = ({
  waypoints,
  onMoveUp,
  onMoveDown,
  onDelete,
  onEdit,
}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
    >
      {waypoints.map((waypoint, index) => (
        <View key={waypoint.id} style={styles.waypointItem}>
          <View style={styles.waypointContent}>
            <View style={styles.waypointLeft}>
              <Text style={styles.waypointType}>
                {index === 0 ? 'Start' : index === waypoints.length - 1 ? 'End' : `Stop ${index}`}
              </Text>
              <Text style={styles.waypointCoords}>
                {`${waypoint.coordinates.latitude.toFixed(6)}, ${waypoint.coordinates.longitude.toFixed(6)}`}
              </Text>
            </View>
            <View style={styles.waypointActions}>
              {index > 0 && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onMoveUp(index)}
                >
                  <Ionicons name="chevron-up" size={20} color={theme.colors.text.primary} />
                </TouchableOpacity>
              )}
              {index < waypoints.length - 1 && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onMoveDown(index)}
                >
                  <Ionicons name="chevron-down" size={20} color={theme.colors.text.primary} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onEdit(index)}
              >
                <Ionicons name="pencil" size={18} color={theme.colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onDelete(index)}
              >
                <Ionicons name="trash-outline" size={18} color={theme.colors.error[500]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  waypointItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    ...(Platform.OS === 'ios' ? theme.shadows.sm.ios : theme.shadows.sm.android),
  },
  waypointContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waypointLeft: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  waypointType: {
    ...theme.typography.subtitle1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  waypointCoords: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  waypointActions: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: theme.CONSTANTS.BORDER_RADIUS.round,
    backgroundColor: theme.colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WaypointList; 
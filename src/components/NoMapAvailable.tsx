import { Text, View, StyleSheet } from 'react-native';
import { globalStyles, spacing, typography } from '../styles/globalStyles';

export function NoMapAvailable() {
  return (
    <View style={[globalStyles.screen, globalStyles.centerContainer]}>
      <View style={styles.noMapContainer}>
        <Text style={[typography.label, { fontSize: 18 }]}>
          Sorry, the map is unavailable
        </Text>
        <Text style={[typography.label, { fontSize: 14 }]}>
          The map isn&apos;t supported on Android yet
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noMapContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
});

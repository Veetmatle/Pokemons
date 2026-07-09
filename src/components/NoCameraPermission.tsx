import { Linking, Pressable, Text, View, StyleSheet } from 'react-native';
import {
  colors,
  globalStyles,
  radius,
  shadow,
  spacing,
  typography,
} from '../styles/globalStyles';

export function NoCameraPermission() {
  return (
    <View style={[globalStyles.screen, globalStyles.centerContainer]}>
      <View style={styles.noPermissionContainer}>
        <Text style={[typography.label, { fontSize: 18 }]}>
          Cannot use the camera
        </Text>
        <Text style={[typography.label, { fontSize: 14 }]}>
          Provide permissions to use this feature
        </Text>
        <Pressable style={styles.button} onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>Open Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noPermissionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow('sm'),
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

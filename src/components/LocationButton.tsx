import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../styles/globalStyles';

interface AnimatedLocationButtonProps {
  onPress: () => Promise<void>;
  disabled?: boolean;
}

export const LocationButton = ({
  onPress,
  disabled,
}: AnimatedLocationButtonProps) => {
  const opacityValue = useSharedValue(0.4);
  const insets = useSafeAreaInsets();

  const animateOpacity = (toValueOpacity: number) => {
    opacityValue.value = withTiming(toValueOpacity, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateOpacity(0.9)}
      onPressOut={() => animateOpacity(0.4)}
      disabled={disabled}>
      <Animated.View
        style={[
          styles.recenterButton,
          { bottom: insets.bottom + spacing.locationButton },
          animatedStyle,
        ]}>
        <Text style={styles.recenterButtonText}>◎</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recenterButton: {
    position: 'absolute',
    right: spacing.xl + 10,
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    borderColor: colors.accentMedium,
    borderWidth: 1,
    backgroundColor: colors.accentMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recenterButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.surface,
  },
});

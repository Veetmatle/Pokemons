import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { globalStyles, spacing, typography } from '../styles/globalStyles';

export function NoFavouritePokemon() {
  const opacity = useSharedValue<number>(1);
  const duration = 1500;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    opacity.value = withRepeat(withTiming(0, { duration: duration }), -1, true);
  }, [opacity]);

  return (
    <View style={[globalStyles.screen, globalStyles.centerContainer]}>
      <View style={styles.noFavPokemonContainer}>
        <View style={styles.animatedTextView}>
          <Animated.Text
            style={[typography.label, animatedStyle, { fontSize: 18 }]}>
            No favourite pokemons found
          </Animated.Text>
        </View>
        <Animated.Text
          style={[typography.label, animatedStyle, { fontSize: 14 }]}>
          Add your fav pokemon from the pokemon list
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noFavPokemonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
  animatedTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

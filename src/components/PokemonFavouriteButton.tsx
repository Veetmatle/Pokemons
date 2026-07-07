import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritePokemon } from '../hooks/useFavoritePokemon';
import { colors, radius, shadow, spacing } from '../styles/globalStyles';
import { showSuccessToast } from '../utils/toast';

interface PokemonFavouriteButtonProps {
  pokemonId: number;
  pokemonName: string;
  isFavouriteScreen: boolean;
  onPress?: () => void;
}

const PokemonFavouriteButton = ({
  pokemonId,
  pokemonName,
  isFavouriteScreen,
  onPress,
}: PokemonFavouriteButtonProps) => {
  const scaleValue = useSharedValue(1);
  const { isFavorite, addFavorite, removeFavorite } =
    useFavoritePokemon(pokemonId);

  const animateTo = (toValue: number) => {
    scaleValue.value = withSpring(toValue, {
      stiffness: 200, // szybkość animacji
      damping: 15, // bounciness
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const handlePress = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(isFavouriteScreen);
        showSuccessToast('Pokemon removed from fav', 'top');
      } else {
        await addFavorite(pokemonName);
        showSuccessToast('Pokemon added to fav', 'top');
      }
    } catch (error) {
      console.error('Failed to update favorite pokemon ', error);
    }

    if (onPress) onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => animateTo(0.96)}
      onPressOut={() => animateTo(1)}
      hitSlop={10}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: isFavorite ? colors.danger : colors.accent },
          ]}>
          <Ionicons
            name={isFavorite ? 'heart-dislike' : 'heart'}
            size={22}
            color={colors.surface}
          />
        </View>
        <Text style={styles.text}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingRight: spacing.lg,
    paddingLeft: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow('sm'),
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

export default PokemonFavouriteButton;

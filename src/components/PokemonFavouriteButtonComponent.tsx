import { Animated, Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getFavoritePokemon,
  handleAdd,
  handleRemove,
} from '../services/favoriteStorage';
import { colors, radius, shadow, spacing } from '../styles/globalStyles';

interface PokemonFavouriteButtonComponentProps {
  pokemonId: number;
  pokemonName: string;
}

const PokemonFavouriteButtonComponent = ({
  pokemonId,
  pokemonName,
}: PokemonFavouriteButtonComponentProps) => {
  const [scale] = useState(() => new Animated.Value(1));
  const [isFavorite, setIsFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkIsFavorite = async () => {
        const favorite = await getFavoritePokemon();
        setIsFavorite(favorite?.id === pokemonId);
      };

      checkIsFavorite();
    }, [pokemonId]),
  );

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      speed: 40,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = async () => {
    try {
      if (isFavorite) {
        await handleRemove(setIsFavorite);
      } else {
        await handleAdd(pokemonId, pokemonName, setIsFavorite);
      }
    } catch (error) {
      console.error('Failed to update favorite pokemon:', error);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => animateTo(0.96)}
      onPressOut={() => animateTo(1)}
      hitSlop={10}>
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
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

export default PokemonFavouriteButtonComponent;

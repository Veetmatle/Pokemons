import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Image from './Image';
import { memo, useState } from 'react';
import Feather from './Icon';
import { colors, radius, shadow, spacing, typography } from '../styles/globalStyles';

const ImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: (pokemonName: string, pokemonId: number) => void;
}

const PokemonListItemComponent = ({
  name,
  id,
  onPress,
}: PokemonListItemProps) => {
  const imageUrl = `${ImageUrl}${id}.png`;
  const [scale] = useState(() => new Animated.Value(1));

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      speed: 40,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => onPress(name, id)}
      onPressIn={() => animateTo(0.96)}
      onPressOut={() => animateTo(1)}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            transition={250}
            cachePolicy="memory-disk"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={typography.label}>#{id.toString().padStart(3, '0')}</Text>
          <Text style={typography.title}>{name.toUpperCase()}</Text>
        </View>

        <Feather name="chevron-right" size={22} color={colors.accent} style={styles.chevron} />
      </Animated.View>
    </Pressable>
  );
};

export default memo(PokemonListItemComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow('md'),
  },
  imageWrapper: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: radius.md,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 70,
    width: 70,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.lg,
    justifyContent: 'center',
    gap: 2,
  },
  chevron: {
    marginLeft: 'auto',
    paddingRight: spacing.xs,
    opacity: 0.8,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Image from './Image';
import { memo } from 'react';
import Feather from './Icon';
import {
  colors,
  radius,
  shadow,
  spacing,
  typography,
} from '../styles/globalStyles';
import { getPokemonGitHubImageUrlById } from '../services/pokemonService';

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: (pokemonName: string, pokemonId: number) => void;
}

const PokemonListItem = ({ name, id, onPress }: PokemonListItemProps) => {
  const imageUrl = getPokemonGitHubImageUrlById(id);
  const scaleValue = useSharedValue(1);

  const animateTo = (toValue: number) => {
    scaleValue.value = withSpring(toValue, {
      stiffness: 300,
      damping: 15,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <Pressable
      onPress={() => onPress(name, id)}
      onPressIn={() => animateTo(0.96)}
      onPressOut={() => animateTo(1)}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            cachePolicy="memory-disk"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={typography.label}>
            #{id.toString().padStart(3, '0')}
          </Text>
          <Text style={typography.title}>{name.toUpperCase()}</Text>
        </View>

        <Feather
          name="chevron-right"
          size={22}
          color={colors.accent}
          style={styles.chevron}
        />
      </Animated.View>
    </Pressable>
  );
};

export default memo(PokemonListItem);

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

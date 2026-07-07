import { Pressable, Alert, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clearFavoritePokemon } from '../services/favoriteStorage';
import { colors, radius, shadow, spacing } from '../styles/globalStyles';

interface Props {
  onRemoved: () => void;
}

export default function PokemonRemoveFavouriteButtonComponent({
  onRemoved,
}: Props) {
  const handlePress = () => {
    Alert.alert(
      'Remove favorite?',
      'Are you sure you want to remove this Pokemon from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearFavoritePokemon();
              onRemoved();
            } catch (error) {
              console.error('Failed to remove favorite pokemon: ', error);
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <Pressable onPress={handlePress} hitSlop={10}>
        <View style={styles.button}>
          <View style={[{ backgroundColor: colors.danger }, styles.iconBox]}>
            <Ionicons name="heart-dislike" size={22} color={colors.surface} />
          </View>
          <Text style={styles.text}>Remove from Favorites</Text>
        </View>
      </Pressable>
    </>
  );
}

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

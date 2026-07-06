import { Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clearFavoritePokemon } from '../services/favoriteStorage';

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
      <Pressable
        onPress={handlePress}
        hitSlop={10}
        style={({ pressed }) => [
          pressed && { opacity: 0.6, transform: [{ scale: 0.92 }] },
        ]}>
        <Ionicons name="heart-dislike-outline" size={48} color="red" />
      </Pressable>
    </>
  );
}

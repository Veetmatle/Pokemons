import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  setFavoritePokemon,
  checkFavouritePokemonExists,
  askUserToReplaceFavorite,
} from '../services/favoriteStorage';

interface PokemonFavouriteButtonComponentProps {
  pokemonId: number;
  pokemonName: string;
}

const PokemonFavouriteButtonComponent = ({
  pokemonId,
  pokemonName,
}: PokemonFavouriteButtonComponentProps) => {
  const handlePress = async () => {
    try {
      const favoriteExists = await checkFavouritePokemonExists();
      if (favoriteExists === true) {
        const userWantsToReplace = await askUserToReplaceFavorite();
        if (!userWantsToReplace) return;
      }
      await setFavoritePokemon({ id: pokemonId, name: pokemonName });
      console.log('Fav pokemon added to storage');
    } catch (error) {
      console.error('Failed to save favorite pokemon:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} hitSlop={10} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Ionicons name="heart" size={48} color="red" />
          <Ionicons
            name="heart-outline"
            size={48}
            color="black"
            style={styles.outline}
          />
        </View>
        <Text style={styles.text} numberOfLines={1}>
          Add to fav
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  outline: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    marginTop: 4,
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PokemonFavouriteButtonComponent;

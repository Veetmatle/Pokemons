import React from 'react';
import { Pressable, View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setFavoritePokemon } from '../services/favoriteStorage';
import { checkFavouritePokemonExists } from '../services/pokemonService';

interface PokemonFavouriteButtonComponentProps {
  pokemonId: number;
  pokemonName: string;
}

const askUserToReplaceFavorite = (): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(
      'Replace favorite?',
      'Are you sure you want to replace this Pokemon for favorites?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Replace', style: 'destructive', onPress: () => resolve(true) },
      ],
      { onDismiss: () => resolve(false) },
    );
  });
};

const PokemonFavouriteButtonComponent = ({
  pokemonId,
  pokemonName,
}: PokemonFavouriteButtonComponentProps) => {
  const handlePress = async () => {
    try {
      const favoriteExists = await checkFavouritePokemonExists(pokemonName);
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
          <Ionicons name="heart" size={40} color="red" />
          <Ionicons
            name="heart-outline"
            size={40}
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
    paddingVertical: 40,
  },
  button: {
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  outline: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PokemonFavouriteButtonComponent;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const FAVORITE_KEY = 'favoritePokemon';

export interface FavoritePokemon {
  id: number;
  name: string;
}

export const getFavoritePokemon = async (): Promise<FavoritePokemon | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading favorite Pokemon from storage', e);
    return null;
  }
};

export const setFavoritePokemon = async (
  pokemon: FavoritePokemon,
): Promise<void> => {
  await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(pokemon));
};

export const clearFavoritePokemon = async (): Promise<void> => {
  await AsyncStorage.removeItem(FAVORITE_KEY);
};

export const askUserToReplaceFavorite = (): Promise<boolean> => {
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

export const checkFavouritePokemonExists = async (): Promise<boolean> => {
  try {
    const favoritePokemon = await getFavoritePokemon();
    return favoritePokemon !== null;
  } catch (error) {
    console.error('PokemonService checkFavouritePokemonExists error:', error);
    return false;
  }
};

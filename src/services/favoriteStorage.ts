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
    console.error('Reading fav poke from storage', e);
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
      'You sure want to replace fav poke?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Replace', style: 'destructive', onPress: () => resolve(true) },
      ],
      { onDismiss: () => resolve(false) },
    );
  });
};

// do wyniesienia na zewnatrz, react native toast message zamist alertu
export const checkFavouritePokemonExists = async (): Promise<boolean> => {
  try {
    const favoritePokemon = await getFavoritePokemon();
    return favoritePokemon !== null;
  } catch (error) {
    console.error('PokemonService error:', error);
    return false;
  }
};

export const askUserToConfirmFavoriteRemove = (): Promise<boolean> =>
  new Promise(resolve => {
    Alert.alert(
      'Remove favorite?',
      'Are you sure you want to remove favourite?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => resolve(true),
        },
      ],
      { onDismiss: () => resolve(false) },
    );
  });

export const handleRemove = async (setTheState: (value: boolean) => void) => {
  const userWantsToRemove = await askUserToConfirmFavoriteRemove();
  if (!userWantsToRemove) return;
  await clearFavoritePokemon();
  setTheState(false);
};

export const handleAdd = async (
  pokemonId: number,
  pokemonName: string,
  setTheState: (value: boolean) => void,
) => {
  const favoriteExists = await checkFavouritePokemonExists();
  if (favoriteExists) {
    const userWantsToReplace = await askUserToReplaceFavorite();
    if (!userWantsToReplace) return;
  }
  await setFavoritePokemon({ id: pokemonId, name: pokemonName });
  setTheState(true);
};

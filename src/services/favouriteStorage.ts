import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const FAVOURITE_KEY = 'favouritePokemon';

export interface FavouritePokemon {
  id: number;
  name: string;
}

export const getFavouritePokemon = async (): Promise<FavouritePokemon | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVOURITE_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Reading fav poke from storage', e);
    return null;
  }
};

export const setFavouritePokemon = async (
  pokemon: FavouritePokemon,
): Promise<void> => {
  await AsyncStorage.setItem(FAVOURITE_KEY, JSON.stringify(pokemon));
};

export const clearFavouritePokemon = async (): Promise<void> => {
  await AsyncStorage.removeItem(FAVOURITE_KEY);
};

export const askUserToReplaceFavourite = (): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(
      'Replace favourite?',
      'You sure want to replace fav poke?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Replace', style: 'destructive', onPress: () => resolve(true) },
      ],
      { onDismiss: () => resolve(false) },
    );
  });
};

export const askUserToConfirmFavouriteRemove = (): Promise<boolean> =>
  new Promise(resolve => {
    Alert.alert(
      'Remove favourite?',
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

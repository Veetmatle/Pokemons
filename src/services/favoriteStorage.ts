import AsyncStorage from '@react-native-async-storage/async-storage';

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

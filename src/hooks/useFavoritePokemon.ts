import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  askUserToConfirmFavoriteRemove,
  askUserToReplaceFavorite,
  clearFavoritePokemon,
  getFavoritePokemon,
  setFavoritePokemon,
} from '../services/favoriteStorage';

export const useFavoritePokemon = (pokemonId: number) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkIsFavorite = async () => {
        const favorite = await getFavoritePokemon();
        setIsFavorite(favorite?.id === pokemonId);
      };

      checkIsFavorite();
    }, [pokemonId]),
  );

  const removeFavorite = async (isMainScreen: boolean) => {
    let userWantsToRemove = true;
    if (isMainScreen) {
      userWantsToRemove = await askUserToConfirmFavoriteRemove();
      if (!userWantsToRemove) return;
    }
    if (!userWantsToRemove) return;
    await clearFavoritePokemon();
    setIsFavorite(false);
  };

  const addFavorite = async (pokemonName: string) => {
    const favoriteExists = (await getFavoritePokemon()) !== null;
    if (favoriteExists) {
      const userWantsToReplace = await askUserToReplaceFavorite();
      if (!userWantsToReplace) return;
    }
    await setFavoritePokemon({ id: pokemonId, name: pokemonName });
    setIsFavorite(true);
  };

  return { isFavorite, addFavorite, removeFavorite };
};

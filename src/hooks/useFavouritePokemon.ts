import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  askUserToConfirmFavouriteRemove,
  askUserToReplaceFavourite,
  clearFavouritePokemon,
  getFavouritePokemon,
  setFavouritePokemon,
} from '../services/favouriteStorage';

export const useFavouritePokemon = (pokemonId: number) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkIsFavourite = async () => {
        const favourite = await getFavouritePokemon();
        setIsFavourite(favourite?.id === pokemonId);
      };

      checkIsFavourite();
    }, [pokemonId]),
  );

  const removeFavourite = async (isMainScreen: boolean) => {
    let userWantsToRemove = true;
    if (isMainScreen) {
      userWantsToRemove = await askUserToConfirmFavouriteRemove();
      if (!userWantsToRemove) return;
    }
    if (!userWantsToRemove) return;
    await clearFavouritePokemon();
    setIsFavourite(false);
  };

  const addFavourite = async (pokemonName: string) => {
    const favouriteExists = (await getFavouritePokemon()) !== null;
    if (favouriteExists) {
      const userWantsToReplace = await askUserToReplaceFavourite();
      if (!userWantsToReplace) return;
    }
    await setFavouritePokemon({ id: pokemonId, name: pokemonName });
    setIsFavourite(true);
  };

  return { isFavourite, addFavourite, removeFavourite };
};

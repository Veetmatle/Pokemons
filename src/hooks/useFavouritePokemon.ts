import { favouritePokemonStore } from '../services/favouritePokemonStore';
import { useFavouritePokemonValue } from './useFavouritePokemonValue';
import {
  askUserToConfirmFavouriteRemove,
  askUserToReplaceFavourite,
} from '../services/favouriteStorage';

export const useFavouritePokemon = (pokemonId: number) => {
  const { favouritePokemon } = useFavouritePokemonValue();
  const isFavourite = favouritePokemon?.id === pokemonId;

  const removeFavourite = async (isMainScreen: boolean) => {
    if (isMainScreen) {
      const confirmed = await askUserToConfirmFavouriteRemove();
      if (!confirmed) return;
    }
    await favouritePokemonStore.set(null);
  };

  const addFavourite = async (pokemonName: string) => {
    if (favouritePokemonStore.getSnapshot() !== null) {
      const confirmed = await askUserToReplaceFavourite();
      if (!confirmed) return;
    }
    await favouritePokemonStore.set({ id: pokemonId, name: pokemonName });
  };

  return { isFavourite, addFavourite, removeFavourite };
};

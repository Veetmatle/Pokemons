import { useFavouritePokemonStore } from '../services/favouritePokemonStore';
import { useFavouritePokemonValue } from './useFavouritePokemonValue';
import {
  askUserToConfirmFavouriteRemove,
  askUserToReplaceFavourite,
} from '../services/favouriteAlerts';

export const useFavouritePokemon = (pokemonId: number) => {
  const { favouritePokemon } = useFavouritePokemonValue();
  const isFavourite = favouritePokemon?.id === pokemonId;

  const removeFavourite = async (isMainScreen: boolean) => {
    if (isMainScreen) {
      const confirmed = await askUserToConfirmFavouriteRemove();
      if (!confirmed) return;
    }
    useFavouritePokemonStore.getState().setFavouritePokemon(null);
  };

  const addFavourite = async (pokemonName: string) => {
    if (useFavouritePokemonStore.getState().favouritePokemon !== null) {
      const confirmed = await askUserToReplaceFavourite();
      if (!confirmed) return;
    }
    useFavouritePokemonStore
      .getState()
      .setFavouritePokemon({ id: pokemonId, name: pokemonName });
  };

  return { isFavourite, addFavourite, removeFavourite };
};

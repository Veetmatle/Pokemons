import { useFavouritePokemonStore } from '../services/favouritePokemonStore';

export function useFavouritePokemonValue() {
  const favouritePokemon = useFavouritePokemonStore(
    state => state.favouritePokemon,
  );
  const hasHydrated = useFavouritePokemonStore(state => state.hasHydrated);
  return { favouritePokemon, isLoading: !hasHydrated };
}

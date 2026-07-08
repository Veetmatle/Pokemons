import { useSyncExternalStore } from 'react';
import { favouritePokemonStore } from '../services/favouritePokemonStore';

export function useFavouritePokemonValue() {
  const favouritePokemon = useSyncExternalStore(
    favouritePokemonStore.subscribe,
    favouritePokemonStore.getSnapshot,
  );
  return { favouritePokemon, isLoading: !favouritePokemonStore.isReady() };
}

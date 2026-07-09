import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FavouritePokemon = { id: number; name: string } | null;

interface FavouritePokemonState {
  favouritePokemon: FavouritePokemon;
  hasHydrated: boolean;
  setFavouritePokemon: (favourite: FavouritePokemon) => void;
}

export const useFavouritePokemonStore = create<FavouritePokemonState>()(
  persist(
    set => ({
      favouritePokemon: null,
      hasHydrated: false,
      setFavouritePokemon: favourite => set({ favouritePokemon: favourite }),
    }),
    {
      name: 'favouritePokemon',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ favouritePokemon: state.favouritePokemon }),
      onRehydrateStorage: () => () => {
        useFavouritePokemonStore.setState({ hasHydrated: true });
      },
    },
  ),
);

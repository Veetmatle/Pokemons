import {
  clearFavouritePokemon,
  getFavouritePokemon,
  setFavouritePokemon,
} from './favouriteStorage';

// zusta
export type FavouritePokemon = { id: number; name: string } | null;
type Listener = () => void;

let current: FavouritePokemon = null;
let ready = false;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach(l => l());

getFavouritePokemon().then(favourite => {
  current = favourite;
  ready = true;
  notify();
});

export const favouritePokemonStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => current,
  isReady: () => ready,
  async set(favourite: FavouritePokemon) {
    if (favourite) await setFavouritePokemon(favourite);
    else await clearFavouritePokemon();
    current = favourite;
    ready = true;
    notify();
  },
};

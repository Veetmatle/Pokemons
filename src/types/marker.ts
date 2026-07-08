export interface PokemonMarker {
  id: string;
  latitude: number;
  longitude: number;

  pokemonId: number;
  pokemonName: string;
  pokemonImage: string;

  createdAt: number;
}

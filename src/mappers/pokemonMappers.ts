import { PokemonData, PokemonDetailData } from '../types/pokemon';
import {
  PokeAPIDetailResponse,
  PokeAPIPokemonResult,
} from '../types/api/pokeApi';

export const mapPokeAPIToPokemonData = (
  pokemon: PokeAPIPokemonResult,
): PokemonData => {
  const match = pokemon.url.match(/\/(\d+)\/?$/);
  const id = match ? parseInt(match[1], 10) : NaN;

  if (isNaN(id)) {
    throw new Error(
      `Failed to extract valid ID from URL for Pokemon: ${pokemon.name}`,
    );
  }

  return {
    id,
    name: pokemon.name,
  };
};

export const mapPokeAPIDetailToPokemonDetailData = (
  data: PokeAPIDetailResponse,
): PokemonDetailData => ({
  id: data.id,
  name: data.name,
  types: data.types.map(t => t.type.name),
  stats: data.stats.map(s => ({
    name: s.stat.name,
    value: s.base_stat,
  })),
  height: data.height,
  weight: data.weight,
  sprites: {
    official: data.sprites.other?.['official-artwork']?.front_default ?? null,
    frontDefault: data.sprites.front_default,
    frontShiny: data.sprites.front_shiny,
  },
  abilities: data.abilities.map(a => ({
    name: a.ability.name,
  })),
});

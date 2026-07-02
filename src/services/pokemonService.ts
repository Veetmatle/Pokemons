import { PokemonData, PokemonDetailData } from '../types/pokemon';
import { PokeAPIResponse, PokeAPIDetailResponse } from '../types/api/pokeApi';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (
  offset: number,
  limit: number = 20,
): Promise<PokemonData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );

    const data: PokeAPIResponse = await response.json();
    return data.results.map(pokemon => {
      const urlParts = pokemon.url.split('/').filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1], 10);

      return {
        id,
        name: pokemon.name,
      };
    });
  } catch (error) {
    console.error('Błąd w pokemonService:', error);
    throw error;
  }
};

export const fetchPokemonDetail = async (
  name: string,
): Promise<PokemonDetailData> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      throw new Error(`Nie udało się pobrać szczegółów dla: ${name}`);
    }

    const data: PokeAPIDetailResponse = await response.json();

    return {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      height: data.height,
      weight: data.weight,
    };
  } catch (error) {
    console.error('Błąd w fetchPokemonDetail:', error);
    throw error;
  }
};

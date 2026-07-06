import { PokemonData, PokemonDetailData } from '../types/pokemon';
import { PokeAPIResponse, PokeAPIDetailResponse } from '../types/api/pokeApi';
import {
  mapPokeAPIToPokemonData,
  mapPokeAPIDetailToPokemonDetailData,
} from '../mappers/pokemonMappers';
import { getFavoritePokemon } from './favoriteStorage';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (
  offset: number,
  limit: number = 20,
  signal?: AbortSignal,
): Promise<PokemonData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
      { signal },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokemon list. HTTP Status: ${response.status}`,
      );
    }

    const data: PokeAPIResponse = await response.json();
    return data.results.map(mapPokeAPIToPokemonData);
  } catch (error) {
    console.error('PokemonService fetchPokemonList error:', error);
    throw error;
  }
};

export const fetchPokemonDetail = async (
  name: string,
  signal?: AbortSignal,
): Promise<PokemonDetailData> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`, {
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch details for Pokemon: ${name}. HTTP Status: ${response.status}`,
      );
    }

    const data: PokeAPIDetailResponse = await response.json();
    return mapPokeAPIDetailToPokemonDetailData(data);
  } catch (error) {
    console.error('PokemonService fetchPokemonDetail error:', error);
    throw error;
  }
};

export const checkFavouritePokemonExists = async (
  pokemonName: string,
): Promise<boolean> => {
  try {
    const favoritePokemon = await getFavoritePokemon();
    return favoritePokemon !== null;
  } catch (error) {
    console.error('PokemonService checkFavouritePokemonExists error:', error);
    return false;
  }
};

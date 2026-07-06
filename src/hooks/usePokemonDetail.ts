import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../services/pokemonService';

export function usePokemonDetail(name: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: ({ signal }) => fetchPokemonDetail(name, signal),
    enabled,
  });
}

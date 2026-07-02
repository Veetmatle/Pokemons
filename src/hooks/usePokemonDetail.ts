import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../services/pokemonService';

export function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetail(name),
  });
}

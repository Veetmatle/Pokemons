import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';

// Wrapper for fetch using Tan
export function usePokemonInfinite() {
  const query = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length * 20;
    },
  });

  const pokemons = query.data ? query.data.pages.flatMap(page => page) : [];

  return {
    pokemons,
    isLoading: query.isLoading,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}

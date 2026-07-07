import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';
import { useMemo } from 'react';

// Wrapper for fetch using Tan
export function usePokemonInfinite() {
  const query = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam, signal }) => fetchPokemonList(pageParam, 20, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length * 20;
    },
  });

  const pokemons = useMemo(() => {
    return query.data ? query.data.pages.flatMap(page => page) : [];
  }, [query.data]);

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

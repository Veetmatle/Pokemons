import { View, ActivityIndicator, Text } from 'react-native';
import PokemonListItem from '../components/PokemonListItem';
import { PokemonListScreenProps } from '../navigation/types';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';
import { LegendList } from '@legendapp/list/react-native';
import { useCallback } from 'react';

export default function PokemonListScreen({
  navigation,
}: PokemonListScreenProps) {
  const {
    pokemons,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    refetch,
  } = usePokemonInfinite();

  const handleItemPress = useCallback(
    (pokemonName: string, pokemonId: number) => {
      navigation.navigate('PokemonDetail', { pokemonName, pokemonId });
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <View className={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className={styles.centerContainer}>
        <Text className={styles.errorText}>Pokemons could not be fetched</Text>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <LegendList
        recycleItems={true}
        data={pokemons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonListItem
            name={item.name}
            id={item.id}
            onPress={handleItemPress}
          />
        )}
        estimatedItemSize={110}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator
              style={{ marginVertical: 15 }}
              size="small"
              color="#0000ff"
            />
          ) : null
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = {
  centerContainer:
    'flex-1 justify-center items-center bg-white dark:bg-[#0F1117]',
  errorText: 'font-bold text-base text-red-800 dark:text-red-400',
  container: 'flex-1 bg-amber-300 dark:bg-[#0F1117] pt-2.5',
};

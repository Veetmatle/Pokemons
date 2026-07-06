import { View, ActivityIndicator, Text } from 'react-native';
import PokemonListItemComponent from '../components/PokemonListItemComponent';
import { PokemonListScreenProps } from '../navigation/types';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';
import { LegendList } from '@legendapp/list/react-native';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PokemonListScreen({
  navigation,
}: PokemonListScreenProps) {
  const {
    pokemons,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    refetch,
  } = usePokemonInfinite();

  const handleItemPress = useCallback(
    (pokemonName: string) => {
      navigation.navigate('PokemonDetail', { pokemonName });
    },
    [navigation],
  );

  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View className={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className={styles.container} style={{ paddingTop: insets.top }}>
      <LegendList
        recycleItems={true}
        data={pokemons}
        ListEmptyComponent={
          <View className={styles.centerContainer}>
            <Text className={styles.errorText}>No pokemons found</Text>
          </View>
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonListItemComponent
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
  container: 'flex-1 bg-amber-85 dark:bg-[#0F1117] pt-2.5',
};

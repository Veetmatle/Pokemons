import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import PokemonListItemComponent from '../components/PokemonListItemComponent';
import { PokemonListScreenProps } from '../navigation/types';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';
import { LegendList } from '@legendapp/list/react-native';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, globalStyles, spacing, typography } from '../styles/globalStyles';

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
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LegendList
        recycleItems={true}
        data={pokemons}
        ListEmptyComponent={
          <View style={globalStyles.centerContainer}>
            <Text style={typography.error}>No pokemons found</Text>
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
              style={styles.footerLoader}
              size="small"
              color={colors.accent}
            />
          ) : null
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    paddingTop: spacing.sm,
  },
  footerLoader: {
    marginVertical: spacing.lg,
  },
});

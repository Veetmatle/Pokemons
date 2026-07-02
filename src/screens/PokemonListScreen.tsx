import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import PokemonListItem from '../components/PokemonListItem';
import { PokemonListScreenProps } from '../navigation/types';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';

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

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Pokemons could not be fetched.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonListItem
            name={item.name}
            id={item.id}
            onPress={() => {
              navigation.navigate('PokemonDetail', { pokemonName: item.name });
            }}
          />
        )}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
});

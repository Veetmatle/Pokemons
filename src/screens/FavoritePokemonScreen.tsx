import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getFavoritePokemon } from '../services/favoriteStorage';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import PokemonCardComponent from '../components/PokemonCardComponent';
import PokemonRemoveFavouriteButtonComponent from '../components/PokemonRemoveFavoriteButtonComponent';

export default function FavoritePokemonScreen() {
  const [favoritePokemon, setFavoritePokemonState] = useState<null | {
    id: number;
    name: string;
  }>(null);

  const [isLoading, setIsLoading] = useState(true);
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemonDetail(favoritePokemon?.name || '', favoritePokemon !== null);

  useFocusEffect(
    useCallback(() => {
      const fetchFavoritePokemon = async () => {
        try {
          const favorite = await getFavoritePokemon();
          setFavoritePokemonState(favorite);
        } catch (error) {
          console.error('Failed to fetch favorite pokemon:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFavoritePokemon();
    }, []),
  );

  if (isLoading && (favoritePokemon !== null || isPokemonLoading)) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  if (favoritePokemon === null) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No favourite pokemons found</Text>
      </View>
    );
  }

  if (isPokemonError || !pokemon) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Could not load Pokemon details</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ ...styles.container }}>
        <PokemonCardComponent pokemon={pokemon} desc={`${pokemon.name}`} />
      </View>
      <View style={styles.removeButton}>
        <PokemonRemoveFavouriteButtonComponent
          onRemoved={() => setFavoritePokemonState(null)}
        />
        <Text style={styles.text}>Remove from fav</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  removeButton: {
    marginTop: 40,
    padding: 10,
    alignItems: 'center',
  },
});

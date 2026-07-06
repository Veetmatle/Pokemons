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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FavoritePokemonScreen() {
  const [favoritePokemon, setFavoritePokemonState] = useState<null | {
    id: number;
    name: string;
  }>(null);

  const insets = useSafeAreaInsets();

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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1f2937" />
      </View>
    );
  }

  if (favoritePokemon === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No favorite pokemons found</Text>
      </View>
    );
  }

  if (isPokemonError || !pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Could not load Pokemon details</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <PokemonCardComponent
          pokemon={pokemon}
          desc={`Fav Pokemon: ${pokemon.name}`}
        />
      </View>
      <View style={styles.removeButton}>
        <PokemonRemoveFavouriteButtonComponent
          onRemoved={() => setFavoritePokemonState(null)}
        />
        <Text>Remove from fav</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  removeButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});

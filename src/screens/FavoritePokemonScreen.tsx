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
import {
  colors,
  globalStyles,
  spacing,
  typography,
} from '../styles/globalStyles';
import PokemonRemoveFavoriteButtonComponent from '../components/PokemonRemoveFavoriteButtonComponent';

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
        }

        setIsLoading(false);
      };

      fetchFavoritePokemon();
    }, []),
  );

  if (isLoading && (favoritePokemon !== null || isPokemonLoading)) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (favoritePokemon === null) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <Text style={typography.body}>No favourite pokemons found</Text>
      </View>
    );
  }

  if (isPokemonError || !pokemon) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <Text style={typography.error}>Could not load Pokemon details :/</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={globalStyles.screen}
      contentContainerStyle={styles.content}>
      <PokemonCardComponent pokemon={pokemon} />
      <PokemonRemoveFavoriteButtonComponent
        onRemoved={() => setFavoritePokemonState(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

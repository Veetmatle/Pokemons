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
import PokemonCard from '../components/PokemonCard';
import {
  colors,
  globalStyles,
  spacing,
  typography,
} from '../styles/globalStyles';
import PokemonFavouriteButton from '../components/PokemonFavouriteButton';
import { NoFavouritePokemon } from '../components/NoFavouritePokemon';

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
    return <NoFavouritePokemon />;
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
      <PokemonCard pokemon={pokemon} />
      <PokemonFavouriteButton
        pokemonId={favoritePokemon.id}
        pokemonName={favoritePokemon.name}
        isFavouriteScreen={true}
        onPress={() => setFavoritePokemonState(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  noFavPokemonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
});

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getFavouritePokemon } from '../services/favouriteStorage';
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

export default function FavouritePokemonScreen() {
  const [favouritePokemon, setFavouritePokemonState] = useState<null | {
    id: number;
    name: string;
  }>(null);

  const [isLoading, setIsLoading] = useState(true);
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemonDetail(favouritePokemon?.name || '', favouritePokemon !== null);

  useFocusEffect(
    useCallback(() => {
      const fetchFavouritePokemon = async () => {
        try {
          const favourite = await getFavouritePokemon();
          setFavouritePokemonState(favourite);
        } catch (error) {
          console.error('Failed to fetch favourite pokemon:', error);
        }

        setIsLoading(false);
      };

      fetchFavouritePokemon();
    }, []),
  );

  if (isLoading && (favouritePokemon !== null || isPokemonLoading)) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (favouritePokemon === null) {
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
        pokemonId={favouritePokemon.id}
        pokemonName={favouritePokemon.name}
        isFavouriteScreen={true}
        onPress={() => setFavouritePokemonState(null)}
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

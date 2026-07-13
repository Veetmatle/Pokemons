import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useFavouritePokemonValue } from '../hooks/useFavouritePokemonValue';
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
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function FavouritePokemonScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { favouritePokemon, isLoading } = useFavouritePokemonValue();

  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemonDetail(favouritePokemon?.name ?? '', !!favouritePokemon);

  if (isLoading) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!favouritePokemon) {
    return <NoFavouritePokemon />;
  }

  if (isPokemonLoading) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
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
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + tabBarHeight },
      ]}>
      <PokemonCard pokemon={pokemon} />
      <PokemonFavouriteButton
        pokemonId={favouritePokemon.id}
        pokemonName={favouritePokemon.name}
        isFavouriteScreen={true}
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

import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PokemonStackParamList } from '../navigation/types';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import PokemonCard from '../components/PokemonCard';
import PokemonFavouriteButton from '../components/PokemonFavouriteButton';
import {
  colors,
  globalStyles,
  spacing,
  typography,
} from '../styles/globalStyles';

type Props = NativeStackScreenProps<PokemonStackParamList, 'PokemonDetail'>;

export default function PokemonDetailScreen({ route }: Props) {
  const { pokemonName } = route.params;
  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonName);

  if (isLoading) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (isError || !pokemon) {
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
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
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

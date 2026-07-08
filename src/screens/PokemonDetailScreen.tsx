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
import { PokemonAbilities } from '../components/PokemonAbilities';
import PokemonFavouriteButton from '../components/PokemonFavouriteButton';
import {
  colors,
  globalStyles,
  spacing,
  typography,
} from '../styles/globalStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type Props = NativeStackScreenProps<PokemonStackParamList, 'PokemonDetail'>;

export default function PokemonDetailScreen({ route }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
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
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + tabBarHeight },
      ]}>
      <PokemonCard pokemon={pokemon} />
      <PokemonAbilities abilities={pokemon.abilities} />
      <PokemonFavouriteButton
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
        isFavouriteScreen={false}
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

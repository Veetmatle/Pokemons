import { StackScreenProps } from '@react-navigation/stack';

// Map of the whole PokemonListScreenRoutes by the Stack routing
export type PokemonStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { pokemonName: string };
};

export type PokemonListScreenProps = StackScreenProps<
  PokemonStackParamList,
  'PokemonList'
>;
export type PokemonDetailScreenProps = StackScreenProps<
  PokemonStackParamList,
  'PokemonDetail'
>;

export type AppTabParamList = {
  PokemonTab: undefined;
  Favorite: undefined;
  Map: undefined;
};

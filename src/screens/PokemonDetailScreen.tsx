import React from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PokemonStackParamList } from '../navigation/types';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import PokemonCardComponent from '../components/PokemonCardComponent';

import PokemonFavouriteButtonComponent from '../components/PokemonFavouriteButtonComponent';

type Props = NativeStackScreenProps<PokemonStackParamList, 'PokemonDetail'>;

export default function PokemonDetailScreen({ route }: Props) {
  const { pokemonName } = route.params;
  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonName);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1 }}
        className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (isError || !pokemon) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <Text className="text-lg font-bold text-red-500">
          Could not load Pokemon details.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: 40 }}>
      <PokemonCardComponent pokemon={pokemon} />
      <PokemonFavouriteButtonComponent
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
      />
    </ScrollView>
  );
}

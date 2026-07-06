import React from 'react';
import { View, Text } from 'react-native';
import Image from './Image';
import { PokemonDetailData } from '../types/pokemon';
import { getTypeGradientColors } from '../utils/typeColors';
import { PokemonStatsComponent } from './PokemonStatsComponent';

const ImageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

interface PokemonCardComponentProps {
  pokemon: PokemonDetailData;
}

export default function PokemonCardComponent({
  pokemon,
}: PokemonCardComponentProps) {
  const gradientColors = getTypeGradientColors(pokemon.types);
  const imageUrl = `${ImageUrl}${pokemon.id}.png`;

  return (
    <View>
      <Text className="text-lg font-bold text-center p-8">
        Pokemon details for {pokemon.name}
      </Text>
      <Image source={{ uri: imageUrl }} className={styles.image} />
      <PokemonStatsComponent stats={pokemon.stats} />
    </View>
  );
}

const styles = {
  image: 'w-[200px] h-[200px] self-center',
};

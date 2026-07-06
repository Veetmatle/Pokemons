import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from './GlassView'; // Double-check this relative path is correct!

const PokemonFavouriteButtonComponent = () => {
  const handlePress = () => {
    console.log('Pokeball clicked');
  };

  return (
    <GlassView
      intensity={50}
      borderRadius={24}
      className="center self-center p-4 mt-4 w-24 h-24">
      <Pressable onPress={handlePress} hitSlop={10}>
        <Ionicons name="heart-outline" size={26} color="white" />
        <Text>Test</Text>
      </Pressable>
    </GlassView>
  );
};

export default PokemonFavouriteButtonComponent;

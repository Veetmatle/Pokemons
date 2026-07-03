import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from './GlassView';

export const PokemonFavouriteComponent = () => {
  const handlePress = () => {
    console.log('Pokeball clicked - catching mechanics coming soon!');
  };

  return (
    <GlassView intensity={50} borderRadius={24} style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.button}>
        <Ionicons name="heart-outline" size={26} color="white" />
      </TouchableOpacity>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 24,
    zIndex: 50,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

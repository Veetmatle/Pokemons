import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonDetailData } from '../types/pokemon';
import { getTypeGradientColors, hexToRgba } from '../utils/typeColors';
import { PokemonStatsComponent } from './PokemonStatsComponent';
import { PokemonFavouriteComponent } from './PokemonFavouriteComponent';
import { GlassView } from './GlassView';

interface PokemonCardComponentProps {
  pokemon: PokemonDetailData;
}

export default function PokemonCardComponent({
  pokemon,
}: PokemonCardComponentProps) {
  const gradientColors = getTypeGradientColors(pokemon.types);
  const accentColor = gradientColors[0];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <LinearGradient colors={gradientColors} style={styles.fullscreen}>
      <SafeAreaView style={styles.relativeFlex} edges={['top']}>
        {/* Top Info Header */}
        <View className="flex-row justify-between items-start px-6 pt-4 z-10">
          <View>
            <Text style={styles.nameText}>{pokemon.name}</Text>

            <View className="flex-row mt-2.5">
              {pokemon.types.map((type, index) => (
                <GlassView
                  key={type}
                  intensity={35}
                  borderRadius={999}
                  style={[
                    styles.typeBadge,
                    index > 0 && styles.typeBadgeSpacing,
                  ]}>
                  <Text className="text-xs font-bold text-white uppercase tracking-wider">
                    {type}
                  </Text>
                </GlassView>
              ))}
            </View>
          </View>

          <Text className="text-2xl font-extrabold text-white/60 pt-1">
            #{String(pokemon.id).padStart(3, '0')}
          </Text>
        </View>

        {/* Favorite Button Overlay */}
        <PokemonFavouriteComponent />

        {/* Artwork Wrapper */}
        <View style={styles.imageWrapper}>
          <GlassView
            intensity={30}
            borderRadius={32}
            tintColor={hexToRgba(accentColor, 0.25)}
            style={styles.artworkCard}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.artworkImage}
              contentFit="contain"
              transition={400}
            />
          </GlassView>
        </View>

        {/* Bottom White Panel */}
        <View style={styles.bottomWhitePanel}>
          <View className="flex-row justify-around border-b border-slate-100 pb-5 mb-5">
            <View className="items-center">
              <Text className="text-base font-extrabold text-slate-800">
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
              <Text className="text-xs font-bold text-slate-400 mt-1 tracking-wider">
                WEIGHT
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-base font-extrabold text-slate-800">
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
              <Text className="text-xs font-bold text-slate-400 mt-1 tracking-wider">
                HEIGHT
              </Text>
            </View>
          </View>

          <Text className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Base Stats
          </Text>
          <PokemonStatsComponent stats={pokemon.stats} accentColor={accentColor} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  relativeFlex: {
    flex: 1,
    position: 'relative',
  },
  nameText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadgeSpacing: {
    marginLeft: 8,
  },
  imageWrapper: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    marginVertical: 12,
  },
  artworkCard: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  artworkImage: {
    width: 200,
    height: 200,
  },
  bottomWhitePanel: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
});

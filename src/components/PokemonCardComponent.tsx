import React from 'react';
import { View, Text } from 'react-native';
import Image from './Image';
import LinearGradient from './Gradient';
import SafeAreaView from './SafeArea';
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
  const accentColor = gradientColors[1];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={styles.fullscreen}>
      <View className={styles.relativeFlex}>
        <View className={styles.header}>
          <View className={styles.leftHeaderContent}>
            <View className={styles.nameRow}>
              <Text style={styles.nameText}>{pokemon.name}</Text>
              <Text className={styles.idText}>
                #{String(pokemon.id).padStart(3, '0')}
              </Text>
            </View>

            <View className={styles.typeList}>
              {pokemon.types.map((type, index) => (
                <GlassView
                  key={type}
                  intensity={35}
                  borderRadius={999}
                  style={[
                    styles.typeBadge,
                    index > 0 && styles.typeBadgeSpacing,
                  ]}>
                  <Text className={styles.typeText}>{type}</Text>
                </GlassView>
              ))}
            </View>
          </View>

          <PokemonFavouriteComponent />
        </View>

        <View className={styles.imageWrapper}>
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

        <View style={styles.bottomWhitePanel}>
          <View className={styles.statsHeader}>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
              <Text className={styles.statLabel}>WEIGHT</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
              <Text className={styles.statLabel}>HEIGHT</Text>
            </View>
          </View>

          <Text className={styles.sectionTitle}>Base Stats</Text>
          <PokemonStatsComponent
            stats={pokemon.stats}
            accentColor={accentColor}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = {
  fullscreen: 'flex-1',
  relativeFlex: 'flex-1 relative',
  header: 'flex-row justify-between items-center px-4 pt-4 z-10',
  leftHeaderContent: 'flex-1 pr-3',
  nameRow: 'flex-row items-center gap-2',
  typeList: 'flex-row mt-2.5',
  typeText: 'text-xs font-bold text-white uppercase tracking-wider',
  idText: 'text-base font-extrabold text-white/60',
  imageWrapper: 'flex-1 items-center justify-center z-10 my-1 overflow-hidden',
  statsHeader: 'flex-row justify-around border-b border-slate-100 pb-5 mb-5',
  statItem: 'items-center',
  statValue: 'text-base font-extrabold text-slate-800',
  statLabel: 'text-xs font-bold text-slate-400 mt-1 tracking-wider',
  sectionTitle:
    'text-xs font-black text-slate-400 uppercase tracking-widest mb-3',
  nameText: {
    fontSize: 28,
    fontWeight: '900' as const,
    color: '#ffffff',
    textTransform: 'capitalize' as const,
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
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  typeBadgeSpacing: {
    marginLeft: 8,
  },
  artworkCard: {
    width: '78%' as const,
    maxWidth: 260,
    aspectRatio: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  artworkImage: {
    width: '82%' as const,
    height: '82%' as const,
  },
  bottomWhitePanel: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
};

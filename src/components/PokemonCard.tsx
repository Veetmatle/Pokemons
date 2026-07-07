import { View, Text, StyleSheet } from 'react-native';
import Image from './Image';
import Gradient from './Gradient';
import { PokemonDetailData } from '../types/pokemon';
import { getTypeGradientColors, getTypeAccentColor } from '../utils/typeColors';
import { PokemonStats } from './PokemonStats';
import {
  colors,
  radius,
  shadow,
  spacing,
  typography,
} from '../styles/globalStyles';

const ImageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

interface PokemonCardProps {
  pokemon: PokemonDetailData;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = `${ImageUrl}${pokemon.id}.png`;
  const accentColor = getTypeAccentColor(pokemon.types);

  return (
    <View style={styles.card}>
      <Gradient
        colors={getTypeGradientColors(pokemon.types)}
        style={styles.header}>
        <Text style={styles.idBadge}>
          #{pokemon.id.toString().padStart(3, '0')}
        </Text>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          transition={400}
        />
      </Gradient>

      <View style={styles.body}>
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

        <View style={styles.typesRow}>
          {pokemon.types.map(type => (
            <View
              key={type}
              style={[
                styles.typeChip,
                { backgroundColor: getTypeAccentColor([type]) },
              ]}>
              <Text style={styles.typeChipText}>{type.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metaRow}>
          <Text style={typography.body}>Height: {pokemon.height / 10} m</Text>
          <Text style={typography.body}>Weight: {pokemon.weight / 10} kg</Text>
        </View>

        <PokemonStats stats={pokemon.stats} accentColor={accentColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow('md'),
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  idBadge: {
    alignSelf: 'flex-end',
    marginRight: spacing.lg,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
  },
  image: {
    width: 180,
    height: 180,
  },
  body: {
    padding: spacing.lg,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  typesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  typeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { PokemonStat } from '../types/pokemon';
import { colors, spacing } from '../styles/globalStyles';

interface PokemonStatsComponentProps {
  stats: PokemonStat[];
  accentColor?: string;
}

export const PokemonStatsComponent = ({
  stats,
  accentColor = colors.accent,
}: PokemonStatsComponentProps) => {
  const formatStatName = (name: string) => {
    const names: Record<string, string> = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      speed: 'SPD',
    };
    return names[name] || name.toUpperCase();
  };

  return (
    <View style={styles.container}>
      {stats.map(stat => {
        const percentage = Math.min((stat.value / 150) * 100, 100);

        return (
          <View key={stat.name} style={styles.row}>
            <Text style={styles.label}>{formatStatName(stat.name)}</Text>
            <Text style={styles.value}>{stat.value}</Text>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${percentage}%`, backgroundColor: accentColor },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 48,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  value: {
    width: 32,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'right',
    marginRight: spacing.sm,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});

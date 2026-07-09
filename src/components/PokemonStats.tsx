import { View, StyleSheet } from 'react-native';
import { PokemonStat } from '../types/pokemon';
import { colors, spacing } from '../styles/globalStyles';
import { StatBar } from './StatBar';

interface PokemonStatsProps {
  stats: PokemonStat[];
  accentColor?: string;
}

export const PokemonStats = ({
  stats,
  accentColor = colors.accent,
}: PokemonStatsProps) => {
  return (
    <View style={styles.container}>
      {stats.map(stat => {
        const percentage = Math.min((stat.value / 160) * 100, 100);

        return (
          <StatBar
            key={stat.name}
            name={stat.name}
            value={stat.value}
            percentage={percentage}
            accentColor={accentColor}
          />
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
});

import { View, Text, StyleSheet } from 'react-native';
import { PokemonAbility } from '../types/pokemon';
import { colors, radius, shadow, spacing } from '../styles/globalStyles';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export const PokemonAbilities = ({ abilities }: PokemonAbilitiesProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>ABILITIES</Text>
      <View style={styles.list}>
        {abilities.map(ability => (
          <View key={ability.name} style={styles.row}>
            <Text style={styles.name}>
              {ability.name.replace(/-/g, ' ').toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadow('md'),
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.accent,
    alignSelf: 'flex-start',
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  list: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

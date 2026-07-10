import { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing } from '../styles/globalStyles';

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

interface StatBarProps {
  name: string;
  value: number;
  percentage: number;
  accentColor: string;
}

export const StatBar = ({
  name,
  value,
  percentage,
  accentColor,
}: StatBarProps) => {
  const progress = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      progress.value = 0;
      progress.value = withTiming(1, { duration: 700 });
    }, [progress]),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * percentage}%`,
  }));

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_NAMES[name] || name.toUpperCase()}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, animatedStyle, { backgroundColor: accentColor }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

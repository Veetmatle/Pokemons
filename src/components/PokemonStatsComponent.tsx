import React from 'react';
import { View, Text } from 'react-native';
import { PokemonStat } from '../types/pokemon';

interface PokemonStatsComponentProps {
  stats: PokemonStat[];
  accentColor?: string;
}

export const PokemonStatsComponent = ({
  stats,
  accentColor = '#f43f5e',
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
    <View className="space-y-3.5 mt-2">
      {stats.map(stat => {
        const percentage = Math.min((stat.value / 150) * 100, 100);

        return (
          <View
            key={stat.name}
            className="flex-row items-center justify-between">
            <Text className="w-12 text-sm font-bold text-slate-500">
              {formatStatName(stat.name)}
            </Text>

            <Text className="w-8 text-sm font-extrabold text-slate-800 text-right mr-3">
              {stat.value}
            </Text>

            <View className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${percentage}%`, backgroundColor: accentColor }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

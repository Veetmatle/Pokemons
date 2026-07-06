import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import Image from './Image';
import { memo } from 'react';
import Feather from './Icon';

const ImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: (pokemonName: string, pokemonId: number) => void;
}

const PokemonListItemComponent = ({
  name,
  id,
  onPress,
}: PokemonListItemProps) => {
  const imageUrl = `${ImageUrl}${id}.png`;
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#64748b' : '#b45309';

  return (
    <TouchableOpacity className={styles.card} onPress={() => onPress(name, id)}>
      <View className={styles.imageWrapper}>
        <Image
          className={styles.image}
          source={{ uri: imageUrl }}
          transition={250}
          cachePolicy="memory-disk"
        />
      </View>

      <View className={styles.textContainer}>
        <Text className={styles.idText}>#{id.toString().padStart(3, '0')}</Text>
        <Text className={styles.nameText}>{name.toUpperCase()}</Text>
      </View>

      <Feather
        name="chevron-right"
        size={22}
        color={iconColor}
        className={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default memo(PokemonListItemComponent);

const styles = {
  card: 'flex-row items-center rounded-2xl bg-[#FCF9F2] p-3 mx-4 my-1.5 border border-amber-950/5 shadow-md shadow-amber-900/5 dark:bg-[#1C2030] dark:border-slate-800/60 dark:shadow-xl dark:shadow-slate-950/50',
  imageWrapper:
    'bg-white/80 dark:bg-slate-800/60 rounded-xl p-1 border border-amber-900/5 dark:border-transparent',
  image: 'h-[70px] w-[70px]',
  textContainer: 'flex-1 ml-4 justify-center',
  idText: 'text-xs font-bold text-amber-700 dark:text-blue-400 tracking-widest',
  nameText: 'text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5',
  chevron: 'pr-1 ml-auto opacity-80',
};

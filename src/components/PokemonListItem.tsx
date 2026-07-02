import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: () => void;
}

export default function PokemonListItem({
  name,
  id,
  onPress,
}: PokemonListItemProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} transition={300} />
      <View style={styles.infoContainer}>
        <Text style={styles.idText}>#{id.toString().padStart(3, '0')}</Text>
        <Text style={styles.nameText}>{name.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
  },
  infoContainer: {
    marginLeft: 15,
  },
  idText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

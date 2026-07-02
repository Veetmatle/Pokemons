import { StyleSheet, Text, View, Button } from 'react-native';
import { PokemonDetailScreenProps } from '../navigation/types';

export default function PokemonDetailScreen({
  route,
  navigation,
}: PokemonDetailScreenProps) {
  const { pokemonName } = route.params || { pokemonName: 'Nieznany' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły Pokemona</Text>
      <Text style={styles.subtitle}>Wybrałeś: {pokemonName}</Text>
      <Button title="Wróć do listy" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

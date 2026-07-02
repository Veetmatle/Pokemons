import { StyleSheet, Text, View } from 'react-native';

export default function FavoritePokemonScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favourite pokemons screen</Text>
      <Text style={styles.text}>Work in progress :D</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

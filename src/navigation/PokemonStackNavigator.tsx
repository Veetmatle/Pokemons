import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import { PokemonStackParamList } from './types';

const Stack = createNativeStackNavigator<PokemonStackParamList>();

export default function PokemonStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: 'Pokemons', headerShown: false }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params?.pokemonName || 'Details',
          headerBackButtonDisplayMode: 'minimal',
        })}
      />
    </Stack.Navigator>
  );
}

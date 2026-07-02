import { createStackNavigator } from '@react-navigation/stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import { PokemonStackParamList } from './types';

const Stack = createStackNavigator<PokemonStackParamList>();

export default function PokemonStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: 'PokePokePokemons' }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params?.pokemonName || 'Details',
        })}
      />
    </Stack.Navigator>
  );
}

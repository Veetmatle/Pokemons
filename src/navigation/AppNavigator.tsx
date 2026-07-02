import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PokemonStackNavigator from './PokemonStackNavigator';
import FavoritePokemonScreen from '../screens/FavoritePokemonScreen';
import { AppTabParamList } from './types';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'list-outline';

          if (route.name === 'PokemonTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff0000',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="PokemonTab"
        component={PokemonStackNavigator}
        options={{
          tabBarLabel: 'List',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritePokemonScreen}
        options={{ tabBarLabel: 'Favorite', headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarLabel: 'Map', headerShown: false }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ tabBarLabel: 'Cam', headerShown: false }}
      />
    </Tab.Navigator>
  );
}

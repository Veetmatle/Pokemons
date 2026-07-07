import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonStackNavigator from './PokemonStackNavigator';
import FavouritePokemonScreen from '../screens/FavouritePokemonScreen';
import { AppTabParamList } from './types';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { GlassView } from '../components/GlassView';
import Image from '../components/Image';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICONS: Record<keyof AppTabParamList, ReturnType<typeof require>> = {
  PokemonTab: require('../public/pokeball.png'),
  Favourite: require('../public/fav-pokemon.png'),
  Map: require('../public/map-pokemon.jpg'),
  Camera: require('../public/pokemon-camera.jpg'),
};

export default function AppNavigator() {
  const blurTarget = useRef<View>(null);

  return (
    <BlurTargetView ref={blurTarget} style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={TAB_ICONS[route.name]}
              contentFit="contain"
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
          tabBarActiveTintColor: '#ff0000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            left: 20,
            right: 20,
            height: 64,
            borderRadius: 32,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.15,
            shadowRadius: 16,
          },
          tabBarBackground: () => (
            <GlassView
              style={StyleSheet.absoluteFill}
              borderRadius={32}
              blurTarget={blurTarget}
            />
          ),
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
          name="Favourite"
          component={FavouritePokemonScreen}
          options={{
            tabBarLabel: 'Favourite',
            headerShown: true,
            title: 'Favourite Pokemon',
          }}
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
    </BlurTargetView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

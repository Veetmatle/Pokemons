import { useState, useRef, useEffect } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { LongPressEvent } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useUserLocation } from '../hooks/useLocation';
import { useMarkers } from '../hooks/useMarkers';
import PinMarker from '../components/PinMarker';
import {
  colors,
  globalStyles,
  radius,
  spacing,
  typography,
} from '../styles/globalStyles';

const KRAKOW_REGION = {
  latitude: 50.0614,
  longitude: 19.9372,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { location, permission } = useUserLocation();
  const { markers, addMarker } = useMarkers();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        6000,
      );
    }
  }, [location]);

  // Dla testu
  const handleMapLongPress = (event: LongPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    addMarker({
      latitude,
      longitude,
      pokemonId: 25,
      pokemonName: 'pikachu',
      pokemonImage:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    });
  };

  if (permission === null) {
    return <View style={globalStyles.screen} />;
  }

  if (permission !== Location.PermissionStatus.GRANTED) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <View style={styles.deniedContainer}>
          <Text style={typography.label}>
            Location access needed to showMap.
          </Text>
          <Pressable
            style={styles.settingsButton}
            onPress={() => Linking.openSettings()}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={[
        styles.map,
        {
          paddingTop: insets.top,
        },
      ]}
      showsUserLocation
      onLongPress={handleMapLongPress}
      initialRegion={KRAKOW_REGION}>
      {markers.map(marker => (
        <PinMarker
          key={marker.id}
          marker={marker}
          onPress={() => setSelectedMarkerId(marker.id)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  deniedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
  },
  settingsButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
  },
  settingsButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
});

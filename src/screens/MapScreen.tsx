import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LongPressEvent } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useUserLocation } from '../hooks/useLocation';
import { useMarkers } from '../hooks/useMarkers';
import PinMarker from '../components/PinMarker';
import { LocationButton } from '../components/LocationButton';
import { askUserToTurnOnLocationPermissionSetting } from '../services/mapService';

const KRAKOW_REGION = {
  latitude: 50.0614,
  longitude: 19.9372,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const {
    location,
    permission,
    canAskAgain,
    requestPermission,
    refreshLocation,
    isCheckingPermission,
  } = useUserLocation();
  const { markers, addMarker } = useMarkers();
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (
      location &&
      mapReady &&
      mapRef.current &&
      permission === Location.PermissionStatus.GRANTED
    ) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        10000,
      );
    }
  }, [location, mapReady, permission]);

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

  const handleLocationButtonPress = async (): Promise<void> => {
    if (permission === Location.PermissionStatus.GRANTED) {
      await refreshLocation();
    } else if (canAskAgain) {
      await requestPermission();
    } else {
      await askUserToTurnOnLocationPermissionSetting();
    }
  };

  return (
    <View style={styles.map}>
      <MapView
        ref={mapRef}
        style={[
          styles.map,
          {
            paddingTop: insets.top,
          },
        ]}
        showsUserLocation={permission === Location.PermissionStatus.GRANTED}
        onLongPress={handleMapLongPress}
        initialRegion={KRAKOW_REGION}
        onMapReady={() => setMapReady(true)}>
        {markers.map(marker => (
          <PinMarker
            key={marker.id}
            marker={marker}
            onPress={() => console.log(`Marker pressed: ${marker.pokemonName}`)}
          />
        ))}
      </MapView>
      <LocationButton
        onPress={handleLocationButtonPress}
        disabled={isCheckingPermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

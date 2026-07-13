import { useState, useRef, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { LongPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useUserLocation } from '../hooks/useLocation';
import { useMarkers } from '../hooks/useMarkers';
import PinMarker from '../components/PinMarker';
import MarkerBottomSheet from '../components/MarkerBottomSheet';
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
  const { markers, addMarker, removeMarker } = useMarkers();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const hasCenteredOnce = useRef(false);
  const selectedPokemonId =
    markers.find(marker => marker.id === selectedMarkerId)?.pokemonId ?? null;

  const animateToLocation = useCallback(
    (target: { latitude: number; longitude: number }) => {
      mapRef.current?.animateToRegion(
        {
          latitude: target.latitude,
          longitude: target.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        800,
      );
    },
    [],
  );

  useEffect(() => {
    if (
      !hasCenteredOnce.current &&
      location &&
      mapReady &&
      permission === Location.PermissionStatus.GRANTED
    ) {
      hasCenteredOnce.current = true;
      animateToLocation(location);
    }
  }, [location, mapReady, permission, animateToLocation]);

  const handleMapLongPress = (event: LongPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    addMarker({
      latitude,
      longitude,
      pokemonId: Math.floor(Math.random() * 10) + 1,
    });
  };

  const handleMarkerPress = useCallback((markerId: string) => {
    setSelectedMarkerId(markerId);
    bottomSheetRef.current?.present();
  }, []);

  const handleDeleteSelectedMarker = () => {
    if (selectedMarkerId) {
      removeMarker(selectedMarkerId);
    }
    bottomSheetRef.current?.dismiss();
  };

  const handleLocationButtonPress = async (): Promise<void> => {
    if (permission === Location.PermissionStatus.GRANTED) {
      try {
        const current = await refreshLocation();
        if (current) {
          animateToLocation(current);
        }
      } catch (error) {
        console.error('Location error', error);
      }
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
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
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
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>
      <LocationButton
        onPress={handleLocationButtonPress}
        disabled={isCheckingPermission}
      />
      <MarkerBottomSheet
        ref={bottomSheetRef}
        pokemonId={selectedPokemonId}
        onDelete={handleDeleteSelectedMarker}
        onClose={() => setSelectedMarkerId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

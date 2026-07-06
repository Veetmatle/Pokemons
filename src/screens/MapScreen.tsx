import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {
  Marker,
  MapPressEvent,
  LongPressEvent,
} from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCoordinate, setSelectedCoordinate] =
    useState<Coordinate | null>(null);
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(null);

  const handleMapPress = (event: LongPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinate(coordinate);
    setMarkerPosition(coordinate);
  };

  return (
    <MapView
      style={[styles.map, { paddingTop: insets.top }]}
      onLongPress={e => handleMapPress(e)}
      initialRegion={{
        latitude: 50.0648,
        longitude: 19.945,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {markerPosition && (
        <Marker
          title="Selected Location"
          description={`Lat: ${markerPosition.latitude}, Lon: ${markerPosition.longitude}`}
          centerOffset={{ x: 0, y: 0 }}
          coordinate={markerPosition}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

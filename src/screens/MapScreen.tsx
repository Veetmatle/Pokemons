import { useCallback, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, LongPressEvent } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  getLocationPermissionStatus,
  requestLocationPermission,
  PermissionStatus,
} from '../services/mapService';
import {
  colors,
  globalStyles,
  radius,
  spacing,
  typography,
} from '../styles/globalStyles';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCoordinate, setSelectedCoordinate] =
    useState<Coordinate | null>(null);
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const handleMapPress = (event: LongPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinate(coordinate);
    setMarkerPosition(coordinate);
  };

  useFocusEffect(
    useCallback(() => {
      const checkPermission = async () => {
        const { status, canAskAgain } = await getLocationPermissionStatus();
        if (status === PermissionStatus.UNDETERMINED && canAskAgain) {
          const { status: requestedStatus } = await requestLocationPermission();
          setPermissionStatus(requestedStatus);
        } else {
          setPermissionStatus(status);
        }
      };

      checkPermission();
    }, []),
  );

  if (permissionStatus === null) {
    return <View style={globalStyles.screen} />;
  }

  if (permissionStatus !== PermissionStatus.GRANTED) {
    return (
      <View style={[globalStyles.screen, globalStyles.centerContainer]}>
        <View style={styles.deniedContainer}>
          <Text style={typography.label}>
            Location access is needed to show the map of your neighbourhood.
          </Text>
          <Pressable
            style={styles.settingsButton}
            onPress={() => Linking.openSettings()}
            hitSlop={10}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <MapView
      style={[styles.map, { paddingTop: insets.top }]}
      onLongPress={e => handleMapPress(e)}
      showsUserLocation
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
  deniedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
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

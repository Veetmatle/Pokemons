import {
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';

export const requestLocationPermission = async () => {
  const { status } = await getForegroundPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await requestForegroundPermissionsAsync();
    if (newStatus !== 'granted') {
      console.warn('Location permission not granted');
    }
  }
};

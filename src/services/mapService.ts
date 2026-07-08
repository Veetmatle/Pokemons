import {
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  PermissionStatus,
} from 'expo-location';

export const getLocationPermissionStatus = async () => {
  return await getForegroundPermissionsAsync();
};

export const requestLocationPermission = async () => {
  return await requestForegroundPermissionsAsync();
};

export { PermissionStatus };

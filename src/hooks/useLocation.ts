import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type UserLocation = {
  latitude: number;
  longitude: number;
};

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    async function initLocation() {
      try {
        const currentPermission =
          await Location.getForegroundPermissionsAsync();

        console.log('1. Current perm:', currentPermission);
        let status = currentPermission.status;

        if (status !== Location.PermissionStatus.GRANTED) {
          console.log('2. No perm for: ', currentPermission);

          const request = await Location.requestForegroundPermissionsAsync();
          status = request.status;
        }

        console.log('3. Before perm set:', status);
        setPermission(status);

        if (status === Location.PermissionStatus.GRANTED) {
          const current = await Location.getCurrentPositionAsync({});
          console.log('4. Current loca:', current);

          setLocation({
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
          });
        }
      } catch (error) {
        console.error('Location error', error);

        setPermission(Location.PermissionStatus.DENIED);
      }
    }

    initLocation();
  }, []);

  return {
    location,
    permission,
  };
}

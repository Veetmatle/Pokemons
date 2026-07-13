import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { AppState, Platform } from 'react-native';

type UserLocation = {
  latitude: number;
  longitude: number;
};

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [isCheckingPermission, setIsCheckingPermission] = useState(false);
  const isBusy = useRef(false);

  const fetchCurrentPosition =
    useCallback(async (): Promise<UserLocation | null> => {
      if (Platform.OS === 'android') {
        const servicesOn = await Location.hasServicesEnabledAsync();
        if (!servicesOn) {
          try {
            await Location.enableNetworkProviderAsync();
          } catch {
            const lastKnown = await Location.getLastKnownPositionAsync();
            if (!lastKnown) return null;
            const coords = lastKnown.coords;
            setLocation(coords);
            return coords;
          }
        }
      }

      let coords;
      try {
        coords = (
          await Location.getCurrentPositionAsync({
            accuracy: Location.LocationAccuracy.Balanced,
          })
        ).coords;
      } catch (error) {
        if (Platform.OS !== 'android') throw error;
        const lastKnown = await Location.getLastKnownPositionAsync();
        if (!lastKnown) return null;
        coords = lastKnown.coords;
      }
      setLocation(coords);
      return coords;
    }, []);

  const runLocationTask = useCallback(
    async (
      getResult: () => Promise<Location.LocationPermissionResponse>,
      { fetchOnGranted = false }: { fetchOnGranted?: boolean } = {},
    ): Promise<UserLocation | null> => {
      if (isBusy.current) return null;
      isBusy.current = true;
      setIsCheckingPermission(true);
      try {
        const result = await getResult();
        setPermission(result.status);
        setCanAskAgain(result.canAskAgain);
        if (
          fetchOnGranted &&
          result.status === Location.PermissionStatus.GRANTED
        ) {
          return await fetchCurrentPosition();
        }
        return null;
      } catch (error) {
        console.error('Location error', error);
        setPermission(Location.PermissionStatus.DENIED);
        return null;
      } finally {
        isBusy.current = false;
        setIsCheckingPermission(false);
      }
    },
    [fetchCurrentPosition],
  );

  const requestPermission = useCallback(
    () =>
      runLocationTask(Location.requestForegroundPermissionsAsync, {
        fetchOnGranted: true,
      }),
    [runLocationTask],
  );

  const refreshLocation = useCallback(
    () =>
      runLocationTask(Location.getForegroundPermissionsAsync, {
        fetchOnGranted: true,
      }),
    [runLocationTask],
  );

  const syncPermission = useCallback(
    () => runLocationTask(Location.getForegroundPermissionsAsync),
    [runLocationTask],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runLocationTask(
      async () => {
        const current = await Location.getForegroundPermissionsAsync();
        if (
          current.status !== Location.PermissionStatus.GRANTED &&
          current.canAskAgain
        ) {
          return Location.requestForegroundPermissionsAsync();
        }
        return current;
      },
      { fetchOnGranted: true },
    );
  }, [runLocationTask]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') syncPermission();
    });
    return () => subscription.remove();
  }, [syncPermission]);

  return {
    location,
    permission,
    canAskAgain,
    requestPermission,
    refreshLocation,
    isCheckingPermission,
  };
}

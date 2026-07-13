import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { AppState, AppStateStatus, Platform } from 'react-native';

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
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const isRequestingPermission = useRef(false);
  const hasRequestedOnce = useRef(false);

  const fetchCurrentPosition =
    useCallback(async (): Promise<UserLocation | null> => {
      const publish = (coords: {
        latitude: number;
        longitude: number;
      }): UserLocation => {
        const next = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setLocation(next);
        return next;
      };

      const readPosition = () =>
        Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Balanced,
        });

      if (Platform.OS === 'android') {
        const servicesOn = await Location.hasServicesEnabledAsync();
        if (!servicesOn) {
          try {
            await Location.enableNetworkProviderAsync();
          } catch {
            const lastKnown = await Location.getLastKnownPositionAsync();
            return lastKnown ? publish(lastKnown.coords) : null;
          }
        }
      }

      try {
        const current = await readPosition();
        return publish(current.coords);
      } catch (error) {
        if (Platform.OS !== 'android') {
          throw error;
        }
        const lastKnown = await Location.getLastKnownPositionAsync();
        return lastKnown ? publish(lastKnown.coords) : null;
      }
    }, []);

  const withPermissionLock = useCallback(
    async <T>(action: () => Promise<T>): Promise<T | null> => {
      if (isRequestingPermission.current) return null;
      setIsCheckingPermission(true);
      isRequestingPermission.current = true;
      try {
        return await action();
      } finally {
        isRequestingPermission.current = false;
        setIsCheckingPermission(false);
      }
    },
    [],
  );

  const applyPermissionResult = useCallback(
    async (
      status: Location.PermissionStatus,
      askAgain: boolean,
      { fetchPosition = true }: { fetchPosition?: boolean } = {},
    ) => {
      setPermission(status);
      setCanAskAgain(askAgain);

      if (fetchPosition && status === Location.PermissionStatus.GRANTED) {
        await fetchCurrentPosition();
      }
    },
    [fetchCurrentPosition],
  );

  const syncPermission = useCallback(async () => {
    try {
      await withPermissionLock(async () => {
        const current = await Location.getForegroundPermissionsAsync();
        await applyPermissionResult(current.status, current.canAskAgain, {
          fetchPosition: false,
        });
      });
    } catch (error) {
      console.error('Location error', error);
      setPermission(Location.PermissionStatus.DENIED);
    }
  }, [applyPermissionResult, withPermissionLock]);

  // First-run: prompt once if undetermined, otherwise just read status.
  const initLocation = useCallback(async () => {
    if (hasRequestedOnce.current) {
      await syncPermission();
      return;
    }

    try {
      await withPermissionLock(async () => {
        const current = await Location.getForegroundPermissionsAsync();
        if (
          current.status !== Location.PermissionStatus.GRANTED &&
          current.canAskAgain
        ) {
          hasRequestedOnce.current = true;
          const request = await Location.requestForegroundPermissionsAsync();
          await applyPermissionResult(request.status, request.canAskAgain);
          return;
        }

        hasRequestedOnce.current = true;
        await applyPermissionResult(current.status, current.canAskAgain);
      });
    } catch (error) {
      console.error('Location error', error);
      setPermission(Location.PermissionStatus.DENIED);
    }
  }, [applyPermissionResult, syncPermission, withPermissionLock]);

  // Request permission func (on button in MapScreen)
  const requestPermission = useCallback(async () => {
    try {
      await withPermissionLock(async () => {
        const request = await Location.requestForegroundPermissionsAsync();
        await applyPermissionResult(request.status, request.canAskAgain);
      });
    } catch (error) {
      console.error('Location error', error);
    }
  }, [applyPermissionResult, withPermissionLock]);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    initLocation();
  }, [initLocation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !isRequestingPermission.current
      ) {
        syncPermission();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [syncPermission]);

  return {
    location,
    permission,
    canAskAgain,
    requestPermission,
    refreshLocation: fetchCurrentPosition,
    isCheckingPermission,
  };
}

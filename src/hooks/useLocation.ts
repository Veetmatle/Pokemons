import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { AppState, AppStateStatus } from 'react-native';

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

  const fetchCurrentPosition = useCallback(async () => {
    const current = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: current.coords.latitude,
      longitude: current.coords.longitude,
    });
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
    async (status: Location.PermissionStatus, askAgain: boolean) => {
      setPermission(status);
      setCanAskAgain(askAgain);

      if (status === Location.PermissionStatus.GRANTED) {
        await fetchCurrentPosition();
      }
    },
    [fetchCurrentPosition],
  );

  // init call for location perm and location fetch
  const initLocation = useCallback(async () => {
    try {
      await withPermissionLock(async () => {
        const currentPermission =
          await Location.getForegroundPermissionsAsync();
        let status = currentPermission.status;
        let askAgain = currentPermission.canAskAgain;

        if (status === Location.PermissionStatus.UNDETERMINED) {
          const request = await Location.requestForegroundPermissionsAsync();
          status = request.status;
          askAgain = request.canAskAgain;
        }

        await applyPermissionResult(status, askAgain);
      });
    } catch (error) {
      console.error('Location error', error);
      setPermission(Location.PermissionStatus.DENIED);
    }
  }, [applyPermissionResult, withPermissionLock]);

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
        initLocation();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [initLocation]);

  return {
    location,
    permission,
    canAskAgain,
    requestPermission,
    refreshLocation: fetchCurrentPosition,
    isCheckingPermission,
  };
}

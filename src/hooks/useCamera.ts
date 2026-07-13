import { useCallback } from 'react';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { askUserToTurnOnCameraPermissionSetting } from '../services/cameraService';

export function useCamera() {
  const { hasPermission, canRequestPermission, requestPermission } =
    useCameraPermission();
  const device = useCameraDevice('front');

  const ensurePermission = useCallback(async () => {
    if (hasPermission) return;

    try {
      if (canRequestPermission) {
        await requestPermission();
      } else {
        await askUserToTurnOnCameraPermissionSetting();
      }
    } catch (error) {
      console.error('Camera permission error:', error);
    }
  }, [hasPermission, canRequestPermission, requestPermission]);

  return {
    hasPermission,
    canRequestPermission,
    requestPermission: ensurePermission,
    device,
  };
}

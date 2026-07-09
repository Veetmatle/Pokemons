import { useCallback } from 'react';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { askUserToTurnOnCameraPermissionSetting } from '../services/cameraService';

export function useCamera() {
  const { hasPermission, canRequestPermission, requestPermission } =
    useCameraPermission();
  const device = useCameraDevice('back');

  const ensurePermission = useCallback(async () => {
    if (hasPermission) return;

    if (canRequestPermission) {
      await requestPermission();
    } else {
      await askUserToTurnOnCameraPermissionSetting();
    }
  }, [hasPermission, canRequestPermission, requestPermission]);

  return {
    hasPermission,
    canRequestPermission,
    requestPermission: ensurePermission,
    device,
  };
}

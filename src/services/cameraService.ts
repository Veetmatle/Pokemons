import { askUserToTurnOnPermissionSetting } from './permissionAlertService';

export const askUserToTurnOnCameraPermissionSetting = (): Promise<void> =>
  askUserToTurnOnPermissionSetting(
    'Camera permission needed',
    'Please turn on camera permission to use this feature',
  );

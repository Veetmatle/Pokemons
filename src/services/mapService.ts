import { askUserToTurnOnPermissionSetting } from './permissionAlertService';

export const askUserToTurnOnLocationPermissionSetting = (): Promise<void> =>
  askUserToTurnOnPermissionSetting(
    'Location permission needed',
    'Please turn on location permission to use this feature',
  );

import { Alert, Linking } from 'react-native';

export const askUserToTurnOnLocationPermissionSetting = (): Promise<void> => {
  return new Promise<void>(resolve => {
    Alert.alert(
      'Location permission needed',
      'Please turn on location permission to use this feature',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve() },
        {
          text: 'Give Permission',
          onPress: async () => {
            await openAppSettings();
            resolve();
          },
        },
      ],
      { onDismiss: () => resolve() },
    );
  });
};

const openAppSettings = async (): Promise<void> => {
  try {
    await Linking.openSettings();
  } catch (error) {
    console.error('Error opening settings:', error);
  }
};

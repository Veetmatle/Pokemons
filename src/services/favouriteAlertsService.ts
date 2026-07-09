import { Alert } from 'react-native';

export const askUserToReplaceFavourite = (): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(
      'Replace favourite?',
      'You sure want to replace fav poke?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Replace', style: 'destructive', onPress: () => resolve(true) },
      ],
      { onDismiss: () => resolve(false) },
    );
  });
};

export const askUserToConfirmFavouriteRemove = (): Promise<boolean> =>
  new Promise(resolve => {
    Alert.alert(
      'Remove favourite?',
      'Are you sure you want to remove favourite?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => resolve(true),
        },
      ],
      { onDismiss: () => resolve(false) },
    );
  });

import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { typography, globalStyles } from '../styles/globalStyles';

export const showSuccessToast = (
  text1: string,
  position: 'top' | 'bottom' = 'top',
) => {
  Toast.show({
    type: 'success',
    text1,
    position,
    topOffset: 50,
    visibilityTime: 1000,
  });
};

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        globalStyles.card,
        {
          borderLeftColor: 'grey',
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
      contentContainerStyle={{ marginTop: 20 }}
      text1Style={[typography.label, { color: 'black' }]}
    />
  ),
};

export default toastConfig;

import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { typography, globalStyles, spacing } from '../styles/globalStyles';

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
          borderLeftWidth: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      contentContainerStyle={{
        marginTop: spacing.md,
        alignItems: 'center',
      }}
      text1Style={[typography.label, { textAlign: 'center' }]}
      text1NumberOfLines={2}
    />
  ),
};

export default toastConfig;

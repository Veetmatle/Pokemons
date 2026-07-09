import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import toastConfig from './src/utils/toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import toastConfig from './src/utils/toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationBar } from 'expo-navigation-bar';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationBar hidden />
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <AppNavigator />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </>
  );
}

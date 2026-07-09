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
      {/* Android only (no-op on iOS/web): hide the system nav bar; a swipe
          up from the bottom edge reveals it temporarily. */}
      <NavigationBar hidden />
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        {/* Toast reads safe-area insets internally; keep it inside the
            provider so showing/hiding it doesn't re-measure insets for the
            whole tree (which made the tab bar labels flicker away). */}
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </>
  );
}

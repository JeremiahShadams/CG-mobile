import {
  Fraunces_600SemiBold,
  useFonts as useFraunces,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { getSessionState } from '@/features/launch';
import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [interLoaded, interError] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [frauncesLoaded, frauncesError] = useFraunces({ Fraunces_600SemiBold });
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    if (interError ?? frauncesError) throw interError ?? frauncesError;
  }, [interError, frauncesError]);

  // Resolve the encrypted session cache first (spec §6: no network calls here).
  // The OS splash hides only after the cache read, right before launch mounts.
  useEffect(() => {
    let mounted = true;
    getSessionState()
      .catch(() => 'none' as const)
      .finally(() => {
        if (!mounted) return;
        setSessionReady(true);
        SplashScreen.hideAsync().catch(() => {});
      });
    return () => {
      mounted = false;
    };
  }, []);

  const loaded = interLoaded && frauncesLoaded && sessionReady;

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(auth)"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 280,
        }}
      />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="results" />
      <Stack.Screen name="clause" />
      <Stack.Screen name="viewer" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="lawyer" />
    </Stack>
  );
}

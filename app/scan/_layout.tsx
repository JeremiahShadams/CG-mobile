import { Stack } from 'expo-router';

export default function ScanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="camera" />
      <Stack.Screen name="review" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="processing" />
    </Stack>
  );
}

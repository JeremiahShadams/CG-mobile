import { Stack } from 'expo-router';

export default function ViewerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="[docId]" />
    </Stack>
  );
}

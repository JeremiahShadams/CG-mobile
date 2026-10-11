import { Stack } from 'expo-router';

export default function LawyerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="request" />
      <Stack.Screen name="status" />
      <Stack.Screen name="response" />
    </Stack>
  );
}

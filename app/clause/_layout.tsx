import { Stack } from 'expo-router';

export default function ClauseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="[clauseId]" />
    </Stack>
  );
}

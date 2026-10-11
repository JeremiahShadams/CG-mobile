import { Tabs } from 'expo-router';
import { BottomNavigation } from '@/components/BottomNavigation';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state }) => {
        const name = state.routes[state.index]?.name;
        const active =
          name === 'index' ? 'home' : name === 'documents' ? 'documents' : name === 'account' ? 'account' : 'home';
        return <BottomNavigation active={active} />;
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}

# Shared layout source context

## `app/_layout.tsx` — root lifecycle and feature stacks

The root loads Inter and Fraunces before hiding the native splash, resolves encrypted session state, and renders stacks for auth, tabs, scan, results, clause, viewer, chat, and lawyer flows. It sets `headerShown: false`; auth is a bottom-presented modal.

## `app/(tabs)/_layout.tsx` — signed-in shell

```tsx
import { Tabs } from 'expo-router';
import { BottomNavigation } from '@/components/BottomNavigation';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={({ state }) => {
      const name = state.routes[state.index]?.name;
      const active = name === 'index' ? 'home' : name === 'documents' ? 'documents' : name === 'account' ? 'account' : 'home';
      return <BottomNavigation active={active} />;
    }}>
      <Tabs.Screen name="index" /><Tabs.Screen name="documents" /><Tabs.Screen name="account" />
    </Tabs>
  );
}
```

## `components/BottomNavigation.tsx` — shared bottom navigation

```tsx
import { Pressable, Text, View } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Files, Home, ScanLine, User } from 'lucide-react-native';
export type NavItem = 'home' | 'documents' | 'scan' | 'account' | 'none';
interface Props { active?: NavItem; }
export function BottomNavigation({ active = 'home' }: Props) {
  const pathname = usePathname();
  const resolved: NavItem = active !== 'none' ? active : pathname?.includes('document') ? 'documents' : 'home';
  const items = [{ key: 'home' as const, label: 'Home', href: '/(tabs)', Icon: Home }, { key: 'documents' as const, label: 'Docs', href: '/(tabs)/documents', Icon: Files }, { key: 'scan' as const, label: 'Scan', href: '/scan/camera', Icon: ScanLine, fab: true }, { key: 'account' as const, label: 'Account', href: '/(tabs)/account', Icon: User }];
  return <View className="flex-row items-center border-t border-line bg-surface px-2 pb-[26px] pt-2">{items.map(({ key, label, href, Icon, fab }) => { const isActive = resolved === key; return fab ? <View key={key} className="flex-1 items-center"><Link href={href as never} asChild><Pressable className="h-14 w-14 items-center justify-center rounded-full bg-navy active:opacity-90"><Icon size={24} color="#FFFFFF" /></Pressable></Link><Text className="mt-1 text-[11px] font-medium text-sub">{label}</Text></View> : <View key={key} className="flex-1 items-center"><Link href={href as never} asChild><Pressable className="items-center px-4 py-1"><Icon size={24} color={isActive ? '#0B1220' : '#A8B1BF'} /><Text className="mt-1 text-[11px] font-medium" style={{ color: isActive ? '#0B1220' : '#A8B1BF' }}>{label}</Text></Pressable></Link></View>; })}</View>;
}
```

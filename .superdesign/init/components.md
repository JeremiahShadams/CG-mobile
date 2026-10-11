# Shared component source context

## `components/RiskBadge.tsx` — semantic risk chip

```tsx
import { Text, View } from 'react-native';
import { riskStyle, type RiskLevel } from '@/theme/tokens';

interface Props { level: RiskLevel; label: string; }

export function RiskBadge({ level, label }: Props) {
  const s = riskStyle(level);
  return (
    <View className="inline-flex items-center rounded-md border px-2 py-1" style={{ backgroundColor: s.bg, borderColor: s.border }}>
      <Text className="text-[11px] font-semibold tracking-wide" style={{ color: s.text }}>{label}</Text>
    </View>
  );
}
```

## `components/PrimaryButton.tsx` — primary scan CTA

```tsx
import { Pressable, Text } from 'react-native';
import { Link } from 'expo-router';
import { ScanLine } from 'lucide-react-native';
import type { Href } from 'expo-router';

interface Props { href: Href; label?: string; }

export function PrimaryButton({ href, label = 'Scan contract' }: Props) {
  return <Link href={href} asChild><Pressable className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-navy py-[18px] px-4 active:opacity-90"><ScanLine size={20} color="#FFFFFF" /><Text className="text-[15px] font-semibold text-white">{label}</Text></Pressable></Link>;
}
```

## `components/DocumentCard.tsx` — document row

```tsx
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FileText } from 'lucide-react-native';
import { RiskBadge } from '@/components/RiskBadge';
import type { RiskLevel } from '@/theme/tokens';
import type { Href } from 'expo-router';

interface Props { title: string; date: string; risk: RiskLevel; riskLabel?: string; href: Href; }
const RISK_LABEL: Record<RiskLevel, string> = { critical: 'HIGH RISK', high: 'HIGH RISK', medium: 'MEDIUM RISK', safe: 'SAFE' };
export function DocumentCard({ title, date, risk, riskLabel, href }: Props) {
  return <Link href={href} asChild><Pressable className="flex-row items-center gap-3 rounded-2xl border border-line bg-surface p-4 active:bg-canvas"><View className="h-11 w-11 items-center justify-center rounded-xl bg-canvas"><FileText size={20} color="#0B1220" /></View><View className="flex-1"><Text className="text-[15px] font-semibold text-ink" numberOfLines={1}>{title}</Text><Text className="mt-0.5 text-[13px] text-sub">{date}</Text></View><RiskBadge level={risk} label={riskLabel ?? RISK_LABEL[risk]} /></Pressable></Link>;
}
```

## `components/ProgressCard.tsx` — in-progress analysis card

```tsx
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FileSearch } from 'lucide-react-native';
import type { Href } from 'expo-router';
interface Props { progress: number; title?: string; subtitle?: string; href: Href; }
export function ProgressCard({ progress, title = 'Employment Agreement', subtitle = 'Analysis in progress', href }: Props) {
  return <Link href={href} asChild><Pressable className="rounded-2xl bg-navy p-4 active:opacity-95"><View className="flex-row items-center gap-3"><View className="h-11 w-11 items-center justify-center rounded-xl bg-white/10"><FileSearch size={20} color="#FFFFFF" /></View><View className="flex-1"><Text className="text-[15px] font-semibold text-white" numberOfLines={1}>{title}</Text><Text className="mt-0.5 text-[13px] text-white/70">{subtitle}</Text></View><Text className="text-[15px] font-semibold text-white">{progress}%</Text></View><View className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15"><View className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} /></View></Pressable></Link>;
}
```

## `components/Toggle.tsx` — settings switch

```tsx
import { Pressable, View } from 'react-native';
interface Props { value: boolean; onChange: (v: boolean) => void; }
export function Toggle({ value, onChange }: Props) {
  return <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={() => onChange(!value)} className="h-6 w-11 justify-center rounded-full px-0.5" style={{ backgroundColor: value ? '#0B1220' : '#E3E7EC' }}><View className="h-5 w-5 rounded-full bg-white" style={{ alignSelf: value ? 'flex-end' : 'flex-start' }} /></Pressable>;
}
```

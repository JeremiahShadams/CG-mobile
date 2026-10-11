import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FileText } from 'lucide-react-native';
import { RiskBadge } from '@/components/RiskBadge';
import type { RiskLevel } from '@/theme/tokens';
import type { Href } from 'expo-router';

interface Props {
  title: string;
  date: string;
  risk: RiskLevel;
  riskLabel?: string;
  href: Href;
}

const RISK_LABEL: Record<RiskLevel, string> = {
  critical: 'HIGH RISK',
  high: 'HIGH RISK',
  medium: 'MEDIUM RISK',
  safe: 'SAFE',
};

/** Recent-document row — mirrors design `DocumentCard` sd-component. */
export function DocumentCard({ title, date, risk, riskLabel, href }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-center gap-3 rounded-2xl border border-line bg-surface p-4 active:bg-canvas">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-canvas">
          <FileText size={20} color="#0B1220" />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-ink" numberOfLines={1}>
            {title}
          </Text>
          <Text className="mt-0.5 text-[13px] text-sub">{date}</Text>
        </View>
        <RiskBadge level={risk} label={riskLabel ?? RISK_LABEL[risk]} />
      </Pressable>
    </Link>
  );
}

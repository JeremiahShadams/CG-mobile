import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { RiskBadge } from '@/components/RiskBadge';
import type { Finding } from '@/data/fixtures';
import type { Href } from 'expo-router';

/** Top-finding card on Analysis Results. */
export function FindingCard({ finding, href }: { finding: Finding; href: Href }) {
  return (
    <Link href={href} asChild>
      <Pressable className="rounded-2xl border border-line bg-surface p-4 active:bg-canvas">
        <View className="flex-col gap-2.5">
          <View className="flex-row items-center justify-between">
            <RiskBadge level={finding.severity} label={finding.severityLabel.toUpperCase()} />
            <Text className="text-[12px] font-medium text-sub">{finding.clauseNo}</Text>
          </View>
          <View>
            <Text className="mb-1 text-[15px] font-semibold text-ink">{finding.title}</Text>
            <Text className="text-[13px] leading-5 text-sub" numberOfLines={2}>
              {finding.summary}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

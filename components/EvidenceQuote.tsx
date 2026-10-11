import { Text, View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import type { Clause } from '@/data/fixtures';

/** Quoted contract evidence with highlighted spans. */
export function EvidenceQuote({ clause }: { clause: Clause }) {
  const e = clause.evidence;
  return (
    <View>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-[14px] font-semibold uppercase tracking-wide text-ink">
          Evidence
        </Text>
        <View className="flex-row items-center gap-1 rounded border border-risk-safeBorder bg-risk-safeBg px-2 py-0.5">
          <CheckCircle2 size={10} color="#166534" />
          <Text className="text-[10px] font-semibold uppercase tracking-wide text-risk-safe">
            {clause.evidenceStrength}
          </Text>
        </View>
      </View>
      <View className="relative overflow-hidden rounded-xl border border-line bg-surface p-4">
        <View className="absolute bottom-0 left-0 top-0 w-1 bg-navy" />
        <Text className="font-doc text-[14px] leading-6 text-ink">
          <Text className="text-sub">{e.before} </Text>
          <Text style={{ backgroundColor: 'rgba(254,240,138,0.4)' }}>{e.highlightA}</Text>
          <Text>{e.middle}</Text>
          <Text style={{ backgroundColor: 'rgba(254,240,138,0.4)' }}>{e.highlightB}</Text>
          <Text className="text-sub"> {e.after}</Text>
        </Text>
      </View>
    </View>
  );
}

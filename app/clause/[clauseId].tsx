import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ArrowLeft, FileSearch, Link2, MessageSquare, Scale } from 'lucide-react-native';
import { BottomNavigation } from '@/components/BottomNavigation';
import { EvidenceQuote } from '@/components/EvidenceQuote';
import { clause82 } from '@/data/fixtures';

/** Clause detail — design #5. */
export default function ClauseScreen() {
  useLocalSearchParams<{ clauseId: string }>();
  const clause = clause82;

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="z-20 flex-row items-center justify-between border-b border-line bg-surface px-5 pb-3 pt-2">
          <Link href="/results/employment" asChild>
            <Pressable
              accessibilityLabel="Back to results"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-canvas"
            >
              <ArrowLeft size={20} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[15px] font-semibold tracking-tight text-ink">
            Clause Analysis
          </Text>
          <View className="h-10 w-10" />
        </View>

        <ScrollView className="flex-1 px-5 pb-12 pt-6" contentContainerStyle={{ gap: 32 }}>
          <View className="gap-3">
            <View className="flex-row items-center gap-1.5 self-start rounded-md border border-risk-criticalBorder bg-risk-criticalBg px-2.5 py-1.5">
              <AlertTriangle size={14} color="#9B1C1C" />
              <Text className="text-[11px] font-bold tracking-wide text-risk-critical">
                {clause.riskLabel}
              </Text>
            </View>
            <View>
              <Text className="text-[22px] font-semibold leading-7 tracking-tight text-ink">
                {clause.title}
              </Text>
              <Text className="mt-1 text-[15px] font-medium text-sub">{clause.no}</Text>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-ink">
              What this means
            </Text>
            <Text className="text-[15px] leading-6 text-[#475467]">{clause.meaning}</Text>
          </View>

          <View>
            <Text className="mb-2 text-[14px] font-semibold uppercase tracking-wide text-ink">
              Why this matters
            </Text>
            <Text className="text-[15px] leading-6 text-[#475467]">{clause.why}</Text>
          </View>

          <EvidenceQuote clause={clause} />

          <View>
            <Text className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-ink">
              Related Clauses
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {clause.related.map((r) => (
                <View
                  key={r}
                  className="flex-row items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5"
                >
                  <Link2 size={14} color="#667085" />
                  <Text className="text-[13px] font-medium text-ink">{r}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="gap-3 pt-4">
            <Link href="/viewer/employment" asChild>
              <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-navy px-4 py-4 active:opacity-90">
                <FileSearch size={18} color="#FFFFFF" />
                <Text className="font-medium text-white">View in document</Text>
              </Pressable>
            </Link>
            <Link href="/chat/employment" asChild>
              <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-4 active:bg-canvas">
                <MessageSquare size={18} color="#667085" />
                <Text className="font-medium text-ink">Ask ContractGuard</Text>
              </Pressable>
            </Link>
            <Link href="/lawyer/request" asChild>
              <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-4 active:bg-canvas">
                <Scale size={18} color="#667085" />
                <Text className="font-medium text-ink">Ask a lawyer</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
        <BottomNavigation active="home" />
      </SafeAreaView>
    </View>
  );
}

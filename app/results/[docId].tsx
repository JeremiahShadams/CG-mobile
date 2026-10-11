import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ArrowLeft } from 'lucide-react-native';
import { BottomNavigation } from '@/components/BottomNavigation';
import { FindingCard } from '@/components/FindingCard';
import { analysisSummary, documents, topFindings } from '@/data/fixtures';

/** Analysis results — risk hero + top findings — design #4. */
export default function ResultsScreen() {
  const { docId } = useLocalSearchParams<{ docId: string }>();
  const doc = documents.find((d) => d.id === docId);

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="z-10 flex-row items-center justify-between border-b border-line bg-surface px-5 pb-4 pt-2">
          <Link href="/(tabs)" asChild>
            <Pressable
              accessibilityLabel="Back home"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-canvas"
            >
              <ArrowLeft size={20} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[15px] font-semibold tracking-tight text-ink">Results</Text>
          <View className="h-10 w-10" />
        </View>

        <ScrollView className="flex-1 pb-6">
          <View className="border-b border-line bg-surface px-5 pb-6 pt-6">
            <View className="flex-col items-center text-center">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl border border-risk-criticalBorder bg-risk-criticalBg">
                <AlertTriangle size={28} color="#9B1C1C" />
              </View>
              <Text className="mb-1 text-xl font-semibold text-ink">
                {doc?.title ?? analysisSummary.title}
              </Text>
              <Text className="mb-4 text-[13px] text-sub">
                {doc?.pages ?? analysisSummary.pages} pages analyzed
              </Text>
              <View className="mb-6 rounded-lg border border-risk-criticalBorder bg-risk-criticalBg px-2.5 py-1.5">
                <Text className="text-[12px] font-semibold tracking-wide text-risk-critical">
                  {analysisSummary.overall}
                </Text>
              </View>
              <View className="mx-auto w-full max-w-[280px] flex-row gap-1">
                {analysisSummary.distribution.map((b) => (
                  <View key={b.key} className="flex-1 flex-col items-center gap-1.5">
                    <View
                      className="h-1.5 w-full rounded-full"
                      style={{ backgroundColor: b.color }}
                    />
                    <Text className="text-[11px] font-medium text-ink">{b.count}</Text>
                  </View>
                ))}
              </View>
              <View className="mx-auto mt-1 w-full max-w-[280px] flex-row justify-between px-1">
                <Text className="text-[10px] text-sub">Critical</Text>
                <Text className="text-[10px] text-sub">Safe</Text>
              </View>
            </View>
          </View>

          <View className="px-5 pt-8">
            <Text className="mb-4 text-sm font-medium text-ink">Top findings to review</Text>
            <View className="gap-3">
              {topFindings.map((f) => (
                <FindingCard
                  key={f.id}
                  finding={f}
                  href={{ pathname: '/clause/[clauseId]', params: { clauseId: '8-2' } }}
                />
              ))}
            </View>
            <Pressable className="mt-4 items-center rounded-xl border border-line bg-surface px-4 py-3.5 active:bg-canvas">
              <Text className="text-[14px] font-medium text-ink">
                View all {analysisSummary.totalFindings} findings
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <BottomNavigation active="none" />
      </SafeAreaView>
    </View>
  );
}

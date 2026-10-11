import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, PenTool, UserCheck, X } from 'lucide-react-native';
import { lawyerCase } from '@/data/fixtures';

/** Lawyer handoff step 3 — lawyer response — design #9. */
export default function LawyerResponseScreen() {
  const r = lawyerCase.response;
  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="relative z-10 flex-row items-center gap-3 border-b border-line bg-surface px-5 pb-4 pt-2">
          <Link href="/(tabs)" asChild>
            <Pressable
              accessibilityLabel="Close"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-canvas"
            >
              <X size={20} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[19px] font-semibold tracking-tight text-ink">
            Review complete
          </Text>
        </View>

        <ScrollView className="flex-1">
          <View className="gap-6 px-5 py-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-[11px] font-semibold uppercase tracking-wide text-sub">
                Case #{lawyerCase.id}
              </Text>
              <Text className="text-[11px] font-semibold tracking-wide text-sub">
                Resolved 10m ago
              </Text>
            </View>

            <View className="rounded-2xl border border-line bg-surface p-5">
              <Text className="mb-2 text-[17px] font-semibold text-ink">{lawyerCase.title}</Text>
              <Text className="mb-4 text-[14px] leading-6 text-sub">
                Your question: {lawyerCase.question}
              </Text>
              <Link href="/viewer/employment" asChild>
                <Pressable className="flex-row items-center gap-1.5 self-start rounded-lg border border-line bg-canvas px-3 py-1.5 active:bg-line">
                  <FileText size={14} color="#667085" />
                  <Text className="text-[12px] font-medium text-ink">View in document</Text>
                </Pressable>
              </Link>
            </View>

            <View className="overflow-hidden rounded-2xl border border-navyBorder bg-surface">
              <View className="flex-row items-center gap-2 bg-navy px-4 py-2.5">
                <UserCheck size={14} color="#FFFFFF" />
                <Text className="text-[12px] font-medium uppercase tracking-wide text-white">
                  Lawyer Response
                </Text>
              </View>
              <View className="gap-6 p-5">
                <View>
                  <Text className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-ink">
                    Lawyer&apos;s Analysis
                  </Text>
                  <Text className="text-[15px] leading-6 text-ink">{r.analysis}</Text>
                </View>
                <View className="h-px w-full bg-line" />
                <View>
                  <Text className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-ink">
                    Suggested Change
                  </Text>
                  <View className="rounded-lg border border-line bg-canvas p-4">
                    <Text className="font-doc text-[14px] font-medium leading-6 text-ink">
                      {r.suggestedChange}
                    </Text>
                  </View>
                  <Text className="mt-2 text-[13px] text-sub">{r.annotationNote}</Text>
                </View>
                <View className="h-px w-full bg-line" />
                <View>
                  <Text className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-ink">
                    Questions to Raise
                  </Text>
                  {r.questionsToRaise.map((q) => (
                    <View key={q} className="flex-row items-start gap-2">
                      <View className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      <Text className="text-[14px] leading-6 text-ink">{q}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="border-t border-line bg-canvas p-4">
                <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-[10px] border border-line bg-surface px-4 py-3 active:bg-canvas">
                  <PenTool size={16} color="#111827" />
                  <Text className="text-[14px] font-medium text-ink">
                    View document annotation
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="shrink-0 border-t border-line bg-surface p-5 pb-[34px]">
          <Link href="/lawyer/request" asChild>
            <Pressable className="w-full items-center rounded-xl border border-line bg-surface px-4 py-4 active:bg-canvas">
              <Text className="font-medium text-ink">Start new request</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

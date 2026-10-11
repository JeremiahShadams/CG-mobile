import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { TimelineStep } from '@/components/TimelineStep';
import { lawyerCase } from '@/data/fixtures';

/** Lawyer handoff step 2 — review status timeline — design #9. */
export default function LawyerStatusScreen() {
  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="shrink-0 flex-row items-center justify-between border-b border-line bg-surface px-5 pb-4 pt-2">
          <Text className="text-[19px] font-semibold tracking-tight text-ink">Review Status</Text>
          <Link href="/lawyer/response" asChild>
            <Pressable className="rounded-md px-2 py-1 active:bg-canvas">
              <Text className="text-[13px] font-medium text-sub">Skip (Demo)</Text>
            </Pressable>
          </Link>
        </View>

        <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ gap: 24 }}>
          <View className="rounded-2xl border border-line bg-surface p-5">
            <View className="mb-4 flex-row items-start justify-between">
              <View>
                <Text className="text-[11px] font-semibold uppercase tracking-wide text-sub">
                  Case #{lawyerCase.id}
                </Text>
                <Text className="mt-1 text-[17px] font-semibold text-ink">
                  Human review requested
                </Text>
              </View>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-canvas">
                <User size={18} color="#111827" />
              </View>
            </View>
            <View className="mb-5 rounded-xl bg-canvas p-4">
              <Text className="text-[13px] font-medium text-ink">{lawyerCase.title}</Text>
              <Text className="mt-1 text-[13px] text-sub" numberOfLines={1}>
                {lawyerCase.docTitle}
              </Text>
            </View>
            <TimelineStep state="done" title="Request submitted" subtitle="Today, 10:42 AM" />
            <TimelineStep state="done" title="Documents shared" subtitle="4 items securely transmitted" />
            <TimelineStep state="active" title="Finding suitable lawyer" subtitle="Matching expertise to your query" />
            <TimelineStep state="pending" title="Lawyer reviewing" />
            <TimelineStep state="pending" title="Lawyer responded" last />
          </View>
          <Text className="px-4 text-center text-[13px] leading-5 text-sub">
            We&apos;re matching you with a suitable lawyer. This usually takes 1-2 hours.
            You&apos;ll receive a notification when the review begins.
          </Text>
        </ScrollView>

        <View className="shrink-0 border-t border-line bg-surface p-5 pb-[34px]">
          <Link href="/(tabs)" asChild>
            <Pressable className="w-full items-center rounded-xl border border-line bg-surface px-4 py-4 active:bg-canvas">
              <Text className="font-medium text-ink">Return to Home</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

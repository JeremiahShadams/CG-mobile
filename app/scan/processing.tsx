import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from '@/components/BottomNavigation';
import { TimelineStep, type StepState } from '@/components/TimelineStep';

const STEPS = [
  'Upload complete',
  'Document verified',
  'Reading pages',
  'Finding clauses',
  'Analyzing risks',
  'Preparing your results',
];

/** Processing status — staged timeline advancing to results — design #11. */
export default function ProcessingScreen() {
  const [active, setActive] = useState(3);

  useEffect(() => {
    if (active >= STEPS.length) {
      const t = setTimeout(() => router.replace('/results/employment'), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="shrink-0 px-5 pb-2 pt-4" />
        <ScrollView className="flex-1 px-5 pb-8">
          <View className="mb-10 mt-4">
            <Text className="mb-2 text-[26px] font-semibold tracking-tight text-ink">
              Your contract is being reviewed.
            </Text>
            <Text className="text-[15px] text-sub">
              This process is secure and runs automatically.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl border border-line bg-surface p-6">
            {STEPS.map((title, i) => {
              const state: StepState = i < active ? 'done' : i === active ? 'active' : 'pending';
              return (
                <TimelineStep
                  key={title}
                  state={active >= STEPS.length ? 'done' : state}
                  title={title}
                  last={i === STEPS.length - 1}
                />
              );
            })}
          </View>

          <View className="mt-auto items-center px-4">
            <Text className="text-center text-[14px] leading-6 text-sub">
              You can leave this screen.{'\n'}We&apos;ll continue in the background.
            </Text>
          </View>
        </ScrollView>
        <BottomNavigation active="home" />
      </SafeAreaView>
    </View>
  );
}

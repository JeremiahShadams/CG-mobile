import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { lawyerCase } from '@/data/fixtures';

const OPTIONS = [
  { key: 'doc', title: 'Employment Agreement', sub: 'Full contract text (8 pages)', on: true },
  { key: 'c82', title: 'Clause 8.2', sub: 'Intellectual Property finding', on: true },
  { key: 'c113', title: 'Clause 11.3', sub: 'Termination finding', on: true },
  { key: 'q', title: 'Your question', sub: lawyerCase.question, on: true },
  { key: 'other', title: 'Other documents', sub: undefined, on: false },
  { key: 'prev', title: 'Previous conversations', sub: undefined, on: false },
];

/** Lawyer handoff step 1 — select what to share — design #9. */
export default function LawyerRequestScreen() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(OPTIONS.map((o) => [o.key, o.on])),
  );
  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }));

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="shrink-0 flex-row items-center gap-3 border-b border-line bg-surface px-5 pb-4 pt-2">
          <Link href="/clause/8-2" asChild>
            <Pressable
              accessibilityLabel="Back"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-canvas"
            >
              <ArrowLeft size={20} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[19px] font-semibold tracking-tight text-ink">
            Request human review
          </Text>
        </View>

        <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ gap: 24 }}>
          <View>
            <Text className="mb-2 text-sm font-medium text-ink">
              What should the lawyer receive?
            </Text>
            <Text className="mb-5 text-[13px] leading-5 text-sub">
              Select the information you want to share. The lawyer will review these items and
              provide specific recommendations.
            </Text>
            <View className="overflow-hidden rounded-2xl border border-line bg-surface">
              {OPTIONS.map((o, i) => (
                <Pressable
                  key={o.key}
                  onPress={() => toggle(o.key)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: !!checked[o.key] }}
                  className={`flex-row items-start gap-3 p-4 active:bg-canvas ${
                    i < OPTIONS.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <View
                    className={`mt-0.5 h-5 w-5 items-center justify-center rounded border ${
                      checked[o.key] ? 'border-navy bg-navy' : 'border-line bg-white'
                    }`}
                  >
                    {checked[o.key] ? <Text className="text-[12px] font-bold text-white">✓</Text> : null}
                  </View>
                  <View className="flex-1">
                    <Text className="text-[15px] font-medium text-ink">{o.title}</Text>
                    {o.sub ? <Text className="mt-0.5 text-[13px] text-sub">{o.sub}</Text> : null}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="flex-row gap-3 rounded-xl border border-risk-safeBorder bg-risk-safeBg p-4">
            <ShieldCheck size={18} color="#166534" />
            <Text className="flex-1 text-[13px] leading-5 text-risk-safe">
              Only the items checked above will be shared. Your data remains strictly confidential.
            </Text>
          </View>
        </ScrollView>

        <View className="shrink-0 gap-3 border-t border-line bg-surface p-5 pb-[34px]">
          <Pressable
            onPress={() => router.push('/lawyer/status')}
            className="w-full items-center rounded-xl bg-navy px-4 py-4 active:opacity-90"
          >
            <Text className="font-medium text-white">Continue to review</Text>
          </Pressable>
          <Link href="/clause/8-2" asChild>
            <Pressable className="w-full items-center rounded-xl border border-line bg-surface px-4 py-4 active:bg-canvas">
              <Text className="font-medium text-ink">Cancel</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

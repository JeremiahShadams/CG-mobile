import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronLeft, ChevronRight, FileText } from 'lucide-react-native';
import { BottomNavigation } from '@/components/BottomNavigation';
import { viewerParagraphs } from '@/data/fixtures';

/** Document viewer — serif text with clause highlight — design #6. */
export default function ViewerScreen() {
  const [page, setPage] = useState(7);
  const total = 18;

  return (
    <View className="flex-1 bg-surface">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="z-20 flex-row items-center justify-between border-b border-line bg-surface px-4 pb-3 pt-2">
          <View className="flex-row items-center gap-3">
            <Link href="/clause/8-2" asChild>
              <Pressable
                accessibilityLabel="Back to clause"
                className="h-9 w-9 items-center justify-center rounded-full active:bg-canvas"
              >
                <ArrowLeft size={20} color="#111827" />
              </Pressable>
            </Link>
            <Text className="text-[17px] font-semibold tracking-tight text-ink">Clause 8.2</Text>
          </View>
          <View className="flex-row items-center gap-1.5 rounded-md border border-line bg-canvas px-2.5 py-1">
            <FileText size={13} color="#667085" />
            <Text className="text-[12px] font-medium tracking-wide text-sub">
              {page} of {total}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 bg-white px-5 py-8">
          <View className="mx-auto max-w-prose">
            {viewerParagraphs.map((p, i) => (
              <Text
                key={i}
                className={`mb-5 text-justify font-doc text-[14.5px] leading-[26px] text-[#344054] ${
                  p.heading ? 'font-bold' : ''
                } ${p.highlight ? 'rounded-sm border-b-2 border-risk-criticalBorder bg-risk-criticalBg px-1 py-0.5 text-ink' : ''}`}
              >
                {p.text}
              </Text>
            ))}
            <View className="h-12" />
          </View>
        </ScrollView>

        <View className="z-20 border-t border-line bg-surface px-5 py-4">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <View className="mb-1.5 flex-row items-center gap-2">
                <View className="h-2 w-2 rounded-full bg-risk-critical" />
                <Text className="text-[13px] font-semibold uppercase tracking-wider text-ink">
                  Why this matters
                </Text>
              </View>
              <Text className="pr-2 text-[13.5px] leading-5 text-sub">
                This language may extend beyond work created specifically for this project,
                potentially claiming ownership of your pre-existing intellectual property if used.
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 self-center">
              <Pressable
                accessibilityLabel="Previous page"
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                className="h-9 w-9 items-center justify-center rounded-full border border-line bg-surface active:bg-canvas"
              >
                <ChevronLeft size={18} color="#667085" />
              </Pressable>
              <Pressable
                accessibilityLabel="Next page"
                onPress={() => setPage((p) => Math.min(total, p + 1))}
                className="h-9 w-9 items-center justify-center rounded-full border border-line bg-surface active:bg-canvas"
              >
                <ChevronRight size={18} color="#111827" />
              </Pressable>
            </View>
          </View>
        </View>
        <BottomNavigation active="documents" />
      </SafeAreaView>
    </View>
  );
}

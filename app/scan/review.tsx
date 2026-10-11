import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, ChevronLeft, Plus, X } from 'lucide-react-native';

/** Page review — readability, thumbnails, analyze — design #10. */
export default function PageReviewScreen() {
  const [pages, setPages] = useState([1, 2, 3]);
  const [selected, setSelected] = useState(0);

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="shrink-0 flex-row items-center justify-between px-5 pb-4 pt-2">
          <Link href="/scan/camera" asChild>
            <Pressable
              accessibilityLabel="Back to camera"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-line"
            >
              <ChevronLeft size={24} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[17px] font-semibold tracking-tight text-ink">Review Scan</Text>
          <Pressable
            accessibilityLabel="Discard scan"
            onPress={() => router.replace('/(tabs)')}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-line"
          >
            <X size={24} color="#111827" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5 pb-8" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-[360px] w-full flex-1 items-center justify-center py-4">
            <View className="relative aspect-[1/1.4] w-full max-w-[280px] overflow-hidden rounded-xl border border-line bg-surface">
              <View className="absolute inset-0 gap-4 p-6 opacity-30">
                <View className="h-4 w-2/3 rounded-sm bg-ink" />
                <View className="mt-4 h-2 w-full rounded-sm bg-sub" />
                <View className="h-2 w-11/12 rounded-sm bg-sub" />
                <View className="h-2 w-full rounded-sm bg-sub" />
                <View className="h-2 w-4/5 rounded-sm bg-sub" />
              </View>
              <View className="absolute right-3 top-3 flex-row items-center gap-1.5 rounded-lg border border-line bg-surface/90 px-2.5 py-1.5">
                <View className="h-1.5 w-1.5 rounded-full bg-risk-safe" />
                <Text className="text-[11px] font-medium text-ink">Readable</Text>
              </View>
            </View>
          </View>

          <View className="mb-8 mt-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 10 }}>
              {pages.map((p, i) => (
                <Pressable key={p} onPress={() => setSelected(i)} className="relative">
                  <View
                    className={`h-20 w-16 items-center justify-center overflow-hidden rounded-lg border-2 ${
                      i === selected ? 'border-navy' : 'border-line opacity-70'
                    } bg-white`}
                  >
                    <View className="h-full w-full gap-1 p-2 opacity-20">
                      <View className="h-1 w-full bg-black" />
                      <View className="h-1 w-3/4 bg-black" />
                    </View>
                  </View>
                  <View
                    className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 ${
                      i === selected ? 'bg-navy' : 'border border-line bg-white'
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-medium ${i === selected ? 'text-white' : 'text-sub'}`}
                    >
                      {p}
                    </Text>
                  </View>
                </Pressable>
              ))}
              <Link href="/scan/camera" asChild>
                <Pressable
                  accessibilityLabel="Add page"
                  className="h-20 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-muted bg-canvas active:bg-line"
                >
                  <Plus size={20} color="#667085" />
                </Pressable>
              </Link>
            </ScrollView>
          </View>

          <View className="mt-auto">
            <View className="mb-4 rounded-2xl border border-line bg-surface p-4">
              <Text className="text-[15px] font-medium text-ink">Employment Agreement</Text>
              <View className="mt-1 flex-row items-center gap-2">
                <Text className="text-[13px] text-sub">{pages.length} pages</Text>
                <View className="h-1 w-1 rounded-full bg-line" />
                <CheckCircle2 size={14} color="#166534" />
                <Text className="text-[13px] font-medium text-risk-safe">All pages readable</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setPages((ps) => ps.slice(0, -1))}
                className="flex-1 items-center justify-center rounded-xl border border-line bg-surface py-4 active:bg-canvas"
              >
                <Text className="font-medium text-ink">Retake</Text>
              </Pressable>
              <Link href="/scan/upload" asChild>
                <Pressable className="flex-[2] items-center justify-center rounded-xl bg-navy py-4 active:opacity-90">
                  <Text className="font-medium text-white">Analyze contract</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

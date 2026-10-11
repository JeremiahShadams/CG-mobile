import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PauseCircle, UploadCloud } from 'lucide-react-native';
import { api } from '@/lib/api';

/** Upload progress — fake staged progress — design #3. */
export default function UploadScreen() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    api.fakeUpload(setPct);
  }, []);

  const mb = (7.2 * Math.min(pct, 100)) / 100;

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="shrink-0 flex-row items-center justify-between px-5 pb-4 pt-2">
          <Link href="/scan/review" asChild>
            <Pressable
              accessibilityLabel="Back"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-line"
            >
              <ArrowLeft size={20} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[17px] font-semibold text-ink">Uploading</Text>
          <View className="h-10 w-10" />
        </View>

        <View className="flex-1 items-center justify-center px-5 pb-8">
          <View className="mb-16 w-full max-w-sm flex-col items-center">
            <View className="mb-8 h-20 w-20 items-center justify-center rounded-[20px] border border-line bg-surface">
              <UploadCloud size={36} color="#0B1220" />
            </View>
            <Text className="mb-2 text-center text-xl font-semibold text-ink">
              Uploading your contract
            </Text>
            <Text className="mb-8 text-center text-[15px] text-sub">Page 3 of 8</Text>

            <View className="w-full rounded-[20px] border border-line bg-surface p-6">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-[14px] font-medium text-ink">Employment Agreement</Text>
                <Text className="text-[13px] font-medium text-sub">
                  {mb.toFixed(1)} MB of 7.2 MB
                </Text>
              </View>
              <View className="h-2 w-full overflow-hidden rounded-full border border-line bg-canvas">
                <View className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
              </View>
              <View className="mt-4 flex-row justify-end">
                <Pressable className="flex-row items-center gap-1.5 active:opacity-70">
                  <PauseCircle size={18} color="#667085" />
                  <Text className="text-[14px] font-medium text-sub">Pause</Text>
                </Pressable>
              </View>
            </View>

            <Text className="mt-10 max-w-[280px] text-center text-[14px] leading-6 text-sub">
              You can leave this screen.{'\n'}We&apos;ll continue in the background.
            </Text>
          </View>
        </View>

        <View className="px-5 pb-[34px] pt-4">
          <Link href="/scan/processing" asChild>
            <Pressable className="w-full items-center justify-center rounded-xl bg-navy px-4 py-[18px] active:opacity-90">
              <Text className="font-medium text-white">Continue to Processing (Demo)</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

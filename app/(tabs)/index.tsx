import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentCard } from '@/components/DocumentCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressCard } from '@/components/ProgressCard';
import { profile, recentDocuments } from '@/data/fixtures';

/** Home — greeting, scan CTA, in-progress, recent — design #1. */
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="shrink-0 px-5 pb-2 pt-4">
          <Text className="text-[22px] font-semibold tracking-tight text-ink">
            {profile.greeting}
          </Text>
        </View>
        <ScrollView className="flex-1 px-5 pb-8" contentContainerStyle={{ gap: 32, paddingTop: 16 }}>
          <PrimaryButton href="/scan/camera" />

          <View>
            <Text className="mb-3 text-[11px] font-medium uppercase tracking-wider text-sub">
              In Progress
            </Text>
            <ProgressCard progress={63} href="/scan/processing" />
          </View>

          <View>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[11px] font-medium uppercase tracking-wider text-sub">
                Recent
              </Text>
              <Link href="/(tabs)/documents" asChild>
                <Pressable>
                  <Text className="text-[13px] font-medium text-sub">View all</Text>
                </Pressable>
              </Link>
            </View>
            <View className="gap-3">
              {recentDocuments.map((d) => (
                <DocumentCard
                  key={d.id}
                  title={d.title}
                  date={d.date}
                  risk={d.risk}
                  href={{ pathname: '/results/[docId]', params: { docId: d.id } }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

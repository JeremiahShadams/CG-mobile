import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoreVertical, Search, XCircle } from 'lucide-react-native';
import { RiskBadge } from '@/components/RiskBadge';
import { documents } from '@/data/fixtures';

/** Documents library — search + risk cards — design #13. */
export default function DocumentsScreen() {
  const [query, setQuery] = useState('');
  const filtered = documents
    .filter((d) => d.id !== 'tenancy')
    .filter((d) =>
      query.trim()
        ? `${d.title} ${d.updatedAt}`.toLowerCase().includes(query.trim().toLowerCase())
        : true,
    );

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="shrink-0 px-5 pb-2 pt-4">
          <Text className="text-[22px] font-semibold tracking-tight text-ink">Documents</Text>
        </View>
        <View className="shrink-0 px-5 py-3">
          <View className="flex-row items-center rounded-xl border border-line bg-surface py-3 pl-3.5 pr-3">
            <Search size={18} color="#667085" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by title, type, or date..."
              placeholderTextColor="#A8B1BF"
              className="mx-2 flex-1 text-[14px] text-ink"
            />
            {query ? (
              <Pressable onPress={() => setQuery('')} accessibilityLabel="Clear search">
                <XCircle size={18} color="#A8B1BF" />
              </Pressable>
            ) : null}
          </View>
        </View>
        <ScrollView className="flex-1 px-5 pb-10" contentContainerStyle={{ gap: 12 }}>
          {filtered.map((d) => (
            <View key={d.id} className="gap-4 rounded-2xl border border-line bg-surface p-4">
              <View className="flex-row items-start justify-between gap-4">
                <Link
                  href={{ pathname: '/results/[docId]', params: { docId: d.id } }}
                  asChild
                >
                  <Pressable className="flex-1 gap-1 active:opacity-70">
                    <Text className="text-[15px] font-medium leading-6 text-ink">{d.title}</Text>
                    <Text className="text-[13px] text-sub">{d.updatedAt}</Text>
                  </Pressable>
                </Link>
                <Pressable
                  accessibilityLabel={`Options for ${d.title}`}
                  className="-mr-1 -mt-1 h-8 w-8 items-center justify-center rounded-full active:bg-canvas"
                >
                  <MoreVertical size={18} color="#667085" />
                </Pressable>
              </View>
              <View className="flex-row items-center gap-3">
                <RiskBadge level={d.risk} label={d.riskLabel} />
                <View className="h-1 w-1 rounded-full bg-line" />
                <Text className="text-[12px] font-medium text-sub">{d.pages} pages</Text>
                <View className="h-1 w-1 rounded-full bg-line" />
                <Text className="flex-1 text-[12px] font-medium text-sub" numberOfLines={1}>
                  {d.status}
                </Text>
              </View>
            </View>
          ))}
          {filtered.length === 0 ? (
            <Text className="mt-8 text-center text-[14px] text-sub">
              No documents match “{query}”.
            </Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

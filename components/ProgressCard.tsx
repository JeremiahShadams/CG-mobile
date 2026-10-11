import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FileSearch } from 'lucide-react-native';
import type { Href } from 'expo-router';

interface Props {
  progress: number;
  title?: string;
  subtitle?: string;
  href: Href;
}

/** In-progress analysis card — mirrors design `ProgressCard` sd-component. */
export function ProgressCard({
  progress,
  title = 'Employment Agreement',
  subtitle = 'Analysis in progress',
  href,
}: Props) {
  return (
    <Link href={href} asChild>
      <Pressable className="rounded-2xl bg-navy p-4 active:opacity-95">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-white/10">
            <FileSearch size={20} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="mt-0.5 text-[13px] text-white/70">{subtitle}</Text>
          </View>
          <Text className="text-[15px] font-semibold text-white">{progress}%</Text>
        </View>
        <View className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <View className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        </View>
      </Pressable>
    </Link>
  );
}

import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FileText } from 'lucide-react-native';
import type { ChatMessage } from '@/data/fixtures';
import type { Href } from 'expo-router';

/** Chat bubble — navy right for user, white left for AI, with source citation. */
export function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <View className="mb-6 flex-row justify-end">
        <View className="max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-4 py-3">
          <Text className="text-[15px] leading-6 text-white">{message.text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View className="mb-6 flex-row justify-start">
      <View className="max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
        <Text className="mb-1 text-[15px] leading-6 text-ink">{message.text}</Text>
        {message.subtext ? (
          <Text className="text-[14px] leading-5 text-sub">{message.subtext}</Text>
        ) : null}
        {message.citation ? (
          <View className="mt-3">
            <Text className="mb-2 text-[11px] font-medium uppercase tracking-wider text-sub">
              Source
            </Text>
            <Link href={'/clause/8-2' as Href} asChild>
              <Pressable className="flex-row items-center gap-2 rounded-[10px] border border-line bg-canvas px-3 py-2.5 active:bg-line">
                <View className="h-6 w-6 items-center justify-center rounded border border-line bg-surface">
                  <FileText size={14} color="#0B1220" />
                </View>
                <Text className="text-[13px] font-medium leading-4 text-ink">
                  {message.citation.clauseNo} · {message.citation.title} · {message.citation.page}
                </Text>
              </Pressable>
            </Link>
          </View>
        ) : null}
      </View>
    </View>
  );
}

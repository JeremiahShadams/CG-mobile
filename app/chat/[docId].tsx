import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { ChevronLeft, MoreHorizontal, Sparkles } from 'lucide-react-native';
import { AttachmentSheet } from '@/components/AttachmentSheet';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ChatBubble } from '@/components/ChatBubble';
import { Composer } from '@/components/Composer';
import { chatMessages as seedMessages, suggestedQuestions, type ChatMessage } from '@/data/fixtures';

/** Chat — bubbles, citations, suggestions, composer + sheet — designs #7/#8. */
export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [sheetOpen, setSheetOpen] = useState(false);

  const send = (text: string) => {
    setMessages((ms) => [...ms, { id: `u-${Date.now()}`, role: 'user', text }]);
  };

  const pickUpload = async () => {
    setSheetOpen(false);
    await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });
  };

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="sticky top-0 z-10 flex-row items-center justify-between border-b border-line bg-surface px-4 pb-3 pt-2">
          <Link href="/results/employment" asChild>
            <Pressable
              accessibilityLabel="Back to results"
              className="h-10 w-10 items-center justify-center rounded-full active:bg-canvas"
            >
              <ChevronLeft size={24} color="#111827" />
            </Pressable>
          </Link>
          <Text className="text-[17px] font-semibold tracking-tight text-ink">
            Ask about this contract
          </Text>
          <View className="w-10 items-end pr-1">
            <Pressable
              accessibilityLabel="More options"
              className="h-8 w-8 items-center justify-center rounded-full active:bg-canvas"
            >
              <MoreHorizontal size={20} color="#111827" />
            </Pressable>
          </View>
        </View>

        <ScrollView className="z-0 flex-1 px-4 py-6">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          <View className="min-h-[20px] flex-1" />
          <View className="mb-2 mt-4">
            <Text className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-sub">
              <Sparkles size={10} color="#667085" /> Suggested next questions
            </Text>
            <View className="gap-2.5">
              {suggestedQuestions.map((q) => (
                <Pressable
                  key={q}
                  onPress={() => send(q)}
                  className="rounded-xl border border-line bg-surface px-4 py-3.5 active:bg-canvas"
                >
                  <Text className="text-[14px] font-medium text-ink">{q}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="z-40 shrink-0 flex-col">
          <Composer onAttach={() => setSheetOpen(true)} onSend={send} />
          <BottomNavigation active="none" />
        </View>

        <AttachmentSheet
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onPickUpload={pickUpload}
        />
      </SafeAreaView>
    </View>
  );
}

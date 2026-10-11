import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { ArrowUp, Plus } from 'lucide-react-native';

interface Props {
  onAttach: () => void;
  onSend: (text: string) => void;
}

/** Message composer with attach + send. */
export function Composer({ onAttach, onSend }: Props) {
  const [text, setText] = useState('');
  return (
    <View className="border-t border-line bg-surface px-4 py-3">
      <View className="flex-row items-end gap-3">
        <Pressable
          onPress={onAttach}
          accessibilityLabel="Add attachment"
          className="h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas active:bg-line"
        >
          <Plus size={20} color="#111827" />
        </Pressable>
        <View className="min-h-[44px] flex-1 flex-row items-center rounded-[22px] border border-line bg-canvas px-4">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Ask a question..."
            placeholderTextColor="#667085"
            multiline
            className="max-h-[120px] min-h-[40px] flex-1 py-2.5 text-[15px] text-ink"
          />
        </View>
        <Pressable
          onPress={() => {
            if (text.trim()) {
              onSend(text.trim());
              setText('');
            }
          }}
          accessibilityLabel="Send"
          className="h-11 w-11 items-center justify-center rounded-full bg-navy active:opacity-90"
        >
          <ArrowUp size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

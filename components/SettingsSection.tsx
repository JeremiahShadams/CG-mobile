import { useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  danger?: boolean;
}

/** Collapsible settings group card. */
export function SettingsSection({ title, children, defaultOpen = false, danger = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View
      className="overflow-hidden rounded-xl border bg-surface"
      style={{ borderColor: danger ? '#FFE0E0' : '#E3E7EC' }}
    >
      <Pressable
        onPress={() => setOpen((o) => !o)}
        className="flex-row items-center justify-between px-4 py-3.5 active:bg-canvas"
      >
        <Text
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: danger ? '#9B1C1C' : '#667085' }}
        >
          {title}
        </Text>
        <ChevronDown
          size={18}
          color={danger ? '#9B1C1C' : '#667085'}
          style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
        />
      </Pressable>
      {open && (
        <View className="border-t border-line px-4 pb-4 pt-2">{children}</View>
      )}
    </View>
  );
}

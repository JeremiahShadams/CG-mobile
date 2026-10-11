import { Text, View } from 'react-native';
import { Check } from 'lucide-react-native';

export type StepState = 'done' | 'active' | 'pending';

interface Props {
  state: StepState;
  title: string;
  subtitle?: string;
  last?: boolean;
  dark?: boolean;
}

/** Vertical timeline row (processing + lawyer status). */
export function TimelineStep({ state, title, subtitle, last = false, dark = false }: Props) {
  const muted = dark ? '#A8B1BF' : '#667085';
  return (
    <View className="flex-row gap-4">
      <View className="items-center">
        {state === 'done' ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-navy">
            <Check size={14} color="#FFFFFF" />
          </View>
        ) : state === 'active' ? (
          <View className="h-6 w-6 items-center justify-center rounded-full border-2 border-navy bg-white">
            <View className="h-2 w-2 rounded-full bg-navy" />
          </View>
        ) : (
          <View className="h-6 w-6 rounded-full border-2 border-line bg-white" />
        )}
        {!last && <View className="w-[2px] flex-1 bg-line" />}
      </View>
      <View className="pb-6 pt-0.5">
        <Text
          className="text-[14px]"
          style={{
            color: state === 'pending' ? muted : dark ? '#F5F7FA' : '#111827',
            fontWeight: state === 'active' ? '600' : '500',
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-[13px]" style={{ color: muted }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

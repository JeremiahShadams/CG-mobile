import { Pressable, View } from 'react-native';

interface Props {
  value: boolean;
  onChange: (v: boolean) => void;
}

/** iOS-style navy toggle used in Account Settings. */
export function Toggle({ value, onChange }: Props) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      className="h-6 w-11 justify-center rounded-full px-0.5"
      style={{ backgroundColor: value ? '#0B1220' : '#E3E7EC' }}
    >
      <View
        className="h-5 w-5 rounded-full bg-white"
        style={{ alignSelf: value ? 'flex-end' : 'flex-start' }}
      />
    </Pressable>
  );
}

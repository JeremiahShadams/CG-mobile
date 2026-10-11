import { Text, View } from 'react-native';
import { riskStyle, type RiskLevel } from '@/theme/tokens';

interface Props {
  level: RiskLevel;
  label: string;
}

/** Colored risk chip — High/Medium share amber per designs. */
export function RiskBadge({ level, label }: Props) {
  const s = riskStyle(level);
  return (
    <View
      className="inline-flex items-center rounded-md border px-2 py-1"
      style={{ backgroundColor: s.bg, borderColor: s.border }}
    >
      <Text className="text-[11px] font-semibold tracking-wide" style={{ color: s.text }}>
        {label}
      </Text>
    </View>
  );
}

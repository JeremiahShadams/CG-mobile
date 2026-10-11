import { Pressable, Text } from 'react-native';
import { Link } from 'expo-router';
import { ScanLine } from 'lucide-react-native';
import type { Href } from 'expo-router';

interface Props {
  href: Href;
  label?: string;
}

/** Navy scan CTA — mirrors design `PrimaryButton` sd-component. */
export function PrimaryButton({ href, label = 'Scan contract' }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-navy py-[18px] px-4 active:opacity-90">
        <ScanLine size={20} color="#FFFFFF" />
        <Text className="text-[15px] font-semibold text-white">{label}</Text>
      </Pressable>
    </Link>
  );
}

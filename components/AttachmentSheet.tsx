import { Modal, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Files, GitCompare, Info, ScanLine, UploadCloud, X } from 'lucide-react-native';
import type { Href } from 'expo-router';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPickUpload: () => void;
}

const rows = [
  { key: 'scan', title: 'Scan another document', sub: 'Use your camera to capture physical pages', href: '/scan/camera', Icon: ScanLine },
  { key: 'upload', title: 'Upload document', sub: 'Choose a PDF or image file from your device', href: null, Icon: UploadCloud },
  { key: 'library', title: 'Add from Documents', sub: 'Select a previously analyzed contract', href: '/(tabs)/documents', Icon: Files },
  { key: 'compare', title: 'Compare documents', sub: 'Find differences between two versions', href: null, Icon: GitCompare },
];

/** Bottom-sheet attachment picker (design #8). */
export function AttachmentSheet({ visible, onClose, onPickUpload }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View className="rounded-t-3xl bg-surface px-5 pb-[34px] pt-3">
        <View className="mb-5 items-center">
          <View className="h-1.5 w-10 rounded-full bg-line" />
        </View>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-[19px] font-semibold tracking-tight text-ink">
            Add attachment
          </Text>
          <Pressable
            onPress={onClose}
            accessibilityLabel="Close"
            className="rounded-full p-2 active:bg-canvas"
          >
            <X size={22} color="#667085" />
          </Pressable>
        </View>
        <View className="gap-3">
          {rows.map(({ key, title, sub, href, Icon }) => {
            const inner = (
              <View className="flex-row items-start gap-4 rounded-2xl border border-line p-4 active:bg-canvas">
                <View className="h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-line bg-canvas">
                  <Icon size={20} color="#0B1220" />
                </View>
                <View className="flex-1 pt-0.5">
                  <Text className="text-[15px] font-medium leading-5 text-ink">{title}</Text>
                  <Text className="mt-1 text-[13px] leading-5 text-sub">{sub}</Text>
                </View>
              </View>
            );
            if (key === 'upload' || key === 'compare') {
              return (
                <Pressable
                  key={key}
                  onPress={() => {
                    if (key === 'upload') onPickUpload();
                    else onClose();
                  }}
                >
                  {inner}
                </Pressable>
              );
            }
            return (
              <Link key={key} href={href as Href} asChild>
                <Pressable onPress={onClose}>{inner}</Pressable>
              </Link>
            );
          })}
        </View>
        <View className="mt-6 flex-row items-start gap-2.5 rounded-xl bg-canvas p-3.5">
          <Info size={18} color="#667085" />
          <Text className="flex-1 text-[12.5px] leading-5 text-sub">
            These documents will be used only in this conversation and will not affect the main
            contract analysis.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

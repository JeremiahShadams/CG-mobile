import { Pressable, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { HelpCircle, X } from 'lucide-react-native';

/** Document scanner — live feed with viewfinder overlay — design #2. */
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <View className="relative flex-1 flex-col overflow-hidden bg-black">
      {permission?.granted ? (
        <CameraView style={{ position: 'absolute', inset: 0 }} facing="back" />
      ) : (
        <View className="absolute inset-0 items-center justify-center bg-neutral-900 px-8">
          <Text className="text-center text-[15px] leading-6 text-white">
            ContractGuard needs camera access to scan contracts.
          </Text>
          <Pressable
            onPress={requestPermission}
            className="mt-4 rounded-xl bg-white px-5 py-3 active:opacity-80"
          >
            <Text className="text-[15px] font-semibold text-ink">Enable camera</Text>
          </Pressable>
        </View>
      )}

      <View className="absolute inset-x-0 top-0 z-10 h-32 bg-black/60" pointerEvents="none" />
      <View className="absolute inset-x-0 bottom-0 z-10 h-48 bg-black/80" pointerEvents="none" />

      <View className="absolute top-0 z-20 w-full flex-row items-center justify-between px-5 pt-14">
        <Link href="/(tabs)" asChild>
          <Pressable
            accessibilityLabel="Close camera"
            className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 active:bg-black/50"
          >
            <X size={20} color="#FFFFFF" />
          </Pressable>
        </Link>
        <Pressable
          accessibilityLabel="Scanning help"
          className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 active:bg-black/50"
        >
          <HelpCircle size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View
        className="absolute bottom-[190px] left-5 right-5 top-[130px] z-10 rounded-lg border-[1.5px] border-white/70"
        pointerEvents="none"
      >
        <View className="absolute -left-[1.5px] -top-[1.5px] h-8 w-8 rounded-tl-lg border-l-[3px] border-t-[3px] border-white" />
        <View className="absolute -right-[1.5px] -top-[1.5px] h-8 w-8 rounded-tr-lg border-r-[3px] border-t-[3px] border-white" />
        <View className="absolute -bottom-[1.5px] -left-[1.5px] h-8 w-8 rounded-bl-lg border-b-[3px] border-l-[3px] border-white" />
        <View className="absolute -bottom-[1.5px] -right-[1.5px] h-8 w-8 rounded-br-lg border-b-[3px] border-r-[3px] border-white" />
      </View>

      <View className="absolute inset-x-0 bottom-[140px] z-20 items-center" pointerEvents="none">
        <View className="flex-row items-center gap-2.5 rounded-xl border border-white/20 bg-black/60 px-4 py-2.5">
          <View className="h-2 w-2 rounded-full bg-risk-safe" />
          <Text className="text-[14px] font-medium tracking-wide text-white">Hold steady</Text>
        </View>
      </View>

      <View className="absolute bottom-0 z-20 w-full flex-row items-center justify-between px-8 pb-[40px]">
        <View className="w-[64px] flex-col items-center">
          <View className="h-14 w-11 items-center justify-center overflow-hidden rounded-md border border-white/40 bg-white/20">
            <Text className="text-lg font-medium text-white">1</Text>
          </View>
          <Text className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/90">
            Page
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Capture page"
          onPress={() => router.push('/scan/review')}
          className="items-center justify-center active:opacity-80"
        >
          <View className="h-[76px] w-[76px] items-center justify-center rounded-full border-[3.5px] border-white bg-black/10">
            <View className="h-[60px] w-[60px] rounded-full bg-navy" />
          </View>
        </Pressable>

        <View className="w-[64px] flex-col items-center">
          <View className="h-12 w-12 flex-col items-center justify-center rounded-full border border-white/20 bg-black/30">
            <Text className="mb-1 text-[10px] font-bold tracking-wider text-white">AUTO</Text>
            <View className="h-1.5 w-1.5 rounded-full bg-white" />
          </View>
        </View>
      </View>
    </View>
  );
}

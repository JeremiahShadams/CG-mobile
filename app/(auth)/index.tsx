import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/** First-time auth options. Launch transition reveals this screen (no splash here). */
export default function AuthScreen() {
  const { expired } = useLocalSearchParams<{ expired?: string }>();
  const enter = () => router.replace('/(tabs)');

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1 px-5 pt-4" edges={['top', 'bottom']}>
        {expired === '1' ? (
          <View className="mb-4 rounded-xl bg-[#DC2626] px-4 py-3">
            <Text className="text-[14px] font-medium text-white">
              Your session expired. Please sign in again.
            </Text>
          </View>
        ) : null}
        <View className="mb-[120px]">
          <Text className="font-brand text-[28px] font-semibold text-navy">
            ContractGuard
          </Text>
          <Text className="mt-8 text-[22px] font-semibold tracking-tight text-ink">
            Get started
          </Text>
          <Text className="mt-2 max-w-[280px] text-[15px] leading-6 text-sub">
            Sign in or create an account to analyze your contracts.
          </Text>
        </View>

        <View className="gap-4">
          <Pressable
            onPress={enter}
            className="h-[52px] flex-row items-center justify-center rounded-xl border border-line bg-surface active:bg-canvas"
          >
            <Text className="text-[15px] font-medium text-ink">Continue with Google</Text>
          </Pressable>
          <Pressable
            onPress={enter}
            className="h-[52px] items-center justify-center rounded-xl bg-navy active:opacity-90"
          >
            <Text className="text-[15px] font-medium text-white">Sign in with email</Text>
          </Pressable>
        </View>

        <View className="mt-6">
          <Pressable
            onPress={enter}
            className="h-[52px] items-center justify-center rounded-xl border border-line bg-surface active:bg-canvas"
          >
            <Text className="text-[15px] font-medium text-ink">Create an account</Text>
          </Pressable>
        </View>

        <View className="mt-8 items-center">
          <View className="mb-4 w-full max-w-[200px] flex-row items-center justify-center">
            <View className="h-px w-12 bg-line" />
            <Text className="px-3 text-[12px] text-muted">or</Text>
            <View className="h-px w-12 bg-line" />
          </View>
          <Pressable
            onPress={enter}
            className="h-[44px] w-full items-center justify-center rounded-[10px] border border-line bg-surface active:bg-canvas"
          >
            <Text className="text-[13px] font-medium text-sub">Continue as guest</Text>
          </Pressable>
        </View>

        <View className="mt-auto items-center pb-[34px]">
          <Text className="max-w-[260px] text-center text-[11px] leading-4 text-muted">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

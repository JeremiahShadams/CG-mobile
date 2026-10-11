import { useEffect, useRef } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LAUNCH } from './launchSpec';
import { LaunchController } from './launchController';
import { ShieldMark } from './ShieldMark';
import type { LaunchDestination } from './session';

const T = LAUNCH.timing;
const C = LAUNCH.colors;

const easeOutQuad = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const easeInQuad = Easing.bezier(0.55, 0.085, 0.68, 0.53);
const easeInCubic = Easing.bezier(0.32, 0, 0.67, 0);

function navigate(dest: LaunchDestination): void {
  if (dest.route === '/(tabs)') {
    router.replace('/(tabs)');
  } else if (dest.expired) {
    router.replace({ pathname: '/(auth)', params: { expired: '1' } });
  } else {
    router.replace('/(auth)');
  }
}

/**
 * Approved ContractGuard launch experience.
 * Breathe (0–600) → hold (600–1100) → depart (1100–1400) → destination.
 * Navigation is controller-owned (single-fire); this component mirrors the
 * same approved durations on the UI thread only.
 */
export function LaunchScreen() {
  const controllerRef = useRef<LaunchController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new LaunchController({ navigate });
  }

  const shieldScale = useSharedValue(1);
  const shieldOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(1);

  const shieldStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shieldScale.value }],
    opacity: shieldOpacity.value,
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const startVisualSequence = (reducedMotion: boolean) => {
    'worklet';
    if (reducedMotion) {
      shieldScale.value = withTiming(T.reducedMotionPeak, { duration: T.reducedMotionMs });
      shieldOpacity.value = withTiming(0, { duration: T.reducedMotionMs });
      contentOpacity.value = withTiming(0, { duration: T.reducedMotionMs });
      return;
    }
    shieldScale.value = withSequence(
      withTiming(T.breathePeak, { duration: T.breatheUpMs, easing: easeOutQuad }),
      withTiming(1, { duration: T.breatheDownMs, easing: easeInQuad }),
      withDelay(
        T.holdMs,
        withTiming(T.departPeak, { duration: T.departMs, easing: easeInCubic }),
      ),
    );
    shieldOpacity.value = withDelay(
      T.shieldFadeDelayMs,
      withTiming(0, { duration: T.shieldFadeMs, easing: easeInQuad }),
    );
    contentOpacity.value = withDelay(
      T.contentFadeDelayMs,
      withTiming(0, { duration: T.contentFadeMs, easing: easeInQuad }),
    );
  };

  useEffect(() => {
    let mounted = true;
    const controller = controllerRef.current!;

    const boot = async () => {
      const dest = await controller.initialize();
      if (!mounted) return;
      // Hide the OS splash the moment the launch screen takes over (spec §4).
      // Root layout also hides on font load as a backstop; this call is idempotent.
      const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled().catch(() => false);
      if (!mounted) return;
      runOnJS(startVisualSequence)(reduceMotion);
      controller.playTransition({ reducedMotion: reduceMotion });
      void dest;
    };

    void boot();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={styles.container}
      accessibilityLabel="Securing environment, please wait"
      accessibilityRole="progressbar"
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.center} edges={['top', 'bottom']}>
        <Animated.View style={[styles.shield, shieldStyle]}>
          <ShieldMark />
        </Animated.View>
        <Animated.View style={[styles.textBlock, contentStyle]}>
          <Text style={styles.wordmark}>ContractGuard</Text>
          <Text style={styles.status}>Securing environment...</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shield: {
    width: LAUNCH.layout.shieldSize,
    height: LAUNCH.layout.shieldSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    marginTop: LAUNCH.layout.textGap,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: LAUNCH.layout.wordmarkSize,
    lineHeight: 28,
    fontWeight: '600',
    color: C.wordmark,
    letterSpacing: -0.5,
  },
  status: {
    fontFamily: 'Inter_400Regular',
    fontSize: LAUNCH.layout.statusSize,
    lineHeight: 14,
    fontWeight: '400',
    color: C.statusText,
    marginTop: LAUNCH.layout.statusGap,
  },
});

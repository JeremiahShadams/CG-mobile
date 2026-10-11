import { describe, expect, test } from '@jest/globals';
import { LaunchController } from '../launchController';
import type { LaunchDestination, SessionState } from '../session';

function controllableClock() {
  let t = 1000;
  const pending: Array<{ at: number; resolve: () => void }> = [];
  return {
    now: () => t,
    delay: (ms: number) =>
      new Promise<void>((resolve) => {
        pending.push({ at: t + ms, resolve: () => resolve() });
      }),
    advance: async (ms: number) => {
      t += ms;
      const due = pending.filter((p) => p.at <= t);
      for (const p of due) {
        const idx = pending.indexOf(p);
        if (idx >= 0) pending.splice(idx, 1);
        p.resolve();
      }
      // flush promise chains
      for (let i = 0; i < 12; i++) {
        await Promise.resolve();
      }
    },
    pendingCount: () => pending.length,
  };
}

function setup(session: SessionState, sessionLatency = 0) {
  const clock = controllableClock();
  const navigations: LaunchDestination[] = [];
  const phases: string[] = [];
  const controller = new LaunchController({
    now: clock.now,
    delay: clock.delay,
    resolveSession: () =>
      clock.delay(sessionLatency).then(() => session),
    navigate: (dest) => {
      navigations.push(dest);
    },
    onPhase: (p) => phases.push(p),
    minPresenceMs: 1500,
    maxInitMs: 8000,
    navigateAtMs: 1400,
    reducedMotionMs: 300,
  });
  return { clock, controller, navigations, phases };
}

describe('LaunchController', () => {
  test('unauthenticated → initialize → animation → auth', async () => {
    const { clock, controller, navigations, phases } = setup('none');
    const init = controller.initialize();
    await clock.advance(1500);
    await expect(init).resolves.toEqual({ route: '/(auth)', expired: false });
    expect(controller.getPhase()).toBe('READY');
    expect(controller.playTransition()).toBe(true);
    expect(controller.getPhase()).toBe('ANIMATING');
    await clock.advance(1400);
    expect(navigations).toEqual([{ route: '/(auth)', expired: false }]);
    expect(controller.getPhase()).toBe('COMPLETE');
    expect(phases).toEqual(['READY', 'ANIMATING', 'NAVIGATING', 'COMPLETE']);
  });

  test('authenticated → home with no login flash', async () => {
    const { clock, controller, navigations } = setup('valid');
    const init = controller.initialize();
    await clock.advance(1500);
    await expect(init).resolves.toEqual({ route: '/(tabs)', expired: false });
    controller.playTransition();
    await clock.advance(1400);
    expect(navigations).toEqual([{ route: '/(tabs)', expired: false }]);
  });

  test('expired session → auth with expired flag', async () => {
    const { clock, controller, navigations } = setup('expired');
    const init = controller.initialize();
    await clock.advance(1500);
    await expect(init).resolves.toEqual({ route: '/(auth)', expired: true });
    controller.playTransition();
    await clock.advance(1400);
    expect(navigations[0]).toEqual({ route: '/(auth)', expired: true });
  });

  test('slow session: animation does not begin before READY', async () => {
    const { clock, controller } = setup('valid', 5000);
    const init = controller.initialize();
    await clock.advance(1000);
    // Not ready: playTransition must refuse, no navigation pending
    expect(controller.playTransition()).toBe(false);
    expect(controller.getPhase()).toBe('INITIALIZING');
    await clock.advance(4000); // session resolves at t=5000
    await expect(init).resolves.toEqual({ route: '/(tabs)', expired: false });
    expect(controller.playTransition()).toBe(true);
  });

  test('duplicate initialize: single transition, single navigation', async () => {
    const { clock, controller, navigations } = setup('none');
    const a = controller.initialize();
    const b = controller.initialize();
    await clock.advance(1500);
    await Promise.all([a, b]);
    expect(controller.playTransition()).toBe(true);
    expect(controller.playTransition()).toBe(false); // replay refused
    await clock.advance(1400);
    await clock.advance(1400);
    expect(navigations).toHaveLength(1);
  });

  test('resume (COMPLETE): transition never replays', async () => {
    const { clock, controller, navigations } = setup('valid');
    const init = controller.initialize();
    await clock.advance(1500);
    await init;
    controller.playTransition();
    await clock.advance(1400);
    expect(controller.getPhase()).toBe('COMPLETE');
    expect(controller.playTransition()).toBe(false);
    await expect(controller.initialize()).resolves.toBeTruthy();
    expect(navigations).toHaveLength(1);
  });

  test('reduced motion uses the short transition window', async () => {
    const { clock, controller, navigations } = setup('none');
    const init = controller.initialize();
    await clock.advance(1500);
    await init;
    expect(controller.playTransition({ reducedMotion: true })).toBe(true);
    await clock.advance(300);
    expect(navigations).toHaveLength(1);
    expect(controller.getPhase()).toBe('COMPLETE');
  });

  test('init timeout fails open to auth', async () => {
    const { clock, controller } = setup('valid', 30000);
    const init = controller.initialize();
    await clock.advance(8000);
    await expect(init).resolves.toEqual({ route: '/(auth)', expired: false });
    expect(controller.didTimeOut()).toBe(true);
  });

  test('minimum presence enforced on instant session', async () => {
    const { clock, controller } = setup('none', 0);
    let resolved = false;
    const init = controller.initialize().then((d) => {
      resolved = true;
      return d;
    });
    await clock.advance(1400);
    expect(resolved).toBe(false);
    await clock.advance(100);
    await expect(init).resolves.toBeTruthy();
    expect(resolved).toBe(true);
  });
});

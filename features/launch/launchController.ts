import { LAUNCH } from './launchSpec';
import { destinationFor, getSessionState, type LaunchDestination, type SessionState } from './session';

export type LaunchPhase = 'INITIALIZING' | 'READY' | 'ANIMATING' | 'NAVIGATING' | 'COMPLETE';

export interface LaunchDeps {
  now?: () => number;
  delay?: (ms: number) => Promise<void>;
  resolveSession?: () => Promise<SessionState>;
  navigate?: (dest: LaunchDestination) => void;
  onPhase?: (phase: LaunchPhase) => void;
  /** Test/override hooks — default to approved spec values. */
  minPresenceMs?: number;
  maxInitMs?: number;
  navigateAtMs?: number;
  reducedMotionMs?: number;
}

const defaultDelay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Launch state machine: INITIALIZING → READY → ANIMATING → NAVIGATING → COMPLETE.
 * - Animation starts only after the session decision is available (READY).
 * - Navigation fires exactly once; COMPLETE is terminal (no replay on resume).
 * - Duplicate initialize() calls share one in-flight run.
 */
export class LaunchController {
  private phase: LaunchPhase = 'INITIALIZING';
  private destination: LaunchDestination | null = null;
  private navigated = false;
  private run: Promise<LaunchDestination> | null = null;
  private timedOut = false;

  constructor(private readonly deps: LaunchDeps = {}) {}

  getPhase(): LaunchPhase {
    return this.phase;
  }

  getDestination(): LaunchDestination | null {
    return this.destination;
  }

  didTimeOut(): boolean {
    return this.timedOut;
  }

  private setPhase(phase: LaunchPhase): void {
    this.phase = phase;
    this.deps.onPhase?.(phase);
  }

  /**
   * Restores the session and enforces minimum presence.
   * Resolves once READY. Fail-open: timeout or session error → unauthenticated.
   */
  initialize(): Promise<LaunchDestination> {
    if (this.run) return this.run;
    this.run = this.doInitialize();
    return this.run;
  }

  private async doInitialize(): Promise<LaunchDestination> {
    const now = this.deps.now ?? Date.now;
    const delay = this.deps.delay ?? defaultDelay;
    const resolveSession = this.deps.resolveSession ?? (() => getSessionState());
    const minPresenceMs = this.deps.minPresenceMs ?? LAUNCH.timing.minPresenceMs;
    const maxInitMs = this.deps.maxInitMs ?? LAUNCH.timing.maxInitMs;

    const startedAt = now();
    const sessionPromise = resolveSession().then(
      (s) => ({ ok: true as const, state: s }),
      () => ({ ok: false as const, state: 'none' as SessionState }),
    );
    const timeoutPromise = delay(maxInitMs).then(() => ({ ok: false as const, state: 'none' as SessionState, timeout: true as const }));

    const result = await Promise.race([sessionPromise, timeoutPromise]);
    this.timedOut = 'timeout' in result && result.timeout === true;

    const elapsed = now() - startedAt;
    if (elapsed < minPresenceMs) {
      await delay(minPresenceMs - elapsed);
    }

    this.destination = destinationFor(result.state);
    this.setPhase('READY');
    return this.destination;
  }

  /**
   * Begins the shield transition. Returns false unless READY (prevents replay).
   * Navigates once after the approved depart duration, then completes.
   */
  playTransition(options: { reducedMotion?: boolean } = {}): boolean {
    if (this.phase !== 'READY' || this.destination === null) return false;
    this.setPhase('ANIMATING');

    const delay = this.deps.delay ?? defaultDelay;
    const waitMs = options.reducedMotion
      ? (this.deps.reducedMotionMs ?? LAUNCH.timing.reducedMotionMs)
      : (this.deps.navigateAtMs ?? LAUNCH.timing.navigateAtMs);

    void delay(waitMs).then(() => this.completeNavigation());
    return true;
  }

  private completeNavigation(): void {
    if (this.navigated || this.destination === null) return;
    if (this.phase !== 'ANIMATING') return;
    this.navigated = true;
    this.setPhase('NAVIGATING');
    this.deps.navigate?.(this.destination);
    this.setPhase('COMPLETE');
  }
}

/**
 * Approved launch visual + timing constants.
 * Source: design drafts (launch screen / animation / spec v1.1.0).
 * Do not restyle — change only to track an approved design revision.
 */
export const LAUNCH = {
  colors: {
    background: '#0B1524',
    shield: '#22B8CF',
    wordmark: '#FFFFFF',
    statusText: '#8FA3BA',
  },
  layout: {
    shieldSize: 80,
    wordmarkSize: 24,
    statusSize: 13,
    textGap: 16,
    statusGap: 12,
  },
  timing: {
    /** Minimum branded-screen presence even on instant init (spec §3). */
    minPresenceMs: 1500,
    /** Fail-open timeout (spec §3). */
    maxInitMs: 8000,
    breatheUpMs: 300,
    breathePeak: 1.12,
    breatheDownMs: 300,
    holdMs: 500,
    departMs: 300,
    departPeak: 2.8,
    shieldFadeMs: 250,
    shieldFadeDelayMs: 1150,
    contentFadeMs: 200,
    contentFadeDelayMs: 1100,
    /** Navigation fires when the depart scale completes. */
    navigateAtMs: 1400,
    /** Auth slide-up reveal (router config draft). */
    authRevealMs: 280,
    /** Reduced-motion fallback: subtle scale + fade. */
    reducedMotionMs: 300,
    reducedMotionPeak: 1.04,
  },
  sessionKey: 'cg.auth_session',
} as const;

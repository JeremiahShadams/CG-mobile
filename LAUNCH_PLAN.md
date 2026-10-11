# ContractGuard Launch Experience — Implementation Plan

Project `627ec762-3fec-4e85-a275-6dfeba4bbe4c`. Scope: launch only (no auth redesign, no other features).

## 1. Fetched drafts (via `GET /v1/design-drafts/{id}/html`)

| Draft | ID | Role |
|---|---|---|
| Spec v1.1.0 | `16c97e37-da22-4224-9902-be8043bead31` | Normative spec: Pattern B, SecureStore routing, 1500ms min / 8000ms timeout, failure states |
| Launch Screen | `d482cb8a-c77f-42e7-a5bd-0652a60bcd1a` | Static visual: navy `#0B1524`, teal shield 96px, wordmark, `Securing environment...` |
| Launch Animation | `8c89f492-7a88-4df7-861b-40fa6f8a636e` | Keyframes + exact timeline (total ~1680ms), auth slide-up 280ms |
| Animation Code | `80a525f3-a02d-4297-8fb8-025a1fbbb108` | Reference Reanimated implementation (adapted, bug-fixed) |
| Animation Config | `b7f08547-1e8a-415d-8118-7ce74dfd7ac5` | Router config: index=launch, `(auth)` modal 280ms |

## 2. Approved visual (verbatim)

- BG `#0B1524`; shield `shield-check` stroke `#22B8CF` 80×80 (animated) / 96px (static); wordmark Fraunces 600 24px white; status Inter 13px `#8FA3BA` `Securing environment...`; centered stack; no gradients/glow/particles.
- Native splash: shield only (no wordmark), `#0B1524`, 120–200px by class.

## 3. Approved timeline (ms)

Breathe 0–600 (1.0→1.12→1.0) → hold 600–1100 → depart 1100–1400 (scale→2.8 easeInCubic, shield fade from 1150, content fade 1100–1300) → navigate @1400 → auth slide-up 280 (→1680).

## 4. Architecture (`features/launch/`)

- `launchSpec.ts` — colors/timing constants (single source of truth).
- `session.ts` — `SecureStore cg.auth_session` → `valid | expired | guest | none`; destination: valid/guest→`/(tabs)`, expired/none→`/(auth)` (+`expired=1` banner param).
- `launchController.ts` — pure state machine `INITIALIZING→READY→ANIMATING→NAVIGATING→COMPLETE`, min 1500ms, 8000ms fail-open timeout, single-fire navigation, injectable deps for tests.
- `ShieldMark.tsx` — exact approved SVG paths via react-native-svg (no repo asset existed).
- `LaunchScreen.tsx` — Reanimated sequence + reduced-motion branch (scale 1.04 + fade 300ms).
- Wiring: `app/index.tsx`=launch; `_layout` restores session, hides splash after cache read, keeps fonts gate; `(auth)` modal `slide_from_bottom` 280ms; old auth splash overlay removed.

## 5. Deviations from drafts (bug-fixes only)

- Draft checks `isScreenReaderEnabled()` for motion — using `isReduceMotionEnabled()` per accessibility intent.
- Draft navigates fixed `/(auth)/login` — using session destination (spec §4).
- Draft `runOnJS(setTimeout)` — replaced with Reanimated completion callback + controller timer.

# ContractGuard Mobile — CG-mobile

> Read the fine print before it reads you. Scan a contract, get plain-language risks, and decide what to do next — calmly.

ContractGuard is an Expo + React Native app (iOS, Android, Web) that helps everyday people understand contracts **before they sign**. Point your camera at a document or upload a PDF, and it breaks the legalese into findings, evidence quotes, and next steps — with a path to a real lawyer when it matters.

This repo is the mobile client. It's early, it's opinionated, and it's meant to stay small enough for one person to hold in their head.

---

## What it does today

- **Guest-first scan flow** — splash → onboarding → scan, no account required to see value
- **Three ways in** — camera, photo library, or document picker (PDF/images)
- **Risk overview** — critical / high / medium / safe findings with plain-language explanations
- **Clause drill-down** — tap a finding → see the exact quote, why it matters, what to do
- **Follow-up chat** — ask questions about your contract with cited sources
- **Lawyer handoff** — browse verified lawyers and request review with full context
- **Documents & account** — local history, report sharing, plan/billing context

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 57, Expo Router (file-based routing in `app/`) |
| Language | TypeScript (strict) |
| Styling | NativeWind 4 + Tailwind, custom tokens in `theme/` |
| State | Zustand (`features/`, `lib/stores/`) |
| Motion | Reanimated |
| Fonts | Inter (UI) + Fraunces (editorial headings) |
| Native | expo-camera, expo-image-picker, expo-document-picker, expo-secure-store |

Design source of truth: [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md). If a UI choice isn't in there, ask before inventing a new pattern.

---

## Get running

**Prereqs:** Node 20+, npm, Expo Go app on your phone (for quick preview).

```bash
# 1. Install
npm install

# 2. Start the dev server
npx expo start
```

Then press `a` (Android emulator), `i` (iOS simulator), `w` (web), or scan the QR code with Expo Go.

> Added a library with native code? Expo Go won't include it. Build a dev client instead:
> ```bash
> npx expo run:android   # or: npx expo run:ios
> # or in the cloud:
> npx eas-cli@latest build --profile development
> ```

### Useful commands

```bash
npx expo start            # dev server
npx expo lint             # lint
npx tsc --noEmit          # typecheck — run this before every push
npx expo-doctor           # diagnose SDK / dependency drift
npx expo install --fix    # fix incompatible package versions
npm test                  # jest tests
```

---

## Project layout

```
app/                  # Every file here is a screen (Expo Router). _layout.tsx = navigators.
  index.tsx           # Entry: splash / onboarding gate
  (auth)/             # Sign in, sign up — only when we need to save work
  (tabs)/             # Main tabs: home, documents, scan entry, account
  scan/               # Camera / upload / progress / validation
  results/            # Risk overview
  clause/             # Single finding + evidence
  viewer/             # Document highlight view
  chat/               # Follow-up Q&A with citations
  lawyer/             # Directory + request flow
components/           # Dumb, reusable UI (RiskBadge, FindingCard, Composer…)
features/             # Feature state + logic, by domain
lib/                  # Cross-cutting helpers (api client, storage, analytics)
data/                 # Mock fixtures until the backend lands
theme/                # Design tokens (colors, type, spacing)
types/                # Shared TypeScript types
assets/               # Icons, splash, fonts
```

**Rules of thumb:**

- Routes live in `app/`. Everything else lives outside it.
- Import navigation from `expo-router` (`Link`, `router`, `useLocalSearchParams`).
- Never hand-edit `ios/` or `android/` — they don't exist on purpose (Continuous Native Generation). Configure native stuff in `app.json`.
- Prefer Expo modules over third-party libraries. Check SDK 57 compat before adding anything: `npx expo install <pkg>`.

---

## Working on it

1. Branch off `main`: `git checkout -b feat/short-name`
2. Keep PRs small and demoable — one flow, one screen family, or one fix.
3. Run `npx expo lint` and `npx tsc --noEmit` before you push. CI will anyway.
4. Write the way the app talks: short sentences, no legalese, no hype.

Full guide: [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Branch naming: `feat/…`, `fix/…`, `chore/…`, `docs/…`.

---

## Config & secrets

- Copy `.env.example` → `.env` if it exists (never commit `.env`).
- App identity (name, slug, icons, splash) lives in `app.json`.
- EAS build profiles live in `eas.json` once cloud builds are wired up.

---

## Roadmap (honest version)

- [x] Guest scan → findings → clause detail → chat skeleton
- [ ] Real analysis backend (Supabase) + upload queue with retries
- [ ] Auth + document persistence, report export/share
- [ ] Billing context (RevenueCat / Paystack — TBD) tied to real limits
- [ ] EAS Update + production builds, Sentry, analytics events per `DESIGN_DECISIONS.md`

See [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) and [`LAUNCH_PLAN.md`](./LAUNCH_PLAN.md) for the longer story.

---

## Troubleshooting

| Symptom | Try |
|---|---|
| QR won't load / bundle stuck | `npx expo start -c` (clear cache), same Wi-Fi for phone + laptop |
| Native module error in Expo Go | You need a dev build — see note above |
| Version mismatch warnings | `npx expo install --fix` then `npx expo-doctor` |
| Type errors after SDK bump | Read https://docs.expo.dev/versions/v57.0.0/ — don't trust memory |

---

## License

MIT — see [`LICENSE`](./LICENSE). Use it, fork it, just don't blame us if a landlord clause ruins your day. (That's what the app is for.)

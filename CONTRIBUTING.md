# Contributing to ContractGuard Mobile

Thanks for being here. This is a small codebase on purpose — we'd like to keep it that way.

## How we work

- `main` is always shippable. Branch off it, merge back with a PR.
- One PR = one idea. If you can't demo it in 30 seconds, split it.
- Talk like the app: plain words, short sentences, no hype. Future-you will be grateful.

## Branch names

```
feat/scan-progress-steps
fix/chat-citation-overflow
chore/bump-expo-57
docs/readme-quickstart
```

## Before you push

```bash
npx expo lint
npx tsc --noEmit
npm test
```

If any of those fail, the PR isn't ready. CI runs the same three.

## Adding dependencies

This is an Expo SDK 57 project, and Expo breaks things every release (lovingly). So:

1. Check the SDK 57 docs first: https://docs.expo.dev/versions/v57.0.0/
2. Install with `npx expo install <package>` — never plain `npm install` for native packages. It resolves the SDK-compatible version.
3. Prefer an Expo module over a third-party library.
4. If it has native code, note in your PR that reviewers need a dev build (`npx expo run:android|ios`), not Expo Go.

## Where things go

- New screen? `app/` (Expo Router — the file path _is_ the route).
- Reusable UI with no business logic? `components/`.
- Feature logic/state? `features/<domain>/`.
- Shared helpers? `lib/`. Shared types? `types/`. Design values? `theme/`.
- Don't create `ios/` or `android/` by hand. Configure native behavior in `app.json` / config plugins.

## Design rules (short version)

Full spec: `DESIGN_DECISIONS.md`. The gist:

- Calm confidence, not alarm. Risk is a labelled cue, never just a red scream.
- Color never stands alone — always pair with text + icon.
- 44×44pt touch targets, WCAG AA contrast, dynamic-type-safe layouts.
- Inter for UI, Fraunces for a few editorial headings, serif only for contract quotes.
- 180ms press feedback, 220ms sheet transitions, 1.2s shimmer for analysis steps. Respect reduced motion.

## Commit messages

Short, imperative, human:

```
Add guest scan progress steps
Fix clause quote overflow on small screens
Chore: bump expo-document-picker for SDK 57
```

## PR checklist

- [ ] Lint + typecheck + tests pass
- [ ] Tested on at least one real device or simulator (note which)
- [ ] Screenshots or screen recording for UI changes
- [ ] `DESIGN_DECISIONS.md` still holds (or updated if the pattern changed)
- [ ] No secrets, no `.env`, no `ios/`/`android/` noise in the diff

## Reporting bugs

Open an issue with: what you expected, what happened, device + OS, app version, and steps to reproduce. A screenshot is worth a thousand "it broke"s.

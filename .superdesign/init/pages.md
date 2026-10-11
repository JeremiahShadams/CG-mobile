# Key-page dependency trees

## `/` dashboard
Entry: `app/(tabs)/index.tsx`

- `components/PrimaryButton.tsx`
- `components/ProgressCard.tsx`
- `components/DocumentCard.tsx`
  - `components/RiskBadge.tsx`
  - `theme/tokens.ts`
- `data/fixtures.ts`
- `app/(tabs)/_layout.tsx`
  - `components/BottomNavigation.tsx`

## `/documents`
Entry: `app/(tabs)/documents.tsx`

- `components/RiskBadge.tsx`
  - `theme/tokens.ts`
- `data/fixtures.ts`
- `app/(tabs)/_layout.tsx`
  - `components/BottomNavigation.tsx`

## `/account`
Entry: `app/(tabs)/account.tsx`

- `components/SettingsSection.tsx`
- `components/Toggle.tsx`
- `data/fixtures.ts`
- `app/(tabs)/_layout.tsx`
  - `components/BottomNavigation.tsx`

## `/scan/*`
Entries: `app/scan/camera.tsx`, `app/scan/upload.tsx`, `app/scan/review.tsx`, `app/scan/processing.tsx`

- `components/TimelineStep.tsx`
- `components/PrimaryButton.tsx`
- `features/launch/*` for launch/session state

## `/results/[docId]`
Entry: `app/results/[docId].tsx`

- `components/FindingCard.tsx`
  - `components/RiskBadge.tsx`
- `components/AttachmentSheet.tsx`
- `data/fixtures.ts`

## `/chat/[docId]`
Entry: `app/chat/[docId].tsx`

- `components/ChatBubble.tsx`
- `components/Composer.tsx`
- `components/AttachmentSheet.tsx`
- `data/fixtures.ts`

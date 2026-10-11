# Extractable components

## BottomNavigation
- Source: `components/BottomNavigation.tsx`
- Category: layout
- Description: persistent signed-in navigation with elevated scan action.
- Extractable props: `active` (home, documents, scan, account, none).
- Hardcoded: Home, Docs, Scan, Account labels; Lucide icons; navy scan FAB.

## PrimaryButton
- Source: `components/PrimaryButton.tsx`
- Category: basic
- Description: full-width primary scan CTA.
- Extractable props: `href`, `label`.
- Hardcoded: navy fill, ScanLine icon, rounded-xl shape.

## DocumentCard
- Source: `components/DocumentCard.tsx`
- Category: basic
- Description: compact document row with filename, date, and semantic risk.
- Extractable props: `title`, `date`, `risk`, `riskLabel`, `href`.
- Hardcoded: file icon, card surface/rule treatment.

## RiskBadge
- Source: `components/RiskBadge.tsx`
- Category: basic
- Description: semantic severity chip shared by documents and findings.
- Extractable props: `level`, `label`.
- Hardcoded: compact uppercase treatment and semantic token mapping.

## AttachmentSheet
- Source: `components/AttachmentSheet.tsx`
- Category: layout
- Description: modal attachment/action sheet for scan and chat contexts.
- Extractable props: `visible`, `onClose`, `onPickUpload`.
- Hardcoded: action rows and confidential-use explanatory note.

## SettingsSection
- Source: `components/SettingsSection.tsx`
- Category: basic
- Description: collapsible settings group with optional danger state.
- Extractable props: `title`, `children`, `defaultOpen`, `danger`.
- Hardcoded: chevron behavior, surface card style.

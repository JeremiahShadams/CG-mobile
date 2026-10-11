# ContractGuard Mobile (CG-Mobile) — Implementation Plan

Source: Superdesign Project `09f1815e-37e4-48cf-9e90-924c54feb330`
Codebase status at plan time: empty (`C:\Users\SOJ\Documents\CG-Mobile` — 0 entries).
All 14 design-draft HTML fetched via `GET https://api.superdesign.dev/v1/design-drafts/{draftId}/html` and analyzed from raw HTML. Copies cached for reference in temp `cg-designs/*.html` during planning.

## 1. Draft inventory

| # | Screen | DraftId | HTML endpoint |
|---|--------|---------|---------------|
| 1 | ContractGuard Home with Navigation Links | `abe42a5d-a6e7-465d-b017-7e9c3005065b` | `/v1/design-drafts/abe42a5d-a6e7-465d-b017-7e9c3005065b/html` |
| 2 | Camera Screen | `0d473d39-8fab-453e-a4fb-b04559a49d9d` | `/v1/design-drafts/0d473d39-8fab-453e-a4fb-b04559a49d9d/html` |
| 3 | Upload Progress | `f7f4e9fa-079a-4e1d-bfcc-15d9dc656363` | `/v1/design-drafts/f7f4e9fa-079a-4e1d-bfcc-15d9dc656363/html` |
| 4 | Analysis Results | `ddf44559-f796-4d05-bbfc-0befabbe0abf` | `/v1/design-drafts/ddf44559-f796-4d05-bbfc-0befabbe0abf/html` |
| 5 | Clause Detail | `5f6c5a23-cd5e-417c-a280-35ab7fdf7532` | `/v1/design-drafts/5f6c5a23-cd5e-417c-a280-35ab7fdf7532/html` |
| 6 | Document Viewer | `b49fc3fd-903e-414b-a09e-e5185aead9c9` | `/v1/design-drafts/b49fc3fd-903e-414b-a09e-e5185aead9c9/html` |
| 7 | Chat Screen | `3bd041a4-3090-4ffe-8a34-b0f2b794ff00` | `/v1/design-drafts/3bd041a4-3090-4ffe-8a34-b0f2b794ff00/html` |
| 8 | Chat Attachments Modal | `4896147f-6f39-4358-95cb-f24dbfa26e81` | `/v1/design-drafts/4896147f-6f39-4358-95cb-f24dbfa26e81/html` |
| 9 | Lawyer Handoff Flow | `ad1225e1-e9cb-461e-b515-668eb5a659db` | `/v1/design-drafts/ad1225e1-e9cb-461e-b515-668eb5a659db/html` |
| 10 | ContractGuard - Page Review | `292882f9-a687-4c5a-9272-635240a7fa80` | `/v1/design-drafts/292882f9-a687-4c5a-9272-635240a7fa80/html` |
| 11 | Processing Status | `552134fe-34b6-4757-ab82-f2e782cb1e35` | `/v1/design-drafts/552134fe-34b6-4757-ab82-f2e782cb1e35/html` |
| 12 | Account Settings | `c504d415-a160-4975-8e57-bbe96f543c31` | `/v1/design-drafts/c504d415-a160-4975-8e57-bbe96f543c31/html` |
| 13 | Documents Library | `16ac03cb-0781-4554-93a1-9accff02b835` | `/v1/design-drafts/16ac03cb-0781-4554-93a1-9accff02b835/html` |
| 14 | Startup & Authentication | `b186d2d1-5674-4564-aac6-44680c04fd0c` | `/v1/design-drafts/b186d2d1-5674-4564-aac6-44680c04fd0c/html` |

Preview URL pattern (from in-HTML links): `https://draft-{draftId}.preview.superdesign.dev`.

## 2. Design system (extracted, use verbatim)

- **Fonts:** `Inter` 400/500/600/700 everywhere; `Fraunces` 600 for wordmark (`ContractGuard` splash/auth) + doc serif fallback; Document Viewer body uses `Times New Roman` serif, `14.5px, lh 1.65, justify`.
- **Colors:**
  - `bg #F7F8FA`, `surface #FFFFFF`, `border #E3E7EC`, `text #111827`, `subtext #667085`, `muted #A8B1BF`
  - `navy #0B1220` (primary buttons), `navy-elevated #111B2C`, `navy-border #253247`, dark surface `#0B1220` / `#0D1424`, dark text `#F5F7FA` / `#D0D5DD` / `#A8B1BF`
  - Risk: Critical `#9B1C1C` on `#FFF5F5` border `#FFE0E0`; High/Medium `#9F580A` on `#FFF9ED` border `#FDE6B5`; Safe `#166534` on `#F0FDF4` border `#DCFCE7`; Info `#3B82F6`; Warn `#EAB308`; Evidence highlight `#FEF08A/40`.
- **Radii:** cards 16/20, buttons 12 (primary 18px py), chips 6/8/10, sheet 24 top, thumbnails 6/8/12.
- **Icons:** all `lucide:*` via Iconify in designs → use `lucide-react-native` in app. No custom SVGs needed except Google `logos:google-icon` + `logos:visa` in auth/billing.
- **Chrome:** `pt-14` safe-area header, `pb-[34px]` home indicator footer, `h-screen flex-col`, scroll `main flex-1 overflow-y-auto`. Home + account + documents use view-transitions (`main-nav` static, `main-content` fade); replicate with native stack fade where cheap.
- **Dark mode:** required on Document Viewer, Chat, Chat Attachments (full `dark:` variants in HTML). Others light-only.

## 3. Navigation map (from actual `<a href>` links in HTML)

```
Startup/Auth (splash 3s navy → Get started)
  → Home (Good morning, Jeremiah)
      PrimaryButton → Camera
      ProgressCard(63%) → Processing Status
      DocumentCard ×3 → Analysis Results
      BottomNav: home | documents | scan(camera) | account
Camera (X → Home, shutter → Page Review)
  → Page Review (back → Camera, + → Camera, Analyze → Upload Progress)
      → Upload Progress (back → Page Review, Continue Demo → Processing Status)
          → Processing Status (bottom nav active)
              → Analysis Results (back → Home)
                  Finding cards ×3 → Clause Detail
                  → Clause Detail (back → Results)
                      View in document → Document Viewer
                      Ask ContractGuard → Chat
                      Ask lawyer → Lawyer Handoff Step1
                      → Document Viewer (back → Clause Detail, pager prev/next)
                      → Chat (back → Results, attach+ → Attachments Sheet, citation → Clause Detail)
                          → Attachments Sheet (X → Chat, Scan → Camera, Upload/From Docs/Compare = placeholders)
                      → Lawyer Handoff [single file, 3 steps via showStep()]:
                          Step1 Request (cancel → Clause Detail, Continue → Step2)
                          Step2 Status Case #CG-19482 (Return → Home, Skip Demo → Step3)
                          Step3 Response (X → Home, View in document → Viewer, Start new → Step1)
Documents Library (search + cards → Analysis Results)
Account Settings (tabbed details sections, Sign out)
```

BottomNavigation is shared `sd-component id 1f83c8b8-...` with props `{activeItem, homeHref, documentsHref, scanHref, accountHref}`. Active states seen: `home` (home/clause/processing), `documents` (viewer/library), `account` (settings), `none` (results/chat).

Other shared `sd-component`s to port first: `PrimaryButton (ac76e5fe-...)`, `ProgressCard (a0b78607-..., props {progress})`, `DocumentCard (65116b21-..., props {riskLevel,title,date,href})`.

## 4. Screen-by-screen build spec

1. **Startup & Auth** — navy splash overlay (wordmark 40px Fraunces, "Initializing…" + 3 pulsing dots, 3s fade, `prefers-reduced-motion` equivalent = reduce-motion setting). Auth: `ContractGuard` 28px navy + `Get started` 22px + subtext, Google (white/border) / email (navy) / create (white) 52px buttons, guest 44px, Terms/Privacy footer.
2. **Home** — greeting 22px semibold, scan CTA, `In Progress` 11px uppercase label + ProgressCard, `Recent` + View all + 3 DocumentCards (high Freelance MSA 2h ago / medium Tenancy Yesterday / safe Mutual NDA Oct 12).
3. **Camera** — black fullscreen, Unsplash placeholder → replace with `expo-camera` live feed; gradient scrims top/bottom; X + help 40px glass pills; boundary rect `left/right 20px, top 130px bottom 190px`, 1.5px `#E3E7EC/70` + white corner accents + vignette shadow; `Hold steady` pill (green dot); bottom: page counter thumb (64px, count 1), shutter 76px white ring + 60px navy center, AUTO pill.
4. **Page Review** — `Review Scan` header (back + X), doc preview max-w 280px aspect 1/1.4 + `Readable` green badge, thumbnail strip (selected navy border + count pill, add-page dashed), summary card (`Employment Agreement, 3 pages, All pages readable`), Retake (white flex-1) + Analyze (navy flex-2).
5. **Upload Progress** — `Uploading` header, cloud icon 80px tile, `Uploading your contract / Page 3 of 8`, file card (`Employment Agreement`, `4.8/7.2MB`, 66% navy bar, Pause), background note, `Continue to Processing (Demo)` navy CTA.
6. **Processing Status** — `Your contract is being reviewed. 26px` + secure subtext, 6-row timeline card (Upload complete ✓ / Verified ✓ / Reading ✓ / Finding clauses active ring-dot / Analyzing risks pending / Preparing pending), background note.
7. **Analysis Results** — white hero: alert icon tile, `Employment Agreement`, `8 pages`, `HIGH RISK` chip, 5-bar distribution (Critical 3 red / 2 orange / 4 yellow / 7 blue / 11 green) + Critical–Safe labels; `Top findings` 3 cards (8.2 IP Critical / 11.3 Termination High / 14.1 Non-compete High, each badge + clause no + 2-line clamp) + `View all 27 findings` outline button.
8. **Clause Detail** — `Clause Analysis` header, `CRITICAL RISK` chip + `Intellectual Property` 22px + `Clause 8.2`; `What this means` / `Why this matters` 15px/1.6; Evidence card (navy left rail, serif 14px, yellow highlight spans, `Strong Match` green chip); Related chips (8.4, 11.3); 3 CTAs navy/white/white with icons (file-search / message-square / scale).
9. **Document Viewer** — header (`Clause 8.2` + `7 of 18` counter), serif justified doc (§8–8.5, 8.2 pink highlight `#FFF5F5` + 2px bottom border), `Why this matters` panel + pager chevrons, bottom nav `documents` active. Keep pulse-on-load effect as native highlight flash.
10. **Chat** — `Ask about this contract` header, bubbles (user navy right 85% / AI white left 90%), two AI variants (insufficient: no-penalty + closest Clause 11.2; with evidence: ownership answer + Source card `Clause 8.2 · IP · p.7`), `Suggested next questions` 3 outline buttons, composer (attach + → sheet, rounded 22px input, navy send arrow-up).
11. **Chat Attachments** — dim backdrop + bottom sheet (handle, `Add attachment`, X): 4 rows 42px icon tiles (Scan another / Upload PDF-image / Add from Documents / Compare versions) + privacy footer (`used only in this conversation…`).
12. **Lawyer Handoff** — implement as 3-step stack, not tabs: S1 checkboxes (contract 8pp / 8.2 / 11.3 / question quote / other docs / prev conv) + green confidentiality banner + Continue/Cancel; S2 `Review Status` case card `#CG-19482` + 5-step vertical timeline (submitted ✓ / shared ✓ / finding active / reviewing pending / responded pending) + 1–2h note; S3 `Review complete` (Resolved 10m) + question card + navy-header `Lawyer Response` card (Analysis / Suggested Change serif w/ red underline insert / Questions bullet / View annotation) + Start new.
13. **Documents Library** — `Documents` 22px + sticky search (`Search by title, type, or date…` + clear), 4 cards (Employment HIGH today 8pp complete / Commercial MEDIUM yesterday 14pp complete / Mutual SAFE Oct12 2pp complete / Freelance HIGH Sep28 5pp review-requested) each with overflow menu.
14. **Account Settings** — `Account Settings` + collapsible white sections: Profile (JR avatar, Jeremiah Rodriguez, Edit), Plan (Professional Active, 7/10 bar 70%, Dec 15 billing, Upgrade), Billing (invoice #CG-2024-1102 $29.99, Visa 4242, invoices/payment links), Notifications (3 navy toggles + advanced), Security (password / 2FA off Recommended / sessions 1 device), Privacy (data usage / export / policy), Help (help/contact/bug/terms), Danger Zone (pink, Delete), Sign out navy + `v1.2.0 (428)`.

## 5. Recommended stack (greenfield — confirm before scaffold)

`Expo (React Native + TypeScript) + Expo Router + NativeWind + lucide-react-native + Inter/Fraunces via expo-font.` Rationale: designs are Tailwind + Inter + Lucide + mobile-first; NativeWind is closest port; Expo covers camera (`expo-camera`), uploads (`expo-document-picker`/`expo-image-picker`), haptics, notifications. Dark mode via NativeWind `dark:` (matches HTML). State: lightweight stores (zustand) + mocks first; backend (upload/analysis/chat/lawyer APIs) stubbed with fixtures matching design copy.

Suggested tree:
```
app/
  _layout.tsx  (font, theme, tab/stack shell)
  (auth)/index.tsx            #14 splash+auth
  (tabs)/index.tsx            #1 home
  (tabs)/documents.tsx        #13
  (tabs)/account.tsx          #12
  scan/camera.tsx             #2
  scan/review.tsx             #10
  scan/upload.tsx             #3
  scan/processing.tsx         #11
  results/[docId].tsx         #4
  clause/[clauseId].tsx       #5
  viewer/[docId].tsx          #6
  chat/[docId].tsx            #7 + sheet #8
  lawyer/request.tsx status.tsx response.tsx  #9 S1-3
components/ BottomNavigation.tsx RiskBadge.tsx DocumentCard.tsx ProgressCard.tsx
  FindingCard.tsx EvidenceQuote.tsx TimelineStep.tsx ChatBubble.tsx SourceCitation.tsx
  Composer.tsx AttachmentSheet.tsx SettingsSection.tsx Toggle.tsx PrimaryButton.tsx
theme/tokens.ts  data/fixtures.ts  lib/api.ts (stub)
```

## 6. Phased delivery

- **P0 Scaffold:** Expo Router + NativeWind + fonts + tokens + BottomNavigation shell + fixtures (`Employment Agreement`, clauses 8.2/11.3/14.1, 4 docs, case #CG-19482).
- **P1 Auth+Home+Library+Account:** screens 14/1/13/12 with search, collapsibles, toggles (no backend).
- **P2 Scan flow:** 2→10→3→11 with `expo-camera`, thumbnail state, fake upload progress (66%, Page 3/8) + 6-step timeline timers → navigate to stubbed Results.
- **P3 Analysis:** 4→5→6 with risk bars, finding list (27 fixture, show 3 + View all), evidence highlights, viewer pager + highlight flash, dark mode.
- **P4 Chat + Sheet:** 7+8 bubbles, citations → clause, suggestions, composer UI, sheet options (Scan wires real, others stubbed).
- **P5 Lawyer:** 9 S1→S2→S3 with checkbox state, timeline, response card.
- **P6 Polish:** reduced-motion, a11y labels, empty/error states, app version string, icon splash, EAS build.

## 7. Data fixtures (match copy exactly in P0–P5, wire APIs later)

`Document{id,title,pages,updatedAt,risk,status}`, `Finding{clauseNo,title,severity,summary}`, `Clause{id,no,title,risk,meaning,why,evidence[],related[]}`, `ChatMessage{role,text,citation?}`, `LawyerCase{id #CG-19482, steps[], response{analysis,suggestedChange,questions[]}}`. Pause/Retake/Compare/Upgrade/Delete/Sign-out = UI-only toasts in early phases.

## 8. Open decisions for owner

1. Confirm Expo + NativeWind (vs Flutter) — plan assumes Expo.
2. Real backend contracts for upload/analyze/chat/lawyer vs fixtures duration.
3. Auth providers (Google/email/guest) — real SDKs or stubbed in P1?
4. Camera UX: AUTO mode + readability detection — ship static (design) or real CV gating?

Next action on approval: scaffold per §5 and build P0+P1.

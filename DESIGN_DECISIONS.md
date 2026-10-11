# ContractGuard AI — Design Decisions

## Intended feeling

**Calm confidence, fast relief, informed control.** ContractGuard is not an alarm system. It is the composed expert who helps a person make the next sensible decision.

## Psychological foundation

People reach legal analysis with asymmetric information: the other party may know the language, the consequences feel high, and uncertainty is uncomfortable. The product earns trust by making three things immediately visible: what happened, what matters, and what can be done next.

- **Authority without distance:** deep navy and careful document typography signal institutional competence; short plain-language explanations prevent the interface from feeling like a law firm portal.
- **Risk without panic:** a risk state is always a labelled, explainable decision cue—not a visual alarm. Critical uses restrained crimson; high is amber; safe is calm green. Color never stands alone.
- **Progress without opacity:** analysis says `Reading clauses`, `Checking obligations`, and `Writing your summary`, instead of showing an unexplained spinner. This makes the AI's work legible without implying certainty it does not have.
- **Conversion through earned value:** a guest sees a useful risk summary before the account prompt. Paywalls are entitlement summaries tied to an active job, not interruption overlays.

## Final token system

| Token | Value | Decision |
| --- | --- | --- |
| `canvas` | `#F7F8FA` | Soft neutral paper field for longer reading. |
| `surface` | `#FFFFFF` | Clear content layer for cards, sheets, and document details. |
| `ink` | `#111827` | High-legibility UI and body text. |
| `sub` | `#667085` | Metadata and supporting explanation. |
| `navy` | `#0B1220` | Authority anchor, navigation, and primary non-commercial action. |
| `teal` | `#087E8B` | Positive momentum / upgrade / active progress, used sparingly. |
| `critical` | `#9B1C1C` | Potentially illegal or materially harmful clause. |
| `high` | `#9F580A` | Needs attention before signing. |
| `medium` | `#8A6900` | Inspect or negotiate. |
| `safe` | `#166534` | Reassuring / lower-risk result. |

Typography is Inter for interface and explanations, Fraunces 600 only for a small number of editorial/legal headings, and Georgia/Times only for quoted contract text. The spacing base is 4px, with 20px mobile gutters; cards are 16px round, primary controls 12px, and bottom sheets 24px. Shadows are limited to elevated sheets and the central scan affordance.

## Interaction system

- Press feedback: 180ms opacity/scale response; no bouncy or performative motion.
- State transition: 220ms ease-out for sheets and step changes.
- Analysis state: quiet 1.2s shimmer plus named progressive steps.
- Haptics: soft selection on a risk badge, success notification on completed analysis/payment, and no haptic for passive information.
- Reduced motion: remove shimmer and movement; retain state labels and static progress.

## Funnel architecture

1. **Value before identity:** Splash → onboarding → guest scan → top three meaningful findings.
2. **Save the work:** Guest preview → sign up / log in only when the full analysis, report, or follow-up chat needs persistence.
3. **Understand the contract:** Analysis overview → clause detail → document highlight → AI chat.
4. **Escalate with context:** Lawyer directory/request is surfaced only after a user has read a finding or needs a human opinion.
5. **Upgrade with a reason:** A limit or high-value capability gives the plan comparison context; no forced countdowns or ambiguous cancellation.

## Screen families

| Family | Primary job | Visual/UX pattern |
| --- | --- | --- |
| Pre-auth | establish value and reduce commitment fear | editorial onboarding, concise auth gateway, low-friction guest path |
| Scan/upload | make the first action obvious and safe | three-choice action sheet, visible privacy reassurance, validation then progress |
| Analysis | turn legal text into a decision | risk overview first, progressive disclosure into clauses/evidence |
| Chat | answer a contract question with provenance | conversational UI with citation chips and source sheet |
| Reports/share | make advice portable and useful | preview before export, expiration and access controls made explicit |
| Billing | contextual upgrade and clear plan ownership | outcome-led feature comparison, transparent renewal/usage |
| Marketplace | create human-review confidence | verified identity, scope/fee/timeline before confirmation |
| Organization/admin | support governance rather than consumer navigation | denser task lists, auditability, role/permission clarity |
| System states | protect trust during failure or constraint | named cause, retained work where possible, one recovery action |

## Accessibility/performance contract

- WCAG AA text contrast, 44×44pt targets, dynamic type-safe layouts, and descriptive labels.
- Risk labels pair color with text and an icon/shape when practical.
- Lists use virtualization; documents and analysis states use skeletons, not blank screens.
- Last-viewed document and upload queue should be locally resilient; retries must not discard user input.
- Analytics follows the user journey: `scan_started`, `upload_validated`, `analysis_completed`, `guest_preview_viewed`, `signup_started`, `paywall_viewed`, `upgrade_tapped`, `lawyer_request_started`, `report_shared`.

## Implementation boundaries

The current repository has Expo Router, NativeWind, Reanimated, camera/document-picker, secure storage, typography, and an early signed-in contract-analysis flow. New integrations (Supabase, RevenueCat, Paystack, analytics, Sentry, test libraries) must be added only after their Expo 57 compatible setup is verified and their backend/payment ownership is specified.

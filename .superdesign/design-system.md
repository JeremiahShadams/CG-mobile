# ContractGuard AI design system

## Product and audience

ContractGuard AI is a mobile-first legal analysis companion for people signing or reviewing contracts. It must reduce anxiety without diluting legal seriousness. The primary job is to turn an unclear document into a calm, actionable next step; the primary conversion is a value-earned Professional upgrade.

## Design principles

1. **Calm authority** — document typography and deep navy establish expertise; plain-language copy makes that expertise approachable.
2. **One decision at a time** — a single dominant CTA per screen, with secondary actions visually quieter.
3. **Severity without alarm** — risk is labelled, explained, and paired with a next action. Critical uses restrained crimson, never bright red.
4. **Progress earns trust** — long-running AI work describes what it is doing in human terms rather than exposing a spinner.
5. **Tactile restraint** — 180–240ms presses, short success haptics, and motion that explains a state change; always honour Reduce Motion.

## Token contract

| Role | Value | Usage |
| --- | --- | --- |
| Canvas | `#F7F8FA` | warm paper-like app background |
| Surface | `#FFFFFF` | cards, sheets, readable document layers |
| Ink | `#111827` | primary body/UI text |
| Subtle text | `#667085` | metadata and supporting copy |
| Rule | `#E3E7EC` | quiet separators and card borders |
| Navy | `#0B1220` | navigation, primary action, authority anchor |
| Navy elevated | `#111B2C` | dark surface and immersive viewer |
| Teal action | `#087E8B` | upgrade / positive momentum, sparingly |
| Critical | `#9B1C1C` | legal illegality or urgent clause risk |
| High | `#9F580A` | substantial commercial/legal risk |
| Medium | `#8A6900` | investigate before signing |
| Safe | `#166534` | safe or confidence signal |

Typography: Inter (UI, 400/500/600/700); Fraunces 600 (editorial headings only); Georgia/Times (verbatim contract evidence). Use 11/13/14/15/16/20/22/28/34px type sizes with 1.25–1.55 line-height. Use 4px spacing increments; primary screen gutters are 20px; cards are 16px; compact controls 12px; sheets 24px. Radius: 6 chip, 12 button, 16 card, 20 prominent card, 24 sheet. Shadows are rare: a single low-opacity y=6/blur=20 shadow only on floating sheets.

## Core patterns

- Bottom navigation: Home, Documents, elevated Scan action, Account. It is persistent only in the signed-in core.
- Scan: selection → validation → understandable progressive analysis → overview. Guest users get a real top-three finding before account demand.
- Analysis: overview provides the score and next action; the clause list supports filtering; detail always separates raw text, interpretation, reason, and recommended action.
- Upgrade: neutral factual entitlement language, comparison by outcome, monthly/yearly choice without preselection tricks.
- Lawyer marketplace: verification is shown near the identity; pricing, scope, and availability precede request confirmation.

## Accessibility and motion

All targets are at least 44×44pt. Risk never relies on color alone: label, icon/shape, and explanatory copy accompany it. Meet WCAG AA for text. Support dynamic type without clipping. Screen-reader labels describe outcome (for example, “Open clause 8.2, high risk”) rather than visual treatment. Use 180ms press feedback, 220ms card/sheet transitions, and 1.2s low-amplitude shimmer. Disable nonessential animation under Reduce Motion.

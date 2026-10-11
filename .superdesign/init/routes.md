# Route discovery

Expo Router file routes with headerless nested stacks.

| URL | Entry | Layout | Current responsibility |
| --- | --- | --- | --- |
| `/` | `app/index.tsx` | root stack | launch/session handoff |
| `/auth` | `app/(auth)/index.tsx` | auth modal stack | gateway/auth choice |
| `/(tabs)` | `app/(tabs)/index.tsx` | tabs + BottomNavigation | signed-in dashboard |
| `/(tabs)/documents` | `app/(tabs)/documents.tsx` | tabs + BottomNavigation | document library/search |
| `/(tabs)/account` | `app/(tabs)/account.tsx` | tabs + BottomNavigation | account settings |
| `/scan/camera` | `app/scan/camera.tsx` | scan stack | scan capture |
| `/scan/upload` | `app/scan/upload.tsx` | scan stack | upload selection |
| `/scan/review` | `app/scan/review.tsx` | scan stack | document validation |
| `/scan/processing` | `app/scan/processing.tsx` | scan stack | analysis progress |
| `/results/[docId]` | `app/results/[docId].tsx` | results stack | risk overview |
| `/clause/[clauseId]` | `app/clause/[clauseId].tsx` | clause stack | clause evidence/detail |
| `/viewer/[docId]` | `app/viewer/[docId].tsx` | viewer stack | document viewer |
| `/chat/[docId]` | `app/chat/[docId].tsx` | chat stack | contract chat |
| `/lawyer/request` | `app/lawyer/request.tsx` | lawyer stack | review request |
| `/lawyer/status` | `app/lawyer/status.tsx` | lawyer stack | engagement tracking |
| `/lawyer/response` | `app/lawyer/response.tsx` | lawyer stack | response/deliverable |

Root layout loads Inter and Fraunces before clearing the native splash, resolves the local encrypted session cache, and declares all feature stacks.

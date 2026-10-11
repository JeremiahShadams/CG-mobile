# Theme discovery

## Token summary

- Framework: Expo Router + React Native 0.86 + TypeScript.
- Styling: NativeWind 4/Tailwind CSS. Font families are `Inter`, `Fraunces`, and document serif (`Georgia`, `Times New Roman`).
- Base colors: canvas `#F7F8FA`, surface `#FFFFFF`, line `#E3E7EC`, ink `#111827`, sub `#667085`, muted `#A8B1BF`, navy `#0B1220`, elevated navy `#111B2C`, dark text `#F5F7FA`.
- Existing semantic colors: critical `#9B1C1C` / `#FFF5F5`; high and medium `#9F580A` / `#FFF9ED`; safe `#166534` / `#F0FDF4`.
- Radius: chip 6, button 12, card 16, large card 20, sheet 24.
- Existing spacing is based on Tailwind's 4px scale, with 20px mobile gutters and 16px card padding.

## Raw `theme/tokens.ts`

```ts
export const tokens = {
  color: {
    canvas: '#F7F8FA', surface: '#FFFFFF', line: '#E3E7EC', ink: '#111827',
    sub: '#667085', muted: '#A8B1BF', navy: '#0B1220', navyElevated: '#111B2C',
    navyBorder: '#253247', darkSurface: '#0B1220', darkElevated: '#111B2C',
    darkText: '#F5F7FA', darkSub: '#A8B1BF', darkDocText: '#D0D5DD', viewerBg: '#0D1424',
  },
  risk: {
    critical: { text: '#9B1C1C', bg: '#FFF5F5', border: '#FFE0E0' },
    high: { text: '#9F580A', bg: '#FFF9ED', border: '#FDE6B5' },
    medium: { text: '#9F580A', bg: '#FFF9ED', border: '#FDE6B5' },
    safe: { text: '#166534', bg: '#F0FDF4', border: '#DCFCE7' }, info: '#3B82F6', warn: '#EAB308',
  }, radius: { chip: 6, button: 12, card: 16, cardLg: 20, sheet: 24 },
} as const;
```

## Raw `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Raw `tailwind.config.js`

```js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA', surface: '#FFFFFF', line: '#E3E7EC', ink: '#111827', sub: '#667085', muted: '#A8B1BF',
        navy: { DEFAULT: '#0B1220', elevated: '#111B2C', border: '#253247' },
        risk: { critical: '#9B1C1C', criticalBg: '#FFF5F5', criticalBorder: '#FFE0E0', high: '#9F580A', highBg: '#FFF9ED', highBorder: '#FDE6B5', safe: '#166534', safeBg: '#F0FDF4', safeBorder: '#DCFCE7', info: '#3B82F6', warn: '#EAB308' },
      },
      fontFamily: { sans: ['Inter', 'System'], brand: ['Fraunces', 'Georgia', 'serif'], doc: ['Georgia', 'Times New Roman', 'serif'] },
    },
  }, plugins: [],
};
```

export const tokens = {
  color: {
    canvas: '#F7F8FA',
    surface: '#FFFFFF',
    line: '#E3E7EC',
    ink: '#111827',
    sub: '#667085',
    muted: '#A8B1BF',
    navy: '#0B1220',
    navyElevated: '#111B2C',
    navyBorder: '#253247',
    darkSurface: '#0B1220',
    darkElevated: '#111B2C',
    darkText: '#F5F7FA',
    darkSub: '#A8B1BF',
    darkDocText: '#D0D5DD',
    viewerBg: '#0D1424',
  },
  risk: {
    critical: { text: '#9B1C1C', bg: '#FFF5F5', border: '#FFE0E0' },
    high: { text: '#9F580A', bg: '#FFF9ED', border: '#FDE6B5' },
    medium: { text: '#9F580A', bg: '#FFF9ED', border: '#FDE6B5' },
    safe: { text: '#166534', bg: '#F0FDF4', border: '#DCFCE7' },
    info: '#3B82F6',
    warn: '#EAB308',
  },
  radius: { chip: 6, button: 12, card: 16, cardLg: 20, sheet: 24 },
} as const;

export type RiskLevel = 'critical' | 'high' | 'medium' | 'safe';

export function riskStyle(level: RiskLevel) {
  switch (level) {
    case 'critical':
      return tokens.risk.critical;
    case 'high':
    case 'medium':
      return tokens.risk.high;
    case 'safe':
      return tokens.risk.safe;
  }
}

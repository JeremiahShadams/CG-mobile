/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA',
        surface: '#FFFFFF',
        line: '#E3E7EC',
        ink: '#111827',
        sub: '#667085',
        muted: '#A8B1BF',
        navy: {
          DEFAULT: '#0B1220',
          elevated: '#111B2C',
          border: '#253247',
        },
        risk: {
          critical: '#9B1C1C',
          criticalBg: '#FFF5F5',
          criticalBorder: '#FFE0E0',
          high: '#9F580A',
          highBg: '#FFF9ED',
          highBorder: '#FDE6B5',
          safe: '#166534',
          safeBg: '#F0FDF4',
          safeBorder: '#DCFCE7',
          info: '#3B82F6',
          warn: '#EAB308',
        },
      },
      fontFamily: {
        sans: ['Inter', 'System'],
        brand: ['Fraunces', 'Georgia', 'serif'],
        doc: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};

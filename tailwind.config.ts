import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Editorial palette: deep onyx, warm ivory, champagne, soft blush, muted plum.
        onyx: {
          DEFAULT: '#0B0A0A',
          900: '#0B0A0A',
          800: '#141212',
          700: '#1E1A1A',
          600: '#2A2424',
        },
        ivory: {
          DEFAULT: '#F5EFE6',
          50: '#FBF8F2',
          100: '#F5EFE6',
          200: '#EAE2D3',
        },
        champagne: {
          DEFAULT: '#C8A96A',
          400: '#D4B57A',
          500: '#C8A96A',
          600: '#A8884E',
          700: '#7E6638',
        },
        blush: {
          DEFAULT: '#E8C5BD',
          200: '#F2D9D3',
          300: '#E8C5BD',
          400: '#D9A89E',
        },
        plum: {
          DEFAULT: '#3E2433',
          700: '#3E2433',
          800: '#2A1722',
          900: '#1A0E15',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale
        'display-xl': ['clamp(3.25rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

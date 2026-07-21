/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Blanco cal andaluz cálido — base
        cal: {
          DEFAULT: '#F7F2E9',
          50: '#FDFBF7',
          100: '#F7F2E9',
          200: '#EFE7D6',
          300: '#E3D6BE',
          400: '#D2BE9C',
        },
        // Añil profundo de sombra de patio — contraste
        anil: {
          DEFAULT: '#1E3A4C',
          50: '#EAF0F3',
          100: '#C9D7DF',
          400: '#3C6178',
          500: '#2A4B5E',
          600: '#1E3A4C',
          700: '#182F3D',
          800: '#12232E',
          900: '#0C171F',
        },
        // Terracota de barro cocido — acento / CTA
        terracota: {
          DEFAULT: '#B5502E',
          400: '#C96A48',
          500: '#B5502E',
          600: '#9A4123',
          700: '#7C341C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        'patio-drift': {
          '0%, 100%': { transform: 'translateX(0) skewX(-12deg)' },
          '50%': { transform: 'translateX(3%) skewX(-12deg)' },
        },
      },
      animation: {
        'patio-drift': 'patio-drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

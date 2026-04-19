/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        navy: {
          DEFAULT: '#2D3A9E',
          hover:   '#242f85',
          soft:    'rgba(45,58,158,0.12)',
        },
        blue: {
          DEFAULT: '#2563eb',
          hover:   '#1d4ed8',
          soft:    'rgba(37,99,235,0.12)',
        },
        teal: {
          DEFAULT: '#0F6E56',
          hover:   '#0b5a45',
          soft:    'rgba(15,110,86,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};

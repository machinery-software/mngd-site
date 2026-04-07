/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:  '#0f1117',
        dim:  '#1a1d27',
        muted: '#2a2d3a',
        blue: {
          DEFAULT: '#2563eb',
          hover:   '#1d4ed8',
          soft:    'rgba(37,99,235,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};

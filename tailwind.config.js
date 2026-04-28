/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        finky: {
          navy: '#0f172a',
          orange: '#f16c2d',
          cream: '#fbfaf7',
        },
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 30px 80px -32px rgba(15, 23, 42, 0.18), 0 10px 30px -16px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

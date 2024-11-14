/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'profit': '#10B981',
        'loss': '#EF4444',
      },
    },
  },
  plugins: [],
};
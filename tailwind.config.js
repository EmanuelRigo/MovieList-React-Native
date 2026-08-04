/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary blue from the app's splash screen
        main: '#208AEF',
        secondary: '#5B9BD5',
        background: '#0F172A',
        surface: '#1E293B',
      },
    },
  },
  plugins: [],
};

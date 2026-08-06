/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand accents (MovieList — accent amarillo cálido)
        accent: {
          primary: 'rgb(244 180 0 / <alpha-value>)', // #f4b400 — CTAs / foco
          hover: 'rgb(255 201 61 / <alpha-value>)', // #ffc93d
          muted: 'rgb(215 154 0 / <alpha-value>)', // #d79a00 — disabled
        },
        // Capas de fondo (de raíz a más elevado)
        background: {
          DEFAULT: '#0a0a0a',
          primary: '#0a0a0a', // shell principal
          secondary: '#121212', // paneles / inputs elevados
          elevated: '#1a1a1a', // header / cards / modals
        },
        // Surfaces (estados interactivos)
        surface: {
          primary: '#1e1e1e', // inputs, chips, toggles
          hover: '#2a2a2a',
          active: '#353535',
        },
        // Borders
        border: {
          DEFAULT: '#2e2e2e',
          subtle: '#2e2e2e',
          strong: '#404040',
          accent: '#ffc93d',
        },
        // Texto
        text: {
          DEFAULT: '#f8f8f8',
          primary: '#f8f8f8',
          secondary: '#a1a1aa',
          muted: '#6b7280',
        },
      },
      extend: {
        ringColor: {
          accent: '#f4b400',
        },
        boxShadow: {
          accent:
            '0 0 18px -2px rgb(244 180 0 / 0.35), 0 0 4px rgb(244 180 0 / 0.15)',
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // THE ACID GREEN ACCENT - The core of the new look
        accent: '#BDFF00', 
      },
      fontFamily: {
        // Ensure you are using a strong, bold sans-serif.
        // Recommended: Inter, Archivo Black, or JetBrains Mono.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      borderWidth: {
        '3': '3px', // Adding a 3px border utility
      },
      animation: {
        // Custom animation for slower spin
        'spin-slow': 'spin 12s linear infinite',
        // Marquee animations
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
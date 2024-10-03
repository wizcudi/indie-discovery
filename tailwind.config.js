/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        // You can also use max-width queries
        'max-xs': {'max': '400px'}
      }
    },
  },
  plugins: [],
}


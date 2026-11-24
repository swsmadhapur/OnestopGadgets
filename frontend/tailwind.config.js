/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D92035',
          deepRed: '#AA152B',
          royalBlue: '#123C91',
          electricBlue: '#2865DA',
          navy: '#091B3D',
          cyan: '#00D2FF',
          amber: '#FF9900',
          surface: '#F3F6FC',
          card: '#FFFFFF',
          border: '#DCE4F0',
          textPrimary: '#091B3D',
          textSecondary: '#52627B',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

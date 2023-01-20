/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", //
    "./src/**/*.{js,jsx,ts,tsx}" //pasta src
  ],
  theme: {
    extend: {
      colors: {
        //color
        background: '#09090a',
      },
      fontFamily: {
        //fonts usaremos
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold'
      }
    },
  },
  plugins: [],
}

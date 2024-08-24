/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: {
           100: '#D9D9D9',
           300: '#949291',
           400: '#716D6C'
        },
        customBlack: '#121212',
        customYewllow: '#FAC325',

      },
      boxShadow:{
        homePrimaryButton: '0px 4px 4px 0px #00000040',
        navbar: '0px 0px 10px 0px #000000BF',
      }
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        josefin: ['Josefin+Sans', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        varela: ['Varela', 'sans-serif'],
      },
      colors: {
        "white-400": "rgba(255, 255, 255, 0.80)",
        "light-gray": "#7D7987",
      },
      screens: {
        "wide": "1440px",
        'mb': {'max': '500px'},
      }
    },
  },
  plugins: [],
}
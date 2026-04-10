/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#2DFFEA',
      'primary-dark': '#22D3EE',
      darkbg: '#082226',
      'darkbg-secondary': '#051518',
      textlight: '#FFFFFF',
      textgray: '#94A3B8',
    }
    },
  },
  plugins: [],
}
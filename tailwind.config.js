/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anuphan': ['Anuphan']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}


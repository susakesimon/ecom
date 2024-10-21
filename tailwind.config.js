/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#3B82F6',
        'accent-brown': '#8B4513',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'stream-blue': '#3b82f6',
        'stream-dark': '#111827',
      },
    },
  },
  plugins: [],
}

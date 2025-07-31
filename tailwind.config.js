/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      colors: {
        romantic: {
          50: '#fff0f5',
          100: '#ffe0ec',
          200: '#ffc1d8',
          300: '#ffa2c5',
          400: '#ff7aaf',
          500: '#ff5399',
          600: '#db317a',
          700: '#b12662',
          800: '#861b49',
          900: '#5a0e30',
        },
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [require('tailwind-scrollbar')],
}

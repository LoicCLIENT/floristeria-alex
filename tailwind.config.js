/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6f0',
          100: '#e6ebe0',
          200: '#cdd7c1',
          300: '#adbf9a',
          400: '#8da574',
          500: '#6b8a4f',
          600: '#556b3e',
          700: '#445534',
          800: '#38452c',
          900: '#2f3a26',
          950: '#171e12',
        },
        olive: {
          50: '#f6f7f4',
          100: '#e3e7dc',
          200: '#c8d0bc',
          300: '#a5b394',
          400: '#849671',
          500: '#667a54',
          600: '#4f6041',
          700: '#3f4c35',
          800: '#343e2d',
          900: '#2d3627',
          950: '#171c13',
        },
        cream: {
          50: '#FDFCFA',
          100: '#F5F0E8',
          200: '#ebe3d7',
          300: '#ddd1bf',
          400: '#ccb99f',
          500: '#bda385',
          600: '#ab8d6e',
          700: '#8f745a',
          800: '#75604c',
          900: '#615040',
        },
        sage: '#667a54',
        blush: '#E8B4BC',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.08)',
        'soft-lg': '0 4px 16px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

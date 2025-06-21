import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  darkMode: 'class',
  plugins: [heroui()]
}

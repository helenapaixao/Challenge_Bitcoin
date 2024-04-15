/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,vue}', './index.html'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: '#181A25',
      },
      backgroundImage: {
        'green-gradient':
          'linear-gradient(135deg, rgb(66, 211, 146) 5%, rgb(100, 126, 255))',
      },
      fontSize: {
        'display-2xl': ['4.5rem', 1],
        'display-xl': ['3.75rem', 1],
        'display-lg': ['3rem', 1],
        'display-md': ['2.25rem', '2.5rem'],
        'display-sm': ['1.875rem', '2.25rem'],
        'display-xs': ['1.5rem', '2rem'],
        'xl': ['1.25rem', '1.875rem'],
        'lg': ['1.125rem', '1.75rem'],
        'md': ['1rem', '1.5rem'],
        'sm': ['0.875rem', '1.25rem'],
        'xs': [' 0.75rem', '1.125rem'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

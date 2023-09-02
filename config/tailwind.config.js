const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  safelist: [
    'before:border-[#47C93A]',
    'before:border-[#FF4857]',
    'before:border-[#a7a7a7]',
    'before:border-[#a7a7a7]',
    'text-[#47C93A]',
    'text-[#FF4857]',
    'text-[#a7a7a7]',
    'text-[#a7a7a7]',
  ],
  theme: {
    fontFamily: {
      credit: ['ocr_a_std', 'sans-serif']
    },
    extend: {
      colors: {
        yellow: {
          'FFB': '#FFBA01'
        },
        red: {
          'FF4': '#FF4857'
        },
        green: {
          '47C': '#47C93A',
        },
        primary: {
          '599': '#5995fd',
          '6FA': '#6FA1FF'
        },
        gray: {
          'a7a': '#a7a7a7',
          '777': '#777',
        },
        black: {
          '303': '#303030',
          '191': '#191919',
          '009': '#00000099'
        },
        orange: {
          'f9c': '#f9cbab'
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}

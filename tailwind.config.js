/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': {'min': '375px', 'max': '425px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '426px', 'max': '768px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '769px', 'max': '1024px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1025px'},
    },
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './demo/**/*.{html,vue,js,ts}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

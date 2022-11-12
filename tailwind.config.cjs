

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts}",
  ],
  theme: {
    extend: {
      colors : {}
    },
  },
  plugins: [],
}

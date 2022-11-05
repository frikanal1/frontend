/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["src/**/*.{tsx,jsx}"],
  theme: {
    extend: { fontFamily: { sans: ['"Roboto FlexVariable"'], serif: ['"Roboto Serif"'], mono: ['"Roboto Mono"'] } },
  },
  plugins: [require("@tailwindcss/typography")],
}

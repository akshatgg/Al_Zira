/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: { '500': '5'}, // This will scale the element by a factor of 5 },
      colors: {
        'custom-login': '',
        'custom-signup': ''
      },
      screens: {
        xsm: '480px', // Define the width you want for the xsm breakpoint
      },
    },
  },
  plugins: [

  ],
}


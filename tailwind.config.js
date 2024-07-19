/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        '50vh': '50vh',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.border-gradient': {
          
          'border-image': 'linear-gradient(to right, #06b6d4, #3b82f6) 1',
        },
        
      })
    },
  ],
}


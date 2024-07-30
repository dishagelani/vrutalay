/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        '50vh': '50vh',
      },
      maxHeight : {
        '25vh' : '25vh',
        
      },
      boxShadow: {
        'custom': '0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15)',
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


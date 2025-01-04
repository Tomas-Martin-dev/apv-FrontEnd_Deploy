/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      screens: {
        // breakpoints personalizados para pantallas grandes
        '3xl': '1780px',  // Pantallas de 1780px o más
        '4xl': '1920px',  // Pantallas de 1920px o más
        'landscape': {'raw': '(orientation: landscape)'},
        'small-height': { 'raw': '(max-height: 500px)' }, 
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.box-reflect-below': {
          '-webkit-box-reflect': 'below -900px linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
        },
        '.box-reflect-above': {
          '-webkit-box-reflect': 'above 0px linear-gradient(to top, transparent, rgba(0,0,0,0.2))',
        },
        '.box-reflect-right': {
          '-webkit-box-reflect': 'right 0px linear-gradient(to right, transparent, rgba(0,0,0,0.2))',
        },
        '.box-reflect-left': {
          '-webkit-box-reflect': 'left 0px linear-gradient(to left, transparent, rgba(0,0,0,0.2))',
        },
      });
    },
  ],
}


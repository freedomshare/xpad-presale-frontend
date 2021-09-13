module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'xpad-grad': `linear-gradient(180deg, #CCCCCC 0%, #E7E7E7 60%, #CCCCCC 100%)`,
        'xpad-an-grad': `linear-gradient(350deg, #CCCCCC 0%, #D6D6D6 22%, #E7E7E7 50%, #CCCCCC 100%)`
      }),
      fontSize: {
        'tiniest': '.5rem',
        'tiny': '.625rem'
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      flex: {
        '2': '2 2 0%'
      },
      gridTemplateColumns: {
        'poolTxnSm': '13rem 1fr',
        'poolTxnLg': '2fr 1fr 1fr'
      }
    },

  },
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [],
}

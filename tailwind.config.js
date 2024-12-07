/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '275px': '275px',
      },
      colors: {
        primary: {
          DEFAULT: '#fe6f00',
          hover: '#ff8534',
        },
        'primary-transparent': 'rgba(254, 111, 0, 0.25)',
      },
      animation: {
        'bounce-delayed': 'bounce 1s infinite 200ms',
        'bounce-delayed-2': 'bounce 1s infinite 400ms',
        'fadeIn': 'fadeIn 0.3s ease-in',
        'fadeOut': 'fadeOut 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-in',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        }
      },
      maxHeight: {
        40: '10rem', // New max height for expanded menus
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            maxWidth: 'none',
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ul > li': {
              marginTop: '0.25em',
              marginBottom: '0.25em',
              paddingLeft: '0.375em',
            },
            'ol > li': {
              marginTop: '0.25em',
              marginBottom: '0.25em',
              paddingLeft: '0.375em',
            },
            strong: {
              color: 'inherit',
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.hover'),
              },
            },
            code: {
              color: theme('colors.gray.800'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25em',
              paddingRight: '0.25em',
              paddingTop: '0.125em',
              paddingBottom: '0.125em',
              borderRadius: '0.25em',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.100'),
            strong: {
              color: 'inherit',
            },
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.gray.200'),
              },
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

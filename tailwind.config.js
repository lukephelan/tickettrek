/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'dark-blue': '#222831',
        'mid-blue': '#1f456e',
        'blue': '#385170',
        'light-blue': '#5C6978',
        'mid-blue-green': '#0f5646',
        'dark-green': '#0b3d2e',
        'green': '#9fd3c7',
        'torquoise': '#9fd3c7',
        'gray-blue': '#393e46',
        'light-green': '#b0e0d9',
        'light-gray': '#ececec'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      },
    },
  },
  plugins: [],
};


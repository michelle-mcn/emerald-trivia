/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-new': 'ping 1s cubic-bezier(0, 0, 0.2, 1) normal forwards',
      },
      keyframes: {
        "pulse-slow": {
          '75%, 100%': {transform: 'scale(2)',opacity: '0',}
        },
        "pulse-new": {
          '75%, 100%': {transform: 'scale(2)',opacity: '0',}
        }
      }
    },
  },
  plugins: [],
}
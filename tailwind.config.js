/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hotpot: {
          red: '#FF4757',
          orange: '#FFA502',
          yellow: '#FFC048',
          green: '#2ED573',
          darkBg: '#12131A',
          darkCard: '#1E202C',
          darkBorder: '#2E3245'
        }
      },
      boxShadow: {
        'cartoon': '0 4px 0 #2A2D34',
        'cartoon-lg': '0 6px 0 #2A2D34',
        'cartoon-press': '0 1px 0 #2A2D34',
        'cartoon-glow': '0 0 15px rgba(46, 213, 115, 0.5)',
      },
      keyframes: {
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' }
        },
        'bubble': {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-20px) scale(1.2)', opacity: '0' }
        }
      },
      animation: {
        'bounce-slight': 'bounce-slight 2s infinite ease-in-out',
        'pulse-glow': 'pulse-glow 1.2s infinite ease-in-out',
        'bubble': 'bubble 2s infinite ease-out'
      }
    },
  },
  plugins: [],
}

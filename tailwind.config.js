/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        macos: {
          red: '#FF5F57',
          yellow: '#FFBD2E',
          green: '#28C840',
          blue: '#007AFF',
          purple: '#BF5AF2',
          teal: '#32ADE6',
        },
        dark: {
          bg: '#1c1c1e',
          surface: '#2c2c2e',
          elevated: '#3a3a3c',
          border: '#48484a',
          text: '#f2f2f7',
          muted: '#8e8e93',
        },
        light: {
          bg: '#f5f5f7',
          surface: '#ffffff',
          elevated: '#f2f2f7',
          border: '#d1d1d6',
          text: '#1d1d1f',
          muted: '#6e6e73',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'window': '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
        'window-light': '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        'dock': '0 8px 32px rgba(0,0,0,0.4)',
        'dock-light': '0 8px 32px rgba(0,0,0,0.15)',
      },
      animation: {
        'boot-logo': 'bootLogo 1s ease-out forwards',
        'boot-bar': 'bootBar 2s ease-in-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        bootLogo: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bootBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

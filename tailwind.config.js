/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        qapp: {
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-light': '#EFF6FF',
          gray: '#6B7280',
          'gray-light': '#F3F4F6',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 20px rgba(37,99,235,0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'number-pop': {
          '0%': { transform: 'scale(0.85)', opacity: '0.5' },
          '60%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'number-pop': 'number-pop 0.45s ease-out',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
    },
  },
  plugins: [],
}

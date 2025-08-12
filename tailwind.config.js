/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#111827',
          900: '#000000',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#581c87',
        },
        blue: {
          900: '#1e3a8a',
        },
        indigo: {
          900: '#312e81',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        'sm': '2px',
      },
    },
  },
  plugins: [],
}


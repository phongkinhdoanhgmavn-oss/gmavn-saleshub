/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#eb7c16',
          blue: '#0a2540',
          light: '#f8fafc',
          accent: '#ff9d42',
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 71, 171, 0.1), 0 4px 6px -2px rgba(0, 71, 171, 0.05)',
        'glow': '0 0 20px rgba(235, 124, 22, 0.2)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}


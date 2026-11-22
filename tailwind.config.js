/** Bảng màu lấy theo bộ nhận diện GMA (Học viện Trí tuệ Thiên tài) */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cam: { DEFAULT: '#eb7c16', dark: '#b85a07', soft: '#fdebd3' },
        nau: { DEFAULT: '#8b5a36', soft: '#b08968' },
        cara: '#6b4226',
        kem: { DEFAULT: '#f9f4ec', deep: '#f1e7d8' },
        pas: '#fbc278',
        ok: '#12a150',
        bad: '#e5243b',
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(107,66,38,.06), 0 4px 16px rgba(107,66,38,.06)',
        pop: '0 12px 40px rgba(107,66,38,.22)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
};

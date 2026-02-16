module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#1C1B1B',
        white: '#F8F8F8',
        gray: '#E9E9E9',
      },
      fontFamily: {
        gilroy: ['var(--font-gilroy)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '11': '88px',
        '12': '96px',
        'container': '40px',
        'gap': '20px',
      },
      maxWidth: {
        'container': '1920px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gap: {
        'grid': '20px',
      },
    },
  },
  plugins: [],
}
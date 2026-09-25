const path = require('path');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#fbbf24',
        success: '#10b981',
        danger: '#ef4444'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    },
  },
  plugins: [],
};

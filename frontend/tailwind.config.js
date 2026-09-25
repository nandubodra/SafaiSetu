module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#fbbf24',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b'
      }
    }
  },
  plugins: []
};

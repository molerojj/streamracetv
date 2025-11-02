module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-purple': 'linear-gradient(to right, #3C00FF, #170063ff)',
      },
      colors: {
        'custom-blue': '#3C00FF',
        'custom-red': '#FF0000',
      }
    },
  },
  plugins: [],
}
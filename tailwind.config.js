/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,md}', './.bundle.js'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#0ea5e9',
        ternary: '#f5e50b',
        text: '#333',
        background: '#fff',
        info: '#3498db',
        success: '#07bc0c',
        warning: '#f39c12',
        danger: '#e74c3c',
      },
      spacing: {
        128: '32rem', // Example custom spacing
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

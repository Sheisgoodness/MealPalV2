/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'foodbg': "url('./src/assets/images/foodbg.jpg')",
      }, 
      
      keyframes: {
        'custom-ping': {
          '50%, 100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
      animation: {
        'animate-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 2',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js,ts}",
    "./netlify/functions/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "ivana-dark": "#0f1419",
        "ivana-black": "#1a1a1a",
        "ivana-gold": "#d4af37",
        "ivana-green": "#228b22",
        "ivana-red": "#dc143c",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        bounce: "bounce 2s infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        glow: {
          "0%": {
            "box-shadow": "0 0 20px rgba(212, 175, 55, 0.3)",
          },
          "100%": {
            "box-shadow":
              "0 0 30px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.3)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-200% 0",
          },
          "100%": {
            "background-position": "200% 0",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

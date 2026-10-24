import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ere Perez inspired palette
        primary: {
          DEFAULT: "#212326",
          light: "#3a3d42",
          dark: "#141517",
        },
        accent: {
          DEFAULT: "#c9a574",
          light: "#d9bd95",
          dark: "#a9875a",
        },
        cream: {
          DEFAULT: "#faf8f5",
          light: "#fdfcfa",
          dark: "#f0ede8",
        },
        muted: {
          DEFAULT: "#6b6b6b",
          light: "#9a9a9a",
          dark: "#4a4a4a",
        },
        bg: {
          DEFAULT: "#ffffff",
          warm: "#faf8f5",
          dark: "#141517",
        },
      },
      fontFamily: {
        serif: ['var(--font-frank-ruhl-libre)', 'Georgia', 'serif'],
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'site': '1280px',
        'narrow': '720px',
        'wide': '1600px',
      },
      letterSpacing: {
        'wider-2': '0.08em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

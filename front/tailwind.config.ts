import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        primary: "#181F47",
        secondary: "#FFFFFF",
        tertiary: "#1E1E1E",
        quaternary: "#1962FF",
      },
      backgroundImage: {
        "gradient-navbar": "linear-gradient(to bottom, #181f47 0%, #10194b 100%)",
        "gradient-banner": "linear-gradient(to bottom, #10194b 0%, #283875 100%)",
      },
      fontFamily: {
        fontPrimary: ["Montserrat", "sans-serif"],
        fontSecondary: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        h1: "3rem",
        h2: "2rem",
        h3: "1.75rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

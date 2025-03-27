import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#181F47',
                secondary: '#FFFFFF',
                tertiary: '#1E1E1E',
                quaternary: '#1962FF',
            },
            fontFamily: {
                fontPrimary: ['Montserrat', 'sans-serif'],
                fontSecondary: ['Open Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
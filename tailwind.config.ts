import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                industrial: {
                    50: "#f6f7f8",
                    100: "#e5e7eb",
                    200: "#d1d5db",
                    300: "#9ca3af",
                    400: "#6b7280",
                    500: "#4b5563",
                    600: "#374151",
                    700: "#1f2937",
                    800: "#111827",
                    900: "#030712",
                },
                safety: {
                    DEFAULT: "#FF5733",
                    dark: "#E64A19",
                    light: "#FF8A65",
                },
                deep: {
                    DEFAULT: "#1E3A5F",
                    dark: "#152A45",
                    light: "#2C5282",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
                montserrat: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;

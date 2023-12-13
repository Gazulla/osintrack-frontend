/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0388fc",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#00ad6e",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#e04a4a",
              foreground: "#ffffff",
            },
            focus: "#2e55a3",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#0388fc",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#00ad6e",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#e04a4a",
              foreground: "#ffffff",
            },
            focus: "#2e55a3",
          },
        },
      },
    }),
  ],
};

// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Site publié sur GitHub Pages : https://commaboo.github.io/Projet_Portfolio/
export default defineConfig({
    site: "https://commaboo.github.io",
    base: "/Projet_Portfolio/",
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
    },
});

// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Site publié sur GitHub Pages : https://commaboo.github.io/Projet_Portfolio/
export default defineConfig({
    site: "https://commaboo.github.io",
    base: "/Projet_Portfolio/",
    integrations: [react()],
    // Espaces à la manière du HTML : un retour à la ligne entre un texte et une balise reste un espace
    // (le mode "jsx" par défaut les supprime : « aventures<span>encapsulées</span>en »).
    compressHTML: true,
    vite: {
        plugins: [tailwindcss()],
    },
});

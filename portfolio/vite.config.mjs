/* =========================================================
   VITE — compile les « îlots » React du portfolio
   Le site reste en HTML classique : Vite produit seulement
   src/js/dist/projects-app.js, chargé par projects.html.
   ========================================================= */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],

    // Le dossier public/ du site est déjà référencé tel quel : Vite ne doit pas le copier.
    publicDir: false,

    build: {
        outDir: "src/js/dist",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                "projects-app": resolve(import.meta.dirname, "src/react/projects/main.jsx"),
            },
            output: {
                // Nom fixe (sans hash) pour pouvoir l'écrire en dur dans le HTML.
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name].js",
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
});

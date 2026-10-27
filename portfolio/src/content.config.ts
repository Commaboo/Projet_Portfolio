/* =========================================================
   CONTENU DU SITE — collections Astro
   Les données vivent dans src/content/ ; ce schéma les vérifie au build :
   un champ manquant ou mal écrit fait échouer « npm run build » avec un message clair.
   ========================================================= */

import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
    loader: file("src/content/projects.yaml"),
    schema: z.object({
        title: z.string(),
        order: z.number(), // position sur l'accueil et dans le registre
        status: z.string(), // texte affiché, ex. « ✓ Terminé »
        statusType: z.enum(["completed", "in-progress"]),
        period: z.string(),
        description: z.string(),
        journey: z.string(),
        technologies: z.array(z.string()),
        skills: z.array(z.string()),
        image: z.string().nullable().optional(),
        previewUrl: z.string().optional(), // relatif à la base du site
        github: z.string().url().nullable(),

        // Carte affichée sur la page d'accueil
        home: z.object({
            theme: z.enum(["ember", "arcane", "sage", "parchment"]), // classes magic-theme-* de components.css
            rune: z.string(),
            period: z.string(),
            summary: z.string(),
            link: z.string(), // relatif à la base du site
            linkLabel: z.string(),
        }),
    }),
});

export const collections = { projects };

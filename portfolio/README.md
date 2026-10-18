# Portfolio — Brandon Chhoeum

Portfolio personnel d'un étudiant en informatique (EPITECH Toulouse), construit avec **Astro, Tailwind CSS et JavaScript**, avec une identité visuelle inspirée de la fantasy et du jeu de rôle. Les parties les plus interactives sont des « îlots » **React**.

## Pages

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `src/pages/index.astro` | Présentation, aperçu des projets, accès aux sections |
| À propos | `src/pages/about.astro` | Parcours, compétences, centres d'intérêt |
| Projets | `src/pages/projects.astro` | Bureau de mage interactif : registre, parchemin, glisser-déposer |
| Rôle & Fairies | `src/pages/wip.astro` | Projet D&D en cours : fonctionnalités, progression, roadmap |
| Contact | `src/pages/contact.astro` | E-mail, réseaux, CV PDF, formulaire (Formspree) |
| CV interactif | `src/pages/projet/resume.astro` | Projet « CV interactif » |

## Structure

```text
portfolio/
├── astro.config.mjs  site, base (/Projet_Portfolio/), React, Tailwind
├── public/           copié tel quel dans dist/
│   ├── documents/    CV_CHHOEUM_Brandon.pdf
│   ├── icons/        favicon-32.png, apple-touch-icon.png, spellbook (1).png
│   ├── images/       bg_hero_index.webp (utilisée), bg_hero_index.jpg (originale)
│   └── robots.txt / sitemap.xml
├── src/
│   ├── layouts/      BaseLayout.astro (<head>, SEO, thème, main.js)
│   ├── components/   Nav.astro (navigation principale)
│   ├── pages/        une page .astro = une URL (index, about, projects, wip, contact, projet/resume)
│   ├── styles/       global.css (Tailwind) + components.css, une feuille par page
│   ├── scripts/      main.js (thème, menu mobile, apparitions), about.js, contact.js, wip.js, resume.js
│   └── react/
│       └── projects/ bureau du mage en React (data.js + composants)
├── tests/            run-tests.mjs (tests automatisés sur dist/)
└── ../.github/workflows/deploy.yml   déploiement GitHub Pages
```

## Installation et lancement

```bash
npm install
npm run dev      # http://localhost:4321/Projet_Portfolio/ avec rechargement à chaud
```

## Build

```bash
npm run build    # génère le site statique dans dist/
npm run preview  # sert dist/ pour vérifier le build
```

> Les liens internes passent par `import.meta.env.BASE_URL` (ex. `` href={`${base}about/`} ``) pour fonctionner sous `/Projet_Portfolio/`.

## Tests

```bash
npm install --save-dev puppeteer   # une seule fois
npm test
```

Le script construit le site, le sert depuis `dist/` et vérifie : absence d'erreur JavaScript et de 404, IDs uniques, un seul `<h1>` et une hiérarchie de titres correcte, balises SEO (title, meta description, Open Graph, favicon, URL canonique), navigation desktop, bouton de thème, menu mobile, absence de défilement horizontal à 375 px, scénario complet de la page Projets, validation du formulaire, CV PDF non vide et liens internes.

Audit Lighthouse : `npm run preview` puis `npx lighthouse http://localhost:4321/Projet_Portfolio/ --view`.

## Déploiement

Le workflow `.github/workflows/deploy.yml` lance `npm run build` et publie `dist/` sur **GitHub Pages** à chaque push sur `main`.
Activation : *Settings → Pages → Source : GitHub Actions*.

## Choix techniques

- **Tailwind CSS v4 (utility-first)** : grande liberté graphique et responsive rapide ; les composants répétés (boutons, badges, cartes, navigation) sont regroupés dans `components.css` avec `@apply`. Tailwind est branché via `@tailwindcss/vite`.
- **JavaScript sans framework** pour les fonctionnalités communes (thème, menu mobile, apparitions) et les pages simples.
- **Astro** : pages statiques, layout et navigation partagés (fini le `<head>` copié dans chaque fichier), CSS et JS regroupés et minifiés au build.
- **React en « îlots »** : seul `<ProjectsDesk client:load />` dans la page Projets est hydraté côté client ; il est aussi pré-rendu en HTML au build. Un état unique (`selectedId`, `registryOpen`, `detail`) pilote l'affichage.
- **Ajouter un îlot React** : importer le composant dans la page `.astro` et l'utiliser avec une directive `client:*` (`client:load`, `client:visible`…).
- **Thème sombre** : classe `dark` sur `<html>`, appliquée dans le `<head>` avant l'affichage pour éviter un flash clair, choix mémorisé dans `localStorage`.
- **Image d'en-tête en WebP** (116 Ko au lieu de 1,16 Mo en JPEG), préchargée en priorité.
- **Formulaire** : traité par Formspree, le site restant 100 % front-end.
- **Polices système (Georgia)** : aucun téléchargement de police.

## Crédits

- Photo d'en-tête : [Jozsef Mihalyi sur Pexels](https://www.pexels.com/photo/rocky-landscape-with-a-mountain-stream-and-clouds-15575235/).
- Icône grimoire (`spellbook (1).png`) : *à compléter (auteur, source, licence)*.

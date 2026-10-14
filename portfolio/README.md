# Portfolio — Brandon Chhoeum

Portfolio personnel d'un étudiant en informatique (EPITECH Toulouse), construit en **HTML, Tailwind CSS et JavaScript**, avec une identité visuelle inspirée de la fantasy et du jeu de rôle.

## Pages

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Présentation, aperçu des projets, accès aux sections |
| À propos | `src/pages/about.html` | Parcours, compétences, centres d'intérêt |
| Projets | `src/pages/projects.html` | Bureau de mage interactif : registre, parchemin, glisser-déposer |
| Rôle & Fairies | `src/pages/wip.html` | Projet D&D en cours : fonctionnalités, progression, roadmap |
| Contact | `src/pages/contact.html` | E-mail, réseaux, CV PDF, formulaire (Formspree) |
| CV interactif | `src/projet/resume/resume.html` | Projet « CV interactif » |

## Structure

```text
portfolio/
├── index.html
├── robots.txt / sitemap.xml
├── public/
│   ├── documents/    CV_CHHOEUM_Brandon.pdf
│   ├── icons/        favicon-32.png, apple-touch-icon.png, spellbook (1).png
│   └── images/       bg_hero_index.webp (utilisée), bg_hero_index.jpg (originale)
├── src/
│   ├── css/          input.css + components.css → output.css (généré par Tailwind)
│   │                 about.css, contact.css, projects.css, wip.css (une feuille par page)
│   ├── js/           main.js (thème, menu mobile, apparitions), about.js, contact.js, projects.js, wip.js
│   ├── pages/        about, contact, projects, wip
│   └── projet/resume CV interactif
├── tests/            run-tests.mjs (tests automatisés)
└── .github/workflows/deploy.yml   déploiement GitHub Pages
```

## Installation et lancement

```bash
npm install
npm run dev      # recompile output.css à chaque modification
npm run serve    # sert le site sur http://localhost:8080
```

> `src/css/output.css` est **généré** par Tailwind : ne pas le modifier à la main. Les styles communs se modifient dans `components.css`, ceux d'une page dans sa propre feuille.

## Build

```bash
npm run build    # output.css minifié
```

## Tests

```bash
npm install --save-dev puppeteer   # une seule fois
npm test
```

Le script lance son propre petit serveur et vérifie : absence d'erreur JavaScript et de 404, IDs uniques, un seul `<h1>` et une hiérarchie de titres correcte, balises SEO (title, meta description, Open Graph, favicon), navigation desktop, bouton de thème, menu mobile, absence de défilement horizontal à 375 px, scénario complet de la page Projets, validation du formulaire, CV PDF non vide et liens internes.

Audit Lighthouse : `npx lighthouse http://localhost:8080 --view` (ou onglet Lighthouse des DevTools de Chrome).

## Déploiement

Le workflow `.github/workflows/deploy.yml` compile le CSS et publie le site sur **GitHub Pages** à chaque push sur `main`.
Activation : *Settings → Pages → Source : GitHub Actions*.

Après le premier déploiement, remplacer l'adresse provisoire `https://commaboo.github.io/portfolio/` dans `robots.txt` et `sitemap.xml` par l'adresse réelle du site.

## Choix techniques

- **Tailwind CSS v4 (utility-first)** : grande liberté graphique et responsive rapide ; les composants répétés (boutons, badges, cartes, navigation) sont regroupés dans `components.css` avec `@apply`.
- **JavaScript sans framework** : suffisant pour la V1 (thème, menu, modales, registre de projets) et conforme au périmètre du cahier des charges. React, Astro et Three.js sont prévus pour les versions suivantes.
- **Thème sombre** : classe `dark` sur `<html>`, appliquée dans le `<head>` avant l'affichage pour éviter un flash clair, choix mémorisé dans `localStorage`.
- **Image d'en-tête en WebP** (116 Ko au lieu de 1,16 Mo en JPEG), préchargée en priorité.
- **Formulaire** : traité par Formspree, le site restant 100 % front-end.
- **Polices système (Georgia)** : aucun téléchargement de police.

## Crédits

- Photo d'en-tête : [Jozsef Mihalyi sur Pexels](https://www.pexels.com/photo/rocky-landscape-with-a-mountain-stream-and-clouds-15575235/).
- Icône grimoire (`spellbook (1).png`) : *à compléter (auteur, source, licence)*.

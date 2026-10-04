# BentoTheMoon

Site vitrine statique en français pour un réparateur informatique.

- Sources publiques dans `src/`, sortie générée dans `dist/` (ne pas la committer).
- HTML sémantique et CSS responsive ; JavaScript uniquement si nécessaire.
- Direction artistique néo-rétro : crème, corail, vert pâle, rose, bordures sombres et ombres décalées. Illustration CSS sans ressource externe.
- Conserver les chemins relatifs pour fonctionner sous `/BentoTheMoon/` sur GitHub Pages.
- Aucun framework ni dépendance sans besoin concret.
- Ne pas inventer de coordonnées, tarifs, avis clients, garanties ou zone d'intervention.
- Maintenir l'accessibilité : clavier, focus visible, contrastes, titres cohérents.
- Lancer `npm run build` après une modification et vérifier l'affichage pour les changements visuels.
- Le workflow vérifie les pull requests ; seul `main` est déployé.
- Ne jamais placer de secrets dans `src/` : tout son contenu est public.
- Avant chaque commit et publication, vérifier tous les fichiers suivis, les changements et l'historique Git destiné au push pour détecter secrets, jetons, clés privées, mots de passe et données personnelles non destinées à être publiques. Le dépôt GitHub lui-même est public, pas seulement `src/`.
- Contrôler aussi `dist/`, l'artefact GitHub Pages et les fichiers réellement servis après déploiement. Publier uniquement les fichiers nécessaires au site ; exclure configurations locales, fichiers `.env`, journaux et sauvegardes.
- Utiliser l'adresse GitHub `noreply` pour les auteurs et commiteurs ; ne pas publier d'adresse e-mail privée dans l'historique.
- Si une donnée sensible est détectée, arrêter la publication, retirer la donnée et révoquer tout secret déjà exposé. Ne jamais recopier sa valeur dans les sorties, commits ou rapports.

Commandes et procédure GitHub : voir `README.md`.

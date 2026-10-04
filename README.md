# BentoTheMoon

Socle du site vitrine de BentoTheMoon, réparateur informatique. HTML/CSS statique, sans dépendance. La page actuelle est une page d'attente ; les services et coordonnées restent à fournir.

## Développement

Node.js 24 ou supérieur. `npm ci --ignore-scripts` installe les outils de contrôle, sans ajouter de dépendance au site public.

```sh
npm run dev      # http://127.0.0.1:4321
npm run check    # HTML et existence des liens locaux
npm run build    # vérification puis copie de src/ vers dist/
npm run preview  # aperçu de dist/ après construction
npx playwright install chromium # installation initiale du navigateur de test
npm run test:site # accessibilité, clavier, liens et responsive (après build)
```

`PORT` permet de changer le port. Le serveur écoute uniquement sur la machine locale.

Si npm n'est pas accessible, les scripts fonctionnent directement avec Node :

```sh
node scripts/serve.mjs
node scripts/check.mjs
node scripts/build.mjs
node scripts/serve.mjs dist
```

Direction artistique : néo-rétro, fond crème, corail, vert pâle et rose, typographie massive, contours sombres et ombres décalées. L'ordinateur est dessiné en CSS ; aucune police ni image distante n'est chargée.

## Structure

- `src/` : fichiers publics, avec chemins relatifs pour GitHub Pages.
- `scripts/` : vérification, construction et aperçu en Node.js natif.
- `.github/workflows/pages.yml` : vérification des PR et déploiement de `main`.
- `AGENTS.md` : consignes de contribution et de travail avec les agents.
- `dist/` : sortie générée, ignorée par Git.

## Première publication sur GitHub

Depuis ce dossier, après connexion avec `gh auth login` :

```sh
git add .
git commit -m "Initialize BentoTheMoon static site"
gh repo create BentoTheMoon --public --source=. --remote=origin
```

Dans le dépôt GitHub, ouvrir **Settings → Pages → Build and deployment → Source → GitHub Actions** avant le premier push. Puis :

```sh
git push -u origin main
gh run list
```

Si le dépôt existe déjà, utiliser `git remote add origin URL_DU_DEPOT` à la place de `gh repo create`. Le workflow publie uniquement `dist/`. Les pull requests vérifient le site sans déployer. L'URL publiée figure dans le job de déploiement et dans Settings → Pages.

Référence : [workflows personnalisés GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Prochaines étapes

Définir les services, la zone d'intervention, les coordonnées, l'identité visuelle et les informations légales avant de construire le site complet. Ajouter un domaine personnalisé seulement lorsqu'il est connu.

## Qualité et sécurité GitHub

Dependabot propose chaque semaine les mises à jour des GitHub Actions et des outils de test. Le job `Qualité du site` construit le site et contrôle les liens, les ressources, l'accessibilité automatique, la navigation clavier et l'absence de débordement horizontal sur ordinateur et mobile. Les contrôles automatiques ne remplacent pas une revue visuelle et humaine de l'accessibilité.

La branche `main` exige une pull request et le contrôle de qualité réussi avant fusion ; les pushs forcés et suppressions sont interdits. Aucun avis d'un second contributeur n'est imposé pour permettre le travail en solo. La détection des secrets et la protection des pushs sont activées sur GitHub ; les données personnelles restent à vérifier selon `AGENTS.md`.

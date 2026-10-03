# Ligne — Ibra, tailleur sur mesure

**Site vitrine de démonstration.** Ibra est une marque fictive : l’atelier,
les noms, les chiffres et les avis sont inventés pour montrer le design.

**En ligne :** https://primeyami47-ui.github.io/ligne/ — [English](https://primeyami47-ui.github.io/ligne/en/) · [العربية](https://primeyami47-ui.github.io/ligne/ar/)

## Le design

« Ligne » tient en un geste : un fil rouge, au sens propre. Fond blanc,
texte noir, une seule couleur — le rouge du fil. Une seule famille de
caractères (Schibsted Grotesk), de très grands titres serrés, des filets
fins à la place des cartes, beaucoup de blanc.

- **Le fil traverse toute la page.** Il part d’une pelote dans le hero,
  au milieu des noms de tissus, puis se démêle à mesure qu’on descend :
  il longe l’index de l’atelier, passe par chaque numéro des étapes (qui se
  remplit de rouge quand il l’atteint), traverse la section noire du
  rendez-vous et finit en point de couture final à côté de « Passez à
  l’atelier ». Le tracé est un seul chemin SVG, recalculé à chaque
  changement de mise en page, et dessiné au rythme du défilement.
- **L’atelier en index** : cinq très grandes lignes numérotées. Au survol,
  un échantillon de tissu (rayure tennis, popeline, prince-de-galles,
  chevron, laine chinée — tous tissés en CSS) suit le curseur.
- Des chiffres qui comptent, des avis présentés comme un registre, un menu
  mobile tout en typographie.
- Tout s’arrête proprement avec « réduire les animations ».

## Ce qui la distingue

- **Un choix de tissus** : six échantillons tissés en CSS, avec leur fiche
  (composition, poids, usages).
- **Un mètre de couturière** pour les chiffres, chacun avec son épingle rouge.
- **Un rendez-vous qui se compose** : pièce, jour, heure, puis un courriel
  déjà rédigé dans la langue de la page.
- Des photos réelles qui suivent le curseur dans l’index de l’atelier.
- Le fil rouge est **retourné** en arabe : il passe du côté opposé et la
  coche finale s’incline dans l’autre sens.

Photos (Unsplash, licence Unsplash) : Logan Weaver (costume), Nimble Made
(chemises), Mélanie Villeneuve (mariage), Taras Chernus (manteau), Elio
Santos (retouches).

## Trois langues

Français à la racine, anglais sous `/en/`, arabe (de droite à gauche) sous `/ar/`, chaque version prérendue. Les textes vivent dans `src/content/{fr,en,ar}.ts`. Le sélecteur de langue est un vrai lien : chaque langue arrive avec sa police et son sens de lecture, sans scintillement. En arabe, le nom de la marque est écrit en arabe.

## Technique

Vite + React 19 + TypeScript. Le fil est calculé en JavaScript (courbe de
Catmull-Rom passant par des « nœuds » posés dans la page avec
`data-knot`). La page est **prérendue en HTML statique** puis reprise par
React (hydratation).

```bash
npm install
npm run dev      # http://localhost:5173/ligne/
npm run build    # vérification des types, bundle et prérendu dans dist/
npm run lint
```

Chaque push sur `main` publie le site sur GitHub Pages
(`.github/workflows/pages.yml`).

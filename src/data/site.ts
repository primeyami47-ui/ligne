/* Contenu de la vitrine « Ligne » : Ibra, atelier fictif de tailleur sur
   mesure à Tanger. Tout ce que les pages affichent vient d'ici ; les
   composants restent purement visuels. Noms, chiffres et avis sont inventés. */

export const company = {
  name: 'Ibra',
  tagline: 'Tailleur sur mesure',
  email: 'atelier@ibra.example',
  address: ['Boulevard Pasteur', 'Tanger — Maroc'],
  hours: 'Essayages du mardi au samedi, sur rendez-vous',
  since: 2009,
} as const

/** Les tissus, en vrac autour de la pelote du hero. */
export const fabrics = ['Laine 120’s', 'Lin d’Irlande', 'Flanelle', 'Tweed', 'Cachemire', 'Popeline', 'Mohair', 'Velours']

/* ---------------------------------------------------------------- pièces -- */

export interface Piece { id: string; n: string; title: string; short: string }

export const pieces: Piece[] = [
  { id: 'costume', n: '01', title: 'Costume sur mesure',
    short: 'Entièrement entoilé, coupé et cousu main pour une seule silhouette : la vôtre.' },
  { id: 'chemise', n: '02', title: 'Chemises',
    short: 'Un patron à vos mesures, puis autant de chemises que vous voulez, dans une centaine de cotons.' },
  { id: 'mariage', n: '03', title: 'Mariage',
    short: 'Le costume du marié, du témoin, ou la djellaba de cérémonie, prêts pour le jour J.' },
  { id: 'manteau', n: '04', title: 'Manteaux',
    short: 'Pardessus, caban et trench, dans des laines qui tiennent vingt hivers.' },
  { id: 'retouche', n: '05', title: 'Retouches de maître',
    short: 'Votre veste préférée remise à votre taille, sans que personne ne voie la reprise.' },
]

/* ---------------------------------------------------------------- étapes -- */

export const phases = [
  { n: '01', label: 'Prise de mesures', duration: '1 heure',
    title: 'Trente mesures, et une conversation',
    body: 'Votre carrure, votre posture, la façon dont vous portez vos clés : on mesure, puis on écoute comment vous vivez dans vos vêtements.',
    deliverable: 'Votre patron personnel, conservé à l’atelier' },
  { n: '02', label: 'Choix du tissu', duration: 'le même jour',
    title: 'Des centaines de liasses sur la table',
    body: 'Laines anglaises, lins, flanelles : on choisit ensemble le tissu, la doublure, les boutons et chaque détail de coupe.',
    deliverable: 'Une fiche de commande détaillée, au prix ferme' },
  { n: '03', label: 'Essayages', duration: '2 essayages',
    title: 'Le vêtement se règle sur vous',
    body: 'Un premier essayage en toile bâtie, un second presque fini. À chaque fois, le tailleur reprend la ligne là où elle doit tomber.',
    deliverable: 'Ajustements notés sur votre patron' },
  { n: '04', label: 'Livraison', duration: '6 semaines environ',
    title: 'Un dernier coup de fer, et c’est à vous',
    body: 'Pressé, contrôlé point par point, livré sur cintre. Les retouches de la première année sont offertes.',
    deliverable: 'Retouches offertes pendant un an' },
]

/* ---------------------------------------------------------------- preuves -- */

/** Maisons et clients (inventés) qui habillent leurs équipes chez Ibra. */
export const partners = ['Hôtel Continental Bay', 'Cap Spartel Golf', 'Orchestre de Tanger', 'Café Hafa Club', 'Galerie Kasbah', 'Maison Achakar']

export const figures: { value: number; unit?: string; label: string }[] = [
  { value: 17, label: 'ans d’atelier à Tanger' },
  { value: 30, label: 'mesures prises pour un costume' },
  { value: 2, label: 'essayages, toujours' },
  { value: 6, label: 'tailleurs et apprentis dans l’atelier' },
]

export const testimonials = [
  { quote: 'Le premier costume qui ne tire nulle part. Je ne savais pas qu’un vêtement pouvait se faire oublier à ce point.',
    name: 'Karim', role: 'Avocat · costume en flanelle' },
  { quote: 'Ils ont refait le costume de mariage de mon grand-père à ma taille, en gardant le tissu d’origine.',
    name: 'Omar', role: 'Marié en juin' },
  { quote: 'Mes chemises tombent enfin aux épaules. J’en recommande trois chaque printemps, sans repasser les mesures.',
    name: 'Leïla', role: 'Architecte · chemises sur mesure' },
]

export const quiz = {
  title: 'Que voulez-vous faire tailler ?',
  choices: ['Un costume', 'Des chemises', 'Une tenue de mariage', 'Un manteau', 'Une retouche'],
}

/* ------------------------------------------------------------------- seo -- */

export const seo = {
  home: {
    title: 'Tailleur sur mesure à Tanger',
    description:
      'Costumes, chemises, manteaux et tenues de mariage cousus main à Tanger. Trente mesures, deux essayages, livraison en six semaines et retouches offertes pendant un an.',
  },
  notFound: {
    title: 'Page introuvable',
    description: "Cette page n'existe pas ou a été déplacée.",
  },
} as const

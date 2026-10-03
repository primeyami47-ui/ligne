/* Contenu de la vitrine « Ligne » : Ibra, atelier fictif de tailleur sur
   mesure à Tanger. Tout ce que la page affiche vient d'ici ; en.ts et ar.ts
   reprennent exactement la même forme. Noms, chiffres et avis sont inventés ;
   les photos viennent d'Unsplash (voir le README). */

const fr = {
  company: {
    name: 'Ibra',
    tagline: 'tailleur',
    email: 'atelier@ibra.example',
    address: ['Boulevard Pasteur', 'Tanger — Maroc'],
    hours: 'Essayages du mardi au samedi, sur rendez-vous',
    since: 2009,
    city: 'Tanger',
  },

  ui: {
    skip: 'Aller au contenu',
    home: 'accueil',
    navLabel: 'Navigation principale',
    menuLabel: 'Menu',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    menuWord: 'Menu',
    closeWord: 'Fermer',
    langLabel: 'Langue',
    cta: 'Rendez-vous',
    ctaLong: 'Prendre rendez-vous',
  },

  nav: [
    { to: '#atelier', label: 'Atelier' },
    { to: '#etapes', label: 'Étapes' },
    { to: '#avis', label: 'Avis' },
    { to: '#contact', label: 'Contact' },
  ],

  hero: {
    proofA: 'Coupé et cousu main',
    proofB: 'Tanger, depuis {year}',
    line1: 'Du fil',
    line2: 'à vous.',
    lead: 'Laine, lin, flanelle, cachemire… Ibra prend trente mesures, deux essayages et six semaines pour faire d’une pelote de fil un vêtement qui ne tombe bien que sur vous.',
    cta: 'Prendre rendez-vous',
    alt: 'Voir l’atelier',
    note: 'Première prise de mesures offerte',
  },

  pieces: {
    eyebrow: '01 — L’atelier',
    title: ['Cinq pièces.', 'Une seule paire de mains.'],
    hint: 'Survolez une ligne pour voir la pièce.',
    list: [
      { id: 'costume', n: '01', title: 'Costume sur mesure', short: 'Entièrement entoilé, coupé et cousu main pour une seule silhouette : la vôtre.', alt: 'Veste à carreaux dans une boutique de tailleur' },
      { id: 'chemise', n: '02', title: 'Chemises', short: 'Un patron à vos mesures, puis autant de chemises que vous voulez, dans une centaine de cotons.', alt: 'Chemises sur cintres' },
      { id: 'mariage', n: '03', title: 'Mariage', short: 'Le costume du marié, du témoin, ou la djellaba de cérémonie, prêts pour le jour J.', alt: 'Une boutonnière épinglée sur un revers' },
      { id: 'manteau', n: '04', title: 'Manteaux', short: 'Pardessus, caban et trench, dans des laines qui tiennent vingt hivers.', alt: 'Manteau camel' },
      { id: 'retouche', n: '05', title: 'Retouches de maître', short: 'Votre veste préférée remise à votre taille, sans que personne ne voie la reprise.', alt: 'Des mains qui cousent à l’aiguille' },
    ],
  },

  fabrics: {
    eyebrow: '02 — Les tissus',
    title: ['Touchez', 'avant de choisir.'],
    lead: 'Six tissus parmi les centaines de liasses de l’atelier. Choisissez-en un : voici ce qu’il fait de mieux.',
    names: ['Laine 120’s', 'Lin d’Irlande', 'Flanelle', 'Tweed', 'Cachemire', 'Popeline', 'Mohair', 'Velours'],
    compLabel: 'Composition',
    weightLabel: 'Poids',
    forLabel: 'On en fait',
    list: [
      { id: 'laine', name: 'Laine 120’s', comp: '100 % laine mérinos', weight: '260 g/m²', use: 'Costumes de ville, toute l’année' },
      { id: 'lin', name: 'Lin d’Irlande', comp: '100 % lin', weight: '190 g/m²', use: 'Costumes d’été, mariages en plein air' },
      { id: 'flanelle', name: 'Flanelle', comp: 'Laine peignée', weight: '340 g/m²', use: 'Costumes d’hiver, gilets' },
      { id: 'tweed', name: 'Tweed', comp: 'Laine cardée', weight: '420 g/m²', use: 'Vestes, manteaux, tenues de campagne' },
      { id: 'cachemire', name: 'Cachemire', comp: '100 % cachemire', weight: '300 g/m²', use: 'Pardessus, écharpes' },
      { id: 'popeline', name: 'Popeline', comp: '100 % coton', weight: '110 g/m²', use: 'Chemises' },
    ],
  },

  steps: {
    eyebrow: '03 — Les étapes',
    title: ['Quatre étapes.', 'Un seul fil.'],
    lead: 'Le même chemin pour un costume, une chemise ou un manteau. Le fil rouge passe par chaque étape.',
    receive: 'Vous repartez avec —',
    more: 'Commencer par les mesures',
    phases: [
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
    ],
  },

  tape: {
    eyebrow: 'Les chiffres, au centimètre',
    figures: [
      { value: 17, unit: '', label: 'ans d’atelier à Tanger' },
      { value: 30, unit: '', label: 'mesures prises pour un costume' },
      { value: 2, unit: '', label: 'essayages, toujours' },
      { value: 6, unit: '', label: 'tailleurs et apprentis dans l’atelier' },
    ],
  },

  fitting: {
    eyebrow: '04 — Rendez-vous',
    title: 'On commence quand ?',
    lead: 'Composez votre essayage : une pièce, un jour, une heure. Nous confirmons par retour de courrier, et la première prise de mesures est offerte.',
    pieceLabel: 'Quelle pièce ?',
    dayLabel: 'Quel jour ?',
    timeLabel: 'À quelle heure ?',
    days: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    times: ['10 h', '14 h', '17 h'],
    summary: '{piece} · {day} à {time}',
    pick: 'Choisissez une pièce, un jour et une heure.',
    cta: 'Demander ce créneau',
    mailSubject: 'Demande d’essayage — {piece}',
    mailBody: 'Bonjour, je souhaiterais un rendez-vous pour : {piece}, le {day} à {time}. Merci de me confirmer.',
  },

  reviews: {
    eyebrow: '05 — Avis',
    title: ['Des vêtements portés,', 'un par un.'],
    list: [
      { quote: 'Le premier costume qui ne tire nulle part. Je ne savais pas qu’un vêtement pouvait se faire oublier à ce point.',
        name: 'Karim', role: 'Avocat · costume en flanelle' },
      { quote: 'Ils ont refait le costume de mariage de mon grand-père à ma taille, en gardant le tissu d’origine.',
        name: 'Omar', role: 'Marié en juin' },
      { quote: 'Mes chemises tombent enfin aux épaules. J’en recommande trois chaque printemps, sans repasser les mesures.',
        name: 'Leïla', role: 'Architecte · chemises sur mesure' },
    ],
  },

  close: {
    title: ['Passez à', 'l’atelier.'],
    lead: 'Écrivez-nous : le tailleur vous répond sous 48 heures et vous propose un créneau d’essayage.',
    cta: 'Écrire un message',
  },

  footer: {
    line1: 'Du fil',
    line2: 'à vous.',
    about: 'Atelier de tailleur à Tanger : costumes, chemises, manteaux et tenues de mariage, coupés et cousus main.',
    colAtelier: 'L’atelier',
    colHouse: 'La maison',
    house: [
      { to: '#etapes', label: 'Les étapes' },
      { to: '#avis', label: 'Avis de clients' },
      { to: '#rdv', label: 'Prendre rendez-vous' },
      { to: '#contact', label: 'Nous écrire' },
    ],
    colContact: 'Contact',
    demo: 'Marque fictive · site vitrine de démonstration',
  },

  notFound: {
    eyebrow: 'Erreur 404',
    title: 'Le fil s’est rompu : cette page n’existe pas.',
    lead: 'Elle a peut-être été déplacée.',
    cta: 'Retour à l’accueil',
  },

  error: {
    title: 'Une erreur est survenue',
    lead: 'Rechargez la page. Si le problème persiste, écrivez-nous à',
    reload: 'Recharger la page',
  },

  seo: {
    home: {
      title: 'Tailleur sur mesure à Tanger',
      description: 'Costumes, chemises, manteaux et tenues de mariage cousus main à Tanger. Trente mesures, deux essayages, livraison en six semaines et retouches offertes pendant un an.',
    },
    notFound: { title: 'Page introuvable', description: 'Cette page n’existe pas ou a été déplacée.' },
  },
}

export type Content = typeof fr
export default fr

import type { Content } from './fr'

const en: Content = {
  company: {
    name: 'Ibra',
    tagline: 'tailor',
    email: 'studio@ibra.example',
    address: ['Boulevard Pasteur', 'Tangier — Morocco'],
    hours: 'Fittings Tuesday to Saturday, by appointment',
    since: 2009,
    city: 'Tangier',
  },

  ui: {
    skip: 'Skip to content',
    home: 'home',
    navLabel: 'Main navigation',
    menuLabel: 'Menu',
    menuOpen: 'Open the menu',
    menuClose: 'Close the menu',
    menuWord: 'Menu',
    closeWord: 'Close',
    langLabel: 'Language',
    cta: 'Appointment',
    ctaLong: 'Book an appointment',
  },

  nav: [
    { to: '#atelier', label: 'Studio' },
    { to: '#etapes', label: 'Steps' },
    { to: '#avis', label: 'Reviews' },
    { to: '#contact', label: 'Contact' },
  ],

  hero: {
    proofA: 'Cut and sewn by hand',
    proofB: 'Tangier, since {year}',
    line1: 'From thread',
    line2: 'to you.',
    lead: 'Wool, linen, flannel, cashmere… Ibra takes thirty measurements, two fittings and six weeks to turn a ball of thread into a garment that only hangs well on you.',
    cta: 'Book an appointment',
    alt: 'See the studio',
    note: 'First measuring session free',
  },

  pieces: {
    eyebrow: '01 — The studio',
    title: ['Five pieces.', 'One pair of hands.'],
    hint: 'Hover a line to see the piece.',
    list: [
      { id: 'costume', n: '01', title: 'Made-to-measure suit', short: 'Fully canvassed, cut and sewn by hand for a single silhouette: yours.', alt: 'Checked jacket in a tailor’s shop' },
      { id: 'chemise', n: '02', title: 'Shirts', short: 'A pattern drawn to your measurements, then as many shirts as you like, in a hundred cottons.', alt: 'Shirts on hangers' },
      { id: 'mariage', n: '03', title: 'Wedding', short: 'The groom’s suit, the best man’s, or the ceremonial djellaba, ready for the big day.', alt: 'A buttonhole flower being pinned to a lapel' },
      { id: 'manteau', n: '04', title: 'Coats', short: 'Overcoats, pea coats and trench coats, in wools that last twenty winters.', alt: 'Camel coat' },
      { id: 'retouche', n: '05', title: 'Master alterations', short: 'Your favourite jacket brought back to your size, without anyone seeing the repair.', alt: 'Hands sewing with a needle' },
    ],
  },

  fabrics: {
    eyebrow: '02 — The fabrics',
    title: ['Touch', 'before you choose.'],
    lead: 'Six fabrics out of the hundreds of bolts in the studio. Pick one: here is what it does best.',
    names: ['Wool 120’s', 'Irish linen', 'Flannel', 'Tweed', 'Cashmere', 'Poplin', 'Mohair', 'Velvet'],
    compLabel: 'Composition',
    weightLabel: 'Weight',
    forLabel: 'We make',
    list: [
      { id: 'laine', name: 'Wool 120’s', comp: '100% merino wool', weight: '260 g/m²', use: 'Town suits, all year round' },
      { id: 'lin', name: 'Irish linen', comp: '100% linen', weight: '190 g/m²', use: 'Summer suits, outdoor weddings' },
      { id: 'flanelle', name: 'Flannel', comp: 'Worsted wool', weight: '340 g/m²', use: 'Winter suits, waistcoats' },
      { id: 'tweed', name: 'Tweed', comp: 'Woollen-spun wool', weight: '420 g/m²', use: 'Jackets, coats, country wear' },
      { id: 'cachemire', name: 'Cashmere', comp: '100% cashmere', weight: '300 g/m²', use: 'Overcoats, scarves' },
      { id: 'popeline', name: 'Poplin', comp: '100% cotton', weight: '110 g/m²', use: 'Shirts' },
    ],
  },

  steps: {
    eyebrow: '03 — The steps',
    title: ['Four steps.', 'One thread.'],
    lead: 'The same path for a suit, a shirt or a coat. The red thread runs through every step.',
    receive: 'You leave with —',
    more: 'Start with the measurements',
    phases: [
      { n: '01', label: 'Measuring', duration: '1 hour',
        title: 'Thirty measurements, and a conversation',
        body: 'Your shoulders, your posture, the way you carry your keys: we measure, then we listen to how you live in your clothes.',
        deliverable: 'Your personal pattern, kept at the studio' },
      { n: '02', label: 'Choosing the cloth', duration: 'the same day',
        title: 'Hundreds of bolts on the table',
        body: 'English wools, linens, flannels: together we choose the cloth, the lining, the buttons and every detail of the cut.',
        deliverable: 'A detailed order sheet, at a fixed price' },
      { n: '03', label: 'Fittings', duration: '2 fittings',
        title: 'The garment is adjusted on you',
        body: 'A first fitting in basted cloth, a second almost finished. Each time, the tailor redraws the line where it should fall.',
        deliverable: 'Adjustments noted on your pattern' },
      { n: '04', label: 'Delivery', duration: 'about 6 weeks',
        title: 'One last press, and it’s yours',
        body: 'Pressed, checked stitch by stitch, delivered on a hanger. Alterations in the first year are free.',
        deliverable: 'Free alterations for a year' },
    ],
  },

  tape: {
    eyebrow: 'The numbers, to the centimetre',
    figures: [
      { value: 17, unit: '', label: 'years of studio in Tangier' },
      { value: 30, unit: '', label: 'measurements taken for a suit' },
      { value: 2, unit: '', label: 'fittings, always' },
      { value: 6, unit: '', label: 'tailors and apprentices in the studio' },
    ],
  },

  fitting: {
    eyebrow: '04 — Appointment',
    title: 'When do we start?',
    lead: 'Compose your fitting: a piece, a day, a time. We confirm by return mail, and the first measuring session is free.',
    pieceLabel: 'Which piece?',
    dayLabel: 'Which day?',
    timeLabel: 'What time?',
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    times: ['10 am', '2 pm', '5 pm'],
    summary: '{piece} · {day} at {time}',
    pick: 'Choose a piece, a day and a time.',
    cta: 'Request this slot',
    mailSubject: 'Fitting request — {piece}',
    mailBody: 'Hello, I would like an appointment for: {piece}, on {day} at {time}. Please confirm.',
  },

  reviews: {
    eyebrow: '05 — Reviews',
    title: ['Garments worn,', 'one by one.'],
    list: [
      { quote: 'The first suit that doesn’t pull anywhere. I didn’t know a garment could make you forget it so completely.',
        name: 'Karim', role: 'Lawyer · flannel suit' },
      { quote: 'They remade my grandfather’s wedding suit to my size, keeping the original cloth.',
        name: 'Omar', role: 'Married in June' },
      { quote: 'My shirts finally fall from the shoulders. I order three every spring, without redoing the measurements.',
        name: 'Leïla', role: 'Architect · made-to-measure shirts' },
    ],
  },

  close: {
    title: ['Come by', 'the studio.'],
    lead: 'Write to us: the tailor replies within 48 hours and suggests a fitting slot.',
    cta: 'Send a message',
  },

  footer: {
    line1: 'From thread',
    line2: 'to you.',
    about: 'Tailor’s studio in Tangier: suits, shirts, coats and wedding outfits, cut and sewn by hand.',
    colAtelier: 'The studio',
    colHouse: 'The house',
    house: [
      { to: '#etapes', label: 'The steps' },
      { to: '#avis', label: 'Customer reviews' },
      { to: '#rdv', label: 'Book an appointment' },
      { to: '#contact', label: 'Write to us' },
    ],
    colContact: 'Contact',
    demo: 'Fictional brand · demo showcase site',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'The thread has snapped: this page doesn’t exist.',
    lead: 'It may have been moved.',
    cta: 'Back to the home page',
  },

  error: {
    title: 'Something went wrong',
    lead: 'Reload the page. If the problem persists, write to us at',
    reload: 'Reload the page',
  },

  seo: {
    home: {
      title: 'Made-to-measure tailor in Tangier',
      description: 'Suits, shirts, coats and wedding outfits sewn by hand in Tangier. Thirty measurements, two fittings, delivery in six weeks and free alterations for a year.',
    },
    notFound: { title: 'Page not found', description: 'This page doesn’t exist or has moved.' },
  },
}

export default en

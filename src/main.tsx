import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Police auto-hébergée : pas d'appel à Google Fonts (vitesse, et aucune
// donnée de visite transmise à un tiers). Une seule famille, Schibsted
// Grotesk, de la graisse 400 à 900.
import '@fontsource-variable/schibsted-grotesk'
// Arabe : IBM Plex Sans Arabic, un grotesque sobre qui accompagne bien le
// Schibsted Grotesk latin.
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import 'lenis/dist/lenis.css'
import './styles/tokens.css'
import App from './App'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
const root = document.getElementById('root')!
// Page prérendue pour cette adresse : React reprend le HTML existant au lieu
// de le reconstruire (sinon le hero est réinséré et ses animations
// rejouent). Sinon (développement, page 404) : rendu complet.
const path = (p: string) => p.replace(/\/+$/, '') || '/'
if (root.dataset.route && path(root.dataset.route) === path(location.pathname)) hydrateRoot(root, app)
else createRoot(root).render(app)

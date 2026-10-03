import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import type Lenis from 'lenis'
import { company, pieces } from '../data/site'
import { Arrow } from './Reveal'
import Logo from './Logo'
import './Layout.css'

// Quatre destinations, numérotées comme les sections d'un rapport.
const nav = [
  { to: '#atelier', label: 'Atelier' },
  { to: '#etapes', label: 'Étapes' },
  { to: '#avis', label: 'Avis' },
  { to: '#contact', label: 'Contact' },
]

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Layout() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lenis = useRef<Lenis | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Défilement doux (Lenis) cadencé par GSAP ; au doigt, Lenis laisse le
  // défilement natif du téléphone. Coupé avec « réduire les animations ».
  useEffect(() => {
    if (reduced()) return
    let stop = () => {}
    let cancelled = false
    ;(async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const l = new LenisCtor({ lerp: 0.1, anchors: true })
      l.on('scroll', ScrollTrigger.update)
      const tick = (t: number) => l.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      lenis.current = l
      stop = () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null }
    })()
    return () => { cancelled = true; stop() }
  }, [])

  useEffect(() => {
    if (!open) return
    lenis.current?.stop()
    document.documentElement.classList.add('menu-open')
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis.current?.start()
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>

      <header className={`hdr${stuck ? ' hdr--stuck' : ''}${open ? ' hdr--open' : ''}`}>
        <div className="hdr__in wrap">
          <Link to="/" className="hdr__brand" aria-label={`${company.name}, accueil`} onClick={() => setOpen(false)}>
            <Logo size={40} draw />
          </Link>

          <nav className="hdr__nav" aria-label="Navigation principale">
            {nav.map((n, i) => (
              <a key={n.to} href={n.to} className="hdr__link">
                <span className="hdr__n t-num">0{i + 1}</span>{n.label}
              </a>
            ))}
          </nav>

          <a href="#rdv" className="btn btn--primary hdr__cta">
            Rendez-vous <Arrow />
          </a>

          <button className="hdr__burger" aria-expanded={open} aria-controls="menu"
                  aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                  onClick={() => setOpen((v) => !v)}>
            <span>{open ? 'Fermer' : 'Menu'}</span>
          </button>
        </div>
      </header>

      {/* Menu mobile : blanc, de très grands mots, un filet rouge sous la page active. */}
      <div id="menu" ref={menuRef} className={`menu${open ? ' is-open' : ''}`} inert={!open}>
        <nav className="menu__nav wrap" aria-label="Menu">
          {nav.map((n, i) => (
            <a key={n.to} href={n.to} onClick={() => setOpen(false)}
               style={{ ['--i' as string]: i }} className="menu__link">
              <span className="menu__n t-num">0{i + 1}</span><span className="menu__label">{n.label}</span>
            </a>
          ))}
          <a href="#rdv" onClick={() => setOpen(false)} className="btn btn--sun menu__cta" style={{ ['--i' as string]: 4 }}>
            Prendre rendez-vous <Arrow />
          </a>
          <div className="menu__contact" style={{ ['--i' as string]: 5 }}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.hours}</span>
          </div>
        </nav>
      </div>

      <main id="main"><Outlet /></main>

      <footer className="ftr">
        <div className="wrap ftr__top">
          <p className="ftr__line">Du fil<br /><span>à vous.</span></p>
          <a href="#rdv" className="btn btn--sun">Prendre rendez-vous <Arrow /></a>
        </div>

        <div className="wrap ftr__in">
          <div className="ftr__brand">
            <Logo tone="white" size={44} />
            <p>
              Atelier de tailleur à Tanger : costumes, chemises, manteaux et
              tenues de mariage, coupés et cousus main.
            </p>
          </div>

          <div className="ftr__col">
            <h2>L’atelier</h2>
            {pieces.map((p) => <a key={p.id} href="#atelier">{p.title}</a>)}
          </div>

          <div className="ftr__col">
            <h2>La maison</h2>
            <a href="#etapes">Les étapes</a>
            <a href="#avis">Avis de clients</a>
            <a href="#rdv">Prendre rendez-vous</a>
            <a href="#contact">Nous écrire</a>
          </div>

          <div className="ftr__col">
            <h2>Contact</h2>
            <address>{company.address.map((l) => <span key={l}>{l}</span>)}</address>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.hours}</span>
          </div>
        </div>

        <div className="wrap ftr__bar">
          <span>© {new Date().getFullYear()} {company.name} · Tanger</span>
          <span className="ftr__demo">Marque fictive · site vitrine de démonstration</span>
        </div>
      </footer>
    </>
  )
}

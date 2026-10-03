import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useContent } from '../content'
import { LOCALES, useLang } from '../i18n'
import { Arrow } from './Reveal'
import './Ligne.css'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ================================================================ le fil ===
   Un seul tracé SVG, de la pelote du hero jusqu'à la coche finale. Il passe
   par des « nœuds » : tout élément marqué data-knot="fx,fy" (position
   relative dans l'élément, 0 → 1), et data-knot-m pour le téléphone. Le
   tracé est recalculé quand la mise en page change, puis dessiné au rythme
   du défilement. Un nœud atteint reçoit la classe is-reached. */

type Pt = [number, number]

/* La pelote : une suite de boucles irrégulières mais déterministes. */
function tangle([cx, cy]: Pt, s: number): Pt[] {
  const pts: Pt[] = []
  const loops = 6
  for (let i = 0; i <= loops * 16; i++) {
    const t = (i / 16) * Math.PI * 2
    const k = i / (loops * 16)
    const rx = s * (0.55 + 0.35 * Math.sin(t * 0.37 + 1.3))
    const ry = s * (0.42 + 0.3 * Math.cos(t * 0.53))
    pts.push([cx + rx * Math.cos(t + k * 2.1) + s * 0.25 * Math.sin(k * 9), cy + ry * Math.sin(t * 1.07) + s * 0.18 * Math.cos(k * 7)])
  }
  return pts
}

/* Catmull-Rom → Bézier : une courbe souple qui passe exactement par chaque point. */
function smooth(pts: Pt[], tension = 1): string {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6 * tension, p1[1] + (p2[1] - p0[1]) / 6 * tension]
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6 * tension, p2[1] - (p3[1] - p1[1]) / 6 * tension]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export function Thread({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  const pen = useRef<SVGCircleElement>(null)
  const [box, setBox] = useState({ w: 0, h: 0, d: '', tb: 0 })
  // Instant de départ du dessin de la pelote : fixé une fois, pour que les
  // recalculs (images chargées, fenêtre redimensionnée) ne le rejouent pas.
  const introT0 = useRef(0)
  const geo = useRef<{ len: number; ys: number[]; ls: number[]; knots: { el: Element; at: number }[]; intro: number }>({ len: 0, ys: [], ls: [], knots: [], intro: 0 })

  // 1. Construire le tracé depuis la position des nœuds.
  useEffect(() => {
    const el = host.current
    if (!el) return
    const build = () => {
      const r0 = el.getBoundingClientRect()
      const phone = window.innerWidth < 760
      // De droite à gauche, la mise en page se retourne : le fil passe côté
      // opposé, et la coche finale s'incline dans l'autre sens.
      const rtl = document.documentElement.dir === 'rtl'
      const dir = rtl ? -1 : 1
      const knots = [...el.querySelectorAll<HTMLElement>('[data-knot]')]
      const pts: Pt[] = knots.map((k) => {
        const r = k.getBoundingClientRect()
        const [fx, fy] = ((phone && k.dataset.knotM) || k.dataset.knot || '0.5,0.5').split(',').map(Number)
        return [r.left - r0.left + r.width * (rtl ? 1 - fx : fx), r.top - r0.top + r.height * fy]
      })
      if (pts.length < 2) return
      const first = knots[0].getBoundingClientRect()
      const s = Math.min(first.width, first.height) * 0.42
      const knot = tangle(pts[0], s)
      // Fin : la coche. Le dernier nœud est le creux de la coche.
      const [ex, ey] = pts[pts.length - 1]
      const c = phone ? 34 : 56
      const body = [...knot, ...pts.slice(1, -1), [ex - dir * c * 0.75, ey - c * 0.2] as Pt]
      const d = `${smooth(body)} L${ex} ${ey + c * 0.3} L${ex + dir * c * 1.25} ${ey - c * 0.95}`
      // tb : bas de la pelote, pour savoir où s'arrête le dessin automatique.
      setBox((b) => (b.d === d && b.w === r0.width && b.h === r0.height ? b : { w: r0.width, h: r0.height, d, tb: pts[0][1] + s * 1.2 }))
    }
    build()
    const ro = new ResizeObserver(() => build())
    ro.observe(el)
    document.fonts?.ready.then(build)
    return () => ro.disconnect()
  }, [])

  // 2. Mesurer le tracé et le dessiner au défilement.
  useEffect(() => {
    const p = path.current, el = host.current
    if (!p || !el || !box.d) return
    const len = p.getTotalLength()
    const ys: number[] = [], ls: number[] = []
    let maxY = -Infinity
    for (let l = 0; l <= len; l += 6) {
      maxY = Math.max(maxY, p.getPointAtLength(l).y)
      ys.push(maxY); ls.push(l)
    }
    // Longueur à laquelle le fil atteint chaque nœud (hors pelote).
    const knots = [...el.querySelectorAll('[data-knot]')].slice(1).map((k) => {
      const r = k.getBoundingClientRect(), r0 = el.getBoundingClientRect()
      const ky = r.top - r0.top + r.height / 2
      let i = ys.findIndex((y) => y >= ky)
      if (i < 0) i = ys.length - 1
      return { el: k, at: ls[i] }
    })
    // La pelote se dessine seule au chargement, jusqu'à ce que le fil en sorte.
    const out = ys.findIndex((y) => y > box.tb)
    geo.current = { len, ys, ls, knots, intro: out > 0 ? ls[out] : len * 0.1 }
    p.style.strokeDasharray = `${len}`

    let auto = reduced() ? len : 0
    let raf = 0
    const draw = () => {
      const g = geo.current
      const r0 = el.getBoundingClientRect()
      const lineY = window.innerHeight * 0.62 - r0.top
      // Recherche dichotomique : dernier échantillon au-dessus de la ligne de lecture.
      let lo = 0, hi = g.ys.length - 1
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (g.ys[m] <= lineY) lo = m; else hi = m - 1 }
      const drawn = Math.max(auto, g.ys[0] <= lineY ? g.ls[lo] : 0)
      p.style.strokeDashoffset = `${Math.max(0, g.len - drawn)}`
      const tip = p.getPointAtLength(Math.min(drawn, g.len))
      pen.current?.setAttribute('cx', tip.x.toFixed(1))
      pen.current?.setAttribute('cy', tip.y.toFixed(1))
      g.knots.forEach((k) => k.el.classList.toggle('is-reached', drawn >= k.at - 2))
      el.classList.toggle('is-done', drawn >= g.len - 2)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) }

    // La pelote se dessine d'elle-même au chargement.
    let introRaf = 0
    if (!reduced()) {
      if (!introT0.current) introT0.current = performance.now()
      const t0 = introT0.current
      const step = (t: number) => {
        const k = Math.min(1, Math.max(0, (t - t0) / 2600))
        auto = geo.current.intro * (1 - Math.pow(1 - k, 3))
        draw()
        if (k < 1) introRaf = requestAnimationFrame(step)
      }
      introRaf = requestAnimationFrame(step)
    }
    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf); cancelAnimationFrame(introRaf)
    }
  }, [box])

  return (
    <div className="thread-host" ref={host}>
      {children}
      <svg className="thread" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
        <path ref={path} d={box.d} className="thread__path" style={{ strokeDasharray: '100000', strokeDashoffset: '100000' }} />
        <circle ref={pen} r="6" className="thread__pen" cx="-20" cy="-20" />
      </svg>
    </div>
  )
}

/* ============================================================ index ===
   Les cinq pièces de l'atelier en index : de très grandes lignes
   numérotées. Sur ordinateur, un échantillon du tissu de la pièce survolée
   suit le curseur. */

const PHOTO_SIZE: Record<string, [number, number]> = {
  costume: [640, 960], chemise: [640, 427], mariage: [640, 424], manteau: [640, 960], retouche: [640, 427],
}

export function ServiceIndex() {
  const t = useContent().pieces
  const pieces = t.list
  const [on, setOn] = useState(-1)
  const float = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const f = float.current
    if (!f || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14
      f.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="sidx" onMouseLeave={() => setOn(-1)}>
      <ol className="sidx__list">
        {pieces.map((e, i) => (
          <li key={e.id} className={`sidx__row${on === i ? ' is-on' : ''}`} onMouseEnter={() => setOn(i)}>
            <a href="#contact" className="sidx__in" onFocus={() => setOn(i)} onBlur={() => setOn(-1)}>
              <span className="sidx__n t-num">{e.n}</span>
              <span className="sidx__title">{e.title}</span>
              <span className="sidx__short">{e.short}</span>
              <span className="sidx__go" aria-hidden="true"><Arrow /></span>
            </a>
          </li>
        ))}
      </ol>
      <div className="sidx__float" ref={float} aria-hidden="true">
        {pieces.map((e, i) => (
          <img key={e.id} src={`${import.meta.env.BASE_URL}img/${e.id}.webp`} alt="" width={PHOTO_SIZE[e.id][0]} height={PHOTO_SIZE[e.id][1]}
               className={on === i ? "is-on" : ""} />
        ))}
      </div>
    </div>
  )
}

/* ============================================================ étapes ===
   Quatre étapes en quinconce ; le fil passe par chaque numéro, qui se
   remplit de rouge quand le fil l'atteint. */

export function Steps() {
  const t = useContent().steps
  return (
    <ol className="steps">
      {t.phases.map((ph) => (
        <li key={ph.n} className="step">
          <span className="step__dot t-num" data-knot="0.5,0.5" data-knot-m="0.5,0.5">{ph.n}</span>
          <div className="step__body">
            <p className="step__label">{ph.label}</p>
            <h3 className="t-h3">{ph.title}</h3>
            <p className="step__text">{ph.body}</p>
            <p className="step__deliv"><span>{t.receive}</span> {ph.deliverable}</p>
            <span className="step__weeks">{ph.duration}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ================================================================ tissus ===
   Six tissus à toucher. On en choisit un : l'échantillon (tissé en CSS) et
   sa fiche (composition, poids, usages) changent. */

export function FabricPicker() {
  const t = useContent().fabrics
  const [i, setI] = useState(0)
  const f = t.list[i]
  return (
    <div className="fab">
      <div className="fab__tabs" role="radiogroup" aria-label={t.eyebrow}>
        {t.list.map((x, k) => (
          <button key={x.id} type="button" role="radio" aria-checked={k === i} className={`fab__tab${k === i ? ' is-on' : ''}`} onClick={() => setI(k)}>
            <span className={`fab__chip fab--${x.id}`} aria-hidden="true" />{x.name}
          </button>
        ))}
      </div>
      <div className="fab__card" key={f.id}>
        <div className={`fab__swatch fab--${f.id}`} aria-hidden="true" />
        <div className="fab__sheet">
          <h3 className="fab__name">{f.name}</h3>
          <dl className="fab__rows">
            <div><dt>{t.compLabel}</dt><dd>{f.comp}</dd></div>
            <div><dt>{t.weightLabel}</dt><dd>{f.weight}</dd></div>
            <div><dt>{t.forLabel}</dt><dd>{f.use}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}

/* ================================================================ chiffres ===
   Un mètre de couturière : les quatre chiffres sont des repères sur le ruban,
   chacun avec son épingle rouge. */

function Count({ to, locale }: { to: number; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (reduced() || el.getBoundingClientRect().top < window.innerHeight) return
    setN(0)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref}>{n.toLocaleString(locale)}</span>
}

export function Tape() {
  const t = useContent().tape
  const locale = LOCALES[useLang()]
  return (
    <div className="tape">
      <p className="tape__eyebrow">{t.eyebrow}</p>
      <div className="tape__ribbon" aria-hidden="true" />
      <ul className="tape__marks">
        {t.figures.map((f, i) => (
          <li key={f.label} className="tape__mark" style={{ '--i': i } as CSSProperties}>
            <span className="tape__pin" aria-hidden="true" />
            <span className="tape__value t-num" dir="ltr"><Count to={f.value} locale={locale} />{f.unit}</span>
            <span className="tape__label">{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ============================================================== rendez-vous ===
   Un essayage se compose : une pièce, un jour, une heure. Le bouton ouvre un
   courriel déjà rédigé. */

export function Fitting() {
  const t = useContent()
  const f = t.fitting
  const [piece, setPiece] = useState<number | null>(null)
  const [day, setDay] = useState<number | null>(null)
  const [time, setTime] = useState<number | null>(null)
  const ready = piece !== null && day !== null && time !== null
  const vars = (str: string) => str
    .replace('{piece}', piece === null ? '' : t.pieces.list[piece].title)
    .replace('{day}', day === null ? '' : f.days[day])
    .replace('{time}', time === null ? '' : f.times[time])
  const href = ready
    ? `mailto:${t.company.email}?subject=${encodeURIComponent(vars(f.mailSubject))}&body=${encodeURIComponent(vars(f.mailBody))}`
    : undefined
  const group = (label: string, items: string[], cur: number | null, set: (n: number) => void) => (
    <fieldset className="fit__group">
      <legend>{label}</legend>
      <div className="fit__opts">
        {items.map((x, k) => (
          <button key={x} type="button" aria-pressed={cur === k} className={`chip${cur === k ? ' is-on' : ''}`} onClick={() => set(k)}>{x}</button>
        ))}
      </div>
    </fieldset>
  )
  return (
    <div className="fit">
      {group(f.pieceLabel, t.pieces.list.map((p) => p.title), piece, setPiece)}
      {group(f.dayLabel, f.days, day, setDay)}
      {group(f.timeLabel, f.times, time, setTime)}
      <p className="fit__sum" aria-live="polite">{ready ? vars(f.summary) : f.pick}</p>
      <a className={`btn btn--primary fit__go${ready ? '' : ' is-off'}`} href={href} aria-disabled={!ready}
         onClick={(e) => { if (!ready) e.preventDefault() }}>{f.cta} <Arrow /></a>
    </div>
  )
}

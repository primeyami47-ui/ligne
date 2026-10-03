import Seo from '../components/Seo'
import Reveal, { Arrow } from '../components/Reveal'
import Figures from '../components/Figures'
import { ServiceIndex, Steps, Thread } from '../components/Ligne'
import { company, fabrics, partners, quiz, seo, testimonials } from '../data/site'
import './Home.css'

export default function Home() {

  return (
    <>
      <Seo {...seo.home} />

      {/* Le fil rouge : il part de la pelote du hero et traverse toute la
          page jusqu'à la coche finale. */}
      <Thread>

        {/* ---------------------------------------------------------- hero */}
        <section className="lhero">
          <div className="wrap lhero__in">
            <p className="lhero__proof t-num">
              <span>Coupé et cousu main</span>
              <span>Tanger, depuis {company.since}</span>
            </p>
            <h1 className="lhero__h">
              <span className="ln"><span>Du fil</span></span>
              <span className="ln"><span><span className="t-red">à vous.</span></span></span>
            </h1>
            <div className="lhero__knot" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true">
              {/* Les tissus, en vrac autour de la pelote. */}
              {fabrics.map((c, i) => <span key={c} className="lhero__code" style={{ ['--i' as string]: i }}>{c}</span>)}
            </div>
            <div className="lhero__side">
              <p className="lhero__lead">
                Laine, lin, flanelle, cachemire… {company.name} prend trente
                mesures, deux essayages et six semaines pour faire d’une pelote
                de fil un vêtement qui ne tombe bien que sur vous.
              </p>
              <div className="lhero__cta">
                <a href="#rdv" className="btn btn--primary">Prendre rendez-vous <Arrow /></a>
                <a href="#atelier" className="link">Voir l’atelier <Arrow /></a>
              </div>
              <p className="lhero__note">Première prise de mesures offerte</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ confiance */}
        <section className="llogos" aria-label="Ils habillent leurs équipes chez nous">
          <div className="wrap llogos__in">
            <p className="llogos__h">Ils habillent leurs équipes chez nous</p>
            <ul className="llogos__row llogos__row--names">
              {partners.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- atelier */}
        <section className="sec lsvc" id="atelier">
          <div className="wrap">
            <Reveal className="head">
              <span className="eyebrow">01 — L’atelier</span>
              <h2 className="t-h2">Cinq pièces.<br />Une seule paire de mains.</h2>
            </Reveal>
            <div data-knot="0.985,0.08" data-knot-m="0.97,0.02"><ServiceIndex /></div>
            <p className="lsvc__diag" data-knot="1,0.5" data-knot-m="0.99,1.4">
              Vous hésitez entre deux tissus&nbsp;?{' '}
              <a href="#rdv" className="link">Venez les toucher <Arrow /></a>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- étapes */}
        <section className="sec lmethod" id="etapes">
          <div className="wrap">
            <Reveal className="head head--center lmethod__head">
              <span className="eyebrow">02 — Les étapes</span>
              <h2 className="t-h2">Quatre étapes.<br />Un seul fil.</h2>
              <p className="t-lead">Le même chemin pour un costume, une chemise ou un manteau. Le fil rouge passe par chaque étape.</p>
              {/* Le fil longe le bord droit, puis revient au centre sous le titre. */}
              <span className="lknot lknot--edge" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="lknot lknot--below" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
            </Reveal>
            <Steps />
            <Reveal className="lmethod__more">
              {/* Sous la dernière étape, le fil trace un filet vers la marge gauche. */}
              <span className="lknot lknot--mid" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="lknot lknot--margin" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <a href="#rdv" className="link">Commencer par les mesures <Arrow /></a>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- rendez-vous */}
        <section className="ldiag" id="rdv">
          <div className="wrap ldiag__in">
            <Reveal className="ldiag__text">
              <span className="eyebrow ldiag__eb" data-knot="-0.06,0.5" data-knot-m="-0.08,0.5">03 — Rendez-vous</span>
              <h2 className="ldiag__h">On commence quand&nbsp;?</h2>
              <p className="t-lead">Dites-nous ce que vous voulez faire tailler&nbsp;: nous fixons une première prise de mesures, offerte.</p>
              <span className="lknot lknot--bl" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80} className="ldiag__card">
              <p className="ldiag__step"><span className="t-num">1/3</span> {quiz.title}</p>
              <div className="ldiag__chips">
                {quiz.choices.map((c) => <a key={c} href="#contact" className="chip">{c}</a>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ avis */}
        <section className="sec lproof" id="avis">
          <div className="wrap">
            <Reveal className="head lproof__head">
              <span className="lknot lknot--right" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="eyebrow">04 — Avis</span>
              <h2 className="t-h2">Des vêtements portés,<br />un par un.</h2>
            </Reveal>
            <div data-knot="0.99,0.5" data-knot-m="0.985,0.5"><Figures /></div>
            <ul className="lquotes" data-knot="0.99,1.02" data-knot-m="0.985,1.01">
              {testimonials.map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 80} className="lquote">
                  <span className="lquote__n t-num">0{i + 1}</span>
                  <blockquote>{t.quote}</blockquote>
                  <p className="lquote__who"><strong>{t.name}</strong> — {t.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- fin
            Le fil se termine ici, en coche, à droite du titre. */}
        <section className="sec lclose" id="contact">
          <div className="wrap">
            <div className="close">
              <div className="close__text">
                <h2 className="t-h2">Passez à<br />l’atelier.<span className="lclose__check" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" /></h2>
                <p className="t-lead">
                  Écrivez-nous&nbsp;: le tailleur vous répond sous 48&nbsp;heures
                  et vous propose un créneau d’essayage.
                </p>
              </div>
              <div className="close__cta">
                <a href={`mailto:${company.email}`} className="btn btn--primary">Écrire un message <Arrow /></a>
              </div>
            </div>
          </div>
        </section>
      </Thread>
    </>
  )
}

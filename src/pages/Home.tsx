import Seo from '../components/Seo'
import Reveal, { Arrow } from '../components/Reveal'
import { FabricPicker, Fitting, ServiceIndex, Steps, Tape, Thread } from '../components/Ligne'
import { useContent } from '../content'
import { useLang } from '../i18n'
import './Home.css'

export default function Home() {
  const t = useContent()
  const lang = useLang()

  return (
    <>
      <Seo {...t.seo.home} />

      {/* Le fil rouge : il part de la pelote du hero et traverse toute la
          page jusqu'à la coche finale. */}
      <Thread>
        {/* ---------------------------------------------------------- hero */}
        <section className="lhero">
          <div className="wrap lhero__in">
            <p className="lhero__proof t-num">
              <span>{t.hero.proofA}</span>
              <span>{t.hero.proofB.replace('{year}', String(t.company.since))}</span>
            </p>
            <h1 className="lhero__h">
              <span className="ln"><span>{t.hero.line1}</span></span>
              <span className="ln"><span><span className="t-red">{t.hero.line2}</span></span></span>
            </h1>
            <div className="lhero__knot" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true">
              {/* Les tissus, en vrac autour de la pelote. */}
              {t.fabrics.names.map((c, i) => <span key={c} className="lhero__code" style={{ ['--i' as string]: i }}>{c}</span>)}
            </div>
            <div className="lhero__side">
              <p className="lhero__lead">{t.hero.lead}</p>
              <div className="lhero__cta">
                <a href="#rdv" className="btn btn--primary">{t.hero.cta} <Arrow /></a>
                <a href="#atelier" className="link">{t.hero.alt} <Arrow /></a>
              </div>
              <p className="lhero__note">{t.hero.note}</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- atelier */}
        <section className="sec lsvc" id="atelier">
          <div className="wrap">
            <Reveal className="head">
              <span className="eyebrow">{t.pieces.eyebrow}</span>
              <h2 className="t-h2">{t.pieces.title[0]}<br />{t.pieces.title[1]}</h2>
            </Reveal>
            <div data-knot="0.985,0.08" data-knot-m="0.97,0.02"><ServiceIndex /></div>
            <p className="lsvc__diag" data-knot="1,0.5" data-knot-m="0.99,1.4">{t.pieces.hint}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- tissus */}
        <section className="sec lfab" id="tissus">
          <div className="wrap">
            <Reveal className="head">
              <span className="eyebrow">{t.fabrics.eyebrow}</span>
              <h2 className="t-h2">{t.fabrics.title[0]}<br />{t.fabrics.title[1]}</h2>
              <p className="t-lead">{t.fabrics.lead}</p>
            </Reveal>
            <FabricPicker />
          </div>
        </section>

        {/* ---------------------------------------------------------- étapes */}
        <section className="sec lmethod" id="etapes">
          <div className="wrap">
            <Reveal className="head head--center lmethod__head">
              <span className="eyebrow">{t.steps.eyebrow}</span>
              <h2 className="t-h2">{t.steps.title[0]}<br />{t.steps.title[1]}</h2>
              <p className="t-lead">{t.steps.lead}</p>
              {/* Le fil longe le bord, puis revient au centre sous le titre. */}
              <span className="lknot lknot--edge" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="lknot lknot--below" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
            </Reveal>
            <Steps />
            <Reveal className="lmethod__more">
              {/* Sous la dernière étape, le fil trace un filet vers la marge. */}
              <span className="lknot lknot--mid" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="lknot lknot--margin" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <a href="#rdv" className="link">{t.steps.more} <Arrow /></a>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- rendez-vous */}
        <section className="ldiag" id="rdv">
          <div className="wrap ldiag__in">
            <Reveal className="ldiag__text">
              <span className="eyebrow ldiag__eb" data-knot="-0.06,0.5" data-knot-m="-0.08,0.5">{t.fitting.eyebrow}</span>
              <h2 className="ldiag__h">{t.fitting.title}</h2>
              <p className="t-lead">{t.fitting.lead}</p>
              <span className="lknot lknot--bl" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80} className="ldiag__card"><Fitting /></Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ avis */}
        <section className="sec lproof" id="avis">
          <div className="wrap">
            <Reveal className="head lproof__head">
              <span className="lknot lknot--right" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" />
              <span className="eyebrow">{t.reviews.eyebrow}</span>
              <h2 className="t-h2">{t.reviews.title[0]}<br />{t.reviews.title[1]}</h2>
            </Reveal>
            <div data-knot="0.99,0.5" data-knot-m="0.985,0.5"><Tape /></div>
            <ul className="lquotes" data-knot="0.99,1.02" data-knot-m="0.985,1.01">
              {t.reviews.list.map((r, i) => (
                <Reveal as="li" key={r.name} delay={i * 80} className="lquote">
                  <span className="lquote__n t-num">0{i + 1}</span>
                  <blockquote>{lang === 'fr' ? `« ${r.quote} »` : lang === 'ar' ? `«${r.quote}»` : `“${r.quote}”`}</blockquote>
                  <p className="lquote__who"><strong>{r.name}</strong> — {r.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- fin
            Le fil se termine ici, en coche, à côté du titre. */}
        <section className="sec lclose" id="contact">
          <div className="wrap">
            <div className="close">
              <div className="close__text">
                <h2 className="t-h2">{t.close.title[0]}<br />{t.close.title[1]}<span className="lclose__check" data-knot="0.5,0.5" data-knot-m="0.5,0.5" aria-hidden="true" /></h2>
                <p className="t-lead">{t.close.lead}</p>
              </div>
              <div className="close__cta">
                <a href={`mailto:${t.company.email}`} className="btn btn--primary">{t.close.cta} <Arrow /></a>
              </div>
            </div>
          </div>
        </section>
      </Thread>
    </>
  )
}

/**
 * Le logo Ibra : un seul fil rouge qui fait une boucle (le nœud du fil
 * dans l'aiguille) puis se tend en point de couture final. C'est le fil
 * rouge du site, en miniature.
 *
 * Repère 64 × 44 ; trait de 5, bouts ronds.
 */
export type LogoTone = 'color' | 'reverse' | 'ink' | 'white'

const TONES: Record<LogoTone, string> = {
  color: 'var(--thread)', reverse: 'var(--thread)', ink: 'var(--ink)', white: '#fff',
}

export const TICK = 'M4 26 C10 26 14 10 23 11 C32 12 29 29 21 27 C14 25 22 15 31 24 L38 31 L60 6'

export function LogoMark({ tone = 'color', size = 40, className = '', draw = false }: {
  tone?: LogoTone; size?: number; className?: string; draw?: boolean
}) {
  return (
    <svg className={`imark${draw ? ' imark--draw' : ''} ${className}`} width={size} height={size * 44 / 64}
         viewBox="0 0 64 44" fill="none" aria-hidden="true">
      <path className="imark__tick" d={TICK} pathLength={100} stroke={TONES[tone]} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Trait + nom : « ibra » en noir, « tailleur » en gris, sur une ligne. */
export default function Logo({ tone = 'color', size = 44, className = '', draw = false }: {
  tone?: LogoTone; size?: number; className?: string; draw?: boolean
}) {
  const text = tone === 'reverse' || tone === 'white' ? '#fff' : 'var(--ink)'
  return (
    <span className={`ilogo ${className}`} style={{ color: text }}>
      <LogoMark tone={tone} size={size} draw={draw} />
      <span className="ilogo__word" aria-hidden="true">ibra <small>tailleur</small></span>
    </span>
  )
}

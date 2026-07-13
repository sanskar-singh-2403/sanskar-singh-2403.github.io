import { Reveal } from './Reveal'
import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="section-label">02 / Experience</p>
        <h2 className="section-title">
          Where I've <span className="gradient-text">shipped</span>
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.08}>
            <div className="glass-card" style={{ padding: '32px 36px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 600, display: 'inline' }}>
                    {e.company}
                  </h3>
                  <span
                    className="mono"
                    style={{ fontSize: 13, color: e.accent, marginLeft: 14, letterSpacing: '0.08em' }}
                  >
                    {e.role.toUpperCase()}
                  </span>
                </div>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em' }}>
                  {e.period}
                </span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {e.points.map((p) => (
                  <li
                    key={p}
                    style={{
                      color: 'var(--muted)',
                      fontSize: 15,
                      lineHeight: 1.75,
                      paddingLeft: 18,
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 10,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: e.accent,
                        opacity: 0.7,
                      }}
                    />
                    {p}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {e.tech.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: 11,
                      padding: '5px 12px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

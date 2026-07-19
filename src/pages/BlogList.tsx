import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { posts, formatDate } from '../blog/posts'

export default function BlogList() {
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <main>
      <section className="section" style={{ paddingTop: 180, minHeight: '100vh' }}>
        <Reveal>
          <p className="section-label">Writing</p>
          <h2 className="section-title">
            The <span className="gradient-text">blog</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.8, maxWidth: 620, marginBottom: 56 }}>
            Deep dives on the things I break and fix — systems, infrastructure, and
            the layers of the stack most people treat as magic.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sorted.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/blog/${p.slug}`} style={{ display: 'block' }}>
                <article
                  className="glass-card"
                  style={{ padding: 34, position: 'relative', overflow: 'hidden' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -60,
                      right: -60,
                      width: 180,
                      height: 180,
                      borderRadius: '50%',
                      background: p.accent,
                      opacity: 0.08,
                      filter: 'blur(40px)',
                    }}
                  />
                  <div
                    className="mono"
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.15em',
                      color: p.accent,
                      marginBottom: 14,
                      display: 'flex',
                      gap: 14,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>{formatDate(p.date).toUpperCase()}</span>
                    <span style={{ color: 'var(--muted)' }}>·</span>
                    <span style={{ color: 'var(--muted)' }}>{p.readingMinutes} MIN READ</span>
                  </div>
                  <h3 style={{ fontSize: 26, fontWeight: 600, marginBottom: 14, lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.75, maxWidth: 760 }}>
                    {p.summary}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
                    {p.tags.map((t) => (
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
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}

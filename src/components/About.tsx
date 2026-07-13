import { Reveal } from './Reveal'

const stats = [
  { value: '4+', label: 'Years shipping production systems' },
  { value: '12+', label: 'Microservices maintained' },
  { value: '∞', label: 'Curiosity for first principles' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal>
        <p className="section-label">01 / About</p>
        <h2 className="section-title">
          Engineering with <span className="gradient-text">depth</span>
        </h2>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 40,
          alignItems: 'start',
        }}
      >
        <Reveal delay={0.1}>
          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.85 }}>
            I work on enterprise data platforms by day — customer master data,
            schema-driven pipelines, search infrastructure — and rebuild the
            internet from scratch by night. I believe the best engineers are
            the ones who refuse to treat any layer of the stack as magic.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.85, marginTop: 20 }}>
            Currently deep in knowledge graphs, retrieval systems, and the
            question of how to make AI actually understand structured data.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card"
                style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 24 }}
              >
                <span
                  className="gradient-text"
                  style={{ fontSize: 36, fontWeight: 700, minWidth: 72 }}
                >
                  {s.value}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: 15 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

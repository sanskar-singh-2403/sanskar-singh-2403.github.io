import { Reveal } from './Reveal'
import { stats, achievements } from '../data'

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
            AI Engineer at TailoredAI, building multi-agent systems that
            automate hiring at Cognizant — LLM-led interviews over OpenAI
            Realtime, allocation and proposal agents, all wired together with
            MCP and tool calling. Before that at Hyperverge I owned the OCR
            service, built HyperTuring (a self-serve model training pipeline),
            and automated fleet deployments with Ansible, AMIs and AWS ASG.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.85, marginTop: 20 }}>
            I believe the best engineers refuse to treat any layer of the
            stack as magic. Currently deep in knowledge graphs, retrieval
            systems, and making AI actually understand structured data.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {achievements.map((a) => (
              <div key={a} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span className="mono" style={{ color: 'var(--cyan)', fontSize: 13 }}>▸</span>
                <span style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6 }}>{a}</span>
              </div>
            ))}
          </div>
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
                  style={{ fontSize: 36, fontWeight: 700, minWidth: 92 }}
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

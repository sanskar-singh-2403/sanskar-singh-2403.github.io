import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <p className="section-label">03 / Skills</p>
        <h2 className="section-title">
          The <span className="gradient-text">toolkit</span>
        </h2>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}
      >
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.08}>
            <div className="glass-card" style={{ padding: 28, height: '100%' }}>
              <p
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.25em',
                  color: 'var(--cyan)',
                  marginBottom: 20,
                  textTransform: 'uppercase',
                }}
              >
                {group.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 15, color: 'var(--text)' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

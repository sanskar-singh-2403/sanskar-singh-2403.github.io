import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import { projects } from '../data'

function TiltCard({
  children,
  accent,
}: {
  children: React.ReactNode
  accent: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="glass-card"
    >
      <div
        style={{
          padding: 36,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: accent,
            opacity: 0.08,
            filter: 'blur(40px)',
          }}
        />
        {children}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <p className="section-label">02 / Projects</p>
        <h2 className="section-title">
          Selected <span className="gradient-text">work</span>
        </h2>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
        }}
      >
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <TiltCard accent={p.accent}>
              <p
                className="mono"
                style={{ fontSize: 12, letterSpacing: '0.2em', color: p.accent, marginBottom: 12 }}
              >
                {String(i + 1).padStart(2, '0')} — {p.subtitle.toUpperCase()}
              </p>
              <h3 style={{ fontSize: 28, fontWeight: 600, marginBottom: 14 }}>{p.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75, flex: 1 }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
                {p.tech.map((t) => (
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
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

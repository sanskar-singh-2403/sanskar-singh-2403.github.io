import { Reveal } from './Reveal'
import { profile } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: 60 }}>
      <Reveal>
        <p className="section-label">05 / Contact</p>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          Let's build something{' '}
          <span className="gradient-text">impossible</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.8 }}>
          Open to interesting problems in data infrastructure, retrieval
          systems, and anything that requires going one layer deeper.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ display: 'flex', gap: 20, marginTop: 48, flexWrap: 'wrap' }}>
          <a
            href={`mailto:${profile.email}`}
            className="mono glass-card"
            style={{
              padding: '16px 32px',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: 'var(--cyan)',
              borderRadius: 999,
            }}
          >
            {profile.email.toUpperCase()}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mono glass-card"
            style={{
              padding: '16px 32px',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: 'var(--text)',
              borderRadius: 999,
            }}
          >
            GITHUB
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mono glass-card"
            style={{
              padding: '16px 32px',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: 'var(--text)',
              borderRadius: 999,
            }}
          >
            LINKEDIN
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="mono glass-card"
            style={{
              padding: '16px 32px',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: 'var(--magenta)',
              borderRadius: 999,
            }}
          >
            RESUME ↓
          </a>
        </div>
      </Reveal>

      <footer
        style={{
          marginTop: 140,
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
          BUILT WITH REACT · THREE.JS · GLSL · FRAMER MOTION
        </span>
      </footer>
    </section>
  )
}

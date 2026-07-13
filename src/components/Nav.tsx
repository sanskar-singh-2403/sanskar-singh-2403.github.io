import { motion } from 'framer-motion'
import { profile } from '../data'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: 'linear-gradient(180deg, rgba(5,6,10,0.75), transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <a href="#" className="mono" style={{ fontSize: 15, letterSpacing: '0.15em' }}>
        <span style={{ color: 'var(--cyan)' }}>&#9670;</span> SANSKAR<span style={{ color: 'var(--muted)' }}>.SINGH</span>
      </a>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="mono nav-link"
            style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.08em' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {l.label}
          </a>
        ))}
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{
            fontSize: 12,
            padding: '8px 18px',
            border: '1px solid rgba(180,0,255,0.45)',
            borderRadius: 999,
            color: 'var(--magenta)',
            letterSpacing: '0.1em',
          }}
        >
          RESUME
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{
            fontSize: 12,
            padding: '8px 18px',
            border: '1px solid rgba(0,240,255,0.4)',
            borderRadius: 999,
            color: 'var(--cyan)',
            letterSpacing: '0.1em',
          }}
        >
          GITHUB
        </a>
      </div>
    </motion.nav>
  )
}

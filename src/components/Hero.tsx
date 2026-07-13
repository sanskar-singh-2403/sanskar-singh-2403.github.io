import { motion } from 'framer-motion'
import { profile } from '../data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.6 } },
}

const item = {
  hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 24px',
      }}
    >
      {/* readability scrim between particles and text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-10% -20%',
          background:
            'radial-gradient(ellipse 60% 55% at 50% 48%, rgba(5,6,10,0.82) 0%, rgba(5,6,10,0.55) 45%, rgba(5,6,10,0) 75%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div variants={container} initial="hidden" animate="show" style={{ position: 'relative' }}>
        <motion.p
          variants={item}
          className="mono"
          style={{
            color: 'var(--cyan)',
            fontSize: 14,
            letterSpacing: '0.4em',
            marginBottom: 24,
          }}
        >
          [ INITIALIZING PORTFOLIO_v2.0 ]
        </motion.p>

        <motion.h1
          variants={item}
          style={{
            fontSize: 'clamp(48px, 9vw, 120px)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.6)' }}>
            {profile.name.split(' ')[0].toUpperCase()}
          </span>
          <br />
          <span
            className="gradient-text"
            style={{ filter: 'drop-shadow(0 2px 18px rgba(0,0,0,0.9))' }}
          >
            {profile.role.toUpperCase()}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          style={{
            maxWidth: 560,
            margin: '32px auto 0',
            color: 'var(--text)',
            opacity: 0.85,
            fontSize: 18,
            lineHeight: 1.7,
            textShadow: '0 1px 12px rgba(0,0,0,0.9)',
          }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          style={{ marginTop: 48, display: 'flex', gap: 20, justifyContent: 'center' }}
        >
          <a
            href="#projects"
            className="mono"
            style={{
              padding: '14px 34px',
              borderRadius: 999,
              background: 'linear-gradient(90deg, rgba(0,240,255,0.15), rgba(180,0,255,0.15))',
              border: '1px solid rgba(0,240,255,0.5)',
              color: '#fff',
              fontSize: 14,
              letterSpacing: '0.12em',
              boxShadow: '0 0 30px rgba(0,240,255,0.15)',
            }}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="mono"
            style={{
              padding: '14px 34px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontSize: 14,
              letterSpacing: '0.12em',
            }}
          >
            CONTACT
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--muted)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(180deg, var(--cyan), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

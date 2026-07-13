import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ done }: { done: boolean }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => Math.min(p + Math.random() * 14, done ? 100 : 92))
    }, 90)
    return () => clearInterval(id)
  }, [done])

  return (
    <AnimatePresence>
      {pct < 100 && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <span
            className="mono"
            style={{ fontSize: 13, letterSpacing: '0.4em', color: 'var(--cyan)' }}
          >
            LOADING UNIVERSE
          </span>
          <div
            style={{
              width: 220,
              height: 2,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
                transition: 'width 0.15s ease',
              }}
            />
          </div>
          <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            {Math.floor(pct)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

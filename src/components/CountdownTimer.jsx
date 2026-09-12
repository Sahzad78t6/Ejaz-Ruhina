import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CountdownTimer({ targetDate = '2026-11-01T19:00:00+05:30', accentColor = '#c9a84c' }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const destination = new Date(targetDate)
    const calc = () => {
      const diff = destination - new Date()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div style={{ display: 'flex', gap: 'clamp(8px,2vw,18px)', justifyContent: 'center', flexWrap: 'wrap' }}>
      {[{ v: pad(t.d), l: 'Days' }, { v: pad(t.h), l: 'Hours' }, { v: pad(t.m), l: 'Min' }, { v: pad(t.s), l: 'Sec' }].map(({ v, l }, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          style={{
            padding: '14px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${accentColor}44`,
            borderRadius: '14px',
            textAlign: 'center',
            minWidth: '66px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accentColor}15, transparent)`, pointerEvents: 'none' }} />
          <div className="cd-num shimmer-gold" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)' }}>{v}</div>
          <div className="cd-label" style={{ color: 'rgba(232, 201, 109, 0.8)', marginTop: '4px', fontSize: '0.55rem', letterSpacing: '0.2em' }}>{l}</div>
        </motion.div>
      ))}
    </div>
  )
}

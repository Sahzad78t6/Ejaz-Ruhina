import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const WEDDING = new Date('2026-03-15T10:15:00+05:30')

export default function CountdownTimer() {
  const [t, setT] = useState({d:0,h:0,m:0,s:0})

  useEffect(() => {
    const calc = () => {
      const diff = WEDDING - new Date()
      if (diff <= 0) { setT({d:0,h:0,m:0,s:0}); return }
      setT({
        d: Math.floor(diff/86400000),
        h: Math.floor(diff/3600000)%24,
        m: Math.floor(diff/60000)%60,
        s: Math.floor(diff/1000)%60,
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = n => String(n).padStart(2,'0')

  return (
    <div style={{ display:'flex', gap:'clamp(12px,3vw,32px)', justifyContent:'center', flexWrap:'wrap' }}>
      {[{v:pad(t.d),l:'Days'},{v:pad(t.h),l:'Hours'},{v:pad(t.m),l:'Min'},{v:pad(t.s),l:'Sec'}].map(({v,l},i) => (
        <motion.div
          key={l}
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          style={{
            padding:'20px 24px',
            background:'rgba(201,168,76,0.07)',
            border:'1px solid rgba(201,168,76,0.25)',
            borderRadius:'16px',
            textAlign:'center',
            minWidth:'80px',
            position:'relative',
            overflow:'hidden',
          }}
        >
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(201,168,76,0.05),transparent)',pointerEvents:'none' }} />
          <div className="cd-num shimmer-gold">{v}</div>
          <div className="cd-label" style={{ color:'rgba(201,168,76,0.6)',marginTop:'6px' }}>{l}</div>
        </motion.div>
      ))}
    </div>
  )
}

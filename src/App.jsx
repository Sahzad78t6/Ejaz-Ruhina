import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Aurora from './components/Aurora'
import Particles from './components/Particles'
import SideParticleFlow from './components/SideParticleFlow'
import SplashCursor from './components/SplashCursor'
import Silk from './components/Silk'
import BlurText, { LetterByLetter } from './components/BlurText'
import CountdownTimer from './components/CountdownTimer'
import { GoldDivider, FloralCorner, GaneshSymbol } from './components/Decorative'
import confetti from 'canvas-confetti'
import bgMusic from './love-music.mp3'

// ─── Reusable: In-view wrapper ─────────────────────────
function InView({ children, delay = 0, style }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Section wrapper ───────────────────────────────────
function Section({ id, children, style }) {
  return (
    <section id={id} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
    </section>
  )
}

// ─── Gold heading ──────────────────────────────────────
function SectionTitle({ eyebrow, title }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', color: 'rgba(168,197,172,0.8)', textTransform: 'uppercase', marginBottom: '14px' }}
      >
        {eyebrow}
      </motion.p>
      <BlurText
        text={title}
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(1.8rem,4vw,3rem)',
          fontWeight: 600,
          display: 'block',
          textAlign: 'center',
        }}
        className="shimmer-gold"
        delay={0.2}
        duration={0.8}
      />
      <InView delay={0.4}>
        <GoldDivider />
      </InView>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────
function Hero({ onEnter }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 300) }, [])

  return (
    <Section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0a06' }}>

      {/* Aurora WebGL background */}
      <Aurora
        colorStops={['#1a0d02', '#2a1800', '#051205']}
        amplitude={1.4}
        speed={0.35}
      />

      {/* Particle layer */}
      <Particles
        count={100}
        particleColors={['#c9a84c', '#e8c96d', '#a8c5ac', 'rgba(255,248,224,0.6)']}
        speed={0.3}
        connectDistance={80}
        style={{ zIndex: 1 }}
      />

      {/* 3D Scene */}
      {/* <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div> */}

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,6,2,0.7) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Floral corners */}
      {[
        { top: 16, left: 16, flip: false },
        { top: 16, right: 16, flip: true },
        { bottom: 16, left: 16, flip: false, style: { transform: 'scaleY(-1)' } },
        { bottom: 16, right: 16, flip: true, style: { transform: 'scale(-1,-1)' } },
      ].map((pos, i) => (
        <FloralCorner key={i} style={{ position: 'absolute', width: 90, opacity: 0.5, zIndex: 4, ...pos }} flip={pos.flip} />
      ))}

      {/* Centered content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Ganesh */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
        >
          <GaneshSymbol size={72} color="#c9a84c" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.7)', marginBottom: '24px' }}
        >
          The Auspicious Union of
        </motion.p>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(3.5rem,11vw,8rem)', lineHeight: 1.05, color: '#fff8e0', textShadow: '0 0 40px rgba(201,168,76,0.4)' }}
        >
          Keerthana Hari
        </motion.h1>

        {/* Connector */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '6px 0' }}
        >
          {/* <div style={{ height:'1px', width:'clamp(40px,8vw,100px)', background:'linear-gradient(to right, transparent, #c9a84c)' }} /> */}
          {/* <motion.span
            animate={{ scale:[1,1.3,1] }}
            transition={{ repeat:Infinity, duration:2.5, ease:'easeInOut' }}
            style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', filter:'drop-shadow(0 0 15px rgba(220,80,80,0.6))' }}
          >❤️</motion.span> */}
          {/* <div style={{ height:'1px', width:'clamp(40px,8vw,100px)', background:'linear-gradient(to left, transparent, #c9a84c)' }} /> */}
        </motion.div>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(3.5rem,11vw,8rem)', lineHeight: 1.05, color: '#fff8e0', textShadow: '0 0 40px rgba(201,168,76,0.4)', marginBottom: '20px' }}
        >
          Najunkishor
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.8rem,2vw,1.1rem)', color: 'rgba(201,168,76,0.8)', letterSpacing: '0.12em', marginBottom: '48px' }}
        >
          Sunday · 15<sup>th</sup> March 2026 · SNM Auditorium · Moothakunnam
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          style={{ marginBottom: '48px' }}
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          style={{
            padding: '18px 56px',
            background: 'linear-gradient(135deg,#7a5a1a,#c9a84c,#7a5a1a)',
            backgroundSize: '200% auto',
            border: '1px solid rgba(201,168,76,0.5)',
            borderRadius: '60px',
            color: '#fff8e0',
            fontFamily: "'Cinzel',serif",
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Open Invitation</span>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 0%,rgba(255,248,200,0.15) 50%,transparent 100%)', animation: 'shimmer 2s linear infinite' }} />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <div style={{ width: '24px', height: '38px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '4px', height: '8px', background: 'var(--gold)', borderRadius: '2px' }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

// ─── COUPLE ───────────────────────────────────────────
function CoupleSection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0d0a06 0%,#141006 100%)' }}>
      <Silk color="#c9a84c" speed={0.3} scale={2} noiseIntensity={1.2} />
      <Particles count={60} particleColors={['#c9a84c', '#e8c96d', 'rgba(168,197,172,0.5)']} speed={0.2} connectDistance={60} style={{ zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle eyebrow="Together Forever" title="The Blessed Union" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto', alignItems: 'center' }}>

          {/* Bride card */}
          <InView delay={0}>
            <motion.div
              className="glass-light"
              whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(201,168,76,0.15)' }}
              style={{ padding: '52px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right,transparent,#a8c5ac,transparent)' }} />
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>👰‍♀️</motion.div>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.7)', marginBottom: '12px' }}>The Bride</p>
              <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(2.2rem,5vw,3.2rem)', color: '#fff8e0', marginBottom: '16px', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}>Keerthana Hari</h2>
              <div style={{ width: '32px', height: '1px', background: '#a8c5ac', margin: '0 auto 16px' }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: 'rgba(200,180,140,0.7)', fontStyle: 'italic', lineHeight: 1.8 }}>
                Daughter of<br />Mr. Hari P. C. &amp; Mrs. Sreedevi Hari
              </p>
            </motion.div>
          </InView>

          {/* Center weds */}
          <InView delay={0.2} style={{ textAlign: 'center' }}>
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem', boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}>
                ❤️
              </div>
            </motion.div>
            <p className="shimmer-gold" style={{ fontFamily: "'Cinzel',serif", fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.2em' }}>WEDS</p>
          </InView>

          {/* Groom card */}
          <InView delay={0.3}>
            <motion.div
              className="glass-light"
              whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(201,168,76,0.15)' }}
              style={{ padding: '85px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right,transparent,#c9a84c,transparent)' }} />
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>🤵</motion.div>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.7)', marginBottom: '12px' }}>The Groom</p>
              <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(2.2rem,5vw,3.2rem)', color: '#fff8e0', marginBottom: '16px', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}>Najunkishor</h2>
              <div style={{ width: '32px', height: '1px', background: '#c9a84c', margin: '0 auto 16px' }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: 'rgba(200,180,140,0.7)', fontStyle: 'italic', lineHeight: 1.8 }}>
                Son of<br />Mr. K. K. Nalan &amp; Mrs. Sheeja Nalan
              </p>
            </motion.div>
          </InView>
        </div>
      </div>
    </Section>
  )
}

// ─── PARENTS ──────────────────────────────────────────
function ParentsSection() {
  const families = [
    {
      emoji: '🌸', label: "Bride's Family",
      parents: ['Mr. Hari P. C.', 'Mrs. Sreedevi Hari'],
      address: 'Pullarkkat House\nKottuvallikad, Moothakunnam P.O\nErnakulam',
      accent: '#a8c5ac',
    },
    {
      emoji: '🌼', label: "Groom's Family",
      parents: ['Mr. K. K. Nalan', 'Mrs. Sheeja Nalan'],
      address: 'Karappilly House\nMekkad P.O\nErnakulam',
      accent: '#c9a84c',
    },
  ]

  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#141006 0%,#0d0a06 100%)' }}>
      <Aurora colorStops={['#0a0600', '#151005', '#060c06']} amplitude={0.8} speed={0.2} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle eyebrow="With Blessings" title="Our Families" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '32px', maxWidth: '860px', margin: '0 auto' }}>
          {families.map((f, i) => (
            <InView key={f.label} delay={i * 0.15}>
              <motion.div
                className="glass-light"
                whileHover={{ y: -6 }}
                style={{ padding: '52px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right,transparent,${f.accent},transparent)` }} />
                {/* Glow orb */}
                <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle,${f.accent}22 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '20px' }}>{f.emoji}</span>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${f.accent}aa`, marginBottom: '20px' }}>{f.label}</p>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', color: `${f.accent}`, fontWeight: 600, marginBottom: '6px' }}>{f.parents[0]}</h3>
                <p style={{ color: 'rgba(200,180,140,0.5)', marginBottom: '6px', fontFamily: "'Cormorant Garamond',serif" }}>&amp;</p>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', color: `${f.accent}`, fontWeight: 600, marginBottom: '24px' }}>{f.parents[1]}</h3>
                <div style={{ width: '28px', height: '1px', background: f.accent, margin: '0 auto 20px' }} />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: 'rgba(200,180,140,0.6)', lineHeight: 1.9, fontStyle: 'italic', whiteSpace: 'pre-line' }}>{f.address}</p>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── WEDDING DETAILS ───────────────────────────────────
function DetailsSection() {
  const cards = [
    { icon: '📅', label: 'Date', val: 'Sunday, 15th March 2026', sub: '1201 Meenam 1' },
    { icon: '⏰', label: 'Muhurtham', val: '10:15 AM — 11:00 AM', sub: 'Auspicious Time' },
    { icon: '📍', label: 'Venue', val: 'SNM Auditorium', sub: 'Moothakunnam, Ernakulam' },
  ]

  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0d0a06 0%,#141208 100%)', textAlign: 'center' }}>
      <Silk color="#7a9e7e" speed={0.25} scale={3} noiseIntensity={1.0} />
      <Particles count={50} particleColors={['#c9a84c', '#a8c5ac']} speed={0.15} connectDistance={70} style={{ zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle eyebrow="Mark Your Calendar" title="Wedding Details" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '24px', maxWidth: '860px', margin: '0 auto 72px' }}>
          {cards.map((c, i) => (
            <InView key={c.label} delay={i * 0.12}>
              <motion.div
                className="glass-light"
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ padding: '44px 20px', textAlign: 'center', position: 'relative' }}
              >
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3 + i, ease: 'easeInOut' }} style={{ fontSize: '2.5rem', marginBottom: '18px', display: 'block' }}>{c.icon}</motion.div>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.6)', marginBottom: '10px' }}>{c.label}</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '1.05rem', color: '#c9a84c', fontWeight: 600, marginBottom: '6px' }}>{c.val}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', color: 'rgba(200,180,140,0.5)', fontStyle: 'italic' }}>{c.sub}</p>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── VENUE ────────────────────────────────────────────
function VenueSection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#141208 0%,#0d0a06 100%)', textAlign: 'center' }}>
      <Aurora colorStops={['#060504', '#0f0a03', '#040804']} amplitude={1.0} speed={0.25} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle eyebrow="Find Us Here" title="The Venue" />
        <InView delay={0.1} style={{ maxWidth: '680px', margin: '0 auto' }}>
          <motion.div className="glass-light" style={{ padding: 'clamp(36px,6vw,60px)', position: 'relative', overflow: 'hidden' }}>
            {/* Glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%,rgba(201,168,76,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />

            <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} style={{ fontSize: '3.5rem', marginBottom: '24px', display: 'block' }}>🏛️</motion.div>

            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', color: '#c9a84c', fontWeight: 600, marginBottom: '8px' }}>SNM Auditorium</h3>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '2rem', color: '#a8c5ac', marginBottom: '24px' }}>Moothakunnam</p>

            <GoldDivider />

            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(200,180,140,0.65)', lineHeight: 2, margin: '16px 0 32px' }}>
              Moothakunnam, Ernakulam District<br />Kerala, India
            </p>

            {/* Map tile */}
            <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg,rgba(168,197,172,0.08),rgba(201,168,76,0.06))', borderRadius: '16px', border: '1px dashed rgba(201,168,76,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
              {/* Grid overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.06) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
              <span style={{ fontSize: '2.2rem', position: 'relative', zIndex: 1 }}>🗺️</span>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.75rem', color: 'rgba(201,168,76,0.7)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>SNM AUDITORIUM · MOOTHAKUNNAM</p>
            </div>

            <motion.a
              href="https://maps.google.com/?q=SNM+Auditorium+Moothakunnam+Ernakulam+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-block', padding: '12px 32px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '30px', color: '#c9a84c', fontFamily: "'Cinzel',serif", fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none' }}
            >
              Open in Maps ↗
            </motion.a>
          </motion.div>
        </InView>
      </div>
    </Section>
  )
}

// ─── BLESSINGS ────────────────────────────────────────
function BlessingsSection() {
  return (
    <Section style={{ padding: 'clamp(100px,16vw,160px) clamp(20px,8vw,120px)', background: 'linear-gradient(180deg,#0d0a06 0%,#0a0704 100%)', textAlign: 'center', position: 'relative' }}>
      <Silk color="#c9a84c" speed={0.2} scale={1.8} noiseIntensity={2} />
      <Particles count={80} particleColors={['#c9a84c', '#e8c96d', 'rgba(255,248,200,0.4)']} speed={0.25} connectDistance={50} style={{ zIndex: 1 }} />

      {/* Glow orb center */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <InView delay={0} style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
          <GaneshSymbol size={80} color="#c9a84c" />
        </InView>

        <InView delay={0.2}>
          <GoldDivider />
        </InView>

        <InView delay={0.4}>
          <motion.blockquote
            style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(2rem,6vw,4.5rem)', color: '#fff8e0', lineHeight: 1.45, maxWidth: '750px', margin: '32px auto', textShadow: '0 0 40px rgba(201,168,76,0.25)' }}
          >
            "We seek only your valuable presence and blessings."
          </motion.blockquote>
        </InView>

        <InView delay={0.6}>
          <GoldDivider />
        </InView>

        <InView delay={0.8}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'rgba(200,180,140,0.6)', fontStyle: 'italic', marginTop: '24px' }}>
            With love — the families of Keerthana &amp; Najunkishor
          </p>
        </InView>
      </div>
    </Section>
  )
}

// ─── RSVP ─────────────────────────────────────────────
// function RSVPSection() {
//   const [submitted, setSubmitted] = useState(false)
//   const [name, setName] = useState('')
//   const [attending, setAttending] = useState('Joyfully Accept')

//   const handleSubmit = () => {
//     setSubmitted(true)
//     confetti({ particleCount: 150, spread: 90, colors: ['#c9a84c', '#e8c96d', '#a8c5ac', '#7a9e7e', '#fff'], origin: { y: 0.6 }, gravity: 0.8 })
//     setTimeout(() => confetti({ particleCount: 80, spread: 120, colors: ['#c9a84c', '#fff'], origin: { x: 0, y: 0.5 }, angle: 60 }), 400)
//     setTimeout(() => confetti({ particleCount: 80, spread: 120, colors: ['#c9a84c', '#fff'], origin: { x: 1, y: 0.5 }, angle: 120 }), 600)
//   }

//   const inputStyle = { width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(255,255,255,0.04)', fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: '#fff8e0', outline: 'none', caretColor: '#c9a84c' }

//   return (
//     <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0a0704 0%,#0d0a06 100%)', textAlign: 'center' }}>
//       <Aurora colorStops={['#080604', '#0f0a02', '#060808']} amplitude={0.7} speed={0.2} />
//       <div style={{ position: 'relative', zIndex: 2 }}>
//         <SectionTitle eyebrow="Will You Join Us?" title="RSVP" />
//         <InView delay={0.1} style={{ maxWidth: '480px', margin: '0 auto' }}>
//           <div className="glass-light" style={{ padding: 'clamp(32px,5vw,52px) clamp(24px,4vw,44px)' }}>
//             <AnimatePresence mode="wait">
//               {!submitted ? (
//                 <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(200,180,140,0.65)', lineHeight: 1.8, marginBottom: '32px' }}>
//                     Your presence would make our day even more beautiful.
//                   </p>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                     <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
//                     <select value={attending} onChange={e => setAttending(e.target.value)} style={{ ...inputStyle }}>
//                       <option>Joyfully Accept</option>
//                       <option>Regretfully Decline</option>
//                       <option>Will Confirm Later</option>
//                     </select>
//                     <motion.button
//                       onClick={handleSubmit}
//                       disabled={!name.trim()}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       style={{ padding: '16px', background: 'linear-gradient(135deg,#7a5a1a,#c9a84c)', border: 'none', borderRadius: '12px', color: '#fff8e0', fontFamily: "'Cinzel',serif", fontSize: '0.85rem', letterSpacing: '0.15em', cursor: 'none', opacity: name.trim() ? 1 : 0.5, transition: 'opacity 0.3s' }}
//                     >
//                       Send Wishes ✨
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4 }} style={{ padding: '20px 0' }}>
//                   <motion.div animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }} transition={{ repeat: 3, duration: 0.5 }} style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🎉</motion.div>
//                   <h3 className="shimmer-gold" style={{ fontFamily: "'Cinzel',serif", fontSize: '1.5rem', marginBottom: '14px' }}>Thank You, {name}!</h3>
//                   <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: 'rgba(200,180,140,0.65)', lineHeight: 1.8 }}>Your response is noted. We look forward to celebrating with you!</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </InView>
//       </div>
//     </Section>
//   )
// }

// ─── CONTACT ──────────────────────────────────────────
function ContactSection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0d0a06 0%,#0a0806 100%)', textAlign: 'center' }}>
      <Particles count={40} particleColors={['#c9a84c', '#a8c5ac']} speed={0.15} connectDistance={50} style={{ zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle eyebrow="Reach Out" title="Contact Us" />
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
          {['9846108712', '9947855105'].map((num, i) => (
            <InView key={num} delay={i * 0.15}>
              <motion.a href={`tel:+91${num}`} whileHover={{ y: -6, scale: 1.03 }} className="glass-light" style={{ padding: '28px 36px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', flex: '1 1 220px', transition: 'box-shadow 0.3s' }}>
                <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 3 + i, ease: 'easeInOut' }} style={{ fontSize: '2rem' }}>📞</motion.span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.6)', marginBottom: '4px' }}>Call Us</p>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '1rem', color: '#c9a84c', fontWeight: 600 }}>+91 {num}</p>
                </div>
              </motion.a>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── FOOTER ───────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#070504', padding: '60px 32px', textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', position: 'relative', overflow: 'hidden' }}>
      <Particles count={20} particleColors={['#c9a84c']} speed={0.1} connectDistance={40} style={{ zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 4 }} style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(2rem,5vw,3rem)', color: '#c9a84c', marginBottom: '10px' }}>
          Keerthana ❤️ Najunkishor
        </motion.p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.4)', marginBottom: '20px' }}>
          15 · 03 · 2026 · SNM Auditorium · Moothakunnam
        </p>
        <GoldDivider />
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'rgba(200,180,140,0.35)', marginTop: '20px', fontStyle: 'italic' }}>
          With blessings, love &amp; joy — forever begins today
        </p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(200, 180, 140, 0.35)', marginTop: '32px', opacity: 0.6 }}>
          Made with ❤️ by Naveen
        </p>
      </div>
    </footer>
  )
}

// ─── MUSIC TOGGLE ─────────────────────────────────────
function MusicBtn({ on, toggle }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 4000) }, [])

  if (!visible) return null
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={toggle}
      style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000, width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', background: on ? 'rgba(201,168,76,0.25)' : 'rgba(20,15,5,0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'none', transition: 'all 0.3s', boxShadow: on ? '0 0 30px rgba(201,168,76,0.3)' : 'none' }}
    >
      {on ? '🎵' : '🔇'}
    </motion.button>
  )
}

// ─── MAIN APP ─────────────────────────────────────────
export default function App() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mainRef = useRef()
  const audioRef = useRef(new Audio(bgMusic))

  useEffect(() => {
    // Setup audio
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Cleanup on unmount
    return () => {
      audioRef.current.pause()
    }
  }, [])

  const toggleMusic = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleEnter = () => {
    setEntered(true)
    setTimeout(() => mainRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
    // Auto-play music on enter
    if (!isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio auto-play failed:", e))
      setIsPlaying(true)
    }
  }

  return (
    <>
      <SplashCursor />
      <SideParticleFlow />
      <MusicBtn on={isPlaying} toggle={toggleMusic} />
      <Hero onEnter={handleEnter} />
      <div ref={mainRef}>
        <AnimatePresence>
          {entered && (
            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <CoupleSection />
              <ParentsSection />
              <DetailsSection />
              <VenueSection />
              <BlessingsSection />
              {/* <RSVPSection /> */}
              <ContactSection />
              <Footer />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Aurora from './components/Aurora'
import Particles from './components/Particles'
import SideParticleFlow from './components/SideParticleFlow'
import SplashCursor from './components/SplashCursor'
import Silk from './components/Silk'
import BlurText from './components/BlurText'
import CountdownTimer from './components/CountdownTimer'
import { GoldDivider, IslamicCorner, IslamicEmblem } from './components/Decorative'
import confetti from 'canvas-confetti'
import { weddingConfig } from './weddingConfig'
import { GentleAmbientSynth } from './components/AmbientAudio'

// ─── In-view wrapper ───────────────────────────────────
function InView({ children, delay = 0, style }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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
function SectionTitle({ eyebrow, title, arabicTitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      {arabicTitle && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="arabic-font"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#c9a84c', marginBottom: '8px' }}
        >
          {arabicTitle}
        </motion.p>
      )}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.4em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', color: '#2d9f67', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}
      >
        {eyebrow}
      </motion.p>
      <BlurText
        text={title}
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(1.8rem,4.5vw,3.2rem)',
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

// ─── HERO SECTION ─────────────────────────────────────
function Hero({ onEnter }) {
  return (
    <Section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0d0b', padding: '60px 0 80px' }}>
      {/* Aurora WebGL background with gold & emerald tones */}
      <Aurora
        colorStops={['#081c13', '#1e1402', '#04100b']}
        amplitude={1.3}
        speed={0.3}
      />

      {/* Particle layer */}
      <Particles
        count={90}
        particleColors={['#c9a84c', '#e8c96d', '#2d9f67', 'rgba(255,248,224,0.6)']}
        speed={0.25}
        connectDistance={85}
        style={{ zIndex: 1 }}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, transparent 25%, rgba(6,9,7,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Islamic Corner decorations */}
      {[
        { top: 16, left: 16, flip: false },
        { top: 16, right: 16, flip: true },
        { bottom: 16, left: 16, flip: false, style: { transform: 'scaleY(-1)' } },
        { bottom: 16, right: 16, flip: true, style: { transform: 'scale(-1,-1)' } },
      ].map((pos, i) => (
        <IslamicCorner key={i} style={{ position: 'absolute', width: 90, opacity: 0.6, zIndex: 4, ...pos }} flip={pos.flip} />
      ))}

      {/* Centered Hero Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '920px', margin: '0 auto' }}>

        {/* Bismillah Calligraphy Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{ marginBottom: '16px' }}
        >
          <p className="arabic-font" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#c9a84c', textShadow: '0 0 25px rgba(201,168,76,0.5)', lineHeight: 1.4 }}>
            {weddingConfig.bismillahArabic}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(0.85rem,1.8vw,1.1rem)', color: 'rgba(232, 201, 109, 0.85)', letterSpacing: '0.08em', marginTop: '6px', fontStyle: 'italic' }}>
            "{weddingConfig.bismillahEnglish}"
          </p>
        </motion.div>

        {/* Animated Islamic Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ margin: '20px auto 24px', display: 'flex', justifyContent: 'center' }}
        >
          <IslamicEmblem size={84} color="#c9a84c" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.68rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#2d9f67', fontWeight: 700, marginBottom: '20px' }}
        >
          IN THE NAME OF ALLAH · THE AUSPICIOUS WEDDING OF
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '16px' }}
        >
          <h1 className="script-font" style={{ fontSize: 'clamp(3rem, 8.5vw, 6.5rem)', lineHeight: 1.1, color: '#fff8e0', textShadow: '0 0 35px rgba(201,168,76,0.45)' }}>
            {weddingConfig.couple.groom.shortName}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '8px 0' }}>
            <div style={{ height: '1px', width: 'clamp(40px,10vw,100px)', background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
            <span style={{ fontFamily: "'Alex Brush', cursive", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#c9a84c' }}>
              &amp;
            </span>
            <div style={{ height: '1px', width: 'clamp(40px,10vw,100px)', background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
          </div>

          <h1 className="script-font" style={{ fontSize: 'clamp(3rem, 8.5vw, 6.5rem)', lineHeight: 1.1, color: '#fff8e0', textShadow: '0 0 35px rgba(201,168,76,0.45)' }}>
            {weddingConfig.couple.bride.shortName}
          </h1>
        </motion.div>

        {/* Subtitle tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.9rem,2.2vw,1.3rem)', color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px' }}
        >
          {weddingConfig.couple.subtitle}
        </motion.p>

        {/* Live Nikah Countdown Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginBottom: '40px' }}
        >
          <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,201,109,0.75)', marginBottom: '14px' }}>
            COUNTDOWN TO NIKAH CEREMONY
          </p>
          <CountdownTimer targetDate={weddingConfig.events[0].targetDate} accentColor="#c9a84c" />
        </motion.div>

        {/* Enter CTA */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.4)' }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          style={{
            padding: '18px 52px',
            background: 'linear-gradient(135deg,#0b4f3d,#c9a84c,#0b4f3d)',
            backgroundSize: '200% auto',
            border: '1px solid rgba(201,168,76,0.6)',
            borderRadius: '60px',
            color: '#fff8e0',
            fontFamily: "'Cinzel',serif",
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Open Invitation</span>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 0%,rgba(255,248,200,0.2) 50%,transparent 100%)', animation: 'shimmer 2s linear infinite' }} />
        </motion.button>
      </div>
    </Section>
  )
}

// ─── INVITATION & PARENTS SECTION ──────────────────────
function InvitationSection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0a0d0b 0%,#111713 100%)' }}>
      <Silk color="#1b7a4e" speed={0.25} scale={2} noiseIntensity={1.2} />
      <Particles count={60} particleColors={['#c9a84c', '#e8c96d', '#2d9f67']} speed={0.2} connectDistance={60} style={{ zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          arabicTitle="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
          eyebrow="SOLICITING YOUR BLESSINGS"
          title="Invitation"
        />

        {/* Solemn Invitation Announcement */}
        <InView delay={0.1} style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="glass-light" style={{ padding: 'clamp(32px,5vw,48px)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', color: '#fff8e0', lineHeight: 1.8, fontStyle: 'italic' }}>
              "{weddingConfig.invitationText}"
            </p>
          </div>
        </InView>

        {/* Groom & Bride Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '32px', alignItems: 'center' }}>

          {/* Groom Card */}
          <InView delay={0.2}>
            <motion.div
              className="glass-light"
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(201,168,76,0.2)' }}
              style={{ padding: '48px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right,transparent,#c9a84c,transparent)' }} />
              
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🌙</div>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2d9f67', marginBottom: '10px', fontWeight: 700 }}>
                {weddingConfig.couple.groom.title}
              </p>
              
              <h2 className="script-font" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', color: '#fff8e0', marginBottom: '12px', textShadow: '0 0 25px rgba(201,168,76,0.3)' }}>
                {weddingConfig.couple.groom.shortName}
              </h2>
              
              <div style={{ width: '40px', height: '1px', background: '#c9a84c', margin: '0 auto 16px' }} />

              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.9rem', color: '#c9a84c', marginBottom: '12px', fontWeight: 600 }}>
                {weddingConfig.couple.groom.grandson}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.85)', fontStyle: 'italic', lineHeight: 1.7 }}>
                Only beloved son of<br />
                <strong>Mrs. &amp; Mr. Hajjan Mushfira Banu<br />&amp; Alhaj Mohammed Yusman Khan (Arif)</strong>
              </p>
            </motion.div>
          </InView>

          {/* Connector */}
          <InView delay={0.35} style={{ textAlign: 'center', margin: '12px 0' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(201,168,76,0.2),rgba(27,122,78,0.2))', border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.5rem', boxShadow: '0 0 30px rgba(201,168,76,0.25)' }}>
                ⭐
              </div>
            </motion.div>
            <p className="shimmer-gold" style={{ fontFamily: "'Cinzel',serif", fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.25em' }}>WITH</p>
          </InView>

          {/* Bride Card */}
          <InView delay={0.4}>
            <motion.div
              className="glass-light"
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(45,159,103,0.25)' }}
              style={{ padding: '48px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(45,159,103,0.3)', borderRadius: '24px' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right,transparent,#2d9f67,transparent)' }} />
              
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✨</div>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '10px', fontWeight: 700 }}>
                {weddingConfig.couple.bride.title}
              </p>

              <h2 className="script-font" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', color: '#fff8e0', marginBottom: '12px', textShadow: '0 0 25px rgba(201,168,76,0.3)' }}>
                {weddingConfig.couple.bride.shortName}
              </h2>

              <div style={{ width: '40px', height: '1px', background: '#2d9f67', margin: '0 auto 16px' }} />

              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.85)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '10px' }}>
                {weddingConfig.couple.bride.daughter}
              </p>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.85rem', color: '#2d9f67', letterSpacing: '0.1em' }}>
                {weddingConfig.couple.bride.location}
              </p>
            </motion.div>
          </InView>

        </div>
      </div>
    </Section>
  )
}

// ─── EVENT TIMELINE & LIVE COUNTDOWNS (NIKAH & WALIMA) ─
function EventTimelineSection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#111713 0%,#0a0d0b 100%)' }}>
      <Aurora colorStops={['#04100b', '#1e1402', '#0a0d0b']} amplitude={0.9} speed={0.2} />
      <Particles count={50} particleColors={['#c9a84c', '#2d9f67']} speed={0.15} connectDistance={70} style={{ zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1080px', margin: '0 auto' }}>
        <SectionTitle
          arabicTitle="مواعيد الأحداث"
          eyebrow="MARK YOUR CALENDAR"
          title="Wedding Events"
        />

        {/* Side-by-Side Event Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '32px', alignItems: 'stretch' }}>
          {weddingConfig.events.map((evt, idx) => (
            <InView key={evt.id} delay={idx * 0.2}>
              <motion.div
                className="glass-light"
                whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(201,168,76,0.2)' }}
                style={{
                  padding: '44px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  height: '100%',
                  border: idx === 0 ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(45,159,103,0.4)',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Accent top stripe */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: idx === 0 ? 'linear-gradient(to right,#c9a84c,#e8c96d,#c9a84c)' : 'linear-gradient(to right,#1b7a4e,#2d9f67,#1b7a4e)' }} />

                <div>
                  {/* Event Header */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <p className="arabic-font" style={{ fontSize: '2rem', color: idx === 0 ? '#c9a84c' : '#2d9f67', marginBottom: '4px' }}>
                      {evt.arabicTitle}
                    </p>
                    <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#fff8e0', fontWeight: 600 }}>
                      {evt.label}
                    </h3>
                    <div style={{ width: '40px', height: '1px', background: idx === 0 ? '#c9a84c' : '#2d9f67', margin: '12px auto' }} />
                  </div>

                  {/* Event Timing & Venue */}
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', color: '#fff8e0', fontWeight: 600, marginBottom: '8px', fontStyle: 'italic' }}>
                      {evt.dateTimeLine}
                    </p>
                    {evt.time && (
                      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.85rem', color: '#c9a84c', letterSpacing: '0.1em', marginBottom: '12px' }}>
                        🕒 {evt.time}
                      </p>
                    )}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(201,168,76,0.2)' }}>
                      <span>📍</span>
                      <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.85rem', color: '#fff8e0' }}>{evt.venueName}</span>
                    </div>

                    {evt.specialNote && (
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: 'rgba(232, 201, 109, 0.85)', marginTop: '20px', fontStyle: 'italic', lineHeight: 1.6, borderTop: '1px dashed rgba(201,168,76,0.25)', paddingTop: '14px' }}>
                        🌸 {evt.specialNote}
                      </p>
                    )}
                  </div>
                </div>

                {/* Live Countdown for this specific event */}
                <div>
                  <p style={{ textAlign: 'center', fontFamily: "'Lato',sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,201,109,0.7)', marginBottom: '12px' }}>
                    LIVE COUNTDOWN TO {evt.label.toUpperCase()}
                  </p>
                  <CountdownTimer targetDate={evt.targetDate} accentColor={idx === 0 ? '#c9a84c' : '#2d9f67'} />
                </div>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── GALLERY SECTION ──────────────────────────────────
function GallerySection() {
  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0a0d0b 0%,#111713 100%)' }}>
      <Silk color="#c9a84c" speed={0.2} scale={1.8} noiseIntensity={1.5} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          arabicTitle="معرض الصور"
          eyebrow="MOMENTS OF JOY"
          title="Celebration Gallery"
        />

        {/*
          NOTE FOR USER / DEVELOPER TO SWAP PHOTOS:
          Place your custom couple images in `public/gallery/` or `src/assets/`
          and update the image URLs in `weddingConfig.gallery` or in this grid below!
        */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '28px' }}>
          {weddingConfig.gallery.map((item, idx) => (
            <InView key={item.id} delay={idx * 0.15}>
              <motion.div
                className="glass-light"
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  border: '1px solid rgba(201,168,76,0.3)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Photo Frame Placeholder */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '14px',
                    background: idx === 0 ? 'linear-gradient(135deg, #0b4f3d, #1b7a4e)' : idx === 1 ? 'linear-gradient(135deg, #7a5a1a, #c9a84c)' : 'linear-gradient(135deg, #1b7a4e, #2d9f67)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '10px',
                    marginBottom: '18px',
                    border: '1px dashed rgba(201,168,76,0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <span style={{ fontSize: '3rem' }}>💍</span>
                      <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.75rem', color: '#fff8e0', letterSpacing: '0.15em' }}>
                        EJAZ &amp; RUHINA
                      </p>
                    </>
                  )}
                </div>

                <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', color: '#c9a84c', marginBottom: '6px' }}>
                  {item.title}
                </h4>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: 'rgba(232, 201, 109, 0.75)', fontStyle: 'italic' }}>
                  {item.desc}
                </p>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── VENUE & INTERACTIVE MAPS SECTION ─────────────────
function VenueSection() {
  const [activeMap, setActiveMap] = useState(0)

  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#111713 0%,#0a0d0b 100%)' }}>
      <Aurora colorStops={['#06140d', '#1e1402', '#040b07']} amplitude={1.0} speed={0.25} />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto' }}>
        <SectionTitle
          arabicTitle="مواقع الحفل"
          eyebrow="FIND US HERE"
          title="Venues & Directions"
        />

        {/* Tab Switcher for Venues */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {weddingConfig.events.map((evt, idx) => (
            <motion.button
              key={evt.id}
              onClick={() => setActiveMap(idx)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '14px 28px',
                borderRadius: '30px',
                border: activeMap === idx ? '1px solid #c9a84c' : '1px solid rgba(201,168,76,0.3)',
                background: activeMap === idx ? 'linear-gradient(135deg,#0b4f3d,#c9a84c)' : 'rgba(255,255,255,0.04)',
                color: '#fff8e0',
                fontFamily: "'Cinzel',serif",
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {evt.label} — {evt.venueName.split(',')[0]}
            </motion.button>
          ))}
        </div>

        {/* Venue Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '32px' }}>
          {weddingConfig.events.map((evt, idx) => (
            <InView key={evt.id} delay={idx * 0.2}>
              <motion.div
                className="glass-light"
                style={{
                  padding: '36px 28px',
                  borderRadius: '24px',
                  border: activeMap === idx ? '2px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.25)',
                  background: activeMap === idx ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.4s'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '10px' }}>🏛️</span>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2d9f67', fontWeight: 700 }}>
                    {evt.label} VENUE
                  </p>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.5rem', color: '#c9a84c', fontWeight: 600, marginTop: '4px' }}>
                    {evt.venueName}
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.8)', fontStyle: 'italic', marginTop: '6px' }}>
                    {evt.venueAddress}
                  </p>
                </div>

                {/* Google Maps Search Embed Iframe */}
                <div style={{ width: '100%', height: '230px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '24px' }}>
                  <iframe
                    title={`${evt.label} Map`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={evt.mapsEmbedUrl}
                    style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                  />
                </div>

                {/* Get Directions CTA */}
                <div style={{ textAlign: 'center' }}>
                  <motion.a
                    href={evt.mapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'inline-block',
                      padding: '12px 32px',
                      border: '1px solid rgba(201,168,76,0.5)',
                      borderRadius: '30px',
                      background: 'linear-gradient(135deg,rgba(201,168,76,0.15),rgba(27,122,78,0.15))',
                      color: '#c9a84c',
                      fontFamily: "'Cinzel',serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textDecoration: 'none'
                    }}
                  >
                    Get Directions ↗
                  </motion.a>
                </div>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── RSVP SECTION ─────────────────────────────────────
function RSVPSection() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('Joyfully Accept (In Sha Allah)')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitted(true)

    // Confetti tuned to Islamic wedding gold + emerald + white
    confetti({
      particleCount: 160,
      spread: 90,
      colors: ['#c9a84c', '#e8c96d', '#1b7a4e', '#2d9f67', '#ffffff'],
      origin: { y: 0.6 },
      gravity: 0.8
    })
    setTimeout(() => confetti({ particleCount: 90, spread: 120, colors: ['#c9a84c', '#2d9f67', '#ffffff'], origin: { x: 0.1, y: 0.5 }, angle: 60 }), 350)
    setTimeout(() => confetti({ particleCount: 90, spread: 120, colors: ['#c9a84c', '#2d9f67', '#ffffff'], origin: { x: 0.9, y: 0.5 }, angle: 120 }), 600)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(201,168,76,0.3)',
    background: 'rgba(255,255,255,0.05)',
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: '1.05rem',
    color: '#fff8e0',
    outline: 'none',
    caretColor: '#c9a84c'
  }

  return (
    <Section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px)', background: 'linear-gradient(180deg,#0a0d0b 0%,#0f1410 100%)', textAlign: 'center' }}>
      <Particles count={40} particleColors={['#c9a84c', '#2d9f67']} speed={0.15} connectDistance={50} style={{ zIndex: 1 }} />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '520px', margin: '0 auto' }}>
        <SectionTitle
          arabicTitle="تأكيد الحضور"
          eyebrow="JOIN US IN CELEBRATION"
          title="RSVP"
        />

        <InView delay={0.1}>
          <div className="glass-light" style={{ padding: 'clamp(32px,5vw,52px) clamp(24px,4vw,44px)', borderRadius: '24px', border: '1px solid rgba(201,168,76,0.3)' }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'rgba(232, 201, 109, 0.85)', lineHeight: 1.8, marginBottom: '28px', fontStyle: 'italic' }}>
                    Your presence and prayers would render our auspicious day complete, In Sha Allah.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      style={inputStyle}
                    />

                    <select value={attending} onChange={e => setAttending(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option style={{ background: '#0a0d0b', color: '#fff8e0' }}>Joyfully Accept (In Sha Allah)</option>
                      <option style={{ background: '#0a0d0b', color: '#fff8e0' }}>Regretfully Decline</option>
                      <option style={{ background: '#0a0d0b', color: '#fff8e0' }}>Will Confirm Later</option>
                    </select>

                    <textarea
                      placeholder="Your Prayers & Best Wishes for the Couple"
                      rows={3}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{ ...inputStyle, resize: 'none' }}
                    />

                    <motion.button
                      type="submit"
                      disabled={!name.trim()}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg,#0b4f3d,#c9a84c)',
                        border: '1px solid rgba(201,168,76,0.5)',
                        borderRadius: '12px',
                        color: '#fff8e0',
                        fontFamily: "'Cinzel',serif",
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        cursor: name.trim() ? 'pointer' : 'not-allowed',
                        opacity: name.trim() ? 1 : 0.6,
                        transition: 'all 0.3s'
                      }}
                    >
                      Confirm Your Attendance, In Sha Allah
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4 }} style={{ padding: '20px 0' }}>
                  <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: 2, duration: 0.6 }} style={{ fontSize: '3.5rem', marginBottom: '18px' }}>
                    ✨
                  </motion.div>
                  <p className="arabic-font" style={{ fontSize: '1.8rem', color: '#c9a84c', marginBottom: '8px' }}>
                    جَزاكُمُ اللهُ خَيْراً
                  </p>
                  <h3 className="shimmer-gold" style={{ fontFamily: "'Cinzel',serif", fontSize: '1.5rem', marginBottom: '14px' }}>
                    Thank You, {name}!
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.85)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    Your attendance response has been received. We look forward to celebrating this blessed union with you!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </InView>
      </div>
    </Section>
  )
}

// ─── FOOTER / HOST & CONTACT SECTION ─────────────────
function FooterSection() {
  return (
    <footer style={{ background: '#050806', padding: '80px 24px 48px', textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
      <Particles count={25} particleColors={['#c9a84c', '#2d9f67']} speed={0.1} connectDistance={45} style={{ zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Arabic Blessing */}
        <InView delay={0}>
          <p className="arabic-font" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', color: '#c9a84c', marginBottom: '12px', lineHeight: 1.4 }}>
            {weddingConfig.blessingArabic}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.8)', fontStyle: 'italic', marginBottom: '32px' }}>
            "{weddingConfig.blessingEnglish}"
          </p>
        </InView>

        {/* Host Details */}
        <InView delay={0.2} style={{ marginBottom: '40px' }}>
          <div className="glass-light" style={{ padding: '32px 24px', borderRadius: '20px', border: '1px solid rgba(201,168,76,0.25)', display: 'inline-block', maxWidth: '580px', width: '100%' }}>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2d9f67', marginBottom: '8px', fontWeight: 700 }}>
              CORDIALLY INVITED BY HOST
            </p>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.35rem', color: '#fff8e0', fontWeight: 600, marginBottom: '6px' }}>
              From: {weddingConfig.host.from}
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(232, 201, 109, 0.85)', fontStyle: 'italic', marginBottom: '20px' }}>
              {weddingConfig.host.address}
            </p>

            {/* Tap-to-call links */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {weddingConfig.host.phones.map((phone) => (
                <motion.a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    border: '1px solid rgba(201,168,76,0.4)',
                    background: 'rgba(201,168,76,0.1)',
                    color: '#c9a84c',
                    fontFamily: "'Cinzel',serif",
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}
                >
                  <span>📞</span>
                  <span>+91 {phone.display}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </InView>

        <GoldDivider />

        <p className="script-font" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#c9a84c', marginTop: '24px', marginBottom: '8px' }}>
          Mohammed Ejaz Khan ❤️ Ruhina Begum
        </p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(45,159,103,0.8)' }}>
          01 · 11 · 2026 — NIKAH · KORAPUT | 03 · 11 · 2026 — WALIMA · RAYAGADA
        </p>
      </div>
    </footer>
  )
}

// ─── AMBIENT MUSIC TOGGLE ─────────────────────────────
function MusicBtn({ on, toggle }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={toggle}
      title={on ? "Mute Background Music" : "Play Gentle Ambient Music"}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.6)',
        background: on ? 'linear-gradient(135deg,rgba(11,79,61,0.9),rgba(201,168,76,0.9))' : 'rgba(10,13,11,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        fontSize: '22px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: on ? '0 0 30px rgba(201,168,76,0.4)' : '0 4px 16px rgba(0,0,0,0.5)'
      }}
    >
      {on ? '🎵' : '🔇'}
    </motion.button>
  )
}

// ─── MAIN APPLICATION ────────────────────────────────
export default function App() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const mainRef = useRef()
  const synthRef = useRef(null)
  const isPlayingRef = useRef(true)

  // Keep ref in sync for event listeners
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    synthRef.current = new GentleAmbientSynth()

    // Attempt autoplay immediately
    if (isPlayingRef.current) {
      try {
        synthRef.current.play()
      } catch (e) {
        console.log("Autoplay waiting for interaction")
      }
    }

    // Function to ensure audio starts on first user interaction if enabled
    const startOnInteraction = () => {
      if (isPlayingRef.current && synthRef.current) {
        synthRef.current.play()
      }
    }

    window.addEventListener('click', startOnInteraction, { once: true })
    window.addEventListener('touchstart', startOnInteraction, { once: true })
    window.addEventListener('scroll', startOnInteraction, { once: true })
    window.addEventListener('keydown', startOnInteraction, { once: true })

    return () => {
      window.removeEventListener('click', startOnInteraction)
      window.removeEventListener('touchstart', startOnInteraction)
      window.removeEventListener('scroll', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
      if (synthRef.current) synthRef.current.stop()
    }
  }, [])

  const toggleMusic = () => {
    if (!synthRef.current) return
    if (isPlaying) {
      synthRef.current.pause()
      setIsPlaying(false)
    } else {
      synthRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleEnter = () => {
    setEntered(true)
    setTimeout(() => mainRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
    if (isPlaying && synthRef.current) {
      synthRef.current.play()
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
              <InvitationSection />
              <EventTimelineSection />
              <GallerySection />
              <VenueSection />
              <RSVPSection />
              <FooterSection />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

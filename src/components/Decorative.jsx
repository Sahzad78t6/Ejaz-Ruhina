import React from 'react'
import { motion } from 'framer-motion'

export function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', margin: '20px auto', maxWidth: '420px' }}>
      <svg width="80" height="16" viewBox="0 0 80 16">
        <path d="M0,8 Q20,2 40,8 Q60,14 80,8" stroke="url(#g1)" strokeWidth="1.2" fill="none"/>
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="#c9a84c"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <circle cx="5" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
        <circle cx="40" cy="8" r="2" fill="#c9a84c" opacity="0.8"/>
        <circle cx="75" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
      </svg>

      {/* 8-Point Islamic Star (Rub el Hizb) Icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="5" width="14" height="14" stroke="#c9a84c" strokeWidth="1.2" fill="none" opacity="0.9" />
        <rect x="5" y="5" width="14" height="14" stroke="#e8c96d" strokeWidth="1.2" fill="none" transform="rotate(45 12 12)" opacity="0.9" />
        <circle cx="12" cy="12" r="3" fill="#c9a84c" opacity="0.85" />
      </svg>

      <svg width="80" height="16" viewBox="0 0 80 16" style={{ transform: 'scaleX(-1)' }}>
        <path d="M0,8 Q20,2 40,8 Q60,14 80,8" stroke="url(#g2)" strokeWidth="1.2" fill="none"/>
        <defs>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="#c9a84c"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <circle cx="5" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
        <circle cx="40" cy="8" r="2" fill="#c9a84c" opacity="0.8"/>
        <circle cx="75" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function IslamicCorner({ style, flip }) {
  return (
    <svg viewBox="0 0 150 150" style={{ ...style, transform: flip ? 'scale(-1,1)' : style?.transform }} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Arabesque frame lines */}
      <path d="M10,10 L140,10 L140,25 L25,25 L25,140 L10,140 Z" stroke="#c9a84c" strokeWidth="1" opacity="0.35"/>
      <path d="M15,15 Q80,15 15,80" stroke="#2d9f67" strokeWidth="1.5" opacity="0.6"/>
      <path d="M15,15 Q15,80 80,15" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/>

      {/* Islamic 8-Point Star Motif in Corner */}
      <g transform="translate(32, 32)">
        <rect x="-14" y="-14" width="28" height="28" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.7" />
        <rect x="-14" y="-14" width="28" height="28" stroke="#e8c96d" strokeWidth="1" fill="none" transform="rotate(45)" opacity="0.7" />
        <circle cx="0" cy="0" r="5" fill="#1b7a4e" opacity="0.8" />
        <circle cx="0" cy="0" r="2" fill="#fff8e0" />
      </g>

      {/* Decorative dots and delicate geometry */}
      <circle cx="15" cy="15" r="4" fill="#c9a84c" opacity="0.8"/>
      <circle cx="85" cy="15" r="2.5" fill="#2d9f67" opacity="0.6"/>
      <circle cx="15" cy="85" r="2.5" fill="#2d9f67" opacity="0.6"/>
      <circle cx="115" cy="15" r="2" fill="#c9a84c" opacity="0.4"/>
      <circle cx="15" cy="115" r="2" fill="#c9a84c" opacity="0.4"/>
      
      {/* Delicate arabesque arc */}
      <path d="M30,5 Q55,5 55,30" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
      <path d="M5,30 Q5,55 30,55" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
    </svg>
  )
}

// Alias for backwards compatibility
export const FloralCorner = IslamicCorner

export function IslamicEmblem({ size = 90, color = '#c9a84c', showBismillah = true }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Slow rotating outer geometric ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Concentric Islamic geometric rings */}
          <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="50" cy="50" r="40" stroke="#e8c96d" strokeWidth="0.6" opacity="0.4" />
          {/* 8-point outer star outline */}
          <g transform="translate(50,50)">
            <rect x="-32" y="-32" width="64" height="64" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
            <rect x="-32" y="-32" width="64" height="64" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(45)" opacity="0.4" />
          </g>
        </svg>
      </motion.div>

      {/* Pulsing inner glow */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: '10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(27,122,78,0.1) 60%, transparent 80%)' }}
      />

      {/* Center Crescent Moon and 8-Point Star Icon */}
      <svg width={size * 0.75} height={size * 0.75} viewBox="0 0 80 80" fill="none" style={{ position: 'relative', zIndex: 2 }}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8e0"/>
            <stop offset="50%" stopColor="#c9a84c"/>
            <stop offset="100%" stopColor="#a07830"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Crescent Moon */}
        <path
          d="M 46 16 C 30 16 18 29 18 45 C 18 61 30 74 46 74 C 38 67 33 57 33 45 C 33 33 38 23 46 16 Z"
          fill="url(#goldGradient)"
          filter="url(#glow)"
        />

        {/* 8-Point Star next to Crescent */}
        <g transform="translate(54, 40)">
          <rect x="-9" y="-9" width="18" height="18" fill="url(#goldGradient)" />
          <rect x="-9" y="-9" width="18" height="18" fill="url(#goldGradient)" transform="rotate(45)" />
          <circle cx="0" cy="0" r="3" fill="#0b4f3d" />
        </g>
      </svg>
    </div>
  )
}

// Alias for backwards compatibility replacing GaneshSymbol
export const GaneshSymbol = IslamicEmblem

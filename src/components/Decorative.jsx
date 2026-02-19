export function GoldDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px', justifyContent:'center', margin:'20px auto', maxWidth:'400px' }}>
      <svg width="80" height="16" viewBox="0 0 80 16">
        <path d="M0,8 Q20,2 40,8 Q60,14 80,8" stroke="url(#g1)" strokeWidth="1.2" fill="none"/>
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#c9a84c"/><stop offset="100%" stopColor="transparent"/></linearGradient></defs>
        <circle cx="5" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
        <circle cx="40" cy="8" r="2" fill="#c9a84c" opacity="0.8"/>
        <circle cx="75" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
      </svg>
      <span style={{ color:'#c9a84c', fontSize:'1.1rem', lineHeight:1 }}>✦</span>
      <svg width="80" height="16" viewBox="0 0 80 16" style={{ transform:'scaleX(-1)' }}>
        <path d="M0,8 Q20,2 40,8 Q60,14 80,8" stroke="url(#g2)" strokeWidth="1.2" fill="none"/>
        <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#c9a84c"/><stop offset="100%" stopColor="transparent"/></linearGradient></defs>
        <circle cx="5" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
        <circle cx="40" cy="8" r="2" fill="#c9a84c" opacity="0.8"/>
        <circle cx="75" cy="8" r="1.5" fill="#c9a84c" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function FloralCorner({ style, flip }) {
  return (
    <svg viewBox="0 0 150 150" style={{ ...style, transform: flip ? 'scale(-1,1)' : undefined }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,10 Q80,10 10,80" stroke="#a8c5ac" strokeWidth="1.5" opacity="0.5"/>
      <path d="M10,10 Q10,80 80,10" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
      <circle cx="10" cy="10" r="4" fill="#c9a84c" opacity="0.6"/>
      <circle cx="80" cy="10" r="2.5" fill="#a8c5ac" opacity="0.5"/>
      <circle cx="10" cy="80" r="2.5" fill="#a8c5ac" opacity="0.5"/>
      <circle cx="45" cy="22" r="6" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.35"/>
      <circle cx="22" cy="45" r="6" fill="none" stroke="#a8c5ac" strokeWidth="1" opacity="0.35"/>
      <path d="M30,8 Q36,2 42,8 Q36,14 30,8Z" fill="#a8c5ac" opacity="0.45"/>
      <path d="M8,30 Q2,36 8,42 Q14,36 8,30Z" fill="#c9a84c" opacity="0.4"/>
      <circle cx="55" cy="10" r="2" fill="#c9a84c" opacity="0.3"/>
      <circle cx="10" cy="55" r="2" fill="#a8c5ac" opacity="0.3"/>
      <path d="M20,20 Q30,15 35,25 Q25,28 20,20Z" fill="#c9a84c" opacity="0.3"/>
    </svg>
  )
}

export function GaneshSymbol({ size = 80, color = '#c9a84c' }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="40" y="70" textAnchor="middle" fontFamily="serif" fontSize="60" fill={color} opacity="0.85">ॐ</text>
      <circle cx="40" cy="45" r="38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4"/>
      <circle cx="40" cy="45" r="32" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25"/>
    </svg>
  )
}

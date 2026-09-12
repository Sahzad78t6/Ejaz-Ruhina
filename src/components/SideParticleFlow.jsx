import { useEffect, useRef } from 'react'

export default function SideParticleFlow({ style }) {
  const canvasRef = useRef()
  const raf = useRef()
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const SHAPES = ['crescent', 'star', 'circle', 'diamond']
    const COLORS = ['#c9a84c', '#e8c96d', '#2d9f67', '#fff8e0', '#d4af60', '#1b7a4e']

    const spawn = () => {
      const fromLeft = Math.random() > 0.5
      const side = fromLeft ? 'left' : 'right'
      particles.current.push({
        x: fromLeft ? -20 : canvas.width + 20,
        y: canvas.height * (0.1 + Math.random() * 0.8),
        vx: fromLeft ? 1.2 + Math.random() * 2 : -(1.2 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 1.5,
        spin: (Math.random() - 0.5) * 0.08,
        angle: Math.random() * Math.PI * 2,
        size: 4 + Math.random() * 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        alpha: 0,
        life: 0,
        maxLife: 180 + Math.random() * 120,
        wave: Math.random() * Math.PI * 2,
        waveAmp: 0.5 + Math.random() * 1.5,
        waveFreq: 0.02 + Math.random() * 0.03,
        side,
      })
    }

    const drawCrescent = (ctx, size) => {
      ctx.beginPath()
      ctx.arc(0, 0, size, 0.4, Math.PI * 1.6, false)
      ctx.arc(size * 0.35, 0, size * 0.75, Math.PI * 1.4, 0.6, true)
      ctx.closePath()
    }

    const drawStar = (ctx, size, points = 5) => {
      const outer = size, inner = size * 0.4
      ctx.beginPath()
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outer : inner
        const a = (i * Math.PI) / points - Math.PI / 2
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
      }
      ctx.closePath()
    }

    const drawDiamond = (ctx, size) => {
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size * 0.6, 0)
      ctx.lineTo(0, size)
      ctx.lineTo(-size * 0.6, 0)
      ctx.closePath()
    }

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      if (frame % 8 === 0 && particles.current.length < 60) spawn()

      particles.current = particles.current.filter(p => {
        p.life++
        p.angle += p.spin
        p.x += p.vx + Math.sin(p.wave + p.life * p.waveFreq) * p.waveAmp * 0.3
        p.y += p.vy + Math.sin(p.wave + p.life * p.waveFreq * 1.5) * p.waveAmp

        if (p.life < 30) p.alpha = p.life / 30
        else if (p.life > p.maxLife - 30) p.alpha = (p.maxLife - p.life) / 30
        else p.alpha = 0.7 + Math.sin(p.life * 0.05) * 0.3

        if (p.life >= p.maxLife) return false
        if (p.x < -100 || p.x > canvas.width + 100) return false

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.alpha * 0.8
        ctx.fillStyle = p.color
        ctx.shadowBlur = p.size * 2
        ctx.shadowColor = p.color

        if (p.shape === 'crescent') drawCrescent(ctx, p.size)
        else if (p.shape === 'star') drawStar(ctx, p.size)
        else if (p.shape === 'diamond') drawDiamond(ctx, p.size)
        else { ctx.beginPath(); ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2) }

        ctx.fill()

        ctx.globalAlpha = p.alpha * 0.35
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(-p.size * 0.25, -p.size * 0.25, p.size * 0.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return true
      })

      raf.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        ...style
      }}
    />
  )
}

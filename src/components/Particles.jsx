import { useEffect, useRef } from 'react'

export default function Particles({
  count = 120,
  particleColors = ['#c9a84c', '#e8c96d', '#a8c5ac', '#ffffff'],
  minSize = 1,
  maxSize = 4,
  speed = 0.5,
  connectDistance = 100,
  moveOnHover = true,
  style,
  className,
}) {
  const canvasRef = useRef()
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef([])
  const raf = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: minSize + Math.random() * (maxSize - minSize),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 0.3 + Math.random() * 0.7,
        alphaDir: Math.random() > 0.5 ? 0.005 : -0.005,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach(p => {
        // Mouse repulsion
        if (moveOnHover) {
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            p.vx -= (dx / dist) * 0.3
            p.vy -= (dy / dist) * 0.3
          }
        }

        // Dampen velocity
        p.vx *= 0.99
        p.vy *= 0.99

        // Clamp velocity
        const maxV = speed * 2
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx))
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy))

        // Random nudge
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02

        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulsate alpha
        p.alpha += p.alphaDir
        if (p.alpha > 1 || p.alpha < 0.2) p.alphaDir *= -1

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = p.size * 3
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Connect nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDistance) {
            const opacity = (1 - dist / connectDistance) * 0.25
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = a.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [count, speed, connectDistance, moveOnHover])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
      className={className}
    />
  )
}

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uAmplitude;
uniform float uSpeed;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

float noise(vec2 p) {
  return sin(p.x * 1.2 + uTime * uSpeed) * cos(p.y * 0.8 + uTime * uSpeed * 0.7) * 0.5 +
         sin(p.x * 2.3 - p.y * 1.1 + uTime * uSpeed * 1.3) * 0.3 +
         cos(p.x * 0.5 + p.y * 2.2 + uTime * uSpeed * 0.5) * 0.2;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float n = noise(p * uAmplitude);
  float n2 = noise(p * uAmplitude * 1.5 + vec2(2.1, 3.7));
  float n3 = noise(p * uAmplitude * 0.7 + vec2(-1.5, 2.3));

  vec3 col1 = uColor1 * (0.5 + 0.5 * n);
  vec3 col2 = uColor2 * (0.5 + 0.5 * n2);
  vec3 col3 = uColor3 * (0.5 + 0.5 * n3);

  float t = uv.y + n * 0.3;
  vec3 color = mix(col1, col2, smoothstep(0.0, 0.5, t));
  color = mix(color, col3, smoothstep(0.4, 1.0, t + n2 * 0.2));

  float alpha = 0.85;
  gl_FragColor = vec4(color * alpha, alpha);
}
`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export default function Aurora({ colorStops = ['#1a0a00', '#2d1a00', '#0a1a0a'], amplitude = 1.0, speed = 0.4, style }) {
  const canvasRef = useRef()
  const rafRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vert = createShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uC1 = gl.getUniformLocation(prog, 'uColor1')
    const uC2 = gl.getUniformLocation(prog, 'uColor2')
    const uC3 = gl.getUniformLocation(prog, 'uColor3')
    const uAmp = gl.getUniformLocation(prog, 'uAmplitude')
    const uSpd = gl.getUniformLocation(prog, 'uSpeed')

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1,3),16)/255
      const g = parseInt(hex.slice(3,5),16)/255
      const b = parseInt(hex.slice(5,7),16)/255
      return [r,g,b]
    }

    const c1 = hexToRgb(colorStops[0] || '#1a0a00')
    const c2 = hexToRgb(colorStops[1] || '#2d1a00')
    const c3 = hexToRgb(colorStops[2] || '#0a1a0a')

    gl.uniform3fv(uC1, c1)
    gl.uniform3fv(uC2, c2)
    gl.uniform3fv(uC3, c3)
    gl.uniform1f(uAmp, amplitude)
    gl.uniform1f(uSpd, speed)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', ...style }} />
}

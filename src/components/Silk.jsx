import { useEffect, useRef } from 'react'

const SILK_FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uNoiseIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1,0));
  float c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = uTime * uSpeed;
  vec2 p = uv * uScale;
  
  float n1 = fbm(p + vec2(t * 0.3, t * 0.1));
  float n2 = fbm(p + vec2(-t * 0.2, t * 0.15) + n1 * uNoiseIntensity);
  float n3 = fbm(p + vec2(t * 0.1, -t * 0.2) + n2 * uNoiseIntensity);
  
  float silk = n3;
  
  vec3 baseColor = uColor;
  vec3 lightColor = baseColor * 1.8 + vec3(0.1);
  vec3 darkColor = baseColor * 0.3;
  
  vec3 color = mix(darkColor, lightColor, silk);
  color += baseColor * 0.2 * sin(silk * 10.0 + t);
  
  float alpha = 0.12 + silk * 0.08;
  gl_FragColor = vec4(color, alpha);
}
`

const SILK_VERT = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export default function Silk({ color = '#c9a84c', speed = 0.4, scale = 2.5, noiseIntensity = 1.5, style }) {
  const canvasRef = useRef()
  const raf = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const vert = createShader(gl, gl.VERTEX_SHADER, SILK_VERT)
    const frag = createShader(gl, gl.FRAGMENT_SHADER, SILK_FRAG)
    const prog = gl.createProgram()
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uColor = gl.getUniformLocation(prog, 'uColor')
    const uSpeed = gl.getUniformLocation(prog, 'uSpeed')
    const uScale = gl.getUniformLocation(prog, 'uScale')
    const uNoise = gl.getUniformLocation(prog, 'uNoiseIntensity')

    const hexToRgb = h => [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255]
    gl.uniform3fv(uColor, hexToRgb(color))
    gl.uniform1f(uSpeed, speed)
    gl.uniform1f(uScale, scale)
    gl.uniform1f(uNoise, noiseIntensity)

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
      raf.current = requestAnimationFrame(render)
    }
    render()

    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', ...style }} />
}

import { useEffect, useRef } from 'react'

export class GentleAmbientSynth {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.filter = null
    this.oscillators = []
    this.isPlaying = false
    this.lfo = null
  }

  init() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    this.ctx = new AudioCtx()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)

    // Gentle low-pass warmth filter
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.setValueAtTime(420, this.ctx.currentTime)
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime)

    this.filter.connect(this.masterGain)
    this.masterGain.connect(this.ctx.destination)

    // Peaceful ambient harmonic frequencies (Soft F-Major / Neutral Pentatonic Pad)
    const freqs = [174.61, 261.63, 349.23, 523.25] // F3, C4, F4, C5

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator()
      const oscGain = this.ctx.createGain()

      // Soft sine + triangle mix
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      // Subtle detune for rich ambient swell
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime)

      oscGain.gain.setValueAtTime(0.12 / freqs.length, this.ctx.currentTime)

      osc.connect(oscGain)
      oscGain.connect(this.filter)
      osc.start()
      this.oscillators.push({ osc, gain: oscGain })
    })

    // LFO for organic breathing effect
    this.lfo = this.ctx.createOscillator()
    const lfoGain = this.ctx.createGain()
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime) // 8-second swell cycle
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime)
    this.lfo.connect(lfoGain)
    lfoGain.connect(this.filter.frequency)
    this.lfo.start()
  }

  play() {
    this.init()
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 2.5) // Gentle 2.5s fade in
    this.isPlaying = true
  }

  pause() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2) // 1.2s smooth fade out
    this.isPlaying = false
  }

  stop() {
    this.pause()
  }
}

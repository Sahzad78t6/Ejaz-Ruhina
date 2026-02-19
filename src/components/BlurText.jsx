import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function BlurText({ text, delay = 0, duration = 0.6, className, style, tag = 'span', once = true }) {
  const words = text.split(' ')
  const Tag = tag

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } }
  }

  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20, scale: 0.9 },
    visible: {
      opacity: 1, filter: 'blur(0px)', y: 0, scale: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function LetterByLetter({ text, delay = 0, duration = 0.05, className, style }) {
  const letters = text.split('')

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: duration, delayChildren: delay } }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1, y: 0, rotateX: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      style={{ display: 'inline-flex', perspective: '400px', ...style }}
      className={className}
    >
      {letters.map((l, i) => (
        <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </motion.span>
  )
}

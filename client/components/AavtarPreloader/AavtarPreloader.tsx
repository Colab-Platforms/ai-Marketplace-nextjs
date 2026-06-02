'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Logo from './Logo'
import Preloader3D from './Preloader3D'

type AavtarPreloaderProps = {
  onComplete?: () => void
  duration?: number
}

type LoadingState = {
  pct: number
  exiting: boolean
  gone: boolean
}

const BASE_DELAY = 2300
const EXIT_DELAY = 400
const EXIT_DURATION = 750

function easeProgress(raw: number) {
  return raw < 0.5
    ? 4 * raw * raw * raw
    : 1 - Math.pow(-2 * raw + 2, 3) / 2
}

function useLoaderProgress(duration: number, onComplete?: () => void): LoadingState {
  const [pct, setPct] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const delayRef = useRef<number | null>(null)
  const exitTimeoutRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const beginTimer = window.setTimeout(() => {
      const tick = (time: number) => {
        if (startRef.current === null) startRef.current = time
        const raw = Math.min((time - startRef.current) / duration, 1)
        const eased = easeProgress(raw)
        setPct(Math.round(eased * 100))

        if (raw < 1) {
          rafRef.current = window.requestAnimationFrame(tick)
          return
        }

        setPct(100)
        exitTimeoutRef.current = window.setTimeout(() => {
          setExiting(true)
          hideTimeoutRef.current = window.setTimeout(() => {
            setGone(true)
            onComplete?.()
          }, EXIT_DURATION)
        }, EXIT_DELAY)
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }, BASE_DELAY)

    delayRef.current = beginTimer

    return () => {
      if (delayRef.current !== null) window.clearTimeout(delayRef.current)
      if (exitTimeoutRef.current !== null) window.clearTimeout(exitTimeoutRef.current)
      if (hideTimeoutRef.current !== null) window.clearTimeout(hideTimeoutRef.current)
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [duration, onComplete])

  return { pct, exiting, gone }
}

function BackgroundGrid() {
  const gridStyle = useMemo(
    () => ({
      backgroundImage: `
        linear-gradient(rgba(128,157,177,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(128,157,177,.03) 1px, transparent 1px)`,
      backgroundSize: 'clamp(32px, 8vw, 64px) clamp(32px, 8vw, 64px)',
    }),
    [],
  )

  return (
    <div
      className="absolute inset-0 animate-aav-grid-fade opacity-0 pointer-events-none z-0"
      style={gridStyle}
    />
  )
}

function RadialGlow() {
  return (
    <div
      className="absolute pointer-events-none z-0 animate-aav-glow-pulse"
      style={{
        width: 'clamp(300px, 70vw, 600px)',
        height: 'clamp(300px, 70vw, 600px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,60,102,.8) 0%, transparent 70%)',
      }}
    />
  )
}

function ProgressSection({ duration, pct }: { duration: number; pct: number }) {
  return (
    <div className="relative z-10 mt-8 md:mt-12 flex flex-col items-center gap-2 px-4 sm:px-0">
      <div className="w-full max-w-[280px] sm:max-w-xs h-px bg-[rgba(128,157,177,0.1)] rounded-full overflow-hidden opacity-0 animate-aav-progress-fade">
        <div
          className="h-full w-0 bg-gradient-to-r from-slate-light to-slate-custom rounded-full shadow-[0_0_8px_rgba(128,157,177,0.5)]"
          style={{ animation: `aav-barFill ${duration}ms cubic-bezier(.4,0,.2,1) forwards 2.3s` }}
        />
      </div>
      <span className="text-xs sm:text-[11px] font-bold tracking-widest text-slate-custom opacity-0 animate-aav-progress-fade tabular-nums">
        {pct}%
      </span>
    </div>
  )
}

export default function AavtarPreloader({ onComplete, duration = 2200 }: AavtarPreloaderProps) {
  const { pct, exiting, gone } = useLoaderProgress(duration, onComplete)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 bg-navy-deep flex flex-col items-center justify-center z-[9999] overflow-hidden font-syne transition-opacity ${
        exiting ? 'animate-aav-loader-exit' : ''
      }`}
    >
      {!isMobile && <Preloader3D />}
      <BackgroundGrid />
      <RadialGlow />

      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Logo />
        </div>
        <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-slate-custom opacity-0 animate-aav-tagline-reveal text-center">
          AI Marketplace · India
        </span>
      </div>

      <ProgressSection duration={duration} pct={pct} />
    </div>
  )
}

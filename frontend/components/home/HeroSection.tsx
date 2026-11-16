'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import VariableProximity from '@/components/common/VariableProximity';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Attempt autoplay on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked – video will remain paused (fine, poster still shows)
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionScrollH = section.offsetHeight - window.innerHeight;
      const raw = (window.scrollY - sectionTop) / sectionScrollH;
      const p = Math.max(0, Math.min(1, raw));

      // Video layer: subtle scale zoom
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `scale(${1 + p * 0.3})`;
        layer1Ref.current.style.opacity = String(Math.max(0, 1 - p / 0.75));
      }
      // Radial vignette
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `scale(${1 + p * 1.4})`;
      }
      // Grid layer
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `scale(${1 + p * 0.6})`;
      }
      // Content: fade + float up
      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.max(0, 1 - p / 0.65));
        contentRef.current.style.transform = `translateY(${p * -160}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh]" id="hero">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Layer 0 — solid dark base (always visible) ── */}
        <div className="absolute inset-0 bg-[var(--background)]" />

        {/* ── Layer 1 — human_vid.mp4 full-bleed video ── */}
        <div ref={layer1Ref} className="absolute inset-0 will-change-transform">
          {/* Fade-in once video is ready */}
          <video
            ref={videoRef}
            src="/avatar_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000  ${
              videoLoaded ? 'opacity-100'  : 'opacity-0'
            }`}
          />
          {/* Dark cinematic overlay — keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/60 via-[var(--background)]/30 to-[var(--background)]/80" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_40%,var(--background)_100%)]" />
          {/* Chromatic-aberration colour wash */}
          <div className="absolute inset-0 mix-blend-color bg-[radial-gradient(ellipse_at_40%_60%,oklch(0.78_0.16_210)/18%,transparent_70%)]" />
          <div className="absolute inset-0 mix-blend-color bg-[radial-gradient(ellipse_at_60%_40%,oklch(0.68_0.27_320)/12%,transparent_70%)]" />
        </div>

        {/* ── Layer 2 — radial vignette ── */}
        <div ref={layer2Ref} className="absolute inset-0 will-change-transform pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--background)_72%)]" />
        </div>

        {/* ── Layer 3 — subtle grid ── */}
        <div ref={layer3Ref} className="absolute inset-0 will-change-transform pointer-events-none">
          <div className="absolute inset-0 grid-bg opacity-60" />
        </div>

        {/* ── Floating ambient particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { cx: '20%', cy: '30%', r: 240, color: 'oklch(0.78 0.16 210)' },
            { cx: '80%', cy: '70%', r: 200, color: 'oklch(0.68 0.27 320)' },
            { cx: '50%', cy: '85%', r: 180, color: 'oklch(0.78 0.16 210)' },
          ].map((blob, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-[120px] animate-pulse-glow"
              style={{
                left: blob.cx,
                top: blob.cy,
                width: blob.r,
                height: blob.r,
                background: blob.color,
                opacity: 0.08,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        {/* ── Orbit rings (tighter, more visible) ── */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="relative">
            {[100, 160, 230, 320].map((r, i) => (
              <div
                key={r}
                className="absolute left-1/2 top-1/2 rounded-full border border-primary/15"
                style={{
                  width: r * 2,
                  height: r * 2,
                  transform: 'translate(-50%, -50%)',
                  animation: `pulse-glow ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_var(--primary)]"
                style={{
                  ['--r' as string]: `${110 + i * 42}px`,
                  animation: `orbit ${12 + i * 3}s linear infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-2 border border-primary/20 shadow-[0_0_20px_-4px_var(--primary)]">
            <Sparkles size={12} className="animate-pulse" />
            <span>AI Agent Marketplace is live — deploy in minutes</span>
          </div>

          {/* Headline */}
          <h1
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className="mt-6 max-w-5xl leading-[0.93] tracking-tight"
          >
            <VariableProximity
              label="One Ecosystem"
              containerRef={headingRef as React.MutableRefObject<HTMLElement | null>}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              radius={200}
              falloff="linear"
              className="text-5xl sm:text-7xl md:text-[5.5rem] font-black text-primary text-glow block cursor-default"
            />
            <span className="block text-5xl sm:text-7xl md:text-[5.5rem] font-black text-foreground/90 mt-2">
              for the{' '}
              <span className="italic font-serif text-gradient animate-gradient">AI Era</span>.
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Education, automation, agents, and enterprise infrastructure — Avatar is the
            centralized platform powering AI transformation for individuals and businesses worldwide.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden glow-ring hover:scale-[1.04] active:scale-[0.98] transition-transform"
            >
              <span className="relative z-10">Start Your AI Journey</span>
              <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="#about"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-primary/20 text-sm font-medium hover:bg-primary/10 hover:border-primary/40 transition-all"
            >
              <span className="h-5 w-5 rounded-full flex items-center justify-center bg-primary/15 group-hover:bg-primary/30 transition-colors">
                <Play size={10} className="text-primary translate-x-px" />
              </span>
              Watch Overview
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60">
            <span>Scroll to explore</span>
            <ChevronDown size={14} className="animate-bounce text-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

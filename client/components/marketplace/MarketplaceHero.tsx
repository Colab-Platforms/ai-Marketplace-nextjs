'use client';

import { useRef, useEffect } from 'react';

const stats = [
  { value: '50+', label: 'AI Tools' },
  { value: '8', label: 'Categories' },
  { value: '500+', label: 'Businesses' },
  { value: '4.8★', label: 'Avg. Rating' },
];

export default function MarketplaceHero() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const onScroll = () => {
      bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" id="marketplace-hero">
      {/* Parallax background image — starts 30% above section so there's headroom to shift down */}
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&h=1080&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        className="absolute left-0 w-full object-cover pointer-events-none select-none"
        style={{ top: '-30%', height: '160%', willChange: 'transform' }}
      />

      {/* Dark + gradient overlays so text stays readable */}
      <div className="absolute inset-0 bg-avatar-deep/78 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-avatar-deep/50 via-transparent to-avatar-deep/65 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-avatar-accent/12 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-avatar-navy/20 rounded-full blur-3xl translate-y-1/2" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-avatar-silver tracking-wide uppercase">AI Agent Marketplace</span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
          Deploy AI Tools That<br />
          <span className="text-avatar-steel">Actually Work</span>
        </h1>

        <p className="text-base md:text-lg text-avatar-silver/90 leading-relaxed mb-8 max-w-2xl mx-auto">
          Browse 50+ pre-built AI agents across 8 categories. From customer support to sales automation — find the perfect AI tool for your business and go live in minutes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <a
            href="#browse"
            className="inline-flex items-center justify-center gap-2 bg-white text-avatar-dark font-semibold px-7 py-3.5 rounded-full hover:bg-avatar-ice transition-colors text-sm"
          >
            Browse All Tools
            <i className="fas fa-arrow-right text-xs" />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            Request Custom Tool
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-avatar-steel uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

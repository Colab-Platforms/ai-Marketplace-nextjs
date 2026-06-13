'use client';

import Link from 'next/link';
import { divisions } from '@/data/divisions';
import { useInView } from '@/hooks/useInView';

export default function DivisionsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28" id="divisions" ref={ref}>
      <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          Our Ecosystem
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
          Four Divisions. <span className="text-gradient">One</span> Unified Ecosystem.
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Every layer of AI adoption — covered. From learning to deployment to intelligence.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {divisions.map((division, index) => (
          <div
            key={division.id}
            className={`group relative glass rounded-2xl p-6 overflow-hidden hover:glow-ring transition-all duration-500 hover:-translate-y-1 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/15 blur-2xl group-hover:bg-accent/30 transition" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                <i className={`fas ${division.icon} text-lg`} />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{division.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{division.description}</p>
              <Link href={division.link} className="text-xs font-semibold text-primary hover:text-primary/80 transition inline-flex items-center gap-1">
                Learn more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

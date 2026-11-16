'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const agents = [
  { title: 'HR AI Agent', desc: 'Screen, schedule, onboard.' },
  { title: 'Sales AI Agent', desc: 'Prospect, qualify, close.' },
  { title: 'Support AI Agent', desc: 'Resolve tickets 24/7.' },
  { title: 'Marketing AI Agent', desc: 'Campaigns on autopilot.' },
  { title: 'Content AI Agent', desc: 'Generate at scale.' },
  { title: 'Analytics AI Agent', desc: 'Real-time intelligence.' },
];

export default function MarketplaceSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="marketplace" ref={ref}>
      <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          AI Agent Marketplace
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
          Deploy AI Agents in <span className="text-gradient italic">minutes</span> — not months
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Browse pre-built, customizable AI agents. From HR screening to sales outreach, support tickets to content generation — find the agent your business needs and deploy it instantly.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(({ title, desc }, i) => (
          <div
            key={title}
            className={`group relative glass rounded-2xl p-6 overflow-hidden hover:glow-ring transition-all duration-500 hover:-translate-y-1 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-2xl group-hover:bg-accent/40 transition" />
            <div className="relative">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary/70">
                Agent · {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 text-xl font-bold text-foreground">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
              <Link
                href="/marketplace"
                className="mt-6 inline-flex items-center gap-2 text-xs text-primary font-semibold"
              >
                Deploy <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-10 text-center transition-all duration-800 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full glass font-medium text-sm hover:bg-primary/10 transition"
        >
          Browse Full Marketplace <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

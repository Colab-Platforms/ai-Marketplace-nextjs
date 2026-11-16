'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24" id="cta" ref={ref}>
      <div className={`relative overflow-hidden rounded-[2.5rem] border border-border/60 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="CTA Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-br from-background/80 via-background/40 to-accent/20" />
        <div className="absolute inset-0 grid-bg opacity-50" />

        <div className="relative z-10 px-6 py-20 md:py-28 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Start Today</div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            Ready to <span className="text-gradient italic">Transform</span> with AI?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground mb-10">
            Whether you want to learn AI, automate your business, deploy AI agents, or build enterprise AI infrastructure — Avatar is your one-stop platform. Join thousands already building their AI future.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold overflow-hidden glow-ring hover:scale-[1.03] transition-transform"
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition" />
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full glass font-medium text-sm hover:bg-primary/10 transition"
            >
              Talk to Our Team
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">No credit card required · Free tier available · Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}

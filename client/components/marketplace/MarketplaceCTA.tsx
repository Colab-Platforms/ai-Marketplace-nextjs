'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const trustFeatures = [
  { icon: 'fa-bolt', label: 'Deploy in minutes' },
  { icon: 'fa-shield-halved', label: 'Enterprise-grade security' },
  { icon: 'fa-arrows-rotate', label: 'Cancel anytime' },
  { icon: 'fa-headset', label: '24/7 dedicated support' },
];

export default function MarketplaceCTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-avatar-ice" id="cta" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-avatar-dark rounded-3xl overflow-hidden">
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Marketplace CTA Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-avatar-deep/95 via-avatar-dark/88 to-avatar-navy/80"></div>

          <div className="relative z-10 p-10 lg:p-16">
            <div
              className={`text-center max-w-2xl mx-auto transition-all duration-800 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-avatar-steel mb-4 inline-block">
                Start Today
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                Ready to Deploy Your First AI Agent?
              </h2>
              <p className="text-avatar-silver leading-relaxed mb-8">
                Join 500+ businesses already automating their operations with Avatar AI tools. Choose a tool, deploy in minutes, and see results from day one — no technical skills required.
              </p>

              {/* Trust features */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {trustFeatures.map((f) => (
                  <span
                    key={f.label}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-avatar-silver text-xs px-4 py-2 rounded-full"
                  >
                    <i className={`fas ${f.icon} text-emerald-400 text-xs`}></i>
                    {f.label}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#browse"
                  className="inline-flex items-center justify-center gap-2 bg-white text-avatar-dark font-semibold px-8 py-3.5 rounded-full hover:bg-avatar-ice transition-colors text-sm"
                >
                  Browse All Tools
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors text-sm"
                >
                  Talk to Our Team
                </Link>
              </div>

              <p className="text-xs text-avatar-steel mt-5">
                No credit card required · Free tier available · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

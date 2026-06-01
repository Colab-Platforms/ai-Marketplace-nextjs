'use client';

import Link from 'next/link';
import { divisions } from '@/data/divisions';
import { useInView } from '@/hooks/useInView';

export default function DivisionsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-avatar-ice" id="divisions" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">Our Ecosystem</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-4">
            Eight Divisions. One Unified Ecosystem.
          </h2>
          <p className="text-avatar-slate leading-relaxed">
            Every layer of AI adoption — covered. From learning to deployment to intelligence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {divisions.map((division, index) => (
            <div
              key={division.id}
              className={`bg-white rounded-2xl p-6 border border-avatar-light/60 hover:transform hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(44,62,90,0.12)] transition-all duration-350 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 bg-avatar-ice rounded-xl flex items-center justify-center mb-5">
                <i className={`fas ${division.icon} text-avatar-accent text-lg`}></i>
              </div>
              <h3 className="font-display font-bold text-lg text-avatar-dark mb-2">{division.title}</h3>
              <p className="text-sm text-avatar-steel leading-relaxed mb-4">{division.description}</p>
              <Link href={division.link} className="text-xs font-semibold text-avatar-accent hover:underline">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

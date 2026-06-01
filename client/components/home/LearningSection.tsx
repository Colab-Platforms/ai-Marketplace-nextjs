'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const features = [
  'Hands-on workshops & intensive bootcamps',
  'Industry-recognized AI certifications',
  'Enterprise training & AI University programs',
  'AI Labs for hands-on experimentation & research'
];

export default function LearningSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-white" id="learning" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">AI Learning Division</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-5 leading-tight">
              Master AI — From Fundamentals to Enterprise Implementation
            </h2>
            <p className="text-avatar-slate leading-relaxed mb-6">
              Our AI Learning division offers a structured path from beginner to expert. Whether you&apos;re a student exploring AI for the first time, a professional adding AI skills, or a business training teams — we have programs designed for every level.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-avatar-slate">
                  <span className="w-5 h-5 bg-avatar-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-check text-avatar-accent text-[10px]"></i>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="#cta" className="inline-flex items-center justify-center gap-2 bg-avatar-dark text-white font-semibold px-7 py-3 rounded-full hover:bg-avatar-navy transition-colors text-sm">
              Explore Programs <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
          <div className={`relative transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="AI Learning Workshop"
              width={800}
              height={480}
              className="rounded-2xl shadow-xl w-full object-cover h-[480px]"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-4 border border-avatar-light/60 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-avatar-accent rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-white text-sm"></i>
                </div>
                <div>
                  <p className="font-bold text-sm text-avatar-dark">12,000+</p>
                  <p className="text-xs text-avatar-steel">Certified Graduates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

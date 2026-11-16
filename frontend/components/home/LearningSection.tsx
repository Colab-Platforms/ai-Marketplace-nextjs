'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import AILearning from "@/public/landingimage/mast_learning.jpeg"
const features = [
  'Hands-on workshops & intensive bootcamps',
  'Industry-recognized AI certifications',
  'Enterprise training & AI University programs',
  'AI Labs for hands-on experimentation & research',
];

export default function LearningSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="learning" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className={`relative aspect-5/4 rounded-3xl overflow-hidden transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <Image
            src={AILearning}
            alt="AI Learning Workshop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-background via-transparent to-primary/30 mix-blend-overlay" />
          <div className="absolute top-6 left-6 glass-strong rounded-2xl p-4">
            <div className="text-3xl font-black text-gradient">12,000+</div>
            <div className="text-xs text-muted-foreground">Certified Graduates</div>
          </div>
        </div>

        {/* Text */}
        <div className={`transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
            <span className="h-px w-8 bg-primary" />
            AI Learning Division
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
            Master AI — <span className="text-gradient">from fundamentals</span> to enterprise implementation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            A structured path from beginner to expert. For students exploring AI, professionals adding AI skills, or businesses training teams.
          </p>
          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 text-foreground/90 transition-all duration-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ transitionDelay: `${i * 60 + 300}ms` }}
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="#cta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-ring hover:scale-[1.03] transition-transform"
          >
            Explore Programs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

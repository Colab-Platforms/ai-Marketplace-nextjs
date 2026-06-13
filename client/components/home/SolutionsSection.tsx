'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import business_demo from "@/public/landingimage/business_demo.jpeg"
const solutions = [
  { icon: 'fa-comments', title: 'AI Chatbots', subtitle: '24/7 intelligent support' },
  { icon: 'fa-chart-line', title: 'Sales AI', subtitle: 'Predict & convert leads' },
  { icon: 'fa-project-diagram', title: 'Workflow AI', subtitle: 'Automate operations' },
  { icon: 'fa-chart-pie', title: 'Analytics', subtitle: 'Data-driven insights' },
];

export default function SolutionsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="solutions" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className={`order-1 lg:order-1 transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
            <span className="h-px w-8 bg-primary" />
            AI Solutions Division
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
            AI-powered solutions built for <span className="text-gradient">business growth</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Custom AI implementations — from intelligent chatbots and sales automation to workflow optimization and predictive analytics. Every solution is tailored to your industry and scale.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {solutions.map(({ icon, title, subtitle }, i) => (
              <div
                key={title}
                className={`glass rounded-xl p-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 60 + 200}ms` }}
              >
                <i className={`fas ${icon} text-primary mb-2 block`} />
                <div className="font-semibold text-sm text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
              </div>
            ))}
          </div>
          <Link href="#cta" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Request a solution demo <ArrowRight size={16} />
          </Link>
        </div>

    {/* Image */}
    <div
     className={`relative order-2 lg:order-2 aspect-5/4 rounded-3xl overflow-hidden glow-ring transition-all duration-800 delay-200 ${
      isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      >
    <Image
    src={business_demo}
    alt="AI Solutions Demo"
    fill
    className="object-cover"
    />

  <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-accent/40 mix-blend-overlay" />
  </div>
      </div>
    </section>
  );
}

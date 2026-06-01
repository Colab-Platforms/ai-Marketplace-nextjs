'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const solutions = [
  { icon: 'fa-comments', title: 'AI Chatbots', subtitle: '24/7 intelligent support' },
  { icon: 'fa-chart-line', title: 'Sales AI', subtitle: 'Predict & convert leads' },
  { icon: 'fa-project-diagram', title: 'Workflow AI', subtitle: 'Automate operations' },
  { icon: 'fa-chart-pie', title: 'Analytics', subtitle: 'Data-driven insights' }
];

export default function SolutionsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-avatar-ice" id="solutions" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Box */}
          <div className={`relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer order-2 lg:order-1 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="AI Solutions Demo"
              width={800}
              height={380}
              className="w-full h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-avatar-dark/40 flex items-center justify-center group-hover:bg-avatar-dark/50 transition-colors">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <i className="fas fa-play text-avatar-dark ml-1"></i>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-xs font-medium text-avatar-dark">See Avatar in Action — 3 min overview</p>
            </div>
          </div>

          {/* Text */}
          <div className={`order-1 lg:order-2 transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">AI Solutions Division</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-5 leading-tight">
              AI-Powered Solutions Built for Business Growth
            </h2>
            <p className="text-avatar-slate leading-relaxed mb-6">
              Our solutions division delivers custom AI implementations — from intelligent chatbots and sales automation to workflow optimization and predictive analytics. Every solution is tailored to your industry and scale.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-avatar-light/60">
                  <i className={`fas ${solution.icon} text-avatar-accent mb-2`}></i>
                  <p className="font-semibold text-sm text-avatar-dark">{solution.title}</p>
                  <p className="text-xs text-avatar-steel mt-1">{solution.subtitle}</p>
                </div>
              ))}
            </div>
            <Link href="#cta" className="inline-flex items-center gap-2 text-avatar-accent font-semibold text-sm hover:gap-3 transition-all">
              Request a Solution Demo <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

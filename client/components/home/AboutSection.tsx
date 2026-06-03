'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const features = [
  { icon: 'fa-graduation-cap', title: 'Education', subtitle: 'Learn AI end-to-end' },
  { icon: 'fa-cogs', title: 'Automation', subtitle: 'Streamline everything' },
  { icon: 'fa-robot', title: 'AI Agents', subtitle: 'Deploy in minutes' },
  { icon: 'fa-building', title: 'Enterprise', subtitle: 'Scale with confidence' }
];

export default function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-white" id="about" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Staggered Image Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <Image src="/landingimage/section1.jpeg" alt="AI Robot" width={600} height={400} className="rounded-2xl w-full h-48 object-cover shadow-lg" />
              <Image src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80" alt="AI Code" width={600} height={400} className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            </div>
            <div className="space-y-4 pt-8">
              <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" alt="AI Team" width={600} height={400} className="rounded-2xl w-full h-64 object-cover shadow-lg" />
              <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="AI Technology" width={600} height={400} className="rounded-2xl w-full h-48 object-cover shadow-lg" />
            </div>
          </div>

          {/* Text Content */}
          <div className={`transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">About Avatar</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-5 leading-tight">
              The Complete AI Infrastructure for a New Era
            </h2>
            <p className="text-avatar-slate leading-relaxed mb-6">
              Avatar is building the world&apos;s most comprehensive AI ecosystem — a single platform where anyone can learn, build, deploy, and scale AI solutions. Whether you&apos;re an individual looking to upskill, a startup automating workflows, or an enterprise transforming operations, Avatar is your centralized AI transformation partner.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-avatar-ice rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <i className={`fas ${feature.icon} text-avatar-accent text-sm`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-avatar-dark">{feature.title}</p>
                    <p className="text-xs text-avatar-steel">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="#divisions" className="inline-flex items-center gap-2 text-avatar-accent font-semibold text-sm hover:gap-3 transition-all">
              Explore Our Divisions <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import business from "@/public/landingimage/business.jpg"
import learning from "@/public/landingimage/learning.jpg"
import enterprise from "@/public/landingimage/enterprise.png"
const segments = [
  {
    icon: 'fa-user',
    badge: 'For Individuals',
    title: 'Upskill, Build & Earn with AI',
    description: 'Access world-class AI learning, earn certifications, build your AI-powered resume, boost productivity, and freelance your AI skills on the Avatar Talent Network.',
    tags: ['Learning & Certifications', 'AI Assistant', 'Resume AI', 'Productivity AI', 'Freelancing Tools'],
    image: learning,
    imageAlt: 'Individual AI Learning',
    imageLeft: true,
  },
  {
    icon: 'fa-briefcase',
    badge: 'For Businesses',
    title: 'Automate, Optimize & Scale',
    description: 'From AI customer support and CRM to marketing automation and analytics — equip your business with intelligent systems that work around the clock and grow with you.',
    tags: ['AI Customer Support', 'AI Automation', 'AI CRM', 'AI Marketing', 'AI Analytics'],
    image: business,
    imageAlt: 'Business AI Solutions',
    imageLeft: false,
  },
  {
    icon: 'fa-building',
    badge: 'For Enterprises',
    title: 'Transform Operations at Scale',
    description: 'Deploy custom AI systems, internal copilots, security AI, and full AI infrastructure across your organization. Long-term contracts, dedicated support, and enterprise-grade security.',
    tags: ['AI Operations', 'Custom AI Systems', 'Internal Copilots', 'Security AI', 'AI Infrastructure'],
    image: enterprise,
    imageAlt: 'Enterprise AI Infrastructure',
    imageLeft: true,
  },
];

export default function EnterpriseSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="enterprise" ref={ref}>
      <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          A-to-Z Solutions
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
          AI adoption for <span className="text-gradient">everyone</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Whether you&apos;re an individual, a growing business, or a global enterprise — Avatar has solutions tailored to your needs.
        </p>
      </div>

      {segments.map((segment, index) => (
        <div
          key={index}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index < segments.length - 1 ? 'mb-20' : ''}`}
        >
          <div className={`${segment.imageLeft ? 'lg:order-1' : 'lg:order-2'} relative aspect-5/4 rounded-3xl overflow-hidden glow-ring transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Image
              src={segment.image}
              alt={segment.imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
            <div className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
              {segment.badge}
            </div>
          </div>

          <div
            className={`${segment.imageLeft ? 'lg:order-2' : 'lg:order-1'} transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: `${index * 100 + 150}ms` }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
              <i className={`fas ${segment.icon} text-primary text-xs`} />
              <span className="text-xs font-semibold text-primary">{segment.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-3">{segment.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{segment.description}</p>
            <div className="flex flex-wrap gap-2">
              {segment.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-primary/30 text-primary/90">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

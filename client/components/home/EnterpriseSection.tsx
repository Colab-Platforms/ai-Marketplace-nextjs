'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const segments = [
  {
    icon: 'fa-user',
    badge: 'For Individuals',
    title: 'Upskill, Build & Earn with AI',
    description: 'Access world-class AI learning, earn certifications, build your AI-powered resume, boost productivity, and freelance your AI skills on the Avatar Talent Network.',
    tags: ['Learning & Certifications', 'AI Assistant', 'Resume AI', 'Productivity AI', 'Freelancing Tools'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    imageAlt: 'Individual AI Learning',
    imageLeft: true
  },
  {
    icon: 'fa-briefcase',
    badge: 'For Businesses',
    title: 'Automate, Optimize & Scale',
    description: 'From AI customer support and CRM to marketing automation and analytics — equip your business with intelligent systems that work around the clock and grow with you.',
    tags: ['AI Customer Support', 'AI Automation', 'AI CRM', 'AI Marketing', 'AI Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'Business AI Solutions',
    imageLeft: false
  },
  {
    icon: 'fa-building',
    badge: 'For Enterprises',
    title: 'Transform Operations at Scale',
    description: 'Deploy custom AI systems, internal copilots, security AI, and full AI infrastructure across your organization. Long-term contracts, dedicated support, and enterprise-grade security.',
    tags: ['AI Operations', 'Custom AI Systems', 'Internal Copilots', 'Security AI', 'AI Infrastructure'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    imageAlt: 'Enterprise AI Infrastructure',
    imageLeft: true
  }
];

export default function EnterpriseSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-white" id="enterprise" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">A-to-Z Solutions</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-4">
            AI Adoption for Everyone
          </h2>
          <p className="text-avatar-slate leading-relaxed">
            Whether you&apos;re an individual, a growing business, or a global enterprise — Avatar has solutions tailored to your needs.
          </p>
        </div>

        {segments.map((segment, index) => (
          <div key={index} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index < segments.length - 1 ? 'mb-20' : ''}`}>
            <div className={`${segment.imageLeft ? 'lg:order-1' : 'lg:order-2'} transition-all duration-800 delay-${index * 100} ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <Image
                src={segment.image}
                alt={segment.imageAlt}
                width={800}
                height={340}
                className="rounded-2xl shadow-lg w-full h-[340px] object-cover hover:scale-105 transition-transform duration-600"
              />
            </div>
            <div className={`${segment.imageLeft ?  'lg:order-2' : 'lg:order-1'} transition-all duration-800 delay-${index * 100 + 200} ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 bg-avatar-ice rounded-full px-4 py-1.5 mb-4">
                <i className={`fas ${segment.icon} text-avatar-accent text-xs`}></i>
                <span className="text-xs font-semibold text-avatar-accent">{segment.badge}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-avatar-dark mb-3">{segment.title}</h3>
              <p className="text-avatar-slate leading-relaxed mb-5">{segment.description}</p>
              <div className="flex flex-wrap gap-2">
                {segment.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-avatar-ice text-avatar-slate px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

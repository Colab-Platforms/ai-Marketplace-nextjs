'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import Img from "@/public/bannerimages/ai-workflow-web.jpeg";
const agents = [
  'HR AI Agent',
  'Sales AI Agent',
  'Support AI Agent',
  'Marketing AI Agent',
  'Content AI Agent',
  'Analytics AI Agent'
];

export default function MarketplaceSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      className="relative py-24 lg:py-32 bg-fixed bg-cover bg-center"
      id="marketplace"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80')" }}
      ref={ref}
    >
      <div className="absolute inset-0 bg-avatar-deep/85"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-avatar-steel mb-4 inline-block">AI Agent Marketplace</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              Deploy AI Agents in Minutes — Not Months
            </h2>
            <p className="text-avatar-silver leading-relaxed mb-6">
              Browse our marketplace of pre-built, customizable AI agents. From HR screening to sales outreach, support tickets to content generation — find the agent your business needs and deploy it instantly.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {agents.map((agent, index) => (
                <span key={index} className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full border border-white/15">
                  {agent}
                </span>
              ))}
            </div>
            <Link href="#cta" className="inline-flex items-center justify-center gap-2 bg-white text-avatar-dark font-semibold px-7 py-3 rounded-full hover:bg-avatar-ice transition-colors text-sm">
              Browse Marketplace <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
          <div className={`transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Image
              src={Img}
              alt="AI Marketplace Dashboard"
              width={800}
              height={420}
              className="rounded-2xl shadow-2xl w-full object-cover bg-transparent h-[420px] border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Workflow, Bot, Building2, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const features = [
  { Icon: GraduationCap, title: 'Education', subtitle: 'Learn AI end-to-end' },
  { Icon: Workflow, title: 'Automation', subtitle: 'Streamline everything' },
  { Icon: Bot, title: 'AI Agents', subtitle: 'Deploy in minutes' },
  { Icon: Building2, title: 'Enterprise', subtitle: 'Scale with confidence' },
];

export default function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="about" ref={ref}>
      <div className="grid lg:grid-cols-12 gap-12 items-start">

        {/* Text column */}
        <div className={`lg:col-span-7 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
            <span className="h-px w-8 bg-primary" />
            About Avatar
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5">
            The Complete <span className="text-gradient">AI Infrastructure</span> for a New Era
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Avatar is building the world&apos;s most comprehensive AI ecosystem — a single platform where anyone can learn, build, deploy, and scale AI solutions. Whether you&apos;re an individual looking to upskill, a startup automating workflows, or an enterprise transforming operations, Avatar is your centralized AI transformation partner.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {features.map(({ Icon, title, subtitle }, i) => (
              <div
                key={title}
                className={`glass rounded-2xl p-5 group hover:glow-ring transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <Icon size={18} />
                </div>
                <div className="mt-4 font-semibold text-foreground">{title}</div>
                <div className="text-sm text-muted-foreground">{subtitle}</div>
              </div>
            ))}
          </div>

          <div className={`mt-8 transition-all duration-800 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/#divisions" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Explore our divisions <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className={`lg:col-span-5 transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="relative aspect-square rounded-3xl overflow-hidden glow-ring">
            <Image
              src="/landingimage/section1.jpeg"
              alt="Avatar AI dashboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Live</div>
              <div className="mt-1 font-semibold text-foreground">AI Agent Marketplace</div>
              <div className="text-xs text-muted-foreground">Deploy intelligent agents in minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { stats } from '@/data/stats';

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const step = stat.value / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const next = [...prev];
          next[index] = Math.floor(current);
          return next;
        });
      }, 16);
    });
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" ref={sectionRef}>
      <div className={`text-center mb-14 transition-all duration-800 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          The Numbers Speak
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
          Building the future of AI adoption — <span className="text-gradient">globally</span>.
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`glass rounded-2xl p-8 text-center transition-all duration-800 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <p className="font-display text-4xl lg:text-5xl font-black text-gradient tabular-nums mb-2">
              {counters[index].toLocaleString()}{stat.suffix}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

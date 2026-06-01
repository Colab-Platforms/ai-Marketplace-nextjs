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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 16);
    });
  };

  return (
    <section className="py-20 lg:py-24 bg-avatar-dark" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
            The Numbers Speak
          </h2>
          <p className="text-avatar-steel">Building the future of AI adoption — globally.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-bold text-white mb-2 tabular-nums">
                {counters[index].toLocaleString()}{stat.suffix}
              </p>
              <p className="text-sm text-avatar-steel">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

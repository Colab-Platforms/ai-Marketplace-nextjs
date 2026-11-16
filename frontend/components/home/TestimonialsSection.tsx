'use client';

import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          Testimonials
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-3">
          Trusted by <span className="text-gradient">leaders & learners</span>
        </h2>
        <p className="text-muted-foreground">Hear from individuals and businesses who&apos;ve transformed with Avatar.</p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden -mx-6">
        <div className="flex animate-marquee pause-animation">
          {allTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="glass rounded-2xl p-6 mx-3 w-90 shrink-0 hover:glow-ring transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-primary text-xs" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

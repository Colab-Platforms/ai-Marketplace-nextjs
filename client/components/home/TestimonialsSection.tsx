'use client';

import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  // Duplicate testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-24 bg-avatar-ice overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">Testimonials</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-3">
            Trusted by Leaders & Learners
          </h2>
          <p className="text-avatar-slate">Hear from individuals and businesses who&apos;ve transformed with Avatar.</p>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden mb-5">
        <div className="flex animate-marquee hover:pause-animation">
          {allTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="bg-white rounded-2xl p-6 mx-3 w-[360px] shrink-0 border border-avatar-light/60">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-amber-400 text-xs"></i>
                ))}
              </div>
              <p className="text-sm text-avatar-slate leading-relaxed mb-4">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-avatar-dark">{testimonial.name}</p>
                  <p className="text-xs text-avatar-steel">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

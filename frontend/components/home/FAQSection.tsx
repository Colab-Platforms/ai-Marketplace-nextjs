'use client';

import { useState } from 'react';
import Image from 'next/image';
import { faqs } from '@/data/faqs';
import { useInView } from '@/hooks/useInView';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isInView } = useInView();

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24" id="faq" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

        {/* Image grid */}
        <div className={`hidden lg:block transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="grid grid-cols-2 gap-4 sticky top-32">
            <div className="relative rounded-2xl overflow-hidden h-48">
              <Image src="/landingimage/ai-drone.jpeg" alt="FAQ AI" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 mt-6">
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80" alt="FAQ AI" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 -mt-2">
              <Image src="https://images.unsplash.com/photo-1488229297570-58520851e868?w=500&q=80" alt="FAQ AI" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 mt-4">
              <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" alt="FAQ AI" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className={`transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-4">
            <span className="h-px w-8 bg-primary" />
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-8">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`glass rounded-xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'glow-ring' : ''}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-sm text-foreground pr-4">{faq.question}</span>
                  <span className={`text-primary text-lg shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`px-5 overflow-hidden transition-all duration-400 ${activeIndex === index ? 'max-h-72 pb-5' : 'max-h-0'}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

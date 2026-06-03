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
    <section className="py-20 lg:py-28 bg-white" id="faq" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Grid */}
          <div className={`hidden lg:block transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="grid grid-cols-2 gap-4 sticky top-32">
              <Image src="/landingimage/ai-drone.jpeg" alt="FAQ AI" width={500} height={300} className="rounded-2xl w-full h-48 object-cover shadow-md" />
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80" alt="FAQ AI" width={500} height={300} className="rounded-2xl w-full h-48 object-cover shadow-md mt-6" />
              <Image src="https://images.unsplash.com/photo-1488229297570-58520851e868?w=500&q=80" alt="FAQ AI" width={500} height={300} className="rounded-2xl w-full h-48 object-cover shadow-md -mt-2" />
              <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" alt="FAQ AI" width={500} height={300} className="rounded-2xl w-full h-48 object-cover shadow-md mt-4" />
            </div>
          </div>

          {/* Accordion */}
          <div className={`transition-all duration-800 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-avatar-accent mb-4 inline-block">FAQ</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-avatar-dark mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`border border-avatar-light/80 rounded-xl overflow-hidden bg-white ${
                    activeIndex === index ? 'active' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-sm text-avatar-dark pr-4">{faq.question}</span>
                    <span className={`text-avatar-accent text-lg shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`px-5 overflow-hidden transition-all duration-400 ${
                      activeIndex === index ? 'max-h-[300px] pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-sm text-avatar-slate leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

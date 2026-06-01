'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  { id: 0, image: '/bannerimages/Banner 3.png', alt: 'India Tech Hub' },
  { id: 1, image: '/bannerimages/ai-robot-interacting-with-futuristic-data-interface.png', alt: 'Digital India' },
  { id: 2, image: '/bannerimages/computer-generated-image-flag-with-logo-sun-middle.png', alt: 'AI Innovation India' },
  { id: 3, image: '/bannerimages/WhatsApp Image 2026-05-27 at 1.18.52 PM.jpeg', alt: 'Tech Growth India' }
];

const typewriterPhrases = [
  'AI Education.',
  'Business Automation.',
  'AI Agents.',
  'Enterprise Solutions.',
  'Cloud Workspace.',
  'AI Talent.',
  'Your AI Future.'
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % typewriterPhrases.length);
        timeout = setTimeout(() => {}, 300);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section className="relative h-screen min-h-[640px] max-h-[900px] overflow-hidden" id="hero">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1200 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={index === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-avatar-deep/90 via-avatar-dark/70 to-transparent"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              <span className="text-xs font-medium text-avatar-silver tracking-wide uppercase">The Operating System for the AI Era</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              <span>One Ecosystem for</span><br />
              <span className="text-avatar-steel">{typewriterText}</span>
              <span className="inline-block w-[3px] h-[1em] bg-avatar-accent ml-[2px] animate-blink align-text-bottom"></span>
            </h1>
            <p className="text-base md:text-lg text-avatar-silver/90 leading-relaxed mb-8 max-w-lg">
              From AI education and automation to enterprise infrastructure — Avatar is the centralized platform powering AI transformation for individuals and businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#cta" className="inline-flex items-center justify-center gap-2 bg-white text-avatar-dark font-semibold px-7 py-3.5 rounded-full hover:bg-avatar-ice transition-colors text-sm">
                Start Your AI Journey
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
              <Link href="#about" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors text-sm">
                <i className="fas fa-play text-xs"></i>
                Watch Overview
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-7 bg-white'
                : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

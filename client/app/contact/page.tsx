'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Integrate with email service
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for reaching out! We will get back to you soon.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradient and orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-avatar-accent/15 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] rounded-full bg-avatar-navy/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-avatar-accent/10 blur-[80px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-avatar-accent mb-3">
              Get in Touch
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-avatar-dark mb-4 leading-tight">
              We'd Love to Hear <span className="text-avatar-accent">From You</span>
            </h1>
            <p className="text-lg text-avatar-slate max-w-2xl mx-auto leading-relaxed">
              Have questions about Avatar? Our team is here to help you navigate the AI ecosystem and find the perfect solution for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="font-display text-2xl font-bold text-avatar-dark mb-8">Contact Information</h2>

              {/* Email */}
              <div className="mb-8 p-6 bg-avatar-ice rounded-2xl border border-avatar-light hover:border-avatar-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-avatar-accent/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-envelope text-avatar-accent text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-avatar-dark mb-1">Email</p>
                    <Link href="mailto:support@avatarindia.com" className="text-avatar-accent hover:text-avatar-navy transition font-medium break-all">
                      support@avatarindia.com
                    </Link>
                    <p className="text-xs text-avatar-steel mt-2">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8 p-6 bg-avatar-ice rounded-2xl border border-avatar-light hover:border-avatar-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-avatar-accent/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-phone text-avatar-accent text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-avatar-dark mb-1">Phone</p>
                    <Link href="tel:+919136774304" className="text-avatar-accent hover:text-avatar-navy transition font-medium">
                      +91 913 677 4304
                    </Link>
                    <p className="text-xs text-avatar-steel mt-2">Mon - Fri, 9AM - 6PM IST</p>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="mb-8 p-6 bg-avatar-ice rounded-2xl border border-avatar-light hover:border-avatar-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-avatar-accent/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-map-marker-alt text-avatar-accent text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-avatar-dark mb-1">Office</p>
                    <p className="text-sm text-avatar-slate">
                      India
                    </p>
                    <p className="text-xs text-avatar-steel mt-2">Headquarters based in India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-sm font-semibold text-avatar-dark mb-4">Connect With Us</p>
                <div className="flex gap-3">
                  <Link href="#" className="w-10 h-10 bg-avatar-accent/10 border border-avatar-accent/30 rounded-lg flex items-center justify-center text-avatar-accent hover:bg-avatar-accent hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in text-sm" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-avatar-accent/10 border border-avatar-accent/30 rounded-lg flex items-center justify-center text-avatar-accent hover:bg-avatar-accent hover:text-white transition-colors">
                    <i className="fab fa-twitter text-sm" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-avatar-accent/10 border border-avatar-accent/30 rounded-lg flex items-center justify-center text-avatar-accent hover:bg-avatar-accent hover:text-white transition-colors">
                    <i className="fab fa-instagram text-sm" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-avatar-accent/10 border border-avatar-accent/30 rounded-lg flex items-center justify-center text-avatar-accent hover:bg-avatar-accent hover:text-white transition-colors">
                    <i className="fab fa-youtube text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-avatar-ice via-white to-avatar-ice border border-avatar-light rounded-2xl p-10 shadow-lg shadow-avatar-accent/5">
              <h2 className="font-display text-2xl font-bold text-avatar-dark mb-2 pb-4 border-b border-avatar-light">
                Send us a Message
              </h2>
              <p className="text-avatar-slate mb-8 text-sm">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-avatar-dark mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                        <i className="fas fa-user text-[12px]" />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-avatar-dark mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                        <i className="fas fa-envelope text-[12px]" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-avatar-dark mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                      <i className="fas fa-pencil text-[12px]" />
                    </span>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-avatar-dark mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-avatar-steel pointer-events-none">
                      <i className="fas fa-comment text-[12px]" />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-avatar-accent hover:bg-avatar-navy text-white text-sm font-semibold shadow-md shadow-avatar-accent/20 hover:shadow-avatar-navy/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-[12px]" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fas fa-arrow-right text-[10px]" />
                    </>
                  )}
                </button>

                <p className="text-xs text-avatar-steel text-center">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-avatar-ice/40 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-avatar-dark mb-4">
              Frequently Asked <span className="text-avatar-accent">Questions</span>
            </h2>
            <p className="text-avatar-slate">Find answers to common questions about Avatar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'How do I get started with Avatar?',
                answer: 'Sign up for a free account on our platform. No credit card required. You can start exploring AI tools and solutions immediately.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, digital wallets, and bank transfers for enterprise customers.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! All new users get access to our complete platform for free. Upgrade to a paid plan when you\'re ready.'
              },
              {
                question: 'How long does setup take?',
                answer: 'Setup is quick and easy - usually takes less than 5 minutes. Our team can also assist with custom configurations.'
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white border border-avatar-light rounded-xl hover:border-avatar-accent/50 transition-colors">
                <h3 className="font-semibold text-avatar-dark mb-2 flex items-start gap-3">
                  <span className="text-avatar-accent mt-1">
                    <i className="fas fa-check-circle text-sm" />
                  </span>
                  {faq.question}
                </h3>
                <p className="text-sm text-avatar-slate leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-avatar-slate mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@avatarindia.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-avatar-accent text-white font-medium hover:bg-avatar-navy transition-colors"
              >
                <i className="fas fa-envelope" />
                Email Us
              </Link>
              <Link
                href="tel:+919136774304"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-avatar-accent text-avatar-accent font-medium hover:bg-avatar-accent/5 transition-colors"
              >
                <i className="fas fa-phone" />
                Call Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

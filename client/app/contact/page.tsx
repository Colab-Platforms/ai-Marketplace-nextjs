'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#f0f2f5]">

      {/* ─── Hero Banner ─── */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a111c] via-[#0f1d30] to-[#080f1a]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-[26rem] h-[26rem] rounded-full bg-slate-400/10 blur-[140px]" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-slate-500/10 blur-[110px]" />

        <div className="relative z-10 text-center px-4">
          <p className="text-slate-400 text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">
            We&apos;d love to hear from you
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Contact <span className="text-slate-300">Us</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Contact Us</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="py-20 bg-[#f0f2f5]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* ── Contact Form (left, 3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden shadow-2xl">

                {/* dark header */}
                <div className="bg-[#1a2535] px-8 py-7">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      <i className="fas fa-paper-plane text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">Send a Message</h3>
                      <p className="text-slate-400 text-xs mt-0.5">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* form body */}
                <div className="bg-white px-8 py-8 md:px-10 md:py-10">
                  {submitted && (
                    <div className="mb-6 px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-700 text-sm font-medium">
                      <i className="fas fa-check-circle text-emerald-500 text-lg" />
                      Thank you! Your message has been sent. We&apos;ll get back to you soon.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f8f9fb] text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Email Address"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f8f9fb] text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100 hover:border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f8f9fb] text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100 hover:border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f8f9fb] text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100 hover:border-gray-300 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-gray-400">
                        <i className="fas fa-lock mr-1.5" />
                        Your information is safe with us
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-lg bg-[#1a2535] hover:bg-[#243040] text-white text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2.5"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin text-xs" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane text-xs" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* ── Get In Touch (right, 2 cols) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Header */}
              <div className="mb-2">
                <p className="text-slate-500 font-semibold text-xs tracking-[0.2em] uppercase mb-2">Contact Us</p>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Get In Touch</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Have questions, feedback, or need assistance? Our team is ready to help.
                </p>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: 'fa-phone', label: 'Call Us', value: '+91 9136774304', href: 'tel:+919136774304', desc: 'Mon–Sat, 9am–9pm' },
                  { icon: 'fa-envelope', label: 'Email Us', value: 'support@avatarindia.com', href: 'mailto:support@avatarindia.com', desc: 'We reply within 24h' },
                  { icon: 'fa-map-marker-alt', label: 'Our Office', value: 'Mumbai, Maharashtra, India', href: undefined, desc: 'Visit us anytime' },
                ].map(({ icon, label, value, href, desc }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl px-5 py-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#1a2535] flex items-center justify-center shrink-0">
                      <i className={`fas ${icon} text-white text-sm`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <Link href={href} className="text-sm font-semibold text-slate-800 hover:text-slate-600 transition-colors truncate block">
                          {value}
                        </Link>
                      ) : (
                        <p className="text-sm font-semibold text-slate-800">{value}</p>
                      )}
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Follow Us */}
              <div>
                <p className="text-sm font-bold text-slate-700 mb-3">Follow Us</p>
                <div className="flex items-center gap-2.5">
                  {[
                    { href: 'https://www.facebook.com/share/1JpYwqS4jQ/', icon: 'fa-facebook-f', bg: 'bg-[#1877f2] hover:bg-[#1465d0]' },
                    { href: '#', icon: 'fa-twitter', bg: 'bg-[#1da1f2] hover:bg-[#1a91da]' },
                    { href: 'https://www.instagram.com/avatar.india/', icon: 'fa-instagram', bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400 hover:opacity-90' },
                    { href: 'https://www.youtube.com/@AvatarIndia-g1i', icon: 'fa-youtube', bg: 'bg-[#ff0000] hover:bg-[#cc0000]' },
                  ].map(({ href, icon, bg }) => (
                    <Link
                      key={icon}
                      href={href}
                      className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm hover:shadow-md`}
                    >
                      <i className={`fab ${icon} text-xs`} />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

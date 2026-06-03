'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Role = 'User' | 'Vendor';

const benefits = [
  { icon: 'fa-rocket', label: 'Fast Onboarding', desc: 'Set up your profile and go live in minutes' },
  { icon: 'fa-store', label: 'Vendor Dashboard', desc: 'List AI tools and reach thousands of buyers' },
  { icon: 'fa-users', label: 'AI Community', desc: 'Join learners, builders, and innovators' },
];

const trustStats = [
  { value: '10K+', label: 'Members' },
  { value: '150+', label: 'Vendors' },
  { value: '4.9★', label: 'Rating' },
];

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('User');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* ── Left dark panel ── */}
      <aside className="hidden lg:flex w-[44%] xl:w-[42%] flex-col bg-avatar-deep relative overflow-hidden">

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full bg-avatar-accent/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-avatar-navy/50 blur-[90px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/3 w-45 h-45 rounded-full bg-avatar-accent/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-12 xl:p-16">

          {/* Logo */}
          <Link href="/" className="inline-block">
            <Image
              src="/Aavtat logo.svg"
              alt="Avatar"
              width={130}
              height={36}
              className="brightness-0 invert opacity-90"
            />
          </Link>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center py-12">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-avatar-steel">
                Join the AI Revolution
              </span>
            </div>

            <h2 className="font-display text-[2.1rem] xl:text-[2.5rem] font-bold text-white leading-[1.18] mb-5">
              Launch your AI<br />
              <span className="text-avatar-steel">journey today</span>
            </h2>

            <p className="text-avatar-silver/70 text-sm leading-relaxed mb-10 max-w-70">
              Create your Avatar account to access AI tools, build your store, and
              connect with a growing community of innovators.
            </p>

            <div className="space-y-5">
              {benefits.map((b) => (
                <div key={b.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/7 border border-white/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${b.icon} text-[13px] text-avatar-steel`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{b.label}</p>
                    <p className="text-xs text-avatar-steel/80 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight badge */}
            <div className="mt-10 flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4">
              <i className="fas fa-gift text-avatar-accent text-sm mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white/90">Free to get started</p>
                <p className="text-xs text-avatar-steel mt-0.5">
                  No credit card required. Upgrade anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Trust stats */}
          <div className="border-t border-white/8 pt-8">
            <p className="text-xs text-avatar-steel mb-5">
              Trusted by thousands of innovators across India
            </p>
            <div className="flex items-center gap-8">
              {trustStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <p className="font-display text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-avatar-steel mt-0.5">{s.label}</p>
                  </div>
                  {i < trustStats.length - 1 && (
                    <div className="w-px h-8 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 sm:px-10 lg:px-14 xl:px-20 py-14 overflow-y-auto">

        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/">
            <Image src="/Aavtat logo.svg" alt="Avatar" width={110} height={30} />
          </Link>
        </div>

        <div className="w-full max-w-105">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-avatar-accent mb-3">
              Create account
            </p>
            <h1 className="font-display text-[1.9rem] font-bold text-avatar-dark leading-tight mb-2">
              Join Avatar today
            </h1>
            <p className="text-sm text-avatar-slate leading-relaxed">
              Set up your profile and unlock the full AI ecosystem
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-avatar-steel mb-2.5">
              I want to join as
            </p>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-avatar-ice rounded-2xl">
              {(['User', 'Vendor'] as Role[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRole(opt)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    role === opt
                      ? 'bg-white text-avatar-dark shadow-sm shadow-avatar-navy/10'
                      : 'text-avatar-slate hover:text-avatar-dark'
                  }`}
                >
                  <i className={`fas ${opt === 'User' ? 'fa-user' : 'fa-store'} shrink-0 text-[10px]`} />
                  {opt}
                  {opt === 'Vendor' && (
                    <span className="text-[9px] font-bold bg-avatar-accent/10 text-avatar-accent px-1.5 py-0.5 rounded-full">
                      PRO
                    </span>
                  )}
                </button>
              ))}
            </div>
            {role === 'Vendor' && (
              <p className="text-xs text-avatar-steel mt-2 pl-1">
                <i className="fas fa-info-circle mr-1 text-avatar-accent" />
                Vendor accounts unlock your AI tool storefront
              </p>
            )}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                    <i className="fas fa-user text-[10px]" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                    <i className="fas fa-envelope text-[10px]" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@co.com"
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                  />
                </div>
              </div>
            </div>

            {/* Vendor fields */}
            {role === 'Vendor' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                    Company name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                      <i className="fas fa-building text-[10px]" />
                    </span>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                    Website
                    <span className="text-avatar-steel font-normal ml-1">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                      <i className="fas fa-globe text-[10px]" />
                    </span>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                  <i className="fas fa-lock text-[10px]" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-9 pr-11 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition"
                  aria-label="Toggle password visibility"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`} />
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel">
                  <i className="fas fa-lock text-[10px]" />
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  className="w-full pl-9 pr-11 py-3 rounded-xl border border-avatar-light bg-avatar-ice/40 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition"
                  aria-label="Toggle confirm password visibility"
                >
                  <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`} />
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-avatar-light accent-avatar-navy cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-avatar-slate leading-snug">
                I agree to the{' '}
                <Link href="#" className="font-medium text-avatar-navy hover:text-avatar-dark transition">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-medium text-avatar-navy hover:text-avatar-dark transition">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-avatar-dark via-avatar-navy to-avatar-accent text-white text-sm font-semibold shadow-lg shadow-avatar-navy/25 hover:shadow-avatar-navy/40 hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 mt-1"
            >
              Create {role} account
              <i className="fas fa-arrow-right text-[10px]" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-avatar-light" />
            <span className="text-xs text-avatar-silver font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-avatar-light" />
          </div>

          {/* Google */}
          <button className="w-full py-3 rounded-xl border border-avatar-light bg-white text-sm font-medium text-avatar-slate hover:bg-avatar-ice/60 hover:border-avatar-silver transition-all duration-200 flex items-center justify-center gap-3 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-avatar-slate mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-avatar-navy hover:text-avatar-dark transition">
              Sign in
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-8 opacity-50">
            <i className="fas fa-shield-alt text-avatar-steel text-[10px]" />
            <p className="text-[11px] text-avatar-steel">256-bit SSL · SOC 2 · No credit card required</p>
          </div>

        </div>
      </div>
    </div>
  );
}

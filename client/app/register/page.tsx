'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Role = 'User' | 'Vendor';

const leftFeatures = [
  {
    icon: 'fa-rocket',
    label: 'Discover & Use AI Tools',
    desc: 'Access 10,000+ AI tools and solutions trusted by professionals.',
  },
  {
    icon: 'fa-store',
    label: 'Launch Your AI Store',
    desc: 'List your AI tools, reach more buyers and grow your revenue.',
  },
  {
    icon: 'fa-users',
    label: 'Join a Thriving Community',
    desc: 'Connect with builders, innovators and AI enthusiasts.',
  },
];

const vendorBenefits = [
  { icon: 'fa-users', label: 'Reach 10,000+', sub: 'active AI buyers' },
  { icon: 'fa-list', label: 'List unlimited', sub: 'AI tools' },
  { icon: 'fa-th-large', label: 'Dedicated vendor', sub: 'dashboard' },
  { icon: 'fa-check-circle', label: 'Fast approval &', sub: 'ongoing support' },
];

const trustStats = [
  { value: '10K+', label: 'Members' },
  { value: '150+', label: 'Vendors' },
  { value: '4.9★', label: 'Rating' },
];

const passwordRules = [
  { key: 'length', label: '8+ characters' },
  { key: 'upper', label: 'One uppercase letter' },
  { key: 'number', label: 'One number' },
  { key: 'special', label: 'One special character' },
];

function checkPassword(pwd: string) {
  return {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('User');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [countryCode] = useState('+91');

  const pwdCheck = checkPassword(password);

  const inputClass =
    'w-full pl-10 pr-4 py-3 rounded-xl border border-avatar-light bg-avatar-ice/50 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8';

  return (
    <div className="flex min-h-screen">

      {/* ── Left dark panel ── */}
      <aside className="hidden lg:flex w-[42%] xl:w-[40%] flex-col bg-avatar-deep relative overflow-hidden">

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-avatar-accent/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-avatar-navy/50 blur-[90px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-avatar-accent/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">

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
          <div className="flex-1 flex flex-col justify-center py-10">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-7 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-avatar-steel">
                Join the AI Revolution
              </span>
            </div>

            <h2 className="font-display text-[2rem] xl:text-[2.4rem] font-bold text-white leading-[1.15] mb-5">
              Buy, Sell &amp; Scale<br />
              with <span className="text-avatar-accent">AI</span>
            </h2>

            <p className="text-avatar-silver/70 text-sm leading-relaxed mb-9 max-w-72">
              Discover powerful AI tools, launch your marketplace store, and connect
              with thousands of AI-driven businesses.
            </p>

            <div className="space-y-4">
              {leftFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/7 border border-white/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${f.icon} text-[12px] text-avatar-steel`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{f.label}</p>
                    <p className="text-xs text-avatar-steel/80 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}

              {/* Free badge */}
              <div className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4 mt-2">
                <i className="fas fa-gift text-avatar-accent text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">It&apos;s free to get started</p>
                  <p className="text-xs text-avatar-steel mt-0.5">No credit card required. Upgrade anytime.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust stats */}
          <div className="border-t border-white/8 pt-7">
            <p className="text-xs text-avatar-steel mb-4">Trusted by AI innovators across India</p>
            <div className="flex items-center gap-6 mb-6">
              {trustStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <div>
                    <p className="font-display text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-avatar-steel mt-0.5">{s.label}</p>
                  </div>
                  {i < trustStats.length - 1 && <div className="w-px h-7 bg-white/10" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[11px] text-avatar-steel/60">
              <span className="flex items-center gap-1.5"><i className="fas fa-lock text-[9px]" /> Secure Registration</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-shield-alt text-[9px]" /> SOC 2 Compliant</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-gift text-[9px]" /> No Credit Card</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-start justify-center bg-white px-5 sm:px-8 lg:px-10 xl:px-16 py-10 overflow-y-auto">

        <div className="w-full max-w-[480px] pt-2">

          {/* Header */}
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-avatar-accent mb-2.5">
              Create your account
            </p>
            <h1 className="font-display text-[1.85rem] font-bold text-avatar-dark leading-tight mb-1.5">
              Join Avatar today
            </h1>
            <p className="text-sm text-avatar-slate">
              Set up your profile and unlock the full AI ecosystem
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-avatar-steel mb-2">
              I want to join as
            </p>
            <div className="grid grid-cols-2 gap-2 p-1 bg-avatar-ice rounded-2xl border border-avatar-light">
              {/* User option */}
              <button
                type="button"
                onClick={() => setRole('User')}
                className={`flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  role === 'User'
                    ? 'bg-white text-avatar-dark shadow-sm shadow-avatar-navy/10 border border-avatar-light'
                    : 'text-avatar-slate hover:text-avatar-dark'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-user text-[11px]" />
                  <span>User</span>
                </div>
                <span className="text-[11px] font-normal text-avatar-steel">Discover &amp; use AI tools</span>
              </button>

              {/* Vendor option */}
              <button
                type="button"
                onClick={() => setRole('Vendor')}
                className={`flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  role === 'Vendor'
                    ? 'bg-white text-avatar-dark shadow-sm shadow-avatar-navy/10 border border-avatar-accent/30'
                    : 'text-avatar-slate hover:text-avatar-dark'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-store text-[11px]" />
                  <span>Vendor</span>
                  <span className="text-[9px] font-bold bg-avatar-accent text-white px-1.5 py-0.5 rounded-full leading-none">
                    Seller
                  </span>
                </div>
                <span className="text-[11px] font-normal text-avatar-steel">Sell your AI tools</span>
              </button>
            </div>
          </div>

          {/* Vendor benefits */}
          {role === 'Vendor' && (
            <div className="mb-5 bg-blue-50/60 border border-avatar-accent/15 rounded-2xl p-4">
              <p className="text-[11px] font-semibold text-avatar-dark mb-3">Why sell on Avatar?</p>
              <div className="grid grid-cols-2 gap-2">
                {vendorBenefits.map((b) => (
                  <div key={b.label} className="flex items-start gap-2.5 bg-white rounded-xl p-2.5 border border-avatar-light shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-avatar-ice flex items-center justify-center shrink-0 mt-0.5">
                      <i className={`fas ${b.icon} text-avatar-accent text-[10px]`} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-avatar-dark leading-tight">{b.label}</p>
                      <p className="text-[10px] text-avatar-steel leading-tight mt-0.5">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>

            {/* Full name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Full name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-user text-[10px]" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Email address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-envelope text-[10px]" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Mobile number */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">Mobile number</label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl border border-avatar-light bg-avatar-ice/50 text-sm text-avatar-dark shrink-0 cursor-default select-none">
                  <i className="fas fa-phone text-avatar-steel text-[10px]" />
                  <span className="font-medium">{countryCode}</span>
                  <i className="fas fa-chevron-down text-avatar-steel text-[9px]" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  className="flex-1 px-4 py-3 rounded-xl border border-avatar-light bg-avatar-ice/50 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                />
              </div>
              <p className="text-[11px] text-avatar-steel mt-1.5 pl-0.5">
                We&apos;ll send you a verification code
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                  <i className="fas fa-lock text-[10px]" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass + ' pr-11'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition"
                  aria-label="Toggle password"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`} />
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">Confirm password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                  <i className="fas fa-lock text-[10px]" />
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  className={inputClass + ' pr-11'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition"
                  aria-label="Toggle confirm password"
                >
                  <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`} />
                </button>
              </div>
            </div>

            {/* Password rules */}
            <div className="bg-avatar-ice/70 border border-avatar-light rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-avatar-dark mb-2">Password must contain:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {passwordRules.map((r) => {
                  const met = pwdCheck[r.key as keyof typeof pwdCheck];
                  return (
                    <div key={r.key} className="flex items-center gap-1.5">
                      <i className={`fas fa-check text-[9px] ${met ? 'text-emerald-500' : 'text-avatar-silver'}`} />
                      <span className={`text-[11px] ${met ? 'text-avatar-dark' : 'text-avatar-steel'}`}>
                        {r.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-avatar-light accent-avatar-navy cursor-pointer shrink-0"
              />
              <span className="text-sm text-avatar-slate leading-snug">
                I agree to the{' '}
                <Link href="#" className="font-medium text-avatar-accent hover:text-avatar-navy transition underline-offset-2 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-medium text-avatar-accent hover:text-avatar-navy transition underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Vendor confirmation */}
            {role === 'Vendor' && (
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-avatar-light accent-avatar-navy cursor-pointer shrink-0"
                />
                <span className="text-sm text-avatar-slate leading-snug flex items-center gap-1 flex-wrap">
                  I confirm that I own or have the rights to distribute the AI tools I submit.
                  <button type="button" className="text-avatar-steel hover:text-avatar-slate transition shrink-0" aria-label="More info">
                    <i className="fas fa-info-circle text-[11px]" />
                  </button>
                </span>
              </label>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-avatar-accent hover:bg-avatar-navy text-white text-sm font-semibold shadow-md shadow-avatar-accent/20 hover:shadow-avatar-navy/30 transition-all duration-200 flex items-center justify-center gap-2 mt-1"
            >
              {role === 'Vendor' ? 'Become a Vendor' : 'Create Account'}
              <i className="fas fa-arrow-right text-[10px]" />
            </button>
          </form>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex -space-x-2">
              {['bg-blue-400', 'bg-emerald-400', 'bg-violet-400'].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}
                >
                  <i className="fas fa-user text-white text-[8px]" />
                </div>
              ))}
            </div>
            <p className="text-xs text-avatar-slate">
              Join <span className="font-semibold text-avatar-dark">10,000+</span> AI professionals already using Avatar
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-avatar-light" />
            <span className="text-xs text-avatar-silver font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-avatar-light" />
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-xl border border-avatar-light bg-white text-sm font-medium text-avatar-slate hover:bg-avatar-ice/60 hover:border-avatar-silver transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="py-3 rounded-xl border border-avatar-light bg-white text-sm font-medium text-avatar-slate hover:bg-avatar-ice/60 hover:border-avatar-silver transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          {/* Footer links */}
          <p className="text-center text-sm text-avatar-slate mt-5">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-avatar-accent hover:text-avatar-navy transition">
              Sign in
            </Link>
          </p>
          <p className="text-center text-xs text-avatar-steel mt-2">
            Need help registering?{' '}
            <Link href="#" className="font-medium text-avatar-steel hover:text-avatar-slate transition underline underline-offset-2">
              Contact Support
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

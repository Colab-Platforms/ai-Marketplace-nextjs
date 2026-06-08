'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/slices/authSlice';
import {
  type Role,
  LEFT_FEATURES,
  TRUST_STATS,
  SOCIAL_AVATAR_COLORS,
  INPUT_CLASS,
} from '@/data/auth';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.auth.error);
  const isSubmitting = useAppSelector((state) => state.auth.loading);

  const [role, setRole] = useState<Role>('Buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      setSuccessMessage(`Welcome back, ${result.user.firstName ?? result.user.name ?? 'User'}! Redirecting…`);
      setTimeout(() => {
        router.push(result.user.role === 'Vendor' ? '/dashboard' : '/marketplace');
      }, 1200);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-avatar-accent/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-avatar-navy/50 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-avatar-accent/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-7 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-avatar-steel">
                Secure AI Workspace
              </span>
            </div>

            <h2 className="font-display text-[2rem] xl:text-[2.4rem] font-bold text-white leading-[1.15] mb-5">
              Buy, Sell &amp; Scale<br />
              with <span className="text-avatar-accent">AI</span>
            </h2>

            <p className="text-avatar-silver/70 text-sm leading-relaxed mb-9 max-w-72">
              Access your personalized AI marketplace, manage your vendor
              dashboard, and continue your learning journey.
            </p>

            <div className="space-y-4">
              {LEFT_FEATURES.map((f) => (
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

              <div className="mt-8 flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4">
                <i className="fas fa-shield-alt text-emerald-400 text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">Enterprise-grade security</p>
                  <p className="text-xs text-avatar-steel mt-0.5">
                    256-bit SSL encryption · SOC 2 compliant · Your data is always safe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-7">
            <p className="text-xs text-avatar-steel mb-4">Trusted by AI innovators across India</p>
            <div className="flex items-center gap-6 mb-6">
              {TRUST_STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <div>
                    <p className="font-display text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-avatar-steel mt-0.5">{s.label}</p>
                  </div>
                  {i < TRUST_STATS.length - 1 && <div className="w-px h-7 bg-white/10" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[11px] text-avatar-steel/60">
              <span className="flex items-center gap-1.5"><i className="fas fa-lock text-[9px]" /> Secure Login</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-shield-alt text-[9px]" /> SOC 2 Compliant</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-user-shield text-[9px]" /> Privacy First</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-5 sm:px-8 lg:px-10 xl:px-16 py-12 overflow-y-auto">
        <div className="w-full max-w-[420px]">

          {/* Header */}
          <div className="mb-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-avatar-accent mb-2.5">
              Welcome back
            </p>
            <h1 className="font-display text-[1.85rem] font-bold text-avatar-dark leading-tight mb-1.5">
              Sign in to Avatar
            </h1>
            <p className="text-sm text-avatar-slate">
              Access your workspace and continue your AI journey
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-avatar-steel mb-3">
              Signing in as
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('Buyer')}
                className={`relative flex flex-col items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  role === 'Buyer'
                    ? 'border-avatar-navy bg-avatar-navy/4 shadow-sm'
                    : 'border-avatar-light bg-white hover:border-avatar-silver hover:bg-avatar-ice/40'
                }`}
              >
                {role === 'Buyer' && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-avatar-navy flex items-center justify-center shadow-sm">
                    <i className="fas fa-check text-white text-[8px]" />
                  </span>
                )}
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === 'Buyer' ? 'bg-avatar-navy text-white' : 'bg-avatar-ice text-avatar-steel'}`}>
                  <i className="fas fa-user text-[15px]" />
                </span>
                <div>
                  <p className={`text-sm font-bold leading-none mb-1 ${role === 'Buyer' ? 'text-avatar-dark' : 'text-avatar-slate'}`}>Buyer</p>
                  <p className={`text-[11px] leading-snug ${role === 'Buyer' ? 'text-avatar-slate' : 'text-avatar-silver'}`}>Browse &amp; use AI tools</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('Vendor')}
                className={`relative flex flex-col items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  role === 'Vendor'
                    ? 'border-avatar-accent bg-avatar-accent/[0.04] shadow-sm'
                    : 'border-avatar-light bg-white hover:border-avatar-silver hover:bg-avatar-ice/40'
                }`}
              >
                {role === 'Vendor' && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-avatar-accent flex items-center justify-center shadow-sm">
                    <i className="fas fa-check text-white text-[8px]" />
                  </span>
                )}
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === 'Vendor' ? 'bg-avatar-accent text-white' : 'bg-avatar-ice text-avatar-steel'}`}>
                  <i className="fas fa-store text-[15px]" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className={`text-sm font-bold leading-none ${role === 'Vendor' ? 'text-avatar-dark' : 'text-avatar-slate'}`}>Vendor</p>
                    <span className="text-[8px] font-bold bg-avatar-accent text-white px-1.5 py-0.5 rounded-full leading-none tracking-wide">SELLER</span>
                  </div>
                  <p className={`text-[11px] leading-snug ${role === 'Vendor' ? 'text-avatar-slate' : 'text-avatar-silver'}`}>Manage your AI store</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">Email address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                  <i className="fas fa-envelope text-[11px]" />
                </span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@company.com" className={INPUT_CLASS} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-avatar-dark">Password</label>
                <Link href="#" className="text-xs font-medium text-avatar-accent hover:text-avatar-navy transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                  <i className="fas fa-lock text-[11px]" />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className={INPUT_CLASS + ' pr-11'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition" aria-label="Toggle password visibility">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`} />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-0.5">
              <input type="checkbox" className="w-4 h-4 rounded border-avatar-light accent-avatar-navy cursor-pointer" />
              <span className="text-sm text-avatar-slate">Remember me for 30 days</span>
            </label>

            {authError && !successMessage && (
              <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                <i className="fas fa-exclamation-circle text-rose-500 text-sm mt-0.5 shrink-0" />
                <p className="text-sm text-rose-600 leading-snug">{authError}</p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <i className="fas fa-check-circle text-emerald-500 text-sm mt-0.5 shrink-0" />
                <p className="text-sm text-emerald-700 leading-snug">{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !!successMessage}
              className="w-full py-3.5 rounded-xl bg-avatar-accent hover:bg-avatar-navy text-white text-sm font-semibold shadow-md shadow-avatar-accent/20 hover:shadow-avatar-navy/30 transition-all duration-200 flex items-center justify-center gap-2 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><i className="fas fa-spinner fa-spin text-[11px]" /> Signing in…</>
              ) : successMessage ? (
                <><i className="fas fa-check text-[11px]" /> Redirecting…</>
              ) : (
                <>{`Continue as ${role}`} <i className="fas fa-arrow-right text-[10px]" /></>
              )}
            </button>
          </form>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex -space-x-2">
              {SOCIAL_AVATAR_COLORS.map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                  <i className="fas fa-user text-white text-[8px]" />
                </div>
              ))}
            </div>
            <p className="text-xs text-avatar-slate">
              Join <span className="font-semibold text-avatar-dark">10,000+</span> AI professionals already using Avatar
            </p>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-avatar-light" />
            <span className="text-xs text-avatar-silver font-medium">or continue with</span>
            <div className="flex-1 h-px bg-avatar-light" />
          </div>

          <p className="text-center text-sm text-avatar-slate mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-avatar-accent hover:text-avatar-navy transition">Create one free</Link>
          </p>
          <p className="text-center text-xs text-avatar-steel mt-2">
            Need help signing in?{' '}
            <Link href="#" className="font-medium text-avatar-steel hover:text-avatar-slate transition underline underline-offset-2">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

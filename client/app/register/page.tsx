'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthError } from '@/redux/slices/authSlice';
import type { RootState, AppDispatch } from '@/redux/store';
import {
  type Role,
  LEFT_FEATURES,
  TRUST_STATS,
  VENDOR_BENEFITS,
  PASSWORD_RULES,
  SOCIAL_AVATAR_COLORS,
  INPUT_CLASS,
  checkPassword,
} from '@/data/auth';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading: isSubmitting, error: sliceError } = useSelector(
    (state: RootState) => state.auth,
  );

  const [role, setRole] = useState<Role>('Buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode] = useState('+91');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const pwdCheck = checkPassword(password);
  const allPasswordRulesMet = Object.values(pwdCheck).every(Boolean);
  const displayedError = localError || sliceError;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!allPasswordRulesMet) {
      setLocalError('Please make sure your password meets all requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      await dispatch(
        registerUser({ firstName, lastName, email, password, role }),
      ).unwrap();
      setSuccessMessage(`Account created successfully! Welcome to Avatar, ${firstName || 'User'}! Redirecting…`);
      setTimeout(() => router.push('/login'), 1500);
    } catch (error) {
      console.error('Registration failed:', error);
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
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-avatar-accent/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-avatar-navy/50 blur-[90px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-avatar-accent/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
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

              <div className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4 mt-2">
                <i className="fas fa-gift text-avatar-accent text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">It&apos;s free to get started</p>
                  <p className="text-xs text-avatar-steel mt-0.5">No credit card required. Upgrade anytime.</p>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-avatar-steel mb-3">
              I want to join as
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
                    ? 'border-avatar-accent bg-avatar-accent/4 shadow-sm'
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
                  <p className={`text-[11px] leading-snug ${role === 'Vendor' ? 'text-avatar-slate' : 'text-avatar-silver'}`}>Sell your AI products</p>
                </div>
              </button>
            </div>
          </div>

          {/* Vendor benefits */}
          {role === 'Vendor' && (
            <div className="mb-5 bg-blue-50/60 border border-avatar-accent/15 rounded-2xl p-4">
              <p className="text-[11px] font-semibold text-avatar-dark mb-3">Why sell on Avatar?</p>
              <div className="grid grid-cols-2 gap-2">
                {VENDOR_BENEFITS.map((b) => (
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
          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">First name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-user text-[10px]" />
                  </span>
                  <input type="text" required placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={INPUT_CLASS} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Last name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-user text-[10px]" />
                  </span>
                  <input type="text" required placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={INPUT_CLASS} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">Email address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                  <i className="fas fa-envelope text-[10px]" />
                </span>
                <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} />
              </div>
            </div>

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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-avatar-light bg-avatar-ice/50 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8"
                />
              </div>
              <p className="text-[11px] text-avatar-steel mt-1.5 pl-0.5">We&apos;ll send you a verification code</p>
            </div>

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
                  className={INPUT_CLASS + ' pr-11'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition" aria-label="Toggle password">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`} />
                </button>
              </div>
            </div>

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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${INPUT_CLASS} pr-11 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                      : confirmPassword && confirmPassword === password
                      ? 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100'
                      : ''
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avatar-steel hover:text-avatar-slate transition" aria-label="Toggle confirm password">
                  <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`} />
                </button>
                {confirmPassword.length > 0 && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2">
                    {confirmPassword === password
                      ? <i className="fas fa-check-circle text-emerald-500 text-[11px]" />
                      : <i className="fas fa-times-circle text-rose-400 text-[11px]" />}
                  </span>
                )}
              </div>
            </div>

            {/* Password rules */}
            <div className="bg-avatar-ice/70 border border-avatar-light rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-avatar-dark mb-2">Password must contain:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {PASSWORD_RULES.map((r) => {
                  const met = pwdCheck[r.key];
                  return (
                    <div key={r.key} className="flex items-center gap-1.5">
                      <i className={`fas fa-check text-[9px] ${met ? 'text-emerald-500' : 'text-avatar-silver'}`} />
                      <span className={`text-[11px] ${met ? 'text-avatar-dark' : 'text-avatar-steel'}`}>{r.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-avatar-light accent-avatar-navy cursor-pointer shrink-0" />
              <span className="text-sm text-avatar-slate leading-snug">
                I agree to the{' '}
                <Link href="#" className="font-medium text-avatar-accent hover:text-avatar-navy transition underline-offset-2 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="#" className="font-medium text-avatar-accent hover:text-avatar-navy transition underline-offset-2 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {role === 'Vendor' && (
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-avatar-light accent-avatar-navy cursor-pointer shrink-0" />
                <span className="text-sm text-avatar-slate leading-snug flex items-center gap-1 flex-wrap">
                  I confirm that I own or have the rights to distribute the AI tools I submit.
                  <button type="button" className="text-avatar-steel hover:text-avatar-slate transition shrink-0" aria-label="More info">
                    <i className="fas fa-info-circle text-[11px]" />
                  </button>
                </span>
              </label>
            )}

            {displayedError && !successMessage && (
              <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                <i className="fas fa-exclamation-circle text-rose-500 text-sm mt-0.5 shrink-0" />
                <p className="text-sm text-rose-600 leading-snug">{displayedError}</p>
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
                <><i className="fas fa-spinner fa-spin text-[11px]" /> Creating account…</>
              ) : successMessage ? (
                <><i className="fas fa-check text-[11px]" /> Account created!</>
              ) : role === 'Vendor' ? (
                <>Become a Vendor <i className="fas fa-arrow-right text-[10px]" /></>
              ) : (
                <>Create Account <i className="fas fa-arrow-right text-[10px]" /></>
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
            <span className="text-xs text-avatar-silver font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-avatar-light" />
          </div>

          <p className="text-center text-sm text-avatar-slate mt-5">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-avatar-accent hover:text-avatar-navy transition">Sign in</Link>
          </p>
          <p className="text-center text-xs text-avatar-steel mt-2">
            Need help registering?{' '}
            <Link href="#" className="font-medium text-avatar-steel hover:text-avatar-slate transition underline underline-offset-2">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

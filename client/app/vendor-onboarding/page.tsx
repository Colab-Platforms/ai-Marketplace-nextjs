'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getVendorProfile, createVendorProfile } from '@/lib/verification';

const INPUT_CLASS =
  'w-full pl-10 pr-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition';

const SECTION_TITLE = 'text-xs font-bold uppercase tracking-[0.22em] text-avatar-steel mb-4 mt-6';

interface FormState {
  company_name: string;
  brand_name: string;
  company_type: string;
  gstNumber: string;
  registaration_number: string;
  pan_number: string;
  registered_address: string;
  date_of_incorporation: string;
  website_url: string;
  description: string;
  country: string;
  state: string;
  city: string;
}

const INITIAL: FormState = {
  company_name: '',
  brand_name: '',
  company_type: '',
  gstNumber: '',
  registaration_number: '',
  pan_number: '',
  registered_address: '',
  date_of_incorporation: '',
  website_url: '',
  description: '',
  country: '',
  state: '',
  city: '',
};

export default function VendorOnboardingPage() {
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Guard: must be a logged-in vendor; redirect away if already onboarded
  useEffect(() => {
    if (!accessToken || user?.role !== 'VENDOR') {
      router.replace('/login');
      return;
    }

    async function checkStatus() {
      try {
        const profile = await getVendorProfile();
        if (profile) {
          // Profile already exists in DB (even if status is Incomplete, Pending, etc.)
          router.replace('/dashboard');
        } else {
          setChecking(false);
        }
      } catch (err) {
        setChecking(false);
      }
    }

    checkStatus();
  }, [accessToken, user, router]);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.company_name.trim()) {
      setError('Company name is required.');
      return;
    }

    setSubmitting(true);
    try {
      // Create profile via service
      await createVendorProfile(form);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-avatar-ice">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
          <p className="text-sm text-avatar-steel">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Left dark panel ── */}
      <aside className="hidden lg:flex w-[340px] xl:w-[380px] flex-col bg-avatar-deep relative overflow-hidden shrink-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-avatar-accent/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 rounded-full bg-avatar-navy/50 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-12">
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-avatar-steel">
                One-time setup
              </span>
            </div>

            <h2 className="font-display text-[1.9rem] font-bold text-white leading-[1.2] mb-4">
              Set up your<br />
              <span className="text-avatar-accent">vendor profile</span>
            </h2>
            <p className="text-avatar-silver/70 text-sm leading-relaxed mb-9 max-w-64">
              Complete your business details to start listing AI tools on the Avatar marketplace.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'fa-building', label: 'Business Identity', desc: 'Company & brand details' },
                { icon: 'fa-file-alt', label: 'Legal & Compliance', desc: 'GST, PAN, CIN registration' },
                { icon: 'fa-map-marker-alt', label: 'Location', desc: 'Registered address & region' },
                { icon: 'fa-globe', label: 'Business Info', desc: 'Website, description & more' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/7 border border-white/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${item.icon} text-[12px] text-avatar-steel`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{item.label}</p>
                    <p className="text-xs text-avatar-steel/80 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <i className="fas fa-clock text-amber-400 text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">Verification takes 24–48 hrs</p>
                  <p className="text-xs text-avatar-steel mt-1">
                    After submission your profile is reviewed by our team. You will be notified once verified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6">
            <p className="text-xs text-avatar-steel/60">
              Logged in as{' '}
              <span className="text-avatar-steel font-medium">{user?.email}</span>
            </p>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 py-12">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-avatar-accent mb-2">
              Vendor Onboarding
            </p>
            <h1 className="font-display text-3xl font-bold text-avatar-dark leading-tight mb-2">
              Tell us about your business
            </h1>
            <p className="text-sm text-avatar-slate">
              Fill in the details below. Fields marked <span className="text-rose-500">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            {/* ── Business Identity ── */}
            <p className={SECTION_TITLE}>
              <i className="fas fa-building mr-2" />
              Business Identity
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-building text-[11px]" />
                  </span>
                  <input
                    value={form.company_name}
                    onChange={set('company_name')}
                    type="text"
                    required
                    placeholder="e.g. Acme Technologies Pvt. Ltd."
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Brand Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-tag text-[11px]" />
                  </span>
                  <input
                    value={form.brand_name}
                    onChange={set('brand_name')}
                    type="text"
                    placeholder="e.g. Acme AI"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Company Type */}
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Company Type</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-layer-group text-[11px]" />
                  </span>
                  <input
                    value={form.company_type}
                    onChange={set('company_type')}
                    type="text"
                    placeholder="e.g. Private Limited, LLP, Startup"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </div>

            {/* ── Legal & Compliance ── */}
            <p className={SECTION_TITLE}>
              <i className="fas fa-file-alt mr-2" />
              Legal &amp; Compliance
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">GST Number</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-receipt text-[11px]" />
                  </span>
                  <input
                    value={form.gstNumber}
                    onChange={set('gstNumber')}
                    type="text"
                    placeholder="e.g. 22ABCDE1234F1Z5"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">CIN / Registration No.</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-id-card text-[11px]" />
                  </span>
                  <input
                    value={form.registaration_number}
                    onChange={set('registaration_number')}
                    type="text"
                    placeholder="e.g. U72900MH2020PTC123456"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">PAN Number</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-fingerprint text-[11px]" />
                  </span>
                  <input
                    value={form.pan_number}
                    onChange={set('pan_number')}
                    type="text"
                    placeholder="e.g. ABCDE1234F"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Date of Incorporation</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-calendar text-[11px]" />
                  </span>
                  <input
                    value={form.date_of_incorporation}
                    onChange={set('date_of_incorporation')}
                    type="date"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </div>

            {/* ── Location ── */}
            <p className={SECTION_TITLE}>
              <i className="fas fa-map-marker-alt mr-2" />
              Location
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Registered Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-avatar-steel pointer-events-none">
                    <i className="fas fa-map-pin text-[11px]" />
                  </span>
                  <textarea
                    value={form.registered_address}
                    onChange={set('registered_address')}
                    rows={2}
                    placeholder="Street address, building, landmark…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Country</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-globe text-[11px]" />
                  </span>
                  <input
                    value={form.country}
                    onChange={set('country')}
                    type="text"
                    placeholder="e.g. India"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">State</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-map text-[11px]" />
                  </span>
                  <input
                    value={form.state}
                    onChange={set('state')}
                    type="text"
                    placeholder="e.g. Maharashtra"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">City</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-city text-[11px]" />
                  </span>
                  <input
                    value={form.city}
                    onChange={set('city')}
                    type="text"
                    placeholder="e.g. Mumbai"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </div>

            {/* ── Business Info ── */}
            <p className={SECTION_TITLE}>
              <i className="fas fa-info-circle mr-2" />
              Business Info
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Website URL</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avatar-steel pointer-events-none">
                    <i className="fas fa-link text-[11px]" />
                  </span>
                  <input
                    value={form.website_url}
                    onChange={set('website_url')}
                    type="url"
                    placeholder="https://yourcompany.com"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">Company Description</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-avatar-steel pointer-events-none">
                    <i className="fas fa-align-left text-[11px]" />
                  </span>
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    rows={3}
                    placeholder="Brief description of your company and the AI tools you offer…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mt-4">
                <i className="fas fa-exclamation-circle text-rose-500 text-sm mt-0.5 shrink-0" />
                <p className="text-sm text-rose-600 leading-snug">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-avatar-accent hover:bg-avatar-navy text-white text-sm font-semibold shadow-md shadow-avatar-accent/20 hover:shadow-avatar-navy/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin text-[11px]" /> Submitting…
                  </>
                ) : (
                  <>
                    Complete Setup <i className="fas fa-arrow-right text-[10px]" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-avatar-steel mt-3">
                Your profile will be reviewed within 24–48 hours. You can still access your dashboard while pending.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

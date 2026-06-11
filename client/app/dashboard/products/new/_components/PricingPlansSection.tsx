'use client';

import { INPUT_CLASS, PlanForm, DEFAULT_PLAN, ListingType, LISTING_PAID_PRICE } from './types';

// The 5 subscription options the user asked for
const BILLING_CYCLES: { value: string; label: string; sublabel: string; icon: string }[] = [
  { value: 'MONTHLY',     label: 'Monthly',   sublabel: '/ mo',  icon: 'fa-calendar-day' },
  { value: 'QUARTERLY',   label: '3 Months',  sublabel: '/ qtr', icon: 'fa-calendar-alt' },
  { value: 'BIANNUAL',    label: '6 Months',  sublabel: '/ 6mo', icon: 'fa-calendar-week' },
  { value: 'YEARLY',      label: '1 Year',    sublabel: '/ yr',  icon: 'fa-calendar-check' },
  { value: 'ONE_TIME',    label: 'One-Time',  sublabel: 'once',  icon: 'fa-bolt' },
];

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];

const PLAN_COLORS = [
  { border: 'border-blue-200',   bg: 'bg-blue-50',   badge: 'bg-blue-500',   text: 'text-blue-700',   ring: 'ring-blue-200'   },
  { border: 'border-violet-200', bg: 'bg-violet-50', badge: 'bg-violet-500', text: 'text-violet-700', ring: 'ring-violet-200' },
  { border: 'border-amber-200',  bg: 'bg-amber-50',  badge: 'bg-amber-500',  text: 'text-amber-700',  ring: 'ring-amber-200'  },
  { border: 'border-rose-200',   bg: 'bg-rose-50',   badge: 'bg-rose-500',   text: 'text-rose-700',   ring: 'ring-rose-200'   },
];

interface Props {
  plans: PlanForm[];
  listingType: ListingType;
  onChange: (plans: PlanForm[]) => void;
  onListingTypeChange: (type: ListingType) => void;
}

export default function PricingPlansSection({ plans, listingType, onChange, onListingTypeChange }: Props) {
  const updatePlan = (i: number, patch: Partial<PlanForm>) =>
    onChange(plans.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const addPlan    = () => onChange([...plans, { ...DEFAULT_PLAN, features: [''] }]);
  const removePlan = (i: number) => onChange(plans.filter((_, idx) => idx !== i));

  const addFeature    = (pi: number) =>
    onChange(plans.map((p, i) => i === pi ? { ...p, features: [...p.features, ''] } : p));

  const updateFeature = (pi: number, fi: number, val: string) =>
    onChange(plans.map((p, i) =>
      i === pi ? { ...p, features: p.features.map((f, j) => (j === fi ? val : f)) } : p
    ));

  const removeFeature = (pi: number, fi: number) =>
    onChange(plans.map((p, i) =>
      i === pi ? { ...p, features: p.features.filter((_, j) => j !== fi) } : p
    ));

  return (
    <div className="space-y-4">
      {/* ── Listing Type chooser ───────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-star text-amber-500 text-sm" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Listing Visibility</h2>
            <p className="text-xs text-slate-500">Choose how your tool appears on the marketplace</p>
          </div>
        </div>

        <div className="p-5 grid sm:grid-cols-2 gap-4">
          {/* Free listing */}
          <button
            type="button"
            onClick={() => onListingTypeChange('free')}
            className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-150 group ${
              listingType === 'free'
                ? 'border-slate-400 bg-slate-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
            }`}
          >
            {listingType === 'free' && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center shadow">
                <i className="fas fa-check text-white text-[8px]" />
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <i className="fas fa-list text-slate-500 text-base" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Standard Listing</p>
                <p className="text-xs text-slate-500">Free forever</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {['Listed in marketplace', 'Standard search visibility', 'Basic analytics'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-check text-slate-400 text-[10px]" />
                  {f}
                </li>
              ))}
            </ul>
          </button>

          {/* Paid listing */}
          <button
            type="button"
            onClick={() => onListingTypeChange('paid')}
            className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-150 group ${
              listingType === 'paid'
                ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md'
                : 'border-amber-200 bg-gradient-to-br from-amber-50/40 to-orange-50/40 hover:border-amber-300 hover:shadow-sm'
            }`}
          >
            {/* Popular badge */}
            <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm uppercase tracking-wide">
              Recommended
            </span>

            {listingType === 'paid' && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow">
                <i className="fas fa-check text-white text-[8px]" />
              </span>
            )}

            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-sm">
                <i className="fas fa-crown text-white text-base" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Featured Listing</p>
                <p className="text-sm font-black text-amber-600">
                  ₹{LISTING_PAID_PRICE}
                  <span className="text-xs font-semibold text-slate-500"> / month</span>
                </p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {[
                'Everything in Standard',
                'Featured badge on listing',
                'Priority in search results',
                'Homepage spotlight rotation',
                'Advanced analytics dashboard',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <i className="fas fa-check text-amber-500 text-[10px]" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        </div>
      </div>

      {/* ── Subscription Plans ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-tags text-emerald-600 text-sm" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Subscription Plans <span className="text-rose-500">*</span>
              </h2>
              <p className="text-xs text-slate-500">At least one plan is required to publish</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addPlan}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <i className="fas fa-plus text-[10px]" />
            Add Plan
          </button>
        </div>

        <div className="p-5 space-y-4">
          {plans.map((plan, pi) => (
            <PlanCard
              key={pi}
              plan={plan}
              index={pi}
              total={plans.length}
              color={PLAN_COLORS[pi % PLAN_COLORS.length]}
              onUpdate={(patch) => updatePlan(pi, patch)}
              onRemove={() => removePlan(pi)}
              onAddFeature={() => addFeature(pi)}
              onUpdateFeature={(fi, val) => updateFeature(pi, fi, val)}
              onRemoveFeature={(fi) => removeFeature(pi, fi)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PlanCard ──────────────────────────────────────────────────────────────────

interface ColorScheme {
  border: string; bg: string; badge: string; text: string; ring: string;
}

interface PlanCardProps {
  plan: PlanForm;
  index: number;
  total: number;
  color: ColorScheme;
  onUpdate: (patch: Partial<PlanForm>) => void;
  onRemove: () => void;
  onAddFeature: () => void;
  onUpdateFeature: (fi: number, val: string) => void;
  onRemoveFeature: (fi: number) => void;
}

function PlanCard({ plan, index, total, color, onUpdate, onRemove, onAddFeature, onUpdateFeature, onRemoveFeature }: PlanCardProps) {
  const currencySymbol = plan.currency === 'INR' ? '₹' : plan.currency === 'EUR' ? '€' : plan.currency === 'GBP' ? '£' : '$';

  return (
    <div className={`rounded-2xl border-2 ${color.border} ${color.bg} overflow-hidden`}>
      {/* Card header */}
      <div className={`px-5 py-3.5 flex items-center justify-between border-b ${color.border} bg-white/60`}>
        <div className="flex items-center gap-2.5">
          <span className={`w-7 h-7 rounded-full ${color.badge} flex items-center justify-center text-[11px] font-black text-white shadow-sm`}>
            {index + 1}
          </span>
          <div>
            <p className={`text-sm font-bold ${color.text}`}>
              {plan.name || `Plan ${index + 1}`}
            </p>
            {plan.billing_cycle && (
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">
                {BILLING_CYCLES.find(b => b.value === plan.billing_cycle)?.label ?? plan.billing_cycle}
                {plan.trial_days > 0 && ` · ${plan.trial_days}-day free trial`}
              </p>
            )}
          </div>
        </div>
        {total > 1 && (
          <button
            type="button"
            onClick={onRemove}
            className="w-7 h-7 rounded-lg bg-white hover:bg-rose-50 text-rose-400 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-all"
          >
            <i className="fas fa-trash-alt text-[11px]" />
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Name + Description */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Plan Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={plan.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g. Starter, Pro, Business"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={plan.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Best for teams / individuals…"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Billing Cycle — visual card picker */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Subscription Period <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {BILLING_CYCLES.map(({ value, label, sublabel, icon }) => {
              const active = plan.billing_cycle === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onUpdate({ billing_cycle: value })}
                  className={`relative flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border-2 transition-all duration-150 ${
                    active
                      ? 'border-avatar-accent bg-avatar-accent text-white shadow-md scale-[1.03]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-avatar-accent/50 hover:bg-avatar-accent/5'
                  }`}
                >
                  <i className={`fas ${icon} text-sm ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span className={`text-[11px] font-bold leading-tight ${active ? 'text-white' : 'text-slate-700'}`}>
                    {label}
                  </span>
                  <span className={`text-[9px] font-semibold ${active ? 'text-white/80' : 'text-slate-400'}`}>
                    {sublabel}
                  </span>
                  {active && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                      <i className="fas fa-check text-white text-[7px]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Free trial toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <i className="fas fa-gift text-teal-500 text-sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">7-Day Free Trial</p>
              <p className="text-[11px] text-slate-500">Users can try before they subscribe</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdate({ trial_days: plan.trial_days === 7 ? 0 : 7 })}
            className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
              plan.trial_days === 7 ? 'bg-teal-500' : 'bg-slate-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                plan.trial_days === 7 ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Price + Currency */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Price <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold pointer-events-none">
                {currencySymbol}
              </span>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={plan.price}
                onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className={INPUT_CLASS + ' pl-8'}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Currency <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onUpdate({ currency: c })}
                  className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                    plan.currency === c
                      ? 'bg-avatar-accent text-white border-avatar-accent shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-avatar-accent/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            What&apos;s Included <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2">
            {plan.features.map((feat, fi) => (
              <div key={fi} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-emerald-600 text-[8px]" />
                </div>
                <input
                  type="text"
                  required
                  value={feat}
                  onChange={(e) => onUpdateFeature(fi, e.target.value)}
                  placeholder="e.g. Unlimited API calls / month"
                  className={INPUT_CLASS + ' flex-1'}
                />
                {plan.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveFeature(fi)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-rose-50 text-rose-400 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <i className="fas fa-times text-[10px]" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={onAddFeature}
              className="flex items-center gap-2 text-xs text-avatar-accent hover:text-avatar-navy font-bold mt-1.5 transition-colors group"
            >
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-avatar-accent/10 transition-colors">
                <i className="fas fa-plus text-[8px]" />
              </span>
              Add Feature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

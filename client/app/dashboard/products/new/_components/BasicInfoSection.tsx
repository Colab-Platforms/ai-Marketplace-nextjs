'use client';

import { Category } from '@/type/tool';
import { INPUT_CLASS, LABEL_CLASS, ToolForm } from './types';

const PRICING_MODELS = [
  { value: 'FREE', label: 'Free', icon: 'fa-gift', desc: 'No charge, always free' },
  { value: 'PAID', label: 'Paid', icon: 'fa-credit-card', desc: 'One-time or recurring fee' },
  { value: 'SUBSCRIPTION', label: 'Subscription', icon: 'fa-repeat', desc: 'Recurring subscription' },
];

interface Props {
  form: ToolForm;
  categories: Category[];
  onChange: (patch: Partial<ToolForm>) => void;
}

export default function BasicInfoSection({ form, categories, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-avatar-accent/10 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-cube text-avatar-accent text-sm" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Basic Information</h2>
          <p className="text-xs text-slate-500">Name, category and description of your tool</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Tool Name */}
        <div>
          <label className={LABEL_CLASS}>
            Tool Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              <i className="fas fa-robot" />
            </span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. AI Content Writer Pro"
              className={INPUT_CLASS + ' pl-9'}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className={LABEL_CLASS}>
            Category <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              <i className="fas fa-tag" />
            </span>
            <select
              required
              value={form.category_id}
              onChange={(e) => onChange({ category_id: e.target.value })}
              className={INPUT_CLASS + ' pl-9 appearance-none'}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
        </div>

        {/* Pricing Model — card picker */}
        <div>
          <label className={LABEL_CLASS}>
            Pricing Model <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRICING_MODELS.map(({ value, label, icon, desc }) => {
              const active = form.pricing_model === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChange({ pricing_model: value })}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-150 ${
                    active
                      ? 'border-avatar-accent bg-avatar-accent/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <i
                    className={`fas ${icon} text-base ${
                      active ? 'text-avatar-accent' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold ${
                      active ? 'text-avatar-accent' : 'text-slate-600'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight hidden sm:block">
                    {desc}
                  </span>
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-avatar-accent rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-white text-[8px]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className={LABEL_CLASS}>
            Short Description <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              required
              value={form.short_description}
              onChange={(e) => onChange({ short_description: e.target.value })}
              rows={2}
              maxLength={160}
              placeholder="One-liner that appears on listing cards…"
              className={INPUT_CLASS + ' resize-none'}
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-slate-400">
              {form.short_description.length}/160
            </span>
          </div>
        </div>

        {/* Full Description */}
        <div>
          <label className={LABEL_CLASS}>
            Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            value={form.full_description}
            onChange={(e) => onChange({ full_description: e.target.value })}
            rows={5}
            placeholder="Describe features, use-cases, integrations, and what makes your tool stand out…"
            className={INPUT_CLASS + ' resize-none'}
          />
        </div>
      </div>
    </div>
  );
}

export type { Category } from '@/type/tool';

export const INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-avatar-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-avatar-accent/20 focus:border-avatar-accent transition-all duration-150';

export const LABEL_CLASS = 'block text-sm font-semibold text-slate-700 mb-1.5';

// Upload state types (UI-only, not API shapes)
export interface ImageEntry {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
  uploading: boolean;
  error?: string;
}

export interface LogoEntry {
  file: File | null;
  previewUrl: string;
  uploadedUrl?: string;
  uploading: boolean;
  error?: string;
}

// Form state (all strings so inputs stay controlled cleanly)
export interface ToolForm {
  name: string;
  category_id: string;
  short_description: string;
  full_description: string;
  website_url: string;
  demo_url: string;
  pricing_model: string;
}

// Pricing plan form shape (no id/tool_id — those are API response fields)
export interface PlanForm {
  name: string;
  description: string;
  billing_cycle: string;
  price: number;
  currency: string;
  trial_days: number;
  features: string[];
}

export const DEFAULT_PLAN: PlanForm = {
  name: '',
  description: '',
  billing_cycle: 'MONTHLY',
  price: 0,
  currency: 'INR',
  trial_days: 7,
  features: [''],
};

// Listing visibility type for platform promotion
export type ListingType = 'free' | 'paid';

export interface ListingOptions {
  type: ListingType;
}

export const LISTING_PAID_PRICE = 499; // INR / month

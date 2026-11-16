// ─── Shared auth page static data

export type Role = 'Buyer' | 'Vendor';

export const LEFT_FEATURES = [
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
] as const;

export const TRUST_STATS = [
  { value: '10K+', label: 'Members' },
  { value: '150+', label: 'Vendors' },
  { value: '4.9★', label: 'Rating' },
] as const;

// ─── Register-only data 

export const VENDOR_BENEFITS = [
  { icon: 'fa-users',        label: 'Reach 10,000+',     sub: 'active AI buyers' },
  { icon: 'fa-list',         label: 'List unlimited',     sub: 'AI tools' },
  { icon: 'fa-th-large',     label: 'Dedicated vendor',   sub: 'dashboard' },
  { icon: 'fa-check-circle', label: 'Fast approval &',    sub: 'ongoing support' },
] as const;

export const PASSWORD_RULES = [
  { key: 'length',  label: '8+ characters' },
  { key: 'upper',   label: 'One uppercase letter' },
  { key: 'number',  label: 'One number' },
  { key: 'special', label: 'One special character' },
] as const;

export type PasswordCheck = Record<'length' | 'upper' | 'number' | 'special', boolean>;

export function checkPassword(pwd: string): PasswordCheck {
  return {
    length:  pwd.length >= 8,
    upper:   /[A-Z]/.test(pwd),
    number:  /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

// ─── Shared CSS helpers

export const INPUT_CLASS =
  'w-full pl-10 pr-4 py-3 rounded-xl border border-avatar-light bg-avatar-ice/50 text-sm text-avatar-dark placeholder:text-avatar-silver outline-none transition-all duration-200 focus:border-avatar-accent focus:bg-white focus:ring-4 focus:ring-avatar-accent/8';

export const SOCIAL_AVATAR_COLORS = ['bg-blue-400', 'bg-emerald-400', 'bg-violet-400'] as const;

'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { getVendorProfile, VendorProfile } from '@/lib/verification';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Guards
    if (!accessToken || user?.role !== 'VENDOR') {
      router.replace('/login');
      return;
    }

    async function loadProfile() {
      try {
        const data = await getVendorProfile();
        if (!data) {
          // If no vendor details filled yet, force them to do the first step
          router.replace('/vendor-onboarding');
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to load vendor profile:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [accessToken, user, router]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
          <p className="text-sm text-avatar-steel">Loading workspace…</p>
        </div>
      </div>
    );
  }

  // Sidebar dynamic status card styling based on verification_status
  const status = profile?.verification_status || 'Incomplete';

  const menuItems = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: 'fa-th-large' },
    { name: 'Verification & Onboarding', href: '/dashboard/verification', icon: 'fa-shield-alt' },
    { name: 'AI Tool Listings', href: '#', icon: 'fa-robot', badge: 'Mock' },
    { name: 'Sales & Payouts', href: '#', icon: 'fa-wallet', badge: 'Mock' },
    { name: 'Store Settings', href: '#', icon: 'fa-cog', badge: 'Mock' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-body">
      {/* Mobile Header */}
      <header className="md:hidden bg-avatar-deep text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link href="/" className="font-display font-extrabold text-xl tracking-wider text-avatar-accent">
          AVATAR
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none p-1.5 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle Navigation menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 w-72 h-[100vh] bg-avatar-deep text-white flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isMobileMenuOpen ? 'inset-y-0 left-0' : ''}`}
      >
        {/* Brand Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
          <Link href="/" className="font-display font-extrabold text-2xl tracking-wider text-avatar-accent">
            AVATAR
          </Link>
          <span className="text-[9px] font-bold bg-avatar-accent text-white px-2 py-0.5 rounded-full leading-none tracking-widest uppercase shadow-[0_0_12px_rgba(30,144,255,0.4)]">
            Vendor
          </span>
        </div>

        {/* Onboarding Status Progress Indicator Card */}
        <div className="px-6 py-5 border-b border-white/5 shrink-0">
          {status === 'Incomplete' && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                <i className="fas fa-exclamation-triangle animate-pulse" />
                Action Required
              </div>
              <p className="text-[11px] text-avatar-steel leading-relaxed">
                Your onboarding is incomplete. Please submit verification documents.
              </p>
              <Link
                href="/dashboard/verification"
                className="w-full text-center py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-sm shadow-amber-500/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Complete Onboarding
              </Link>
            </div>
          )}

          {status === 'Pending' && (
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
                <i className="fas fa-clock fa-spin" />
                Pending Verification
              </div>
              <p className="text-[11px] text-avatar-steel leading-relaxed">
                Documents submitted! Our admin team is reviewing your profile.
              </p>
            </div>
          )}

          {status === 'Verified' && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <i className="fas fa-shield-check" />
                Verified Partner
              </div>
              <p className="text-[11px] text-avatar-steel leading-relaxed">
                Congratulations! Your business details are fully verified.
              </p>
            </div>
          )}

          {status === 'Rejected' && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                <i className="fas fa-times-circle" />
                Verification Failed
              </div>
              <p className="text-[11px] text-avatar-steel leading-relaxed">
                Documents rejected by admin. Please update and re-submit.
              </p>
              <Link
                href="/dashboard/verification"
                className="w-full text-center py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-sm shadow-rose-500/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Re-upload Documents
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-avatar-accent text-white font-medium shadow-[0_4px_12px_rgba(30,144,255,0.2)]'
                    : 'text-avatar-steel hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <i className={`fas ${item.icon} text-[13px] opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-avatar-steel uppercase">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/5 shrink-0 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-avatar-accent flex items-center justify-center font-bold text-white shadow-md">
              {profile?.company_name?.charAt(0).toUpperCase() || 'V'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white/90 truncate">{profile?.company_name}</p>
              <p className="text-[11px] text-avatar-steel truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/80 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-sign-out-alt text-[11px]" />
            Logout Workspace
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

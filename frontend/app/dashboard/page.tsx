'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVendorProfile, VendorProfile } from '@/lib/verification';
import { vendorService } from '@/services/vendor.service';
import { VendorStats } from '@/type/tool';

export default function DashboardPage() {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [profileData, statsData] = await Promise.all([
          getVendorProfile(),
          vendorService.getStats(),
        ]);
        setProfile(profileData);
        setStats(statsData.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const status = profile?.verification_status || 'Incomplete';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-avatar-deep to-avatar-navy rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-avatar-accent/20 blur-[60px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-avatar-accent mb-2">
            Vendor Workspace
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Welcome to {profile?.company_name || 'your workspace'}
          </h1>
          <p className="text-sm text-avatar-steel leading-relaxed">
            Manage your AI tools, track verification status, review sales, and publish new solutions to our marketplace.
          </p>
        </div>
      </div>

      {/* Onboarding Notice Status Alert (Top of page if Incomplete/Pending) */}
      {status !== 'Verified' && (
        <div className={`border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
          status === 'Incomplete'
            ? 'bg-amber-50/50 border-amber-200 text-amber-900'
            : status === 'Pending'
            ? 'bg-sky-50/50 border-sky-200 text-sky-900'
            : 'bg-rose-50/50 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-start gap-4">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-base shadow-sm ${
              status === 'Incomplete'
                ? 'bg-amber-100 text-amber-600'
                : status === 'Pending'
                ? 'bg-sky-100 text-sky-600'
                : 'bg-rose-100 text-rose-600'
            }`}>
              <i className={`fas ${
                status === 'Incomplete'
                  ? 'fa-exclamation-triangle'
                  : status === 'Pending'
                  ? 'fa-clock animate-pulse'
                  : 'fa-times-circle'
              }`} />
            </span>
            <div>
              <h2 className="font-semibold text-sm">
                {status === 'Incomplete' && 'Verification Details Required'}
                {status === 'Pending' && 'Verification Under Review'}
                {status === 'Rejected' && 'Verification Action Required'}
              </h2>
              <p className={`text-xs mt-1 ${
                status === 'Incomplete' ? 'text-amber-800' : status === 'Pending' ? 'text-sky-800' : 'text-rose-800'
              }`}>
                {status === 'Incomplete' && 'To start publishing AI tools, please upload your verification documents.'}
                {status === 'Pending' && 'We are currently verifying your documentation. Check back in 24–48 hours.'}
                {status === 'Rejected' && 'Your documentation was rejected. Please re-upload corrected documents.'}
              </p>
            </div>
          </div>
          {status !== 'Pending' && (
            <Link
              href="/dashboard/verification"
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold shrink-0 shadow-sm transition-all ${
                status === 'Incomplete'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/10'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/10'
              }`}
            >
              Upload Documents
            </Link>
          )}
        </div>
      )}

      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
            <p className="text-sm text-avatar-steel">Loading stats...</p>
          </div>
        </div>
      ) : stats ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-avatar-accent/10 text-avatar-accent flex items-center justify-center">
                <i className="fas fa-robot text-sm" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {stats.publishedProducts} Live
              </span>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">{stats.totalProducts}</p>
            <p className="text-xs text-avatar-slate mt-1">Total Products</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <i className="fas fa-users text-sm" />
              </div>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">{stats.totalUsers}</p>
            <p className="text-xs text-avatar-slate mt-1">Active Subscribers</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <i className="fas fa-dollar-sign text-sm" />
              </div>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">
              ₹{stats.totalEarnings.toLocaleString()}
            </p>
            <p className="text-xs text-avatar-slate mt-1">Total Earnings</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <i className="fas fa-wallet text-sm" />
              </div>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">
              ₹{stats.vendorBalance.toLocaleString()}
            </p>
            <p className="text-xs text-avatar-slate mt-1">Available Balance</p>
          </div>
        </div>
      ) : null}

      {/* Recent Activity */}
      {stats && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-avatar-dark mb-4 flex items-center gap-2">
            <i className="fas fa-chart-line text-avatar-accent" />
            Recent Activity
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                <i className="fas fa-calendar-check text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-avatar-dark">{stats.last30DaysSubscriptions}</p>
                <p className="text-xs text-avatar-slate">New subscriptions (30 days)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <i className="fas fa-eye text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-avatar-dark">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-avatar-slate">Total profile views</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/products" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="w-12 h-12 rounded-2xl bg-avatar-accent/10 text-avatar-accent flex items-center justify-center mb-4">
            <i className="fas fa-robot text-lg" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1.5">Manage Listings</h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            View, edit, or update your published AI tools and integrations on our global marketplace.
          </p>
          <span className="text-xs font-semibold text-avatar-accent hover:text-avatar-navy transition flex items-center gap-1">
            View active tools <i className="fas fa-arrow-right text-[10px]" />
          </span>
        </Link>

        <Link href="/dashboard/analytics" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
            <i className="fas fa-chart-line text-lg" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1.5">Sales &amp; Analytics</h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Track tool installations, view subscription metrics, conversion statistics, and payout history.
          </p>
          <span className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1">
            Performance dashboard <i className="fas fa-arrow-right text-[10px]" />
          </span>
        </Link>

        <Link href="/dashboard/api-integration" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
            <i className="fas fa-plug text-lg" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1.5">API Integration</h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Configure webhooks, test integrations, and manage API endpoints for your tools.
          </p>
          <span className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-1">
            Webhook settings <i className="fas fa-arrow-right text-[10px]" />
          </span>
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { vendorService } from '@/services/vendor.service';
import { VendorStats } from '@/type/tool';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await vendorService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
          <p className="text-sm text-avatar-steel">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20">
        <p className="text-avatar-slate">Failed to load analytics data</p>
      </div>
    );
  }

  const revenueData = [
    { label: 'Total Earnings', value: stats.totalEarnings, color: 'emerald' },
    { label: 'Total Payouts', value: stats.totalPayouts, color: 'blue' },
    { label: 'Available Balance', value: stats.vendorBalance, color: 'purple' },
  ];

  const productData = [
    { label: 'Published', value: stats.publishedProducts, total: stats.totalProducts, color: 'emerald' },
    { label: 'Drafts', value: stats.unpublishedProducts, total: stats.totalProducts, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-avatar-dark">Sales & Analytics</h1>
        <p className="text-sm text-avatar-slate mt-1">
          Track your performance, revenue, and subscriber growth
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <i className="fas fa-dollar-sign text-lg" />
          </div>
          <h2 className="text-lg font-bold">Revenue Overview</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {revenueData.map((item) => (
            <div key={item.label} className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-sm text-white/80 mb-2">{item.label}</p>
              <p className="text-3xl font-bold">${item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-avatar-accent/10 text-avatar-accent flex items-center justify-center">
              <i className="fas fa-robot text-lg" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
              {stats.publishedProducts} Live
            </span>
          </div>
          <p className="text-3xl font-bold text-avatar-dark mb-1">{stats.totalProducts}</p>
          <p className="text-sm text-avatar-slate">Total Products</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-avatar-steel">Published</span>
              <span className="font-semibold text-avatar-dark">{stats.publishedProducts}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-avatar-steel">Drafts</span>
              <span className="font-semibold text-avatar-dark">{stats.unpublishedProducts}</span>
            </div>
          </div>
        </div>

        {/* Active Subscribers */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
            <i className="fas fa-users text-lg" />
          </div>
          <p className="text-3xl font-bold text-avatar-dark mb-1">{stats.totalUsers}</p>
          <p className="text-sm text-avatar-slate">Active Subscribers</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <i className="fas fa-arrow-up text-emerald-500 text-xs" />
              <span className="text-xs text-emerald-600 font-semibold">
                {stats.last30DaysSubscriptions} new in last 30 days
              </span>
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
            <i className="fas fa-eye text-lg" />
          </div>
          <p className="text-3xl font-bold text-avatar-dark mb-1">{stats.totalViews.toLocaleString()}</p>
          <p className="text-sm text-avatar-slate">Total Profile Views</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-avatar-steel">
              Average: {stats.totalProducts > 0 ? Math.round(stats.totalViews / stats.totalProducts).toLocaleString() : 0} views per product
            </p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4">
            <i className="fas fa-chart-line text-lg" />
          </div>
          <p className="text-3xl font-bold text-avatar-dark mb-1">
            {stats.totalViews > 0 ? ((stats.totalUsers / stats.totalViews) * 100).toFixed(1) : 0}%
          </p>
          <p className="text-sm text-avatar-slate">Conversion Rate</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-avatar-steel">
              {stats.totalUsers} subscribers from {stats.totalViews.toLocaleString()} views
            </p>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-avatar-dark flex items-center gap-2">
            <i className="fas fa-chart-bar text-avatar-accent" />
            Product Distribution
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {productData.map((item) => {
            const percentage = item.total > 0 ? (item.value / item.total) * 100 : 0;
            return (
              <div key={item.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-avatar-dark">{item.label}</span>
                  <span className="text-sm font-bold text-avatar-dark">
                    {item.value} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Earnings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <i className="fas fa-arrow-up text-sm" />
            </div>
            <div>
              <p className="text-sm text-avatar-slate">Total Earnings</p>
              <p className="text-2xl font-bold text-avatar-dark">${stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-avatar-steel">Average per subscriber</span>
              <span className="font-semibold text-avatar-dark">
                ${stats.totalUsers > 0 ? (stats.totalEarnings / stats.totalUsers).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-avatar-steel">Active subscribers</span>
              <span className="font-semibold text-avatar-dark">{stats.totalUsers}</span>
            </div>
          </div>
        </div>

        {/* Payouts */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <i className="fas fa-arrow-down text-sm" />
            </div>
            <div>
              <p className="text-sm text-avatar-slate">Total Payouts</p>
              <p className="text-2xl font-bold text-avatar-dark">${stats.totalPayouts.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-avatar-steel">Available balance</span>
              <span className="font-semibold text-emerald-600">
                ${stats.vendorBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-avatar-steel">Payout percentage</span>
              <span className="font-semibold text-avatar-dark">
                {stats.totalEarnings > 0 ? ((stats.totalPayouts / stats.totalEarnings) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-avatar-dark mb-4 flex items-center gap-2">
          <i className="fas fa-clock text-avatar-accent" />
          Recent Activity (Last 30 Days)
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-user-plus text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                New
              </span>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">{stats.last30DaysSubscriptions}</p>
            <p className="text-xs text-avatar-slate mt-1">New Subscriptions</p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-eye text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">{stats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-avatar-slate mt-1">Profile Views</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="fas fa-robot text-avatar-accent" />
              <span className="text-xs font-semibold text-avatar-accent bg-avatar-accent/10 px-2 py-0.5 rounded">
                Live
              </span>
            </div>
            <p className="text-2xl font-bold text-avatar-dark">{stats.publishedProducts}</p>
            <p className="text-xs text-avatar-slate mt-1">Published Products</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
        <i className="fas fa-info-circle text-blue-500 text-lg mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Need more detailed analytics?</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Per-tool analytics, customer demographics, and advanced reporting features will be available in the next update. 
            Stay tuned for more insights into your business performance!
          </p>
        </div>
      </div>
    </div>
  );
}

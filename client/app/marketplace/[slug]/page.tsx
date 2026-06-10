'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toolService } from '@/services/tool.service';
import Link from 'next/link';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star text-sm ${
            star <= Math.floor(rating)
              ? 'text-amber-400'
              : star - 0.5 <= rating
              ? 'text-amber-300'
              : 'text-avatar-light'
          }`}
        ></i>
      ))}
    </div>
  );
}

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: toolData, isLoading } = useQuery({
    queryKey: ['tool', slug],
    queryFn: () => toolService.getToolById(slug),
  });

  const { data: pricingData } = useQuery({
    queryKey: ['pricing', slug],
    queryFn: () => toolService.getPricingPlans(slug),
    enabled: !!toolData?.data,
  });

  const tool = toolData?.data;
  const pricingPlans = pricingData?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avatar-accent"></div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <i className="fas fa-robot text-6xl text-avatar-light mb-4"></i>
        <h1 className="text-2xl font-bold text-avatar-dark mb-2">Tool Not Found</h1>
        <p className="text-avatar-slate mb-6">The AI tool you're looking for doesn't exist.</p>
        <Link
          href="/marketplace"
          className="bg-avatar-accent text-white px-6 py-3 rounded-full hover:bg-avatar-deep transition-colors"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-sm text-avatar-slate hover:text-avatar-accent mb-6"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Marketplace
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Tool Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                {/* Logo */}
                <div className="w-20 h-20 bg-avatar-ice rounded-2xl flex items-center justify-center flex-shrink-0 border border-avatar-light">
                  {tool.logo_url ? (
                    <img src={tool.logo_url} alt={tool.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <i className="fas fa-robot text-3xl text-avatar-accent"></i>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-avatar-dark">{tool.name}</h1>
                    <span className="bg-avatar-ice text-avatar-accent px-3 py-1 rounded-full text-sm font-semibold">
                      {tool.category?.name}
                    </span>
                  </div>

                  <p className="text-avatar-slate mb-3">
                    {tool.short_description || 'AI-powered tool'}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={tool.average_rating || 0} />
                    <span className="font-semibold text-avatar-dark">
                      {tool.average_rating?.toFixed(1) || '0.0'}
                    </span>
                    <span className="text-avatar-steel">
                      ({tool.total_reviews || 0} reviews)
                    </span>
                    <span className="text-avatar-steel">·</span>
                    <span className="text-avatar-steel">
                      {tool.total_views || 0} views
                    </span>
                  </div>

                  {/* Vendor Info */}
                  {tool.vendor && (
                    <div className="flex items-center gap-2 text-sm text-avatar-slate">
                      <i className="fas fa-building text-avatar-steel"></i>
                      <span>by <span className="font-semibold text-avatar-dark">{tool.vendor.company_name || tool.vendor.brand_name}</span></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {tool.website_url && (
                  <a
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-avatar-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-avatar-deep transition-colors"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Visit Website
                  </a>
                )}
                {tool.demo_url && (
                  <a
                    href={tool.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border-2 border-avatar-accent text-avatar-accent px-6 py-3 rounded-full font-semibold hover:bg-avatar-ice transition-colors"
                  >
                    <i className="fas fa-play-circle"></i>
                    Try Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right: Pricing Quick View */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-gradient-to-br from-avatar-accent to-avatar-deep rounded-2xl p-6 text-white">
                <div className="text-center mb-4">
                  <p className="text-white/80 text-sm mb-1">Pricing Model</p>
                  <p className="text-3xl font-bold">
                    {tool.pricing_model === 'FREE' ? 'Free' : tool.pricing_model}
                  </p>
                </div>
                {pricingPlans.length > 0 && (
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white/80 text-sm mb-2">Starting at</p>
                    <p className="text-2xl font-bold">
                      ${pricingPlans[0].price}/{pricingPlans[0].billing_cycle.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Screenshots/Images */}
            {tool.images && tool.images.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-avatar-dark mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.images.map((img: any, idx: number) => (
                    <div key={img.id || idx} className="rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={img.image_url}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-avatar-dark mb-4">About This Tool</h2>
              <div className="prose max-w-none text-avatar-slate">
                <p className="whitespace-pre-wrap">{tool.full_description || tool.short_description || 'No description available.'}</p>
              </div>
            </div>

            {/* Pricing Plans */}
            {pricingPlans.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-avatar-dark mb-6">Pricing Plans</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {pricingPlans.map((plan: any) => (
                    <div
                      key={plan.id}
                      className="border-2 border-gray-200 rounded-xl p-5 hover:border-avatar-accent transition-colors"
                    >
                      <h3 className="font-bold text-lg text-avatar-dark mb-1">{plan.name}</h3>
                      {plan.description && (
                        <p className="text-sm text-avatar-slate mb-3">{plan.description}</p>
                      )}
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-avatar-dark">
                          ${plan.price}
                        </span>
                        <span className="text-avatar-steel">/{plan.billing_cycle.toLowerCase()}</span>
                      </div>
                      {plan.trial_days && plan.trial_days > 0 && (
                        <div className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full inline-block mb-3">
                          {plan.trial_days} days free trial
                        </div>
                      )}
                      {plan.plan_features && plan.plan_features.length > 0 && (
                        <ul className="space-y-2">
                          {plan.plan_features.map((feature: any) => (
                            <li key={feature.id} className="flex items-start gap-2 text-sm text-avatar-slate">
                              <i className="fas fa-check text-emerald-500 mt-0.5"></i>
                              <span>{feature.feature_name}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-avatar-dark mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-avatar-slate text-sm">Total Views</span>
                  <span className="font-semibold text-avatar-dark">{tool.total_views || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-avatar-slate text-sm">Reviews</span>
                  <span className="font-semibold text-avatar-dark">{tool.total_reviews || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-avatar-slate text-sm">Launches</span>
                  <span className="font-semibold text-avatar-dark">{tool.total_launches || 0}</span>
                </div>
              </div>
            </div>

            {/* Vendor Info */}
            {tool.vendor && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-avatar-dark mb-4">Vendor Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-avatar-steel mb-1">Company</p>
                    <p className="font-semibold text-avatar-dark">{tool.vendor.company_name}</p>
                  </div>
                  {tool.vendor.brand_name && (
                    <div>
                      <p className="text-sm text-avatar-steel mb-1">Brand</p>
                      <p className="font-semibold text-avatar-dark">{tool.vendor.brand_name}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-avatar-ice rounded-2xl p-6 border border-avatar-light">
              <h3 className="font-bold text-avatar-dark mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <i className="fas fa-tag text-avatar-accent"></i>
                  <span className="text-sm text-avatar-slate">Category: <span className="font-semibold text-avatar-dark">{tool.category?.name}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-dollar-sign text-avatar-accent"></i>
                  <span className="text-sm text-avatar-slate">Model: <span className="font-semibold text-avatar-dark">{tool.pricing_model}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-calendar text-avatar-accent"></i>
                  <span className="text-sm text-avatar-slate">Added: <span className="font-semibold text-avatar-dark">{new Date(tool.created_at).toLocaleDateString()}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

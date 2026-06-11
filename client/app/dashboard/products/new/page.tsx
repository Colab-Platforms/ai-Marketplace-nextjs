'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toolService, categoryService } from '@/services/tool.service';
import { Category } from '@/type/tool';

import BasicInfoSection from './_components/BasicInfoSection';
import MediaSection from './_components/MediaSection';
import PricingPlansSection from './_components/PricingPlansSection';
import { ToolForm, PlanForm, ImageEntry, LogoEntry, DEFAULT_PLAN, ListingType } from './_components/types';

const STEPS = ['Basic Info', 'Media & Links', 'Pricing Plans'];

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ToolForm>({
    name: '',
    category_id: '',
    short_description: '',
    full_description: '',
    website_url: '',
    demo_url: '',
    pricing_model: 'FREE',
  });

  const [logo, setLogo] = useState<LogoEntry>({ file: null, previewUrl: '', uploading: false });
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [plans, setPlans] = useState<PlanForm[]>([{ ...DEFAULT_PLAN, features: [''] }]);
  const [listingType, setListingType] = useState<ListingType>('free');

  useEffect(() => {
    categoryService.getAll()
      .then((res) => setCategories(res.data || []))
      .catch(console.error);

    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      if (logo.file) URL.revokeObjectURL(logo.previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (images.some((img) => img.uploading) || logo.uploading) {
      setError('Please wait for all uploads to finish.');
      return;
    }
    if (images.some((img) => img.error) || logo.error) {
      setError('Some uploads failed. Remove them and try again.');
      return;
    }
    if (!logo.uploadedUrl) {
      setError('A logo is required. Please upload one.');
      return;
    }
    if (images.filter((img) => img.uploadedUrl).length === 0) {
      setError('At least one screenshot is required.');
      return;
    }

    setSubmitting(true);
    try {
      const toolResponse = await toolService.createTool({
        ...form,
        logo_url: logo.uploadedUrl,
        images: images.filter((img) => img.uploadedUrl).map((img) => img.uploadedUrl as string),
      });

      const toolId = toolResponse.data?.id || toolResponse.data?.tool?.id;
      if (!toolId) throw new Error('Failed to create tool');

      for (const plan of plans) {
        if (plan.name.trim()) {
          await toolService.addPricingPlan(toolId, {
            ...plan,
            features: plan.features.filter((f) => f.trim() !== ''),
          });
        }
      }

      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create tool. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-avatar-accent mb-4 transition-colors group"
        >
          <i className="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-avatar-accent to-avatar-navy flex items-center justify-center shadow-md flex-shrink-0">
            <i className="fas fa-plus text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Add New AI Tool</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Complete all sections below to list your tool on the marketplace
            </p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mt-6">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-avatar-accent/15 text-avatar-accent text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-slate-600">{step}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-slate-300 mx-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <BasicInfoSection
          form={form}
          categories={categories}
          onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
        />

        <MediaSection
          form={form}
          logo={logo}
          images={images}
          onFormChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
          onLogoChange={setLogo}
          onImagesChange={setImages}
          onError={setError}
        />

        <PricingPlansSection
          plans={plans}
          onChange={setPlans}
          listingType={listingType}
          onListingTypeChange={setListingType}
        />

        {/* Error banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-rose-500 text-sm" />
            </div>
            <p className="text-sm text-rose-700 font-medium">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-auto text-rose-400 hover:text-rose-600 transition-colors"
            >
              <i className="fas fa-times text-xs" />
            </button>
          </div>
        )}

        {/* ── Action bar ─────────────────────────────────── */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-avatar-accent to-avatar-navy hover:opacity-90 text-white rounded-xl text-sm font-semibold shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating…
              </>
            ) : (
              <>
                <i className="fas fa-rocket text-xs" />
                Create Tool as Draft
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

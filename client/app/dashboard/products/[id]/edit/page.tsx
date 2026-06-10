'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toolService, categoryService } from '@/services/tool.service';
import { Category, Tool } from '@/type/tool';

const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    short_description: '',
    full_description: '',
    logo_url: '',
    website_url: '',
    demo_url: '',
    pricing_model: 'FREEMIUM',
  });

  useEffect(() => {
    loadData();
  }, [toolId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [toolResponse, categoriesResponse] = await Promise.all([
        toolService.getToolById(toolId),
        categoryService.getAll(),
      ]);

      const tool = toolResponse.data;
      setCategories(categoriesResponse.data || []);
      
      setForm({
        name: tool.name || '',
        category_id: tool.category_id || '',
        short_description: tool.short_description || '',
        full_description: tool.full_description || '',
        logo_url: tool.logo_url || '',
        website_url: tool.website_url || '',
        demo_url: tool.demo_url || '',
        pricing_model: tool.pricing_model || 'FREEMIUM',
      });
    } catch (error) {
      console.error('Failed to load tool:', error);
      setError('Failed to load tool details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.category_id) {
      setError('Tool name and category are required');
      return;
    }

    setSubmitting(true);
    try {
      await toolService.updateTool(toolId, form);
      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update tool');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
          <p className="text-sm text-avatar-steel">Loading tool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
          >
            <i className="fas fa-arrow-left text-xs text-avatar-dark" />
          </button>
          <h1 className="text-2xl font-bold text-avatar-dark">Edit AI Tool</h1>
        </div>
        <p className="text-sm text-avatar-slate">
          Update your AI tool details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-avatar-dark mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-avatar-accent" />
            Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Tool Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. AI Content Writer Pro"
                className={INPUT_CLASS}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className={INPUT_CLASS}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Pricing Model <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={form.pricing_model}
                  onChange={(e) => setForm({ ...form, pricing_model: e.target.value })}
                  className={INPUT_CLASS}
                >
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                  <option value="FREEMIUM">Freemium</option>
                  <option value="SUBSCRIPTION">Subscription</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Short Description
              </label>
              <textarea
                value={form.short_description}
                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                rows={2}
                placeholder="Brief one-line description of your tool..."
                className={INPUT_CLASS + ' resize-none'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Full Description
              </label>
              <textarea
                value={form.full_description}
                onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                rows={4}
                placeholder="Detailed description of features, benefits, and use cases..."
                className={INPUT_CLASS + ' resize-none'}
              />
            </div>
          </div>
        </div>

        {/* Links & Media */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-avatar-dark mb-4 flex items-center gap-2">
            <i className="fas fa-link text-avatar-accent" />
            Links & Media
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Logo URL
              </label>
              <input
                type="url"
                value={form.logo_url}
                onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
                className={INPUT_CLASS}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={form.website_url}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  placeholder="https://yourtool.com"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={form.demo_url}
                  onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                  placeholder="https://demo.yourtool.com"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
            <i className="fas fa-exclamation-circle text-rose-500 text-sm mt-0.5" />
            <p className="text-sm text-rose-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-avatar-dark rounded-xl text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                Updating...
              </>
            ) : (
              <>
                <i className="fas fa-save" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toolService, categoryService } from '@/services/tool.service';
import { Category } from '@/type/tool';

const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
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
    images: [''],
  });

  const [pricingPlans, setPricingPlans] = useState([
    {
      name: '',
      description: '',
      billing_cycle: 'MONTHLY',
      price: 0,
      currency: 'USD',
      trial_days: 0,
      features: [''],
    },
  ]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
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
      // Create tool
      const toolResponse = await toolService.createTool({
        ...form,
        images: form.images.filter((img) => img.trim() !== ''),
      });

      const toolId = toolResponse.data?.id || toolResponse.data?.tool?.id;

      if (!toolId) {
        throw new Error('Failed to create tool');
      }

      // Add pricing plans
      for (const plan of pricingPlans) {
        if (plan.name.trim()) {
          await toolService.addPricingPlan(toolId, {
            ...plan,
            features: plan.features.filter((f) => f.trim() !== ''),
          });
        }
      }

      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create tool');
    } finally {
      setSubmitting(false);
    }
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const removeImageField = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  const addPricingPlan = () => {
    setPricingPlans([
      ...pricingPlans,
      {
        name: '',
        description: '',
        billing_cycle: 'MONTHLY',
        price: 0,
        currency: 'USD',
        trial_days: 0,
        features: [''],
      },
    ]);
  };

  const removePricingPlan = (index: number) => {
    setPricingPlans(pricingPlans.filter((_, i) => i !== index));
  };

  const addFeature = (planIndex: number) => {
    const updated = [...pricingPlans];
    updated[planIndex].features.push('');
    setPricingPlans(updated);
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...pricingPlans];
    updated[planIndex].features = updated[planIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setPricingPlans(updated);
  };

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
          <h1 className="text-2xl font-bold text-avatar-dark">Add New AI Tool</h1>
        </div>
        <p className="text-sm text-avatar-slate">
          Fill in the details below to add your AI tool to the marketplace
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

            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Screenshots / Images
              </label>
              <div className="space-y-2">
                {form.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => {
                        const updated = [...form.images];
                        updated[index] = e.target.value;
                        setForm({ ...form, images: updated });
                      }}
                      placeholder="https://example.com/screenshot.png"
                      className={INPUT_CLASS}
                    />
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl text-sm transition-all"
                      >
                        <i className="fas fa-trash text-xs" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-avatar-accent hover:text-avatar-navy font-medium flex items-center gap-1.5"
                >
                  <i className="fas fa-plus text-xs" />
                  Add Another Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-avatar-dark flex items-center gap-2">
              <i className="fas fa-dollar-sign text-avatar-accent" />
              Pricing Plans
            </h2>
            <button
              type="button"
              onClick={addPricingPlan}
              className="px-3 py-1.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-lg text-xs font-semibold transition-all"
            >
              <i className="fas fa-plus text-[10px] mr-1" />
              Add Plan
            </button>
          </div>

          <div className="space-y-4">
            {pricingPlans.map((plan, planIndex) => (
              <div
                key={planIndex}
                className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 relative"
              >
                {pricingPlans.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePricingPlan(planIndex)}
                    className="absolute top-3 right-3 w-7 h-7 bg-white hover:bg-rose-100 text-rose-600 rounded-lg text-xs transition-all shadow-sm"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}

                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-avatar-dark mb-1">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const updated = [...pricingPlans];
                          updated[planIndex].name = e.target.value;
                          setPricingPlans(updated);
                        }}
                        placeholder="e.g. Professional Plan"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-avatar-dark mb-1">
                        Billing Cycle
                      </label>
                      <select
                        value={plan.billing_cycle}
                        onChange={(e) => {
                          const updated = [...pricingPlans];
                          updated[planIndex].billing_cycle = e.target.value;
                          setPricingPlans(updated);
                        }}
                        className={INPUT_CLASS}
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="LIFETIME">Lifetime</option>
                        <option value="ONE_TIME">One Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-avatar-dark mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={plan.price}
                        onChange={(e) => {
                          const updated = [...pricingPlans];
                          updated[planIndex].price = parseFloat(e.target.value) || 0;
                          setPricingPlans(updated);
                        }}
                        placeholder="29.99"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-avatar-dark mb-1">
                        Currency
                      </label>
                      <select
                        value={plan.currency}
                        onChange={(e) => {
                          const updated = [...pricingPlans];
                          updated[planIndex].currency = e.target.value;
                          setPricingPlans(updated);
                        }}
                        className={INPUT_CLASS}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-avatar-dark mb-1">
                        Trial Days
                      </label>
                      <input
                        type="number"
                        value={plan.trial_days}
                        onChange={(e) => {
                          const updated = [...pricingPlans];
                          updated[planIndex].trial_days = parseInt(e.target.value) || 0;
                          setPricingPlans(updated);
                        }}
                        placeholder="14"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-avatar-dark mb-1">
                      Description
                    </label>
                    <textarea
                      value={plan.description}
                      onChange={(e) => {
                        const updated = [...pricingPlans];
                        updated[planIndex].description = e.target.value;
                        setPricingPlans(updated);
                      }}
                      rows={2}
                      placeholder="Brief description of this plan..."
                      className={INPUT_CLASS + ' resize-none'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-avatar-dark mb-1">
                      Features
                    </label>
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const updated = [...pricingPlans];
                              updated[planIndex].features[featureIndex] = e.target.value;
                              setPricingPlans(updated);
                            }}
                            placeholder="e.g. 10,000 words/month"
                            className={INPUT_CLASS}
                          />
                          {plan.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(planIndex, featureIndex)}
                              className="px-3 py-2 bg-white hover:bg-rose-100 text-rose-600 rounded-xl text-sm transition-all"
                            >
                              <i className="fas fa-times text-xs" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFeature(planIndex)}
                        className="text-xs text-avatar-accent hover:text-avatar-navy font-medium flex items-center gap-1"
                      >
                        <i className="fas fa-plus text-[9px]" />
                        Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                Creating Tool...
              </>
            ) : (
              <>
                <i className="fas fa-check" />
                Create Tool (Draft)
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

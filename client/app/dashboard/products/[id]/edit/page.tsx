'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toolService, categoryService, uploadService } from '@/services/tool.service';
import { Category, Tool } from '@/type/tool';

const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition';

/** An existing image already saved in the DB */
interface ExistingImage {
  id: string;
  image_url: string;
  markedForRemoval: boolean;
}

/** A new image being uploaded */
interface NewImageEntry {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
  uploading: boolean;
  error?: string;
}

interface LogoState {
  /** The currently displayed URL — either the existing cloudinary URL or a fresh local preview */
  previewUrl: string;
  /** Set when the user picks a new file and it has been uploaded */
  uploadedUrl?: string;
  uploading: boolean;
  error?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.id as string;

  const imageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    category_id: '',
    short_description: '',
    full_description: '',
    website_url: '',
    demo_url: '',
    pricing_model: 'FREE',
  });

  // Logo state
  const [logo, setLogo] = useState<LogoState>({ previewUrl: '', uploading: false });

  // Existing images from the DB
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  // New images being added during this edit session
  const [newImages, setNewImages] = useState<NewImageEntry[]>([]);

  const totalImages = existingImages.filter(i => !i.markedForRemoval).length + newImages.length;

  useEffect(() => {
    loadData();
    return () => {
      newImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        website_url: tool.website_url || '',
        demo_url: tool.demo_url || '',
        pricing_model: tool.pricing_model || 'FREE',
      });

      // Populate logo preview with existing URL
      if (tool.logo_url) {
        setLogo({ previewUrl: tool.logo_url, uploading: false });
      }

      // Populate existing images
      if (tool.images && Array.isArray(tool.images)) {
        setExistingImages(
          tool.images.map((img: { id: string; image_url: string }) => ({
            id: img.id,
            image_url: img.image_url,
            markedForRemoval: false,
          }))
        );
      }
    } catch {
      setError('Failed to load tool details');
    } finally {
      setLoading(false);
    }
  };

  // ── Logo ─────────────────────────────────────────────────
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogo({ previewUrl, uploading: true });

    try {
      const result = await uploadService.uploadImage(file, 'ai-marketplace/tools/logos');
      setLogo({ previewUrl, uploadedUrl: result.url, uploading: false });
    } catch {
      setLogo(prev => ({ ...prev, uploading: false, error: 'Logo upload failed. Try again.' }));
    }

    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const removeLogo = () => {
    setLogo({ previewUrl: '', uploading: false });
  };

  // ── Screenshots ──────────────────────────────────────────
  const toggleExistingImageRemoval = (id: string) => {
    setExistingImages(prev =>
      prev.map(img => img.id === id ? { ...img, markedForRemoval: !img.markedForRemoval } : img)
    );
  };

  const handleNewImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (totalImages + files.length > 5) {
      setError(`You can have a maximum of 5 screenshots. You have ${totalImages} active.`);
      return;
    }
    setError(null);

    const newEntries: NewImageEntry[] = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploading: true,
    }));
    setNewImages(prev => [...prev, ...newEntries]);

    const uploadResults = await Promise.allSettled(
      files.map(f => uploadService.uploadImage(f, 'ai-marketplace/tools/screenshots'))
    );

    setNewImages(prev => {
      const startIdx = prev.length - files.length;
      return prev.map((entry, idx) => {
        if (idx < startIdx) return entry;
        const result = uploadResults[idx - startIdx];
        if (result.status === 'fulfilled') {
          return { ...entry, uploadedUrl: result.value.url, uploading: false };
        }
        return { ...entry, uploading: false, error: 'Upload failed' };
      });
    });

    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newImages[index].previewUrl);
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.category_id) {
      setError('Tool name and category are required');
      return;
    }

    const stillUploading = newImages.some(img => img.uploading) || logo.uploading;
    if (stillUploading) {
      setError('Please wait for all images to finish uploading.');
      return;
    }

    const failedImages = newImages.filter(img => img.error);
    if (failedImages.length > 0) {
      setError('Some images failed to upload. Remove them and try again.');
      return;
    }

    setSubmitting(true);
    try {
      // Build the final images array:
      // - Keep existing images that are NOT marked for removal
      // - Append all successfully uploaded new images
      const keptExistingUrls = existingImages
        .filter(img => !img.markedForRemoval)
        .map(img => img.image_url);

      const newUploadedUrls = newImages
        .filter(img => img.uploadedUrl)
        .map(img => img.uploadedUrl as string);

      const allImageUrls = [...keptExistingUrls, ...newUploadedUrls];

      await toolService.updateTool(toolId, {
        ...form,
        logo_url: logo.uploadedUrl ?? (logo.previewUrl.startsWith('http') ? logo.previewUrl : undefined),
        images: allImageUrls,
      });

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
        <p className="text-sm text-avatar-slate">Update your AI tool details</p>
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
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5">
                Tool Logo
              </label>
              <input
                type="file"
                ref={logoInputRef}
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {logo.previewUrl ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.previewUrl} alt="Logo preview" className="w-full h-full object-contain p-1" />
                    {logo.uploading && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin text-avatar-accent" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {logo.uploading && <p className="text-xs text-avatar-slate">Uploading...</p>}
                    {logo.error && <p className="text-xs text-rose-500">{logo.error}</p>}
                    {logo.uploadedUrl && !logo.uploading && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1">
                        <i className="fas fa-check-circle" /> New logo uploaded
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={logo.uploading}
                      className="text-xs text-avatar-accent hover:text-avatar-navy font-medium flex items-center gap-1 disabled:opacity-50"
                    >
                      <i className="fas fa-sync text-[10px]" /> Replace
                    </button>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
                    >
                      <i className="fas fa-trash text-[10px]" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 hover:border-avatar-accent/50 text-avatar-slate rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-image text-avatar-accent" />
                  Upload Logo
                </button>
              )}
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

            {/* Screenshots */}
            <div>
              <label className="block text-sm font-medium text-avatar-dark mb-1.5 flex justify-between">
                <span>Screenshots / Images <span className="text-xs text-slate-400">(Max 5)</span></span>
                <span className="text-xs text-slate-500">{totalImages} / 5 active</span>
              </label>

              <input
                type="file"
                ref={imageInputRef}
                multiple
                accept="image/*"
                onChange={handleNewImagesChange}
                disabled={totalImages >= 5}
                className="hidden"
              />

              <div className="space-y-3">
                {(existingImages.length > 0 || newImages.length > 0) && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    {/* Existing images */}
                    {existingImages.map((img) => (
                      <div
                        key={img.id}
                        className={`relative aspect-video sm:aspect-square rounded-lg overflow-hidden group border ${
                          img.markedForRemoval
                            ? 'border-rose-400 opacity-50'
                            : 'border-slate-300 bg-slate-200'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.image_url}
                          alt="Screenshot"
                          className="w-full h-full object-cover"
                        />
                        {img.markedForRemoval && (
                          <div className="absolute inset-0 bg-rose-100/60 flex items-center justify-center">
                            <span className="text-[10px] text-rose-700 font-semibold bg-rose-100 px-1 rounded">
                              Will be removed
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleExistingImageRemoval(img.id)}
                          title={img.markedForRemoval ? 'Undo remove' : 'Mark for removal'}
                          className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all shadow-sm text-white ${
                            img.markedForRemoval
                              ? 'bg-emerald-500 hover:bg-emerald-600'
                              : 'bg-rose-600 hover:bg-rose-700'
                          }`}
                        >
                          <i className={`fas ${img.markedForRemoval ? 'fa-undo' : 'fa-times'} text-[10px]`} />
                        </button>
                      </div>
                    ))}

                    {/* New images being uploaded */}
                    {newImages.map((img, index) => (
                      <div
                        key={img.previewUrl}
                        className="relative aspect-video sm:aspect-square bg-slate-200 rounded-lg overflow-hidden group border border-slate-300"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.previewUrl}
                          alt={`New screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {img.uploading && (
                          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-1">
                            <i className="fas fa-spinner fa-spin text-avatar-accent text-lg" />
                            <span className="text-[10px] text-avatar-slate">Uploading...</span>
                          </div>
                        )}
                        {img.error && !img.uploading && (
                          <div className="absolute inset-0 bg-rose-50/80 flex flex-col items-center justify-center gap-1 p-1">
                            <i className="fas fa-exclamation-circle text-rose-500" />
                            <span className="text-[9px] text-rose-600 text-center leading-tight">{img.error}</span>
                          </div>
                        )}
                        {img.uploadedUrl && !img.uploading && (
                          <div className="absolute bottom-1 left-1">
                            <span className="bg-emerald-500 text-white text-[9px] px-1 rounded">✓ New</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        >
                          <i className="fas fa-times text-[10px]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  disabled={totalImages >= 5}
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 hover:border-avatar-accent/50 text-avatar-slate rounded-xl text-sm font-medium transition-all flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-cloud-upload-alt text-xl text-avatar-accent" />
                  <span>
                    {totalImages >= 5
                      ? 'Maximum image limit reached'
                      : 'Click to upload more screenshots'}
                  </span>
                </button>
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
                Saving...
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

'use client';

import { useRef } from 'react';
import { INPUT_CLASS, LABEL_CLASS, ImageEntry, LogoEntry, ToolForm } from './types';
import { uploadService } from '@/services/tool.service';

type SetImages = (updater: ImageEntry[] | ((prev: ImageEntry[]) => ImageEntry[])) => void;

interface Props {
  form: ToolForm;
  logo: LogoEntry;
  images: ImageEntry[];
  onFormChange: (patch: Partial<ToolForm>) => void;
  onLogoChange: (logo: LogoEntry) => void;
  onImagesChange: SetImages;
  onError: (msg: string | null) => void;
}

export default function MediaSection({
  form,
  logo,
  images,
  onFormChange,
  onLogoChange,
  onImagesChange,
  onError,
}: Props) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ── Logo ─────────────────────────────────────────────────
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    if (logo.file) URL.revokeObjectURL(logo.previewUrl);
    onLogoChange({ file, previewUrl, uploading: true });
    try {
      const result = await uploadService.uploadImage(file, 'ai-marketplace/tools/logos');
      onLogoChange({ file, previewUrl, uploadedUrl: result.url, uploading: false });
    } catch {
      onLogoChange({ file, previewUrl, uploading: false, error: 'Upload failed. Try again.' });
    }
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const removeLogo = () => {
    if (logo.file) URL.revokeObjectURL(logo.previewUrl);
    onLogoChange({ file: null, previewUrl: '', uploading: false });
  };

  // ── Screenshots ──────────────────────────────────────────
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      onError('Maximum 5 screenshots allowed.');
      return;
    }
    onError(null);
    const newEntries: ImageEntry[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploading: true,
    }));
    onImagesChange([...images, ...newEntries]);
    const results = await Promise.allSettled(
      files.map((f) => uploadService.uploadImage(f, 'ai-marketplace/tools/screenshots'))
    );
    onImagesChange((prev) => {
      const start = prev.length - files.length;
      return prev.map((entry, idx) => {
        if (idx < start) return entry;
        const r = results[idx - start];
        return r.status === 'fulfilled'
          ? { ...entry, uploadedUrl: r.value.url, uploading: false }
          : { ...entry, uploading: false, error: 'Upload failed' };
      });
    });
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].previewUrl);
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const slots = 5;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-photo-film text-violet-500 text-sm" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Media & Links</h2>
          <p className="text-xs text-slate-500">Logo, screenshots and tool URLs</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Logo + URLs row */}
        <div className="grid sm:grid-cols-3 gap-5">
          {/* Logo upload */}
          <div>
            <label className={LABEL_CLASS}>
              Logo <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              ref={logoInputRef}
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <div
              onClick={() => !logo.previewUrl && logoInputRef.current?.click()}
              className={`relative w-full aspect-square rounded-2xl border-2 overflow-hidden flex flex-col items-center justify-center transition-all duration-150 ${
                logo.previewUrl
                  ? 'border-slate-200 cursor-default'
                  : 'border-dashed border-slate-300 hover:border-avatar-accent/60 hover:bg-avatar-accent/5 cursor-pointer bg-slate-50'
              }`}
            >
              {logo.previewUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.previewUrl}
                    alt="Logo"
                    className="w-full h-full object-contain p-3"
                  />
                  {/* Uploading overlay */}
                  {logo.uploading && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-1.5">
                      <div className="w-6 h-6 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
                      <span className="text-[10px] text-slate-500">Uploading…</span>
                    </div>
                  )}
                  {/* Success badge */}
                  {logo.uploadedUrl && !logo.uploading && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                      <i className="fas fa-check text-white text-[9px]" />
                    </div>
                  )}
                  {/* Error badge */}
                  {logo.error && !logo.uploading && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow">
                      <i className="fas fa-exclamation text-white text-[9px]" />
                    </div>
                  )}
                  {/* Remove + replace buttons */}
                  <div className="absolute bottom-0 inset-x-0 p-2 flex gap-1.5 bg-gradient-to-t from-black/30 to-transparent">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); logoInputRef.current?.click(); }}
                      className="flex-1 py-1 text-[10px] font-semibold text-white bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeLogo(); }}
                      className="flex-1 py-1 text-[10px] font-semibold text-white bg-rose-500/70 hover:bg-rose-500 rounded-lg backdrop-blur-sm transition"
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-2">
                    <i className="fas fa-image text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">Upload Logo</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5 MB</p>
                </>
              )}
            </div>
            {logo.error && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <i className="fas fa-exclamation-circle text-[10px]" /> {logo.error}
              </p>
            )}
          </div>

          {/* URLs */}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div>
              <label className={LABEL_CLASS}>
                Website URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  <i className="fas fa-globe" />
                </span>
                <input
                  type="url"
                  required
                  value={form.website_url}
                  onChange={(e) => onFormChange({ website_url: e.target.value })}
                  placeholder="https://yourtool.com"
                  className={INPUT_CLASS + ' pl-9'}
                />
              </div>
            </div>

            <div>
              <label className={LABEL_CLASS}>
                Demo URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  <i className="fas fa-play-circle" />
                </span>
                <input
                  type="url"
                  required
                  value={form.demo_url}
                  onChange={(e) => onFormChange({ demo_url: e.target.value })}
                  placeholder="https://demo.yourtool.com"
                  className={INPUT_CLASS + ' pl-9'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={LABEL_CLASS + ' mb-0'}>
              Screenshots <span className="text-rose-500">*</span>
              <span className="ml-1.5 text-xs font-normal text-slate-400">Up to 5 images</span>
            </label>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: slots }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < images.length ? 'bg-avatar-accent' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <input
            type="file"
            ref={imageInputRef}
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            disabled={images.length >= 5}
            className="hidden"
          />

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {/* Filled slots */}
            {images.map((img, index) => (
              <div
                key={img.previewUrl}
                className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {img.uploading && (
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-1">
                    <div className="w-5 h-5 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
                  </div>
                )}
                {img.error && !img.uploading && (
                  <div className="absolute inset-0 bg-rose-50/90 flex flex-col items-center justify-center gap-1 p-2">
                    <i className="fas fa-exclamation-circle text-rose-500 text-sm" />
                    <span className="text-[9px] text-rose-600 text-center leading-tight">{img.error}</span>
                  </div>
                )}
                {img.uploadedUrl && !img.uploading && (
                  <div className="absolute top-1.5 left-1.5">
                    <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                      <i className="fas fa-check text-white text-[8px]" />
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-rose-600 text-white rounded-full items-center justify-center hidden group-hover:flex transition-all"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
              </div>
            ))}

            {/* Empty slot / add button — only show when under limit */}
            {images.length < 5 && (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="aspect-video sm:aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-avatar-accent/60 hover:bg-avatar-accent/5 flex flex-col items-center justify-center gap-1 transition-all duration-150 group"
              >
                <i className="fas fa-plus text-slate-400 group-hover:text-avatar-accent text-base transition-colors" />
                <span className="text-[10px] text-slate-400 group-hover:text-avatar-accent font-medium transition-colors">
                  Add
                </span>
              </button>
            )}
          </div>

          {images.length === 0 && (
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <i className="fas fa-info-circle" /> At least 1 screenshot is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

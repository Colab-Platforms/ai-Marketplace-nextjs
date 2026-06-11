'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getVendorProfile,
  updateVendorStatus,
  uploadDocumentFile,
  addVendorDocument,
  submitVendorVerification,
  VendorProfile,
} from '@/lib/verification';

interface UploadState {
  file: File | null;
  progress: number;
  uploaded: boolean;
  error: string | null;
  url: string | null;
}

const INITIAL_UPLOAD_STATE: UploadState = {
  file: null,
  progress: 0,
  uploaded: false,
  error: null,
  url: null,
};

export default function VerificationPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Document Upload states
  const [gst, setGst] = useState<UploadState>(INITIAL_UPLOAD_STATE);
  const [pan, setPan] = useState<UploadState>(INITIAL_UPLOAD_STATE);
  const [cin, setCin] = useState<UploadState>(INITIAL_UPLOAD_STATE);

  useEffect(() => {
    async function load() {
      const data = await getVendorProfile();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);
  const handleUpload = async (
    type: 'gst' | 'pan' | 'cin',
    file: File,
    setter: React.Dispatch<React.SetStateAction<UploadState>>
  ) => {
    setter({ file, progress: 0, uploaded: false, error: null, url: null });

    try {
      const url = await uploadDocumentFile(file, (progressEvent: any) => {
        // Guard against missing total, fall back to indeterminate progress
        const percent = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 50; // show 50% as "in progress" if total unknown
        setter(prev => ({ ...prev, progress: percent }));
      });

      // Explicitly set 100% + uploaded only after the Promise resolves
      setter({ file, progress: 100, uploaded: true, error: null, url });
    } catch (err: any) {
      setter({ file, progress: 0, uploaded: false, error: err?.message || 'Upload failed', url: null });
    }
  };

  const handleFileChange = (type: 'gst' | 'pan' | 'cin') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      const err = 'File size exceeds 5MB limit.';
      const updateError = (prev: UploadState) => ({ ...prev, error: err });
      if (type === 'gst') setGst(updateError);
      if (type === 'pan') setPan(updateError);
      if (type === 'cin') setCin(updateError);
      return;
    }

    if (type === 'gst') handleUpload('gst', file, setGst);
    if (type === 'pan') handleUpload('pan', file, setPan);
    if (type === 'cin') handleUpload('cin', file, setCin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gst.uploaded || !pan.uploaded || !cin.uploaded || !profile?.id) return;

    setSubmitting(true);
    try {
      // 1. Submit GST doc registry
      if (gst.url) {
        await addVendorDocument(profile.id, 'GST Certificate', gst.url);
      }
      // 2. Submit PAN doc registry
      if (pan.url) {
        await addVendorDocument(profile.id, 'PAN Card', pan.url);
      }
      // 3. Submit CIN doc registry
      if (cin.url) {
        await addVendorDocument(profile.id, 'CIN / Registration Certificate', cin.url);
      }

      // 4. Submit verification status change (INCOMPLETE to PENDING_VERIFICATION)
      const updated = await submitVendorVerification(profile.id);
      if (updated) {
        setProfile(updated);
        // Force status reload in layout
        window.location.reload();
      }
    } catch (err: any) {
      console.error('Failed to submit documents:', err);
      alert(err?.message || 'Failed to submit documents for review.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-avatar-accent/30 border-t-avatar-accent animate-spin" />
        <p className="text-xs text-avatar-steel">Loading profile data…</p>
      </div>
    );
  }

  const status = profile?.verification_status || 'Incomplete';

  const docSlots = [
    {
      id: 'gst' as const,
      title: 'GST Registration Certificate',
      desc: 'Upload a scan copy of your GSTIN certificate in PDF or Image format.',
      state: gst,
      required: !!profile?.gstNumber,
      label: 'GST Certificate',
    },
    {
      id: 'pan' as const,
      title: 'Company PAN Card',
      desc: 'Upload a clear scan of your company or proprietor PAN card.',
      state: pan,
      required: !!profile?.pan_number,
      label: 'PAN Card',
    },
    {
      id: 'cin' as const,
      title: 'CIN / Certificate of Incorporation',
      desc: 'Required for Private Limited, LLP, and registered corporate entities.',
      state: cin,
      required: !!profile?.registaration_number,
      label: 'CIN / Registration Certificate',
    },
  ];
  // console.log(docSlots[0].state)
  const allUploaded = gst.uploaded && pan.uploaded && cin.uploaded;

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Onboarding &amp; Verification</h1>
        <p className="text-sm text-slate-500">
          Upload required registration and tax documents to verify your business and activate full seller listings.
        </p>
      </div>

      {status === 'Pending' && (
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 text-sky-900 flex items-start gap-4 shadow-sm">
          <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-base">
            <i className="fas fa-history" />
          </span>
          <div>
            <h2 className="font-semibold text-sm">Verification Under Review</h2>
            <p className="text-xs text-sky-800 mt-1 leading-relaxed">
              We have received your verification documents. Our administrative compliance team is currently reviewing the files.
              This review typically takes 24–48 hours. We will update your partner status and notify you once completed.
            </p>
          </div>
        </div>
      )}

      {status === 'Verified' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-emerald-900 flex items-start gap-4 shadow-sm">
          <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-base">
            <i className="fas fa-check-circle" />
          </span>
          <div>
            <h2 className="font-semibold text-sm">Account Verified</h2>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Your vendor workspace is verified. All documents have been reviewed and approved.
              You are ready to list AI agents and receive payouts. Thank you for partnering with Avatar!
            </p>
          </div>
        </div>
      )}

      {(status === 'Incomplete' || status === 'Rejected') && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'Rejected' && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 text-rose-900 flex items-start gap-4 shadow-sm">
              <span className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-base">
                <i className="fas fa-times-circle" />
              </span>
              <div>
                <h2 className="font-semibold text-sm">Documentation Rejected</h2>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  Your submitted documentation was rejected by the audit team due to blurred images or incorrect format.
                  Please review files and re-upload clear copies below.
                </p>
              </div>
            </div>
          )}

          {/* Document Upload Slots */}
          <div className="space-y-5">
            {docSlots.map((slot) => (
              <div key={slot.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      {slot.title}
                      {slot.required && (
                        <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-semibold">
                          Required
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{slot.desc}</p>
                  </div>

                  {/* Hidden Input File */}
                  <label className="relative shrink-0">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange(slot.id)}
                      className="hidden"
                      disabled={slot.state.progress > 0 && !slot.state.uploaded}
                    />
                    <span className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition">
                      <i className="fas fa-upload text-[10px]" />
                      Select File
                    </span>
                  </label>
                </div>

                {/* Progress bar / Uploaded Status */}
                {slot.state.file && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm ${slot.state.uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-avatar-accent/10 text-avatar-accent'
                      }`}>
                      <i className={`fas ${slot.state.uploaded ? 'fa-check' : 'fa-file-alt animate-pulse'}`} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs font-semibold text-slate-700 truncate">{slot.state.file.name}</p>
                        <p className="text-[10px] font-bold text-slate-500">{slot.state.progress}%</p>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${slot.state.uploaded ? 'bg-emerald-500' : 'bg-avatar-accent'
                            }`}
                          style={{ width: `${slot.state.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {slot.state.error && (
                  <p className="text-xs text-rose-600 mt-2 flex items-center gap-1.5">
                    <i className="fas fa-exclamation-circle" />
                    {slot.state.error}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!allUploaded || submitting}
            className="w-full py-4 bg-avatar-accent hover:bg-avatar-navy text-white rounded-2xl font-bold text-sm shadow-md shadow-avatar-accent/10 hover:shadow-avatar-navy/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Submitting Verification…
              </>
            ) : (
              <>
                Submit Documents for Review <i className="fas fa-arrow-right text-[11px]" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

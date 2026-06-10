import apiClient from './api';

export interface VendorProfile {
  id?: string;
  company_name: string;
  brand_name: string;
  company_type: string;
  gstNumber: string;
  registaration_number: string;
  pan_number: string;
  registered_address: string;
  date_of_incorporation: string;
  website_url: string;
  description: string;
  country: string;
  state: string;
  city: string;
  verification_status: 'Incomplete' | 'Pending' | 'Verified' | 'Rejected';
}

const LOCAL_STORAGE_KEY = 'avatar_vendor_profile';

// Status mapper helpers to map between frontend Title Case and backend UPPERCASE enums
export function mapBackendStatusToFrontend(status?: string): VendorProfile['verification_status'] {
  if (!status) return 'Incomplete';
  switch (status.toUpperCase()) {
    case 'VERIFIED':
      return 'Verified';
    case 'PENDING_VERIFICATION':
    case 'PENDING':
      return 'Pending';
    case 'REJECTED':
      return 'Rejected';
    case 'INCOMPLETE':
    default:
      return 'Incomplete';
  }
}

export function mapFrontendStatusToBackend(status: VendorProfile['verification_status']): string {
  switch (status) {
    case 'Verified':
      return 'VERIFIED';
    case 'Pending':
      return 'PENDING_VERIFICATION';
    case 'Rejected':
      return 'REJECTED';
    case 'Incomplete':
    default:
      return 'INCOMPLETE';
  }
}

// Fetch the vendor profile from backend, or fallback to localStorage on network errors
export async function getVendorProfile(): Promise<VendorProfile | null> {
  try {
    const response = await apiClient.get('/api/vendors/profile');

    if (response && response.data && response.data.success && response.data.data) {
      const data = response.data.data;
      const result = {
        ...data,
        verification_status: mapBackendStatusToFrontend(data.verification_status),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
      }
      return result;
    }
    return null;
  } catch (error: any) {
    // Vendor not found — clear stale localStorage and return null so onboarding gate works
    if (error?.response?.status === 404) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
      return null;
    }

    // Network/server error — fall back to cached localStorage so the UI doesn't break
    console.warn('Backend vendor profile fetch failed, using localStorage fallback:', error);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as VendorProfile;
          return {
            ...parsed,
            verification_status: mapBackendStatusToFrontend(parsed.verification_status),
          };
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

// Create/Submit the initial vendor profile
export async function createVendorProfile(profileData: Omit<VendorProfile, 'verification_status'>): Promise<VendorProfile> {
  const response = await apiClient.post('/api/vendors', profileData);
  if (response.data && response.data.success && response.data.data) {
    const data = response.data.data;
    const result = {
      ...data,
      verification_status: mapBackendStatusToFrontend(data.verification_status),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
    }
    return result;
  }
  throw new Error(response.data?.message || 'Failed to save vendor profile');
}

// Update the verification status (e.g. from Incomplete to Pending after documents are added)
export async function updateVendorStatus(status: VendorProfile['verification_status']): Promise<VendorProfile | null> {
  const current = await getVendorProfile();
  if (!current) return null;

  const backendStatus = mapFrontendStatusToBackend(status);
  const updated = { ...current, verification_status: status };

  try {
    const response = await apiClient.put(`/api/vendors/profile`, { verification_status: backendStatus });
    if (response.data && response.data.success && response.data.data) {
      const data = response.data.data;
      const result = {
        ...data,
        verification_status: mapBackendStatusToFrontend(data.verification_status),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
      }
      return result;
    }
  } catch (error) {
    try {
      const response = await apiClient.put(`/api/vendors/${current.id}`, { verification_status: backendStatus });
      if (response.data && response.data.success && response.data.data) {
        const data = response.data.data;
        const result = {
          ...data,
          verification_status: mapBackendStatusToFrontend(data.verification_status),
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
        }
        return result;
      }
    } catch (err) {
      console.warn('Backend vendor status update failed, using fallback:', err);
    }
  }

  // Fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

// Upload document file to /api/upload
export async function uploadDocumentFile(
  file: File,
  onUploadProgress?: (progressEvent: any) => void
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'vendor-docs');

  const response = await apiClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });

  if (response.data && response.data.success && response.data.data) {
    return response.data.data.url;
  }
  throw new Error(response.data?.message || 'File upload failed');
}

// Save document registry entry on backend
export async function addVendorDocument(vendorId: string, docType: string, docUrl: string): Promise<any> {
  const response = await apiClient.post(`/api/vendors/${vendorId}/docs`, {
    doc_type: docType,
    doc_url: docUrl,
  });
  if (response.data && response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to add vendor document');
}

// Trigger verification submit
export async function submitVendorVerification(vendorId: string): Promise<VendorProfile> {
  const response = await apiClient.post(`/api/vendors/${vendorId}/submit-verification`);
  if (response.data && response.data.success && response.data.data) {
    const data = response.data.data;
    const result = {
      ...data,
      verification_status: mapBackendStatusToFrontend(data.verification_status),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
    }
    return result;
  }
  throw new Error(response.data?.message || 'Failed to submit verification');
}

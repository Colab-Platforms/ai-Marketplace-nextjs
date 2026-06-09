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

// Fetch the vendor profile from backend, or fallback to localStorage
export async function getVendorProfile(): Promise<VendorProfile | null> {
  try {
    // Attempt actual API calls to retrieve vendor profile
    // We try both common endpoints /api/vendors/profile and /api/vendors/me
    let response;
    try {
      response = await apiClient.get('/api/vendors/profile');
    } catch (e) {
      response = await apiClient.get('/api/vendors/me');
    }
    
    if (response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('Backend vendor profile fetch failed, using fallback:', error);
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data) as VendorProfile;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

// Create/Submit the initial vendor profile
export async function createVendorProfile(profileData: Omit<VendorProfile, 'verification_status'>): Promise<VendorProfile> {
  const payload = {
    ...profileData,
    verification_status: 'Incomplete' as const,
  };

  try {
    const response = await apiClient.post('/api/vendors', payload);
    if (response.data && response.data.success && response.data.data) {
      // If server response succeeds, save to local storage as well for sync and return it
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data.data));
      }
      return response.data.data;
    }
  } catch (error) {
    console.warn('Backend vendor profile creation failed, using fallback:', error);
  }

  // Fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  }
  return payload;
}

// Update the verification status (e.g. from Incomplete to Pending after documents are added)
export async function updateVendorStatus(status: VendorProfile['verification_status']): Promise<VendorProfile | null> {
  const current = await getVendorProfile();
  if (!current) return null;

  const updated = { ...current, verification_status: status };

  try {
    const response = await apiClient.put(`/api/vendors/profile`, { verification_status: status });
    if (response.data && response.data.success && response.data.data) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data.data));
      }
      return response.data.data;
    }
  } catch (error) {
    try {
      const response = await apiClient.put(`/api/vendors/${current.id}`, { verification_status: status });
      if (response.data && response.data.success && response.data.data) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data.data));
        }
        return response.data.data;
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

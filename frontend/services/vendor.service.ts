import apiClient from '@/lib/api';

export const vendorService = {
  // Get vendor profile
  getProfile: async () => {
    const response = await apiClient.get('/api/vendors/profile');
    return response.data;
  },

  // Get vendor stats
  getStats: async () => {
    const response = await apiClient.get('/api/vendors/stats');
    return response.data;
  },

  // Create vendor profile
  createProfile: async (data: any) => {
    const response = await apiClient.post('/api/vendors/', data);
    return response.data;
  },

  // Update vendor profile
  updateProfile: async (data: any) => {
    const response = await apiClient.put('/api/vendors/profile', data);
    return response.data;
  },

  // Upload document
  uploadDocument: async (vendorId: string, data: { doc_type: string; doc_url: string }) => {
    const response = await apiClient.post(`/api/vendors/${vendorId}/docs`, data);
    return response.data;
  },

  // Get documents
  getDocuments: async (vendorId: string) => {
    const response = await apiClient.get(`/api/vendors/${vendorId}/docs`);
    return response.data;
  },

  // Submit for verification (auto-approved)
  submitVerification: async (vendorId: string) => {
    const response = await apiClient.post(`/api/vendors/${vendorId}/submit-verification`);
    return response.data;
  },
};

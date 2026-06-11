import apiClient from '@/lib/api';

export interface CreateToolData {
  name: string;
  category_id: string;
  short_description?: string;
  full_description?: string;
  logo_url?: string;
  website_url?: string;
  demo_url?: string;
  pricing_model: string;
  images?: string[];
}

export interface AddPricingPlanData {
  name: string;
  description?: string;
  billing_cycle: string;
  price: number;
  currency?: string;
  trial_days?: number;
  features?: string[];
}

export const uploadService = {
  /**
   * Uploads a single image file to Cloudinary via the backend.
   * Returns { url, public_id } on success. The file is stored as PENDING
   * in uploaded_files until the tool form is submitted (status → USED).
   */
  uploadImage: async (file: File, folder = 'ai-marketplace/tools'): Promise<{ url: string; public_id: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const response = await apiClient.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data; // { url, public_id }
  },
};

export const toolService = {
  // Get my tools
  getMyTools: async (params?: { status?: string; page?: number; pageSize?: number }) => {
    const response = await apiClient.get('/api/tools/my/list', { params });
    return response.data;
  },

  // Get all published tools (marketplace)
  getAllTools: async (params?: { category_id?: string; search?: string; page?: number; pageSize?: number }) => {
    const response = await apiClient.get('/api/tools/', { params });
    return response.data;
  },

  // Get tool by ID
  getToolById: async (id: string) => {
    const response = await apiClient.get(`/api/tools/${id}`);
    return response.data;
  },

  // Create tool
  createTool: async (data: CreateToolData) => {
    const response = await apiClient.post('/api/tools/', data);
    return response.data;
  },

  // Update tool
  updateTool: async (id: string, data: Partial<CreateToolData>) => {
    const response = await apiClient.put(`/api/tools/${id}`, data);
    return response.data;
  },

  // Delete tool
  deleteTool: async (id: string) => {
    const response = await apiClient.delete(`/api/tools/${id}`);
    return response.data;
  },

  // Publish tool
  publishTool: async (id: string) => {
    const response = await apiClient.post(`/api/tools/${id}/publish`);
    return response.data;
  },

  // Unpublish tool
  unpublishTool: async (id: string) => {
    const response = await apiClient.post(`/api/tools/${id}/unpublish`);
    return response.data;
  },

  // Add pricing plan
  addPricingPlan: async (toolId: string, data: AddPricingPlanData) => {
    const response = await apiClient.post(`/api/tools/${toolId}/pricing-plans`, data);
    return response.data;
  },

  // Get pricing plans
  getPricingPlans: async (toolId: string) => {
    const response = await apiClient.get(`/api/tools/${toolId}/pricing-plans`);
    return response.data;
  },
};

// Category service
export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get('/api/categories/');
    return response.data;
  },
};

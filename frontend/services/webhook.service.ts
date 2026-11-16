import apiClient from '@/lib/api';

export interface CreateWebhookData {
  tool_id: string;
  webhook_url: string;
  webhook_secret: string;
}

export interface UpdateWebhookData {
  webhook_url?: string;
  webhook_secret?: string;
  is_active?: boolean;
}

export const webhookService = {
  // Create webhook
  create: async (data: CreateWebhookData) => {
    const response = await apiClient.post('/api/webhooks/', data);
    return response.data;
  },

  // Get all webhooks for vendor
  getAll: async () => {
    const response = await apiClient.get('/api/webhooks/');
    return response.data;
  },

  // Get webhook for specific tool
  getByTool: async (toolId: string) => {
    const response = await apiClient.get(`/api/webhooks/tool/${toolId}`);
    return response.data;
  },

  // Update webhook
  update: async (id: string, data: UpdateWebhookData) => {
    const response = await apiClient.put(`/api/webhooks/${id}`, data);
    return response.data;
  },

  // Delete webhook
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/webhooks/${id}`);
    return response.data;
  },

  // Test webhook
  test: async (id: string) => {
    const response = await apiClient.post(`/api/webhooks/${id}/test`);
    return response.data;
  },

  // Get webhook logs
  getLogs: async (toolId: string) => {
    const response = await apiClient.get(`/api/webhooks/tool/${toolId}/logs`);
    return response.data;
  },
};

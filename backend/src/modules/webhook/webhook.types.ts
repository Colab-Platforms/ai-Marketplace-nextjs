export interface CreateWebhookBody {
  tool_id: string;
  webhook_url: string;
  webhook_secret: string;
}

export interface UpdateWebhookBody {
  webhook_url?: string;
  webhook_secret?: string;
  is_active?: boolean;
}

export const webhookSelectFields = {
  id: true,
  tool_id: true,
  webhook_url: true,
  is_active: true,
  created_at: true,
  tool: {
    select: {
      id: true,
      name: true,
    },
  },
};

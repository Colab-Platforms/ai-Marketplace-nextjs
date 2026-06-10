export interface Tool {
  id: string;
  name: string;
  category_id: string;
  short_description?: string;
  full_description?: string;
  logo_url?: string;
  website_url?: string;
  demo_url?: string;
  pricing_model: 'FREE' | 'PAID' | 'FREEMIUM' | 'SUBSCRIPTION';
  status: 'DRAFT' | 'PUBLISHED';
  vendor_id: string;
  created_at: string;
  updated_at: string;
  images?: ToolImage[];
  pricing_plans?: PricingPlan[];
  category?: Category;
}

export interface ToolImage {
  id: string;
  tool_id: string;
  image_url: string;
  display_order: number;
}

export interface PricingPlan {
  id: string;
  tool_id: string;
  name: string;
  description?: string;
  billing_cycle: 'MONTHLY' | 'YEARLY' | 'LIFETIME' | 'ONE_TIME';
  price: number;
  currency: string;
  trial_days?: number;
  is_active: boolean;
  created_at: string;
  features?: PlanFeature[];
}

export interface PlanFeature {
  id: string;
  pricing_plan_id: string;
  feature_text: string;
  display_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface VendorStats {
  totalProducts: number;
  publishedProducts: number;
  unpublishedProducts: number;
  totalUsers: number;
  vendorBalance: number;
  totalEarnings: number;
  totalPayouts: number;
  last30DaysSubscriptions: number;
  totalViews: number;
  verification_status: string;
}

export interface Webhook {
  id: string;
  vendor_id: string;
  tool_id: string;
  webhook_url: string;
  webhook_secret: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WebhookLog {
  id: string;
  webhook_id: string;
  event_type: string;
  payload: any;
  response_status?: number;
  response_body?: string;
  success: boolean;
  created_at: string;
}

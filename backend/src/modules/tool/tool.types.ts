// Which fields to return from database
export const toolSelectFields = {
    id: true,
    vendor_id: true,
    category_id: true,
    vendor: {
        select: {
            id: true,
            company_name: true,
            brand_name: true,
            owner_user_id: true,
        },
    },
    category: {
        select: {
            id: true,
            name: true,
            slug: true,
        },
    },
    name: true,
    slug: true,
    short_description: true,
    full_description: true,
    logo_url: true,
    website_url: true,
    demo_url: true,
    pricing_model: true,
    status: true,
    average_rating: true,
    total_reviews: true,
    total_views: true,
    total_launches: true,
    created_at: true,
    updated_at: true,
    images: {
        select: {
            id: true,
            image_url: true,
        },
    },
    pricing_plans: {
        select: {
            id: true,
            name: true,
            description: true,
            billing_cycle: true,
            price: true,
            currency: true,
            trial_days: true,
            is_active: true,
        },
    },
};

// Type for creating tool (POST request)
export interface CreateToolBody {
    name: string;
    category_id: string;
    short_description?: string;
    full_description?: string;
    logo_url?: string;
    website_url?: string;
    demo_url?: string;
    pricing_model: string; // "FREE", "PAID", "FREEMIUM", "SUBSCRIPTION"
    images?: string[]; // Array of image URLs
}

// Type for updating tool (PUT request)
export interface UpdateToolBody {
    name?: string;
    category_id?: string;
    short_description?: string;
    full_description?: string;
    logo_url?: string;
    website_url?: string;
    demo_url?: string;
    pricing_model?: string;
}

// Type for adding pricing plan
export interface AddPricingPlanBody {
    name: string;
    description?: string;
    billing_cycle: string; // "MONTHLY", "YEARLY", "LIFETIME", "ONE_TIME"
    price: number;
    currency?: string;
    trial_days?: number;
    features?: string[];
}

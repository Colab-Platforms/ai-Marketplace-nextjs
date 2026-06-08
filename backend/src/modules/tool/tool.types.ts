// Which fields to return from database
export const toolSelectFields = {
    id: true,
    vendorId: true,
    vendor: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    },
    name: true,
    category: true,
    description: true,
    features: true,
    pricingTiers: true,
    screenshots: true,
    demoVideoUrl: true,
    documentationUrl: true,
    painPoints: true,
    targetIndustries: true,
    pricingModel: true,
    visibility: true,
    status: true,
    createdAt: true,
    updatedAt: true,
};

// Type for creating tool (POST request)
export interface CreateToolBody {
    name: string;
    category: string;
    description: string;
    features: string[];
    pricingTiers: string[];
    screenshots: string[];
    demoVideoUrl?: string;
    documentationUrl?: string;
    painPoints?: string[];
    targetIndustries?: string[];
    pricingModel?: string;
    visibility?: 'PUBLIC' | 'PRIVATE';
}

// Type for updating tool (PUT request)
export interface UpdateToolBody {
    name?: string;
    category?: string;
    description?: string;
    features?: string[];
    pricingTiers?: string[];
    screenshots?: string[];
    demoVideoUrl?: string;
    documentationUrl?: string;
    painPoints?: string[];
    targetIndustries?: string[];
    pricingModel?: string;
    visibility?: 'PUBLIC' | 'PRIVATE';
}

// Type for tool response
export interface Tool {
    id: number;
    vendorId: number;
    vendor: {
        id: number;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    name: string;
    category: string;
    description: string;
    features: string[];
    pricingTiers: string[];
    screenshots: string[];
    demoVideoUrl?: string;
    documentationUrl?: string;
    painPoints?: string[];
    targetIndustries?: string[];
    pricingModel?: string;
    visibility?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

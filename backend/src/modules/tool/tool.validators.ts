import Joi from "joi";

// ── CreateTool ──────────────────────────────────────────────
const createToolSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Tool name is required",
        "any.required": "Tool name is required",
    }),
    category_id: Joi.string().trim().required().messages({
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
    }),
    short_description: Joi.string().trim().optional().allow(null, ""),
    full_description: Joi.string().trim().optional().allow(null, ""),
    logo_url: Joi.string().trim().uri().optional().allow(null, ""),
    website_url: Joi.string().trim().uri().optional().allow(null, ""),
    demo_url: Joi.string().trim().uri().optional().allow(null, ""),
    pricing_model: Joi.string().valid('FREE', 'PAID', 'SUBSCRIPTION').required().messages({
        "any.only": "Pricing model must be one of: FREE, PAID, SUBSCRIPTION",
        "any.required": "Pricing model is required",
    }),
    images: Joi.array().items(Joi.string().trim().uri()).optional(),
});

export const validateCreateToolSchema = (data: unknown) => {
    return createToolSchema.validate(data, { abortEarly: false });
};

// ── UpdateTool ──────────────────────────────────────────────
const updateToolSchema = Joi.object({
    name: Joi.string().trim().optional(),
    category_id: Joi.string().trim().optional(),
    short_description: Joi.string().trim().optional().allow(null, ""),
    full_description: Joi.string().trim().optional().allow(null, ""),
    logo_url: Joi.string().trim().uri().optional().allow(null, ""),
    website_url: Joi.string().trim().uri().optional().allow(null, ""),
    demo_url: Joi.string().trim().uri().optional().allow(null, ""),
    pricing_model: Joi.string().valid('FREE', 'PAID', 'SUBSCRIPTION').optional(),
    images: Joi.array().items(Joi.string().trim().uri()).optional(),
});

export const validateUpdateToolSchema = (data: unknown) => {
    return updateToolSchema.validate(data, { abortEarly: false });
};

// ── AddPricingPlan ──────────────────────────────────────────────
const addPricingPlanSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Plan name is required",
        "any.required": "Plan name is required",
    }),
    description: Joi.string().trim().optional().allow(null, ""),
    billing_cycle: Joi.string().valid('MONTHLY', 'YEARLY', 'LIFETIME', 'ONE_TIME').required().messages({
        "any.only": "Billing cycle must be one of: MONTHLY, YEARLY, LIFETIME, ONE_TIME",
        "any.required": "Billing cycle is required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least 0",
        "any.required": "Price is required",
    }),
    currency: Joi.string().trim().length(3).default("USD").optional(),
    trial_days: Joi.number().integer().min(0).optional().allow(null),
    features: Joi.array().items(Joi.string().trim()).optional(),
});

export const validateAddPricingPlanSchema = (data: unknown) => {
    return addPricingPlanSchema.validate(data, { abortEarly: false });
};

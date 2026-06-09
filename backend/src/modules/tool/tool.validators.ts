import Joi from "joi";

// ── CreateTool ──────────────────────────────────────────────
const createToolSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Tool name is required",
        "any.required": "Tool name is required",
    }),
    category: Joi.string().trim().required().messages({
        "string.empty": "Category is required",
        "any.required": "Category is required",
    }),
    description: Joi.string().trim().required().messages({
        "string.empty": "Description is required",
        "any.required": "Description is required",
    }),
    features: Joi.array().items(Joi.string().trim()).required().messages({
        "array.base": "Features must be an array",
        "any.required": "Features are required",
    }),
    pricingTiers: Joi.array().items(Joi.string().trim()).required().messages({
        "array.base": "Pricing tiers must be an array",
        "any.required": "Pricing tiers are required",
    }),
    screenshots: Joi.array().items(Joi.string().trim()).messages({
        "array.base": "Screenshots must be an array",
    }),
    demoVideoUrl: Joi.string().trim().uri().optional().allow(null, ""),
    documentationUrl: Joi.string().trim().uri().optional().allow(null, ""),
    painPoints: Joi.array().items(Joi.string().trim()).optional(),
    targetIndustries: Joi.array().items(Joi.string().trim()).optional(),
    pricingModel: Joi.string().trim().optional(),
    visibility: Joi.string().valid('PUBLIC', 'PRIVATE').optional().default('PUBLIC'),
});

export const validateCreateToolSchema = (data: unknown) => {
    return createToolSchema.validate(data, { abortEarly: false });
};

// ── UpdateTool ──────────────────────────────────────────────
const updateToolSchema = Joi.object({
    name: Joi.string().trim().optional(),
    category: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    features: Joi.array().items(Joi.string().trim()).optional(),
    pricingTiers: Joi.array().items(Joi.string().trim()).optional(),
    screenshots: Joi.array().items(Joi.string().trim()).optional(),
    demoVideoUrl: Joi.string().trim().uri().optional().allow(null, ""),
    documentationUrl: Joi.string().trim().uri().optional().allow(null, ""),
    painPoints: Joi.array().items(Joi.string().trim()).optional(),
    targetIndustries: Joi.array().items(Joi.string().trim()).optional(),
    pricingModel: Joi.string().trim().optional(),
    visibility: Joi.string().valid('PUBLIC', 'PRIVATE').optional(),
});

export const validateUpdateToolSchema = (data: unknown) => {
    return updateToolSchema.validate(data, { abortEarly: false });
};

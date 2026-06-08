import Joi from "joi";

// ── CreateUser ──────────────────────────────────────────────
const createUserSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "string.empty": "firstName is required",
        "any.required": "firstName is required",
    }),
    lastName: Joi.string().trim().required().messages({
        "string.empty": "lastName is required",
        "any.required": "lastName is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "A valid email is required",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: Joi.string()
        .min(8)
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
    phone: Joi.string().trim().allow(null, "").optional(),
});

export const validateCreateUserSchema = (data: unknown) => {
    return createUserSchema.validate(data, { abortEarly: false });
};

// ── UpdateUser ──────────────────────────────────────────────
const updateUserSchema = Joi.object({
    firstName: Joi.string().trim().allow("").optional(),
    lastName: Joi.string().trim().allow("").optional(),
    phone: Joi.string().trim().allow(null, "").optional(),
    department: Joi.string().trim().allow(null, "").optional(),
    jobRole: Joi.string().trim().allow(null, "").optional(),
    timezone: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
    companyId: Joi.number().integer().optional().allow(null),
});

export const validateUpdateUserSchema = (data: unknown) => {
    return updateUserSchema.validate(data, { abortEarly: false });
};

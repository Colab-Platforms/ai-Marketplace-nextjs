import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "string.empty": "firstName is required",
        "any.required": "firstName is required",
    }),
    lastName: Joi.string().trim().required().messages({
        "string.empty": "lastName is required",
        "any.required": "lastName is required",
    }),
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.email": "A valid email is required",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
        "string.min": "Password must be at least 8 characters",
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "confirmPassword must match password",
        "string.empty": "confirmPassword is required",
        "any.required": "confirmPassword is required",
    }),
    phone_number: Joi.string().trim().optional().messages({
        "string.empty": "phone_number cannot be empty",
    }),
    type: Joi.string().valid("Buyer", "Vendor").required().messages({
        "any.only": "type must be either 'Buyer' or 'Vendor'",
        "string.empty": "type is required",
        "any.required": "type is required",
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.email": "A valid email is required",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
    type: Joi.string().valid("Buyer", "Vendor").required().messages({
        "any.only": "type must be either 'Buyer' or 'Vendor'",
        "string.empty": "type is required",
        "any.required": "type is required",
    }),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.email": "A valid email is required",
        "any.required": "Email is required",
    }),
});

const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        "any.required": "Reset token is required",
    }),
    password: Joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
        "string.min": "Password must be at least 8 characters",
        "string.pattern.base": "Password must contain uppercase, lowercase, and a number",
        "any.required": "Password is required",
    }),
});

export const validateRegisterSchema = (data: unknown) => registerSchema.validate(data, { abortEarly: false });
export const validateLoginSchema = (data: unknown) => loginSchema.validate(data, { abortEarly: false });
export const validateForgotPasswordSchema = (data: unknown) => forgotPasswordSchema.validate(data, { abortEarly: false });
export const validateResetPasswordSchema = (data: unknown) => resetPasswordSchema.validate(data, { abortEarly: false });

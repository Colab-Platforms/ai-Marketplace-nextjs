import Joi from "joi";

const createSubscriptionSchema = Joi.object({
    customerId: Joi.number().integer().positive().required(),
    vendorId: Joi.number().integer().positive().required(),
    toolId: Joi.number().integer().positive().required(),
    startDate: Joi.string().required(),
    renewalDate: Joi.string().required(),
    monthlyValue: Joi.number().positive().required(),
    status: Joi.string().valid("ACTIVE", "CANCELLED", "EXPIRED").optional(),
});

const updateSubscriptionSchema = Joi.object({
    renewalDate: Joi.string().optional(),
    monthlyValue: Joi.number().positive().optional(),
    status: Joi.string().valid("ACTIVE", "CANCELLED", "EXPIRED").optional(),
});

export const validateCreateSubscription = (data: unknown) =>
    createSubscriptionSchema.validate(data, { abortEarly: false });

export const validateUpdateSubscription = (data: unknown) =>
    updateSubscriptionSchema.validate(data, { abortEarly: false });

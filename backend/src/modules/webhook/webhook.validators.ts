import Joi from "joi";

const createWebhookSchema = Joi.object({
  tool_id: Joi.string().trim().required().messages({
    "string.empty": "Tool ID is required",
    "any.required": "Tool ID is required",
  }),
  webhook_url: Joi.string().trim().uri().required().messages({
    "string.empty": "Webhook URL is required",
    "string.uri": "Webhook URL must be a valid URL",
    "any.required": "Webhook URL is required",
  }),
  webhook_secret: Joi.string().trim().required().messages({
    "string.empty": "Webhook secret is required",
    "any.required": "Webhook secret is required",
  }),
});

export const validateCreateWebhookSchema = (data: unknown) => {
  return createWebhookSchema.validate(data, { abortEarly: false });
};

const updateWebhookSchema = Joi.object({
  webhook_url: Joi.string().trim().uri().optional(),
  webhook_secret: Joi.string().trim().optional(),
  is_active: Joi.boolean().optional(),
});

export const validateUpdateWebhookSchema = (data: unknown) => {
  return updateWebhookSchema.validate(data, { abortEarly: false });
};

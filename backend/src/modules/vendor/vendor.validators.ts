import Joi from "joi";

export const createVendorSchema = Joi.object({
  company_name: Joi.string().trim().required().messages({ "string.empty": "Company name is required", "any.required": "Company name is required" }),
  brand_name: Joi.string().trim().optional().allow(null, ""),
  company_type: Joi.string().trim().optional().allow(null, ""),
  gstNumber: Joi.string().trim().optional().allow(null, ""),
  registaration_number: Joi.string().trim().optional().allow(null, ""),
  pan_number: Joi.string().trim().optional().allow(null, ""),
  registered_address: Joi.string().trim().optional().allow(null, ""),
  date_of_incorporation: Joi.date().iso().optional().allow(null, ""),
  website_url: Joi.string().uri().optional().allow(null, ""),
  description: Joi.string().trim().optional().allow(null, ""),
  country: Joi.string().trim().optional().allow(null, ""),
  state: Joi.string().trim().optional().allow(null, ""),
  city: Joi.string().trim().optional().allow(null, "")
});

export const validateCreateVendorSchema = (data: unknown) => {
    return createVendorSchema.validate(data, { abortEarly: false });
};

export const updateVendorSchema = Joi.object({
  company_name: Joi.string().trim().optional(),
  brand_name: Joi.string().trim().optional().allow(null, ""),
  company_type: Joi.string().trim().optional().allow(null, ""),
  gstNumber: Joi.string().trim().optional().allow(null, ""),
  registaration_number: Joi.string().trim().optional().allow(null, ""),
  pan_number: Joi.string().trim().optional().allow(null, ""),
  registered_address: Joi.string().trim().optional().allow(null, ""),
  date_of_incorporation: Joi.date().iso().optional().allow(null, ""),
  website_url: Joi.string().uri().optional().allow(null, ""),
  description: Joi.string().trim().optional().allow(null, ""),
  country: Joi.string().trim().optional().allow(null, ""),
  state: Joi.string().trim().optional().allow(null, ""),
  city: Joi.string().trim().optional().allow(null, ""),
  verification_status: Joi.string().trim().optional()
});

export const validateUpdateVendorSchema = (data: unknown) => {
    return updateVendorSchema.validate(data, { abortEarly: false });
};

export const addVendorDocSchema = Joi.object({
  doc_type: Joi.string().trim().required().messages({ "string.empty": "Document type is required", "any.required": "Document type is required" }),
  doc_url: Joi.string().uri().required().messages({ "string.empty": "Document URL is required", "any.required": "Document URL is required", "string.uri": "Document URL must be a valid URI" })
});

export const validateAddVendorDocSchema = (data: unknown) => {
    return addVendorDocSchema.validate(data, { abortEarly: false });
};


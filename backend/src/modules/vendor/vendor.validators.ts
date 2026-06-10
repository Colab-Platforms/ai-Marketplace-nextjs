import Joi from "joi";

export const createVendorSchema = Joi.object({
  company_name: Joi.string().trim().required().messages({ "string.empty": "Company name is required", "any.required": "Company name is required" }),
  brand_name: Joi.string().trim().optional().allow(null).empty(""),
  company_type: Joi.string().trim().optional().allow(null).empty(""),
  gstNumber: Joi.string().trim().optional().allow(null).empty(""),
  registaration_number: Joi.string().trim().optional().allow(null).empty(""),
  pan_number: Joi.string().trim().optional().allow(null).empty(""),
  registered_address: Joi.string().trim().optional().allow(null).empty(""),
  date_of_incorporation: Joi.date().iso().optional().allow(null).empty(""),
  website_url: Joi.string().trim().optional().allow(null).empty(""),
  description: Joi.string().trim().optional().allow(null).empty(""),
  country: Joi.string().trim().optional().allow(null).empty(""),
  state: Joi.string().trim().optional().allow(null).empty(""),
  city: Joi.string().trim().optional().allow(null).empty("")
});

export const validateCreateVendorSchema = (data: unknown) => {
    return createVendorSchema.validate(data, { abortEarly: false });
};

export const updateVendorSchema = Joi.object({
  company_name: Joi.string().trim().optional().allow(null).empty(""),
  brand_name: Joi.string().trim().optional().allow(null).empty(""),
  company_type: Joi.string().trim().optional().allow(null).empty(""),
  gstNumber: Joi.string().trim().optional().allow(null).empty(""),
  registaration_number: Joi.string().trim().optional().allow(null).empty(""),
  pan_number: Joi.string().trim().optional().allow(null).empty(""),
  registered_address: Joi.string().trim().optional().allow(null).empty(""),
  date_of_incorporation: Joi.date().iso().optional().allow(null).empty(""),
  website_url: Joi.string().trim().optional().allow(null).empty(""),
  description: Joi.string().trim().optional().allow(null).empty(""),
  country: Joi.string().trim().optional().allow(null).empty(""),
  state: Joi.string().trim().optional().allow(null).empty(""),
  city: Joi.string().trim().optional().allow(null).empty(""),
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


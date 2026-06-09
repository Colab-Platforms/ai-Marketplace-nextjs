import Joi from "joi";

// CreateCompany
const createCompanySchema = Joi.object({
    name: Joi.string().trim().required().messages({ "string.empty": "Company name is required", "any.required": "Company name is required" }),
    industry: Joi.string().trim().required().messages({ "string.empty": "Industry is required", "any.required": "Industry is required" }),
    type: Joi.string().valid("BUYER", "VENDOR").required().messages({ "any.only": "Type must be BUYER or VENDOR", "any.required": "Type is required" }),
    size: Joi.string().trim().optional().messages({ "string.empty": "GST number cannot be empty" }),
    gstNumber: Joi.string().trim().optional().messages({ "string.empty": "GST number cannot be empty" }),
    address: Joi.string().trim().optional().messages({ "string.empty": "Address cannot be empty" }),
});

export const validateCreateCompanySchema = (data: unknown) => {
    return createCompanySchema.validate(data, { abortEarly: false });
};

// UpdateCompany
const updateCompanySchema = Joi.object({
    name: Joi.string().trim().optional(),
    industry: Joi.string().trim().optional(),
    size: Joi.string().trim().optional(),
    type: Joi.string().trim().optional(),
    gstNumber: Joi.string().trim().optional().allow(null, ""),
    registrationNumber: Joi.string().trim().optional().allow(null, ""),
    panNumber: Joi.string().trim().optional().allow(null, ""),
    taxId: Joi.string().trim().optional().allow(null, ""),
    websiteUrl: Joi.string().trim().optional().allow(null, ""),
    address: Joi.string().trim().optional().allow(null, ""),
    registeredAddress: Joi.string().trim().optional().allow(null, ""),
    bankName: Joi.string().trim().optional().allow(null, ""),
    bankAccountNumber: Joi.string().trim().optional().allow(null, ""),
    bankIfscCode: Joi.string().trim().optional().allow(null, ""),
    registrationCertificateUrl: Joi.string().trim().optional().allow(null, ""),
    ownerIdProofUrl: Joi.string().trim().optional().allow(null, ""),
    kycStatus: Joi.string().valid("NOT_STARTED", "PENDING", "VERIFIED", "REJECTED").optional(),
    isActive: Joi.boolean().optional()
})

export const validateUpdateCompanySchema = (data: unknown) => {
    return updateCompanySchema.validate(data, { abortEarly: false });
};
import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import CompanyService from "./company.service.js";
import { validateCreateCompanySchema, validateUpdateCompanySchema } from "./company.validators.js";

const companyService = new CompanyService();

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateCreateCompanySchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await companyService.createCompany(value);

    sendResponse(res, true, result, "Company created successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid company ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await companyService.getCompanyById(id);

    sendResponse(res, true, result, "Company fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid company ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const { error, value } = validateUpdateCompanySchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await companyService.updateCompany(id, value);

    sendResponse(res, true, result, "Company updated successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;
    const type = req.query.type as string | undefined;

    const result = await companyService.getAllCompanies(query, type);

    sendResponse(res, true, result, "Companies fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getCompaniesByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.params.type as string;

    if (type !== "BUYER" && type !== "VENDOR") {
      sendResponse(res, false, null, "Type must be BUYER or VENDOR", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await companyService.getCompaniesByType(type as "BUYER" | "VENDOR");

    sendResponse(res, true, result, "Companies fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid company ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await companyService.deleteCompany(id);

    sendResponse(res, true, result, "Company deleted successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

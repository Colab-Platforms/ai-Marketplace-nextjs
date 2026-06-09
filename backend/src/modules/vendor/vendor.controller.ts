import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import VendorService from "./vendor.service.js";
import { validateCreateVendorSchema, validateUpdateVendorSchema, validateAddVendorDocSchema } from "./vendor.validators.js";

const vendorService = new VendorService();

export const createVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateCreateVendorSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const userId = req.user?.id;
    if (!userId) {
      sendResponse(res, false, null, "User not authenticated", STATUS_CODES.UNAUTHORIZED);
      return;
    }

    const result = await vendorService.createVendor(value, userId);

    sendResponse(res, true, result, "Vendor Onboarded successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getVendorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await vendorService.getVendorById(id);

    sendResponse(res, true, result, "Vendor fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};
//get vendoor details using their owner ID
export const getVendorByOwnerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const ownerId = req.params.ownerId as string;

    const result = await vendorService.getVendorByOwnerId(ownerId);

    sendResponse(res, true, result, "Vendor fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const updateVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const { error, value } = validateUpdateVendorSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await vendorService.updateVendor(id, value);

    sendResponse(res, true, result, "Vendor updated successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getAllVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await vendorService.getAllVendors(query);

    sendResponse(res, true, result, "Vendors fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};
//yet to implement soft delete
export const deleteVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await vendorService.deleteVendor(id);

    sendResponse(res, true, result, "Vendor deleted successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const addVendorDoc = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.params.id as string;
    const { error, value } = validateAddVendorDocSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await vendorService.addVendorDoc(vendorId, value);

    sendResponse(res, true, result, "Vendor document added successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getVendorDocs = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.params.id as string;

    const result = await vendorService.getVendorDocs(vendorId);

    sendResponse(res, true, result, "Vendor documents fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const submitForVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.params.id as string;

    const result = await vendorService.submitForVerification(vendorId);

    sendResponse(res, true, result, "Vendor submitted for verification", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

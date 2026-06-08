import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import ToolService from "./tool.service.js";
import { validateCreateToolSchema, validateUpdateToolSchema } from "./tool.validators.js";

const toolService = new ToolService();

export const createTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateCreateToolSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await toolService.createTool(value, req.user!.id);

    sendResponse(res, true, result, "Tool created successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getToolById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid tool ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await toolService.getToolById(id);

    sendResponse(res, true, result, "Tool fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const updateTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid tool ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const { error, value } = validateUpdateToolSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await toolService.updateTool(id, value, req.user!.id);

    sendResponse(res, true, result, "Tool updated successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getAllTools = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await toolService.getAllTools(query);

    sendResponse(res, true, result, "Tools fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getToolsByVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = parseInt(req.params.vendorId as string);

    if (isNaN(vendorId)) {
      sendResponse(res, false, null, "Invalid vendor ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const query = req.query;

    const result = await toolService.getToolsByVendor(vendorId, query);

    sendResponse(res, true, result, "Vendor tools fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

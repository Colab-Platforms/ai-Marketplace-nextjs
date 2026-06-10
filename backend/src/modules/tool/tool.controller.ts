import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import ToolService from "./tool.service.js";
import { validateCreateToolSchema, validateUpdateToolSchema, validateAddPricingPlanSchema } from "./tool.validators.js";

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
    const id = req.params.id as string;

    const result = await toolService.getToolById(id);

    sendResponse(res, true, result, "Tool fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const updateTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

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

export const getMyTools = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await toolService.getToolsByVendor(req.user!.id, query);

    sendResponse(res, true, result, "Your tools fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const publishTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await toolService.publishTool(id, req.user!.id);

    sendResponse(res, true, result, "Tool published successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const unpublishTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await toolService.unpublishTool(id, req.user!.id);

    sendResponse(res, true, result, "Tool unpublished successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const deleteTool = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await toolService.deleteTool(id, req.user!.id);

    sendResponse(res, true, result, "Tool deleted successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const addPricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const toolId = req.params.id as string;

    const { error, value } = validateAddPricingPlanSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await toolService.addPricingPlan(toolId, value, req.user!.id);

    sendResponse(res, true, result, "Pricing plan added successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getPricingPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const toolId = req.params.id as string;

    const result = await toolService.getPricingPlans(toolId);

    sendResponse(res, true, result, "Pricing plans fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import WebhookService from "./webhook.service.js";
import { validateCreateWebhookSchema, validateUpdateWebhookSchema } from "./webhook.validators.js";

const webhookService = new WebhookService();

export const createWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateCreateWebhookSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await webhookService.createWebhook(value, req.user!.id);

    sendResponse(res, true, result, "Webhook created successfully", STATUS_CODES.CREATED);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getWebhookByToolId = async (req: Request, res: Response): Promise<void> => {
  try {
    const toolId = req.params.toolId as string;

    const result = await webhookService.getWebhookByToolId(toolId, req.user!.id);

    sendResponse(res, true, result, "Webhook fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getVendorWebhooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await webhookService.getVendorWebhooks(req.user!.id);

    sendResponse(res, true, result, "Webhooks fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const updateWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const { error, value } = validateUpdateWebhookSchema(req.body);

    if (error) {
      sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await webhookService.updateWebhook(id, value, req.user!.id);

    sendResponse(res, true, result, "Webhook updated successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const deleteWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await webhookService.deleteWebhook(id, req.user!.id);

    sendResponse(res, true, result, "Webhook deleted successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const testWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await webhookService.testWebhook(id, req.user!.id);

    sendResponse(res, true, result, "Webhook test completed", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getWebhookLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const toolId = req.params.toolId as string;

    const result = await webhookService.getWebhookLogs(toolId, req.user!.id);

    sendResponse(res, true, result, "Webhook logs fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

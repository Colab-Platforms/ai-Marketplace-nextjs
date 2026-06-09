import { Response } from "express";
import SubscriptionService from "./subscription.service.js";
import { validateCreateSubscription, validateUpdateSubscription } from "./subscription.validators.js";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { AuthRequest } from "@/middlewares/authMiddleware.js";

const service = new SubscriptionService();

export const createSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { error, value } = validateCreateSubscription(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const subscription = await service.createSubscription(value);
        sendResponse(res, true, subscription, "Subscription created successfully", STATUS_CODES.CREATED);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const getSubscriptionById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            sendResponse(res, false, null, "Invalid Subscription ID", STATUS_CODES.BAD_REQUEST);
            return;
        }
        const subscription = await service.getSubscriptionById(id);
        sendResponse(res, true, subscription, "Subscription fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const updateSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            sendResponse(res, false, null, "Invalid Subscription ID", STATUS_CODES.BAD_REQUEST);
            return;
        }
        const { error, value } = validateUpdateSubscription(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const subscription = await service.updateSubscription(id, value);
        sendResponse(res, true, subscription, "Subscription updated successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const getAllSubscriptions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userRole = req.user?.role || "USER";
        const userId = req.user?.id;
        if (!userId) {
            sendResponse(res, false, null, "Unauthorized", STATUS_CODES.UNAUTHORIZED);
            return;
        }
        const result = await service.getAllSubscriptions(req.query, userRole, userId);
        sendResponse(res, true, result, "Subscriptions fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, STATUS_CODES.SERVER_ERROR);
    }
};

export const getRevenueStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const range = req.query.range as string || "monthly";
        const stats = await service.getRevenueStats(range);
        sendResponse(res, true, stats, "Revenue stats fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, STATUS_CODES.SERVER_ERROR);
    }
};

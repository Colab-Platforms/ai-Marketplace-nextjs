import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import NotificationService from "./notification.service.js";

const notificationService = new NotificationService();

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await notificationService.getNotificationsByUserId(req.user!.id, query);

    sendResponse(res, true, result, "Notifications fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid notification ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await notificationService.getNotificationById(id);

    sendResponse(res, true, result, "Notification fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid notification ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await notificationService.markAsRead(id);

    sendResponse(res, true, result, "Notification marked as read", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await notificationService.getAllNotifications(query);

    sendResponse(res, true, result, "All notifications fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      sendResponse(res, false, null, "Invalid notification ID", STATUS_CODES.BAD_REQUEST);
      return;
    }

    const result = await notificationService.deleteNotification(id);

    sendResponse(res, true, result, "Notification deleted successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const getPendingNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;

    const result = await notificationService.getPendingNotifications(query);

    sendResponse(res, true, result, "Pending notifications fetched successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

export const broadcastNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await notificationService.broadcastNotification(req.body);
    sendResponse(res, true, result, "Broadcast sent successfully", STATUS_CODES.OK);
  } catch (error: any) {
    sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
  }
};

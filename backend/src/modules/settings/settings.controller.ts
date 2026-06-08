import { Response } from "express";
import SettingsService from "./settings.service.js";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";

export const getSettings = async (_req: any, res: Response) => {
    try {
        const settings = await SettingsService.getSettings();
        sendResponse(res, true, settings, "Settings fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode || STATUS_CODES.SERVER_ERROR);
    }
};

export const getPublicSettings = async (_req: any, res: Response) => {
    try {
        const settings = await (await SettingsService.getSettings()).filter(s => 
            ["GENERAL", "ASSESSMENT"].includes(s.category) || (s.key && s.key.startsWith("ASSESSMENT_"))
        );
        sendResponse(res, true, settings, "Public settings fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode || STATUS_CODES.SERVER_ERROR);
    }
};

export const updateSetting = async (req: any, res: Response) => {
    try {
        const { key, value } = req.body;
        if (!key || value === undefined) {
            return sendResponse(res, false, null, "Key and value are required", STATUS_CODES.BAD_REQUEST);
        }
        const setting = await SettingsService.updateSetting(key, String(value));
        sendResponse(res, true, setting, "Setting updated successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode || STATUS_CODES.SERVER_ERROR);
    }
};

export const seedDefaults = async (_req: any, res: Response) => {
    try {
        await SettingsService.seedDefaults();
        sendResponse(res, true, null, "Default settings seeded", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode || STATUS_CODES.SERVER_ERROR);
    }
};

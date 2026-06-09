import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import AuthService from "./auth.service.js";
import { validateRegisterSchema, validateLoginSchema, validateForgotPasswordSchema, validateResetPasswordSchema } from "./auth.validators.js";

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validateRegisterSchema(req.body);
        if (error) {
            sendResponse(res, false, error, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const result = await authService.register(value);
        sendResponse(res, true, result, result.message, STATUS_CODES.CREATED);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validateLoginSchema(req.body);
        if (error) {
            sendResponse(res, false, error, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const result = await authService.login(value);
        sendResponse(res, true, result, "You logged in successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validateForgotPasswordSchema(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const result = await authService.forgotPassword(value.email);
        sendResponse(res, true, result, result.message, STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validateResetPasswordSchema(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }
        const result = await authService.resetPassword(value.token, value.password);
        sendResponse(res, true, result, result.message, STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};
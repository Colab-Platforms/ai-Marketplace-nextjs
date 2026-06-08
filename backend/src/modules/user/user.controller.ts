import { Request, Response } from "express";
import { sendResponse } from "@/utils/responseUtils.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import UserService from "./user.service.js";
import { validateCreateUserSchema, validateUpdateUserSchema } from "./user.validators.js";
import type { Role } from "./user.types.js";

const userService = new UserService();


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userService.getAllUsers(
            req.query,
            req.user!.role as Role,
            req.user!.id,
        );
        sendResponse(res, true, result, "Users fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const targetId = parseInt(req.params.id as string);
        if (isNaN(targetId)) {
            sendResponse(res, false, null, "Invalid user ID", STATUS_CODES.BAD_REQUEST);
            return;
        }

        const result = await userService.getUserById(
            targetId,
            req.user!.role as Role,
            req.user!.id,
        );
        sendResponse(res, true, result, "User fetched successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validateCreateUserSchema(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }

        const result = await userService.createUser(value);
        sendResponse(res, true, result, "User created successfully", STATUS_CODES.CREATED);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const targetId = parseInt(req.params.id as string);
        if (isNaN(targetId)) {
            sendResponse(res, false, null, "Invalid user ID", STATUS_CODES.BAD_REQUEST);
            return;
        }

        const { error, value } = validateUpdateUserSchema(req.body);
        if (error) {
            sendResponse(res, false, null, error.message, STATUS_CODES.BAD_REQUEST);
            return;
        }

        const result = await userService.updateUser(
            targetId,
            value,
            req.user!.role as Role,
            req.user!.id,
        );
        sendResponse(res, true, result, "User updated successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const targetId = parseInt(req.params.id as string);
        if (isNaN(targetId)) {
            sendResponse(res, false, null, "Invalid user ID", STATUS_CODES.BAD_REQUEST);
            return;
        }

        const result = await userService.deleteUser(
            targetId,
            req.user!.role as Role,
            req.user!.id,
        );
        sendResponse(res, true, result, "User deleted successfully", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, null, error.message, error.statusCode ?? STATUS_CODES.SERVER_ERROR);
    }
};
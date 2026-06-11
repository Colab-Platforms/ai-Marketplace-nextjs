import { Request, Response } from 'express';
import { uploadToCloudinary } from '@/utils/cloudinary.js';
import { sendResponse } from '@/utils/responseUtils.js';
import STATUS_CODES from '@/utils/statusCodes.js';

import prisma from "@root/prisma.js";

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            sendResponse(res, false, null, "No file uploaded", STATUS_CODES.BAD_REQUEST);
            return;
        }

        const folder = (req.body.folder as string) || 'ai-marketplace';
        const result: any = await uploadToCloudinary(req.file.buffer, folder);

        // Store file record as PENDING
        if (result && result.public_id && result.url) {
            await prisma.uploaded_files.create({
                data: {
                    public_id: result.public_id,
                    url: result.url,
                    status: "PENDING"
                }
            });
        }

        sendResponse(res, true, result, "File uploaded successfully", STATUS_CODES.OK);
    } catch (error: any) {
        console.error('File Upload Controller Error:', error);
        sendResponse(res, false, null, error.message || "File upload failed", error.statusCode || STATUS_CODES.SERVER_ERROR);
    }
};

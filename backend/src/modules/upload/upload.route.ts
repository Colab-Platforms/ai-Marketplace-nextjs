import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from './upload.controller.js';
import { auth } from '@/middlewares/authMiddleware.js';

const router = Router();

// Configure multer to stay in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Require authentication — only logged-in users can upload
router.post('/', auth(), upload.single('file'), uploadFile);

export default router;

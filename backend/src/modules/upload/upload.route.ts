import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from './upload.controller.js';

const router = Router();

// Configure multer to stay in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.post('/', upload.single('file'), uploadFile);

export default router;

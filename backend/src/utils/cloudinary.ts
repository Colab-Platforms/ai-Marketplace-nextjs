import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js';
import STATUS_CODES from './statusCodes.js';

// Configuration placeholder
// You can add your credentials here later
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 */
export const uploadToCloudinary = async (fileBuffer: Buffer, folder: string = 'ai-marketplace') => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.warn('Cloudinary credentials missing in .env. Falling back to placeholder.');
            return {
                url: `https://res.cloudinary.com/dummy/image/upload/v12345/placeholder.png`,
                public_id: `dummy_${Date.now()}`
            };
        }

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder, resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(new ApiError('File upload failed', STATUS_CODES.SERVER_ERROR));
                    } else {
                        resolve({
                            url: result?.secure_url,
                            public_id: result?.public_id,
                        });
                    }
                }
            ).end(fileBuffer);
        });
    } catch (error) {
        console.error('Cloudinary setup error:', error);
        throw new ApiError('Cloudinary service unavailable', STATUS_CODES.SERVER_ERROR);
    }
};

export default cloudinary;

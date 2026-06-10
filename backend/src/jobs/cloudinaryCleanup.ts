import cron from 'node-cron';
import prisma from '@root/prisma.js';
import cloudinary from '@/utils/cloudinary.js';

export const startCloudinaryCleanupJob = () => {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running Cloudinary cleanup job...');
        try {
            // Find files that are PENDING and older than 24 hours
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            
            const pendingFiles = await prisma.uploaded_files.findMany({
                where: {
                    status: 'PENDING',
                    created_at: {
                        lt: twentyFourHoursAgo
                    }
                }
            });

            if (pendingFiles.length === 0) {
                console.log('No pending files to clean up.');
                return;
            }

            console.log(`Found ${pendingFiles.length} pending files to clean up.`);

            for (const file of pendingFiles) {
                try {
                    // Delete from Cloudinary
                    await cloudinary.uploader.destroy(file.public_id);
                    
                    // Delete record from database
                    await prisma.uploaded_files.delete({
                        where: { id: file.id }
                    });
                    
                    console.log(`Successfully cleaned up file: ${file.public_id}`);
                } catch (err) {
                    console.error(`Failed to clean up file ${file.public_id}:`, err);
                }
            }
        } catch (error) {
            console.error('Error in Cloudinary cleanup job:', error);
        }
    });

    console.log('Cloudinary cleanup cron job scheduled.');
};

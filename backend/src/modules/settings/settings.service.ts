import prisma from "@root/prisma.js";

class SettingsService {
    private cache: Map<string, { value: string; timestamp: number }> = new Map();
    private CACHE_TTL = 1000 * 60 * 5; // 5 minutes

    async getSettings() {
        return prisma.platformSetting.findMany();
    }

    async getSettingByKey(key: string) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp < this.CACHE_TTL)) {
            return { key, value: cached.value };
        }

        const setting = await prisma.platformSetting.findUnique({
            where: { key }
        });

        if (setting) {
            this.cache.set(key, { value: setting.value, timestamp: Date.now() });
        }
        
        return setting;
    }

    async updateSetting(key: string, value: string) {
        const result = await prisma.platformSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });
        
        // Update cache immediately on change
        this.cache.set(key, { value, timestamp: Date.now() });
        return result;
    }

    async seedDefaults() {
        const defaults = [
            { key: "DEFAULT_COMMISSION_RATE", value: "10", category: "COMMISSION", description: "Default platform commission percentage" },
            { key: "MAINTENANCE_MODE", value: "false", category: "GENERAL", description: "Toggle site-wide maintenance mode" },
            { key: "PLATFORM_FEE_FLAT", value: "0", category: "COMMISSION", description: "Flat fee charged per deal (INR)" },
            { key: "SLA_RM_ASSIGNMENT_MINS", value: "60", category: "SLA", description: "Target time for RM assignment after lead submission" },
            { key: "SLA_PROPOSAL_SUBMISSION_HOURS", value: "24", category: "SLA", description: "Target time for initial proposal submission" },
            { key: "EMAIL_TEMPLATE_WELCOME", value: "Welcome to TakeAI! We're excited to help you find the best AI tools.", category: "EMAIL", description: "Base content for welcome email" },
            { key: "EMAIL_TEMPLATE_OTP", value: "Your verification code is: {otp}. Valid for 10 minutes.", category: "EMAIL", description: "Template for OTP emails" }
        ];

        for (const setting of defaults) {
            await prisma.platformSetting.upsert({
                where: { key: setting.key },
                update: { 
                    category: setting.category,
                    description: setting.description 
                },
                create: setting
            });
        }
    }
}

export default new SettingsService();

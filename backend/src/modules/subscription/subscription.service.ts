import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateSubscriptionBody, UpdateSubscriptionBody, subscriptionSelectFields } from "./subscription.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class SubscriptionService {
    async createSubscription(data: CreateSubscriptionBody) {
        const tool = await prisma.tool.findUnique({ where: { id: data.toolId } });
        if (!tool) throw new ApiError("Tool not found", STATUS_CODES.NOT_FOUND);

        const subscription = await prisma.subscription.create({
            data: {
                customerId: data.customerId,
                vendorId: data.vendorId,
                toolId: data.toolId,
                startDate: new Date(data.startDate),
                renewalDate: new Date(data.renewalDate),
                monthlyValue: data.monthlyValue,
                status: data.status || "ACTIVE",
            },
            select: subscriptionSelectFields,
        });
        return subscription;
    }

    async getSubscriptionById(id: number) {
        const subscription = await prisma.subscription.findUnique({
            where: { id },
            select: subscriptionSelectFields,
        });
        if (!subscription) throw new ApiError("Subscription not found", STATUS_CODES.NOT_FOUND);
        return subscription;
    }

    async updateSubscription(id: number, data: UpdateSubscriptionBody) {
        const existing = await prisma.subscription.findUnique({ where: { id } });
        if (!existing) throw new ApiError("Subscription not found", STATUS_CODES.NOT_FOUND);

        const subscription = await prisma.subscription.update({
            where: { id },
            data: {
                ...(data.renewalDate && { renewalDate: new Date(data.renewalDate) }),
                ...(data.monthlyValue !== undefined && { monthlyValue: data.monthlyValue }),
                ...(data.status && { status: data.status }),
            },
            select: subscriptionSelectFields,
        });
        return subscription;
    }

    async getAllSubscriptions(query: any, userRole: string, userId: number) {
        const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

        let where: any = {};
        if (userRole === "USER") {
            where.OR = [
                { customerId: userId },
                { vendorId: userId },
            ];
        }

        const subscriptions = await prisma.subscription.findMany({
            where,
            select: subscriptionSelectFields,
            skip,
            take,
            orderBy: { createdAt: "desc" },
        });

        const totalRecords = await prisma.subscription.count({ where });
        return formatPaginationResponse(subscriptions, totalRecords, page, pageSize);
    }

    async getRevenueStats(range: string = "monthly") {
        // Universal Filter for Time Range
        let dateLimit = new Date();
        if (range === "weekly") dateLimit.setDate(dateLimit.getDate() - 7 * 8); // Last 8 weeks
        else if (range === "yearly") dateLimit.setFullYear(dateLimit.getFullYear() - 5); // Last 5 years
        else dateLimit.setMonth(dateLimit.getMonth() - 12); // Default 12 months

        // Proposal-based GMV (All time for cards)
        const allAccepted = await prisma.proposal.findMany({
            where: { status: "ACCEPTED" },
            include: { lead: true }
        });
        const totalGMV = allAccepted.reduce((sum, p) => sum + (p.pricing || 0), 0);
        const totalCommission = allAccepted.reduce((sum, p) => sum + (p.commissionAmount || 0), 0);

        // Industry breakdown (All time)
        const byIndustry: Record<string, { gmv: number; commission: number; count: number }> = {};
        for (const p of allAccepted) {
            const industry = p.lead?.industry || "Other";
            if (!byIndustry[industry]) byIndustry[industry] = { gmv: 0, commission: 0, count: 0 };
            byIndustry[industry].gmv += p.pricing || 0;
            byIndustry[industry].commission += p.commissionAmount || 0;
            byIndustry[industry].count += 1;
        }

        // Active deals
        const activeDeals = await prisma.lead.count({
            where: { status: { in: ["SUBMITTED", "RM_ASSIGNED", "IN_PROGRESS"] } },
        });

        // Pipeline (SENT proposals)
        const pipeline = await prisma.proposal.aggregate({
            where: { status: "SENT" },
            _sum: { pricing: true },
        });

        // Historical Breakdown (Filtered by Range)
        const historicalProposals = await prisma.proposal.findMany({
            where: { status: "ACCEPTED", createdAt: { gte: dateLimit } },
            select: { pricing: true, commissionAmount: true, createdAt: true },
            orderBy: { createdAt: "asc" }
        });

        const breakdown: Record<string, { gmv: number; commission: number }> = {};
        for (const p of historicalProposals) {
            let key = "";
            if (range === "weekly") {
                const oneJan = new Date(p.createdAt.getFullYear(), 0, 1);
                const numberOfDays = Math.floor((p.createdAt.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
                const weekNum = Math.ceil((p.createdAt.getDay() + 1 + numberOfDays) / 7);
                key = `W${weekNum} ${p.createdAt.getFullYear()}`;
            } else if (range === "yearly") {
                key = `${p.createdAt.getFullYear()}`;
            } else {
                key = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, "0")}`;
            }

            if (!breakdown[key]) breakdown[key] = { gmv: 0, commission: 0 };
            breakdown[key].gmv += p.pricing || 0;
            breakdown[key].commission += p.commissionAmount || 0;
        }

        // Active subscriptions value
        const activeSubscriptions = await prisma.subscription.aggregate({
            where: { status: "ACTIVE" },
            _sum: { monthlyValue: true },
            _count: true,
        });

        return {
            totalGMV,
            totalCommission,
            activeDeals,
            pipelineValue: pipeline._sum.pricing || 0,
            monthlyBreakdown: breakdown, // Kept monthlyBreakdown key name for frontend compatibility
            industryBreakdown: byIndustry,
            activeSubscriptionsMRR: activeSubscriptions._sum.monthlyValue || 0,
            activeSubscriptionsCount: activeSubscriptions._count,
        };
    }
}

export default SubscriptionService;

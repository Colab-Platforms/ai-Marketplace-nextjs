export interface CreateSubscriptionBody {
    customerId: number;
    vendorId: number;
    toolId: number;
    startDate: string;
    renewalDate: string;
    monthlyValue: number;
    status?: string;
}

export interface UpdateSubscriptionBody {
    renewalDate?: string;
    monthlyValue?: number;
    status?: string;
}

export const subscriptionSelectFields = {
    id: true,
    customerId: true,
    vendorId: true,
    toolId: true,
    startDate: true,
    renewalDate: true,
    monthlyValue: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    customer: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            company: { select: { id: true, name: true } },
        },
    },
    vendor: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            company: { select: { id: true, name: true } },
        },
    },
    tool: {
        select: { id: true, name: true, category: true },
    },
};

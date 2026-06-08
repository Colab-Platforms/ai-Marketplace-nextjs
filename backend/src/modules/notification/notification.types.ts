// Which fields to return from database
export const notificationSelectFields = {
    id: true,
    userId: true,
    user: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    },
    type: true,
    message: true,
    email: true,
    status: true,
    sentAt: true,
    failureReason: true,
    createdAt: true,
    updatedAt: true,
};

// Type for creating notification
export interface CreateNotificationBody {
    userId: number;
    type: string;
    message: string;
    email: string;
}

// Type for notification response
export interface Notification {
    id: number;
    userId: number;
    user: {
        id: number;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    type: string;
    message: string;
    email: string;
    status: string;
    sentAt?: Date;
    failureReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

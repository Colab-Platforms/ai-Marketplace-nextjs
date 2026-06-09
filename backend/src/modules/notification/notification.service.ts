import prisma from "@root/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { CreateNotificationBody, notificationSelectFields } from "./notification.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";

class NotificationService {
  // Method 1: Create Notification
  async createNotification(data: CreateNotificationBody) {
    // Step 1: Create notification with status = PENDING
    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        message: data.message,
        email: data.email,
        status: "PENDING",
      },
      select: notificationSelectFields,
    });

    // Step 2: Return created notification
    return notification;
  }

  // Method 2: Get Notifications By User ID
  async getNotificationsByUserId(userId: number, query: any) {
    // Step 1: Get pagination options
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    // Step 2: Fetch notifications for user
    const notifications = await prisma.notification.findMany({
      where: { userId },
      select: notificationSelectFields,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    // Step 3: Count total
    const totalRecords = await prisma.notification.count({ where: { userId } });

    // Step 4: Return formatted response
    return formatPaginationResponse(notifications, totalRecords, page, pageSize);
  }

  // Method 3: Get Notification By ID
  async getNotificationById(id: number) {
    // Step 1: Find notification by ID
    const notification = await prisma.notification.findUnique({
      where: { id },
      select: notificationSelectFields,
    });

    // Step 2: If not found, throw error
    if (!notification) {
      throw new ApiError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Return notification
    return notification;
  }

  // Method 4: Mark As Read (Update Status)
  async markAsRead(id: number) {
    // Step 1: Find notification by ID
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    // Step 2: If not found, throw error
    if (!notification) {
      throw new ApiError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Update status to SENT (marking as read)
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        status: "SENT",
        sentAt: new Date(),
      },
      select: notificationSelectFields,
    });

    // Step 4: Return notification
    return updatedNotification;
  }

  // Method 5: Get All Notifications (Admin)
  async getAllNotifications(query: any) {
    // Step 1: Get pagination options
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    // Step 2: Fetch all notifications
    const notifications = await prisma.notification.findMany({
      select: notificationSelectFields,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    // Step 3: Count total
    const totalRecords = await prisma.notification.count();

    // Step 4: Return formatted response
    return formatPaginationResponse(notifications, totalRecords, page, pageSize);
  }

  // Method 6: Delete Notification
  async deleteNotification(id: number) {
    // Step 1: Find notification by ID
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    // Step 2: If not found, throw error
    if (!notification) {
      throw new ApiError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    // Step 3: Delete notification
    await prisma.notification.delete({
      where: { id },
    });

    // Step 4: Return success message
    return { message: "Notification deleted successfully" };
  }

  // Method 7: Get Pending Notifications
  async getPendingNotifications(query: any) {
    // Step 1: Get pagination options
    const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

    // Step 2: Fetch pending notifications
    const notifications = await prisma.notification.findMany({
      where: { status: "PENDING" },
      select: notificationSelectFields,
      skip,
      take,
      orderBy: { createdAt: "asc" },
    });

    // Step 3: Count total
    const totalRecords = await prisma.notification.count({ where: { status: "PENDING" } });

    // Step 4: Return formatted response
    return formatPaginationResponse(notifications, totalRecords, page, pageSize);
  }

  // Method 8: Broadcast Notification
  async broadcastNotification(data: { type: string; message: string; targetRole?: string }) {
    let users = [];
    if (data.targetRole) {
      users = await prisma.user.findMany({
        where: { userRoles: { some: { role: { name: data.targetRole } } } },
        select: { id: true, email: true }
      });
    } else {
      users = await prisma.user.findMany({ select: { id: true, email: true } });
    }

    const notifications = await Promise.all(users.map(user => {
      return prisma.notification.create({
        data: {
          userId: user.id,
          type: data.type,
          message: data.message,
          email: user.email,
          status: "PENDING"
        }
      });
    }));

    return { count: notifications.length };
  }
}

export default NotificationService;

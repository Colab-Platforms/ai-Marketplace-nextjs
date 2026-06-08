import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

// Specific routes BEFORE generic /:id routes
router.get("/pending/all", auth("ADMIN", "SUPERADMIN"), notificationController.getPendingNotifications);

router.get("/admin/all", auth("ADMIN", "SUPERADMIN"), notificationController.getAllNotifications);
router.post("/broadcast", auth("ADMIN", "SUPERADMIN"), notificationController.broadcastNotification);

router.get("/", auth("USER", "ADMIN", "SUPERADMIN"), notificationController.getNotifications);

router.get("/:id", auth("USER", "ADMIN", "SUPERADMIN"), notificationController.getNotificationById);

router.put("/:id/read", auth("USER", "ADMIN", "SUPERADMIN"), notificationController.markAsRead);

router.delete("/:id", auth("USER", "ADMIN", "SUPERADMIN"), notificationController.deleteNotification);

export default router;

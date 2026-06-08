import { Router } from "express";
import * as subscriptionController from "./subscription.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.post("/", auth("ADMIN", "SUPERADMIN"), subscriptionController.createSubscription);
router.get("/", auth("USER", "ADMIN", "SUPERADMIN"), subscriptionController.getAllSubscriptions);
router.get("/revenue/stats", auth("ADMIN", "SUPERADMIN"), subscriptionController.getRevenueStats);
router.get("/:id", auth("USER", "ADMIN", "SUPERADMIN"), subscriptionController.getSubscriptionById);
router.put("/:id", auth("ADMIN", "SUPERADMIN"), subscriptionController.updateSubscription);

export default router;

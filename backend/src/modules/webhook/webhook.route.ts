import { Router } from "express";
import {
  createWebhook,
  getWebhookByToolId,
  getVendorWebhooks,
  updateWebhook,
  deleteWebhook,
  testWebhook,
  getWebhookLogs,
} from "./webhook.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

// All webhook routes require VENDOR authentication
router.post("/", auth("VENDOR"), createWebhook);
router.get("/", auth("VENDOR"), getVendorWebhooks);
router.get("/tool/:toolId", auth("VENDOR"), getWebhookByToolId);
router.get("/tool/:toolId/logs", auth("VENDOR"), getWebhookLogs);
router.put("/:id", auth("VENDOR"), updateWebhook);
router.delete("/:id", auth("VENDOR"), deleteWebhook);
router.post("/:id/test", auth("VENDOR"), testWebhook);

export default router;

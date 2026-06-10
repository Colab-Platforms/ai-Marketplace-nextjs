import { Router, Request, Response } from "express";
import authRoutes from "./modules/auth/auth.route.js";
import vendorRoutes from "./modules/vendor/vendor.route.js";
import uploadRoutes from "./modules/upload/upload.route.js";
import toolRoutes from "./modules/tool/tool.route.js";
import webhookRoutes from "./modules/webhook/webhook.route.js";
import categoryRoutes from "./modules/category/category.route.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "Server is healthy" });
});

router.use("/auth", authRoutes);
// router.use("/vendor", vendorRoutes);
router.use("/vendors", vendorRoutes);
router.use("/upload", uploadRoutes);
router.use("/tools", toolRoutes);
router.use("/webhooks", webhookRoutes);
router.use("/categories", categoryRoutes);

export default router;

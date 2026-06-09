import { Router, Request, Response } from "express";
import authRoutes from "./modules/auth/auth.route.js";
import vendorRoutes from "./modules/vendor/vendor.route.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "Server is healthy" });
});

router.use("/auth", authRoutes);
router.use("/vendor", vendorRoutes);

export default router;

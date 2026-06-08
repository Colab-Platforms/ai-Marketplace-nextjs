import { Router, Request, Response } from "express";
import authRoutes from "./modules/auth/auth.route.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "Server is healthy" });
});

router.use("/auth", authRoutes);

export default router;

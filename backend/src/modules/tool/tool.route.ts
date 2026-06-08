import { Router } from "express";
import * as toolController from "./tool.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.post("/", auth("USER", "ADMIN", "SUPERADMIN"), toolController.createTool);

router.get("/", toolController.getAllTools);

// Specific routes BEFORE generic /:id routes
router.get("/vendor/:vendorId", toolController.getToolsByVendor);

router.get("/:id", toolController.getToolById);

router.put("/:id", auth("USER", "ADMIN", "SUPERADMIN"), toolController.updateTool);

export default router;

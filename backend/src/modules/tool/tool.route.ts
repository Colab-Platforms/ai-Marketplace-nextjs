import { Router } from "express";
import * as toolController from "./tool.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", toolController.getAllTools);

// Vendor protected routes - specific routes BEFORE generic /:id
router.get("/my/list", auth("VENDOR"), toolController.getMyTools);
router.post("/", auth("VENDOR"), toolController.createTool);

// Generic routes with :id parameter
router.get("/:id", toolController.getToolById);
router.get("/:id/pricing-plans", toolController.getPricingPlans);
router.put("/:id", auth("VENDOR"), toolController.updateTool);
router.delete("/:id", auth("VENDOR"), toolController.deleteTool);
router.post("/:id/publish", auth("VENDOR"), toolController.publishTool);
router.post("/:id/unpublish", auth("VENDOR"), toolController.unpublishTool);
router.post("/:id/pricing-plans", auth("VENDOR"), toolController.addPricingPlan);

export default router;

import { Router } from "express";
import {
  createVendor,
  getVendor,
  listVendors,
  updateVendor,
} from "./vendors.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/onboard", authMiddleware, createVendor);

router.put("/:id", authMiddleware, updateVendor);

router.get("/", listVendors);
router.get("/:id", getVendor);

export default router;
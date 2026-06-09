import { Router } from "express";
import {
  createVendor,
  getVendorById,
  getVendorByOwnerId,
  updateVendor,
  getAllVendors,
  deleteVendor,
  addVendorDoc,
  getVendorDocs,
  submitForVerification,
  getVendorProfile,
  updateVendorProfile,
} from "./vendor.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.post("/", auth("VENDOR"), createVendor);
router.get("/", getAllVendors);

// Vendor profile specific routes (should be defined before /:id parameter)
router.get("/profile", auth("VENDOR"), getVendorProfile);
router.get("/me", auth("VENDOR"), getVendorProfile);
router.put("/profile", auth("VENDOR"), updateVendorProfile);

router.get("/:id", getVendorById);
router.get("/owner/:ownerId", auth("VENDOR"), getVendorByOwnerId);
router.put("/:id", auth("VENDOR"), updateVendor);
router.delete("/:id", auth("VENDOR"), deleteVendor);

router.post("/:id/docs", auth("VENDOR"), addVendorDoc);
router.get("/:id/docs", auth("VENDOR"), getVendorDocs);
router.post("/:id/submit-verification", auth("VENDOR"), submitForVerification);

export default router;

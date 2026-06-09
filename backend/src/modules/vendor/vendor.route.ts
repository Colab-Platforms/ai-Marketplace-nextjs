import { Router } from "express";
import {
  createVendor,
  // getVendorById,
  // getVendorByOwnerId,
  // updateVendor,
  getAllVendors,
  // deleteVendor,
  addVendorDoc,
  getVendorDocs,
  submitForVerification,
} from "./vendor.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.post("/", auth("VENDOR"), createVendor);
router.get("/", getAllVendors);
// router.get("/:id", getVendorById);
// router.get("/owner/:ownerId", auth("VENDOR"), getVendorByOwnerId);// This route allows vendors to fetch their own vendor details using their owner ID
// router.put("/:id", auth("VENDOR"), updateVendor);
// router.delete("/:id", auth("VENDOR"), deleteVendor);

router.post("/:id/docs", auth("VENDOR"), addVendorDoc);
router.get("/:id/docs", auth("VENDOR"), getVendorDocs);
router.post("/:id/submit-verification", auth("VENDOR"), submitForVerification);

export default router;

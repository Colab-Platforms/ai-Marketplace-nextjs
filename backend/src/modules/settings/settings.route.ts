import { Router } from "express";
import * as settingsController from "./settings.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.get("/public", settingsController.getPublicSettings);
router.get("/", auth("ADMIN", "SUPERADMIN"), settingsController.getSettings);
router.put("/", auth("ADMIN", "SUPERADMIN"), settingsController.updateSetting);
router.post("/seed", auth("SUPERADMIN"), settingsController.seedDefaults);

export default router;

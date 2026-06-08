import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.get("/", auth("ADMIN", "SUPERADMIN"), userController.getAllUsers);
router.get("/:id", auth("USER", "ADMIN", "SUPERADMIN"), userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", auth("USER", "ADMIN", "SUPERADMIN"), userController.updateUser);
router.delete("/:id", auth("USER", "ADMIN", "SUPERADMIN"), userController.deleteUser);

export default router;

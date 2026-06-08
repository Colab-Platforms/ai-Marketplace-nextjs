import { Router } from "express";
import * as companyController from "./company.controller.js";
import { auth } from "@/middlewares/authMiddleware.js";

const router = Router();

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanies);
router.get("/type/:type", auth("ADMIN"), companyController.getCompaniesByType);
router.get("/:id", companyController.getCompanyById);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", auth("ADMIN"), companyController.deleteCompany);

export default router;
